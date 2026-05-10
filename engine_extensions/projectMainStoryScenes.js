export const PROJECT_MAIN_STORY_SCENES = {
  "1": {
    "title": "The Ramayana Begins",
    "text": [
      "Welcome, {{name}}!",
      "Tonight, destiny turns. Your chosen path will reshape the epic from your own perspective."
    ],
    "choices": [
      {
        "label": "Enter your hero's perspective",
        "next": -10
      }
    ]
  },
  "3": {
    "title": "You choose to argue back.",
    "text": [
      "{{name}}, your words shake the royal court, and {{fatherName}} briefly gathers strength to challenge {{secondMotherName}}'s demand.",
      "Even so, the king remains bound by his oath, and you, {{name}}, realize exile is unavoidable if honor is to survive."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 4
      }
    ]
  },
  "4": {
    "title": "You choose to accept the exile.",
    "text": [
      "{{name}}, you lay aside royal ornaments and prepare for forest life with calm resolve.",
      "{{siblingOneName}} swears loyalty and {{wifeName}} refuses to stay behind, telling you that your path, {{name}}, is now their path as well."
    ],
    "choices": [
      {
        "label": "Argue back again",
        "next": 69
      },
      {
        "label": "Continue",
        "next": 70
      }
    ]
  },
  "5": {
    "title": "You choose to go alone.",
    "text": [
      "{{name}}, you leave Ayodhya alone, carrying only a bow, memory, and duty.",
      "Each step into the forest deepens the silence around you, but your vow remains unbroken."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 66
      }
    ]
  },
  "6": {
    "title": "You choose to go with them.",
    "text": [
      "{{name}}, with {{wifeName}} and {{siblingOneName}} at your side, exile becomes a shared pilgrimage instead of a lonely punishment.",
      "Together you cross rivers, build shelter, and learn the rhythms of forest life."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 66
      }
    ]
  },
  "7": {
    "title": "Surphanaka's Encounter",
    "text": [
      "In the dappled forest light, Surphanaka appears and circles your camp, studying you, {{name}}, with dangerous fascination.",
      "When rejected, she turns her anger toward {{wifeName}}. {{name}}, how will you answer this threat?"
    ],
    "dialogue": [
      {
        "speaker": "Surphanaka",
        "line": "\"Hand over {{wifeName}}, and I may spare your camp.\""
      },
      {
        "speaker": "{{name}}",
        "line": "\"Stand down. You will not threaten my family.\""
      }
    ],
    "choices": [
      {
        "label": "Fight Surphanaka",
        "next": 9
      },
      {
        "label": "Protect {{wifeName}}",
        "next": 10
      },
      {
        "label": "Negotiate",
        "next": 11
      },
      {
        "label": "Accept the marriage",
        "next": 12
      }
    ]
  },
  "8": {
    "title": "Surphanaka's Encounter",
    "text": [
      "Traveling alone, you, {{name}}, are approached by Surphanaka, who proposes an alliance through marriage.",
      "Her smile hides a storm. Will you accept or reject?"
    ],
    "choices": [
      {
        "label": "Accept",
        "next": 12
      },
      {
        "label": "Reject",
        "next": 13
      }
    ]
  },
  "9": {
    "title": "Fight Surphanaka",
    "text": [
      "{{name}}, steel meets claw as the forest erupts in a swift and brutal clash.",
      "Your fate turns on one fierce exchange."
    ],
    "choices": [
      {
        "label": "Fight",
        "next": -1
      }
    ]
  },
  "10": {
    "title": "Protect {{wifeName}}",
    "text": [
      "{{name}}, you and {{siblingOneName}} form a shield around {{wifeName}} and drive Surphanaka back.",
      "She retreats in fury, promising revenge."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 19
      }
    ]
  },
  "11": {
    "title": "Negotiate with Surphanaka",
    "text": [
      "{{name}}, you lower your weapon and try words before war, appealing to reason over rage.",
      "Surphanaka listens, but her pride burns hotter than your diplomacy."
    ],
    "choices": [
      {
        "label": "Try again",
        "next": 15
      },
      {
        "label": "Prepare to fight",
        "next": 9
      }
    ]
  },
  "12": {
    "title": "Accept Surphanaka's Proposal",
    "text": [
      "{{name}}, you accept her proposal to buy time and insight, stepping into a dangerous game.",
      "Soon you are escorted to Lanka to stand before Ravana himself."
    ],
    "choices": [
      {
        "label": "Meet Ravana",
        "next": 16
      }
    ]
  },
  "13": {
    "title": "Reject Surphanaka's Proposal",
    "text": [
      "{{name}}, your refusal lands like a blade, and Surphanaka answers with open fury.",
      "The forest goes still as battle becomes inevitable."
    ],
    "choices": [
      {
        "label": "Fight Surphanaka",
        "next": 9
      }
    ]
  },
  "14": {
    "title": "Victory",
    "text": [
      "{{name}}, you survive the confrontation and push forward, though the warning signs of larger conflict are now impossible to ignore."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 19
      }
    ]
  },
  "15": {
    "title": "Negotiation Fails",
    "text": [
      "{{name}}, your final effort to avoid bloodshed collapses.",
      "Words end, and the forest prepares for violence."
    ],
    "choices": [
      {
        "label": "Fight Surphanaka",
        "next": 9
      }
    ]
  },
  "16": {
    "title": "Meeting Ravana",
    "text": [
      "Ravana greets you with charm and menace, offering you, {{name}}, power, luxury, and a throne to abandon your vow."
    ],
    "choices": [
      {
        "label": "Claim the throne",
        "next": 17
      }
    ]
  },
  "17": {
    "title": "Evil King Ending",
    "text": [
      "{{name}}, you accept Ravana's bargain and gain a crown at the price of righteousness.",
      "Your legend survives, but not as a hero's."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "18": {
    "title": "Game Over",
    "text": [
      "{{name}}, you fought bravely, but destiny closes this path.",
      "Another choice may yet restore your story."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "19": {
    "title": "The Golden Deer",
    "text": [
      "A radiant golden deer appears near the hut, moving like moonlight through leaves.",
      "{{wifeName}} asks you, {{name}}, to bring it back, unaware that illusion has already entered your home."
    ],
    "dialogue": [
      {
        "speaker": "{{wifeName}}",
        "line": "\"That deer is beautiful, {{name}}. Please catch it for us.\""
      },
      {
        "speaker": "{{name}}",
        "line": "\"Stay alert while I decide. Something feels wrong.\""
      }
    ],
    "choices": [
      {
        "label": "Chase the deer",
        "next": 20
      },
      {
        "label": "Ignore it",
        "next": 21
      }
    ]
  },
  "20": {
    "title": "Bring {{siblingOneName}}?",
    "text": [
      "{{siblingOneName}} offers to accompany you, {{name}}, worried by the deer's unnatural beauty.",
      "Do you bring {{siblingOneObject}} or leave {{siblingOneObject}} to guard {{wifeName}}?"
    ],
    "choices": [
      {
        "label": "Yes, bring {{siblingOneName}}",
        "next": 22
      },
      {
        "label": "No, leave {{siblingOneObject}} with {{wifeName}}",
        "next": 23
      }
    ]
  },
  "21": {
    "title": "You Ignore the Deer",
    "text": [
      "{{name}}, you distrust the illusion and refuse the chase.",
      "For now, the danger withdraws and your family remains together."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "22": {
    "title": "Find the Deer",
    "text": [
      "{{name}}, you and {{siblingOneName}} track the deer deep into shadowed groves where every glimmer feels staged."
    ],
    "choices": [
      {
        "label": "Keep following it",
        "next": 24
      }
    ]
  },
  "23": {
    "title": "Find the Deer",
    "text": [
      "{{name}}, you pursue the deer alone, trusting speed over caution."
    ],
    "choices": [
      {
        "label": "Keep following it",
        "next": 24
      }
    ]
  },
  "24": {
    "title": "Shoot the Deer",
    "text": [
      "Your arrow lands true, and the golden illusion tears away to reveal Maricha.",
      "{{name}}, you now understand this chase was a trap from the beginning."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 25
      }
    ]
  },
  "25": {
    "title": "Maricha's Last Cry",
    "text": [
      "With his final breath, Maricha mimics your voice and cries for help.",
      "{{name}}, the sound races toward your hut, meant to break trust at the worst possible moment."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 26
      }
    ]
  },
  "26": {
    "title": "Ravana Sees His Chance",
    "text": [
      "As you race back, Ravana takes disguise and moves toward your dwelling.",
      "By the time danger peaks, only fate and vigilance stand between your family and calamity."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 29
      }
    ]
  },
  "27": {
    "title": "{{siblingOneName}} Draws the Line",
    "text": [
      "{{siblingOneName}} leaves a protective warning before stepping away, torn between obedience and unease.",
      "He prays that this line will hold until you return, {{name}}."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 28
      }
    ]
  },
  "28": {
    "title": "Ravana's Trick",
    "text": [
      "Disguised as a holy seeker, Ravana asks for alms and manipulates sacred duty.",
      "{{wifeName}} hesitates between caution and compassion."
    ],
    "choices": [
      {
        "label": "See what happens",
        "next": -2
      }
    ]
  },
  "29": {
    "title": "The Abduction of {{wifeName}}",
    "text": [
      "Ravana drops his disguise, reveals his terrifying form, and seizes {{wifeName}}.",
      "By the time you, {{name}}, return, the forest carries only echoes and broken signs of struggle."
    ],
    "dialogue": [
      {
        "speaker": "{{wifeName}}",
        "line": "\"{{name}}! {{siblingOneName}}! Help me!\""
      },
      {
        "speaker": "Ravana",
        "line": "\"Cry out if you must. Lanka will still claim you.\""
      }
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 30
      }
    ]
  },
  "30": {
    "title": "Jatayu Sees Ravana",
    "text": [
      "From the sky, Jatayu witnesses the abduction and recognizes your family in peril.",
      "The old warrior-bird must decide in an instant whether to intervene."
    ],
    "choices": [
      {
        "label": "Do nothing",
        "next": 31
      },
      {
        "label": "Try to rescue {{wifeName}}",
        "next": 32
      }
    ]
  },
  "31": {
    "title": "{{wifeName}} is Taken",
    "text": [
      "Ravana escapes with {{wifeName}}, and your grief becomes purpose.",
      "{{name}}, the rescue mission begins."
    ],
    "choices": [
      {
        "label": "Keep searching",
        "next": 65
      }
    ]
  },
  "32": {
    "title": "Jatayu's Rescue Attempt",
    "text": [
      "Jatayu rises against Ravana in a desperate sky battle, wings beating against impossible odds."
    ],
    "choices": [
      {
        "label": "See what happens",
        "next": -3
      }
    ]
  },
  "33": {
    "title": "Jatayu Rescues {{wifeName}}",
    "text": [
      "Against all expectation, Jatayu tears {{wifeName}} free and Ravana crashes nearby.",
      "{{name}}, you have a final chance to finish this now."
    ],
    "choices": [
      {
        "label": "Go after Ravana",
        "next": 36
      }
    ]
  },
  "34": {
    "title": "Jatayu Falls",
    "text": [
      "Jatayu is struck down after a heroic stand, and {{wifeName}} is still carried away.",
      "His sacrifice leaves you, {{name}}, with grief and a vital clue."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 37
      }
    ]
  },
  "36": {
    "title": "Fight Ravana in the Forest",
    "text": [
      "{{name}}, you confront Ravana beside his shattered chariot in a duel of fury and conviction."
    ],
    "choices": [
      {
        "label": "Fight Ravana",
        "next": 38
      }
    ]
  },
  "37": {
    "title": "{{wifeName}} is Taken",
    "text": [
      "{{name}}, you and {{siblingOneName}} begin searching immediately, following broken branches, chariot marks, and fading cries."
    ],
    "choices": [
      {
        "label": "Keep searching",
        "next": 65
      }
    ]
  },
  "38": {
    "title": "Forest Duel Ending",
    "text": [
      "{{name}}, you win a brutal forest duel and protect {{wifeName}} before Ravana can flee.",
      "This path ends in sudden victory."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "39": {
    "title": "{{siblingOneName}} Saves {{wifeName}}",
    "text": [
      "{{siblingOneName}}'s discipline holds; Ravana retreats and {{wifeName}} remains safe.",
      "{{name}}, your household survives this test."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "40": {
    "title": "Meeting Sugriva",
    "text": [
      "While searching for {{wifeName}}, you, {{name}}, meet Sugriva, an exiled vanara prince seeking justice against Vali."
    ],
    "dialogue": [
      {
        "speaker": "Sugriva",
        "line": "\"Help me reclaim my honor, and I will help you find {{wifeName}}.\""
      }
    ],
    "choices": [
      {
        "label": "Hear Sugriva's request",
        "next": 41
      }
    ]
  },
  "41": {
    "title": "Sugriva's Plea",
    "text": [
      "Sugriva recounts betrayal and exile, asking you, {{name}}, to help him reclaim honor and kingdom."
    ],
    "choices": [
      {
        "label": "Consider his plan",
        "next": 42
      }
    ]
  },
  "42": {
    "title": "Your Exile Vow",
    "text": [
      "Bound by your forest vow, you refuse to enter the city and instead design an ambush beyond its walls."
    ],
    "choices": [
      {
        "label": "Set the trap",
        "next": 43
      }
    ]
  },
  "43": {
    "title": "Sugriva Challenges Vali",
    "text": [
      "As Sugriva and Vali clash, you, {{name}}, must identify the critical truth before releasing your arrow."
    ],
    "choices": [
      {
        "label": "Sugriva's wife",
        "next": 44
      },
      {
        "label": "Sugriva's bow",
        "next": 45
      },
      {
        "label": "Sugriva's horse",
        "next": 46
      }
    ]
  },
  "44": {
    "title": "Vali Falls",
    "text": [
      "Your arrow strikes true, Vali falls, and Sugriva's exile ends.",
      "In gratitude, he commits his forces to your cause, {{name}}."
    ],
    "choices": [
      {
        "label": "Meet Sugriva's ally",
        "next": 47
      }
    ]
  },
  "45": {
    "title": "You Miss the Moment",
    "text": [
      "{{name}}, hesitation breaks the plan and Vali escapes the trap."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "46": {
    "title": "You Miss the Moment",
    "text": [
      "Your call is wrong, and Sugriva retreats wounded.",
      "{{name}}, the alliance collapses on this path."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "47": {
    "title": "Meeting Hanuman",
    "text": [
      "Hanuman bows and pledges unwavering service, recognizing your purpose, {{name}}, as righteous and urgent.",
      "Before marching, he invites you to a training ground challenge to sharpen your focus."
    ],
    "choices": [
      {
        "label": "Go to Training Ground",
        "next": 48
      }
    ]
  },
  "48": {
    "title": "Training Ground Trivia",
    "text": [
      "At a clearing marked with practice dummies and banner poles, Hanuman runs a quick readiness drill for you, {{name}}.",
      "Trivia Question: Who is known as the devoted sibling who accompanies you into exile?"
    ],
    "choices": [
      {
        "label": "{{siblingOneName}}",
        "next": 50
      },
      {
        "label": "{{siblingThreeName}}",
        "next": 51
      },
      {
        "label": "Vali",
        "next": 51
      }
    ]
  },
  "50": {
    "title": "Training Ground Result",
    "text": [
      "Correct, {{name}}. Hanuman smiles and says your memory is as sharp as your aim.",
      "Your allies leave the training ground with stronger morale."
    ],
    "choices": [
      {
        "label": "Proceed to War Council",
        "next": 54
      }
    ]
  },
  "51": {
    "title": "Training Ground Result",
    "text": [
      "Not quite, {{name}}. Hanuman reviews the key companions of your journey before the campaign continues.",
      "Even mistakes can prepare a leader for war."
    ],
    "choices": [
      {
        "label": "Proceed to War Council",
        "next": 54
      }
    ]
  },
  "52": {
    "title": "Peaceful Ending",
    "text": [
      "{{name}}, traveling alone, you survive Surphanaka's challenge and complete exile in rare peace.",
      "This quieter legend ends far from court and war."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "54": {
    "title": "War Council at Prasravana",
    "text": [
      "At sunset on Day 3, the vanara captains form a firelit ring around you. Maps of Lanka, tidal charts, and scouting notes are spread over stone.",
      "This is the first of many linked campaign scenes. Your doctrine now shapes combat readiness, relationships, and stat growth."
    ],
    "choices": [
      {
        "label": "Fortify logistics and shields",
        "next": 72,
        "effects": {
          "defense": 2,
          "endurance": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Intensive assault drills",
        "next": 72,
        "effects": {
          "strength": 2,
          "stamina": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Stealth + recon doctrine",
        "next": 72,
        "effects": {
          "agility": 2,
          "speed": 2
        },
        "timeAdvance": 1
      }
    ]
  },
  "65": {
    "title": "Searching for {{wifeName}}",
    "text": [
      "{{name}}, you search ravines, groves, and riverbanks for signs of {{wifeName}} until clues lead you toward new allies."
    ],
    "choices": [
      {
        "label": "Continue to Sugriva",
        "next": 40
      }
    ]
  },
  "66": {
    "title": "{{siblingTwoName}} at the Hut",
    "text": [
      "Soon after exile begins, {{siblingTwoName}} reaches your forest hut and pleads once more: return and rule Ayodhya, {{name}}.",
      "You honor him, renew your vow, and ask him to safeguard the kingdom until your exile ends before you continue deeper into the forest."
    ],
    "choices": [
      {
        "label": "Entrust him with your sandals",
        "next": 68
      },
      {
        "label": "Ask him to carry a message to Ayodhya",
        "next": 68
      }
    ]
  },
  "67": {
    "title": "Ayodhya Return Ending",
    "text": [
      "{{name}}, you return early and the epic turns into palace intrigue instead of a rescue quest."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "68": {
    "title": "The Sandals Promise",
    "text": [
      "{{siblingTwoName}} accepts your sandals as a symbol of rightful rule and departs in tears.",
      "{{name}}, once {{siblingTwoName}} departs, your exile journey resumes and the forest's first major threat approaches."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": -4
      }
    ]
  },
  "69": {
    "title": "{{secondMotherName}}'s Final Command",
    "text": [
      "{{name}}, your second refusal is treated as rebellion in open court.",
      "Under {{secondMotherName}}'s demand, the guards carry out a swift execution before {{fatherName}} can stop it."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "70": {
    "title": "A Family Plea",
    "text": [
      "{{motherName}}, {{siblingOneName}}, and {{siblingThreeName}} beg you not to go into exile.",
      "{{siblingTwoName}} stays silent; {{siblingTwoPossessive}} mother, {{secondMotherName}}, forbids {{siblingTwoObject}} from pleading against the exile order."
    ],
    "choices": [
      {
        "label": "Continue",
        "next": 71
      }
    ]
  },
  "71": {
    "title": "Who Goes With You?",
    "text": [
      "At Ayodhya's edge, you pause and decide whether to carry exile alone or share it with {{siblingOneName}} and {{wifeName}}."
    ],
    "choices": [
      {
        "label": "Go alone",
        "next": 5,
        "flag": [
          "wentAlone",
          true
        ]
      },
      {
        "label": "Go with them",
        "next": 6,
        "flag": [
          "wentAlone",
          false
        ]
      }
    ]
  },
  "72": {
    "title": "Night Raid Simulations",
    "text": [
      "Hanuman runs moonlit obstacle drills with your strike squads. Messengers report demon watchtowers rotating every half watch.",
      "Your command style inspires either loyalty, fear, or precision discipline."
    ],
    "choices": [
      {
        "label": "Lead from the front",
        "next": 73,
        "effects": {
          "strength": 1,
          "stamina": 2
        },
        "timeAdvance": 1
      },
      {
        "label": "Command from elevated strategy post",
        "next": 73,
        "effects": {
          "defense": 1,
          "endurance": 2
        },
        "timeAdvance": 1
      },
      {
        "label": "Split into specialist teams",
        "next": 73,
        "effects": {
          "agility": 2,
          "speed": 1
        },
        "timeAdvance": 1
      }
    ]
  },
  "73": {
    "title": "Dawn: Hanuman's Leap",
    "text": [
      "Day 4 dawn breaks crimson as Hanuman launches toward Lanka carrying your signet and command authority.",
      "Winds shift violently; he must choose between stealth, shock, or devotion-led diplomacy with hidden allies."
    ],
    "choices": [
      {
        "label": "Authorize total stealth",
        "next": 74,
        "effects": {
          "agility": 1,
          "speed": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Authorize visible provocation",
        "next": 74,
        "effects": {
          "strength": 1,
          "defense": -1
        },
        "timeAdvance": 1
      },
      {
        "label": "Authorize sacred oath approach",
        "next": 74,
        "effects": {
          "endurance": 2
        },
        "timeAdvance": 1
      }
    ]
  },
  "74": {
    "title": "Ashoka Vatika Contact",
    "text": [
      "In the deepest grove, Hanuman meets Sita and receives her jewel token and urgent timeline: Ravana demands surrender soon.",
      "Her words can either steady your heart or push you toward ruthless escalation."
    ],
    "choices": [
      {
        "label": "Preserve civilians at all costs",
        "next": 75,
        "effects": {
          "defense": 1,
          "endurance": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Prioritize rapid extraction",
        "next": 75,
        "effects": {
          "speed": 2
        },
        "timeAdvance": 1
      },
      {
        "label": "Prepare decisive invasion",
        "next": 75,
        "effects": {
          "strength": 2
        },
        "timeAdvance": 1
      }
    ]
  },
  "75": {
    "title": "Setu Engineering Day",
    "text": [
      "Day 5 becomes a colossal labor operation. Nala and Nila direct stone placement while tides threaten to shatter early spans.",
      "Random encounter: A collapsing section can be saved only by immediate intervention."
    ],
    "choices": [
      {
        "label": "Personally brace the collapse",
        "next": 76,
        "effects": {
          "strength": 2,
          "endurance": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Use disciplined shield wall",
        "next": 76,
        "effects": {
          "defense": 2,
          "stamina": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Rapid rope traversal rescue",
        "next": 76,
        "effects": {
          "agility": 2,
          "speed": 1
        },
        "timeAdvance": 1
      }
    ]
  },
  "76": {
    "title": "Night Before Landing",
    "text": [
      "Torches reflect over the completed bridge. Lakshmana and Vibhishana debate whether Indrajit will force an illusion war at first light.",
      "Companion affection and personality now influence battle callouts and support timing."
    ],
    "choices": [
      {
        "label": "Trust Vibhishana's intelligence",
        "next": 77,
        "effects": {
          "defense": 1,
          "endurance": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Trust Lakshmana's aggression",
        "next": 77,
        "effects": {
          "strength": 1,
          "stamina": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Blend both plans",
        "next": 77,
        "effects": {
          "agility": 1,
          "speed": 1
        },
        "timeAdvance": 1
      }
    ]
  },
  "77": {
    "title": "Boss Phase: Indrajit",
    "text": [
      "Phase I: serpent-bind volleys. Phase II: invisible artillery. Phase III: ritual chamber strike window.",
      "You must decide whether to conserve elite units or break formation for a finishing move."
    ],
    "choices": [
      {
        "label": "Conserve and counter",
        "next": 78,
        "effects": {
          "defense": 2,
          "endurance": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Break formation and pressure",
        "next": 78,
        "effects": {
          "strength": 2,
          "stamina": -1
        },
        "timeAdvance": 1
      },
      {
        "label": "Flank through smoke corridors",
        "next": 78,
        "effects": {
          "agility": 2,
          "speed": 1
        },
        "timeAdvance": 1
      }
    ]
  },
  "78": {
    "title": "Boss Phase: Kumbhakarna",
    "text": [
      "At Day 6 dusk, Kumbhakarna crushes siege towers and vanara phalanxes alike. The field becomes a rescue-and-kill puzzle.",
      "Random encounter: save a trapped battalion or press for a quick kill."
    ],
    "choices": [
      {
        "label": "Save battalion first",
        "next": 79,
        "effects": {
          "defense": 2,
          "endurance": 2
        },
        "timeAdvance": 1
      },
      {
        "label": "Press for quick kill",
        "next": 79,
        "effects": {
          "strength": 2,
          "stamina": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Hit-and-fade harassment",
        "next": 79,
        "effects": {
          "agility": 1,
          "speed": 2
        },
        "timeAdvance": 1
      }
    ]
  },
  "79": {
    "title": "Boss Phase: Ravana",
    "text": [
      "Final day-night cycle begins. Ravana's ten-crowned war form rotates elemental weapons and psychological attacks.",
      "You choose your final doctrine, which shapes coronation perception and Uttara outcomes."
    ],
    "choices": [
      {
        "label": "Offer surrender once, then strike",
        "next": 80,
        "effects": {
          "defense": 1,
          "endurance": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Unleash overwhelming force",
        "next": 80,
        "effects": {
          "strength": 2,
          "stamina": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Coordinated companion lock",
        "next": 80,
        "effects": {
          "agility": 2,
          "speed": 1
        },
        "timeAdvance": 1
      }
    ]
  },
  "80": {
    "title": "Return to Ayodhya: Coronation Day",
    "text": [
      "After victory, you return for coronation amid celebration and scrutiny. Public perception tracks mercy, discipline, and wartime loss.",
      "Your reign now transitions into Uttara Kanda, where the hardest moral trials begin."
    ],
    "choices": [
      {
        "label": "Rule through restorative justice",
        "next": 81,
        "timeAdvance": 1
      },
      {
        "label": "Rule through iron order",
        "next": 81,
        "timeAdvance": 1
      },
      {
        "label": "Rule through ritual duty",
        "next": 81,
        "timeAdvance": 1
      }
    ]
  },
  "81": {
    "title": "Uttara Kanda: Rumors and Exile",
    "text": [
      "Whispers in Ayodhya challenge Sita's honor. You face crown-versus-heart in a decision that permanently changes family destiny.",
      "Day 8 closes with Sita sent to Valmiki's refuge where Lava and Kusha are born."
    ],
    "choices": [
      {
        "label": "Stand publicly with Sita",
        "next": 82,
        "effects": {
          "endurance": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Exile her for state stability",
        "next": 82,
        "effects": {
          "defense": 1
        },
        "timeAdvance": 1
      },
      {
        "label": "Call legal dharma inquiry",
        "next": 82,
        "effects": {
          "agility": 1
        },
        "timeAdvance": 1
      }
    ]
  },
  "82": {
    "title": "Ashvamedha and Final Reunion",
    "text": [
      "Years later, Lava and Kusha halt the Ashvamedha horse. Father and sons meet first in conflict, then in recognition through song.",
      "Sita invokes Bhumi Devi and departs into the earth. Rama's final journey approaches the Sarayu."
    ],
    "choices": [
      {
        "label": "Ideal Dharma Ending",
        "next": 83
      },
      {
        "label": "Ruthless Conqueror Ending",
        "next": 84
      },
      {
        "label": "Failed Ruler Ending",
        "next": 85
      }
    ]
  },
  "83": {
    "title": "Ending: Ideal Dharma",
    "text": [
      "You complete rule with compassion, restraint, and justice. Allies remain loyal; memory becomes blessing across generations."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "84": {
    "title": "Ending: Ruthless Conqueror",
    "text": [
      "Your victories endure, but fear replaces devotion. The realm obeys your will while love and trust fade from court and camp."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "85": {
    "title": "Ending: Failed Ruler",
    "text": [
      "Broken loyalties and unresolved grief shadow your reign. The epic closes with warning: power without balance devours itself."
    ],
    "choices": [
      {
        "label": "Restart",
        "restart": true
      }
    ]
  },
  "86": {
    "title": "Lakshmana's Oath",
    "text": [
      "{{name}}, you watch Rama accept exile and feel fire in your chest.",
      "You swear before Ayodhya that no danger, demon, or hunger will touch your elder brother while you still breathe."
    ],
    "choices": [
      {
        "label": "Escort Rama into exile",
        "next": 4
      }
    ]
  },
  "87": {
    "title": "Bharata's Burden",
    "text": [
      "{{name}}, you return to Ayodhya and learn that the throne was won through your mother {{motherName}}'s demand.",
      "Shaken by grief and shame, you reject the crown and vow to rule only as Rama's regent."
    ],
    "choices": [
      {
        "label": "Go to Chitrakoot and plead",
        "next": 70
      }
    ]
  },
  "88": {
    "title": "Ravana's Ambition",
    "text": [
      "{{name}}, in Lanka's golden court, spies whisper of Ayodhya's fractured royal house.",
      "You decide to exploit the exile and set plans in motion long before the forest ever hears your name."
    ],
    "choices": [
      {
        "label": "Set the snare in the forest",
        "next": 66
      }
    ]
  },
  "89": {
    "title": "Sita's Resolve",
    "text": [
      "{{name}}, while the palace trembles, you refuse comfort and ornaments.",
      "You choose the forest path willingly, believing dharma is not a place but the promise you keep beside Rama."
    ],
    "choices": [
      {
        "label": "Walk into exile together",
        "next": 6
      }
    ]
  }
};
