/* Combinators tab content.
   Facts researched from wiki.factorio.com (CC BY-NC-SA 3.0), checked against game version 2.1.
   Text shorthand: {SA} Space Age only · {2.1} added in 2.1 · {red}/{green} wire colours ·
   [[tab/id|label]] link to another topic. */
const COMBINATORS_GUIDE = (() => {

  /* ---- Wiring diagram helpers ----
     N(x, centreY, width, title, lines) = an entity box; C(...) = a combinator (input left, output right).
     link(a, b, colour) = wire from a's right edge to b's left edge; loop(n, colour) = output wired back to input. */
  const N = (x, cy, w, t, l, k) => {
    const h = l.length ? 34 + 15 * l.length : 32;
    return { x, y: cy - h / 2, w, h, t, l, k, cy };
  };
  const C = (x, cy, w, t, l) => N(x, cy, w, t, l, 'c');
  const right = n => n.x + n.w;
  const link = (a, b, c, dy1 = 0, dy2 = dy1) => {
    const x1 = right(a), y1 = a.cy + dy1, x2 = b.x, y2 = b.cy + dy2;
    if (y1 === y2) return { c, p: [[x1, y1], [x2, y2]] };
    const mx = Math.round((x1 + x2) / 2);
    return { c, p: [[x1, y1], [mx, y1], [mx, y2], [x2, y2]] };
  };
  const loop = (n, c) => ({
    c,
    p: [[right(n), n.cy], [right(n) + 16, n.cy], [right(n) + 16, n.y - 16],
        [n.x - 16, n.y - 16], [n.x - 16, n.cy - 9], [n.x, n.cy - 9]],
  });
  const D = (w, h, nodes, wires, cap) => ({ w, h, nodes, wires, cap });

  const dgLamp = (() => {
    const chest = N(20, 60, 160, 'Steel chest', ['Read contents']);
    const lamp = N(260, 60, 200, 'Lamp', ['Enable if', 'magazine < 100']);
    return D(480, 120, [chest, lamp], [link(chest, lamp, 'r')],
      'One wire: the chest broadcasts what it holds, the lamp compares it with a number.');
  })();

  const dgLatch = (() => {
    const acc = N(20, 95, 150, 'Accumulator', ['Output: A', '= charge %']);
    const dec = C(230, 95, 230, 'Decider', ['A < 20', 'OR  A < 90 AND S > 0', 'Output: S = 1']);
    const sw = N(520, 95, 150, 'Power switch', ['Enable if', 'S > 0']);
    return D(690, 150, [acc, dec, sw], [link(acc, dec, 'r'), loop(dec, 'g'), link(dec, sw, 'g')],
      'The {green} wire feeds the decider\'s own output back in, so S stays on until A reaches 90.');
  })();

  const dgClock = (() => {
    const k = N(20, 90, 140, 'Constant', ['T = 1']);
    const dec = C(230, 90, 200, 'Decider', ['T < 60', 'Output: T', '(input count)']);
    const use = N(500, 90, 170, 'Rest of circuit', ['T = 1 … 60']);
    return D(690, 145, [k, dec, use], [link(k, dec, 'r'), loop(dec, 'r'), link(dec, use, 'r')],
      'Everything is on one {red} network. T climbs by 1 per tick and restarts after 60.');
  })();

  const dgMemory = (() => {
    const src = N(20, 95, 170, 'Pulse source', ['inserter or belt,', 'read mode: pulse']);
    const dec = C(260, 95, 200, 'Decider', ['R = 0', 'Output: Everything', '(input count)']);
    const use = N(530, 95, 160, 'Rest of circuit', ['running totals']);
    return D(710, 150, [src, dec, use], [link(src, dec, 'r'), loop(dec, 'g'), link(dec, use, 'g')],
      'Pulses arrive on {red}, the stored totals circulate on {green}. Send R = 1 on the {red} wire to clear.');
  })();

  const dgEdge = (() => {
    const src = N(20, 100, 150, 'Signal source', ['S = 0 or 1']);
    const ar = C(250, 100, 190, 'Arithmetic', ['Each × −1', 'Output: Each']);
    const use = N(520, 100, 180, 'Rest of circuit', ['S = 1 for one tick', 'when S rises']);
    return D(720, 150, [src, ar, use], [
      link(src, ar, 'r'),
      { c: 'g', p: [[170, 90], [210, 90], [210, 52], [478, 52], [478, 100]] },
      link(ar, use, 'g'),
    ], 'The {green} network carries the signal plus its negated copy from one tick earlier. They cancel except in the tick of a change.');
  })();

  const dgIsolator = (() => {
    const a = N(20, 60, 160, 'Network A', ['many signals']);
    const ar = C(250, 60, 180, 'Arithmetic', ['Each + 0', 'Output: Each']);
    const b = N(500, 60, 170, 'Network B', ['copy of A,', 'nothing flows back']);
    return D(690, 120, [a, ar, b], [link(a, ar, 'r'), link(ar, b, 'g')],
      'A one-way valve for signals. It also lets you change wire colour.');
  })();

  const dgFilter = (() => {
    const data = N(20, 55, 170, 'Data', ['many signals']);
    const wl = N(20, 140, 170, 'Constant', ['signals to keep,', 'each set to 1']);
    const dec = C(280, 97, 230, 'Decider', ['Each [green] > 0', 'Output: Each', 'input count [red]']);
    const out = N(580, 97, 160, 'Result', ['only the listed', 'signals pass']);
    return D(760, 190, [data, wl, dec, out], [link(data, dec, 'r', 0, -9), link(wl, dec, 'g', 0, 9), link(dec, out, 'r')],
      'The condition looks only at the {green} wire, the output value is taken only from the {red} wire.');
  })();

  const dgBalance = (() => {
    const ch = N(20, 100, 170, 'All chests', ['wired together,', 'read contents']);
    const ar = C(260, 100, 200, 'Arithmetic', ['Each ÷ −N', 'Output: Each', '(N = chest count)']);
    const ins = N(530, 100, 200, 'Every inserter', ['Enable if', 'Everything < 0']);
    return D(750, 190, [ch, ar, ins], [
      link(ch, ar, 'r'), link(ar, ins, 'r'),
      { c: 'g', p: [[105, 132], [105, 164], [630, 164], [630, 132]] },
    ], '{red}: the negative average goes to every inserter. {green}: each inserter is wired only to the chest it fills.');
  })();

  const dgOutpost = (() => {
    const chest = N(20, 60, 170, 'Supply chest', ['Read contents']);
    const ar = C(250, 60, 180, 'Arithmetic', ['Each × −1', 'Output: Each']);
    const k = N(250, 150, 180, 'Constant', ['wanted stock:', '50 turret, 200 ammo']);
    const ins = N(500, 60, 210, 'Unloading inserter', ['Set filters', '(from signals)']);
    return D(730, 200, [chest, ar, k, ins], [
      link(chest, ar, 'r'), link(ar, ins, 'r'),
      { c: 'r', p: [[430, 150], [465, 150], [465, 60]] },
    ], 'The inserter sees wanted minus stocked. Only items still missing are positive, so only those are filtered in.');
  })();

  const dgRecipe = (() => {
    const k = N(20, 55, 180, 'Constant', ['target stock', 'per item']);
    const chest = N(20, 142, 180, 'Output chest', ['Read contents']);
    const dec = C(290, 97, 240, 'Decider', ['Each [green] > Each [red]', 'Output: Each = 1']);
    const asm = N(600, 97, 190, 'Assembler', ['Set recipe', '(from signals)']);
    return D(810, 190, [k, chest, dec, asm], [link(k, dec, 'g', 0, -9), link(chest, dec, 'r', 0, 9), link(dec, asm, 'r')],
      'Targets on {green}, current stock on {red}. Every item that is short becomes a recipe signal.');
  })();

  const dgTrainLimit = (() => {
    const ch = N(20, 60, 180, 'Station chests', ['wired together,', 'read contents']);
    const ar = C(270, 60, 210, 'Arithmetic', ['iron ore ÷ 4000', 'Output: L']);
    const ts = N(550, 60, 190, 'Train stop', ['Set train limit', 'from signal L']);
    return D(760, 120, [ch, ar, ts], [link(ch, ar, 'r'), link(ar, ts, 'g')],
      '4000 is one train load in this example (two cargo wagons of ore). L is the number of full loads waiting.');
  })();

  const dgPulse = (() => {
    const c = N(20, 60, 150, 'Clock', ['T = 1 … 60']);
    const dec = C(240, 60, 190, 'Decider', ['T = 60', 'Output: P = 1']);
    const use = N(500, 60, 190, 'Rest of circuit', ['P = 1 for one tick,', 'once per second']);
    return D(710, 120, [c, dec, use], [link(c, dec, 'r'), link(dec, use, 'g')],
      'A decider that is true for exactly one value of the clock.');
  })();

  const dgCrossing = (() => {
    const gate = N(20, 60, 210, 'Wall next to gate', ['Read sensor:', 'G = 1 when opening']);
    const sig = N(310, 60, 200, 'Rail signals', ['Close signal if', 'G = 1']);
    return D(530, 120, [gate, sig], [link(gate, sig, 'r')],
      'While the gate opens for you, the signals on both sides of the crossing turn red.');
  })();

  const dgNuclear = (() => {
    const r = N(20, 60, 190, 'Nuclear reactor', ['Read temperature:', 'signal T']);
    const ins = N(290, 60, 220, 'Fuel inserter', ['Enable if T < limit', 'Stack size 1']);
    return D(530, 120, [r, ins], [link(r, ins, 'r')],
      'Fuel goes in only when the reactor has cooled down, one cell at a time.');
  })();

  const dgSushi = (() => {
    const belt = N(20, 60, 200, 'One belt tile', ['Read contents:', 'Hold (all belts)']);
    const ins = N(300, 60, 230, 'Every loading inserter', ['Enable if', 'its own item < 30']);
    return D(550, 120, [belt, ins], [link(belt, ins, 'r')],
      'One belt tile reports the whole loop. Each inserter tops up only its own item.');
  })();

  const dgRadar = (() => {
    const src = N(20, 60, 150, 'Outpost', ['any signals']);
    const r1 = N(220, 60, 120, 'Radar', ['at outpost']);
    const r2 = N(460, 60, 120, 'Radar', ['at base']);
    const dst = N(630, 60, 150, 'Main base', ['same signals']);
    return D(800, 120, [src, r1, r2, dst], [
      link(src, r1, 'r'), { c: 'air', p: [[340, 60], [460, 60]] }, link(r2, dst, 'r'),
    ], 'All radars on a surface share one {red} and one {green} channel. Colours stay separate across the link.');
  })();

  const dgRamp = (() => {
    const src = N(20, 100, 150, 'Source', ['P = 0 … 100']);
    const a1 = C(230, 60, 200, 'Arithmetic', ['P × 5', 'Output: green']);
    const a2 = C(230, 150, 200, 'Arithmetic', ['510 − green', 'Output: red']);
    const lamp = N(520, 100, 190, 'Lamp', ['Use colors:', 'color components']);
    return D(730, 200, [src, a1, a2, lamp], [
      link(src, a1, 'r'),
      { c: 'r', p: [[430, 60], [475, 60], [475, 91], [520, 91]] },
      { c: 'r', p: [[452, 60], [452, 112], [212, 112], [212, 150], [230, 150]] },
      { c: 'g', p: [[430, 150], [475, 150], [475, 109], [520, 109]] },
    ], '"green" and "red" here are the colour signals. The lamp clamps each to 0–255, which shapes the ramp.');
  })();

  return {
    colors: {
      'Basics': '#2F7FD1',
      'Signals & logic': '#D9A821',
      'Combinators': '#D2373C',
      'Devices': '#3F9B57',
      'Building blocks': '#8A4FD0',
      'Recipes': '#E07B2A',
      'Troubleshooting': '#8E94A0',
    },
    entries: [

      /* ================= Basics ================= */
      {
        id: 'overview',
        title: 'What the circuit network is',
        category: 'Basics',
        type: 'Explainer',
        sum: 'Wires carry numbers between machines. Senders put numbers on a wire, receivers act on them, combinators transform them.',
        facts: [
          ['Unlock', 'Circuit network: 100 × automation + logistic science'],
          ['Wires', 'Red and green, free from the shortcut bar'],
          ['Combinators', 'Constant, arithmetic, decider, selector'],
          ['Game speed', '60 ticks per second'],
        ],
        cheat: [
          'A <b>signal</b> is a named channel with a whole number: "iron plate = 200".',
          '<b>Senders</b> (chests, tanks, belts …) broadcast what they hold.',
          '<b>Receivers</b> (inserters, pumps, lamps …) switch on a condition.',
          '<b>Combinators</b> read signals, compute, and write new signals.',
          'You can ignore combinators at first: one wire and one condition already does a lot.',
        ],
        body: `
<p>A circuit network is a set of devices joined by wire of one colour. Every device on it can see the same signals. Most senders are storage devices that broadcast their contents: a storage tank with 1000 crude oil puts 1000 on the crude oil channel. Receivers compare a signal with a number or with another signal and enable themselves when the condition holds.</p>
<p>The circuit network research unlocks the three basic combinators, the display panel, the power switch and the programmable speaker. The selector combinator needs Advanced combinators (50 × automation, logistic and chemical science).</p>
<h4>Where to go next</h4>
<ul>
<li>[[combinators/wires|Red &amp; green wires]] and [[combinators/first-circuit|your first circuit]].</li>
<li>[[combinators/signals|Signals]], [[combinators/summing|how wires combine]] and the [[combinators/logic-signals|three logic signals]].</li>
<li>The [[combinators/combinator-comparison|four combinators]].</li>
<li>[[combinators/isolator|Building blocks]] such as latches, clocks and memory, then full recipes.</li>
</ul>`,
        src: ['Circuit network', 'Circuit network (research)', 'Advanced combinators (research)'],
        kw: 'introduction basics what is circuits',
      },
      {
        id: 'wires',
        title: 'Red & green wires',
        category: 'Basics',
        type: 'Explainer',
        sum: 'Two independent wire colours. Same colour joins into one network; red and green never mix.',
        facts: [
          ['Red wire', '<kbd>Alt</kbd> + <kbd>R</kbd>'],
          ['Green wire', '<kbd>Alt</kbd> + <kbd>G</kbd>'],
          ['Cost', 'Free (shortcut bar tools since 2.0)'],
          ['Clear a pole', '<kbd>Shift</kbd> + click it (twice for circuit wires)'],
        ],
        cheat: [
          'Connect: hold a wire, click one entity, then the other.',
          'Disconnect: do the same again with the same colour.',
          'Electric poles carry wires over distance without using the signals.',
          'Two {red} wires on one pole merge. A {red} and a {green} on the same pole stay separate.',
          'Combinators have two ends: wire the <b>input</b> and the <b>output</b> side separately.',
          'Blueprints and copy-paste keep the wiring.',
        ],
        body: `
<p>Wires are no longer items. Pick the red or green wire tool from the shortcut bar or with its hotkey, click the first entity and then the second. The same works on electric poles, which is how wires cross longer distances. Clear the cursor with <kbd>Q</kbd>.</p>
<p>All wires of one colour that touch form a single network. There can be many separate red networks and many separate green ones. Having two colours lets you run two independent sets of signals through the same poles and into the same device, which matters as soon as a combinator's output must not mix with its input.</p>
<h4>Pole reach</h4>
<p>A wire between poles can be as long as the pole's wire reach: small pole 7.5 tiles, medium 9, big 32, substation 18.</p>
<h4>Handy behaviour</h4>
<ul>
<li>Hover an entity to highlight every wire attached to it. Hover a pole to see the signals on its networks.</li>
<li>Dragging a line of poles also strings circuit wire if the first pole already has one.</li>
<li>Removing a pole reconnects its neighbours so the network is not cut. A pole that is destroyed does not do this, but its ghost keeps the connections.</li>
<li>Cut and paste keeps connections to entities outside the selection where possible.</li>
<li>The first <kbd>Shift</kbd> + click on a pole removes its copper (power) connections, the second removes red and green wires.</li>
</ul>`,
        src: ['Red wire', 'Green wire', 'Circuit network', 'Controls', 'Version history/2.0.0'],
        kw: 'cable cables red green wire connect disconnect pole hotkey',
      },
      {
        id: 'first-circuit',
        title: 'Your first circuit: a warning lamp',
        category: 'Basics',
        type: 'How-to',
        sum: 'A lamp that lights when a chest runs low. One wire, no combinators.',
        cheat: [
          'Chest: <b>Read contents</b>.',
          'Lamp: <b>Enable if</b> <code>item &lt; 100</code>.',
          'One {red} wire between them.',
          'The same pattern drives inserters, pumps, belts and train stops.',
        ],
        steps: [
          'Place a chest and a lamp. The lamp needs power.',
          'Press <kbd>Alt</kbd> + <kbd>R</kbd> for red wire, click the chest, click the lamp, then press <kbd>Q</kbd>.',
          'Open the chest. In its circuit panel make sure <b>Read contents</b> is on.',
          'Open the lamp, tick <b>Enable if</b> and set the condition, for example <code>firearm magazine &lt; 100</code>.',
          'Optional: give the lamp a colour with the colour picker in its window.',
        ],
        diagram: dgLamp,
        body: `<p>Enabling one device from what another device broadcasts is the simplest and most widely useful circuit technique. Swap the lamp for an inserter and you have a [[combinators/recipe-limit-chest|stock limiter]]; swap the chest for a storage tank and the lamp for a pump and you have [[combinators/recipe-oil-cracking|oil cracking control]].</p>
<p>Several lamps on the same wire with rising thresholds make a bar display: <code>&ge; 1</code>, <code>&ge; 2</code>, <code>&ge; 3</code> and so on.</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Lamp'],
        kw: 'beginner tutorial indicator light low stock simple',
      },

      /* ================= Signals & logic ================= */
      {
        id: 'signals',
        title: 'Signals: channels and numbers',
        category: 'Signals & logic',
        type: 'Explainer',
        sum: 'Every item, fluid and virtual signal is its own channel, holding one whole number.',
        facts: [
          ['Range', '−2,147,483,648 to 2,147,483,647'],
          ['Overflow', 'Wraps around'],
          ['Zero', 'Same as "no signal"'],
          ['Same signal twice', 'Values add up'],
        ],
        cheat: [
          'Channels are independent: one wire carries all of them at once.',
          'Two tanks with 1000 oil each on one wire → crude oil = 2000.',
          'A signal at 0 does not exist as far as Each, Anything and Everything are concerned.',
          '2,147,483,647 + 10 = −2,147,483,639.',
        ],
        body: `
<p>A network has a channel for every item and fluid in the game and for every [[combinators/virtual-signals|virtual signal]]. Machine recipes can be signals too, which is how an assembler's recipe is set by circuit. All unused channels are zero.</p>
<p>Values are 32-bit signed integers. There are no fractions: division results are cut off ([[combinators/arithmetic-ops|operations]]). A number typed into a combinator can look larger than the limit until the window is closed, then it wraps.</p>
<p>Whenever several sources put the same signal on one network, the network value is the sum. This is the basis of most circuit tricks: adding a negative copy cancels a signal, adding a constant shifts a threshold.</p>`,
        src: ['Circuit network'],
        kw: 'signal channel value integer 32 bit overflow limit number',
      },
      {
        id: 'summing',
        title: 'How wires combine at a device',
        category: 'Signals & logic',
        type: 'Explainer',
        sum: 'Same-colour wires merge into one network. A device reading both colours gets red plus green.',
        cheat: [
          'Same colour, connected = one network, values summed.',
          'A device wired to both colours sees <b>red + green</b> by default.',
          'Combinators can read red, green or both, per operand (2.0).',
          '{2.1} Every wired device can pick wire colours for input and for output.',
          'A constant combinator writes the same values to every colour attached to it.',
        ],
        body: `
<p>Receiving devices add up the signals from every wire connected to them. An inserter with a red wire carrying 20 copper plates and a green wire carrying 10 sees 30.</p>
<p>The colours are still separate networks, which is what makes them useful. The wiki's example: chests A, B and C are chained with green wire, so anything on that green wire sees the total of all three. If a red wire goes from chest A alone to an inserter, the inserter sees only the contents of A.</p>
<p>Since 2.0 each operand of an arithmetic or decider combinator has red and green tick boxes, so one combinator can compare "this signal on red" against "that signal on green". {2.1} All connectable entities now group their settings into Input and Output and let you choose the wire colours for each.</p>`,
        src: ['Circuit network', 'Arithmetic combinator', 'Decider combinator', 'Version history/2.1.0'],
        kw: 'sum add red plus green merge network both wires select',
      },
      {
        id: 'timing',
        title: 'Ticks and delays',
        category: 'Signals & logic',
        type: 'Explainer',
        sum: 'The game runs 60 ticks per second. Each combinator adds one tick of delay.',
        facts: [
          ['1 tick', '1/60 second'],
          ['Arithmetic / decider', '1 tick from input to output'],
          ['Pulse', 'A signal present for exactly 1 tick'],
          ['Nauvis day', '25,200 ticks (7 minutes)'],
        ],
        cheat: [
          'Three combinators in a row = result arrives 3 ticks later.',
          'Two paths of different length arrive at different times. Pad the short one with an isolator.',
          'A combinator wired to itself sees its own output one tick later. That is how clocks and memory work.',
        ],
        body: `
<p>Each tick has two steps. First every combinator reads its input networks and computes. Then every network is updated to the sum of everything connected to it. A combinator's result is therefore visible to others only on the following tick.</p>
<p>This delay is harmless for slow things like tank levels, but it matters for pulses and for circuits that compare two signals that travelled through different numbers of combinators. It is also what makes feedback possible: a combinator whose output is wired to its own input adds to the value every tick ([[combinators/clock|clock]]) or holds it ([[combinators/memory|memory cell]]).</p>
<p>To watch a circuit step by step, use the map editor: pause the game and advance with the "tick once" control while hovering wires and combinators.</p>`,
        src: ['Tutorial:Combinator tutorial', 'Decider combinator', 'Time'],
        kw: 'tick delay latency timing 60 ups pulse sequence',
      },
      {
        id: 'virtual-signals',
        title: 'Virtual signals',
        category: 'Signals & logic',
        type: 'Reference',
        sum: 'Signals that stand for no item or fluid. Use them for your own flags, counters and control lines.',
        facts: [
          ['Count', '177 (241 with Space Age)'],
          ['Letters & digits', 'A–Z and 0–9'],
          ['Colours', 'Red, green, blue, yellow, magenta, cyan, white, grey, black'],
        ],
        cheat: [
          'They behave exactly like item signals.',
          'Also available: arrows, lines, crosses, check mark, info icons, enemies, trees, rocks, cliffs.',
          'The colour signals drive [[combinators/lamp|lamp]] colours.',
          'Three special ones (Everything, Anything, Each) are logic signals and cannot be sent over a wire.',
        ],
        body: `<p>Virtual signals are found on the Signals, Enemies, Environment and Unsorted tabs of the signal picker. Pick letters that mean something to you (S for "set", R for "reset", T for a timer) and note them in the combinator's description field so the circuit still makes sense later.</p>
<p>Several devices use fixed letters by default; the [[combinators/default-signals|default signal table]] lists them. All of those defaults can be changed in the device.</p>
<p>With "Show parameters in selection lists" enabled in the interface settings, ten purple parameter signals appear on the Unsorted tab. They are placeholders for blueprint parametrisation, where the real signal is chosen when the blueprint is placed.</p>`,
        src: ['Circuit network', 'Tutorial:Combinator tutorial', 'Blueprint'],
        kw: 'virtual letters numbers colors custom signal parameter',
      },
      {
        id: 'logic-signals',
        title: 'Everything, Anything, Each',
        category: 'Signals & logic',
        type: 'Reference',
        wide: true,
        sum: 'Three wildcard signals that stand for "all signals at once". They exist only inside conditions and combinators.',
        table: {
          head: ['Wildcard', 'Icon', 'As a condition', 'As a combinator output', 'Where it works'],
          rows: [
            ['Everything', 'Red star', 'True when <b>all</b> non-zero signals pass. Also true when there are no signals at all.', 'Decider: passes every non-zero input signal. Not allowed together with an Each condition.', 'Left side of any condition; decider output'],
            ['Anything', 'Green star', 'True when <b>at least one</b> signal passes. False when there are no signals.', 'Decider: passes one signal, the first match in Factoriopedia order (wooden chest comes first).', 'Left side of any condition; decider output'],
            ['Each', 'Yellow star', 'Runs the combinator once for every non-zero signal, each on its own.', 'Each as output: one result per signal. A normal signal as output: all results added together.', 'Arithmetic and decider combinators only'],
          ],
        },
        cheat: [
          '<b>Everything</b> = AND over all signals. <b>Anything</b> = OR. <b>Each</b> = a loop.',
          'A signal on the right side is skipped by Everything and Anything, so <code>Everything &gt; X</code> does not test X against itself.',
          'Each does <b>not</b> skip it: <code>Each × X</code> also outputs X × X.',
          'Each ignores signals that are 0, even if the condition would be true for 0.',
          'Each can be an output only if it is also an input.',
        ],
        body: `
<p>Because a signal counts as present only when it is non-zero, <code>Everything ≠ 0</code> is always true and <code>Anything = 0</code> is always false.</p>
<p>Everything and Anything can be used in the conditions of ordinary devices too. The [[combinators/recipe-balanced-loading|balanced loader]] enables its inserters with <code>Everything &lt; 0</code>.</p>
<p>A combinator using Each behaves like a stack of identical combinators, one per signal, with their outputs joined. <code>Each × 2 → Each</code> doubles every signal; <code>Each + 0 → Each</code> copies everything unchanged ([[combinators/isolator|isolator]]); <code>Each &gt; 100 → Each</code> on a decider keeps only the signals above 100.</p>`,
        src: ['Circuit network', 'Decider combinator', 'Arithmetic combinator', 'Tutorial:Combinator tutorial'],
        kw: 'wildcard star everything anything each all any red green yellow',
      },
      {
        id: 'default-signals',
        title: 'Default signal letters',
        category: 'Signals & logic',
        type: 'Reference',
        wide: true,
        sum: 'The letters devices use out of the box. Every one of them can be changed in the device.',
        table: {
          head: ['Signal', 'Device', 'Meaning', 'Direction'],
          rows: [
            ['A', 'Accumulator', 'Charge level, 0–100%', 'Output'],
            ['G', 'Gate (via the wall next to it)', 'A player or vehicle is opening the gate', 'Output'],
            ['T', 'Nuclear reactor, heating tower {SA}, heat pipe {2.1}', 'Temperature', 'Output'],
            ['T', 'Train stop', 'ID number of the stopped train', 'Output'],
            ['C', 'Train stop', 'Trains on their way here, including the one at the stop', 'Output'],
            ['L', 'Train stop', 'Train limit', 'Input'],
            ['P', 'Train stop', 'Priority (0–255, default 50)', 'Input'],
            ['S', 'Inserter', 'Stack size override', 'Input'],
            ['E', 'Chests, logistic chests, cargo landing pad {2.1}', 'Empty slots', 'Output'],
            ['X / Y', 'Roboport', 'Available / total logistic robots', 'Output'],
            ['Z / T', 'Roboport', 'Available / total construction robots', 'Output'],
            ['R', 'Roboport', 'Roboports in the network', 'Output'],
            ['R', 'Rocket silo {2.1}', 'One-tick pulse when a rocket launches', 'Output'],
            ['V / D', 'Space platform hub {SA}', 'Speed / damage taken', 'Output'],
            ['T / D / L', 'Selector combinator, Time mode {2.1}', 'Game tick / tick of the day / day length', 'Output'],
            ['Red, yellow, green', 'Rail signal', 'Its current state. Chain signals add blue.', 'Output'],
          ],
        },
        cheat: [
          'T and R are reused by several devices. Rename one if two of them share a wire.',
          'A rail signal that is held red by its circuit condition does not output red.',
        ],
        src: ['Circuit network', 'Train stop', 'Inserters', 'Selector combinator', 'Version history/2.1.0'],
        kw: 'default letter signal table A G T C L P S E X Y Z R V D',
      },

      /* ================= Combinators ================= */
      {
        id: 'combinator-comparison',
        title: 'The four combinators at a glance',
        category: 'Combinators',
        type: 'Reference',
        wide: true,
        sum: 'What each one is for, what it costs and where it unlocks.',
        table: {
          head: ['Combinator', 'What it does', 'Power', 'Recipe', 'Unlock'],
          rows: [
            ['Constant', 'Outputs fixed signals you type in. No input.', 'None', '5 copper cable, 2 electronic circuits', 'Circuit network'],
            ['Arithmetic', 'Does maths on signals: + − × ÷ %, power, bit shifts, AND, OR, XOR.', '1 kW', '5 copper cable, 5 electronic circuits', 'Circuit network'],
            ['Decider', 'Tests conditions (with AND / OR) and outputs signals when they hold.', '1 kW', '5 copper cable, 5 electronic circuits', 'Circuit network'],
            ['Selector', 'Picks the largest or smallest signal, counts, picks at random, looks up stack size and more.', '1 kW', '5 decider combinators, 2 advanced circuits', 'Advanced combinators'],
          ],
        },
        cheat: [
          'Need a number or a setting? <b>Constant</b>.',
          'Need to calculate? <b>Arithmetic</b>.',
          'Need if / then? <b>Decider</b>.',
          'Need "which one is biggest"? <b>Selector</b>.',
        ],
        body: `<p>Arithmetic, decider and selector combinators have an input end and an output end; wire them separately. Hover a combinator to see its current input and output signals. Since 2.0 every combinator has a free-text description field, and the window shows the live input signals while you configure it.</p>`,
        src: ['Arithmetic combinator', 'Decider combinator', 'Constant combinator', 'Selector combinator', 'Version history/2.0.0'],
        kw: 'compare combinators table which one',
      },
      {
        id: 'constant-combinator',
        title: 'Constant combinator',
        category: 'Combinators',
        type: 'Reference',
        sum: 'Outputs the signals you type in, all the time, to every wire attached.',
        facts: [
          ['Power', 'None needed'],
          ['Switch', 'On/off toggle in its window'],
          ['Recipe', '5 copper cable + 2 electronic circuits'],
        ],
        cheat: [
          'The place for thresholds, targets, whitelists and settings.',
          'The same signal entered twice is output as the sum.',
          'It cannot send different values on red and green. Use two combinators.',
          'To switch it by circuit, run its output through a decider.',
          'Its signal lists are logistic groups: name one to share it.',
        ],
        body: `
<p>The constant combinator has no input. It is the usual way to give a circuit a number to compare against, and a quick way to test a circuit by injecting signals by hand. It works without electricity.</p>
<p>Since 2.0 its contents are organised as [[logistics/logistic-groups|logistic groups]]. A named group is shared: the same list can be the request list of a requester chest and the output of a constant combinator. A request has a minimum and a maximum, a signal has one number, so the combinator outputs the minimum. Entries added from the combinator get an infinite maximum.</p>`,
        src: ['Constant combinator', 'Circuit network', 'Logistic network'],
        kw: 'constant fixed value setting number',
      },
      {
        id: 'arithmetic-combinator',
        title: 'Arithmetic combinator',
        category: 'Combinators',
        type: 'Reference',
        sum: 'Takes two operands, applies one operation, writes the result to an output signal.',
        facts: [
          ['Form', 'left ○ right → output'],
          ['Operands', 'A signal, a constant, or Each'],
          ['Wire choice', 'Red, green or both, per operand'],
          ['Power', '1 kW'],
          ['Delay', '1 tick'],
        ],
        cheat: [
          '<code>Each ○ value → Each</code>: apply to every signal, keep the names.',
          '<code>Each ○ value → X</code>: apply to every signal, add all results into X.',
          'Division cuts off the fraction. Results never round up.',
          '<code>Each + 0 → Each</code> is a one-way copy of a whole network.',
          'Output wired to input makes a runaway counter.',
        ],
        body: `
<p>Each operand is a single signal or a constant, and one of them may be the [[combinators/logic-signals|Each]] wildcard. The changelog for 2.0 also lists Each-with-Each operations when the two operands read different wire colours. For every signal operand you choose which wire colours to read; with both ticked the values are added first.</p>
<p>If neither operand is Each, the output must be a single signal. With Each, the output can be Each (one result per input signal) or a single signal (all results summed).</p>
<p>The eleven operations and their edge cases are in the [[combinators/arithmetic-ops|operations cheat sheet]].</p>
<h4>Feedback</h4>
<p>Input and output are different networks. If you connect them, the combinator keeps re-reading its own result: <code>X + 1 → X</code> wired to itself counts up 60 times per second. Combined with a decider this builds [[combinators/clock|clocks]] and [[combinators/memory|memory]].</p>`,
        src: ['Arithmetic combinator', 'Circuit network', 'Version history/2.0.0'],
        kw: 'math add subtract multiply divide calculate each',
      },
      {
        id: 'arithmetic-ops',
        title: 'Arithmetic operations cheat sheet',
        category: 'Combinators',
        type: 'Reference',
        wide: true,
        sum: 'All eleven operations of the arithmetic combinator, with the cases that trip people up.',
        table: {
          head: ['Operation', 'Symbol', 'Example', 'Good to know'],
          rows: [
            ['Add', '+', '7 + 5 = 12', ''],
            ['Subtract', '−', '7 − 5 = 2', ''],
            ['Multiply', '*', '7 * 5 = 35', 'Each * −1 negates a whole network.'],
            ['Divide', '/', '21 / 10 = 2 · −21 / 10 = −2', 'Truncates toward zero.'],
            ['Modulo', '%', '13 % 3 = 1 · −13 % 3 = −1', 'Sign follows the left operand. 13 % −3 is still 1.'],
            ['Power', '^', '2 ^ 10 = 1024', ''],
            ['Shift left', '&lt;&lt;', '1 &lt;&lt; 4 = 16', 'Multiplies by a power of two.'],
            ['Shift right', '&gt;&gt;', '16 &gt;&gt; 2 = 4', 'Keeps the sign (arithmetic shift).'],
            ['Bitwise AND', 'AND', '6 AND 3 = 2', '110 and 011 → 010'],
            ['Bitwise OR', 'OR', '6 OR 3 = 7', '110 or 011 → 111'],
            ['Bitwise XOR', 'XOR', '6 XOR 3 = 5', '110 xor 011 → 101'],
          ],
        },
        cheat: [
          'A digit of a number: <code>(N / 1000) % 10</code> gives the thousands digit.',
          'All results stay 32-bit integers and wrap on overflow.',
        ],
        src: ['Arithmetic combinator'],
        kw: 'operations operators divide modulo bit shift and or xor power exponent',
      },
      {
        id: 'decider-combinator',
        title: 'Decider combinator',
        category: 'Combinators',
        type: 'Reference',
        sum: 'A list of conditions on the left, a list of outputs on the right. When the conditions hold, the outputs are sent.',
        facts: [
          ['Comparisons', '&gt; &lt; = ≥ ≤ ≠'],
          ['Joining', 'AND / OR, AND binds tighter'],
          ['Output value', 'A constant, or the input count'],
          ['Power', '1 kW'],
          ['Delay', '1 tick'],
        ],
        cheat: [
          '<code>A OR B AND C</code> means <code>A OR (B AND C)</code>.',
          'Each side of a condition has its own red / green tick boxes.',
          'An output can be a constant (1 by default) or copy the input value from the chosen wires.',
          'Several outputs per combinator are allowed.',
          '{2.1} <b>Else</b> outputs are sent when the conditions fail.',
          'Supports Everything, Anything and Each.',
        ],
        table: {
          cap: 'What gets output when the conditions pass',
          head: ['Output signal', 'No Each in the conditions', 'Each in the conditions'],
          rows: [
            ['Everything', 'Every signal that is non-zero on the selected wires', 'Not available'],
            ['Anything', 'One signal that is non-zero on the selected wires', 'One of the signals that passed'],
            ['Each', 'Not available', 'Every signal that passed'],
            ['A specific signal', 'That signal', 'Every signal that passed, added together on that signal'],
          ],
        },
        body: `
<p>A condition is a first signal, a comparison and a second signal or constant. Since 2.0 one decider can hold many conditions joined by AND and OR. AND has higher precedence, so write the conditions as groups of ANDs separated by ORs.</p>
<p>Each output names a signal and either a constant value or "input count", which copies that signal's value from the input wires you tick. A decider that outputs <code>Everything</code> with input count is a gate: all signals pass while the condition is true and nothing passes while it is false.</p>
<p>If any condition uses Each, the whole condition list is evaluated once per input signal, and each signal that passes triggers the outputs.</p>
<p>Multiple conditions are what make single-combinator [[combinators/sr-latch|latches]] possible.</p>`,
        src: ['Decider combinator', 'Circuit network', 'Version history/2.1.0'],
        kw: 'condition compare if then and or else output input count',
      },
      {
        id: 'selector-combinator',
        title: 'Selector combinator',
        category: 'Combinators',
        type: 'Reference',
        sum: 'Sorting, counting, random choice and item look-ups in a single combinator.',
        facts: [
          ['Unlock', 'Advanced combinators'],
          ['Recipe', '5 decider combinators + 2 advanced circuits'],
          ['Power', '1 kW'],
        ],
        cheat: [
          '<b>Select input</b>: sort signals by value, output the one at an index (0 = first).',
          '<b>Count inputs</b>: how many different signals are present.',
          '<b>Random input</b>: pass one random signal, re-rolled every N ticks.',
          '<b>Stack size</b>: output each item\'s stack size.',
          '{2.1} <b>Time</b>: game tick, tick of the day, day length.',
          '{SA} Rocket capacity, quality filter, quality transfer, quality select {2.1}.',
        ],
        table: {
          head: ['Mode', 'Output', 'Details'],
          rows: [
            ['Select input', 'One input signal with its value', 'Sort descending (largest first, default) or ascending (smallest non-zero first). Index 0 is the first. An index out of range outputs nothing, except that a single input always passes. {2.1} The index can use &gt; or &lt; to output the N highest or lowest.'],
            ['Count inputs', 'Number of distinct input signals', 'Values are ignored. Result goes to a signal you choose.'],
            ['Random input', 'One random input signal', 'Updates every N ticks (default 1).'],
            ['Stack size', 'Stack size of every input item', 'Input values are ignored. Fluids and virtual signals give nothing.'],
            ['Rocket capacity {SA}', 'How many of each item fit in a rocket', 'Nothing for fluids, virtual signals or items too heavy for a rocket.'],
            ['Quality filter {SA}', 'Inputs whose quality passes a comparison', 'Compare against one quality grade with any comparison; against "any quality" only with =.'],
            ['Quality transfer {SA}', 'A target signal with a new quality', 'Quality chosen directly, or copied from another input signal.'],
            ['Quality select {SA} {2.1}', 'Highest or lowest quality of each signal', 'Values are kept.'],
            ['Time {2.1}', 'T = game tick, D = tick of the day, L = day length', 'A clock source that needs no feedback loop.'],
          ],
        },
        body: `<p>Typical uses: find the item you have least of (Select input, ascending), turn a count of items into a count of stacks (Stack size plus a division), work out how many of an item make a full rocket {SA}, or build a [[combinators/clock|clock]] from the Time mode.</p>`,
        src: ['Selector combinator', 'Version history/2.1.0'],
        kw: 'selector sort max min count random stack size rocket capacity quality time',
      },

      /* ================= Devices ================= */
      {
        id: 'lamp',
        title: 'Lamp',
        category: 'Devices',
        type: 'Reference',
        sum: 'The simplest indicator: on when a condition is true, in any colour.',
        cheat: [
          '<b>Enable if</b>: lights only while the condition holds.',
          '<b>Use colors → Color mapping</b>: takes the colour of the colour signal that is present.',
          'Several colour signals at once: red wins, then green, blue, yellow, magenta, cyan, white.',
          '<b>Color components</b>: red, green and blue signals as 0–255 each.',
          '<b>Packed RGB</b>: one number 0–16,777,215 on the white signal.',
        ],
        body: `
<p>A lamp can be set to always on and given a fixed colour in its own window. On a circuit network it gains an enable condition and three ways to take its colour from signals.</p>
<p>With colour mapping, send one of the colour virtual signals; grey and black only dim the lamp. With colour components, values below 0 count as 0 and values above 255 as 255, which the [[combinators/recipe-color-ramp|colour ramp recipe]] uses to fade from red through yellow to green.</p>
<p>Rows of lamps make bar graphs and number displays; for text or icons use a [[combinators/display-panel|display panel]].</p>`,
        src: ['Lamp', 'Circuit network', 'Tutorial:Circuit network cookbook'],
        kw: 'lamp light color colour rgb indicator display',
      },
      {
        id: 'display-panel',
        title: 'Display panel',
        category: 'Devices',
        type: 'Reference',
        sum: 'A 1×1 sign showing an icon and text, switchable by circuit conditions.',
        facts: [
          ['Power', 'None needed'],
          ['Conditions', 'Up to 100 messages'],
          ['Recipe', '1 electronic circuit + 1 iron plate'],
        ],
        cheat: [
          'Conditions are checked top to bottom. The <b>first</b> match is shown.',
          'No match: the display turns off.',
          'Options: always show the first line of text, and show icon and text on the map.',
          'Condition <code>Anything</code> with icon <code>Anything</code> shows the first signal that passes.',
        ],
        body: `<p>Without a wire, a display panel is a static label for a build. Wired, each line pairs a condition with an icon and a message, which makes it a status board: "Low on coal", "Train waiting", "All good".</p>
<p>Everything and Anything work on the left side of the conditions as they do in a decider. As an icon, only Anything does something useful, and only when the condition also uses Anything; in every other case a wildcard icon just shows its own star.</p>`,
        src: ['Display panel'],
        kw: 'display panel sign text icon message status map',
      },
      {
        id: 'programmable-speaker',
        title: 'Programmable speaker',
        category: 'Devices',
        type: 'Reference',
        sum: 'Plays a sound and can raise a custom alert when a condition is true.',
        facts: [
          ['Power', '2 kW'],
          ['Alert text', 'Up to 150 characters'],
          ['Recipe', '5 copper cable, 4 electronic circuits, 3 iron plate, 4 iron sticks'],
        ],
        cheat: [
          '<b>Show alert</b>: icon and message in the alert area for every player.',
          'Playback can be local or reach the whole surface or everywhere.',
          'Turn <b>Allow polyphony</b> off for alarms so the sound does not stack.',
          'An option makes the signal value set the pitch, which turns it into an instrument.',
          'Volume can also be set by a signal.',
        ],
        body: `<p>For an alarm, wire the speaker to whatever you are watching, set the condition, tick "Show alert" and pick an icon and message. With polyphony off the sound repeats about twice per second while the condition holds; with it on, a constant signal re-triggers the sound many times per second.</p>
<p>Local playback is heard near the speaker (about 64 tiles at full volume). The widest playback mode was called Global and is named Universe since 2.1. At most 50 sounds can play at once.</p>
<p>A ready-made example is the [[combinators/recipe-alarm|low robots alarm]].</p>`,
        src: ['Programmable speaker', 'Alerts'],
        kw: 'speaker alarm alert sound siren music warning',
      },
      {
        id: 'power-switch',
        title: 'Power switch',
        category: 'Devices',
        type: 'Reference',
        sum: 'Connects or disconnects two electric networks on a condition.',
        facts: [
          ['Power use', 'None'],
          ['Throughput', 'Unlimited'],
          ['Wire reach', '9 tiles'],
          ['Recipe', '5 copper cable, 2 electronic circuits, 5 iron plate'],
        ],
        cheat: [
          'Attach <b>copper wire</b> to each side from a pole of each network.',
          'It does nothing if the two sides are also joined elsewhere.',
          'Controllable by circuit or logistic network condition.',
          'Can be toggled by hand from the map.',
        ],
        body: `<p>The switch has two sides. Use the copper wire tool from the shortcut bar to connect a pole to each. While the switch is on, power flows either way; while it is off, the two networks are separate. Check that no other pole bridges the two networks, otherwise the switch has no effect. Poles connect to each other automatically when placed, so you may need to cut a copper connection by hand.</p>
<p>The classic use is [[combinators/recipe-backup-steam|backup steam power]] that joins the grid only when accumulators run low.</p>`,
        src: ['Power switch', 'Copper wire'],
        kw: 'power switch electric network isolate copper wire',
      },
      {
        id: 'radar-link',
        title: 'Radar: wireless signals',
        category: 'Devices',
        type: 'Reference',
        sum: 'Radars pass circuit signals to each other without wires across a whole surface.',
        cheat: [
          '<b>Surface mode</b>: every radar on the planet shares one red and one green channel.',
          '{2.1} <b>Universe mode</b>: pick any signal as the channel name. Works across planets and platforms.',
          'Red and green stay separate through the link.',
          'A radar without power drops off the link.',
        ],
        diagram: dgRadar,
        body: `
<p>Wire a signal into any radar and it comes out of every other radar on the same surface, on the same wire colour. Think of it as two planet-wide wires, one red and one green.</p>
<p>Because there is only one pair of channels per surface in Surface mode, everything you send is mixed together. Give each outpost its own signals, or send one outpost at a time. {2.1} Universe mode solves this with named channels: every channel has its own red and green network, and radars on other planets and platforms tuned to the same channel are included.</p>`,
        src: ['Radar', 'Circuit network', 'Version history/2.1.0'],
        kw: 'radar wireless remote transmit long distance channel surface universe',
      },
      {
        id: 'dev-storage',
        title: 'Connectable devices: storage & logistics',
        category: 'Devices',
        type: 'Reference',
        wide: true,
        sum: 'What these devices can send to a wire and what a wire can make them do.',
        table: {
          head: ['Device', 'Can output', 'Can be controlled'],
          rows: [
            ['Wooden, iron, steel chest', 'Contents. {2.1} Empty slots (E).', '—'],
            ['Logistic chests', 'Contents. {2.1} Empty slots (E).', 'Enable/disable on a condition. Requester and buffer: set requests from signals.'],
            ['Storage tank', 'Contents. {2.1} Contents of the whole pipeline, fluid temperature.', '—'],
            ['Pipe, pipe to ground {2.1}', 'Contents, pipeline contents, fluid temperature.', '—'],
            ['Roboport', 'Logistic network contents or unsatisfied requests. Robot statistics (X, Y, Z, T, R).', '—'],
            ['Cargo landing pad', 'Contents. {2.1} Empty slots (E).', '{SA} Set requests from signals.'],
          ],
        },
        cheat: [
          'Slots closed with the chest limiter count as full for "empty slots".',
          'Several chests on one wire report their combined contents.',
        ],
        src: ['Circuit network', 'Version history/2.1.0'],
        kw: 'chest tank pipe roboport read contents device list',
      },
      {
        id: 'dev-transport',
        title: 'Connectable devices: belts, inserters & pumps',
        category: 'Devices',
        type: 'Reference',
        wide: true,
        sum: 'The devices that move things, and how circuits steer them.',
        table: {
          head: ['Device', 'Can output', 'Can be controlled'],
          rows: [
            ['Transport belt', 'Items on it. <b>Pulse</b>: 1 tick as an item enters. <b>Hold</b>: while items are on this tile. <b>Hold (all belts)</b>: the whole belt line, through undergrounds but not past splitters or side-loading.', 'Enable/disable (a disabled belt stops). Logistic condition.'],
            ['Inserter (all kinds)', 'Hand contents. <b>Pulse</b>: 1 tick on pick-up. <b>Hold</b>: while holding.', 'Enable/disable. Set filters from signals. Set stack size from a signal (S). Logistic condition.'],
            ['Splitter', '—', 'Set input and output priority side on a condition. Set the filter item from a signal.'],
            ['Pump', '—', 'Enable/disable. Set fluid filter from a signal. Logistic condition.'],
            ['Offshore pump', '—', 'Enable/disable. Logistic condition.'],
          ],
        },
        cheat: [
          'Inserter filters: the first 5 positive item signals, values ignored. Whitelist or blacklist.',
          'Stack size signal below 1 counts as 1. It cannot switch the inserter off.',
          'A disabled inserter still draws its idle power.',
          'A pump with a condition is a valve.',
        ],
        src: ['Circuit network', 'Inserters', 'Belt transport system', 'Pump'],
        kw: 'belt inserter splitter pump filter stack size enable disable device list',
      },
      {
        id: 'dev-production',
        title: 'Connectable devices: machines',
        category: 'Devices',
        type: 'Reference',
        wide: true,
        sum: 'Crafting machines, miners and labs.',
        table: {
          head: ['Device', 'Can output', 'Can be controlled'],
          rows: [
            ['Assembling machines, oil refinery, chemical plant, centrifuge. {SA} Foundry, electromagnetic plant, biochamber, cryogenic plant, crusher.', 'Contents (optionally with the items in the current craft and the fuel). Ingredients of the set recipe. A 1-tick signal when a craft finishes (value = crafts finished, productivity included). A signal while working.', 'Enable/disable. <b>Set recipe</b> from a signal. Logistic condition.'],
            ['Furnaces, recycler {SA}', 'Same as above, with the ingredients of the detected recipe.', 'Enable/disable. Logistic condition.'],
            ['Mining drills', 'Expected resources, of this drill or of the whole ore patch.', 'Enable/disable. Logistic condition.'],
            ['Pumpjack', 'Current oil mining rate.', 'Enable/disable. Logistic condition.'],
            ['Lab, biolab {SA} {2.1}', 'Contents, cost of the current technology, technology level.', 'Set the current research on a condition. Players then cannot switch research by hand.'],
            ['Agricultural tower {SA}', 'Seeds and harvested plants in its inventory.', 'Enable planting and/or harvesting on a condition {2.1}. Logistic condition.'],
          ],
        },
        cheat: [
          'Set recipe with an item signal: the machine uses that item\'s main recipe.',
          '{2.1} An assembler no longer ignores its own output signals when choosing a recipe.',
          '"Recipe finished" pulses are a clean way to count production.',
        ],
        src: ['Circuit network', 'Version history/2.1.0'],
        kw: 'assembler machine recipe mining drill pumpjack lab furnace device list set recipe',
      },
      {
        id: 'dev-power',
        title: 'Connectable devices: power & heat',
        category: 'Devices',
        type: 'Reference',
        wide: true,
        sum: 'Reading the state of your power plant.',
        table: {
          head: ['Device', 'Can output', 'Can be controlled'],
          rows: [
            ['Accumulator', 'Charge level as a percentage (A), 0–100.', '—'],
            ['Power switch', '—', 'Connect two electric networks on a condition. Logistic condition.'],
            ['Nuclear reactor, heating tower {SA}', 'Fuel, including the cell being burned. Temperature (T).', '—'],
            ['Boiler {2.1}', 'Fuel, including the fuel being burned.', 'Enable/disable.'],
            ['Heat exchanger {2.1}', '—', 'Enable/disable.'],
            ['Heat pipe {2.1}', 'Temperature (T).', '—'],
          ],
        },
        cheat: [
          'Wire one accumulator: all accumulators on a grid share the same charge level.',
          'A reactor burns fuel whether or not the heat is used. Meter the fuel instead ([[combinators/recipe-nuclear|recipe]]).',
        ],
        src: ['Circuit network', 'Accumulator', 'Nuclear reactor', 'Version history/2.1.0'],
        kw: 'accumulator reactor boiler heat temperature power device list',
      },
      {
        id: 'dev-trains',
        title: 'Connectable devices: trains',
        category: 'Devices',
        type: 'Reference',
        wide: true,
        sum: 'Train stops and rail signals.',
        table: {
          head: ['Device', 'Can output', 'Can be controlled'],
          rows: [
            ['Train stop', 'Contents of the stopped train (no fuel; fluids rounded down, but less than 1 reads as 1). Train ID (T). Trains on their way, including the stopped one (C).', 'Send signals to the train for its wait conditions. Enable/disable. Set train limit (L). Set priority (P). Logistic condition.'],
            ['Rail signal', 'Its state as a red, yellow or green signal.', 'Close (turn red) on a condition.'],
            ['Rail chain signal', 'Its state as red, yellow, green or blue.', '—'],
          ],
        },
        cheat: [
          'A disabled stop behaves like train limit 0. Trains heading there wait as "destination full".',
          'A train already on its way keeps going when the stop is disabled or the limit drops.',
          'Priority: 0–255, default 50. Higher is preferred; ties go to the closest stop.',
          'Prefer setting the train limit over disabling the stop.',
        ],
        src: ['Circuit network', 'Train stop', 'Rail signal', 'Tutorial:Circuit network cookbook'],
        kw: 'train stop limit priority rail signal chain station device list',
      },
      {
        id: 'dev-defense-space',
        title: 'Connectable devices: defence & space',
        category: 'Devices',
        type: 'Reference',
        wide: true,
        sum: 'Turrets, gates and the Space Age machines.',
        table: {
          head: ['Device', 'Can output', 'Can be controlled'],
          rows: [
            ['Gun, laser and flamethrower turret. {SA} Rocket, tesla and railgun turret.', 'Ammunition inside. Laser and tesla turrets output nothing.', 'Enable/disable. Set or ignore target priorities on a condition. Logistic condition.'],
            ['Artillery turret', 'Ammunition inside.', 'Enable/disable. Logistic condition.'],
            ['Gate (wire the wall next to it)', 'G when a player or vehicle makes it open.', 'Open on a condition.'],
            ['Land mine {2.1}', '—', 'Detonate on a condition. This switches off its proximity trigger.'],
            ['Rocket silo', 'Contents. {SA} Orbital requests. {2.1} Launch pulse (R).', '—'],
            ['Space platform hub {SA}', 'Contents, origin and destination, speed (V), damage taken (D). {2.1} Empty slots.', 'Send signals to the platform for wait conditions. {2.1} Set requests from signals.'],
            ['Asteroid collector {SA}', 'Contents.', 'Enable/disable. Set filters from signals.'],
          ],
        },
        cheat: [
          'Turret ammo on a wire is an easy low-ammo alarm.',
          'Gates plus rail signals make a [[combinators/recipe-rail-crossing|safe rail crossing]].',
        ],
        src: ['Circuit network', 'Gate', 'Rocket silo', 'Space platform', 'Version history/2.1.0'],
        kw: 'turret gate wall land mine rocket silo platform hub asteroid collector device list',
      },

      /* ================= Building blocks ================= */
      {
        id: 'isolator',
        title: 'Isolator: a one-way wire',
        category: 'Building blocks',
        type: 'How-to',
        sum: 'Copies every signal from one network to another without letting anything flow back.',
        cheat: [
          'Arithmetic: <code>Each + 0 → Each</code>.',
          'Costs one tick of delay.',
          'Also changes wire colour.',
          'Gate version: decider, any condition, output <code>Everything</code> (input count).',
        ],
        steps: [
          'Place an arithmetic combinator between the two networks.',
          'Set it to <code>Each + 0</code>, output <code>Each</code>.',
          'Wire network A to its input and network B to its output.',
        ],
        diagram: dgIsolator,
        body: `<p>Wires work in both directions, so joining two networks directly merges them. An isolator keeps the downstream logic from leaking back into the source.</p>
<p>For a switchable version use a decider with output <code>Everything</code> and "input count": it passes all signals while its condition is true and nothing otherwise. That is a gate, useful for polling several sources one after another.</p>
<p>An isolator is also the standard way to add one tick of delay to a path ([[combinators/timing|timing]]).</p>`,
        src: ['Tutorial:Combinator tutorial', 'Circuit network'],
        kw: 'isolator diode one way buffer gate insulator separate',
      },
      {
        id: 'filter',
        title: 'Whitelist filter',
        category: 'Building blocks',
        type: 'How-to',
        sum: 'Lets only the signals you list pass through, with their original values.',
        cheat: [
          'Data on {red}, list of wanted signals on {green}.',
          'Decider condition: <code>Each &gt; 0</code>, reading {green} only.',
          'Output: <code>Each</code>, input count, reading {red} only.',
        ],
        steps: [
          'Put the signals you want to keep into a constant combinator, each with value 1.',
          'Wire the data to the decider input with {red} wire and the constant combinator with {green} wire.',
          'Condition: <code>Each &gt; 0</code>. Untick red on the Each operand so it reads only green.',
          'Output: <code>Each</code> with "input count". Untick green so the value comes only from red.',
        ],
        diagram: dgFilter,
        body: `<p>This relies on the per-wire tick boxes that the decider gained in 2.0: the list decides <i>which</i> signals pass, the data wire supplies <i>how much</i>. Without the wire selection the list values would be added to the data.</p>
<p>Use it to pick a few items out of a train's contents, a logistic network read-out or a mixed belt.</p>`,
        src: ['Decider combinator', 'Circuit network'],
        kw: 'filter whitelist select signals pass only',
      },
      {
        id: 'memory',
        title: 'Memory cell & counter',
        category: 'Building blocks',
        type: 'How-to',
        sum: 'A decider wired to itself holds its value. Feed it pulses and it becomes a counter.',
        cheat: [
          'Decider output looped back to its input.',
          'Condition <code>R = 0</code>, output <code>Everything</code> (input count).',
          'Every one-tick pulse on the input is added to the stored value.',
          'Send R to clear.',
          'Inputs must be pulses. A constant input makes the value run away.',
        ],
        steps: [
          'Place a decider. Connect its output to its own input with {green} wire.',
          'Condition: <code>R = 0</code>. Output: <code>Everything</code>, input count.',
          'Feed pulses into the input on {red} wire, for example an inserter set to read hand contents in <b>pulse</b> mode.',
          'Read the stored totals from the {green} wire.',
          'To reset, send any non-zero R on the {red} wire for a tick.',
        ],
        diagram: dgMemory,
        body: `
<p>Each tick the decider copies its input to its output, and the loop brings that output back as next tick's input. With nothing else on the input, the value simply circulates. A pulse arriving for one tick is added once and then stays in the loop. While R is non-zero the condition fails, the output is empty for that tick and the loop is cleared.</p>
<p>The tutorial's single-signal version uses the condition <code>X ≠ 0</code> (or <code>X &gt; 0</code> to refuse negative values) with output X, input count. The cookbook's version uses an arithmetic combinator set to <code>Each + 0 → Each</code> with the inserter wired to both ends.</p>
<p>Negative pulses subtract. That gives an up/down counter: one group of inserters adds, another group is passed through <code>Each × −1</code> first.</p>`,
        src: ['Tutorial:Combinator tutorial', 'Tutorial:Circuit network cookbook', 'Decider combinator'],
        kw: 'memory cell store hold counter count accumulate total remember',
      },
      {
        id: 'clock',
        title: 'Clock / timer',
        category: 'Building blocks',
        type: 'How-to',
        sum: 'A signal that counts up every tick and starts over at a limit.',
        cheat: [
          'Constant <code>T = 1</code> into a decider wired to itself.',
          'Decider: <code>T &lt; 60</code>, output T (input count).',
          'T runs 1 … 60, then restarts: one cycle per second.',
          'Change 60 to set the period in ticks.',
          '{2.1} No loop needed: selector in Time mode, then <code>T % 60</code>.',
        ],
        steps: [
          'Place a constant combinator with <code>T = 1</code>.',
          'Place a decider: condition <code>T &lt; 60</code>, output <code>T</code> with input count.',
          'Wire the constant combinator to the decider input, and the decider output back to its input, all with the same colour.',
          'Read T anywhere on that network.',
        ],
        diagram: dgClock,
        body: `
<p>The network value is the constant 1 plus whatever the decider output last tick. While it is below 60 the decider passes it on, so it grows by 1 per tick. At 60 the condition fails, the decider outputs nothing, and the network falls back to 1.</p>
<p>The sequence therefore never contains 0, and it does include the limit itself. For a period of N ticks use <code>T &lt; N</code>.</p>
<h4>Variants</h4>
<ul>
<li><b>Single combinator:</b> give the decider a second output, T with constant value 1, and drop the constant combinator. This version counts one tick longer, so use <code>T &lt; 59</code> for a 60-tick period.</li>
<li><b>Hold and reset:</b> add a second condition <code>AND R = 0</code>. While R is set the decider outputs nothing and the count sits at its start value; it runs again when R clears.</li>
<li>{2.1} <b>Selector, Time mode:</b> outputs the game tick as T. An arithmetic combinator with <code>T % 60</code> turns it into a 0–59 clock that is the same everywhere on the map.</li>
</ul>`,
        src: ['Tutorial:Combinator tutorial', 'Selector combinator'],
        kw: 'clock timer tick counter period interval seconds',
      },
      {
        id: 'pulse-generator',
        title: 'Pulse generator',
        category: 'Building blocks',
        type: 'How-to',
        sum: 'One tick of signal at a fixed interval.',
        cheat: [
          'Clock + decider.',
          'Decider: <code>T = 60</code>, output <code>P = 1</code>.',
          'P is 1 for one tick per clock cycle.',
        ],
        steps: [
          'Build a [[combinators/clock|clock]].',
          'Add a decider reading the clock: condition <code>T = 60</code> (any value the clock reaches), output <code>P</code> with constant 1.',
          'Use P wherever something should happen once per cycle.',
        ],
        diagram: dgPulse,
        body: `<p>Pulses drive [[combinators/memory|counters]], sample values at intervals, and let an inserter swing once per period. The output can also be "input count" of another signal, which samples that signal for one tick.</p>`,
        src: ['Tutorial:Combinator tutorial'],
        kw: 'pulse generator periodic interval trigger',
      },
      {
        id: 'edge-detector',
        title: 'Edge detector',
        category: 'Building blocks',
        type: 'How-to',
        sum: 'Turns a change of a signal into a one-tick pulse.',
        cheat: [
          'Signal on {red} into an arithmetic combinator: <code>Each × −1 → Each</code>.',
          'Signal on {green} joined directly with that combinator\'s output.',
          'For a 0/1 signal: +1 for one tick on a rise, −1 for one tick on a fall.',
          'Add a decider <code>&gt; 0</code> to keep only rising edges.',
        ],
        steps: [
          'Wire the source to the input of an arithmetic combinator with {red} wire. Set it to <code>Each × −1</code>, output <code>Each</code>.',
          'Wire the source with {green} wire to the <b>output</b> side of the same combinator.',
          'Read the {green} network: it is zero except in the tick right after a change.',
        ],
        diagram: dgEdge,
        body: `<p>The combinator's output is always one tick behind its input. On the green network the live signal and the delayed, negated copy cancel out, except during the one tick in which they differ.</p>
<p>Use it to count events that last longer than a tick, such as trains arriving at a stop, without counting each one sixty times per second.</p>`,
        src: ['Tutorial:Combinator tutorial'],
        kw: 'edge detector rising falling change pulse once',
      },
      {
        id: 'sr-latch',
        title: 'SR latch (hysteresis)',
        category: 'Building blocks',
        type: 'How-to',
        sum: 'Switch on at one threshold, stay on, switch off at another. One decider is enough.',
        cheat: [
          'Decider output looped to its own input.',
          'Conditions: <code>SET</code> OR <code>(NOT-YET-RESET AND S &gt; 0)</code>.',
          'Example: <code>A &lt; 20</code> OR <code>A &lt; 90 AND S &gt; 0</code> → <code>S = 1</code>.',
          'On below 20, stays on until 90.',
          'Use a different wire colour for the loop.',
        ],
        steps: [
          'Wire the measured value (here an accumulator, signal A) to the decider input with {red} wire.',
          'Wire the decider output to its own input with {green} wire.',
          'Condition 1: <code>A &lt; 20</code>. This is the set condition.',
          'Add <code>OR</code>, then condition 2: <code>A &lt; 90</code> <code>AND</code> <code>S &gt; 0</code>. This holds the latch until the reset level.',
          'Output: <code>S</code> with constant value 1.',
          'Wire the output to whatever should switch, with the condition <code>S &gt; 0</code>.',
        ],
        diagram: dgLatch,
        body: `
<p>Without a latch, a device controlled by a single threshold flickers: the accumulator drops to 19%, the switch closes, it charges to 20%, the switch opens, and so on. A latch adds hysteresis, a gap between the on level and the off level.</p>
<p>Because AND binds tighter than OR, the two conditions read as "A is below 20, or the latch is already on and A is still below 90". The decider's own output S, coming back on the green wire, is what makes it remember.</p>
<p>The same shape works for any pair of thresholds and any signal: a pump that starts at 20,000 light oil and stops at 5,000, or a train stop that opens when a buffer is nearly empty and closes when it is full. Before 2.0 this took two combinators.</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Tutorial:Combinator tutorial', 'Decider combinator'],
        kw: 'latch sr rs set reset hysteresis flicker threshold remember toggle',
      },
      {
        id: 'digits',
        title: 'Split a number into digits',
        category: 'Building blocks',
        type: 'How-to',
        sum: 'Divide, then take the remainder. One pair of arithmetic combinators per digit.',
        cheat: [
          'Digit = <code>(N / 10^k) % 10</code>.',
          '24321: <code>/ 1000</code> → 24, <code>% 10</code> → 4.',
          'Division truncates, which is exactly what this needs.',
        ],
        steps: [
          'First combinator: <code>N / 1000 → D</code> (use 1, 10, 100 … for the digit you want).',
          'Second combinator: <code>D % 10 → D</code>.',
          'Repeat with a different divisor for each digit and feed each result to its own display.',
        ],
        body: `<p>From 24321: ÷ 10000 % 10 = 2, ÷ 1000 % 10 = 4, ÷ 100 % 10 = 3, ÷ 10 % 10 = 2, ÷ 1 % 10 = 1. Each digit can then light one of ten lamps, or select one of ten patterns stored in constant combinators for a seven-segment style display.</p>`,
        src: ['Arithmetic combinator', 'Tutorial:Circuit network cookbook'],
        kw: 'digits number display decimal modulo divide seven segment',
      },
      {
        id: 'signal-switch',
        title: 'Signal switch: one output per condition',
        category: 'Building blocks',
        type: 'How-to',
        sum: 'A single decider that sends a different signal depending on which condition is true.',
        cheat: [
          'Constant combinator: every candidate signal with a <b>unique</b> value.',
          'Decider blocks: <code>your condition AND Each = that signal</code>, joined by OR.',
          'Output: <code>Each</code>.',
          'The Each comparison must read only the constant combinator\'s wire.',
        ],
        steps: [
          'List every signal you may want to send in a constant combinator and give each a different value. Wire it to the decider on its own colour.',
          'For each case add: <code>condition</code> AND <code>Each = signal for this case</code>.',
          'Join the cases with OR and set the output to <code>Each</code>.',
          'Restrict the Each operands to the constant combinator\'s wire colour.',
        ],
        body: `<p>Because all values in the constant combinator are different, <code>Each = pipe</code> is true only for the pipe signal itself. Each block therefore lets exactly one signal through when its condition holds. The cookbook's example outputs "pipe" while a chest holds fewer than 100 pipes, and "pipe to ground" once there are enough pipes but fewer than 100 undergrounds, which drives an assembler's recipe.</p>
<p>Feeding the decider's output back on the other wire colour and adding hold conditions turns each case into an [[combinators/sr-latch|SR latch]], so the selected recipe does not flip back and forth.</p>`,
        src: ['Tutorial:Circuit network cookbook'],
        kw: 'signal switch select choose case multiplexer recipe',
      },

      /* ================= Recipes ================= */
      {
        id: 'recipe-limit-chest',
        title: 'Limit how much goes into a chest',
        category: 'Recipes',
        type: 'How-to',
        sum: 'An inserter that stops when the chest holds enough.',
        cheat: [
          'Wire the inserter to the chest it fills.',
          'Inserter: <b>Enable if</b> <code>item &lt; 10</code>.',
          'It can overshoot by up to one hand-full.',
          'For an exact count set the inserter\'s stack size to 1.',
        ],
        steps: [
          'Connect the inserter and the chest with one wire.',
          'Make sure the chest is set to read contents.',
          'On the inserter choose Enable/disable and set <code>item &lt; 10</code>.',
        ],
        body: `<p>This gives much finer control than closing chest slots with the limiter, which can only limit by whole stacks. The inserter checks the count before it swings, so with a stack bonus it may deliver a few more than the limit; bulk and stack inserters overshoot the most.</p>
<p>To limit by what the whole logistic network holds rather than one chest, use a [[logistics/logistic-conditions|logistic-network condition]] instead of a wire.</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Inserters'],
        kw: 'limit chest stock inserter enable cap amount',
      },
      {
        id: 'recipe-oil-cracking',
        title: 'Oil cracking control',
        category: 'Recipes',
        type: 'How-to',
        sum: 'Pumps that crack heavy and light oil only when there is a surplus.',
        cheat: [
          'Storage tank wired to the pump that feeds the cracking plants.',
          'Light → gas pump: <code>light oil &gt; 20000</code>.',
          'Heavy → light pump: <code>heavy oil &gt; 20000</code>.',
          'Relative version: <code>heavy &gt; light</code>, <code>light &gt; petroleum gas</code>, <code>heavy &gt; lubricant</code>.',
        ],
        steps: [
          'Give each fluid a storage tank connected to its pipes.',
          'Put a pump on the fluid input of each cracking chemical plant (or row of plants).',
          'Wire each pump to the tank of the fluid it consumes.',
          'Set the pump\'s enable condition, for example <code>light oil &gt; 20000</code>. A tank holds 25,000.',
        ],
        body: `<p>Refineries stop when any one of their outputs is full. Cracking the surplus keeps all three fluids moving, and the condition makes sure you only crack what you can spare.</p>
<p>The relative version puts all tanks and all pumps on one network and compares fluids with each other: crack heavy oil while there is more heavy than light, make lubricant while there is more heavy than lubricant, crack light oil while there is more light than gas. The levels then balance themselves and no fluid can run dry while another overflows.</p>
<p>If the pumps switch on and off rapidly around the threshold, add an [[combinators/sr-latch|SR latch]].</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Pump', 'Storage tank'],
        kw: 'oil cracking heavy light petroleum gas pump refinery balance lubricant',
      },
      {
        id: 'recipe-backup-steam',
        title: 'Backup steam power',
        category: 'Recipes',
        type: 'How-to',
        sum: 'Steam engines that join the grid only when the accumulators run low.',
        cheat: [
          'Steam engines sit behind a <b>power switch</b>.',
          'Simple: switch <code>A &lt; 10</code>.',
          'Better: latch on below 20%, off at 90%.',
          'Wire any one accumulator on the main grid.',
        ],
        steps: [
          'Build the steam engines on poles that are <b>not</b> connected to the main grid.',
          'Place a power switch and connect one side to the steam poles and the other to the main grid with copper wire.',
          'Wire an accumulator on the main grid to the switch.',
          'Simple version: set the switch to <code>A &lt; 10</code>.',
          'Latched version: put the [[combinators/sr-latch|SR latch]] between accumulator and switch and set the switch to <code>S &gt; 0</code>.',
        ],
        diagram: dgLatch,
        body: `<p>The accumulator reports its charge as a percentage on signal A. With the simple version the switch chatters around the threshold. The latch turns the engines on at 20% and keeps them on until the accumulators are back at 90%.</p>
<p>Check that the steam poles have no stray copper connection to the main grid, or the switch does nothing ([[combinators/power-switch|power switch]]).</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Power switch', 'Accumulator'],
        kw: 'backup steam power accumulator solar night switch emergency',
      },
      {
        id: 'recipe-balanced-loading',
        title: 'Balanced chest loading',
        category: 'Recipes',
        type: 'How-to',
        sum: 'Fill a row of chests evenly, so every wagon of a train loads at the same speed.',
        cheat: [
          'All chests → arithmetic <code>Each ÷ −N → Each</code> (N = number of chests).',
          'Combinator output → all inserters ({red}).',
          'Each inserter → its own chest ({green}).',
          'Inserter: <b>Enable if</b> <code>Everything &lt; 0</code>.',
        ],
        steps: [
          'Place N chests, each filled by its own inserter.',
          'Connect all chests to each other and to the input of one arithmetic combinator with {red} wire.',
          'Set the combinator to <code>Each ÷ −N</code>, output <code>Each</code>.',
          'Connect the combinator output to all inserters with {red} wire.',
          'Connect each inserter to the chest it fills with {green} wire.',
          'Set every inserter to Enable if <code>Everything &lt; 0</code>.',
        ],
        diagram: dgBalance,
        body: `<p>The combinator outputs the average chest content as a negative number. Each inserter adds its own chest's content to that, so it sees "my chest minus the average". If the result is negative the chest is below average and the inserter runs.</p>
<p>Stack bonuses make the balance approximate. Set the inserters' stack size to 1 if it has to be exact.</p>`,
        src: ['Tutorial:Circuit network cookbook'],
        kw: 'balanced loading chests train station even average madzuri',
      },
      {
        id: 'recipe-outpost-stock',
        title: 'Keep an outpost stocked',
        category: 'Recipes',
        type: 'How-to',
        sum: 'Unload from a supply train only what the outpost is missing.',
        cheat: [
          'Chest → arithmetic <code>Each × −1 → Each</code>.',
          'Constant combinator holds the wanted amounts.',
          'Both go to the unloading inserter: <b>Set filters</b>.',
          'Inserter sees wanted − stocked and moves only what is positive.',
        ],
        steps: [
          'Wire the outpost\'s chest to the input of an arithmetic combinator set to <code>Each × −1</code>, output <code>Each</code>.',
          'Put the wanted stock into a constant combinator, for example 50 laser turrets and 200 piercing rounds.',
          'Join the combinator output and the constant combinator on one wire and connect it to the unloading inserter.',
          'Set the inserter to <b>Set filters</b>.',
        ],
        diagram: dgOutpost,
        body: `<p>For every item the inserter receives the wanted amount minus the amount already in the chest. Filters are set only from positive signals, so items that are fully stocked drop out of the filter and stay on the train.</p>
<p>An inserter takes at most the first five positive item signals as filters. For longer lists use several inserters or a requester chest with [[logistics/circuit-chests|requests set by circuit]].</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Inserters'],
        kw: 'outpost supply train unload stock filter wanted missing',
      },
      {
        id: 'recipe-sushi',
        title: 'Sushi belt',
        category: 'Recipes',
        type: 'How-to',
        sum: 'Several item types sharing one looping belt, each kept at a fixed amount.',
        cheat: [
          'One belt tile: <b>Read contents</b>, <b>Hold (all belts)</b>.',
          'Each loading inserter: <b>Enable if</b> <code>its item &lt; 30</code>.',
          'Turn off "read hand contents" on those inserters.',
        ],
        steps: [
          'Build the belt as a closed loop without splitters.',
          'Wire one belt tile and set it to read contents with <b>Hold (all belts)</b>.',
          'Wire that belt to every inserter that puts items onto the loop.',
          'Set each inserter to Enable/disable with a condition on its own item, for example <code>automation science pack &lt; 30</code>.',
        ],
        diagram: dgSushi,
        body: `<p>"Hold (all belts)" reports every item on the whole belt line, through underground belts but not past splitters or side-loading. Each inserter adds its item only while the loop holds fewer than the limit, so no item type can crowd out the others.</p>
<p>The older design reads six belt tiles in "Hold" mode and enables each inserter when its item count on those tiles is 0. A third design counts items in and out with a [[combinators/memory|memory cell]].</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Circuit network'],
        kw: 'sushi belt mixed loop science read belt hold all belts',
      },
      {
        id: 'recipe-set-recipe',
        title: 'One assembler, many recipes',
        category: 'Recipes',
        type: 'How-to',
        sum: 'An assembler that builds whatever is below its target stock.',
        cheat: [
          'Constant combinator ({green}): target amount per item.',
          'Output chest ({red}): what is in stock.',
          'Decider: <code>Each [green] &gt; Each [red]</code> → <code>Each = 1</code>.',
          'Assembler: <b>Set recipe</b>.',
          'Leftover ingredients must be able to leave the machine.',
        ],
        steps: [
          'Enter the items and amounts you want in a constant combinator and wire it to the decider input with {green} wire.',
          'Wire the chest that collects the products to the decider input with {red} wire.',
          'Set the decider so each signal on green is compared with the same signal on red, and outputs <code>Each</code> with value 1 when stock is below target.',
          'Wire the decider output to the assembler and tick <b>Set recipe</b>.',
          'Feed the assembler from a requester chest, and let the output inserter return leftover ingredients to that requester.',
        ],
        diagram: dgRecipe,
        body: `<p>Good for items you need now and then that share ingredients, such as medium and big electric poles, or pumpjacks, refineries and chemical plants.</p>
<p>When the recipe changes, ingredients of the old recipe are ejected from the machine. If they have nowhere to go they fill the output chest and block production, so the cookbook's design loops them back: assembler → steel chest → requester chest → assembler.</p>
<p>If several items are short at once, the machine picks one of them. To control the order, or to stop it flip-flopping, use the [[combinators/signal-switch|signal switch]] with latching.</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Circuit network'],
        kw: 'set recipe assembler multiple items mall on demand each',
      },
      {
        id: 'recipe-train-limit',
        title: 'Train limit from station stock',
        category: 'Recipes',
        type: 'How-to',
        sum: 'A loading station that only calls as many trains as it can fill.',
        cheat: [
          'Station chests → arithmetic <code>item ÷ train load → L</code>.',
          'Train stop: <b>Set train limit</b> from L.',
          'L = 0 closes the stop without stranding trains already on the way.',
          'Unloading stations: use free space instead of stock.',
        ],
        steps: [
          'Wire all chests of the station together and to the input of an arithmetic combinator.',
          'Set it to <code>item ÷ items per train</code>, output <code>L</code>. Two cargo wagons of ore are 2 × 40 slots × 50 = 4000.',
          'Wire the output to the train stop and tick <b>Set train limit</b> (signal L).',
          'Optional: cap L at the number of waiting bays with a second combinator.',
        ],
        diagram: dgTrainLimit,
        body: `<p>Division truncates, so L is the number of complete train loads on hand. With less than one load the limit is 0 and no train comes.</p>
<p>A stop with limit 0 behaves the same as a disabled stop: trains wait elsewhere as "destination full". Changing the limit never affects a train that has already been dispatched.</p>
<p>For an unloading station, compute the free space instead: put the capacity in a constant combinator, subtract the contents, and divide by the train load. The {2.1} "read empty slots" output of chests gives the free space directly, in slots.</p>`,
        src: ['Train stop', 'Tutorial:Circuit network cookbook', 'Circuit network', 'Cargo wagon'],
        kw: 'train limit station stop stock dispatch enable disable full',
      },
      {
        id: 'recipe-rail-crossing',
        title: 'Safe rail crossing',
        category: 'Recipes',
        type: 'How-to',
        sum: 'Trains stop while you walk across the track.',
        cheat: [
          'Gates across your walking path on both sides of the track.',
          'Wall next to the gate: <b>Read sensor</b> (G).',
          'Rail signals before the crossing: <b>Close signal</b> if <code>G = 1</code>.',
          'Reverse version: gates stay shut while a train is coming.',
        ],
        steps: [
          'Wall off the track and leave gates where you cross.',
          'Place rail signals on the track on both sides of the crossing.',
          'Wire a wall piece next to each gate to those rail signals.',
          'On the gate wall enable <b>Read sensor</b>. On each rail signal enable <b>Close signal</b> with <code>G = 1</code>.',
        ],
        diagram: dgCrossing,
        body: `<p>A gate is wired through the wall piece beside it. Approaching the gate makes it open and sends G, which turns the rail signals red until you have passed. A train that is already too close to stop will still come through, so look before you cross.</p>
<p>The reverse setup reads the rail signal and controls the gate: the gate opens only while the signal is green. A [[combinators/programmable-speaker|programmable speaker]] wired to the rail signals can sound a warning instead of, or as well as, gates.</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Gate', 'Rail signal'],
        kw: 'rail crossing gate wall safety train player',
      },
      {
        id: 'recipe-nuclear',
        title: 'Save nuclear fuel',
        category: 'Recipes',
        type: 'How-to',
        sum: 'Insert a fuel cell only when the reactor actually needs heat.',
        cheat: [
          'Reactor: <b>Read temperature</b> (T).',
          'Fuel inserter: <b>Enable if</b> <code>T &lt; limit</code>, stack size 1.',
          'Reactors work between 500 °C and 1000 °C. Heat above 1000 °C is lost.',
          'One fuel cell burns for 200 s no matter what.',
        ],
        steps: [
          'Wire the reactor to the inserter that feeds it fuel cells.',
          'On the reactor enable reading the temperature.',
          'On the inserter set Enable if <code>T &lt; your limit</code> and override the stack size to 1.',
          'Pick the limit low enough that the heat of one more cell still fits below 1000 °C.',
        ],
        diagram: dgNuclear,
        body: `
<p>A reactor keeps burning its fuel cell whether or not the heat is used, and once it reaches 1000 °C the surplus is wasted. Metering the fuel by temperature stops that. More heat pipes, steam tanks or accumulators add buffer.</p>
<p>The cookbook's older design measures stored steam instead: an output inserter removes the spent cell only when steam is low and fuel is available, and the spent cell it holds is the signal for the input inserter to add exactly one new cell. With several reactors, control all input inserters from one signal so they fire together and keep the neighbour bonus.</p>`,
        src: ['Nuclear reactor', 'Tutorial:Circuit network cookbook', 'Circuit network'],
        kw: 'nuclear reactor fuel cell temperature save uranium steam',
      },
      {
        id: 'recipe-color-ramp',
        title: 'Lamp that fades red → yellow → green',
        category: 'Recipes',
        type: 'How-to',
        sum: 'Show a percentage as a colour with two arithmetic combinators.',
        cheat: [
          'Combinator 1: <code>P × 5 → green</code>.',
          'Combinator 2: <code>510 − green → red</code>.',
          'Lamp: <b>Use colors</b>, <b>Color components</b>.',
          '0% red, 50% yellow, 100% green.',
        ],
        steps: [
          'Wire the percentage P to the first arithmetic combinator: <code>P × 5</code>, output the green colour signal.',
          'Wire its output to the lamp and to the input of a second combinator.',
          'Second combinator: <code>510 − green</code>, output the red colour signal. Wire its output to the lamp.',
          'On the lamp tick Use colors and choose Color components. Leave red, green and blue on their default signals.',
        ],
        diagram: dgRamp,
        body: `<p>The lamp reads red, green and blue as 0–255 and clamps anything outside that range. Green rises from 0 to 250 over the first half and stays clamped at 255 after that. Red starts at 510, which is clamped to 255, and only falls below 255 in the second half. At 50% both are about 255, which is yellow.</p>
<p>An accumulator's charge signal A is already a percentage, so it can be used as P directly.</p>`,
        src: ['Tutorial:Circuit network cookbook', 'Lamp'],
        kw: 'lamp color colour ramp gradient percentage rgb fade',
      },
      {
        id: 'recipe-alarm',
        title: 'Alarm: low robots, low ammo, low anything',
        category: 'Recipes',
        type: 'How-to',
        sum: 'A speaker that raises a map alert when a number drops too low.',
        cheat: [
          'Roboport: read robot statistics → <code>X</code> = available logistic robots.',
          'Speaker: condition <code>X &lt; 50</code>, <b>Show alert</b>, polyphony off.',
          'Same pattern for turret ammo, chest stock, tank levels.',
        ],
        steps: [
          'Wire the thing you want to watch to a programmable speaker. For robots, wire any roboport and enable its robot statistics.',
          'Set the speaker\'s condition, for example <code>X &lt; 50</code>.',
          'Tick <b>Show alert</b> and choose an icon and a message such as "Robots are all busy".',
          'Untick <b>Allow polyphony</b> and choose how far the sound should carry.',
        ],
        body: `<p>The roboport's default letters are X and Y for available and total logistic robots, Z and T for construction robots. "Available" dropping to zero means every robot is busy or charging.</p>
<p>Turrets can output their ammunition, so one wire along a wall plus one speaker gives a low-ammo warning. A [[combinators/display-panel|display panel]] or [[combinators/lamp|lamp]] on the same wire shows the state on the spot and on the map.</p>`,
        src: ['Programmable speaker', 'Circuit network', 'Roboport'],
        kw: 'alarm alert speaker warning low robots ammo notify',
      },

      /* ================= Troubleshooting ================= */
      {
        id: 'fix-gotchas',
        title: 'Common mistakes',
        category: 'Troubleshooting',
        type: 'Fix',
        sum: 'The handful of things behind most circuits that "should work".',
        cheat: [
          'Wire on the wrong end of a combinator (input vs output).',
          'Output and input accidentally on the same network → runaway feedback.',
          'Red and green both attached: the device reads their <b>sum</b>.',
          '<code>Everything</code> is true when there are no signals at all.',
          '<code>Each</code> skips signals that are 0.',
          'Inserters overshoot limits by one hand-full.',
        ],
        body: `
<ul>
<li><b>Input vs output.</b> Combinators have two ends. The input terminals are set into the body; the output wires stick out. Turn on "Show details" (Alt mode) to see the direction arrow.</li>
<li><b>Unwanted feedback.</b> If a combinator's output wire touches a wire of the same colour on its input side, its result is added to its own input every tick. Use the other colour for the output or put an [[combinators/isolator|isolator]] in between.</li>
<li><b>Two colours on one device.</b> A device with a red and a green wire adds them unless you tell it which to read ([[combinators/summing|how wires combine]]).</li>
<li><b>Empty networks.</b> <code>Everything &lt; 10</code> passes when nothing is on the wire, for example when a chest is empty. <code>Anything</code> fails in the same situation. Pick the one whose empty-case behaviour you want.</li>
<li><b>Zero is nothing.</b> Each never runs for a signal at 0, so <code>Each = 0</code> does not find missing items. Compare against a list from a constant combinator instead.</li>
<li><b>Delays.</b> Every combinator adds a tick. Signals that took different routes can be out of step for a moment ([[combinators/timing|timing]]).</li>
<li><b>"Not connected".</b> A device shows its circuit options only once a wire is attached.</li>
<li><b>Disabled train stops.</b> Since 2.0 a disabled stop counts as full instead of sending trains away to skip it.</li>
<li><b>Big numbers.</b> Values wrap at about ±2.1 billion.</li>
</ul>`,
        src: ['Circuit network', 'Decider combinator', 'Tutorial:Combinator tutorial', 'Version history/2.0.0'],
        kw: 'mistakes problems not working bug debug wrong feedback gotcha',
      },
      {
        id: 'fix-debug',
        title: 'See what a wire is carrying',
        category: 'Troubleshooting',
        type: 'Fix',
        sum: 'How to inspect signals and step through a circuit.',
        cheat: [
          'Hover a pole: shows all signals on its red and green networks.',
          'Hover a combinator: shows its input and output.',
          'Open a combinator: live input values next to each operand.',
          'Settings → Interface → Alt-mode: "Show combinator settings".',
          'Map editor: pause and "tick once".',
        ],
        body: `
<p>The quickest probe is an electric pole: connect the wire you are curious about to a pole and hover it. Hovering any entity also highlights the wires attached to it, which shows at a glance whether a wire landed on the input or the output end.</p>
<p>Combinator settings are hidden in Alt mode by default because the icons cover the wires. The interface setting turns them on. The description field on every combinator is the place to note what each signal letter means.</p>
<p>For anything involving [[combinators/timing|timing]], open the map editor, pause, and advance one tick at a time. A constant combinator with its on/off toggle is a convenient hand-operated test input.</p>`,
        src: ['Circuit network', 'Tutorial:Circuit network cookbook', 'Tutorial:Combinator tutorial'],
        kw: 'debug inspect hover pole signals show alt mode editor tick',
      },
    ],
  };
})();
