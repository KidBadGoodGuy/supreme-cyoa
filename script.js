console.log("Update 1.0.15");

import { EXPANDED_SCENES, RAMAYANA_ARCS } from './engine_extensions/expandedScenes.js';
import { PROJECT_MAIN_STORY_SCENES } from './engine_extensions/projectMainStoryScenes.js';
import { GameUI } from './ui/gameUI.js';
import {
  InventorySystem,
  KingdomSystem,
  PartySystem,
  QuestSystem,
  SaveLoadSystem,
  TimeSystem,
  canShowChoice,
  clamp,
  createDefaultState,
  normaliseState,
  FALLBACK_CHARACTER_IMAGE,
  FALLBACK_SCENE_IMAGE
} from './systems/gameSystems.js';


const MAIN_STORY_CAST = {
  name: 'Rama',
  fatherName: 'Dasharatha',
  motherName: 'Kausalya',
  wifeName: 'Sita',
  siblingOneName: 'Lakshmana',
  siblingTwoName: 'Bharata',
  siblingThreeName: 'Shatrughna',
  secondMotherName: 'Kaikeyi',
  siblingTwoPossessive: 'his',
  siblingTwoObject: 'him'
};

function mainStoryId(legacyId) {
  return `main-${legacyId}`;
}

function mainStoryArc(legacyId) {
  if ([1, 3, 4, 5, 6, 66, 67, 68, 69, 70, 71, 86, 87, 88, 89].includes(legacyId)) return 'main-ayodhya';
  if (legacyId >= 7 && legacyId <= 39) return 'main-forest';
  if (legacyId >= 40 && legacyId <= 52) return 'main-kishkindha';
  if (legacyId >= 53 && legacyId <= 64) return 'main-search';
  if (legacyId >= 72 && legacyId <= 79) return 'main-lanka';
  if (legacyId >= 80) return 'main-return';
  return 'main-story';
}

function normaliseSceneRoute(id) {
  if (id == null || id === '') return id;
  const stringId = String(id);
  if (/^\d+$/.test(stringId)) return mainStoryId(stringId);
  return stringId;
}

function interpolateMainStory(value) {
  if (Array.isArray(value)) return value.map(interpolateMainStory).join('\n\n');
  return String(value || '').replace(/{{(.*?)}}/g, (_, key) => MAIN_STORY_CAST[key] || '');
}

function resolveProjectMainNext(next, stateRef) {
  if (next == null) return undefined;
  if (next === -10) return 'main-3';
  if (next === -1) {
    return () => (Math.random() < 0.65 ? (stateRef.state.world.flags.wentAlone ? 'main-52' : 'main-14') : 'main-18');
  }
  if (next === -2) return () => (Math.random() < 0.5 ? 'main-29' : 'main-39');
  if (next === -3) return () => (Math.random() < 0.15 ? 'main-33' : 'main-34');
  if (next === -4) return () => (stateRef.state.world.flags.wentAlone ? 'main-8' : 'main-7');
  return mainStoryId(next);
}

function primaryStatEffect(effects) {
  if (!effects) return undefined;
  const source = effects.stats || effects;
  const entry = Object.entries(source).find(([, value]) => typeof value === 'number');
  return entry ? [entry[0], entry[1]] : undefined;
}

class StateManager {
  constructor() {
    this.state = createDefaultState();
  }
}

class SystemRegistry {
  constructor(stateRef) {
    this.stateRef = stateRef;
    this.rebind();
  }
  rebind() {
    const state = this.stateRef.state;
    this.inventory = new InventorySystem(state);
    this.quests = new QuestSystem(state);
    this.party = new PartySystem(state);
    this.time = new TimeSystem(state);
    this.kingdom = new KingdomSystem(state);
    this.saveLoad = new SaveLoadSystem(this.stateRef);
  }
}

class SceneManager {
  constructor(stateRef, systems) {
    this.stateRef = stateRef;
    this.systems = systems;
    this.scenes = this.buildScenes();
  }

  buildScenes() {
    const scenes = {};
    const sideEntrances = {
      ayodhya: 'ayodhya-council-1', exile: 'exile-side-1', forest: 'forest-side-1', kishkindha: 'kishkindha-side-1', lanka: 'lanka-side-1', return: 'return-side-1'
    };

    RAMAYANA_ARCS.forEach((arc, arcIndex) => {
      for (let i = 1; i <= 40; i += 1) {
        const id = `${arc}-${i}`;
        const nextArc = RAMAYANA_ARCS[Math.min(arcIndex + 1, RAMAYANA_ARCS.length - 1)];
        const next = i < 40 ? `${arc}-${i + 1}` : `${nextArc}-1`;
        scenes[id] = this.createCoreScene({ id, arc, index: i, next, side: sideEntrances[arc] });
      }
    });

    this.createEncounters().forEach((scene) => { scenes[scene.id] = scene; });
    EXPANDED_SCENES.forEach((scene) => { scenes[scene.id] = this.normaliseScene(scene); });
    this.createProjectMainScenes().forEach((scene) => { scenes[scene.id] = scene; });
    scenes['dream-1'] = this.normaliseScene({
      id: 'dream-1',
      arc: 'slumberland',
      title: 'Slumberland Dream Gate',
      text: 'You enter a dream realm. Hidden truths alter lineage memory, but the world continues beyond sleep.',
      image: FALLBACK_SCENE_IMAGE,
      characterImage: FALLBACK_CHARACTER_IMAGE,
      onEnter: () => {
        const lineage = this.stateRef.state.player.lineage;
        if (!lineage.includes('Dream Omen')) lineage.push('Dream Omen');
        this.systems.quests.start('Interpret the dream omen');
      },
      choices: [{ label: 'Awaken at the last camp', to: () => this.stateRef.state.world.lastScene || 'forest-1', time: 4 }]
    });
    return scenes;
  }

  createCoreScene({ id, arc, index, next, side }) {
    const isNightGate = index % 7 === 0;
    return this.normaliseScene({
      id,
      arc,
      title: `${arc.toUpperCase()} • Chapter ${index}`,
      text: `Day ${this.stateRef.state.world.day}: You face trials in ${arc}. Dharma, allies, inventory, and time now shape which paths remain open.`,
      image: FALLBACK_SCENE_IMAGE,
      characterImage: FALLBACK_CHARACTER_IMAGE,
      onEnter: () => this.applySceneMilestones(arc, index),
      choices: [
        { label: 'Follow dharma', to: next, dharma: 2, time: 2 },
        { label: 'Take tactical risk', to: next, stat: ['intelligence', 1], time: 2 },
        { label: 'Explore a regional side path', to: side, xp: 8, time: 3 },
        { label: 'Answer the night omen', to: 'dream-1', requiresPhase: 'Night', flag: ['nightOmenAnswered', true], time: 1 },
        { label: 'Use herbs to aid travelers', to: next, requiresItem: 'herbs', cost: ['herbs', 1], dharma: 3, kingdom: { faith: 2 }, time: isNightGate ? 3 : 2 }
      ]
    });
  }


  createProjectMainScenes() {
    return Object.entries(PROJECT_MAIN_STORY_SCENES).map(([legacyId, scene]) => this.normaliseScene({
      id: mainStoryId(legacyId),
      arc: mainStoryArc(Number(legacyId)),
      title: interpolateMainStory(scene.title),
      text: interpolateMainStory([...(scene.text || []), ...(scene.dialogue || []).map((entry) => `${entry.speaker}: ${entry.line}`)]),
      image: scene.image || FALLBACK_SCENE_IMAGE,
      characterImage: scene.characterImage || FALLBACK_CHARACTER_IMAGE,
      dialogue: (scene.dialogue || []).map((entry) => ({
        speaker: interpolateMainStory(entry.speaker),
        line: interpolateMainStory(entry.line)
      })),
      choices: (scene.choices || []).map((choice) => this.normaliseProjectChoice(choice))
    }));
  }

  normaliseProjectChoice(choice) {
    return {
      label: interpolateMainStory(choice.label),
      to: resolveProjectMainNext(choice.next, this.stateRef),
      restart: Boolean(choice.restart),
      time: choice.timeAdvance || choice.time || 1,
      flag: choice.flag,
      stat: primaryStatEffect(choice.effects)
    };
  }

  createEncounters() {
    return ['sage', 'demon', 'merchant'].map((kind) => this.normaliseScene({
      id: `encounter-${kind}`,
      arc: 'encounter',
      title: `${kind[0].toUpperCase() + kind.slice(1)} Encounter`,
      text: 'A dynamic event reacts to your party, time, dharma, and resources before returning you to the wider road.',
      image: FALLBACK_SCENE_IMAGE,
      characterImage: FALLBACK_CHARACTER_IMAGE,
      onEnter: () => { this.systems.inventory.add(kind === 'merchant' ? 'arrows' : 'herbs', 1); },
      choices: [{ label: 'Return to the journey', to: () => this.stateRef.state.world.lastScene || 'ayodhya-1', time: 1 }]
    }));
  }

  normaliseScene(scene) {
    return {
      image: scene.image || scene.backgroundImage,
      characterImage: scene.characterImage,
      choices: [],
      ...scene,
      choices: (scene.choices || []).map((choice) => ({ time: 1, ...choice }))
    };
  }

  applySceneMilestones(arc, index) {
    const { party, quests } = this.systems;
    if (arc === 'ayodhya' && index === 1) quests.start('Prepare for exile with dignity');
    if (arc === 'exile' && index === 1) quests.complete('Prepare for exile with dignity');
    if (arc === 'forest' && index === 5) quests.start('Protect the hermitages');
    if (arc === 'kishkindha' && index === 2) party.add('hanuman', { lvl: 1, role: 'Devoted envoy' });
    if (arc === 'kishkindha' && index === 10) party.add('sugriva', { lvl: 1, role: 'Vanara king' });
    if (arc === 'lanka' && index === 15) party.add('vibhishana', { lvl: 1, role: 'Lanka defector' });
    if (arc === 'return' && index === 1) quests.complete('Protect the hermitages');
  }

  getScene(id) { return this.scenes[id]; }
}

class GameEngine {
  constructor() {
    this.stateManager = new StateManager();
    this.systems = new SystemRegistry(this.stateManager);
    this.sceneManager = new SceneManager(this.stateManager, this.systems);
    this.ui = new GameUI(this.stateManager, {
      onChoice: (choice) => this.choose(choice),
      onRest: () => this.rest(),
      onNavigate: (sceneId) => this.renderScene(sceneId)
    });
    this.bindGlobalActions();
    this.boot();
  }

  boot() {
    this.systems.saveLoad.load();
    this.stateManager.state = normaliseState(this.stateManager.state);
    this.systems.rebind();
    const routedScene = new URLSearchParams(window.location.search).get('scene') || window.location.hash.replace('#scene-', '');
    const routedAlias = normaliseSceneRoute(routedScene);
    const startingScene = this.sceneManager.getScene(routedAlias) ? routedAlias : this.stateManager.state.world.currentScene;
    this.renderScene(startingScene, { replace: true, runEffects: false, recordHistory: false });
    this.systems.time.start(() => {
      this.systems.kingdom.generate('real-time');
      this.persistAndRefresh();
    });
  }

  bindGlobalActions() {
    this.bindRequiredButton('saveBtn', () => this.systems.saveLoad.save());
    this.bindRequiredButton('loadBtn', () => {
      if (this.systems.saveLoad.load()) {
        this.systems.rebind();
        this.renderScene(this.stateManager.state.world.currentScene, { replace: true, runEffects: false, recordHistory: false });
      }
    });
    this.bindRequiredButton('timelineBtn', () => document.getElementById('timelinePanel')?.classList.toggle('hidden'));
    this.bindRequiredButton('resetBtn', () => {
      localStorage.removeItem('rkod_save_v2');
      localStorage.removeItem('rkod_save');
      this.stateManager.state = createDefaultState();
      this.systems.rebind();
      this.renderScene('main-1', { replace: true, runEffects: false });
    });
    window.addEventListener('popstate', (event) => {
      const sceneId = normaliseSceneRoute(event.state?.sceneId);
      if (sceneId) this.renderScene(sceneId, { replace: true, runEffects: false, recordHistory: false });
    });
  }


  bindRequiredButton(id, handler) {
    const button = document.getElementById(id);
    if (!button) {
      console.warn(`Missing required control: ${id}`);
      return;
    }
    button.addEventListener('click', handler);
  }

  choose(choice) {
    if (choice.restart) {
      localStorage.removeItem('rkod_save_v2');
      localStorage.removeItem('rkod_save');
      this.stateManager.state = createDefaultState();
      this.systems.rebind();
      this.renderScene('main-1', { replace: true, runEffects: false });
      return;
    }
    if (!canShowChoice(choice, this.stateManager.state)) return;
    this.applyChoice(choice);
    const destination = typeof choice.to === 'function' ? choice.to() : choice.to;
    if (Math.random() < this.stateManager.state.settings.dreamChance && this.stateManager.state.world.phase === 'Night') {
      this.renderScene('dream-1');
      return;
    }
    this.renderScene(destination || this.stateManager.state.world.currentScene);
  }

  rest() {
    const state = this.stateManager.state;
    const hours = state.world.phase === 'Night' ? 1 : (18 - state.world.hour + 24) % 24 || 10;
    this.systems.time.advance(hours, 'rest');
    if (state.world.phase === 'Night') this.renderScene('slumberland-rest');
    else this.persistAndRefresh();
  }

  applyChoice(choice) {
    const state = this.stateManager.state;
    if (choice.cost) this.systems.inventory.remove(choice.cost[0], choice.cost[1]);
    if (choice.dharma) state.world.dharma = clamp(state.world.dharma + choice.dharma, 0, 100);
    if (choice.xp) state.player.xp += choice.xp;
    if (choice.stat) state.player.stats[choice.stat[0]] = (state.player.stats[choice.stat[0]] || 0) + choice.stat[1];
    if (choice.kingdom) Object.entries(choice.kingdom).forEach(([key, value]) => { state.kingdom[key] = (state.kingdom[key] || 0) + value; });
    if (choice.flag) state.world.flags[choice.flag[0]] = choice.flag[1];
    if (choice.temporaryEffect && !state.player.temporaryEffects.includes(choice.temporaryEffect)) state.player.temporaryEffects.push(choice.temporaryEffect);
    this.systems.time.advance(choice.time ?? 1, 'choice');
    this.systems.kingdom.generate('choice');
    state.world.timelineReceipts.push(`${choice.label} → ${state.world.phase}, Day ${state.world.day}`);
    choice.effect?.(state, this.systems);
  }

  renderScene(id, options = {}) {
    const { replace = false, runEffects = true, recordHistory = true } = options;
    const normalisedId = normaliseSceneRoute(id);
    const scene = this.sceneManager.getScene(normalisedId) || this.sceneManager.getScene('main-1') || this.sceneManager.getScene('ayodhya-1');
    const state = this.stateManager.state;
    if (!scene) return;

    const previous = state.world.currentScene;
    state.world.lastScene = previous !== scene.id ? previous : state.world.lastScene;
    state.world.currentScene = scene.id;
    state.world.sceneEntries[scene.id] = (state.world.sceneEntries[scene.id] || 0) + 1;

    if (runEffects) scene.onEnter?.(state, this.systems);
    if (recordHistory) {
      state.world.history.push({ id: scene.id, title: scene.title, at: new Date().toISOString(), day: state.world.day, phase: state.world.phase });
    }

    this.ui.renderAll(scene, this.sceneManager.scenes);
    const url = `?scene=${encodeURIComponent(scene.id)}#scene-${encodeURIComponent(scene.id)}`;
    window.history[replace ? 'replaceState' : 'pushState']({ sceneId: scene.id }, '', url);
    this.systems.saveLoad.save();
  }

  persistAndRefresh() {
    const scene = this.sceneManager.getScene(this.stateManager.state.world.currentScene);
    this.ui.renderAll(scene, this.sceneManager.scenes);
    this.systems.saveLoad.save();
  }
}

document.addEventListener('DOMContentLoaded', () => new GameEngine());
