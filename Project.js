var currentScene = 0;
var playerName = "";
var fatherName = "";
var motherName = "";
var wifeName = "";
var siblingOneName = "";
var siblingTwoName = "";
var siblingThreeName = "";
var siblingOneGender = "male";
var siblingTwoGender = "male";
var siblingThreeGender = "male";
var secondMotherName = "";
var broughtLakshmana = false;
var wentAlone = false;
var historyStack = [];
var dayNightMode = "day"; // "day" or "night"

// NEW GAME FEATURES
var inventory = [];
var characterStats = { courage: 50, wisdom: 50, strength: 50, strategy: 50 };
var questLog = [];
var achievements = [];
var relationships = { hanuman: 50, sugriva: 50, siblingOne: 50, wifeName: 50, siblingTwo: 50 };
var lakshmanaAllyStatus = "unknown"; // ally, guardian, unknown
var battleStats = { winsCount: 0, strategicVictories: 0, allyDeaths: 0 };
var lyricsKnown = [];


var rpgState = {
  profile: { background: "traveler", clothing: "simple traveler's cloth", tendency: "balanced" },
  stats: { dharma: 50, knowledge: 45, courage: 50, wisdom: 45, devotion: 40, persuasion: 40, stealth: 30, agility: 35, endurance: 45, craft: 30, perception: 40 },
  reputations: { ayodhya: 10, mithila: 0, hermitages: 0, kishkindha: 0, vanaras: 0, lanka: 0, merchants: 0, travelers: 0 },
  relationships: { vishvamitra: { trust: 0, respect: 0, gratitude: 0, suspicion: 0 }, sita: { trust: 10, affection: 10, respect: 5 }, lakshmana: { loyalty: 10, trust: 10, respect: 5 }, hanuman: { trust: 0, respect: 0, gratitude: 0 }, sugriva: { trust: 0, debt: 0, loyalty: 0 }, valmiki: { trust: 0, respect: 0 } },
  skills: { scholarship: { reading: 1, languages: 1, lore: 1, recognition: 1 }, survival: { tracking: 1, navigation: 1, foraging: 1, wilderness: 1 }, social: { persuasion: 1, diplomacy: 1, etiquette: 1, storytelling: 1 }, craft: { woodworking: 1, repair: 1, construction: 1, textile: 1 }, performance: { music: 1, rhythm: 1, recitation: 1 }, spiritual: { meditation: 1, focus: 1, ritual: 1 }, athletics: { balance: 1, climbing: 1, running: 1, swimming: 1 } },
  journal: { story: [], people: [], places: [], knowledge: [], promises: [], debts: [], discoveries: [], decisions: [], mysteries: [] },
  world: { timeOfDay: "morning", weather: "clear", day: 1, location: "Ayodhya", canonAnchor: "Bala Kanda opening", unlocked: ["ayodhya_market", "valmiki_frame"] },
  quests: { sevenKandaJourney: { status: "active", stage: "Bala Kanda", variants: [] }, villageDispute: { status: "available", solutions: [] }, forestHermitageAid: { status: "locked", solutions: [] } },
  journey: []
};

var kandaAtlas = [
  { name: "I — Bala Kanda", anchor: "Valmiki and Narada frame Rama's life; births, training with Vishvamitra, Ahalya, Mithila, Shiva's bow, marriages, Parashurama.", play: "Court errands, manuscript learning, sacrifice protection, respectful observation puzzles, Mithila etiquette, bow-hall lore checks." },
  { name: "II — Ayodhya Kanda", anchor: "Coronation preparations turn to exile; Guha, Ganga, Bharadvaja, Chitrakuta, Dasharatha's death, Bharata, sandals, Nandigrama.", play: "Household trust, public rumor, route planning, promises, grief rituals, diplomacy with citizens and forest allies." },
  { name: "III — Aranya Kanda", anchor: "Dandaka, sages, Panchavati, Surpanakha, Khara and Dushana, Maricha, Sita's abduction, Jatayu, Kabandha, Shabari.", play: "Living forest exploration with day/night, weather, hermitages, wildlife clues, hidden paths, tracking and compassion consequences." },
  { name: "IV — Kishkindha Kanda", anchor: "Hanuman meets Rama; Sugriva alliance, Vali, Tara, Angada, rainy season, search parties, Sampati, Sita's location.", play: "Vanara politics, alliance reputation, monsoon downtime activities, search-party logistics, memory of promises." },
  { name: "V — Sundara Kanda", anchor: "Hanuman's leap, Mainaka, Surasa, Simhika, night Lanka, Ashoka Vatika, Sita, ring, Ravana's court, Lanka burns, return.", play: "Supernatural scale shift with stealth, observation, rhythm of breath, symbolic pattern, and consequence-rich scouting reports." },
  { name: "VI — Yuddha Kanda", anchor: "Vibhishana, ocean, bridge, crossing, diplomacy, Angada, war, Kumbhakarna, Indrajit, Sanjivani, Ravana, return, coronation.", play: "War-council strategy, bridge construction, mercy and morale, logistics, battlefield rescues, postwar reputation." },
  { name: "VII — Uttara Kanda", anchor: "Later reign, public opinion, Sita's separation in received tradition, Valmiki's ashram, Lava and Kusha, Ashvamedha, recognition, Sita's return to Earth, Rama's final departure. Scholarly status is clearly labeled as discussed.", play: "Legacy simulation, public trust, recitation, governance petitions, difficult duty, memory of the whole journey." }
];

function rememberJourney(text) {
  if (rpgState.journey.indexOf(text) === -1) { rpgState.journey.push(text); }
}

function adjustRpg(path, amount) {
  var parts = path.split(".");
  var target = rpgState;
  for (var i = 0; i < parts.length - 1; i += 1) { target = target[parts[i]]; }
  var key = parts[parts.length - 1];
  if (typeof target[key] === "number") { target[key] = Math.max(-100, Math.min(100, target[key] + amount)); }
}

function runRpgActivity(activity) {
  var log = "";
  if (activity === "market") {
    adjustRpg("stats.persuasion", 3); adjustRpg("reputations.merchants", 5); rpgState.journal.people.push("Ayodhya merchants"); log = "You mediated a fair market exchange; merchants may quote kinder prices later.";
  } else if (activity === "study") {
    adjustRpg("stats.knowledge", 4); rpgState.journal.knowledge.push("Valmiki-Narada opening frame"); log = "You copied a manuscript note and unlocked a lore-aware answer for future sages.";
  } else if (activity === "forest") {
    adjustRpg("stats.perception", 3); adjustRpg("stats.endurance", 2); rpgState.journal.places.push("Hidden forest path"); rpgState.journal.discoveries.push("A quiet route between hermitages"); log = "You mapped a hidden path; later forest travel can become safer or faster.";
  } else if (activity === "music") {
    adjustRpg("stats.devotion", 2); rpgState.skills.performance.rhythm += 1; log = "You kept a respectful tala pattern; storytellers remember your attention.";
  }
  rememberJourney(log);
  showScene();
}

function buildRpgDashboard() {
  var stats = Object.keys(rpgState.stats).map(function (key) { return "<span>" + key.toUpperCase() + " <strong>" + rpgState.stats[key] + "</strong></span>"; }).join("");
  var kandas = kandaAtlas.map(function (kanda) { return "<details><summary>" + escapeHtml(kanda.name) + "</summary><p><strong>Canonical anchor:</strong> " + escapeHtml(kanda.anchor) + "</p><p><strong>Reactive play:</strong> " + escapeHtml(kanda.play) + "</p></details>"; }).join("");
  var journey = rpgState.journey.length ? rpgState.journey.slice(-5).map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") : "<li>Your meaningful actions will appear here without exposing every hidden consequence.</li>";
  return "<section id='rpgDashboard' aria-label='Reactive RPG systems'><div class='rpg-grid'><article><h3>Living Character</h3><p>You are an original " + escapeHtml(rpgState.profile.background) + " inside the epic, not a replacement for Rama, Sita, Hanuman, or other central figures.</p><div class='stat-cloud'>" + stats + "</div></article><article><h3>World Simulation</h3><p><strong>" + escapeHtml(rpgState.world.timeOfDay) + "</strong> · <strong>" + escapeHtml(rpgState.world.weather) + "</strong> · " + escapeHtml(rpgState.world.location) + "</p><p>NPCs evaluate trust, respect, suspicion, gratitude, debt, and loyalty instead of one morality meter.</p></article><article><h3>Your Journey</h3><ol>" + journey + "</ol></article></div><div class='activity-row'><button onclick=\"runRpgActivity('market')\">Mediate Market</button><button onclick=\"runRpgActivity('study')\">Study Manuscript</button><button onclick=\"runRpgActivity('forest')\">Scout Forest Path</button><button onclick=\"runRpgActivity('music')\">Practice Rhythm</button></div><div class='kanda-atlas'><h3>Seven-Kanda Reactive Atlas</h3>" + kandas + "</div><div class='mini-game-library'><h3>Contextual Mini-Game Library</h3><p>Memory, trivia, dialogue construction, rhythm, calligraphy-style reconstruction, navigation, observation, pattern, timing, sorting, language, map-reading, resource planning, meditation, crafting, and logic challenges can now update stats, relationships, quests, discoveries, and future dialogue.</p></div></section>";
}

// var familySetupEnabled = false;
// var familySetupActivatedOnce = false;
// var customNames = null;

console.log("Update 28");

var scenes = {
  1: {
    title: "The Ramayana Begins",
    text: [
      "Welcome, {{name}}!",
      "{{name}}, you are the prince of Ayodhya, and the kingdom is preparing to celebrate your coronation as {{fatherName}} grows old.",
      "Before dawn, {{secondMotherName}} invokes old promises and demands that {{siblingTwoName}} receive the throne while you, {{name}}, are sent into exile.",
      "To protect dharma and your father's honor, you accept a life of hardship and vow that you, {{name}}, will not enter any city until the exile ends."
    ],
    choices: [
      { label: "Argue back", next: 3 },
      { label: "Accept the exile", next: 4 }
    ]
  },
  3: {
    title: "You choose to argue back.",
    text: [
      "{{name}}, your words shake the royal court, and {{fatherName}} briefly gathers strength to challenge {{secondMotherName}}'s demand.",
      "Even so, the king remains bound by his oath, and you, {{name}}, realize exile is unavoidable if honor is to survive."
    ],
    choices: [{ label: "Continue", next: 4 }]
  },
  4: {
    title: "You choose to accept the exile.",
    text: [
      "{{name}}, you lay aside royal ornaments and prepare for forest life with calm resolve.",
      "{{siblingOneName}} swears loyalty and {{wifeName}} refuses to stay behind, telling you that your path, {{name}}, is now their path as well."
    ],
    choices: [
      { label: "Argue back again", next: 69 },
      { label: "Continue", next: 70 }
    ]
  },
  69: {
    title: "{{secondMotherName}}'s Final Command",
    text: [
      "{{name}}, your second refusal is treated as rebellion in open court.",
      "Under {{secondMotherName}}'s demand, the guards carry out a swift execution before {{fatherName}} can stop it."
    ],
    choices: [{ label: "Restart", restart: true }]
  },
  70: {
    title: "A Family Plea",
    text: [
      "{{motherName}}, {{siblingOneName}}, and {{siblingThreeName}} beg you not to go into exile.",
      "{{siblingTwoName}} stays silent; {{siblingTwoPossessive}} mother, {{secondMotherName}}, forbids {{siblingTwoObject}} from pleading against the exile order."
    ],
    choices: [{ label: "Continue", next: 71 }]
  },
  71: {
    title: "Who Goes With You?",
    text: [
      "You steady yourself and choose whether to walk into exile alone or with {{siblingOneName}} and {{wifeName}}."
    ],
    choices: [
      { label: "Go alone", next: 5, onPick: function () { wentAlone = true; } },
      { label: "Go with them", next: 6, onPick: function () { wentAlone = false; } }
    ]
  },
  5: {
    title: "You choose to go alone.",
    text: [
      "{{name}}, you leave Ayodhya alone, carrying only a bow, memory, and duty.",
      "Each step into the forest deepens the silence around you, but your vow remains unbroken."
    ],
    choices: [{ label: "Continue", next: 66 }]
  },
  6: {
    title: "You choose to go with them.",
    text: [
      "{{name}}, with {{wifeName}} and {{siblingOneName}} at your side, exile becomes a shared pilgrimage instead of a lonely punishment.",
      "Together you cross rivers, build shelter, and learn the rhythms of forest life."
    ],
    choices: [{ label: "Continue", next: 66 }]
  },
  7: {
    title: "Surphanaka's Encounter",
    text: [
      "In the dappled forest light, Surphanaka appears and circles your camp, studying you, {{name}}, with dangerous fascination.",
      "When rejected, she turns her anger toward {{wifeName}}. {{name}}, how will you answer this threat?"
    ],
    dialogue: [
      { speaker: "Surphanaka", line: "\"Hand over {{wifeName}}, and I may spare your camp.\"" },
      { speaker: "{{name}}", line: "\"Stand down. You will not threaten my family.\"" }
    ],
    choices: [
      { label: "Fight Surphanaka", next: 9 },
      { label: "Protect {{wifeName}}", next: 10 },
      { label: "Negotiate", next: 11 },
      { label: "Accept the marriage", next: 12 }
    ]
  },
  8: {
    title: "Surphanaka's Encounter",
    text: [
      "Traveling alone, you, {{name}}, are approached by Surphanaka, who proposes an alliance through marriage.",
      "Her smile hides a storm. Will you accept or reject?"
    ],
    choices: [
      { label: "Accept", next: 12 },
      { label: "Reject", next: 13 }
    ]
  },
  9: {
    title: "Fight Surphanaka",
    text: [
      "{{name}}, steel meets claw as the forest erupts in a swift and brutal clash.",
      "Your fate turns on one fierce exchange."
    ],
    choices: [{ label: "Fight", next: -1 }]
  },
  10: {
    title: "Protect {{wifeName}}",
    text: [
      "{{name}}, you and {{siblingOneName}} form a shield around {{wifeName}} and drive Surphanaka back.",
      "She retreats in fury, promising revenge."
    ],
    choices: [{ label: "Continue", next: 19 }]
  },
  11: {
    title: "Negotiate with Surphanaka",
    text: [
      "{{name}}, you lower your weapon and try words before war, appealing to reason over rage.",
      "Surphanaka listens, but her pride burns hotter than your diplomacy."
    ],
    choices: [
      { label: "Try again", next: 15 },
      { label: "Prepare to fight", next: 9 }
    ]
  },
  12: {
    title: "Accept Surphanaka's Proposal",
    text: [
      "{{name}}, you accept her proposal to buy time and insight, stepping into a dangerous game.",
      "Soon you are escorted to Lanka to stand before Ravana himself."
    ],
    choices: [{ label: "Meet Ravana", next: 16 }]
  },
  13: {
    title: "Reject Surphanaka's Proposal",
    text: [
      "{{name}}, your refusal lands like a blade, and Surphanaka answers with open fury.",
      "The forest goes still as battle becomes inevitable."
    ],
    choices: [{ label: "Fight Surphanaka", next: 9 }]
  },
  14: {
    title: "Victory",
    text: [
      "{{name}}, you survive the confrontation and push forward, though the warning signs of larger conflict are now impossible to ignore."
    ],
    choices: [{ label: "Continue", next: 19 }]
  },
  15: {
    title: "Negotiation Fails",
    text: [
      "{{name}}, your final effort to avoid bloodshed collapses.",
      "Words end, and the forest prepares for violence."
    ],
    choices: [{ label: "Fight Surphanaka", next: 9 }]
  },
  16: {
    title: "Meeting Ravana",
    text: [
      "Ravana greets you with charm and menace, offering you, {{name}}, power, luxury, and a throne to abandon your vow."
    ],
    choices: [{ label: "Claim the throne", next: 17 }]
  },
  17: {
    title: "Evil King Ending",
    text: [
      "{{name}}, you accept Ravana's bargain and gain a crown at the price of righteousness.",
      "Your legend survives, but not as a hero's."
    ],
    choices: [{ label: "Restart", restart: true }]
  },
  18: {
    title: "Game Over",
    text: [
      "{{name}}, you fought bravely, but destiny closes this path.",
      "Another choice may yet restore your story."
    ],
    choices: [{ label: "Restart", restart: true }]
  },
  19: {
    title: "The Golden Deer",
    text: [
      "A radiant golden deer appears near the hut, moving like moonlight through leaves.",
      "{{wifeName}} asks you, {{name}}, to bring it back, unaware that illusion has already entered your home."
    ],
    dialogue: [
      { speaker: "{{wifeName}}", line: "\"That deer is beautiful, {{name}}. Please catch it for us.\"" },
      { speaker: "{{name}}", line: "\"Stay alert while I decide. Something feels wrong.\"" }
    ],
    choices: [
      { label: "Chase the deer", next: 20 },
      { label: "Ignore it", next: 21 }
    ]
  },
  20: {
    title: "Bring {{siblingOneName}}?",
    text: [
      "{{siblingOneName}} offers to accompany you, {{name}}, worried by the deer's unnatural beauty.",
      "Do you bring {{siblingOneObject}} or leave {{siblingOneObject}} to guard {{wifeName}}?"
    ],
    choices: [
      { label: "Yes, bring {{siblingOneName}}", next: 22, onPick: function () { broughtLakshmana = true; } },
      { label: "No, leave {{siblingOneObject}} with {{wifeName}}", next: 23, onPick: function () { broughtLakshmana = false; } }
    ]
  },
  21: {
    title: "You Ignore the Deer",
    text: [
      "{{name}}, you distrust the illusion and refuse the chase.",
      "For now, the danger withdraws and your family remains together."
    ],
    choices: [{ label: "Restart", restart: true }]
  },
  22: {
    title: "Find the Deer",
    text: [
      "{{name}}, you and {{siblingOneName}} track the deer deep into shadowed groves where every glimmer feels staged."
    ],
    choices: [{ label: "Keep following it", next: 24 }]
  },
  23: {
    title: "Find the Deer",
    text: [
      "{{name}}, you pursue the deer alone, trusting speed over caution."
    ],
    choices: [{ label: "Keep following it", next: 24 }]
  },
  24: {
    title: "Shoot the Deer",
    text: [
      "Your arrow lands true, and the golden illusion tears away to reveal Maricha.",
      "{{name}}, you now understand this chase was a trap from the beginning."
    ],
    choices: [{ label: "Continue", next: 25 }]
  },
  25: {
    title: "Maricha's Last Cry",
    text: [
      "With his final breath, Maricha mimics your voice and cries for help.",
      "{{name}}, the sound races toward your hut, meant to break trust at the worst possible moment."
    ],
    choices: [{ label: "Continue", next: 26 }]
  },
  26: {
    title: "Ravana Sees His Chance",
    text: [
      "As you race back, Ravana takes disguise and moves toward your dwelling.",
      "By the time danger peaks, only fate and vigilance stand between your family and calamity."
    ],
    choices: [{ label: "Continue", next: 29 }]
  },
  27: {
    title: "{{siblingOneName}} Draws the Line",
    text: [
      "{{siblingOneName}} leaves a protective warning before stepping away, torn between obedience and unease.",
      "He prays that this line will hold until you return, {{name}}."
    ],
    choices: [{ label: "Continue", next: 28 }]
  },
  28: {
    title: "Ravana's Trick",
    text: [
      "Disguised as a holy seeker, Ravana asks for alms and manipulates sacred duty.",
      "{{wifeName}} hesitates between caution and compassion."
    ],
    choices: [{ label: "See what happens", next: -2 }]
  },
  29: {
    title: "The Abduction of {{wifeName}}",
    text: [
      "Ravana drops his disguise, reveals his terrifying form, and seizes {{wifeName}}.",
      "By the time you, {{name}}, return, the forest carries only echoes and broken signs of struggle."
    ],
    dialogue: [
      { speaker: "{{wifeName}}", line: "\"{{name}}! {{siblingOneName}}! Help me!\"" },
      { speaker: "Ravana", line: "\"Cry out if you must. Lanka will still claim you.\"" }
    ],
    choices: [{ label: "Continue", next: 30 }]
  },
  30: {
    title: "Jatayu Sees Ravana",
    text: [
      "From the sky, Jatayu witnesses the abduction and recognizes your family in peril.",
      "The old warrior-bird must decide in an instant whether to intervene."
    ],
    choices: [
      { label: "Do nothing", next: 31 },
      { label: "Try to rescue {{wifeName}}", next: 32 }
    ]
  },
  31: {
    title: "{{wifeName}} is Taken",
    text: [
      "Ravana escapes with {{wifeName}}, and your grief becomes purpose.",
      "{{name}}, the rescue mission begins."
    ],
    choices: [{ label: "Keep searching", next: 65 }]
  },
  32: {
    title: "Jatayu's Rescue Attempt",
    text: [
      "Jatayu rises against Ravana in a desperate sky battle, wings beating against impossible odds."
    ],
    choices: [{ label: "See what happens", next: -3 }]
  },
  33: {
    title: "Jatayu Rescues {{wifeName}}",
    text: [
      "Against all expectation, Jatayu tears {{wifeName}} free and Ravana crashes nearby.",
      "{{name}}, you have a final chance to finish this now."
    ],
    choices: [{ label: "Go after Ravana", next: 36 }]
  },
  34: {
    title: "Jatayu Falls",
    text: [
      "Jatayu is struck down after a heroic stand, and {{wifeName}} is still carried away.",
      "His sacrifice leaves you, {{name}}, with grief and a vital clue."
    ],
    choices: [{ label: "Continue", next: 37 }]
  },
  36: {
    title: "Fight Ravana in the Forest",
    text: [
      "{{name}}, you confront Ravana beside his shattered chariot in a duel of fury and conviction."
    ],
    choices: [{ label: "Fight Ravana", next: 38 }]
  },
  37: {
    title: "{{wifeName}} is Taken",
    text: [
      "{{name}}, you and {{siblingOneName}} begin searching immediately, following broken branches, chariot marks, and fading cries."
    ],
    choices: [{ label: "Keep searching", next: 65 }]
  },
  38: {
    title: "Forest Duel Ending",
    text: [
      "{{name}}, you win a brutal forest duel and protect {{wifeName}} before Ravana can flee.",
      "This path ends in sudden victory."
    ],
    choices: [{ label: "Restart", restart: true }]
  },
  39: {
    title: "{{siblingOneName}} Saves {{wifeName}}",
    text: [
      "{{siblingOneName}}'s discipline holds; Ravana retreats and {{wifeName}} remains safe.",
      "{{name}}, your household survives this test."
    ],
    choices: [{ label: "Restart", restart: true }]
  },
  40: {
    title: "Meeting Sugriva",
    text: [
      "While searching for {{wifeName}}, you, {{name}}, meet Sugriva, an exiled vanara prince seeking justice against Vali."
    ],
    dialogue: [
      { speaker: "Sugriva", line: "\"Help me reclaim my honor, and I will help you find {{wifeName}}.\"" }
    ],
    choices: [{ label: "Hear Sugriva's request", next: 41 }]
  },
  41: {
    title: "Sugriva's Plea",
    text: [
      "Sugriva recounts betrayal and exile, asking you, {{name}}, to help him reclaim honor and kingdom."
    ],
    choices: [{ label: "Consider his plan", next: 42 }]
  },
  42: {
    title: "Your Exile Vow",
    text: [
      "Bound by your forest vow, you refuse to enter the city and instead design an ambush beyond its walls."
    ],
    choices: [{ label: "Set the trap", next: 43 }]
  },
  43: {
    title: "Sugriva Challenges Vali",
    text: [
      "As Sugriva and Vali clash, you, {{name}}, must identify the critical truth before releasing your arrow."
    ],
    choices: [
      { label: "Sugriva's wife", next: 44 },
      { label: "Sugriva's bow", next: 45 },
      { label: "Sugriva's horse", next: 46 }
    ]
  },
  44: {
    title: "Vali Falls",
    text: [
      "Your arrow strikes true, Vali falls, and Sugriva's exile ends.",
      "In gratitude, he commits his forces to your cause, {{name}}."
    ],
    choices: [{ label: "Meet Sugriva's ally", next: 47 }]
  },
  45: {
    title: "You Miss the Moment",
    text: [
      "{{name}}, hesitation breaks the plan and Vali escapes the trap."
    ],
    choices: [{ label: "Restart", restart: true }]
  },
  46: {
    title: "You Miss the Moment",
    text: [
      "Your call is wrong, and Sugriva retreats wounded.",
      "{{name}}, the alliance collapses on this path."
    ],
    choices: [{ label: "Restart", restart: true }]
  },
  47: {
    title: "Meeting Hanuman",
    text: [
      "Hanuman bows and pledges unwavering service, recognizing your purpose, {{name}}, as righteous and urgent.",
      "Before marching, he invites you to a training ground challenge to sharpen your focus."
    ],
    choices: [{ label: "Go to Training Ground", next: 48 }]
  },
  48: {
    title: "Training Ground Trivia",
    text: [
      "At a clearing marked with practice dummies and banner poles, Hanuman runs a quick readiness drill for you, {{name}}.",
      "Trivia Question: Who is known as the devoted sibling who accompanies you into exile?"
    ],
    choices: [
      { label: "{{siblingOneName}}", next: 50 },
      { label: "{{siblingThreeName}}", next: 51 },
      { label: "Vali", next: 51 }
    ]
  },
  50: {
    title: "Training Ground Result",
    text: [
      "Correct, {{name}}. Hanuman smiles and says your memory is as sharp as your aim.",
      "Your allies leave the training ground with stronger morale."
    ],
    choices: [{ label: "Proceed to War Council", next: 54 }]
  },
  51: {
    title: "Training Ground Result",
    text: [
      "Not quite, {{name}}. Hanuman reviews the key companions of your journey before the campaign continues.",
      "Even mistakes can prepare a leader for war."
    ],
    choices: [{ label: "Proceed to War Council", next: 54 }]
  },
  52: {
    title: "Peaceful Ending",
    text: [
      "{{name}}, traveling alone, you survive Surphanaka's challenge and complete exile in rare peace.",
      "This quieter legend ends far from court and war."
    ],
    choices: [{ label: "Restart", restart: true }]
  },
  54: {
    title: "War Council Strategy",
    text: [
      "Hanuman, {{siblingOneName}}, Sugriva, and you, {{name}}, gather to plan the assault on Lanka.",
      "The council debates approach: strike swiftly and directly, or scout first for intelligence?"
    ],
    dialogue: [
      { speaker: "Hanuman", line: "\"I can reach Lanka in a single bound, {{name}}.\"" },
      { speaker: "Sugriva", line: "\"And what of returning with {{wifeName}}? We must know Ravana's strength.\"" }
    ],
    choices: [
      { label: "Send Hanuman to scout", next: 75 },
      { label: "Launch direct assault", next: 76 },
      { label: "Wait and plan carefully", next: 77 }
    ]
  },
  75: {
    title: "Hanuman's Solo Journey",
    text: [
      "You choose to send Hanuman ahead as a scout, knowing his speed and wisdom make him ideal for reconnaissance.",
      "Hanuman pledges to find {{wifeName}}, learn Ravana's defenses, and return with a full report."
    ],
    choices: [{ label: "Continue", next: 78 }]
  },
  76: {
    title: "Direct Assault Ordered",
    text: [
      "You order an immediate assault on Lanka, determined to rescue {{wifeName}} before Ravana's schemes advance further.",
      "Your forces march toward the shore, ready to cross the ocean."
    ],
    choices: [{ label: "Reach the Ocean", next: 79 }]
  },
  77: {
    title: "Careful Planning",
    text: [
      "You insist on a measured approach, gathering detailed intelligence before committing to the assault.",
      "Hanuman and scouts prepare for a thorough reconnaissance mission."
    ],
    choices: [{ label: "Hanuman departs", next: 78 }]
  },
  78: {
    title: "Hanuman's Reconnaissance",
    text: [
      "Hanuman bounds across the ocean in a single leap, defying its vast width.",
      "Arriving in Lanka, he searches for {{wifeName}} and maps Ravana's palace and army strength.",
      "{{name}}, hours pass as you wait by the shore. When Hanuman returns, his news will shape your next move."
    ],
    choices: [
      { label: "Hanuman returns with good news", next: 80 },
      { label: "Hanuman returns with grave warnings", next: 81 }
    ]
  },
  79: {
    title: "The Ocean Salute",
    text: [
      "You and your forces reach the shore, facing the vast ocean blocking your path to Lanka.",
      "You bow respectfully and call upon the Ocean itself, asking for passage."
    ],
    dialogue: [
      { speaker: "{{name}}", line: "\"Ocean, I ask for safe passage to Lanka. Help me rescue {{wifeName}} from tyranny.\"" }
    ],
    choices: [
      { label: "Ocean grants a bridge", next: 82 },
      { label: "Ocean demands a sacrifice", next: 83 }
    ]
  },
  80: {
    title: "Scout Report: Sita Found",
    text: [
      "Hanuman returns with joy in his eyes.",
      "\"I found {{wifeName}} in Ravana's ashoka grove, {{name}}, guarded but alive. She has not given in to Ravana's threats.\"",
      "\"The palace is vast but his inner guard is not as strong as legend suggests.\""
    ],
    choices: [
      { label: "Plan a rescue raid", next: 84 },
      { label: "Send a messenger to {{wifeName}}", next: 85 }
    ]
  },
  81: {
    title: "Scout Report: Dire Warning",
    text: [
      "Hanuman returns with a grave expression.",
      "\"Ravana's army is larger than we thought, {{name}}. His palace is a fortress with enchantments. {{wifeName}} is there, but the cost of rescue will be steep.\"",
      "\"The choice is yours: proceed with the attack or seek another path.\""
    ],
    choices: [
      { label: "Attack despite the odds", next: 87 },
      { label: "Attempt a deception", next: 86 },
      { label: "Seek divine intervention", next: 88 }
    ]
  },
  82: {
    title: "The Ocean Bridge",
    text: [
      "The Ocean itself rises and forms a bridge of solid water, defying the laws of nature.",
      "Your army crosses safely, {{name}}, and reaches the shores of Lanka.",
      "The fortress city looms ahead, and the true assault begins."
    ],
    choices: [{ label: "Approach the gates", next: 89 }]
  },
  83: {
    title: "Ocean's Price",
    text: [
      "The Ocean speaks: \"To cross, one of your commanders must remain to guard this passage forever.\"",
      "{{name}}, you must decide who bears this burden."
    ],
    choices: [
      { label: "Offer {{siblingOneName}}", next: 90 },
      { label: "Offer Hanuman", next: 91 },
      { label: "Refuse and find another way", next: 92 }
    ]
  },
  84: {
    title: "Rescue Raid Prepared",
    text: [
      "You and Hanuman plan a swift, targeted rescue.",
      "A small team will infiltrate the ashoka grove while Hanuman creates a diversion.",
      "Speed and stealth are your only advantages."
    ],
    choices: [
      { label: "Infiltrate tonight", next: 93 },
      { label: "Wait for moonless night", next: 94 }
    ]
  },
  85: {
    title: "Hanuman Delivers a Message",
    text: [
      "You send Hanuman back with a message for {{wifeName}}: \"Hold steadfast. Help is coming.\"",
      "Hanuman leaps back to Lanka and finds {{wifeName}} in the ashoka grove.",
      "He delivers the message in secret, renewing her hope."
    ],
    choices: [{ label: "Begin the rescue assault", next: 95 }]
  },
  86: {
    title: "Deception Strategy",
    text: [
      "You devise a cunning plan: send a false messenger claiming {{siblingTwoName}} has conquered Sugriva and wants to negotiate.",
      "Ravana, believing your alliance is broken, may lower his guard."
    ],
    choices: [{ label: "Send the false messenger", next: 96 }]
  },
  87: {
    title: "Charge Into Battle",
    text: [
      "Despite Hanuman's warnings, you order a direct assault on Lanka.",
      "You lead the charge yourself, your bow drawn, determined to reach {{wifeName}}."
    ],
    choices: [{ label: "The siege of Lanka begins", next: 97 }]
  },
  88: {
    title: "Prayer for Divine Aid",
    text: [
      "You meditate and pray for intervention from the gods.",
      "A divine vision appears before you, offering counsel and blessing.",
      "Your resolve strengthens, and the impossible suddenly feels possible."
    ],
    choices: [{ label: "Assault Lanka with divine favor", next: 98 }]
  },
  89: {
    title: "Lanka's Golden Gates",
    text: [
      "Your army stands before Lanka's massive golden gates, forged by ancient magic.",
      "{{name}}, the city is magnificent and terrible, a fortress within a fortress.",
      "Ravana's guards begin to stir at the gates."
    ],
    choices: [
      { label: "Demand surrender", next: 100 },
      { label: "Force the gates open", next: 101 }
    ]
  },
  90: {
    title: "{{siblingOneName}}'s Sacrifice",
    text: [
      "You turn to {{siblingOneName}} and ask him to bear this burden.",
      "{{siblingOneName}} nods without hesitation: \"I will remain, {{name}}. Go rescue {{wifeName}}.\"",
      "{{siblingOneName}} takes his place at the bridge as your army crosses into Lanka."
    ],
    choices: [{ label: "Cross with the army", next: 82 }]
  },
  91: {
    title: "Hanuman's Eternal Guard",
    text: [
      "You ask Hanuman to remain as the Ocean's guardian.",
      "Hanuman's face shows sadness but acceptance.",
      "\"I cannot fight Ravana beside you, {{name}}. But I will hold this bridge with my last breath.\""
    ],
    choices: [{ label: "Cross with the army", next: 82 }]
  },
  92: {
    title: "Reject the Ocean",
    text: [
      "You refuse to sacrifice anyone. You seek another path.",
      "The Ocean recedes, and you must find an alternative route to Lanka.",
      "Days pass as you search for a way across."
    ],
    choices: [{ label: "Discover an ancient sea route", next: 102 }]
  },
  93: {
    title: "Night Infiltration",
    text: [
      "You and a small team infiltrate Lanka's ashoka grove under cover of darkness.",
      "The guards are fewer than expected; Hanuman's diversion works perfectly.",
      "You find {{wifeName}} and begin the escape."
    ],
    choices: [{ label: "Race back to the shore", next: 103 }]
  },
  94: {
    title: "Waiting for the Moonless Night",
    text: [
      "You wait three days for the moonless night.",
      "The wait is agonizing, but the darkness provides perfect cover.",
      "On the night of the new moon, you lead your infiltration team."
    ],
    choices: [{ label: "Infiltrate in darkness", next: 93 }]
  },
  95: {
    title: "The Rescue Assault Begins",
    text: [
      "With {{wifeName}} aware that rescue is coming, hope burns bright in her heart.",
      "Your forces storm Lanka, and the battle begins in earnest.",
      "{{name}}, you fight your way toward the ashoka grove."
    ],
    choices: [{ label: "Battle toward {{wifeName}}", next: 104 }]
  },
  96: {
    title: "Ravana's Confusion",
    text: [
      "The false messenger reaches Ravana and plants seeds of doubt.",
      "Ravana's paranoia grows as he questions {{siblingTwoName}}'s loyalty.",
      "In his distraction, his vigilance weakens—the perfect opportunity."
    ],
    choices: [{ label: "Launch the rescue", next: 105 }]
  },
  97: {
    title: "The Siege of Lanka",
    text: [
      "A fierce battle rages outside Lanka's walls.",
      "Your forces clash with Ravana's demons and soldiers.",
      "{{name}}, you fight with extraordinary skill, carving a path toward the palace."
    ],
    choices: [{ label: "Fight through to the palace", next: 106 }]
  },
  98: {
    title: "Blessed Assault",
    text: [
      "With divine favor, your assault seems blessed by the gods themselves.",
      "Your arrows fly true, your soldiers fight with supernatural strength.",
      "Lanka's defenses crumble before your blessed assault."
    ],
    choices: [{ label: "Press the advantage", next: 107 }]
  },
  100: {
    title: "Demand Surrender",
    text: [
      "You step forward and demand that Ravana surrender {{wifeName}} and accept exile.",
      "Ravana appears on the palace walls, laughing.",
      "\"Surrender? {{name}}, you amuse me. Lanka will be your tomb!\""
    ],
    choices: [{ label: "Battle erupts", next: 106 }]
  },
  101: {
    title: "Force the Gates",
    text: [
      "Your strongest soldiers push against Lanka's golden gates.",
      "With a tremendous crash, the gates give way, revealing the streets beyond.",
      "Ravana's army pours out to meet you in the streets."
    ],
    choices: [{ label: "Battle in Lanka's streets", next: 108 }]
  },
  102: {
    title: "Ancient Sea Route Discovered",
    text: [
      "You discover an ancient underwater passage created by celestial beings.",
      "Your army crosses safely through the luminous tunnel.",
      "{{name}}, you emerge on Lanka's far shore, behind enemy lines."
    ],
    choices: [{ label: "Surprise assault from behind", next: 109 }]
  },
  103: {
    title: "Escape with {{wifeName}}",
    text: [
      "{{wifeName}} clings to your arm as you race through Lankan streets.",
      "Hanuman fights beside you, clearing a path with tremendous power.",
      "Behind you, Ravana's guards close in. The shore is still far."
    ],
    choices: [
      { label: "Fight through the guards", next: 110 },
      { label: "Hide and wait for pursuit to pass", next: 111 }
    ]
  },
  104: {
    title: "Battle in the Ashoka Grove",
    text: [
      "The ashoka grove becomes a battleground as {{wifeName}}'s guards defend her.",
      "{{name}}, you duel the grove's commander with skill and fury.",
      "{{wifeName}} is freed, and reunion is possible."
    ],
    choices: [{ label: "Embrace {{wifeName}}", next: 112 }]
  },
  105: {
    title: "Strike While Distracted",
    text: [
      "With Ravana distracted by paranoia, his defenses falter.",
      "You breach Lanka's inner sanctum with surprising ease.",
      "{{wifeName}} is within reach."
    ],
    choices: [{ label: "Locate {{wifeName}}", next: 112 }]
  },
  106: {
    title: "Duel with Ravana",
    text: [
      "You finally face Ravana in single combat within his palace.",
      "The ten-headed demon lord fights with terrifying skill.",
      "{{name}}, your bow and his magic clash in a dance of destiny."
    ],
    choices: [
      { label: "Aim for the weak point", next: 113 },
      { label: "Face him head-on", next: 114 }
    ]
  },
  107: {
    title: "Divine Momentum Carries Victory",
    text: [
      "Your blessed forces sweep through Lanka like an unstoppable tide.",
      "Ravana's defenses crumble, and he is forced to face you in personal combat.",
      "The god's favor is with you, {{name}}."
    ],
    choices: [{ label: "Confront Ravana", next: 106 }]
  },
  108: {
    title: "Street Combat",
    text: [
      "The streets of Lanka become a battlefield.",
      "Your soldiers fight with honor, and Hanuman's strength turns the tide.",
      "{{name}}, you push deeper toward the palace."
    ],
    choices: [{ label: "Reach the palace", next: 115 }]
  },
  109: {
    title: "Surprise from Behind",
    text: [
      "Your surprise assault catches Ravana's army completely off-guard.",
      "They are split between defending the front gates and responding to your flank attack.",
      "Chaos erupts in Lanka's streets."
    ],
    choices: [{ label: "Exploit the chaos", next: 116 }]
  },
  110: {
    title: "Desperate Flight",
    text: [
      "You and {{wifeName}} fight through the guards, your sword never faltering.",
      "Hanuman clears obstacles before you with explosive power.",
      "The shore appears in the distance—freedom is within sight."
    ],
    choices: [{ label: "Reach the shore", next: 117 }]
  },
  111: {
    title: "Hidden in the City",
    text: [
      "You hide with {{wifeName}} in an abandoned building as pursuit passes by.",
      "Together in the darkness, {{wifeName}} whispers her thanks.",
      "Once the guards search elsewhere, you slip out toward the shore."
    ],
    choices: [{ label: "Carefully reach the shore", next: 117 }]
  },
  112: {
    title: "{{wifeName}} Reunited",
    text: [
      "You embrace {{wifeName}} for the first time since her abduction.",
      "Tears flow as joy and relief overwhelm you both.",
      "But the battle is not over—escape from Lanka remains your greatest challenge."
    ],
    choices: [{ label: "Escape Lanka with {{wifeName}}", next: 118 }]
  },
  113: {
    title: "The Weak Point Strike",
    text: [
      "You identify Ravana's vulnerability and strike with precision.",
      "Your arrow finds its mark, piercing the heart beneath the invincible hide.",
      "The ten-headed demon lord falls, and his reign of terror ends."
    ],
    choices: [{ label: "Victory Achieved", next: 119 }]
  },
  114: {
    title: "Head-On Combat",
    text: [
      "You and Ravana clash directly, weapon against magic.",
      "The battle is fierce and long, testing every ounce of your strength and skill.",
      "Finally, triumph comes as your blade strikes true."
    ],
    choices: [{ label: "Victory Achieved", next: 119 }]
  },
  115: {
    title: "Reach the Palace Core",
    text: [
      "You breach the palace's inner sanctum.",
      "Ravana waits, and the final confrontation looms before you."
    ],
    choices: [{ label: "Confront Ravana", next: 106 }]
  },
  116: {
    title: "Capitalize on Confusion",
    text: [
      "With Lanka in chaos, your forces press forward with overwhelming force.",
      "Ravana is forced to retreat deeper into his palace to regroup.",
      "This is {{name}}'s moment—strike while the advantage is yours."
    ],
    choices: [{ label: "Storm the palace", next: 115 }]
  },
  117: {
    title: "The Escape",
    text: [
      "You and {{wifeName}} reach the shore where Hanuman and your forces wait.",
      "The ocean provides passage once more as you leave Lanka behind.",
      "{{wifeName}} is safe, and together you begin the journey home."
    ],
    choices: [{ label: "The Return Journey", next: 120 }]
  },
  118: {
    title: "Flee Lanka Together",
    text: [
      "With {{wifeName}} hand-in-hand, you navigate through the chaos of battle.",
      "Your forces cover your retreat, and Hanuman ensures the path ahead is clear.",
      "You escape Lanka as its defenders fall behind."
    ],
    choices: [{ label: "The Return Journey", next: 120 }]
  },
  119: {
    title: "Lanka Conquered",
    text: [
      "{{name}}, with Ravana fallen, Lanka surrenders without further resistance.",
      "Your forces secure the city, and {{wifeName}} is found safe among the palace treasures.",
      "The nightmare is over; the triumph is complete."
    ],
    choices: [{ label: "The Return Journey", next: 120 }]
  },
  120: {
    title: "Homeward Bound",
    text: [
      "{{name}}, you and {{wifeName}}, along with {{siblingOneName}}, Sugriva, and Hanuman, begin your journey home.",
      "The exile is ending, and victory has been earned through trials and courage.",
      "Ayodhya awaits, and your rightful place as king calls."
    ],
    choices: [
      { label: "Return to Ayodhya in triumph", next: 121 },
      { label: "The quest is complete", restart: true }
    ]
  },
  121: {
    title: "The Triumphal Return",
    text: [
      "{{name}}, you cross the threshold of Ayodhya once more.",
      "{{siblingTwoName}} removes your sandals from the throne and presents them to you with joy.",
      "The kingdom erupts in celebration as their true king returns, no longer in exile.",
      "{{wifeName}} walks beside you as your queen, {{siblingOneName}} as your honored general, and all of Ayodhya rejoices.",
      "{{name}}, this is your victory. This is your legend."
    ],
    choices: [{ label: "Restart", restart: true }]
  }
};


function addInventoryItem(item) {
  if (!inventory.includes(item)) {
    inventory.push(item);
  }
}

function removeInventoryItem(item) {
  var index = inventory.indexOf(item);
  if (index > -1) {
    inventory.splice(index, 1);
  }
}

function hasInventoryItem(item) {
  return inventory.includes(item);
}

function modifyStat(stat, amount) {
  if (characterStats[stat] !== undefined) {
    characterStats[stat] = Math.max(0, Math.min(100, characterStats[stat] + amount));
  }
}

function modifyRelationship(character, amount) {
  if (relationships[character] !== undefined) {
    relationships[character] = Math.max(0, Math.min(100, relationships[character] + amount));
  }
}

function addQuestObjective(questName, objective) {
  var quest = questLog.find(function(q) { return q.name === questName; });
  if (!quest) {
    quest = { name: questName, status: "active", objectives: [] };
    questLog.push(quest);
  }
  if (!quest.objectives.includes(objective)) {
    quest.objectives.push(objective);
  }
}

function completeQuestObjective(questName, objective) {
  var quest = questLog.find(function(q) { return q.name === questName; });
  if (quest) {
    var index = quest.objectives.indexOf(objective);
    if (index > -1) {
      quest.objectives.splice(index, 1);
    }
    if (quest.objectives.length === 0) {
      quest.status = "complete";
    }
  }
}

function addAchievement(achievement) {
  if (!achievements.includes(achievement)) {
    achievements.push(achievement);
  }
}

function randomPercent() {
  return Math.floor(Math.random() * 100);
}

function clearStoryCard() {
  var storyCard = document.getElementById("storyCard");
  if (storyCard) {
    storyCard.innerHTML = "<div id='choices'></div>";
  }
}

function restart() {
  currentScene = 0;
  playerName = "";
  fatherName = "";
  motherName = "";
  wifeName = "";
  siblingOneName = "";
  siblingTwoName = "";
  siblingThreeName = "";
  siblingOneGender = "male";
  siblingTwoGender = "male";
  siblingThreeGender = "male";
  secondMotherName = "";
  broughtLakshmana = false;
  wentAlone = false;
  historyStack = [];
  clearStoryCard();
  updateUndoButton();
}

function exportSaveFile() {
  var saveData = {
    currentScene: currentScene,
    playerName: playerName,
    fatherName: fatherName,
    motherName: motherName,
    wifeName: wifeName,
    siblingOneName: siblingOneName,
    siblingTwoName: siblingTwoName,
    siblingThreeName: siblingThreeName,
    siblingOneGender: siblingOneGender,
    siblingTwoGender: siblingTwoGender,
    siblingThreeGender: siblingThreeGender,
    secondMotherName: secondMotherName,
    broughtLakshmana: broughtLakshmana,
    wentAlone: wentAlone,
    rpgState: rpgState,
    historyStack: historyStack,
    dayNightMode: dayNightMode,
    timestamp: new Date().toISOString()
  };

  var dataStr = JSON.stringify(saveData, null, 2);
  var dataBlob = new Blob([dataStr], { type: "application/json" });
  var url = URL.createObjectURL(dataBlob);
  var link = document.createElement("a");
  link.href = url;
  link.download = "ramayana_savefile_" + new Date().toISOString().split("T")[0] + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function importSaveFile(event) {
  var file = event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var saveData = JSON.parse(e.target.result);
      
      currentScene = saveData.currentScene || 0;
      playerName = saveData.playerName || "";
      fatherName = saveData.fatherName || "";
      motherName = saveData.motherName || "";
      wifeName = saveData.wifeName || "";
      siblingOneName = saveData.siblingOneName || "";
      siblingTwoName = saveData.siblingTwoName || "";
      siblingThreeName = saveData.siblingThreeName || "";
      siblingOneGender = saveData.siblingOneGender || "male";
      siblingTwoGender = saveData.siblingTwoGender || "male";
      siblingThreeGender = saveData.siblingThreeGender || "male";
      secondMotherName = saveData.secondMotherName || "";
      broughtLakshmana = saveData.broughtLakshmana || false;
      wentAlone = saveData.wentAlone || false;
      if (saveData.rpgState) { rpgState = saveData.rpgState; }
      historyStack = saveData.historyStack || [];
      dayNightMode = saveData.dayNightMode || "day";

      updateDayNightButton();
      showScene();
      updateUndoButton();
      alert("Game loaded successfully!");
    } catch (error) {
      alert("Error loading save file: " + error.message);
    }
  };
  reader.readAsText(file);
}

function triggerFileUpload() {
  var fileInput = document.getElementById("saveFileInput");
  if (fileInput) {
    fileInput.click();
  }
}

function toggleDayNight() {
  dayNightMode = dayNightMode === "day" ? "night" : "day";
  document.body.classList.toggle("night-mode");
  updateDayNightButton();
  localStorage.setItem("dayNightMode", dayNightMode);
}

function updateDayNightButton() {
  var btn = document.getElementById("dayNightToggle");
  if (btn) {
    btn.textContent = dayNightMode === "day" ? "🌙 Night" : "☀ Day";
  }
}

function initializeDayNight() {
  var savedMode = localStorage.getItem("dayNightMode");
  if (savedMode) {
    dayNightMode = savedMode;
    if (dayNightMode === "night") {
      document.body.classList.add("night-mode");
    }
  }
  updateDayNightButton();
}

function getCanonNames() {
  return {
    playerName: "Rama",
    fatherName: "Dasharatha",
    motherName: "Kausalya",
    wifeName: "Sita",
    siblingOneName: "Lakshmana",
    siblingTwoName: "Bharata",
    siblingThreeName: "Shatrughna",
    siblingOneGender: "male",
    siblingTwoGender: "male",
    siblingThreeGender: "male",
    secondMotherName: "Kaikeyi"
  };
}

// Family setup feature intentionally disabled.
// function readCustomNamesFromInputs() {}

function assignNames(nameSet) {
  playerName = nameSet.playerName;
  fatherName = nameSet.fatherName;
  motherName = nameSet.motherName;
  wifeName = nameSet.wifeName;
  siblingOneName = nameSet.siblingOneName;
  siblingTwoName = nameSet.siblingTwoName;
  siblingThreeName = nameSet.siblingThreeName;
  siblingOneGender = nameSet.siblingOneGender;
  siblingTwoGender = nameSet.siblingTwoGender;
  siblingThreeGender = nameSet.siblingThreeGender;
  secondMotherName = nameSet.secondMotherName;
}

// Family setup feature intentionally disabled.
// function applyFamilySetupState() {}
// function toggleFamilySetup() {}

function startAdventure() {
  var baseNameInput = document.getElementById("playerName");
  var backgroundInput = document.getElementById("playerBackground");
  var basePlayerName = baseNameInput && baseNameInput.value.trim() ? baseNameInput.value.trim() : "Rama";
  var canonNames = getCanonNames();
  canonNames.playerName = basePlayerName;
  assignNames(canonNames);
  rpgState.profile.background = backgroundInput && backgroundInput.value ? backgroundInput.value : "traveler";
  if (rpgState.profile.background === "scholar" || rpgState.profile.background === "scribe") { adjustRpg("stats.knowledge", 5); }
  if (rpgState.profile.background === "forest dweller") { adjustRpg("stats.perception", 4); adjustRpg("stats.endurance", 3); }
  if (rpgState.profile.background === "trader") { adjustRpg("stats.persuasion", 4); adjustRpg("reputations.merchants", 4); }
  if (rpgState.profile.background === "musician") { adjustRpg("stats.devotion", 3); rpgState.skills.performance.music += 1; }

  historyStack = [];
  currentScene = 1;
  var soundtrack = document.getElementById("backgroundMusic");
  if (soundtrack) {
    soundtrack.volume = 0.5;
    soundtrack.muted = false;
    if (window.sessionStorage) {
      window.sessionStorage.setItem("ramayanaMusicState", JSON.stringify({
        currentTime: soundtrack.currentTime || 0,
        volume: 0.5,
        muted: false,
        paused: soundtrack.paused
      }));
    }
    var playAttempt = soundtrack.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(function () {});
    }
  }
  if (window.localStorage) {
    window.localStorage.setItem("ramayanaMusicVolume", "50");
  }
  showScene();
  var storyCard = document.getElementById("storyCard");
  if (storyCard && typeof storyCard.scrollIntoView === "function") {
    storyCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  updateUndoButton();
}

function resolveSpecialNext(next) {
  if (next === -1) {
    if (randomPercent() < 65) {
      return wentAlone ? 52 : 14;
    }
    return 18;
  }

  if (next === -2) {
    return randomPercent() < 50 ? 29 : 39;
  }

  if (next === -3) {
    return randomPercent() < 15 ? 33 : 34;
  }

  if (next === -4) {
    return wentAlone ? 8 : 7;
  }

  return next;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getCharacterNames() {
  var names = [
    playerName || "Rama",
    fatherName || "Dasharatha",
    motherName || "Kausalya",
    wifeName || "Sita",
    siblingOneName || "Lakshmana",
    siblingTwoName || "Bharata",
    siblingThreeName || "Shatrughna",
    secondMotherName || "Kaikeyi",
    "Ravana",
    "Hanuman",
    "Sugriva",
    "Vali",
    "Jatayu",
    "Surphanaka",
    "Maricha",
    "Vibhishana",
    "Kumbhakarna",
    "Mandodari",
    "Manthara",
    "Sumitra",
    "Lava",
    "Kush",
    "Angada",
    "Sampati",
    "Jambaavan"
  ];

  return names
    .filter(function (name) { return typeof name === "string" && name.trim(); })
    .filter(function (name, index, list) { return list.indexOf(name) === index; })
    .sort(function (a, b) { return b.length - a.length; });
}

function formatStoryHtml(text) {
  var output = escapeHtml(interpolatePlayerName(text));
  getCharacterNames().forEach(function (name) {
    var escapedName = escapeHtml(name);
    var pattern = new RegExp(escapeRegExp(escapedName), "g");
    output = output.replace(pattern, "<span class='character-name'>" + escapedName + "</span>");
  });
  return output;
}

function interpolatePlayerName(text) {
  var siblingOneSubject = siblingOneGender === "female" ? "she" : "he";
  var siblingOneObject = siblingOneGender === "female" ? "her" : "him";
  var siblingOnePossessive = siblingOneGender === "female" ? "her" : "his";
  var siblingTwoSubject = siblingTwoGender === "female" ? "she" : "he";
  var siblingTwoObject = siblingTwoGender === "female" ? "her" : "him";
  var siblingTwoPossessive = siblingTwoGender === "female" ? "her" : "his";
  var siblingThreeSubject = siblingThreeGender === "female" ? "she" : "he";
  var siblingThreeObject = siblingThreeGender === "female" ? "her" : "him";
  var siblingThreePossessive = siblingThreeGender === "female" ? "her" : "his";
  var replacements = {
    "{{name}}": playerName || "Rama",
    "{{fatherName}}": fatherName || "Dasharatha",
    "{{motherName}}": motherName || "Kausalya",
    "{{wifeName}}": wifeName || "Sita",
    "{{siblingOneName}}": siblingOneName || "Lakshmana",
    "{{siblingTwoName}}": siblingTwoName || "Bharata",
    "{{siblingThreeName}}": siblingThreeName || "Shatrughna",
    "{{secondMotherName}}": secondMotherName || "Kaikeyi",
    "{{siblingOneSubject}}": siblingOneSubject,
    "{{siblingOneObject}}": siblingOneObject,
    "{{siblingOnePossessive}}": siblingOnePossessive,
    "{{siblingTwoSubject}}": siblingTwoSubject,
    "{{siblingTwoObject}}": siblingTwoObject,
    "{{siblingTwoPossessive}}": siblingTwoPossessive,
    "{{siblingThreeSubject}}": siblingThreeSubject,
    "{{siblingThreeObject}}": siblingThreeObject,
    "{{siblingThreePossessive}}": siblingThreePossessive
  };

  var output = text;
  Object.keys(replacements).forEach(function (key) {
    output = output.replaceAll(key, replacements[key]);
  });
  return output;
}

function showScene() {
  var storyCard = document.getElementById("storyCard");
  if (!storyCard || !scenes[currentScene]) {
    return;
  }

  var scene = scenes[currentScene];
  var sceneTitle = formatStoryHtml(scene.title);
  var html = "<div id='storyCardToolbar'><button id='undoButton' class='art-button undo-art' type='button' onclick='undoLastChoice()' aria-label='Undo' data-tooltip='undo'>Undo</button><button type='button' onclick='openTimelineModal()' aria-label='Open my storyline'>My Storyline</button></div>";

  if (currentScene === 1) {
    html += "<h1>" + sceneTitle + "</h1>";
  } else {
    html += "<h2>" + sceneTitle + "</h2>";
  }

  scene.text.forEach(function (paragraph) {
    html += "<p>" + formatStoryHtml(paragraph) + "</p>";
  });

  html += buildRpgDashboard();

  if (Array.isArray(scene.dialogue)) {
    html += "<div class='scene-dialogue' aria-label='Scene dialogue'>";
    scene.dialogue.forEach(function (entry) {
      html += "<p><strong>" + formatStoryHtml(entry.speaker) + ":</strong> " + formatStoryHtml(entry.line) + "</p>";
    });
    html += "</div>";
  }

  html += "<div id='choices'>";
  scene.choices.forEach(function (choice, index) {
    if (choice.restart) {
      html += "<button type='button' onclick='restart()' aria-label='Restart'>" + escapeHtml(choice.label) + "</button>";
    } else {
      html += "<button type='button' onclick='makeChoice(" + index + ")'>" + formatStoryHtml(choice.label) + "</button>";
    }
  });
  html += "</div>";

  storyCard.innerHTML = html;
  updateUndoButton();
}

function makeChoice(choiceIndex) {
  var scene = scenes[currentScene];
  if (!scene || !scene.choices[choiceIndex]) {
    return;
  }

  var choice = scene.choices[choiceIndex];
  if (typeof choice.onPick === "function") {
    choice.onPick();
  }
  rememberJourney("Scene " + currentScene + ": " + interpolatePlayerName(choice.label));
  if (choice.label.toLowerCase().indexOf("accept") !== -1) { adjustRpg("stats.dharma", 2); }
  if (choice.label.toLowerCase().indexOf("negotiate") !== -1) { adjustRpg("stats.persuasion", 3); }
  if (choice.label.toLowerCase().indexOf("scout") !== -1 || choice.label.toLowerCase().indexOf("search") !== -1) { adjustRpg("stats.perception", 2); }

  historyStack.push(currentScene);
  currentScene = resolveSpecialNext(choice.next);
  showScene();
}

function undoLastChoice() {
  if (historyStack.length === 0) {
    return;
  }

  currentScene = historyStack.pop();
  showScene();
}

function updateUndoButton() {
  var undoButton = document.getElementById("undoButton");
  if (!undoButton) {
    return;
  }

  undoButton.disabled = historyStack.length === 0;
}

function setupNavbar() {
  var toggle = document.getElementById("navbarToggle");
  var nav = document.getElementById("topNavbar");
  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", function (event) {
    if (window.matchMedia("(max-width: 768px)").matches && nav.classList.contains("nav-open") && !nav.contains(event.target)) {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupVolumeSlider() {
  var audio = document.getElementById("backgroundMusic");
  if (!audio) {
    return;
  }

  var state = null;
  if (window.sessionStorage) {
    try {
      state = JSON.parse(window.sessionStorage.getItem("ramayanaMusicState") || "null");
    } catch (error) {
      state = null;
    }
  }

  var storedVolume = window.localStorage ? Number(window.localStorage.getItem("ramayanaMusicVolume")) : NaN;
  var fallbackVolume = Number.isFinite(storedVolume) ? Math.max(0, Math.min(1, storedVolume / 100)) : 0.65;
  var restoredVolume = state && Number.isFinite(state.volume) ? Math.max(0, Math.min(1, state.volume)) : fallbackVolume;
  audio.volume = restoredVolume;
  audio.muted = !!(state && state.muted);

  if (state && Number.isFinite(state.currentTime)) {
    audio.addEventListener("loadedmetadata", function onLoadedMetadata() {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.currentTime = Math.max(0, state.currentTime);
    });
  }

  if (!state || !state.paused) {
    var autoplayAttempt = audio.play();
    if (autoplayAttempt && typeof autoplayAttempt.catch === "function") {
      autoplayAttempt.catch(function () {});
    }
  }

  function persistMusicState() {
    if (window.localStorage) {
      window.localStorage.setItem("ramayanaMusicVolume", String(Math.round(audio.volume * 100)));
    }
    if (window.sessionStorage) {
      window.sessionStorage.setItem("ramayanaMusicState", JSON.stringify({
        currentTime: audio.currentTime || 0,
        volume: audio.volume,
        muted: audio.muted,
        paused: audio.paused
      }));
    }
  }

  audio.addEventListener("timeupdate", persistMusicState);
  audio.addEventListener("volumechange", persistMusicState);
  audio.addEventListener("pause", persistMusicState);
  audio.addEventListener("play", persistMusicState);
  window.addEventListener("pagehide", persistMusicState);
}

function renderSimpleTimelineList() {
  var list = document.getElementById("timelineList");
  if (!list) {
    return;
  }

  var html = "";
  historyStack.forEach(function (sceneId) {
    if (!scenes[sceneId]) {
      return;
    }
    html += "<li><strong>" + formatStoryHtml(scenes[sceneId].title) + "</strong><p class='timeline-scene-description'>" + formatStoryHtml(scenes[sceneId].text.join(" ")) + "</p></li>";
  });

  if (scenes[currentScene]) {
    html += "<li class='timeline-current-scene'><strong>" + formatStoryHtml(scenes[currentScene].title) + " (Current)</strong><p class='timeline-scene-description'>" + formatStoryHtml(scenes[currentScene].text.join(" ")) + "</p></li>";
  }

  if (!html) {
    html = "<li><strong>Start your quest to build the timeline.</strong></li>";
  }

  list.innerHTML = html;
}

function openTimelineModal() {
  var modal = document.getElementById("timelineModal");
  if (!modal) {
    return;
  }
  renderSimpleTimelineList();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function handleTimelineModalBackdrop(event) {
  if (event && event.target && event.target.id === "timelineModal") {
    closeTimelineModal();
  }
}

function closeTimelineModal() {
  var modal = document.getElementById("timelineModal");
  if (!modal) {
    return;
  }
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
function adjustTimelineZoom() {}
function revealTimelinePossibilities() {}
function handleInventoryModalBackdrop() {}
function closeInventoryModal() {}

document.addEventListener("DOMContentLoaded", function () {
  setupNavbar();
  setupVolumeSlider();
  initializeDayNight();
  if (typeof applyResolutionTierStyling === "function") {
    applyResolutionTierStyling();
    window.addEventListener("resize", applyResolutionTierStyling);
  }
});
