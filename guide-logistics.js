/* Logistics tab content.
   Facts researched from wiki.factorio.com (CC BY-NC-SA 3.0), checked against game version 2.1.
   Text shorthand: {SA} Space Age only · {2.1} added in 2.1 · {red}/{green} wire colours ·
   [[tab/id|label]] link to another topic. */
const LOGISTICS_GUIDE = {
  colors: {
    'Basics': '#2F7FD1',
    'Roboports & charging': '#D9A821',
    'Robots': '#E07B2A',
    'Chests': '#3F9B57',
    'Requests & groups': '#8A4FD0',
    'Construction': '#D2373C',
    'Circuit control': '#2161A8',
    'Space logistics': '#555C6A',
    'Recipes': '#7A3FC0',
    'Troubleshooting': '#8E94A0',
  },
  entries: [

    /* ================= Basics ================= */
    {
      id: 'overview',
      title: 'What the logistic network is',
      category: 'Basics',
      type: 'Explainer',
      sum: 'Roboports, flying robots and five kinds of logistic chests that move items point to point, without belts.',
      facts: [
        ['You need', 'Roboport + robots + logistic chests'],
        ['Best at', 'Many item types over short distances'],
        ['Weak at', 'Bulk goods over long distances'],
        ['Network overview', '<kbd>L</kbd>'],
      ],
      cheat: [
        '<b>Logistic robots</b> carry items between chests. <b>Construction robots</b> build, repair, deconstruct and upgrade.',
        'A network is every roboport whose <b>orange</b> areas touch. Separate networks share nothing.',
        'Throughput is capped by charging: a roboport charges only 4 robots at a time.',
        'Robots fly in a straight line over everything, including lakes and biter nests.',
      ],
      body: `
<p>A logistic network is a group of connected roboports together with the robots and logistic chests inside their coverage. Depending on the type of each chest, logistic robots take items out of some chests and deliver them to others. It is a power-hungry alternative to belts and trains, but robots ignore obstacles and can serve any number of item types from the same spot.</p>
<h4>The pieces</h4>
<ul>
<li><b>[[logistics/roboport|Roboport]]</b>: defines the network area, stores idle robots and recharges them.</li>
<li><b>[[logistics/logistic-robot|Logistic robots]]</b>: move items between chests, to you and to vehicles.</li>
<li><b>[[logistics/construction-robot|Construction robots]]</b>: place blueprints and ghosts, repair, deconstruct, upgrade.</li>
<li><b>[[logistics/chest-comparison|Logistic chests]]</b>: passive provider, active provider, storage, requester and buffer.</li>
<li><b>Requesters without a chest</b>: your character, the spidertron, the tank, and in Space Age the rocket silo and cargo landing pad. See [[logistics/requests|logistic requests]].</li>
</ul>
<h4>What limits it</h4>
<p>The network can build complex items in a small area, but its throughput is limited by how many charging slots exist. More robots only help while there are enough roboports to keep them charged. See [[logistics/charging|robot energy &amp; charging]] and [[logistics/bots-vs-belts|robots vs belts vs trains]].</p>`,
      src: ['Logistic network', 'Roboport'],
      kw: 'bots drones introduction basics what is',
    },
    {
      id: 'research',
      title: 'Research path & unlocks',
      category: 'Basics',
      type: 'Reference',
      wide: true,
      sum: 'Which technology unlocks which piece. "Red, green, blue" means automation, logistic and chemical science packs.',
      table: {
        head: ['Technology', 'Cost', 'Unlocks'],
        rows: [
          ['Robotics', '75 × red, green, blue', 'Flying robot frame. Requires Battery + Electric engine. Opens everything below.'],
          ['Construction robotics', '100 × red, green, blue', 'Construction robot, roboport, passive provider chest, storage chest. Destroyed buildings now leave ghosts.'],
          ['Logistic robotics', '250 × red, green, blue', 'Logistic robot, roboport, passive provider chest, storage chest, plus personal logistics (requests, auto-trash, trash slots).'],
          ['Logistic system', '500 × red, green, blue, utility. {SA} uses space science instead of utility.', 'Active provider, buffer and requester chests. Tanks can make logistic requests.'],
          ['Personal roboport', '50 × red, green, blue', 'Personal roboport. Requires Construction robotics + Portable solar panel.'],
          ['Personal roboport MK2', '250 × red, green, blue, utility. {SA} 750 × and adds space + electromagnetic science.', 'Personal roboport MK2.'],
          ['Worker robot speed 1–5', '50 / 100 / 150 / 250 / 500', '+35 / 40 / 45 / 55 / 65% speed. Level 6 and up is infinite: +65% each.'],
          ['Worker robot cargo size 1–3', '200 / 300 / 450', '+1 item carried per level (1 → 4 items).'],
        ],
      },
      cheat: [
        'Order: Robotics → Construction robotics and Logistic robotics → Logistic system.',
        'Passive provider and storage chests come with the first robot technology. Requester, buffer and active provider need <b>Logistic system</b>.',
        'Personal logistics unlock with <b>Logistic robotics</b>, not Logistic system.',
      ],
      body: `<p>The two early robot technologies both unlock the roboport, the passive provider chest and the storage chest, so either one is enough to start a network. The full chest set arrives much later with Logistic system. Speed and cargo research apply to both robot types; see [[logistics/robot-research|robot research]] for the numbers.</p>`,
      src: ['Logistic robotics (research)', 'Construction robotics (research)', 'Logistic system (research)', 'Worker robot speed (research)', 'Worker robot cargo size (research)'],
      kw: 'technology tech tree science packs cost unlock',
    },
    {
      id: 'first-network',
      title: 'Build your first robot network',
      category: 'Basics',
      type: 'How-to',
      sum: 'The minimum working setup: one roboport, some robots, provider chests on machine outputs.',
      cheat: [
        'Roboport + power + robots inside it.',
        'Passive provider chests at assembler outputs, inside the orange area.',
        'At least one storage chest for trash and leftovers.',
        'Requester chests at inputs once Logistic system is researched.',
      ],
      steps: [
        'Place a <b>roboport</b> and connect it to power. Hover it: the orange square (50×50) is where logistic robots work, the green square (110×110) is the construction area.',
        'Put robots into the roboport. It has 7 robot slots of 50 each. You can also drop robots from your inventory anywhere inside coverage; they fly to the nearest roboport.',
        'Put <b>passive provider chests</b> where output inserters of your assemblers drop items. Limit the chest with the red X slot limiter so the machine does not fill all 48 slots.',
        'Place one or two <b>storage chests</b>. Robots need somewhere to put trash, deconstructed items and cancelled deliveries.',
        'Open your character logistics (<kbd>F1</kbd>) and add requests. Robots deliver while you stand in the orange area.',
        'After <b>Logistic system</b>: put <b>requester chests</b> at machine inputs. Copy the recipe onto the chest (<kbd>Shift</kbd> + right-click the assembler, <kbd>Shift</kbd> + left-click the chest) and it requests 30 seconds worth of ingredients.',
        'Grow the network by placing roboports so their orange areas touch. A dotted yellow line between them confirms the link.',
      ],
      body: `<p>Start with only passive provider and requester chests. Add the other chest types when you hit a problem they solve: [[logistics/active-provider|active providers]] for outputs that must never back up, [[logistics/buffer|buffer chests]] to pre-position stock, [[logistics/storage|storage chests]] with filters to keep things tidy.</p>`,
      src: ['Logistic network', 'Roboport', 'Requester chest'],
      kw: 'getting started beginner setup tutorial',
    },
    {
      id: 'bots-vs-belts',
      title: 'Robots vs belts vs trains',
      category: 'Basics',
      type: 'Explainer',
      sum: 'When robots are the right tool, and when they are not.',
      cheat: [
        '<b>Robots</b>: dense areas, many different items, short hops, train stations.',
        '<b>Belts</b>: bulk goods over short and medium distances.',
        '<b>Trains</b>: long distances and links between separate robot networks.',
        'Doubling the robots does not double throughput once chargers are busy.',
      ],
      body: `
<p>Robots have close to unlimited flexibility: a requester chest can ask for as many item types as you like and needs only one inserter next to it. They are hard to beat inside a compact factory block, and they shine at train stations, where a lot of items must move a short distance in bursts and the robots can recharge between trains.</p>
<p>They are poor at long distances and bulk goods. The number of robots needed grows directly with distance (see [[logistics/robot-count|how many robots]]), each of them needs charging, and a large swarm queues at the roboports. Robots also fly a straight line, which can take them over enemy territory.</p>
<p>Roboports and robots are expensive to build, the speed and cargo upgrades are expensive to research, and the network draws a lot of power when many robots are in the air.</p>`,
      src: ['Tutorial:Transport use cases'],
      kw: 'compare comparison throughput when to use',
    },

    /* ================= Roboports & charging ================= */
    {
      id: 'roboport',
      title: 'Roboport',
      category: 'Roboports & charging',
      type: 'Reference',
      sum: 'Home, charger and antenna for robots. Its coverage defines the network.',
      facts: [
        ['Size', '4×4'],
        ['Logistic area', '50×50 tiles (orange)'],
        ['Construction area', '110×110 tiles (green)'],
        ['Charging', '4 slots × 500 kW'],
        ['Idle drain', '50 kW'],
        ['Buffer recharge', 'up to 2.1 MW'],
        ['Robot storage', '7 slots × 50 robots'],
        ['Repair packs', '7 slots'],
        ['Map reveal', '5×5 chunks'],
        ['Recipe', '45 steel plate, 45 iron gear wheel, 45 advanced circuit'],
      ],
      cheat: [
        'Robots only enter a roboport to rest when fully charged.',
        'Inserters can put in robots and repair packs, and take out robots (not repair packs).',
        'Full of robots? Arriving robots look for another roboport.',
        '{SA} Quality raises charge rate (650 / 800 / 950 / 1250 kW per slot) but not the areas.',
      ],
      body: `
<p>The roboport is the resting place for construction and logistic robots. It projects two areas, visible when you hover it or hold one in your hand:</p>
<ul>
<li><b>Orange, 50×50</b>: the logistic area. Logistic chests must be inside it to be part of the network, and both robot types work here.</li>
<li><b>Green, 110×110</b>: the construction area. Only construction robots work in the part outside the orange square.</li>
</ul>
<p>A roboport holds 7 stacks of robots (50 per stack, one type per slot) and 7 stacks of repair packs. Repair packs stored there are available to every robot and requester in that roboport's logistic zone. Like a radar's close-range scan, a roboport keeps a 5×5 chunk area revealed on the map.</p>
<p>It has an internal energy buffer (100 MJ per the wiki's logistic network page), so robots can keep charging for a while during a brownout.</p>
<p>See [[logistics/coverage|coverage &amp; linking]], [[logistics/charging|charging]], [[logistics/roboport-requests|robot requests]] and [[logistics/read-network|reading the network by circuit]].</p>`,
      src: ['Roboport', 'Logistic network', 'Quality'],
      kw: 'range area radius size charging station stats',
    },
    {
      id: 'coverage',
      title: 'Coverage areas & linking roboports',
      category: 'Roboports & charging',
      type: 'Explainer',
      sum: 'Orange is logistics, green is construction. Roboports join into one network when their orange areas touch.',
      facts: [
        ['To link', 'Orange areas must touch'],
        ['Max spacing', '50 tiles centre to centre'],
        ['To separate', 'Leave a gap between orange areas'],
        ['Link indicator', 'Dotted yellow line'],
      ],
      cheat: [
        'Chests must sit in the <b>orange</b> area. The green area is for construction robots only.',
        'A roboport grid on a 50-tile pitch gives gap-free logistic coverage.',
        'Green areas (110×110) are wide enough for a roboport to build its neighbour without the two networks merging.',
        'Robots take a direct path, even if it leaves coverage.',
        'Robots do not migrate between networks unless their home network is destroyed or unpowered.',
      ],
      body: `
<p>Two roboports belong to the same network only if their logistic (orange) areas touch. The game draws a dotted yellow line between linked roboports. Because the orange square is 50×50 centred on the roboport, 50 tiles centre to centre is the largest spacing that still links.</p>
<p>There can be any number of separate networks. To keep two apart on purpose (for example a wall defence network and the main base), place the roboports far enough that the orange squares do not touch. Separate networks do not share robots, items or information.</p>
<p>Inside one network, robots fly straight from source to destination, even when the line crosses an area with no coverage. A network with a hole in the middle, or one wrapped around a lake, therefore sends robots across the gap. In 2.0 robots prefer charging at a roboport closer to their destination, which keeps them from getting stuck over lakes, but they still slow to a crawl if they run empty on the way.</p>`,
      src: ['Roboport', 'Logistic network'],
      kw: 'orange green zone range connect join separate isolate network spacing grid',
    },
    {
      id: 'charging',
      title: 'Robot energy & charging',
      category: 'Roboports & charging',
      type: 'Explainer',
      sum: 'Robots run on a battery, recharge at 20% and crawl when empty. Charging slots are the real throughput limit.',
      facts: [
        ['Battery', 'Logistic 1.5 MJ · Construction 3 MJ'],
        ['Flight cost', '3 kW airborne + 5 kJ per tile'],
        ['Recharge at', '20% battery'],
        ['Empty battery', '20% of normal speed'],
        ['Charge rate', '500 kW per slot'],
        ['Range per charge', '≈ 250 tiles (logistic robot, base speed)'],
        ['{SA} Aquilo', 'Robots use 500% energy'],
      ],
      cheat: [
        'More roboports along busy routes means more charging slots and more throughput.',
        'A robot picks a farther roboport only if its queue is shorter by about 2 robots per extra tile.',
        'Speed research barely adds range (≈ +15% after 10 levels).',
        '{SA} Quality robots hold 2× (uncommon) up to 6× (legendary) the energy.',
      ],
      body: `
<p>Each robot carries a battery: 1.5 MJ for logistic robots and 3 MJ for construction robots (doubled in 2.0). Flying costs 3 kW at all times plus 5 kJ per tile travelled. When a robot drops to 20% it heads for a roboport, preferring one that is closer to its destination than its current position, so it keeps making progress.</p>
<h4>Range</h4>
<p>Range per charge is <code>battery in kJ ÷ (3 ÷ speed + 5)</code> with speed in tiles per second. For a logistic robot at base speed that is 1500 ÷ (3 ÷ 3 + 5) = 250 tiles. By the same formula a construction robot's 3 MJ battery gives roughly 514 tiles at 3.6 tiles/s (the wiki still quotes 257 from before the battery was doubled). Because the per-tile cost dominates, speed research adds very little range.</p>
<h4>Charging</h4>
<p>A roboport has 4 charging slots at 500 kW each. A logistic robot arriving at 20% needs 1.2 MJ, about 2.4 seconds on a slot. Robots waiting for a slot hover next to the roboport. If the queue (including robots still on their way) is long, a robot may choose another roboport: the extra distance must be at most half the difference in queue length, so a roboport 10 tiles farther away needs 20 fewer robots waiting.</p>
<p>The wiki's older text mentions 1 MW and 1.5 s per charge. The 2.0.7 changelog and the current roboport infobox both say 500 kW, which is what this page uses.</p>
<h4>Running empty</h4>
<p>A robot with no energy keeps flying at 20% of its normal speed. Robots that are constantly slow are almost always starved of charging slots; see [[logistics/fix-slow-robots|slow robots]].</p>`,
      src: ['Logistic network', 'Roboport', 'Logistic robot', 'Construction robot', 'Worker robot speed (research)', 'Aquilo'],
      kw: 'battery power range distance recharge queue energy MJ kW',
    },
    {
      id: 'roboport-requests',
      title: 'Roboport robot requests',
      category: 'Roboports & charging',
      type: 'Explainer',
      sum: 'A roboport can ask for a minimum number of idle robots, pulled from other roboports in the network.',
      cheat: [
        'Set in the roboport GUI, per robot type (and quality {SA}).',
        'Minimum only. There is no way to cap the number.',
        'Request groups can be named and shared between roboports.',
        'Robot request groups and logistic groups are separate name spaces.',
      ],
      body: `
<p>Since 2.0 a roboport can request robots. Idle robots stationed elsewhere in the network move over until the roboport holds at least the requested number. It is a request for a minimum only, so it cannot be used to limit how many robots sit in a roboport.</p>
<p>Like [[logistics/logistic-groups|logistic groups]], these requests can be given a name. All roboports using the same name share the same requested numbers, and editing one updates all of them. A robot request group that happens to have the same name as a logistic group is not the same group.</p>
<p>Typical uses: keeping a reserve of construction robots at a wall, and collecting one kind of robot in a single roboport so an inserter can remove it ([[logistics/recipe-retire-robots|recipe]]).</p>`,
      src: ['Roboport'],
      kw: 'robot request reserve station distribute',
    },

    /* ================= Robots ================= */
    {
      id: 'logistic-robot',
      title: 'Logistic robot',
      category: 'Robots',
      type: 'Reference',
      sum: 'Carries items between logistic chests, to your character and to vehicles.',
      facts: [
        ['Speed', '3 tiles/s (0.05 per tick)'],
        ['Cargo', '1 item, up to 4 with research'],
        ['Battery', '1.5 MJ'],
        ['Health', '100'],
        ['Stack size', '50'],
        ['Recipe', '1 flying robot frame + 2 advanced circuits'],
        ['Unlock', 'Logistic robotics'],
      ],
      cheat: [
        'Takes from: active provider &gt; storage and buffer &gt; passive provider and cargo landing pad.',
        'With nothing else to do, empties active providers into storage.',
        'Cannot deliver (you walked away)? It drops the cargo in a storage chest.',
        'No self-defence. Biters and fire kill robots.',
        'Mining a robot out of the air refills its battery.',
      ],
      body: `
<p>Logistic robots work only inside the orange area of their network. They are slightly slower than construction robots and cost advanced circuits instead of electronic circuits.</p>
<p>Since 2.0 robots keep a task queue: the planner can hand a job to the robot that will get there first, even if it is still finishing something else. Logistic robots that are on a job for the player (a delivery or a trash pick-up) show red in the map's robot overview.</p>
<p>The carried amount rises from 1 to 4 with [[logistics/robot-research|worker robot cargo size]]. A robot always takes as much as it can carry when enough is available, which is why requests are often slightly overfilled ([[logistics/fix-numbers|odd numbers]]).</p>`,
      src: ['Logistic robot', 'Logistic network'],
      kw: 'bot drone stats speed capacity',
    },
    {
      id: 'construction-robot',
      title: 'Construction robot',
      category: 'Robots',
      type: 'Reference',
      sum: 'Builds ghosts and blueprints, rebuilds what was destroyed, deconstructs, upgrades and repairs.',
      facts: [
        ['Speed', '3.6 tiles/s (0.06 per tick)'],
        ['Cargo', '1 item, up to 4 with research'],
        ['Battery', '3 MJ'],
        ['Health', '100'],
        ['Stack size', '50'],
        ['Recipe', '1 flying robot frame + 2 electronic circuits'],
        ['Unlock', 'Construction robotics'],
      ],
      cheat: [
        'Takes materials from the <b>closest</b> chest. Chest type does not matter.',
        'Never takes items out of a requester chest.',
        'Deconstructed items go to storage, or straight into a requester or buffer chest that still wants that item.',
        'Places up to 4 tiles per trip, but only one entity.',
        'Repairs need repair packs in the network.',
      ],
      body: `
<p>Construction robots work anywhere in the green construction area. Their jobs:</p>
<ul>
<li><b>Build</b> ghosts and blueprints, if the item is in a provider, storage or buffer chest of the network.</li>
<li><b>Rebuild</b> destroyed entities, which leave a ghost once Construction robotics is researched.</li>
<li><b>Deconstruct</b> anything marked with a deconstruction planner, including trees, rocks and fish. Cliffs need cliff explosives available in the network or your inventory.</li>
<li><b>Upgrade</b> entities marked with an upgrade planner.</li>
<li><b>Repair</b> damaged entities with repair packs.</li>
<li><b>Deliver</b> item requests made remotely, such as modules or fuel for a machine, and carry out item removal requests.</li>
</ul>
<p>Unlike logistic robots they do not rank chests by type: they fetch from whichever chest is closest to the ghost. They often work at the front line and die easily. Fire, including your own flamethrower turrets, damages them.</p>
<p>More in [[logistics/automated-construction|ghosts &amp; robot construction]], [[logistics/deconstruction-upgrades|deconstruction &amp; upgrades]] and [[logistics/repairs|automatic repairs]].</p>`,
      src: ['Construction robot', 'Logistic network'],
      kw: 'bot drone build repair stats',
    },
    {
      id: 'robot-research',
      title: 'Robot speed & cargo research',
      category: 'Robots',
      type: 'Reference',
      wide: true,
      sum: 'Both upgrades apply to logistic and construction robots alike.',
      table: {
        cap: 'Worker robot speed',
        head: ['Level', 'Bonus', 'Total', 'Logistic robot', 'Construction robot', 'Extra packs needed'],
        rows: [
          ['none', '—', '—', '3.0 tiles/s', '3.6 tiles/s', '—'],
          ['1', '+35%', '35%', '4.05', '4.86', '—'],
          ['2', '+40%', '75%', '5.25', '6.3', '—'],
          ['3', '+45%', '120%', '6.6', '7.92', 'Utility'],
          ['4', '+55%', '175%', '8.25', '9.9', 'Utility'],
          ['5', '+65%', '240%', '10.2', '12.24', 'Production + utility'],
          ['6 and up', '+65% each', '240% + 65% × (level − 5)', '+1.95 each', '+2.34 each', 'Space science. {SA} electromagnetic from level 7.'],
        ],
      },
      cheat: [
        '<b>Cargo size</b>: 3 levels, +1 item each. Robots end at 4 items per trip.',
        'Infinite speed levels cost 2^(level − 6) × 1000 packs: 1000, 2000, 4000 …',
        'Speed research also raises energy use and adds almost no range.',
        'The empty-battery crawl is 20% of the <i>current</i> speed, so it improves too.',
      ],
      body: `<p>Speed after research is base speed × (1 + total bonus). Cargo size works like the inserter stack bonus: a robot takes a full load whenever it can, even if the request needed only one more item.</p>`,
      src: ['Worker robot speed (research)', 'Worker robot cargo size (research)'],
      kw: 'upgrade technology speed capacity stack bonus infinite',
    },
    {
      id: 'robot-count',
      title: 'How many robots do I need?',
      category: 'Robots',
      type: 'Explainer',
      sum: 'A quick estimate from distance, robot speed and cargo size.',
      facts: [
        ['Round trip', '2 × distance ÷ speed'],
        ['Robots', 'items/min × round trip (s) ÷ 60 ÷ cargo'],
        ['Scales with', 'Distance, linearly'],
      ],
      cheat: [
        '10× the distance needs 10× the robots for the same flow.',
        'The estimate ignores charging time, so treat it as a minimum.',
        'Add charging slots along with robots, or the extra robots just queue.',
      ],
      body: `
<p>A robot delivering between two fixed points spends one trip loaded and one trip returning. So one robot moves <code>cargo × 60 ÷ round-trip seconds</code> items per minute.</p>
<p>The wiki's worked example, with 4 items per trip and 4.2 tiles/s: over 50 tiles the round trip is about 24 s, so 0.1 robots are needed per item per minute and 3000 items/min needs about <b>300 robots</b>. Over 500 tiles the same flow needs about <b>3000 robots</b>.</p>
<p>With no research at all (3 tiles/s, 1 item) a 50-tile hop takes 33 s there and back, so one robot moves fewer than 2 items per minute. Cargo size research multiplies throughput directly; speed research divides the round-trip time.</p>`,
      src: ['Tutorial:Transport use cases', 'Worker robot speed (research)'],
      kw: 'calculate calculator throughput items per minute number of bots',
    },

    /* ================= Chests ================= */
    {
      id: 'chest-comparison',
      title: 'The five logistic chests at a glance',
      category: 'Chests',
      type: 'Reference',
      wide: true,
      sum: 'All are 1×1 with 48 slots and cost a steel chest, 3 electronic circuits and 1 advanced circuit.',
      table: {
        head: ['Chest', 'Colour', 'Role', 'Robots take from it', 'Robots deliver to it', 'Unlock'],
        rows: [
          ['Passive provider', 'Red', 'Offers its contents. Nothing moves until something asks.', 'Yes, as the last choice', 'No', 'Construction or Logistic robotics'],
          ['Active provider', 'Purple', 'Pushes its contents out. Robots empty it into requests or storage.', 'Yes, as the first choice', 'No', 'Logistic system'],
          ['Storage', 'Yellow', 'Catch-all for trash, deconstruction and leftovers. Optional one-item filter.', 'Yes', 'Only items with nowhere else to go', 'Construction or Logistic robotics'],
          ['Buffer', 'Green', 'Requests items, then offers them to players, construction robots and opted-in requesters.', 'Yes, but never for another buffer', 'Yes, after requesters', 'Logistic system'],
          ['Requester', 'Blue', 'Requests items for the machines next to it. Contents are reserved.', 'No', 'Yes', 'Logistic system'],
        ],
      },
      cheat: [
        'Machine output → <b>passive provider</b>. Machine input → <b>requester</b>.',
        'Output that must never back up → <b>active provider</b> (and enough storage).',
        'Stock held ready near where it is used → <b>buffer</b>.',
        '{SA} Quality adds slots: 62 / 76 / 91 / 120.',
      ],
      body: `<p>All five can be wired to the circuit network to read their contents; see [[logistics/circuit-chests|circuit-controlled chests]]. The order in which robots choose between them is in [[logistics/priorities|robot priorities]].</p>`,
      src: ['Logistic network', 'Passive provider chest', 'Active provider chest', 'Storage chest', 'Buffer chest', 'Requester chest'],
      kw: 'compare table colors red purple yellow green blue which chest',
    },
    {
      id: 'passive-provider',
      title: 'Passive provider chest',
      category: 'Chests',
      type: 'Reference',
      sum: 'Makes its contents available. Robots take from it only when something requests the item.',
      facts: [
        ['Colour', 'Red'],
        ['Pick-up priority', 'Lowest'],
        ['Unlock', 'Construction or Logistic robotics'],
      ],
      cheat: [
        'The default chest for machine outputs.',
        'Items stay put until a request, a player or a construction job needs them.',
        'Used last: robots take from active providers, storage and buffers first.',
        'Construction robots take building materials and repair packs from it.',
      ],
      body: `<p>Items only ever leave a passive provider towards a requester, a buffer, the player or a construction job. That makes it a safe buffer at the end of a production line. If you want the contents collected into storage chests as well, use an [[logistics/active-provider|active provider]] instead.</p>
<p>Because it has the lowest pick-up priority, robots will not empty a passive provider while the same item is available in an active provider or a storage chest.</p>`,
      src: ['Passive provider chest', 'Logistic network'],
      kw: 'red chest output supply',
    },
    {
      id: 'active-provider',
      title: 'Active provider chest',
      category: 'Chests',
      type: 'Reference',
      sum: 'Pushes everything it holds into the network. Robots keep emptying it.',
      facts: [
        ['Colour', 'Purple'],
        ['Pick-up priority', 'Highest'],
        ['Unlock', 'Logistic system'],
      ],
      cheat: [
        'Use when an output must never back up.',
        'Idle robots carry its contents to storage chests.',
        'It only fills up when the network has no storage space left for the item.',
        'Do not use it where items should wait until requested.',
      ],
      body: `<p>The active provider is designed to be emptied. Requests are served from it first, and whatever is left is moved to storage chests as soon as robots have nothing better to do.</p>
<p>The wiki's example is a nuclear reactor: it will not start a new fuel cycle while depleted fuel cells are stuck in its output, so those go into an active provider. Train unloading is another common use.</p>
<p>When several active providers push the same item, robots take from them in turn (round robin). Distance is ignored for items being pushed out; see [[logistics/priorities|priorities]].</p>`,
      src: ['Active provider chest', 'Logistic network'],
      kw: 'purple chest push dump empty',
    },
    {
      id: 'storage',
      title: 'Storage chest',
      category: 'Chests',
      type: 'Reference',
      sum: 'Where robots put everything that has no other destination. Can be filtered to one item.',
      facts: [
        ['Colour', 'Yellow'],
        ['Filter', 'One item type, optional'],
        ['Unlock', 'Construction or Logistic robotics'],
      ],
      cheat: [
        'Receives: your trash, active provider contents, deconstructed items, cancelled deliveries.',
        'Its contents are available to requests and to construction robots.',
        'A filter is always respected, even when the item has nowhere else to go.',
        'The filter can be copy-pasted between storage chests.',
      ],
      body: `
<p>Storage chests never request anything. They are the destination of last resort, and every network needs some.</p>
<h4>Which storage chest gets the item</h4>
<ol>
<li>A chest with a matching filter that already holds the item.</li>
<li>An empty chest with a matching filter.</li>
<li>An unfiltered chest that already holds the item.</li>
<li>An empty, unfiltered chest.</li>
<li>An unfiltered chest holding other items.</li>
</ol>
<p>Since 2.0 a matching filter ranks above matching contents. The order keeps item types together instead of scattering them.</p>
<p>If the network runs out of storage space you get a "not enough logistic network storage space" alert and active providers, trash slots and deconstruction jobs stall; see [[logistics/fix-storage-full|storage full]].</p>`,
      src: ['Storage chest', 'Logistic network'],
      kw: 'yellow chest filter trash overflow',
    },
    {
      id: 'requester',
      title: 'Requester chest',
      category: 'Chests',
      type: 'Reference',
      sum: 'Asks the network for set amounts of items and keeps them for the machines next to it.',
      facts: [
        ['Colour', 'Blue'],
        ['Item types', 'Up to 1000'],
        ['Unlock', 'Logistic system'],
      ],
      cheat: [
        'Filled from provider and storage chests. From buffer chests only if <b>Request from buffer chests</b> is ticked.',
        'Copy a recipe onto it: <kbd>Shift</kbd> + right-click the assembler, <kbd>Shift</kbd> + left-click the chest → 30 s of ingredients.',
        '<b>Trash unrequested</b> sends everything else back to the network.',
        'Its contents are reserved: robots do not take from a requester.',
        'Can use [[logistics/logistic-groups|logistic groups]] and take requests from the circuit network.',
      ],
      body: `<p>Robots fill a requester until each requested amount is reached or the chest is full. Because robots carry full loads, it can end up with a little more than requested.</p>
<p>A requester with "Request from buffer chests" ticked gets the same delivery priority as the player, ahead of ordinary requesters.</p>
<p>By circuit, a requester can be enabled or disabled on a condition (a disabled chest stops requesting) and can have its requests set from signals. See [[logistics/circuit-chests|circuit-controlled chests]].</p>`,
      src: ['Requester chest', 'Logistic network'],
      kw: 'blue chest request input ingredients',
    },
    {
      id: 'buffer',
      title: 'Buffer chest',
      category: 'Chests',
      type: 'Reference',
      sum: 'A requester and a passive provider in one: it pulls stock in, then hands it out again.',
      facts: [
        ['Colour', 'Green'],
        ['Item types', 'Up to 1000'],
        ['Unlock', 'Logistic system'],
      ],
      cheat: [
        'Serves: the player, construction robots, requesters with <b>Request from buffer chests</b>, and {SA} rocket silos.',
        'Never supplies another buffer chest.',
        'Filled after players and requesters have been served.',
        'Same recipe copy-paste and <b>Trash unrequested</b> option as the requester.',
      ],
      body: `<p>A buffer chest is an in-between stop. Set requests on it like on a requester; once the items arrive they are offered like in a passive provider, but only to the consumers listed on the cheat sheet.</p>
<p>The two classic uses are a supply point near where you work, so personal requests arrive quickly, and a local stock of building materials near a construction site, since [[logistics/construction-robot|construction robots]] fetch from the closest chest. See the [[logistics/recipe-buffer-depot|forward supply recipe]].</p>
<p>Ordinary requesters ignore buffer chests, so a buffer does not steal ingredients into a loop unless you tick the option on the requester.</p>`,
      src: ['Buffer chest', 'Logistic network'],
      kw: 'green chest stock depot',
    },
    {
      id: 'priorities',
      title: 'Robot priorities: who is served first',
      category: 'Chests',
      type: 'Explainer',
      sum: 'The fixed order robots use for where to take items from and where to deliver them.',
      cheat: [
        '<b>Take from</b>: active provider and player trash → storage and buffer → passive provider and cargo landing pad.',
        '<b>Deliver to</b>: player and buffer-enabled requesters → requesters → buffers → storage.',
        'Request being filled: the <b>closest</b> source of equal priority wins.',
        'Items being pushed out: distance ignored, sources take turns.',
        'Construction robots: closest chest, any type.',
      ],
      table: {
        head: ['Rank', 'Robots take items from', 'Robots deliver items to'],
        rows: [
          ['1', 'Active provider chests, player trash slots', 'The player, and requester chests with "Request from buffer chests"'],
          ['2', 'Storage chests, buffer chests', 'Requester chests'],
          ['3', 'Passive provider chests, cargo landing pad', 'Buffer chests (only with requests set)'],
          ['4', '—', 'Storage chests (only items with nowhere else to go)'],
        ],
      },
      body: `
<p>When an item is requested, robots look for it in rank order, so active providers are emptied first and passive providers last. When requests compete, the player is served before requester chests and requester chests before buffer chests.</p>
<h4>Tie-breakers</h4>
<ul>
<li><b>Filling a request</b>: among sources of equal rank, robots pick the closest one.</li>
<li><b>Pushing items out</b> (active providers, trash): distance does not matter. Sources of equal rank are served in turn.</li>
<li><b>Choosing a storage chest</b>: matching filter first, then matching contents; the full list is under [[logistics/storage|storage chest]].</li>
<li><b>Construction</b>: the chest closest to the ghost is used, whatever its type.</li>
</ul>
<p>Storage never asks for anything. It only receives what active providers, trash slots, deconstruction and cancelled deliveries push out.</p>`,
      src: ['Logistic network', 'Storage chest', 'Logistic robot'],
      kw: 'priority order source target ranking closest round robin',
    },

    /* ================= Requests & groups ================= */
    {
      id: 'requests',
      title: 'Logistic requests: minimum, maximum & trash',
      category: 'Requests & groups',
      type: 'Explainer',
      sum: 'Every request has a minimum to keep stocked and a maximum above which the excess is trashed.',
      facts: [
        ['Minimum', 'Robots deliver until you have this many'],
        ['Maximum', 'Anything above goes to trash (can be ∞)'],
        ['Max = 0', 'Always remove this item'],
        ['Trash unrequested', 'Remove everything without a request'],
      ],
      cheat: [
        'Who can request: player, spidertron, tank, requester chest, buffer chest.',
        '{SA} Also space platforms (from rocket silos) and the cargo landing pad (from platforms).',
        'The entity must be inside the orange area for robots to serve it.',
        'Items without any request are simply left alone, unless Trash unrequested is on.',
      ],
      body: `
<p>A logistic request tells an outside system (normally the logistic robots of the network you are in) to keep at least a minimum number of an item in the entity. Robots deliver whenever the count is below the minimum.</p>
<p>Entities that can request also have <b>trash slots</b>. Items above a request's maximum are moved there, and robots carry them off to other chests. To force an item out, add a request with a maximum of 0. To remove everything you have not asked for, tick "Trash unrequested".</p>
<p>If the entity leaves the network (you walk away, the spidertron wanders off), robots that were on their way put their cargo back into the network.</p>
<p>Requests can be bundled into [[logistics/logistic-groups|logistic groups]] and reused. For your character see [[logistics/personal-logistics|personal logistics]]; for space see [[logistics/platform-requests|platform requests]].</p>`,
      src: ['Logistic network'],
      kw: 'min max auto trash slots request',
    },
    {
      id: 'personal-logistics',
      title: 'Personal logistics for your character',
      category: 'Requests & groups',
      type: 'How-to',
      sum: 'Have robots keep your inventory stocked and take away what you do not want.',
      facts: [
        ['Unlock', 'Logistic robotics'],
        ['Open panel', '<kbd>F1</kbd>'],
        ['Toggle requests', '<kbd>Alt</kbd> + <kbd>L</kbd>'],
        ['Trash slots', '30'],
      ],
      cheat: [
        'You are served first: the player outranks requester chests.',
        'Your trash is also the first place robots take items from.',
        'Requests switch off when you die and come back when you collect your corpse.',
        'Robots heading for you show red on the map.',
      ],
      steps: [
        'Open the logistics tab of the character window (<kbd>F1</kbd>).',
        'Add a request: pick an item, set the minimum to keep and, if you want, a maximum.',
        'Stand inside the orange area of a network that has the items in provider, storage or buffer chests.',
        'To get rid of items, drop them into the trash slots, set a maximum, or tick <b>Trash unrequested</b>.',
        'Press <kbd>Alt</kbd> + <kbd>L</kbd> to pause all personal requests, for example while building far from your supplies.',
        'Save a loadout as a named [[logistics/logistic-groups|logistic group]] to reuse it later or on a spidertron.',
      ],
      body: `<p>Personal logistics make your character behave like a walking requester chest with trash slots. If you leave the network or switch requests off, robots already on their way deliver to another requester or return the item to storage.</p>
<p>A [[logistics/personal-roboport|personal roboport]] does not change any of this: your requests and trash are still handled by the stationary network you are standing in.</p>`,
      src: ['Logistic robotics (research)', 'Logistic network', 'Player', 'Controls'],
      kw: 'player character inventory auto trash supply loadout',
    },
    {
      id: 'logistic-groups',
      title: 'Logistic groups',
      category: 'Requests & groups',
      type: 'Explainer',
      sum: 'Named, reusable sets of requests. Edit the group once and every entity using it updates.',
      cheat: [
        'Group names are <b>global</b>: same name anywhere means the same requests.',
        'An entity can hold several groups, each switched on or off separately.',
        'Unnamed sets show as "[No group assigned]" and belong to that entity only.',
        'Pasting a blueprint never overwrites a group that already exists under that name.',
        'A constant combinator can output a group as signals (minimum values).',
      ],
      body: `
<p>Introduced in 2.0. A set of logistic requests can be given a name by pressing the edit button on the section and typing one. If the name is new, a group is created; to reuse a group, pick its name from the drop-down. Requester chests, buffer chests, your character, spidertrons, tanks, platforms and constant combinators can all use groups.</p>
<p>Names are global. Two entities using the same name, wherever they are, share one list of requests, and a change made in one shows up in all of them. Each group on an entity also has its own multiplier.</p>
<h4>Blueprints</h4>
<p>A blueprint stores the requests of every group on the captured entities. When pasted, an unnamed group arrives with its contents. A named group is different: if a group with that name already exists in the world, the pasted entity simply joins it and the stored contents are ignored. A blueprint can therefore not roll a group back to an older state. {2.1} The group name itself can be a blueprint parameter.</p>
<h4>Constant combinators</h4>
<p>A [[combinators/constant-combinator|constant combinator]] can use a named group, which turns your request list into circuit signals. A request has a minimum and a maximum, but a signal is one number, so the combinator outputs the <b>minimum</b>. Entries created from the combinator get an infinite maximum.</p>
<h4>Related</h4>
<p>Roboport [[logistics/roboport-requests|robot requests]] can be named in the same way but live in a separate name space. {SA} Requests on a space platform carry extra per-item settings that can only be edited from the platform; see [[logistics/platform-requests|platform requests]].</p>`,
      src: ['Logistic network', 'Constant combinator', 'Version history/2.0.0', 'Version history/2.1.0'],
      kw: 'sections named group share template loadout multiplier',
    },
    {
      id: 'vehicle-requests',
      title: 'Spidertron & tank requests',
      category: 'Requests & groups',
      type: 'Reference',
      sum: 'Both vehicles can be restocked by logistic robots like a player.',
      facts: [
        ['Spidertron', 'Requests + auto-trash available with the vehicle'],
        ['Tank', 'After Logistic system'],
      ],
      cheat: [
        'Logistic requests are the only automated way to resupply a spidertron. Inserters cannot reach its inventory.',
        'A picked-up spidertron keeps its requests, name, colour and equipment, but not its cargo.',
        'With personal roboports in its grid, a vehicle builds and repairs from its own inventory.',
      ],
      body: `<p>The spidertron's inventory supports logistic requests and trash filters just like the player's, so parking it inside a network refills ammunition, repair packs and building materials. The tank gained the same ability in 2.0 once Logistic system is researched.</p>
<p>Both vehicles have an equipment grid that accepts [[logistics/personal-roboport|personal roboports]], turning them into mobile construction networks that work out of the vehicle's own inventory.</p>`,
      src: ['Spidertron', 'Tank', 'Logistic system (research)', 'Roboport'],
      kw: 'spider vehicle resupply ammo',
    },

    /* ================= Construction ================= */
    {
      id: 'automated-construction',
      title: 'Ghosts, blueprints & robot construction',
      category: 'Construction',
      type: 'Explainer',
      sum: 'Place a ghost; a construction robot builds it if the item is in the network and the spot is in range.',
      facts: [
        ['Range', 'Green area, 110×110 per roboport'],
        ['Items taken from', 'Provider, storage and buffer chests'],
        ['Ghost of destroyed entity', 'Lasts one week of game time'],
        ['Ghost you placed', 'Never expires'],
      ],
      cheat: [
        'Two things must be true: the item is available, and a construction robot is free.',
        'Items inside requester chests do not count.',
        'With a personal roboport, your own robots build from your inventory.',
        'Blueprints carry circuit wires and entity settings with them.',
        'Missing something? Look for the "missing construction robots / material" alerts.',
      ],
      body: `
<p>A ghost is a placeholder for an entity or tile. It does nothing by itself but stores settings such as a recipe, which become active once the real thing is built. Blueprints, copy-paste and undo all create ghosts.</p>
<p>Construction robots turn a ghost into the real entity when the required item is in the logistic network and a robot is available, or when you carry the item and robots yourself with a [[logistics/personal-roboport|personal roboport]]. The ghost has to be inside a green construction area.</p>
<p>After Construction robotics is researched, any destroyed building leaves a ghost with a purple timer bar. It stays for a week of game time, which gives the robots plenty of time to rebuild a wall after an attack.</p>
<p>Robots also deliver items you request remotely for a machine, such as modules or fuel, by clicking it with a ghost item in hand.</p>`,
      src: ['Ghost', 'Blueprint', 'Construction robot', 'Alerts'],
      kw: 'blueprint ghost build automatic rebuild paste',
    },
    {
      id: 'deconstruction-upgrades',
      title: 'Deconstruction & upgrades',
      category: 'Construction',
      type: 'Explainer',
      sum: 'Mark entities with a planner; construction robots do the work and store what comes out.',
      cheat: [
        '<b>Deconstruction planner</b>: red X. Marked entities stop working immediately.',
        'Removed items go to storage chests, or directly into a requester or buffer that still wants them.',
        'With a personal roboport, items go to your inventory instead.',
        '<b>Upgrade planner</b>: yellow marker. Works on built entities, ghosts and blueprints.',
        'Undo cancels orders that robots have not carried out yet.',
      ],
      body: `
<p>Anything marked for deconstruction inside a construction area is queued for the robots. They remove entities and tiles and carry the resulting items, including the contents of chests, belts and machines, into the network. Trees and rocks yield wood, stone and coal. Ghosts are removed instantly.</p>
<p>If there is no room in the storage chests, the work stalls with a storage alert ([[logistics/fix-storage-full|fix]]).</p>
<p>The upgrade planner swaps entities for another of the same size and type, in either direction (upgrades and downgrades). Since 2.0 it can also install modules into machines. {2.1} Rolling stock can be marked for upgrade too; robots only work on trains in manual mode or waiting at a stop.</p>`,
      src: ['Deconstruction planner', 'Upgrade planner', 'Construction robot', 'Version history/2.1.0'],
      kw: 'remove demolish upgrade planner red x replace',
    },
    {
      id: 'repairs',
      title: 'Automatic repairs',
      category: 'Construction',
      type: 'How-to',
      sum: 'Construction robots repair anything damaged in the construction area, as long as they can get repair packs.',
      facts: [
        ['Repair pack', 'Heals 600 HP (300 durability × 2)'],
        ['Stack size', '100'],
        ['Recipe', '2 electronic circuits + 2 iron gear wheels'],
        ['Roboport slots', '7 for repair packs'],
      ],
      steps: [
        'Make sure the area is covered by a roboport\'s green construction area.',
        'Put construction robots into the network.',
        'Stock repair packs in the roboport\'s repair pack slots (an inserter can load them) or in any provider or storage chest of the network.',
        'Damaged entities are now repaired without any further order.',
      ],
      cheat: [
        'Repair packs inside a roboport serve every robot in that roboport\'s logistic zone.',
        'Out of packs → "missing repair packs" alert.',
        '{SA} Space platforms repair themselves from repair packs in the hub. No robots involved.',
      ],
      body: `<p>Repairs are fully automatic once robots and repair packs are available. Keeping packs in the roboport itself puts them right where the robots start from. For a defensive wall, combine this with ghost rebuilding; see the [[logistics/recipe-outpost|self-repairing wall recipe]].</p>`,
      src: ['Repair pack', 'Roboport', 'Construction robot', 'Alerts'],
      kw: 'repair pack heal damage wall',
    },
    {
      id: 'personal-roboport',
      title: 'Personal roboport (MK1 & MK2)',
      category: 'Construction',
      type: 'Reference',
      sum: 'Equipment that makes you, a tank or a spidertron a mobile roboport for construction robots.',
      facts: [
        ['Toggle', '<kbd>Alt</kbd> + <kbd>F</kbd>'],
        ['Grid size', '2×2'],
        ['Energy buffer', '35 MJ'],
        ['Needs to deploy', '20% buffer charge'],
      ],
      cheat: [
        'Construction robots only. There is no personal logistic network.',
        'Robots, materials and repair packs all come from your own inventory.',
        'No idle drain: it uses power only to recharge returning robots.',
        'Fits modular armor and better, the tank and the spidertron.',
        'Stack several: robots and chargers add up, the area grows with the square root.',
      ],
      table: {
        head: ['', 'MK1', 'MK2'],
        rows: [
          ['Robots supported', '10', '25'],
          ['Construction area', '30×30', '40×40'],
          ['Charging stations', '2', '4'],
          ['2 equipped', '20 robots, 42×42', '50 robots, 57×57'],
          ['4 equipped', '40 robots, 60×60', '100 robots, 80×80'],
          ['{SA} Robots by quality', '10 / 13 / 16 / 19 / 25', '25 / 32 / 40 / 47 / 62'],
          ['Recipe', '45 batteries, 40 iron gear wheels, 20 steel plate, 10 advanced circuits', '5 personal roboports, 100 processing units, 20 low density structures. {SA} 5 personal roboports, 50 processing units, 50 superconductors.'],
        ],
      },
      body: `
<p>With a personal roboport equipped and construction robots in your inventory, ghosts near you are built from what you carry, and deconstructed items land in your inventory. The network it forms is separate from stationary networks and does not share robots or items with them, although its robots cooperate with other networks on the same construction jobs.</p>
<p>Switching the roboport off lets robots that are already out finish their task and return. A robot that runs out of energy slows down but keeps trying to catch up with you.</p>
<p>The combined area of several roboports has a side length of <code>√(sum of side²)</code>: 30² for each MK1 and 40² for each MK2. Two MK2 plus two MK1 give √5000 ≈ 70, so 70×70.</p>`,
      src: ['Personal roboport', 'Personal roboport MK2', 'Roboport', 'Controls'],
      kw: 'armor equipment grid mobile mk2 personal construction',
    },

    /* ================= Circuit control ================= */
    {
      id: 'read-network',
      title: 'Read the network with a roboport',
      category: 'Circuit control',
      type: 'Reference',
      sum: 'Wire any roboport to get the network\'s stock, its unfilled requests or its robot counts as signals.',
      facts: [
        ['X', 'Available logistic robots'],
        ['Y', 'Total logistic robots'],
        ['Z', 'Available construction robots'],
        ['T', 'Total construction robots'],
        ['R', 'Roboports in the network'],
      ],
      cheat: [
        'Mode 1: logistic network contents, one signal per item.',
        'Mode 2: unsatisfied requests of the network.',
        'Robot statistics use the letters above by default; each can be changed.',
        'Counts exclude items already reserved by robots, so they can dip below zero.',
      ],
      body: `
<p>A roboport connected with {red} or {green} wire can output what its whole logistic network holds: the total of all provider, buffer and storage chests, minus items robots have already reserved for pick-up. Since 2.0 it can also output the network's unsatisfied requests and the number of roboports.</p>
<p>Uses: throttle production against total stock, light a lamp or sound a [[combinators/recipe-alarm|speaker alarm]] when available robots (X) run low, or drive a [[combinators/display-panel|display panel]].</p>
<p>If you only need "enable this machine when the network has fewer than N", no wire is needed at all: see [[logistics/logistic-conditions|logistic-network conditions]].</p>`,
      src: ['Circuit network', 'Roboport', 'Logistic network', 'Version history/2.0.0'],
      kw: 'circuit signal roboport read contents robot statistics count',
    },
    {
      id: 'logistic-conditions',
      title: 'Logistic-network conditions (wireless control)',
      category: 'Circuit control',
      type: 'How-to',
      sum: 'Many machines can switch on or off based on what the logistic network holds, without any wire.',
      cheat: [
        'Works on: inserters, belts, crafting machines, mining drills, pumpjacks, pumps, offshore pumps, lamps, power switches, train stops, turrets.',
        '{SA} Also agricultural towers.',
        'A circuit condition and a logistic condition on the same device must <b>both</b> be true.',
        'It compares against the whole network\'s stock, not one chest.',
      ],
      steps: [
        'Place the device inside the orange area of the network.',
        'Open it and click the logistic network icon in the top right of its window.',
        'Tick the connection and set a condition, for example <code>iron gear wheel &lt; 200</code>.',
        'The device now runs only while the condition is true.',
      ],
      body: `<p>The logistic network works like a third, wireless signal network next to the {red} and {green} wires. A typical use is on the inserter that fills a passive provider chest: enabling it only while the network holds fewer than a set amount caps the total stock across all chests, instead of limiting each chest separately.</p>
<p>For anything more complex than one comparison, read the network with a [[logistics/read-network|roboport]] and use combinators.</p>`,
      src: ['Circuit network', 'Inserters'],
      kw: 'connect to logistic network condition enable disable wireless inserter limit',
    },
    {
      id: 'circuit-chests',
      title: 'Circuit-controlled logistic chests',
      category: 'Circuit control',
      type: 'Reference',
      sum: 'What the circuit network can read from and do to logistic chests.',
      cheat: [
        '<b>Read contents</b>: all five chest types.',
        '{2.1} <b>Read empty slots</b>: outputs free slots on signal <code>E</code>. Limited slots count as full.',
        '<b>Set requests</b>: requester and buffer chests take their requests from signals.',
        '<b>Enable/disable</b>: a disabled provider stops offering, a disabled requester stops requesting.',
        '{2.1} Setting requests and reading contents can be used at the same time.',
      ],
      body: `<p>Enabling and disabling chests by condition arrived in 2.0. It lets you take a provider chest out of the network until a batch is complete, or stop a requester from pulling items while a train is not at the station.</p>
<p>"Set requests" turns item signals into requests, which makes a requester chest programmable from a [[combinators/constant-combinator|constant combinator]] or from logic. The [[combinators/recipe-set-recipe|multi-recipe assembler]] is one example of a circuit built around a requester chest.</p>
<p>{2.1} Each wired entity can now choose which wire colours it reads from and which it writes to, so a chest can receive requests on one colour and report contents on the other.</p>`,
      src: ['Circuit network', 'Requester chest', 'Version history/2.0.0', 'Version history/2.1.0'],
      kw: 'circuit chest set requests read contents enable disable empty slots',
    },

    /* ================= Space logistics ================= */
    {
      id: 'cargo-landing-pad',
      title: 'Cargo landing pad',
      category: 'Space logistics',
      type: 'Reference',
      sum: 'An 8×8 provider chest for everything that arrives from orbit. One per surface.',
      facts: [
        ['Size', '8×8'],
        ['Slots', '80'],
        ['Limit', 'One per surface'],
        ['Per cargo bay', '+20 slots, +1 hatch'],
        ['Cargo hatches', '3'],
        ['Recipe', '200 concrete, 25 steel plate, 10 processing units'],
      ],
      cheat: [
        'Acts as a <b>passive provider</b>: robots and inserters can take items out.',
        'Inserters cannot put items in.',
        '{SA} Set requests on it to pull items down from platforms in orbit.',
        'Full pad: extra items are thrown on the ground around it.',
        'Reveals the map around it without needing power.',
      ],
      body: `
<p>In the base game the landing pad receives the 1,000 space science packs produced by launching a satellite, wherever the silo is.</p>
<p>{SA} In Space Age it is the planet-side end of orbital deliveries. It behaves like a requester towards platforms: any platform stopped above the planet with unloading enabled drops cargo to satisfy the pad's requests. Requests can also be set by the circuit network. With "Trash unrequested" ticked, items that are not requested move to the pad's trash slots and are exported into the planet's logistic network.</p>
<p>The pad can take 3 stacks at a time through its 3 hatches. Each attached <b>cargo bay</b> adds 20 slots and one more simultaneous delivery, which matters for throughput. Inserters cannot reach cargo bays. {2.1} The <b>landing pad unloading bay</b> (4×5) is a bay inserters can unload from; it must be within 59 tiles of the pad and cannot be built on platforms.</p>`,
      src: ['Cargo landing pad', 'Cargo bay', 'Landing pad unloading bay', 'Logistic network'],
      kw: 'space science landing pad orbit drop cargo bay unloading',
    },
    {
      id: 'rocket-silo-requests',
      title: 'Rocket silo: automatic requests',
      category: 'Space logistics',
      type: 'Explainer',
      sa: true,
      sum: 'With automatic requests on, the silo acts as a requester chest for whatever platforms in orbit ask for.',
      cheat: [
        'Every silo on the planet sees every request from platforms in orbit.',
        '<b>Automatic requests on</b>: robots load the silo (buffer chests included) and the rocket launches when full.',
        '<b>Off</b>: load by inserter. It launches once it holds a full rocket of one requested item.',
        'A rocket must be ready before the silo asks for cargo.',
        'Processing units, low density structures and rocket fuel cannot be shipped by inserter loading.',
      ],
      body: `
<p>A space platform in orbit sends its requests to the planet below. They are not handled by one particular logistic network but by rocket silos.</p>
<p>With <b>"Automatic requests from space platforms"</b> ticked, a silo that has a rocket ready and sits in a network holding the requested amount turns into a requester for it. Logistic robots bring the items, and the rocket launches on its own when full, or earlier if the platform set a custom minimum payload. Anything already in the cargo slots when you tick the box is moved to trash.</p>
<p>Without it, the silo is a plain container. A full rocket load of a single requested item triggers the launch, even if that is more than requested. {2.1} Small requests can be batched into one rocket, and mixed rockets filled by hand or by inserters are used for automated launches.</p>
<p>Processing units, low density structures and rocket fuel put in by inserter are treated as rocket part ingredients, so they cannot be sent that way.</p>
<h4>Circuit connection</h4>
<p>A wired silo can output the sum of orbital requests (a request disappears the moment its launch is triggered) or its own contents; the contents option does nothing while automatic requests are on. {2.1} It can also pulse a signal when a rocket launches. A [[combinators/selector-combinator|selector combinator]] can tell you how many of an item fit in a rocket.</p>`,
      src: ['Rocket silo', 'Logistic network', 'Space platform', 'Version history/2.1.0'],
      kw: 'rocket launch orbital request silo automatic payload',
    },
    {
      id: 'platform-requests',
      title: 'Space platform requests',
      category: 'Space logistics',
      type: 'Explainer',
      sa: true,
      sum: 'Platforms have no robots. The hub requests from the planet below and builds everything itself.',
      cheat: [
        'Robots and roboports do not work in space.',
        'The hub builds ghosts and repairs damage from its own inventory.',
        'Requests go to rocket silos on the planet being orbited.',
        'Per-item extras, editable only from the platform: source planet and custom minimum payload.',
        'Trashed items are dropped to the planet and can clog the landing pad.',
      ],
      body: `
<p>A platform is edited through remote view by placing ghosts. Instead of construction robots, the platform itself builds them as soon as the hub holds the materials, and uses repair packs from the hub automatically. Materials for construction can be requested automatically from whichever planet the platform is at.</p>
<p>Manual requests on the hub look like any other logistic request, with two additions that can only be set from the platform's own window, even when the group is shared with other entities:</p>
<ul>
<li><b>Planet to import from.</b> A request is only sent to that planet. New entries default to Nauvis, or to the planet an item's main recipe is restricted to.</li>
<li><b>Custom minimum payload.</b> By default rockets launch only when full. This lets the platform accept smaller loads of that item.</li>
</ul>
<p>Items above a request's maximum are trashed by dropping them to the planet whenever the platform is in orbit with unloading enabled.</p>
<p>{2.1} Hub requests can be set from the circuit network, requests can be set to import from any planet or from other platforms, and machines on a platform that are connected to the logistic network read the hub's contents.</p>`,
      src: ['Space platform', 'Logistic network', 'Space platform hub', 'Version history/2.1.0'],
      kw: 'platform hub orbit import planet minimum payload space',
    },

    /* ================= Recipes ================= */
    {
      id: 'recipe-bot-mall',
      title: 'Robot-fed assembler block (mall)',
      category: 'Recipes',
      type: 'How-to',
      sum: 'One assembler, one requester chest in, one passive provider out. Repeat for every item you want on tap.',
      cheat: [
        'Requester → inserter → assembler → inserter → passive provider.',
        'Copy-paste the recipe onto the requester for an automatic ingredient list.',
        'Cap the output with the chest limiter or a logistic condition.',
        'Use a passive provider, not an active one, or everything gets hauled to storage.',
      ],
      steps: [
        'Place the assembler and set its recipe.',
        'Place a <b>requester chest</b> with an inserter feeding the assembler.',
        '<kbd>Shift</kbd> + right-click the assembler, then <kbd>Shift</kbd> + left-click the requester. It now requests 30 seconds worth of ingredients.',
        'Place a <b>passive provider chest</b> with an inserter taking from the assembler.',
        'Limit the stock: close slots in the provider with the red X, or connect the output inserter to the logistic network with a condition like <code>item &lt; 100</code>.',
        'If an ingredient is kept in buffer chests, tick <b>Request from buffer chests</b> on the requester.',
      ],
      body: `<p>This is the standard robot building block. Every ingredient only has to exist somewhere in the network, in a provider, storage or (if opted in) buffer chest. Products made by one block become available to all others automatically.</p>
<p>A logistic condition counts the whole network's stock, the chest limiter only that chest; see [[logistics/logistic-conditions|logistic-network conditions]]. To make several different items in a single assembler, see the [[combinators/recipe-set-recipe|multi-recipe assembler]] circuit.</p>`,
      src: ['Logistic network', 'Requester chest', 'Circuit network'],
      kw: 'mall bot mall hub make everything shop assembler block',
    },
    {
      id: 'recipe-train-station',
      title: 'Robot train unloading station',
      category: 'Recipes',
      type: 'How-to',
      sum: 'Robots carry items from chests beside the wagons to requester chests that feed the belts.',
      cheat: [
        'Wagon → inserter → provider chest → robots → requester chest → inserter → belt.',
        'Active providers clear the platform fastest, but overflow goes to storage.',
        'Pack roboports around the station: charging is the bottleneck.',
        'Keep it a small separate network so robots stay at the station.',
      ],
      steps: [
        'Line the unloading side of the track with inserters dropping into <b>active provider chests</b>.',
        'Where the belts start, place <b>requester chests</b> that request the item, each with an inserter onto the belt.',
        'Surround the station with roboports and stock them with logistic robots.',
        'Add storage chests. Whenever the requesters are full, idle robots move what is left in the active providers into storage.',
      ],
      body: `<p>Stations are where robots are at their best: very high throughput over a very short distance, in bursts that leave time to recharge. This layout is the wiki's own lead example for the logistic network.</p>
<p>If you would rather have items wait in the platform chests until a requester asks, use passive providers; nothing is moved to storage then, but the chests can fill up and block the train from unloading.</p>`,
      src: ['Logistic network', 'Tutorial:Transport use cases', 'Active provider chest'],
      kw: 'train station unload load bots',
    },
    {
      id: 'recipe-outpost',
      title: 'Self-repairing wall or outpost',
      category: 'Recipes',
      type: 'How-to',
      sum: 'Roboports, construction robots, repair packs and spare parts keep a perimeter intact without you.',
      cheat: [
        'Cover the wall with green construction areas.',
        'Repair packs in the roboports, spare walls and turrets in a chest.',
        'Destroyed pieces leave ghosts for a week and are rebuilt.',
        'A separate network keeps these robots from wandering off across the base.',
      ],
      steps: [
        'Place roboports along the wall so their green areas overlap it. Let the orange areas touch if they should share robots and stock.',
        'Add construction robots and fill the repair pack slots of the roboports.',
        'Keep replacement walls, turrets, poles and so on in a provider or storage chest inside the orange area.',
        'If this network touches your main base, a <b>buffer chest</b> with fixed requests keeps the spare parts stocked automatically.',
        'Optional: wire a roboport and raise an alarm when available construction robots (Z) drop.',
      ],
      body: `<p>Repairs happen automatically ([[logistics/repairs|automatic repairs]]) and rebuilding uses the ghosts left by destroyed entities ([[logistics/automated-construction|robot construction]]). Remember that robots have no defence of their own and die to fire, including your flamethrower turrets.</p>
<p>To restock an isolated outpost by train, see the circuit [[combinators/recipe-outpost-stock|keep an outpost stocked]].</p>`,
      src: ['Roboport', 'Ghost', 'Repair pack', 'Construction robot', 'Buffer chest'],
      kw: 'defense wall perimeter turret rebuild outpost',
    },
    {
      id: 'recipe-buffer-depot',
      title: 'Forward supply with buffer chests',
      category: 'Recipes',
      type: 'How-to',
      sum: 'Pre-position building materials or personal supplies near where they are used.',
      cheat: [
        'Buffer chests request stock and offer it to players and construction robots.',
        'Construction robots use the closest chest, so a nearby buffer shortens every trip.',
        'Ordinary requesters ignore buffers.',
      ],
      steps: [
        'Place buffer chests inside the orange area near the work site.',
        'Set requests for what will be needed there: belts, inserters, poles, repair packs, ammunition.',
        'Wait for logistic robots to fill them. This happens after player and requester chest requests are served.',
        'Build. Construction robots and your personal requests now draw from the nearby buffers first when they are the closest source.',
      ],
      body: `<p>Because buffers are filled last and are never emptied into other buffers, they do not disturb the rest of the network. Save the request list as a [[logistics/logistic-groups|logistic group]] to reuse it on the next depot.</p>`,
      src: ['Buffer chest', 'Construction robot', 'Logistic network'],
      kw: 'buffer depot supply construction staging',
    },
    {
      id: 'recipe-retire-robots',
      title: 'Pull robots out of a network',
      category: 'Recipes',
      type: 'How-to',
      sum: 'Gather one type or quality of robot in a single roboport and let an inserter remove it.',
      cheat: [
        'Roboport robot request + filtered inserter + chest.',
        'Robots must be idle to answer the request.',
      ],
      steps: [
        'Pick one roboport and set a robot request for the type (and quality {SA}) you want to remove, with a high number.',
        'Place an inserter taking from that roboport into a chest and filter it to that robot.',
        'Idle robots of that kind move to the roboport and are taken out one stack at a time.',
        'Remove the request when the network is clean.',
      ],
      body: `<p>Useful when swapping normal robots for higher-quality ones, or when a network simply has too many robots queueing at the chargers. Inserters can take robots out of a roboport but not repair packs.</p>`,
      src: ['Roboport'],
      kw: 'remove robots replace quality swap too many',
    },

    /* ================= Troubleshooting ================= */
    {
      id: 'fix-not-delivered',
      title: 'Robots are not delivering: checklist',
      category: 'Troubleshooting',
      type: 'Fix',
      sum: 'The usual reasons a request stays unfilled or a ghost is not built.',
      cheat: [
        'Is the target inside an <b>orange</b> area of the <b>same</b> network as the source?',
        'Is the item in a chest robots may take from? Requester contents are reserved.',
        'Buffer stock is only for players, construction, and requesters with the option ticked.',
        'Are personal requests switched on (<kbd>Alt</kbd> + <kbd>L</kbd>)?',
        'Is the chest disabled by a circuit condition?',
        'Are any robots actually free (<kbd>L</kbd>)?',
      ],
      body: `
<ul>
<li><b>Coverage.</b> Logistic chests and requesting entities must be in the orange area. A chest outside any roboport's reach shows a warning icon. Two roboports are one network only if a dotted line joins them.</li>
<li><b>Where the item is.</b> Robots take from active providers, storage, buffers and passive providers. They never take from requester chests, and a buffer never supplies another buffer.</li>
<li><b>Buffers.</b> A normal requester ignores buffer chests unless "Request from buffer chests" is ticked.</li>
<li><b>Personal logistics.</b> Requests can be toggled off, and they switch off automatically when you die until you pick up your corpse.</li>
<li><b>Robots.</b> Check the logistic network view for available robots. If they are all queueing to charge, see [[logistics/fix-slow-robots|slow robots]].</li>
<li><b>Ghosts not built.</b> The ghost must be in a green area, the item must be in a provider, storage or buffer chest, and a construction robot must be free. Alerts tell you which is missing.</li>
<li><b>Odd counts.</b> Negative or inflated numbers are normal; see [[logistics/fix-numbers|odd numbers]].</li>
</ul>`,
      src: ['Logistic network', 'Alerts', 'Buffer chest', 'Construction robot'],
      kw: 'not working stuck missing problem debug why',
    },
    {
      id: 'fix-numbers',
      title: 'Negative stock and overfilled requests',
      category: 'Troubleshooting',
      type: 'Fix',
      sum: 'Two things that look like bugs and are not.',
      cheat: [
        'Network count = provider + buffer + storage contents − items reserved by robots.',
        'A robot reserves a <b>full load</b>, even if the chest holds less. The count can go negative.',
        'A negative number is not a shortage.',
        'Robots deliver full loads, so a chest can receive more than requested.',
      ],
      body: `
<h4>Negative numbers</h4>
<p>When a robot sets off to pick something up, it reserves the items by subtracting them from the network total, and it always reserves as much as it can carry. With a cargo size of 4 and a single iron plate in the network, the display shows −3 until the robot has collected it. Reserving ahead lets the robot grab items that arrive in the chest while it is on its way.</p>
<p>If no robot is on a pick-up, nothing is negative, no matter how many requests are open.</p>
<h4>More than requested</h4>
<p>If plenty is available, a robot takes as much as it can carry. Asking for 1 item with cargo size 4 can deliver 4. To keep an exact count somewhere, do the last step with an inserter and a circuit condition instead ([[combinators/recipe-limit-chest|limit items in a chest]]).</p>`,
      src: ['Logistic network', 'Worker robot cargo size (research)'],
      kw: 'negative minus count too many overfill bug',
    },
    {
      id: 'fix-slow-robots',
      title: 'Robots are slow or queue at roboports',
      category: 'Troubleshooting',
      type: 'Fix',
      sum: 'Nearly always a charging problem, not a robot-count problem.',
      cheat: [
        'Empty battery = 20% speed.',
        '4 charging slots per roboport: add roboports where the traffic is.',
        'Shorten the trips: move the source closer or add a buffer chest.',
        'Avoid routes across big gaps without roboports.',
        'More robots on a saturated network makes it worse.',
      ],
      body: `
<p>Robots waiting for a charging slot hover around the roboport. If they wait long enough to run empty, they crawl at a fifth of their speed, with their cargo. Adding roboports along the busy route is the direct fix, because robots prefer charging near their destination and switch to a less crowded roboport when the queue justifies the detour.</p>
<p>Other levers: [[logistics/robot-research|cargo size research]] (fewer trips for the same items), speed research (shorter trips), shorter distances, and in Space Age higher-quality robots and roboports. On Aquilo robots use five times the energy, so plan for many more charging slots there.</p>
<p>If roboports have no free robot slots, robots cannot land and you get a "no roboport storage" alert. Add roboports or [[logistics/recipe-retire-robots|remove some robots]].</p>`,
      src: ['Logistic network', 'Roboport', 'Tutorial:Transport use cases', 'Aquilo', 'Alerts'],
      kw: 'slow lag queue waiting charging stuck hover',
    },
    {
      id: 'fix-storage-full',
      title: 'Storage full, or items stuck in active providers',
      category: 'Troubleshooting',
      type: 'Fix',
      sum: 'Pushed-out items need a storage chest that will accept them.',
      cheat: [
        'Alert: "Not enough logistic network storage space".',
        'Filtered storage chests accept only their own item.',
        'Add unfiltered storage, or stop the source.',
        'Check what is filling storage: active providers and trash never stop on their own.',
      ],
      body: `<p>Active provider chests, trash slots, deconstruction and cancelled deliveries all push items into storage chests. A filter on a storage chest is always respected, so a network whose storage is entirely filtered has nowhere to put anything else.</p>
<p>When storage is full, active providers stay full (which may be exactly what stops the machine you wanted to keep running), trash stays in your trash slots and deconstruction orders are not carried out.</p>
<p>Fixes: add storage chests, consume the surplus (a requester feeding a recycler or a furnace line), or replace an active provider with a [[logistics/passive-provider|passive provider]] plus a limit so the surplus is never produced.</p>`,
      src: ['Storage chest', 'Active provider chest', 'Alerts', 'Logistic network'],
      kw: 'full no storage space stuck overflow alert',
    },
  ],
};
