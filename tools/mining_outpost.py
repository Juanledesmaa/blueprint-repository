"""Mining outpost: two rows of electric mining drills facing one belt.

    pole  drill drill  pole  drill drill  pole      <- drills face down
    ========================================> belt
          drill drill        drill drill            <- drills face up

Each 7-tile step holds one pole column and two drills per row (4 drills). One
medium pole per step powers the four drills around it, and poles are 7 tiles
apart (wire reach is 9).

Rates (wiki): an electric mining drill mines 0.5 ore/s; a yellow belt carries 15
items/s, 7.5 per lane. Each row fills one lane, so 15 drills per row is the limit.

Usage: python3 tools/mining_outpost.py [steps ...]      (default: 7 and 1)
Prints JSON: label, string, counts, size, ore per second, and the check result.
"""
import json
import sys

from blueprint import Blueprint, E, N, S

DRILL_RATE = 0.5      # ore per second, electric mining drill on iron/copper/coal/stone
BELT_RATE = 15        # items per second, transport belt (yellow)
DRILL_POWER_KW = 90


def outpost(steps, tileable=False):
    drills = steps * 4
    label = 'Mining segment 7x7 (4 drills)' if tileable else 'Mining outpost: %d drills, yellow belt out' % drills
    bp = Blueprint(label, icons=['electric-mining-drill', 'transport-belt'],
                   description='Two rows of electric mining drills on one belt. %d drills = %g ore/s.' % (drills, drills * DRILL_RATE))
    width = steps * 7 + (0 if tileable else 1)   # a full outpost ends with one more pole column
    for x in range(width):
        bp.add('transport-belt', x, 3, E)
    previous = None
    for step in range(steps + (0 if tileable else 1)):
        pole = bp.add('medium-electric-pole', step * 7, 2)
        if previous:
            bp.wire(previous, pole)
        previous = pole
        if step < steps:
            for x in (step * 7 + 1, step * 7 + 4):
                bp.add('electric-mining-drill', x, 0, S)
                bp.add('electric-mining-drill', x, 4, N)
    if tileable:
        bp.snap_to_grid(7, 7)
    return bp


def describe(bp, tileable=False):
    counts = bp.count()
    drills = counts['electric-mining-drill']
    problems = bp.check()
    if tileable:
        # On its own the last two drills wait for the next segment's pole; that is expected.
        problems = [p for p in problems if 'supply area' not in p]
    return {'label': bp.label, 'string': bp.encode(), 'counts': counts, 'size': bp.size(),
            'ore_per_second': drills * DRILL_RATE, 'belt_share': drills * DRILL_RATE / BELT_RATE,
            'power_kw': drills * DRILL_POWER_KW, 'problems': problems}


if __name__ == '__main__':
    steps = [int(a) for a in sys.argv[1:]] or [7, 1]
    out = [describe(outpost(n, tileable=(n == 1)), tileable=(n == 1)) for n in steps]
    print(json.dumps(out, indent=1))
