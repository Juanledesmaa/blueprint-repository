"""Balanced unloading for a two-wagon station: a belt mixer after the chests.

Each wagon unloads into its own chests, so the wagons only empty at the same rate if
their belts are drained at the same rate. This mixer makes that true by construction.

      x:  -7  -6  -5  -4  -3  -2  -1   0   1     (belts run west, to the left)
    row 0  <  [S] <   <   <   <   <   <   I      top wagon, rows 0-5
    row 1  <  [S] <   <   <   .   ^   <   I
    row 2  <  [S] <   o   ^   i   <   <   I      I  inserter out of the last chest
    row 3  <  [S] <   <   ^   .   ^   <   I      ^  belt going up     <  belt going west
    row 4  <  [S] o   ^   ^   i   <   <   I      i/o  tunnel entrance / exit
    row 5  <  [S] <   ^   ^   .   ^   <   I      [S] splitter (two rows tall)
    row 6         ^   ^   ^                      empty row between the wagons
    row 7         ^   ^   ^   <   <   <   I      bottom wagon, rows 7-12
    ...

1. Merge. An inserter fills one lane of its belt (the right-hand lane). Every second
   row turns into the row above it from the side, which fills the other lane. Six
   half-full belts per wagon become three full ones.
2. Weave. The three bottom belts climb into the free rows between the three top
   belts. The top belts duck under them through short tunnels.
3. Pair. Each top belt now runs beside one bottom belt, and each pair goes through a
   splitter. A splitter takes the same amount from both inputs, so every pair takes as
   much from the top wagon as from the bottom one, whatever happens to the outputs.

Usage: python3 tools/unload_mixer.py      prints JSON: three variants with checks
"""
import json

from blueprint import Blueprint, E, N, S, W

ROWS = 6
DEPTH = 7
TOP = list(range(0, ROWS))                 # rows 0-5
BOTTOM = list(range(ROWS + 1, 2 * ROWS + 1))   # rows 7-12
BELT, TUNNEL, SPLITTER = 'fast-transport-belt', 'fast-underground-belt', 'fast-splitter'
SPLITTER_X = -6


def mixer(bp, outputs='top'):
    """Add the mixer west of x = 1. outputs: 'top' sends all six belts out on rows 0-5;
    'split' sends three out on rows 0-2 and three on rows 7-9."""
    def belt(x, y, d):
        bp.add(BELT, x, y, d)

    def run(xs, y, d=W):
        for x in xs:
            belt(x, y, d)

    def climb(x, rows):
        for y in rows:
            belt(x, y, N)

    # 1. Merge: rows 1,3,5 and 8,10,12 join the row above them from the side.
    for y in TOP + BOTTOM:
        belt(0, y, W)
    for y in (1, 3, 5, 8, 10, 12):
        belt(-1, y, N)
    for y in (0, 2, 4, 7, 9, 11):
        belt(-1, y, W)

    # 2. Weave. Bottom belts on rows 7, 9, 11 climb to rows 1, 3, 5.
    run([-2], 7); belt(-3, 7, N); climb(-3, range(6, 1, -1)); run([-3, -4, -5], 1)
    run([-2, -3], 9); belt(-4, 9, N); climb(-4, range(8, 3, -1)); run([-4, -5], 3)
    run([-2, -3, -4], 11); belt(-5, 11, N); climb(-5, range(10, 5, -1)); run([-5], 5)
    # Top belts: row 0 straight, rows 2 and 4 pass under the climbing belts.
    run([-2, -3, -4, -5], 0)
    bp.add(TUNNEL, -2, 2, W, type='input'); bp.add(TUNNEL, -4, 2, W, type='output'); run([-5], 2)
    bp.add(TUNNEL, -2, 4, W, type='input'); bp.add(TUNNEL, -5, 4, W, type='output')

    # 3. Pair: one splitter per pair of rows.
    splitters = [bp.add(SPLITTER, SPLITTER_X, y, W) for y in (0, 2, 4)]

    # Outputs.
    if outputs == 'top':
        for y in TOP:
            belt(-7, y, W)
    else:
        for y in (0, 1, 2):
            run([-7, -8, -9, -10], y)
        belt(-7, 5, S); 
        for y in (6, 7, 8):
            belt(-7, y, S)
        run([-7, -8, -9, -10], 9)
        belt(-7, 4, W); belt(-8, 4, S)
        for y in (5, 6, 7):
            belt(-8, y, S)
        run([-8, -9, -10], 8)
        run([-7, -8], 3); belt(-9, 3, S)
        for y in (4, 5, 6):
            belt(-9, y, S)
        run([-9, -10], 7)
    return splitters


def output_inserters(bp):
    return {y: bp.add('bulk-inserter', 1, y, E) for y in TOP + BOTTOM}


def chests_and_chain(bp):
    """The chest grid, the inserters between the chests and at the wagon, and poles."""
    for y in TOP + BOTTOM:
        for i in range(DEPTH):
            bp.add('steel-chest', 2 + 2 * i, y)
            bp.add('bulk-inserter', 3 + 2 * i, y, E)
    poles = {}
    for y in (-1, 6, 13):
        for x in (3, 9, 15):
            poles[x, y] = bp.add('medium-electric-pole', x, y)
    for y in (-1, 6, 13):
        bp.wire(poles[3, y], poles[9, y]); bp.wire(poles[9, y], poles[15, y])
    bp.wire(poles[3, -1], poles[3, 6]); bp.wire(poles[3, 6], poles[3, 13])


def build(variant):
    whole = variant == 'station'
    outputs = 'top' if variant == 'top' else 'split'
    label = {'top': 'Unloading mixer: 6 belts out on the top rows',
             'split': 'Unloading mixer: 3 belts out top, 3 bottom',
             'station': 'Balanced unloading station: 2 wagons, 7 chests deep'}[variant]
    bp = Blueprint(label, icons=['fast-splitter', 'steel-chest'],
                   description='Each wagon\'s six rows merge into three full belts; every top belt shares a '
                               'splitter with a bottom belt, so both wagons drain at the same rate.')
    splitters = mixer(bp, outputs)
    output_inserters(bp)
    if whole:
        chests_and_chain(bp)
    return bp, splitters


def verify(bp, splitters, variant):
    """What must hold for the mixer to balance the two wagons."""
    problems = bp.check(already_powered=() if variant == 'station' else {'bulk-inserter'})
    feeds, flow_problems = bp.belt_flow()
    problems += flow_problems
    # every second row joins its neighbour from the side (so it fills the other lane)
    joins = set(bp.side_loads())
    want = {((-1, y), (-1, y - 1)) for y in (1, 3, 5, 8, 10, 12)}
    if joins != want:
        problems.append('side joins are %s, expected %s' % (sorted(joins), sorted(want)))
    # each splitter gets exactly one top-wagon belt and one bottom-wagon belt
    seen = {n: {'top': set(), 'bottom': set()} for n in splitters}
    ends_by_side = {'top': set(), 'bottom': set()}
    for side, rows in (('top', TOP), ('bottom', BOTTOM)):
        for y in rows:
            ends, through = bp.reach((0, y))
            if len(through) != 1:
                problems.append('row %d passes %d splitters, expected 1' % (y, len(through)))
            for n in through:
                seen[n][side].add(y)
            if len(ends) != 2:
                problems.append('row %d reaches %d outputs, expected 2' % (y, len(ends)))
            ends_by_side[side] |= ends
    for n, sides in seen.items():
        if len(sides['top']) != 2 or len(sides['bottom']) != 2:
            problems.append('splitter #%d is fed by top rows %s and bottom rows %s' % (n, sorted(sides['top']), sorted(sides['bottom'])))
    if ends_by_side['top'] != ends_by_side['bottom'] or len(ends_by_side['top']) != 6:
        problems.append('outputs differ between wagons: %s vs %s' % (sorted(ends_by_side['top']), sorted(ends_by_side['bottom'])))
    pairs = {n: (sorted(s['top']), sorted(s['bottom'])) for n, s in seen.items()}
    return problems, pairs, sorted(ends_by_side['top'])


if __name__ == '__main__':
    out = []
    for variant in ('top', 'split', 'station'):
        bp, splitters = build(variant)
        problems, pairs, ends = verify(bp, splitters, variant)
        out.append({'variant': variant, 'label': bp.label, 'string': bp.encode(), 'counts': bp.count(), 'size': bp.size(),
                    'splitter_inputs': list(pairs.values()), 'outputs': ends, 'problems': problems})
    print(json.dumps(out, indent=1))
