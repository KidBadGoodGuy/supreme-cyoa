# Scene & Route Reference

This page summarizes the currently implemented narrative structure.

## Main arc blocks

### Part 1: Exile and early branching

- Exile opening with response split.
- Alone-route and companion-route divergence.
- Surphanaka encounter outcomes:
  - combat,
  - negotiation,
  - dark alliance (Evil King route).

### Golden deer and abduction arc

- Golden deer sequence, including lore detours.
- Lakshmana accompaniment decision.
- Maricha reveal and cry.
- Ravana deception split.
- Jatayu intervention outcomes.

### Kishkindha and alliance arc

- Sugriva introduction.
- Alliance and Vali challenge sequence.
- Hanuman hub entry.

### Hub and side systems

From the Hanuman hub, available branches include:

- Rescue storyline continuation.

### Part 2: Rescue sequence

- Rescue start and strategy debate.
- Surasa test.
- Lanka reconnaissance progression.
- Debrief loop back to hub/council scenes.

## Ending-type scenes currently present

- Evil King Ending (17)
- Game Over (18)
- Ignore Deer Ending (21)
- Peaceful Ending (52)
- Ayodhya Return Ending (67)
- Forest Duel Ending (38)

## Special scene IDs in use

- Hanuman hub: 66
- Rescue launch: 75
- Surasa test: 78
- Lanka reconnaissance: 80, 81

## Timeline model

- `timelineLevels` groups scenes by column.
- `timelineEdges` defines directed transitions.
- Chance edges use `type: "chance"`.
- Active highlighting reflects visited nodes and taken paths.
- Reveal mode displays full path visibility.

## Update 1.0.13 modular route additions

The main adventure now supports direct URL routing with `?scene=<scene-id>#scene-<scene-id>` for every generated or modular scene.

### New expansion route groups

- `ayodhya-council-1` through `ayodhya-council-4`
- `exile-side-1` through `exile-side-8`
- `forest-side-1` through `forest-side-8`
- `kishkindha-side-1` through `kishkindha-side-8`
- `lanka-side-1` through `lanka-side-8`
- `return-side-1` through `return-side-8`
- `slumberland-rest`
- `slumberland-trial`
- `dream-1`

### Timeline and receipt model update

- Scene visits append structured timeline entries with scene id, title, day, phase, and timestamp.
- Choice consequences append receipt entries describing the selected action and resulting day/night state.
- Browser back/forward navigation re-renders scenes without re-applying scene effects, preventing duplicated history and resource changes.


## Update 1.0.15 main story route additions

The authored Project.js main story scenes are now available in the modular story main with `main-<legacy-id>` route ids. Legacy numeric URL requests are normalized to these ids, so `?scene=1` opens `main-1`.

### New main route group

- `main-1`, `main-3` through `main-34`, `main-36` through `main-48`, `main-50` through `main-52`, `main-54`, and `main-65` through `main-89` for the existing Project.js authored main-story scenes that are present in the legacy catalog.
- Chance routes from the legacy story remain dynamic: Surphanaka combat, deer pursuit, Jatayu rescue, and solo/family forest entry resolve at choice time.
- Restart endings now reset the modular save and return to `main-1`.

### Timeline and receipt model update

- Integrated main story scene visits use the existing history list so the timeline panel records title, id, day, phase, and timestamp.
- Integrated main story choices use the existing receipt list so branch decisions record the selected label and resulting day/night state.
