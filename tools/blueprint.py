"""Build and check Factorio 2.x blueprint strings. No dependencies.

A blueprint string is the character "0" followed by base64 of zlib-compressed JSON.
Positions in the JSON are entity centres in tiles; this module takes the top-left
tile instead and converts, which is easier to lay out by hand.

Directions use the 2.x 16-way scale: N=0, E=4, S=8, W=12. A mining drill or belt
"faces" the way it outputs or moves.
"""
import base64
import json
import zlib

VERSION = 562949958467584  # 2.0.77.0, the same game version as the blueprints in data.js
N, E, S, W = 0, 4, 8, 12
POLE_COPPER = 5  # wire connector id for the copper (power) wire on an electric pole
# Circuit wire connector ids. Chests, inserters, poles and lamps have one red and one
# green connector; combinators have separate input and output sides.
RED, GREEN = 1, 2
IN_RED, IN_GREEN, OUT_RED, OUT_GREEN = 1, 2, 3, 4

# Footprint in tiles (wide, high). Checked against the Factorio Blueprint Editor's
# game data (selection_box) on 2026-11-15. Add an entity here before using it.
# Sizes are for an entity facing north; add() swaps them for east and west.
SIZE = {
    'electric-mining-drill': (3, 3),
    'transport-belt': (1, 1),
    'medium-electric-pole': (1, 1),
    'steel-chest': (1, 1),
    'bulk-inserter': (1, 1),
    'arithmetic-combinator': (1, 2),
    'fast-transport-belt': (1, 1),
    'fast-underground-belt': (1, 1),
    'fast-splitter': (2, 1),
}
# Belt pieces: kind, and for undergrounds the longest tunnel in tiles (entrance to exit).
BELTS = {
    'transport-belt': ('belt', 0),
    'fast-transport-belt': ('belt', 0),
    'fast-underground-belt': ('underground', 7),
    'fast-splitter': ('splitter', 0),
}
STEP = {N: (0, -1), E: (1, 0), S: (0, 1), W: (-1, 0)}
# Longest circuit wire each entity accepts, in tiles (circuit_wire_max_distance).
CIRCUIT_REACH = {'steel-chest': 9, 'bulk-inserter': 9, 'arithmetic-combinator': 9, 'medium-electric-pole': 9}
# Power poles: supply reach from the pole's centre, and longest wire, in tiles.
SUPPLY_REACH = {'medium-electric-pole': 3.5}
WIRE_REACH = {'medium-electric-pole': 9}
NEEDS_POWER = {'electric-mining-drill', 'arithmetic-combinator', 'bulk-inserter'}
# Where a north-facing drill drops its item, relative to its centre.
DROP_OFFSET = {'electric-mining-drill': (0, -1.85)}


def encode(obj):
    raw = json.dumps(obj, separators=(',', ':')).encode()
    return '0' + base64.b64encode(zlib.compress(raw, 9)).decode()


def decode(string):
    return json.loads(zlib.decompress(base64.b64decode(string[1:])))


def footprint(name, direction=N):
    w, h = SIZE[name]
    return (h, w) if direction in (E, W) else (w, h)


def rotate(dx, dy, direction):
    """Rotate an offset given for north to another of the four main directions."""
    for _ in range(direction // 4):
        dx, dy = -dy, dx
    return dx, dy


class Blueprint:
    def __init__(self, label, description='', icons=()):
        self.label = label
        self.description = description
        self.icons = list(icons)
        self.entities = []
        self.wires = []
        self.snap = None

    def add(self, name, x, y, direction=None, **extra):
        """Place an entity whose top-left tile is (x, y). Returns its entity number."""
        w, h = footprint(name, direction or N)
        entity = {'entity_number': len(self.entities) + 1, 'name': name,
                  'position': {'x': x + w / 2, 'y': y + h / 2}}
        if direction:
            entity['direction'] = direction
        entity.update(extra)
        self.entities.append(entity)
        return entity['entity_number']

    def wire(self, a, b, connector=POLE_COPPER, connector_b=None):
        """Connect entity a to entity b. Give two connector ids when the ends differ,
        for example a chest's RED to a combinator's IN_RED."""
        self.wires.append([a, connector, b, connector if connector_b is None else connector_b])

    def networks(self):
        """Circuit networks as sets of (entity number, connector id), one set per network."""
        parent = {}

        def find(n):
            parent.setdefault(n, n)
            while parent[n] != n:
                parent[n] = parent[parent[n]]
                n = parent[n]
            return n

        for a, ca, b, cb in self.wires:
            if ca == POLE_COPPER and cb == POLE_COPPER:
                continue
            parent[find((a, ca))] = find((b, cb))
        groups = {}
        for n in list(parent):
            groups.setdefault(find(n), set()).add(n)
        return list(groups.values())

    def snap_to_grid(self, width, height):
        """Make the blueprint tile on a width x height grid when dragged."""
        self.snap = (width, height)

    def to_dict(self):
        bp = {'icons': [{'signal': {'name': name}, 'index': i + 1} for i, name in enumerate(self.icons)],
              'entities': self.entities, 'item': 'blueprint', 'label': self.label, 'version': VERSION}
        if self.wires:
            bp['wires'] = self.wires
        if self.description:
            bp['description'] = self.description
        if self.snap:
            bp['snap-to-grid'] = {'x': self.snap[0], 'y': self.snap[1]}
        return {'blueprint': bp}

    def encode(self):
        return encode(self.to_dict())

    # ---- checks -------------------------------------------------------------
    def _tiles(self, entity):
        w, h = footprint(entity['name'], entity.get('direction', N))
        x0 = round(entity['position']['x'] - w / 2)
        y0 = round(entity['position']['y'] - h / 2)
        return {(x0 + i, y0 + j) for i in range(w) for j in range(h)}

    def check(self, already_powered=()):
        """Return a list of problems: overlaps, unpowered machines, wires too long,
        poles cut off from the rest, drills that drop onto nothing.

        already_powered: entity names to skip in the power check, for a blueprint that is
        placed over an existing build whose own poles are not part of it."""
        problems = []
        taken = {}
        for e in self.entities:
            for tile in self._tiles(e):
                if tile in taken:
                    problems.append('%s #%d overlaps #%d at %s' % (e['name'], e['entity_number'], taken[tile], tile))
                taken[tile] = e['entity_number']
        by_number = {e['entity_number']: e for e in self.entities}
        poles = [e for e in self.entities if e['name'] in SUPPLY_REACH]
        for e in self.entities:
            if e['name'] in NEEDS_POWER and e['name'] not in already_powered:
                w, h = footprint(e['name'], e.get('direction', N))
                cx, cy = e['position']['x'], e['position']['y']
                powered = any(abs(p['position']['x'] - cx) < SUPPLY_REACH[p['name']] + w / 2 and
                              abs(p['position']['y'] - cy) < SUPPLY_REACH[p['name']] + h / 2 for p in poles)
                if not powered:
                    problems.append('%s #%d is outside every pole\'s supply area' % (e['name'], e['entity_number']))
            if e['name'] in DROP_OFFSET:
                dx, dy = rotate(*DROP_OFFSET[e['name']], e.get('direction', N))
                tile = (int((e['position']['x'] + dx) // 1), int((e['position']['y'] + dy) // 1))
                target = by_number.get(taken.get(tile))
                if not target or 'belt' not in target['name']:
                    problems.append('%s #%d drops at %s, which is not a belt' % (e['name'], e['entity_number'], tile))
        copper = [w for w in self.wires if w[1] == POLE_COPPER and w[3] == POLE_COPPER]
        for a, ca, b, cb in self.wires:
            pa, pb = by_number[a], by_number[b]
            dist = ((pa['position']['x'] - pb['position']['x']) ** 2 + (pa['position']['y'] - pb['position']['y']) ** 2) ** 0.5
            reach = WIRE_REACH if [a, ca, b, cb] in copper else CIRCUIT_REACH
            if dist > min(reach[pa['name']], reach[pb['name']]):
                problems.append('wire #%d-#%d is %.1f tiles, too long' % (a, b, dist))
        if poles and copper:
            # Poles with no copper wire in the blueprint connect on their own when built.
            linked = {copper[0][0]}
            grew = True
            while grew:
                grew = False
                for a, _, b, _ in copper:
                    if (a in linked) != (b in linked):
                        linked |= {a, b}
                        grew = True
            for p in poles:
                if p['entity_number'] not in linked:
                    problems.append('pole #%d is not wired to the others' % p['entity_number'])
        return problems

    # ---- belts ----------------------------------------------------------------
    def belt_flow(self):
        """Follow every belt, underground and splitter.

        Returns (feeds, problems). feeds maps a tile to the tiles it hands items to (a
        splitter tile lists both of its outputs; an open end lists nothing). problems
        lists belts that run into something that will not take the item, and tunnel
        entrances without an exit.
        """
        at = {}
        for e in self.entities:
            if e['name'] in BELTS:
                for tile in self._tiles(e):
                    at[tile] = e
        feeds, problems = {}, []

        def accepts(target_tile, source_tile):
            t = at.get(target_tile)
            if t is None:
                return True                      # open end
            kind = BELTS[t['name']][0]
            dx, dy = STEP[t.get('direction', N)]
            behind = (target_tile[0] - dx, target_tile[1] - dy)
            ahead = (target_tile[0] + dx, target_tile[1] + dy)
            if kind == 'belt':
                return source_tile != ahead      # from behind or from either side
            if kind == 'underground' and t.get('type') == 'output':
                return False
            return source_tile == behind         # tunnel entrance, splitter

        occupied = {}
        for e in self.entities:
            for tile in self._tiles(e):
                occupied[tile] = e
        for tile, e in at.items():
            kind, reach = BELTS[e['name']]
            dx, dy = STEP[e.get('direction', N)]
            outs = []
            if kind == 'underground' and e.get('type') == 'input':
                exit_tile = None
                for k in range(1, reach + 1):
                    o = at.get((tile[0] + dx * k, tile[1] + dy * k))
                    if o is not None and o['name'] == e['name'] and o.get('direction', N) == e.get('direction', N):
                        if o.get('type') == 'output':
                            exit_tile = (tile[0] + dx * k, tile[1] + dy * k)
                        break
                if exit_tile is None:
                    problems.append('tunnel entrance at %s has no exit within %d tiles' % (tile, reach))
                else:
                    outs.append(exit_tile)
            else:
                nxt = (tile[0] + dx, tile[1] + dy)
                blocker = occupied.get(nxt)
                if blocker is not None and blocker['name'] not in BELTS:
                    problems.append('%s at %s runs into %s' % (e['name'], tile, blocker['name']))
                elif not accepts(nxt, tile):
                    problems.append('%s at %s runs into the wrong side of %s at %s' % (e['name'], tile, at[nxt]['name'], nxt))
                elif nxt in at:
                    outs.append(nxt)
            feeds[tile] = outs
        return feeds, problems

    def side_loads(self):
        """Tiles where a belt joins another belt from the side while that belt is also fed
        from behind. Items joining this way all land on the lane nearest the joining belt."""
        feeds, _ = self.belt_flow()
        into = {}
        for src, outs in feeds.items():
            for dst in outs:
                into.setdefault(dst, []).append(src)
        result = []
        for dst, sources in into.items():
            e = next(x for x in self.entities if dst in self._tiles(x))
            if BELTS[e['name']][0] != 'belt':
                continue
            dx, dy = STEP[e.get('direction', N)]
            behind = (dst[0] - dx, dst[1] - dy)
            if behind in sources:
                result += [(src, dst) for src in sources if src != behind]
        return result

    def reach(self, start):
        """Open ends and splitters that items starting on tile `start` can get to."""
        feeds, _ = self.belt_flow()
        splitter_of = {}
        for e in self.entities:
            if e['name'] in BELTS and BELTS[e['name']][0] == 'splitter':
                for tile in self._tiles(e):
                    splitter_of[tile] = e['entity_number']
        ends, splitters, seen, todo = set(), set(), set(), [start]
        while todo:
            tile = todo.pop()
            if tile in seen:
                continue
            seen.add(tile)
            if tile in splitter_of:
                splitters.add(splitter_of[tile])
                # a splitter hands items to both of its output tiles
                number = splitter_of[tile]
                for other, n in splitter_of.items():
                    if n == number:
                        todo += feeds.get(other, []) or []
                        if not feeds.get(other):
                            ends.add(other)
                continue
            outs = feeds.get(tile, [])
            if not outs:
                ends.add(tile)
            todo += outs
        return ends, splitters

    def count(self):
        counts = {}
        for e in self.entities:
            counts[e['name']] = counts.get(e['name'], 0) + 1
        return counts

    def size(self):
        tiles = set().union(*(self._tiles(e) for e in self.entities))
        xs, ys = [t[0] for t in tiles], [t[1] for t in tiles]
        return max(xs) - min(xs) + 1, max(ys) - min(ys) + 1
