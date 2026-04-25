# Features

_Last updated: 2026-04-25 (UTC)_

This page is a complete, implementation-level feature inventory for the current state of **The Ramayana Adventure: Banwas**. It documents what is already present in the shipped codebase (not planned ideas), with emphasis on player-facing behavior and the systems that support it.

---

## 1) Core Narrative Experience

### Branching CYOA structure
- The game is implemented as a scene graph where each scene has:
  - a title,
  - one or more narrative paragraphs,
  - optional dialogue blocks,
  - and one or more player choices.
- Most choices jump to a specific next scene ID, while some choices route through randomized “special next” rules to generate chance-based outcomes.
- The current playable arc covers the exile opening, Surphanaka branch, golden deer trap, abduction responses, Jatayu outcomes, Sugriva alliance sequence, Hanuman training, and a **Coming Soon** Lanka card.

### Route identity and replayability
- The story supports distinct route identities (for example, alone-route vs companion-route behavior), driven by state flags set by earlier choices.
- Routes can end early in multiple ending scenes, encouraging replay:
  - execution/court failure,
  - evil-king path,
  - battle defeat,
  - peaceful exile branch,
  - forest duel branch,
  - and other restart-capable endings.

### Embedded dialogue presentation
- Scenes can include structured speaker-line dialogue blocks (rendered separately from plain paragraphs).
- Dialogue preserves character voice moments in key encounters (Surphanaka, Sita/Ravana abduction sequence, Sugriva, Hanuman), making scenes feel more dramatic than plain prose-only cards.

---

## 2) Personalization and Dynamic Text Systems

### Player and family naming
- The game supports custom naming for:
  - player,
  - father,
  - mother,
  - wife,
  - sibling 1,
  - sibling 2,
  - sibling 3,
  - and sibling 2’s mother (Kaikeyi role).
- Any blank field falls back to canonical defaults (Rama, Dasharatha, Kausalya, Sita, Lakshmana, Bharata, Shatrughna, Kaikeyi).

### Family Setup toggle model
- The start card includes an **Enable Family Setup** toggle that reveals or hides extended family inputs.
- Toggle behaviors include:
  - **Enable**: activates custom family identity for the run.
  - **Disable**: stores current custom names, restores canonical family names immediately, and refreshes current scene output if already in-game.
- First-time mid-run activation is guarded to avoid inconsistent state; users see a lock message: **“Not Available. Finish current game session.”**

### Gender-aware sibling pronouns
- Each sibling can be marked male/female.
- Narrative placeholders for subject/object/possessive pronouns are dynamically interpolated (e.g., he/him/his or she/her/her) inside scene text.

### Placeholder interpolation engine
- Story text uses token replacement (e.g., `{{name}}`, `{{wifeName}}`, `{{siblingTwoPossessive}}`) at render time.
- This keeps authored scene prose reusable while still feeling personalized and grammatically coherent across many input combinations.

### Character name highlighting
- Named entities in rendered scene text are auto-highlighted using a dedicated character-name style.
- Highlighting includes both dynamic family names and major canonical figures.

---

## 3) Choice Handling, State, and Randomization

### Stateful route flags
- Important route context is preserved in dedicated runtime flags (for example whether the player went alone, or whether sibling 1 accompanied the deer chase).
- Later scenes and special routers reference those flags to alter outcomes.

### Chance-based outcomes
- The game includes probabilistic branches through resolver codes instead of hard-coded direct scene IDs in every case.
- Current randomized behaviors include:
  - battle-resolution chance in Surphanaka combat,
  - Ravana deception outcome split,
  - Jatayu rescue attempt success/failure split,
  - branch handoff logic from the sandals scene to alone-vs-with-party Surphanaka encounter.

### Restart semantics
- Ending scenes expose explicit **Restart** choices.
- Restart resets story progression and identity runtime fields to a clean baseline for replay.

---

## 4) Story UI and Interaction Layer

### Story card rendering pipeline
- Scene content is rendered into `#storyCard` as:
  - title (`h1` for scene 1, `h2` otherwise),
  - paragraphs,
  - optional dialogue block,
  - choice button set.
- All user-facing text passes through escaping + interpolation + name-formatting steps before insertion.

### Undo support
- Every non-initial decision pushes the previous scene ID onto a history stack.
- **Undo** returns to the prior scene by popping history.
- Undo button state auto-disables when no history exists.

### “My Storyline” modal receipt
- A toolbar button opens a modal that summarizes visited scenes and the current scene.
- Each entry includes scene title and a descriptive text summary.
- This acts as a readable “receipt” of player decisions so far.

### Smooth transition into gameplay
- On adventure start, the interface scrolls the story card into view to reduce friction between setup and active play.

---

## 5) Navigation, Page Architecture, and Cross-Page Cohesion

### Shared top navbar pattern
- Main pages use a shared responsive navbar architecture:
  - mobile toggle button,
  - page links,
  - soundtrack control zone.
- Mobile nav can be dismissed by tapping outside the open menu.

### Multi-page project layout
- The project currently includes:
  - `index.html` (main adventure),
  - `updates.html` (release notes),
  - `before-the-ramayana.html` (prequel placeholder page),
  - `people-of-ramayana.html` (character/kingdom reference).

### Resolution-aware styling hook
- `resolution.js` is loaded across pages and applied at DOM ready + resize where wired.
- Update badges use resolution label metadata (`data-resolution-label="HD"`) to support responsive/preset display logic.

---

## 6) Audio Experience and Persistence

### Native soundtrack integration
- Pages include a browser-native `<audio>` control bar in the navbar.
- Audio settings: autoplay, muted default at markup level, loop enabled, metadata preload, download/rate controls suppressed via `controlsList`.

### Shared music state across pages
- The app stores soundtrack continuity state in web storage:
  - `sessionStorage` for playback state snapshot (`currentTime`, `volume`, `muted`, `paused`),
  - `localStorage` for persisted volume percentage.
- When another page loads, it restores volume/mute/time and resumes play when appropriate.

### Start-of-quest normalization
- Starting a new adventure resets soundtrack volume to 50% and updates stored volume state to match.

---

## 7) People Reference Page Features

### Structured character + kingdom catalog
- The People page contains an in-app dataset of key Ramayana individuals and kingdoms.
- Current kingdom coverage is intentionally constrained to:
  - Ayodhya,
  - Lanka,
  - Mithila,
  - Kishkindha.

### Category filtering
- Users can filter cards by:
  - all,
  - individuals,
  - kingdoms.

### Card rendering model
- Each card shows:
  - name,
  - role badge,
  - type indicator,
  - description,
  - and a Wikipedia button (external link, new tab, safe rel attributes).

### Scroll reveal animation
- Cards use IntersectionObserver-based reveal transitions.
- Includes graceful fallback behavior when IntersectionObserver is unavailable.

### Page-level audio + navbar parity
- People page has its own JS handlers for responsive navbar toggle and persistent soundtrack behavior, aligned with main-adventure UX patterns.

---

## 8) Updates and Release Communication

### Public update badges
- Pages surface a visible update badge linking to `updates.html`.
- The badge currently displays release marker **1.0.5** on core pages, with some older page badges still showing **1.0.4** (a visible consistency gap in current content).

### Dedicated updates page
- `updates.html` publishes a latest-update panel in `#updateInfo` with release title and change notes.
- Current published note highlights family setup toggle behavior and character-name color refresh.

### Hidden console update marker
- The main runtime script logs a hidden update marker in console output (`console.log("Update 22")`) for internal tracking.

---

## 9) Accessibility and UX Safeguards

### Semantic and assistive attributes
- Navigation landmarks and controls include `aria-label`, `aria-expanded`, `aria-controls`, and `aria-current` where relevant.
- Timeline modal manages `aria-hidden` for open/close state signaling.

### Input guidance
- The intro card instructs users that blanks fall back to canonical names, reducing setup friction and invalid-state confusion.

### Progressive enhancement behavior
- Multiple systems degrade gracefully:
  - audio restore logic guards storage parsing failures,
  - scroll reveal falls back to immediate reveal without observer support,
  - optional resolution styling only runs when helper function exists.

---

## 10) Current Scope Boundaries (What Is Explicitly Placeholder)

### Prequel page
- **Before the Ramayana** exists as a coming-soon page and currently acts as a navigation endpoint, not a full second interactive story.

### Lanka continuation
- Main narrative currently culminates in a **The Ramayana Adventure: Lanka — Coming Soon** scene card.
- This is the primary forward-content boundary in the present release.

### Stubbed hooks in main script
- The main script includes no-op placeholders for expanded timeline zoom/reveal and inventory modal handling, signaling planned-but-not-yet-implemented subsystems.

---

## 11) At-a-Glance Feature Checklist

- ✅ Scene-based branching narrative engine
- ✅ Multiple ending routes + replay loop
- ✅ Choice history + Undo
- ✅ Storyline modal receipt
- ✅ Player and family-name personalization
- ✅ Gender-aware pronoun interpolation
- ✅ Family setup enable/disable with mid-run guardrail
- ✅ Character-name text highlighting
- ✅ Chance-based branch resolution
- ✅ Shared responsive navbar pattern
- ✅ Persistent cross-page soundtrack playback state
- ✅ People catalog with filters and Wikipedia links
- ✅ Scroll reveal card animations with fallback
- ✅ Updates page with release notes
- ✅ Hidden console update tracking marker

---

If you expand the game further, this page should be updated in lockstep so the wiki remains a true feature ledger rather than a marketing-only summary.
