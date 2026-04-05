# Minigames, Progression, and Unlocks

## Journey Trivia

- Question bank is generated from `ramayanaTriviaFacts` and prompt variants.
- Session limit is controlled by `triviaSessionQuestionLimit` (currently 10).
- Session ends when:
  - 3 wrong answers, or
  - Question limit reached.
- Perfect sessions increment `perfectTriviaSessionsInRow`.
- At a streak of **20 perfect sessions**, `dasharathaStoryUnlocked` is enabled.

## Guessing Game (Scene 93)

- Uses `ramayanaGuessPool` entries with:
  - `answer`
  - `type` (Person/Place/Thing)
  - progressive clue list
- Wrong guesses reveal additional clues.
- Correct guesses increment solved count and start a new round.

## Storytelling Game (Scenes 99–100)

- Uses `storytellingQuestions` with:
  - prompt
  - expected keywords
  - model answer
- Scoring checks keyword matches in free-text answer.
- Feedback and model answer are shown in result scene.

## Ally Conversations / Training (Scene 77)

Characters currently available:

- Hanuman
- Sugriva
- Lakshmana
- Angada

Conversation supports tone-based replies and optional sparring offers.
Sparring outcomes are chance-based with per-character fight modifiers.

## Ocean Exploration (Scenes 101–102)

Regions currently available:

- Shoals of Setubandha
- Skies Above Lanka
- Ashoka Garden Paths

Each expedition:

- Selects a region
- Randomly grants one artifact from that region pool
- Records artifact in inventory (no duplicates)
- Displays region-specific summary + lore

## Artifact Inventory System

- Inventory button in nav shows collected item count.
- Modal lists each artifact with lore text from `artifactLoreCatalog`.
- Duplicate pickups are prevented by `addArtifact()`.

## Combat/chance odds

Base challenge odds currently:

- fight: 70
- journeyTrivia: 50
- guessing: 35
- fallback: 40

`clampOdds()` caps final odds to range 5–95.

