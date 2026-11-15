"""Train unloading balancer for a two-wagon station. Wiring only: nothing is moved.

Station it is laid over (belts on the west, track on the east):

    belt  I  C  i  C  i  C  i  C  i  C  i  C  i  C  i  wagon      6 rows per wagon,
                                                                  1 empty row between wagons
    I = inserter onto the belt (gets a condition)      C = steel chest (gets a wire)
    i = inserters between chests and at the wagon (not in the blueprint)

How it balances: all chests of the top wagon are wired together, and so are all chests
of the bottom wagon. One arithmetic combinator per group adds everything up
(Each * 1 -> T for the top group, Each * 1 -> B for the bottom group). The inserters
that load the belts run only while their own group holds at least as much as the other:
top T >= B, bottom B >= T. The fuller side is emptied first, so the two sides level out
and both wagons can keep unloading.

Placing a blueprint over existing entities of the same type adds its wires and copies
its settings onto them, so the station's chests and inserters are reused, not rebuilt.

Usage: python3 tools/unload_balancer.py      prints JSON with the string and checks
"""
import json

from blueprint import GREEN, IN_RED, OUT_GREEN, RED, Blueprint, E

ROWS = 6          # inserters per wagon side
DEPTH = 7         # chests in each row
GAP = 1           # empty tile rows between the two wagons
INSERTER_X = 1    # column 0 is the belt
CHEST_X = [2 + 2 * i for i in range(DEPTH)]
TOP = list(range(0, ROWS))
BOTTOM = list(range(ROWS + GAP, 2 * ROWS + GAP))


def signal(name):
    return {'type': 'virtual', 'name': name}


def balancer():
    bp = Blueprint('Unloading balancer: 2 wagons, wiring only', icons=['arithmetic-combinator', 'steel-chest'],
                   description='Place over the station so the chests line up. Top inserters run while T >= B, '
                               'bottom inserters while B >= T (T, B = ore in each wagon\'s chests).')
    chest, inserter = {}, {}
    for rows, mine, other in ((TOP, 'signal-T', 'signal-B'), (BOTTOM, 'signal-B', 'signal-T')):
        for y in rows:
            inserter[y] = bp.add('bulk-inserter', INSERTER_X, y, E, control_behavior={
                'circuit_enabled': True,
                'circuit_condition': {'first_signal': signal(mine), 'second_signal': signal(other), 'comparator': '≥'}})
            for x in CHEST_X:
                chest[x, y] = bp.add('steel-chest', x, y)

    def summer(y, out):
        # Two tiles wide, lying over the inserter column and the first chest column.
        return bp.add('arithmetic-combinator', INSERTER_X, y, E, control_behavior={'arithmetic_conditions': {
            'first_signal': signal('signal-each'), 'second_constant': 1, 'operation': '*', 'output_signal': signal(out)}})

    top_sum = summer(TOP[0] - 1, 'signal-T')
    bottom_sum = summer(BOTTOM[-1] + 1, 'signal-B')
    # A pole next to each combinator. The screenshot shows poles on these tiles already;
    # if so these are no-ops, if not they are built and power the combinators.
    bp.add('medium-electric-pole', INSERTER_X + 2, TOP[0] - 1)
    bp.add('medium-electric-pole', INSERTER_X + 2, BOTTOM[-1] + 1)

    # Red: every chest of a group on one network, ending at that group's combinator input.
    for rows, edge, comb in ((TOP, TOP[0], top_sum), (BOTTOM, BOTTOM[-1], bottom_sum)):
        for x in CHEST_X:
            for y in rows[:-1]:
                bp.wire(chest[x, y], chest[x, y + 1], RED)
        for a, b in zip(CHEST_X, CHEST_X[1:]):
            bp.wire(chest[a, edge], chest[b, edge], RED)
        bp.wire(chest[CHEST_X[0], edge], comb, RED, IN_RED)

    # Green: both combinator outputs and all twelve belt inserters on one network.
    ys = TOP + BOTTOM
    for a, b in zip(ys, ys[1:]):
        bp.wire(inserter[a], inserter[b], GREEN)
    bp.wire(top_sum, inserter[TOP[0]], OUT_GREEN, GREEN)
    bp.wire(bottom_sum, inserter[BOTTOM[-1]], OUT_GREEN, GREEN)
    return bp, chest, inserter, top_sum, bottom_sum


def verify(bp, chest, inserter, top_sum, bottom_sum):
    """The three networks must be exactly: top chests + top input, bottom chests + bottom
    input, and the twelve inserters + both outputs. Nothing else, and never joined."""
    problems = bp.check(already_powered={'bulk-inserter'})
    want = [
        {(chest[x, y], RED) for x in CHEST_X for y in TOP} | {(top_sum, IN_RED)},
        {(chest[x, y], RED) for x in CHEST_X for y in BOTTOM} | {(bottom_sum, IN_RED)},
        {(n, GREEN) for n in inserter.values()} | {(top_sum, OUT_GREEN), (bottom_sum, OUT_GREEN)},
    ]
    got = bp.networks()
    if sorted(map(sorted, got)) != sorted(map(sorted, want)):
        problems.append('circuit networks are not the three expected ones (%d found)' % len(got))
    return problems


def simulate(top, bottom):
    """What the inserters do for given chest totals: (top runs, bottom runs)."""
    t, b = top * 1, bottom * 1
    return t >= b, b >= t


if __name__ == '__main__':
    bp, chest, inserter, top_sum, bottom_sum = balancer()
    cases = {'%d/%d' % c: simulate(*c) for c in ((0, 0), (100000, 2000), (2000, 100000), (5000, 5000))}
    print(json.dumps({'label': bp.label, 'string': bp.encode(), 'counts': bp.count(), 'size': bp.size(),
                      'wires': len(bp.wires), 'networks': sorted(len(n) for n in bp.networks()),
                      'problems': verify(bp, chest, inserter, top_sum, bottom_sum), 'cases': cases}, indent=1, ensure_ascii=False))
