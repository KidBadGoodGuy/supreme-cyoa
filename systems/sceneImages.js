const PHOTO_SERVICE = 'https://loremflickr.com';

const ARC_IMAGE_TAGS = {
  ayodhya: ['ayodhya', 'temple', 'india', 'palace'],
  exile: ['forest', 'india', 'river', 'journey'],
  forest: ['ancient', 'forest', 'hermitage', 'india'],
  kishkindha: ['monkey', 'forest', 'mountain', 'temple'],
  lanka: ['fortress', 'island', 'fire', 'night'],
  return: ['temple', 'celebration', 'lights', 'india'],
  slumberland: ['night', 'stars', 'dream', 'mist'],
  encounter: ['traveler', 'india', 'market', 'forest'],
  default: ['epic', 'india', 'temple', 'landscape']
};

const CHARACTER_IMAGE_TAGS = {
  ayodhya: ['indian', 'prince', 'portrait'],
  exile: ['archer', 'forest', 'portrait'],
  forest: ['sage', 'forest', 'portrait'],
  kishkindha: ['monkey', 'portrait', 'forest'],
  lanka: ['warrior', 'armor', 'portrait'],
  return: ['king', 'india', 'portrait'],
  slumberland: ['statue', 'moon', 'portrait'],
  encounter: ['traveler', 'portrait', 'india'],
  default: ['hero', 'portrait', 'india']
};

const TITLE_IMAGE_HINTS = [
  { pattern: /sita|ashoka/i, tags: ['garden', 'india', 'temple', 'flowers'] },
  { pattern: /hanuman|vanara|monkey|leap/i, tags: ['monkey', 'temple', 'forest', 'sky'] },
  { pattern: /ravana|lanka|indrajit|kumbhakarna|boss|war|raid/i, tags: ['fortress', 'fire', 'night', 'battle'] },
  { pattern: /setu|bridge|ocean|shore|landing/i, tags: ['ocean', 'bridge', 'sunset', 'india'] },
  { pattern: /dream|slumberland|omen|night/i, tags: ['night', 'stars', 'mist', 'moon'] },
  { pattern: /council|palace|ayodhya|coronation/i, tags: ['palace', 'temple', 'india', 'gold'] },
  { pattern: /forest|exile|hermitage|sage/i, tags: ['forest', 'india', 'river', 'ancient'] },
  { pattern: /merchant|market/i, tags: ['market', 'india', 'traveler', 'colorful'] },
  { pattern: /demon|surphanaka/i, tags: ['storm', 'forest', 'dark', 'statue'] }
];

const TITLE_CHARACTER_HINTS = [
  { pattern: /sita|ashoka/i, tags: ['woman', 'india', 'portrait'] },
  { pattern: /hanuman|vanara|monkey|leap/i, tags: ['monkey', 'portrait', 'temple'] },
  { pattern: /ravana|indrajit|kumbhakarna|boss|war/i, tags: ['warrior', 'armor', 'portrait'] },
  { pattern: /sage|hermitage|dream|omen/i, tags: ['sage', 'portrait', 'india'] },
  { pattern: /merchant|market/i, tags: ['merchant', 'portrait', 'india'] },
  { pattern: /council|king|coronation|bharata|lakshmana|rama/i, tags: ['king', 'india', 'portrait'] }
];

export function getSceneArt(scene) {
  const seed = stableSeed(scene?.id || scene?.title || 'scene');
  const tags = getTags(scene, ARC_IMAGE_TAGS, TITLE_IMAGE_HINTS);
  return buildPhotoUrl(1600, 900, tags, seed);
}

export function getCharacterArt(scene) {
  const seed = stableSeed(`${scene?.id || scene?.title || 'scene'}-character`);
  const tags = getTags(scene, CHARACTER_IMAGE_TAGS, TITLE_CHARACTER_HINTS);
  return buildPhotoUrl(700, 1000, tags, seed);
}

function getTags(scene, arcTags, titleHints) {
  const haystack = `${scene?.title || ''} ${scene?.text || ''} ${scene?.arc || ''}`;
  const hinted = titleHints.find(({ pattern }) => pattern.test(haystack));
  return hinted?.tags || arcTags[scene?.arc] || arcTags.default;
}

function buildPhotoUrl(width, height, tags, seed) {
  return `${PHOTO_SERVICE}/${width}/${height}/${encodeURIComponent(tags.join(','))}/all?lock=${seed}`;
}

function stableSeed(value) {
  return String(value).split('').reduce((hash, char) => ((hash * 31) + char.charCodeAt(0)) % 100000, 17) + 1000;
}
