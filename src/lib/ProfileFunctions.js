import { reforges } from "../constants/reforges.js";
import { catacombValues } from "../constants/catacomb_Values.js";
import { enchantments, allEnchants } from "../constants/enchantments.js";
import { powerstones } from "../constants/powerstones.js";
import { petXpTable } from "../constants/pet_xptable.js";
import { pets } from "../constants/pets.jsx";
import { petItems } from "../constants/pet_items.js";
import { accessories } from "../constants/accessories.js";
import { arrows } from "../constants/arrows.js";
import { gemstones } from "../constants/gemStones.js";
import { essencePerks } from "../constants/essencePerks.js";
import { itemEffectsMap } from "../constants/effects.js";

export const tiers = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE", "SPECIAL", "VERY_SPECIAL", "UNOBTAINABLE"];

// dungeon stats that do or do not scale with dungeon multiplier
const dungeonNonBoostedStats = ["CRITICAL_CHANCE", "ATTACK_SPEED", "FEROCITY", "ABILITY_DAMAGE_PERCENT", "TRUE_DEFENSE"];
const dungeonBoostedStats = ["HEALTH", "DEFENSE", "INTELLIGENCE", "STRENGTH", "CRITICAL_DAMAGE", "WALK_SPEED", "DAMAGE"];

// weapons that for some reason do no benefit from multipliers
const MODIFIER_EXCLUDED_MAGIC_WEAPONS = ["ASPECT_OF_THE_DRAGON", "GOLEM_SWORD"];
const PET_SCORE_MILESTONES = [10, 25, 50, 75, 100, 130, 175, 225, 275, 325];
const PET_SCORE_POINTS = {
  COMMON: 1,
  UNCOMMON: 2,
  RARE: 3,
  EPIC: 4,
  LEGENDARY: 5,
  MYTHIC: 6,
};

const reforgeCategories = {
  helmet: "armor",
  chestplate: "armor",
  leggings: "armor",
  boots: "armor",
  necklace: "equipment",
  cloak: "equipment",
  belt: "equipment",
  gloves: "equipment",
};

const tuningValues = {
  HEALTH: 5,
  DEFENSE: 1,
  WALK_SPEED: 1.5,
  STRENGTH: 1,
  INTELLIGENCE: 2,
  ATTACK_SPEED: 0.3,
  CRITICAL_CHANCE: 0.2,
  CRITICAL_DAMAGE: 1,
};

const armorEnchantStat = {
  growth: "HEALTH",
  protection: "DEFENSE",
  big_brain: "INTELLIGENCE",
  true_protection: "TRUE_DEFENSE",
  smarty_pants: "INTELLIGENCE",
  sugar_rush: "WALK_SPEED",
  critical: "CRITICAL_DAMAGE",
};

const categoryGroup = {
  armor: {
    0: "boots",
    1: "leggings",
    2: "chestplate",
    3: "helmet",
  },
  equipment: {
    0: "necklace",
    1: "cloak",
    2: "belt",
    3: "gloves",
  },
  weapon: {
    0: "weapon",
  },
};

const initialGearState = {
  baseStats: {},
  gemStats: {},
  reforgeStats: {},
  miscStats: {},
  dungeonStats: {},
  nonDungeonStats: {},
  statsWithModifiers: {},
  tier: "COMMON",
  category: "",
  generalCategory: "",
  referenceCategory: "",
  name: "Unequipped",
  modifier: "",
  id: "none",
  enchantments: {},
  hotPotatoCount: 0,
  rarityUpgrades: false,
  itemTier: undefined,
  gemSlots: undefined,
  baseStatBoostPercentage: undefined,
  tieredStats: false,
  itemType: "normal",
  starLevel: 0,
  dungeonStarModifier: 0,
  effects: [],
};

function resetItem(item) {
  item.baseStats = {};
  item.reforgeStats = {};
  item.gemStats = {};
  item.miscStats = {};
  item.dungeonStats = {};
  item.nonDungeonStats = {};
  item.statsWithModifiers = {};
  item.tier = "COMMON";
  item.generalCategory = "";
  item.referenceCategory = "";
  item.name = "Unequipped";
  item.modifier = "";
  item.id = "none";
  item.enchantments = {};
  item.hotPotatoCount = 0;
  item.rarityUpgrades = false;
  item.itemTier = undefined;
  item.baseStatBoostPercentage = undefined;
  item.starLevel = 0;
  item.dungeonStarModifier = 0;
  item.tieredStats = false;
  item.itemType = "normal";
  item.effects = [];
}

const initialPetState = {
  name: "Unequipped",
  level: 1,
  stats: {},
  item: "none",
  tier: "",
  minRarity: "COMMON",
  maxRarity: "COMMON",
  abilities: [],
};

const initialHitValues = {
  regular: 0,
  critHit: 0,
  firstStrikeCrit: 0,
  firstStrike: 0,
  magic: 0,
  magicFirstStrike: 0,
};

export const initialDamageMultipliers = {
  regularBaseMulti: 1,
  magicBaseMulti: 1,
  regularPostMulti: 1,
  magicPostMulti: 1,
  firstStrikeMulti: 0,
  magicFirstStrikeMulti: 0,
};

export const initialStatMultipliers = {
  HEALTH: 1,
  DEFENSE: 1,
  INTELLIGENCE: 1,
  STRENGTH: 1,
  CRITICAL_CHANCE: 1,
  CRITICAL_DAMAGE: 1,
  ATTACK_SPEED: 1,
  FEROCITY: 1,
  WALK_SPEED: 1,
  MAGIC_FIND: 1,
  TRUE_DEFENSE: 1,
  ABILITY_DAMAGE_PERCENT: 1,
};

export const godPotionStats = {
  HEALTH: 100,
  DEFENSE: 66,
  INTELLIGENCE: 100,
  STRENGTH: 98.75,
  CRITICAL_CHANCE: 25.0,
  CRITICAL_DAMAGE: 80.0,
  FEROCITY: 2.0,
  WALK_SPEED: 228.0,
  MAGIC_FIND: 88.0,
  TRUE_DEFENSE: 20.0,
};

export function allMultipliers() {
  return {
    HEALTH: 0,
    DEFENSE: 0,
    INTELLIGENCE: 0,
    STRENGTH: 0,
    CRITICAL_CHANCE: 0,
    CRITICAL_DAMAGE: 0,
    ATTACK_SPEED: 0,
    FEROCITY: 0,
    WALK_SPEED: 0,
    MAGIC_FIND: 0,
    TRUE_DEFENSE: 0,
    ABILITY_DAMAGE_PERCENT: 0,
    regularBaseMulti: 0,
    magicBaseMulti: 0,
    regularPostMulti: 0,
    magicPostMulti: 0,
    firstStrikeMulti: 0,
    magicFirstStrikeMulti: 0,
  };
}

export function defaultStats() {
  return {
    HEALTH: 0,
    DEFENSE: 0,
    INTELLIGENCE: 0,
    STRENGTH: 0,
    CRITICAL_CHANCE: 0,
    CRITICAL_DAMAGE: 0,
    ATTACK_SPEED: 0,
    FEROCITY: 0,
    WALK_SPEED: 0,
    MAGIC_FIND: 0,
    TRUE_DEFENSE: 0,
    DAMAGE: 0,
    ABILITY_MULTIPLIER: 0,
    ABILITY_DAMAGE_PERCENT: 0,
  };
}

export function defaultEssencePerks() {
  const perks = {};
  for (const perk of Object.keys(essencePerks)) {
    perks[perk] = 0;
  }
  return perks;
}

export function defaultPlayerStats() {
  return {
    ...defaultStats(),
    statCaps: {
      WALK_SPEED: 400,
    },
    HEALTH: 100,
    STRENGTH: 1,
    INTELLIGENCE: 10, //TODO: remove intelli boost fromd defuse kit
    CRITICAL_CHANCE: 30,
    CRITICAL_DAMAGE: 50,
    MAGICAL_POWER: 0,
    WALK_SPEED: 100,
    ABILITY_MULTIPLIER: 1,
    critEffectiveness: 1,
    godPotion: true,
    essencePerks: defaultEssencePerks(),
    // multipliers: { ...initialDamageMultipliers },
    // statMultipliers: { ...initialStatMultipliers },
    hitValues: { ...initialHitValues },
    updateValue(property, value) {
      if (this.statCaps[property]) this[property] = Math.min(value, this.statCaps[property]);
      else {
        this[property] = value;
      }
    },
  };
}
export function defaultSkillS() {
  return {
    FARMING: 0,
    MINING: 0,
    COMBAT: 0,
    FORAGING: 0,
    FISHING: 0,
    ENCHANTING: 0,
    ALCHEMY: 0,
    CARPENTRY: 0,
    TAMING: 0,
    CATACOMBS: 0,
    BESTIARY: 0,
    SKYBLOCK_LEVEL: 0,
  };
}

export function defaultCollections() {
  const collectons = {};
  const hypixelCollectionData = JSON.parse(localStorage.getItem("HypixelData")).collections;
  for (const [collectionCategory, collectionList] of Object.entries(hypixelCollectionData)) {
    collectons[collectionCategory] = {};
    for (const [collection, collectionInfo] of Object.entries(collectionList)) {
      collectons[collectionCategory][collectionInfo.name] = {
        apiName: collection,
        amount: 0,
        tier: 0,
        tiersRequiredAmount: collectionInfo.tiers.map((tier) => ({
          tier: tier.tier,
          amountRequired: tier.amountRequired,
        })),
        maxTier: collectionInfo.maxTiers ?? 0,
      };
    }
  }

  return collectons;
}

export function defaultGear() {
  return {
    helmet: { ...initialGearState, category: "helmet" },
    chestplate: { ...initialGearState, category: "chestplate" },
    leggings: { ...initialGearState, category: "leggings" },
    boots: { ...initialGearState, category: "boots" },
    weapon: { ...initialGearState, category: "weapon" },
    necklace: { ...initialGearState, category: "necklace" },
    cloak: { ...initialGearState, category: "cloak" },
    belt: { ...initialGearState, category: "belt" },
    gloves: { ...initialGearState, category: "gloves" },
    pet: { ...initialPetState },
  };
}

export function resetModifiers(gearPiece) {
  gearPiece.modifier = "";
  gearPiece.enchantments = {};
  gearPiece.gemStats = {};
  gearPiece.hotPotatoCount = 0;
  gearPiece.rarityUpgrades = false;
  gearPiece.itemTier = undefined;
  gearPiece.gemSlots = undefined;
  gearPiece.baseStatBoostPercentage = undefined;
  gearPiece.starLevel = 0;
}

export function createGearPiece(currentGear, newGearID, gearType) {
  if (newGearID === "none" || !currentGear) return { ...initialGearState, id: newGearID, category: gearType };

  return {
    id: newGearID,
    itemType: "normal",
    gemSlots: undefined,
    gemStats: {},
    modifier: currentGear.modifier,
    enchantments: currentGear.enchantments,
    hotPotatoCount: currentGear.hotPotatoCount,
    rarityUpgrades: currentGear.rarityUpgrades,
    itemTier: undefined,
    baseStatBoostPercentage: undefined,
    starLevel: currentGear.starLevel,
    category: gearType,
    effects: [],
  };
}

export function parseEssencePerks(perksData) {
  const perks = {};
  for (const [perk, props] of Object.entries(essencePerks)) {
    perks[perk] = perksData[props.apiName] ?? 0;
  }
  pets["ENDER DRAGON"].baseStats.CRITICAL_DAMAGE = essencePerks["Infused Dragon"][perks["Infused Dragon"]];
  return perks;
}

export async function parseApiGear(playerGear, armorData, gearType) {
  const category = categoryGroup[gearType];
  armorData.forEach(async (data, index) => {
    if (Object.keys(data) < 1) return;
    const extraAttributes = data.tag.value.ExtraAttributes.value;
    let armorPiece = createGearPiece(undefined, extraAttributes.id.value, category[index]);

    armorPiece.modifier = extraAttributes.modifier?.value ?? "";
    armorPiece.enchantments = extraAttributes.enchantments?.value
      ? Object.keys(extraAttributes.enchantments.value).reduce((enchant, key) => {
          if (allEnchants.includes(key.toLowerCase())) {
            enchant[key.toLowerCase()] = extraAttributes.enchantments.value[key].value;
          }
          return enchant;
        }, {})
      : {};
    armorPiece.hotPotatoCount = extraAttributes.hot_potato_count?.value ?? 0;
    armorPiece.rarityUpgrades = extraAttributes.rarity_upgrades?.value ? true : false;
    armorPiece.itemTier = extraAttributes.item_tier?.value ?? undefined;
    armorPiece.baseStatBoostPercentage = extraAttributes.baseStatBoostPercentage?.value
      ? extraAttributes.baseStatBoostPercentage?.value / 100.0 + 1
      : undefined;
    armorPiece.starLevel = (extraAttributes.upgrade_level?.value || extraAttributes.dungeon_item_level?.value) ?? 0;

    await addItemReferenceData(armorPiece);

    // add gem slots after reference data has set the allowed slots
    if (extraAttributes.gems) {
      const socketedGems = extraAttributes.gems.value;
      // gems in api can look like (COMBAT_0 :{} AND COMBAT_0_gem : {}) Or AMBER_0 : {}
      for (const gemSlot of Object.keys(armorPiece.gemSlots)) {
        const gemName = gemSlot.substring(0, gemSlot.indexOf("_"));
        if (socketedGems[gemSlot]) {
          armorPiece.gemSlots[gemSlot].gem = socketedGems[`${gemSlot}_gem`]?.value || gemName;
          armorPiece.gemSlots[gemSlot].cut = socketedGems[gemSlot].value?.quality?.value || socketedGems[gemSlot].value;
        }
      }
    }

    playerGear[category[index]] = armorPiece;
  });
}

export async function addItemReferenceData(item) {
  const HypixelData = JSON.parse(localStorage.getItem("HypixelData"));
  let reference = HypixelData?.[item.category]?.[item.id];
  if (!reference) {
    resetItem(item);
    return;
  }
  item.name = reference?.name ?? "";
  item.material = reference.material ?? undefined;
  item.referenceCategory = reference.category?.toLowerCase() ?? undefined;
  if (item.referenceCategory === "bow") {
  }
  item.arrow = "Flint";

  // any other weapon that is not a bow default to sword
  if (item.category === "weapon" && item.referenceCategory !== "bow") item.referenceCategory = "sword";

  // if item has tiered stats get the proper value from the stat array in the reference and save it into .stats
  item.tieredStats = reference.tiered_stats ? true : false;

  if (reference.essence_type && reference.essence_type === "CRIMSON") {
    item.itemType = "crimson";
  } else if (reference.essence_type && reference.essence_type !== "CRIMSON") {
    item.itemType = "dungeon";
  }

  item.baseStats =
    (reference.tiered_stats
      ? Object.entries(reference.tiered_stats).reduce((result, [key, value]) => {
          let boostPercentage = item.baseStatBoostPercentage ?? 1;
          result[key] = Math.ceil(value[item.itemTier > 0 ? item.itemTier - 1 : 0] * boostPercentage);
          return result;
        }, defaultStats())
      : Object.assign(defaultStats(), reference.stats)) ?? defaultStats();
  // item.dungeonItem = reference.dungeon_item ?? false;
  item.tier = reference.tier ?? "COMMON";
  item.ability_damage_scaling = reference.ability_damage_scaling ?? 1;

  item.effects = [];
  const itemEffects = itemEffectsMap[item.id];
  if (itemEffects) {
    for (const effect of itemEffects) {
      item.effects.push({ ...effect });
    }
  }

  // check for gem slots
  const gemSlotMap = new Map();
  if (reference.gemstone_slots) {
    item.gemSlots = {};
    const slots = reference.gemstone_slots;
    slots.forEach((slot) => {
      let slotType = slot.slot_type;
      gemSlotMap.set(slot.slot_type, gemSlotMap.has(slotType) ? gemSlotMap.get(slotType) + 1 : 0);
      let slotName = `${slot.slot_type}_${gemSlotMap.get(slotType)}`;
      item.gemSlots[slotName] = {
        type: slotType,
        gem: undefined,
        cut: undefined,
      };
    });
  }

  if (reference.effectsLore) item.effectsLore = reference.effectsLore;
}

export async function addGearModifierStats(gearPiece, playerskills) {
  gearPiece.reforgeStats = {};
  gearPiece.miscStats = {};
  gearPiece.gemStats = {};
  gearPiece.dungeonStats = {};
  gearPiece.nonDungeonStats = {};

  const statsWithModifiers = defaultStats();
  // read in all stats converted to uppercase cause api
  for (const [stat, value] of Object.entries(gearPiece.baseStats)) {
    statsWithModifiers[stat.toUpperCase()] = value;
  }
  const generalCategory = (reforgeCategories[gearPiece.category] || gearPiece.referenceCategory) ?? undefined;
  const reforgeTier = gearPiece.rarityUpgrades && gearPiece.tier !== "VERY_SPECIAL" ? tiers[tiers.indexOf(gearPiece.tier) + 1] : gearPiece.tier;
  const reforgeValues = reforges[generalCategory]?.[gearPiece.modifier]?.[reforgeTier] ?? undefined;

  gearPiece.generalCategory = generalCategory;

  // add reforge values
  if (reforgeValues) {
    for (const [stat, val] of Object.entries(reforgeValues)) {
      statsWithModifiers[stat] += val;
      gearPiece.reforgeStats[stat] = val;
    }
  }

  // special reforge cases
  if (gearPiece.modifier === "ancient") {
    gearPiece.reforgeStats.CRITICAL_DAMAGE = gearPiece.reforgeStats.CRITICAL_DAMAGE + playerskills.CATACOMBS || playerskills.CATACOMBS;
    statsWithModifiers.CRITICAL_DAMAGE += playerskills.CATACOMBS;
  }

  if (gearPiece.modifier === "withered") {
    gearPiece.reforgeStats.STRENGTH = gearPiece.reforgeStats.STRENGTH + playerskills.CATACOMBS || playerskills.CATACOMBS;
    statsWithModifiers.STRENGTH += playerskills.CATACOMBS;
  }

  if (gearPiece.modifier === "loving") {
    statsWithModifiers.ABILITY_MULTIPLIER += 0.05;
  }

  // potato book stat increase for non equipment
  if (generalCategory === "armor") {
    gearPiece.miscStats.HEALTH = gearPiece.hotPotatoCount * 4;
    gearPiece.miscStats.DEFENSE = gearPiece.hotPotatoCount * 2;

    statsWithModifiers.HEALTH += gearPiece.hotPotatoCount * 4;
    statsWithModifiers.DEFENSE += gearPiece.hotPotatoCount * 2;
  } else if (generalCategory !== "equipment") {
    gearPiece.miscStats.STRENGTH = gearPiece.hotPotatoCount * 2;
    gearPiece.miscStats.DAMAGE = gearPiece.hotPotatoCount * 2;

    statsWithModifiers.STRENGTH += gearPiece.hotPotatoCount * 2;
    statsWithModifiers.DAMAGE += gearPiece.hotPotatoCount * 2;
  }

  // add gemstone values
  if (gearPiece.gemSlots) {
    for (const [type, socketedGem] of Object.entries(gearPiece.gemSlots)) {
      const gem = gemstones[socketedGem.gem];
      if (!gem) continue;
      const stat = gem.STAT;
      const statValue = gem[reforgeTier] ? gem[reforgeTier][socketedGem.cut] : gem["COMMON"][socketedGem.cut];
      gearPiece.gemStats[stat] = gearPiece.gemStats[stat] + statValue || statValue;
      statsWithModifiers[stat] += statValue;
    }
  }

  // add enchant values
  if (gearPiece.enchantments && Object.keys(gearPiece.enchantments).length > 0) {
    for (const [enchant, level] of Object.entries(gearPiece.enchantments)) {
      let value = (enchantments[generalCategory]?.[enchant]?.[level] || enchantments[gearPiece.referenceCategory]?.[enchant]?.[level]) ?? undefined;
      if (armorEnchantStat[enchant] && value) {
        const stat = armorEnchantStat[enchant];
        statsWithModifiers[stat] = statsWithModifiers[stat] + value || value;
      }
    }
  }

  gearPiece.dungeonStats = { ...statsWithModifiers };
  gearPiece.nonDungeonStats = { ...statsWithModifiers };

  // add stat boost for non dungeon stats
  if (gearPiece.starLevel > 0) {
    // cap non-dungeon values at 10% increase for dungeon items 20% otherwise
    const starCap = gearPiece.itemType === "dungeon" ? 0.1 : 0.2;
    let starMultiplier = Math.min(0.02 * gearPiece.starLevel, starCap);
    for (const [stat, val] of Object.entries(gearPiece.baseStats)) {
      if (val >= 0) {
        gearPiece.nonDungeonStats[stat] += val * starMultiplier;
        // if crimson item dungeon stats will be the same as base stats
        if (gearPiece.itemType === "crimson") gearPiece.dungeonStats[stat] += val * starMultiplier;
      }
    }
  }

  // add stat boost for dungeon stats
  // TODO: uncap dungeon star modifier for master mode stats (uncomment the line below and remove other)
  // const dungeonStarAdditive = gearPiece.starLevel > 5 ? ((gearPiece.starLevel - 5) * 5) + 50 : 10 * gearPiece.starLevel;
  if (gearPiece.itemType === "dungeon") {
    const dungeonStarAdditive = gearPiece.starLevel > 5 ? 50 : 10 * gearPiece.starLevel;

    const dungeonStarModifier = (gearPiece.starLevel > 5 ? 50 : 10 * gearPiece.starLevel) / 100;
    const dungeonModifier = 1 + (catacombValues.StatModifier[playerskills.CATACOMBS] + dungeonStarAdditive) / 100;
    gearPiece.dungeonStarModifier = dungeonStarModifier;
    // stats that only get the effects of stars multiple up to 5 so a max of 1.5x boost
    for (const stat of dungeonNonBoostedStats) {
      gearPiece.dungeonStats[stat] = gearPiece.dungeonStats[stat] * (1 + dungeonStarModifier);
    }

    for (const stat of dungeonBoostedStats) {
      if (gearPiece.dungeonStats[stat] >= 0) gearPiece.dungeonStats[stat] = gearPiece.dungeonStats[stat] * dungeonModifier;
    }
  }
}

export async function calculateSkillLevels(profileData) {
  const calculatedSkills = defaultSkillS();
  const playerSkillXpValues = profileData?.player_data?.experience;
  if (!playerSkillXpValues) return calculatedSkills;
  const skillsData = JSON.parse(localStorage.getItem("HypixelData")).skills;
  const skillXpValues = {
    FARMING: 0,
    MINING: 0,
    COMBAT: 0,
    FORAGING: 0,
    FISHING: 0,
    ENCHANTING: 0,
    ALCHEMY: 0,
    CARPENTRY: 0,
    TAMING: 0,
    CATACOMBS: 0,
  };
  // get player xp values from profile
  for (let key in skillXpValues) {
    if (`SKILL_${key}` in playerSkillXpValues) skillXpValues[key] = playerSkillXpValues[`SKILL_${key}`];
  }

  for (let key in skillXpValues) {
    if (key in skillsData) {
      const skillLevelReqs = skillsData[key].levels;
      let finalLevel = 0;
      skillLevelReqs.forEach((level) => {
        if (skillXpValues[key] >= level.totalExpRequired) finalLevel++;
      });
      calculatedSkills[key] = finalLevel;
    }
  }

  let finalLevel = 0;
  const catacombsXp = profileData?.dungeons?.dungeon_types?.catacombs?.experience;

  if (catacombValues.XpTable && catacombsXp) {
    catacombValues.XpTable.forEach((xp) => {
      if (catacombsXp >= xp) {
        finalLevel++;
      }
    });
    calculatedSkills.CATACOMBS = finalLevel;
  }

  calculatedSkills.BESTIARY = profileData?.bestiary?.milestone?.last_claimed_milestone ?? 0;
  calculatedSkills.SKYBLOCK_LEVEL = Math.floor((profileData?.leveling?.experience ?? 0) / 100);
  return calculatedSkills;
}

export function parseCollectionsData(data, playerCollections) {
  if (!data) return defaultCollections();

  for (const [category, collections] of Object.entries(playerCollections)) {
    for (const [collection, info] of Object.entries(collections)) {
      const collectionData = playerCollections[category][collection];
      collectionData.amount = data[info.apiName] ?? 0;
      for (const tier of collectionData.tiersRequiredAmount) {
        if (collectionData.amount >= tier.amountRequired) {
          collectionData.tier = tier.tier;
        } else {
          break;
        }
      }
    }
  }

  return playerCollections;
}

export function updateSkillBonus(currentStats, skillName, prevLevel, newLevel) {
  const newValue = getSkillStatBoost(skillName, newLevel) - getSkillStatBoost(skillName, prevLevel);
  switch (skillName) {
    case "MINING":
      currentStats.DEFENSE += newValue;
      break;
    case "BESTIARY":
    case "CATACOMBS":
    case "CARPENTRY":
      currentStats.HEALTH += newValue;
      break;
    case "FORAGING":
      currentStats.STRENGTH += newValue;
      break;
    case "ENCHANTING":
      const abilityPercent = newLevel * 0.5 - prevLevel * 0.05;
      currentStats.INTELLIGENCE += newValue;
      currentStats.ABILITY_DAMAGE_PERCENT += abilityPercent;
      break;
    case "ALCHEMY":
      currentStats.INTELLIGENCE += newValue;
      break;
    case "FARMING":
    case "FISHING":
      currentStats.HEALTH += newValue;
      break;
    case "COMBAT":
      currentStats.CRITICAL_CHANCE += newValue;
      break;
    case "SKYBLOCK_LEVEL":
      let strength = Math.floor(newLevel / 5) - Math.floor(prevLevel / 5);
      let healthPerLevel = newLevel * 5 - prevLevel * 5;
      currentStats.HEALTH += healthPerLevel;
      currentStats.STRENGTH += strength;
      break;
  }
}

export function getSkillStatBoost(skill, level) {
  switch (skill) {
    case "MINING":
    case "FORAGING":
    case "ENCHANTING":
    case "ALCHEMY":
      if (level < 15) return level;
      else {
        return (level - 14) * 2 + 14;
      }
    case "FARMING":
    case "FISHING":
      let skillBonus = 0;
      for (let levelCap = 1; levelCap <= level; ++levelCap) {
        skillBonus += 2;
        if (levelCap >= 15) skillBonus += 1;
        if (levelCap >= 20) skillBonus += 1;
        if (levelCap >= 26) skillBonus += 1;
      }
      return skillBonus;
    case "COMBAT":
      return level * 0.5;
    case "CARPENTRY":
    case "BESTIARY":
      return level;
    default:
      return 0;
  }
}

// parse the pets section of the api obtaining the pet score and any active pet
export function parsePetApiData(petsApi) {
  let magicFindBonus = 0;
  let petScore = 0;
  let activePet = undefined;
  const uniquePetRarityMap = new Map();

  // add and filter pets taking the highest rarity
  petsApi.forEach((pet) => {
    if (
      !uniquePetRarityMap.has(pet.type) ||
      (uniquePetRarityMap.has(pet.type) && tiers.indexOf(pet.tier) > tiers.indexOf(uniquePetRarityMap.get(pet.type)))
    ) {
      uniquePetRarityMap.set(pet.type, pet.tier);
    }
    if (pet.active) activePet = pet;
  });

  uniquePetRarityMap.forEach((value, key) => {
    petScore += PET_SCORE_POINTS[value] ?? 0;
  });

  for (const milestone of PET_SCORE_MILESTONES) {
    if (petScore >= milestone) {
      magicFindBonus += 1;
    } else {
      break;
    }
  }
  return { magicFindBonus: magicFindBonus, activePet: activePet };
}

export function addStats(baseStats, newStats) {
  for (let stat in newStats) {
    if (stat.toUpperCase() in baseStats) {
      baseStats[stat.toUpperCase()] += newStats[stat];
    }
  }
}

export function changeGearPiece(currentGear, newGear) {
  // get new item's data
  addItemReferenceData(newGear);

  // reset modifiers if categories are not the same, mainly for changing from sword or bow
  if (currentGear.referenceCategory !== newGear.referenceCategory) resetModifiers(newGear);
}

export function removeStats(baseStats, newStats) {
  for (let stat in newStats) {
    if (stat in baseStats) baseStats[stat.toUpperCase()] -= newStats[stat.toUpperCase()];
  }
}

// Get stat bonuses from slayer claimed level, operates on the assumption that the player has claimed all levels
export function getSlayerBonusStats(profileData) {
  const slayerStats = defaultStats();
  const slayerAPI = profileData?.slayer?.slayer_bosses;
  if (!slayerAPI) return;
  for (let slayer in slayerAPI) {
    const claimedMap = new Map();
    const claimedArray = slayerAPI[slayer].claimed_levels ? Object.keys(slayerAPI[slayer].claimed_levels) : [];
    claimedArray.forEach((element, index) => {
      claimedMap.set(element.replace("_special", ""), index);
    });
    const slayerLevel = claimedMap.size;
    //const slayerLevel = slayerAPI[slayer].claimed_levels ? Object.keys(slayerAPI[slayer].claimed_levels).filter(key => !key.includes('special')) : 0;

    //console.log(slayerAPI[slayer].claimed_levels);
    switch (slayer) {
      case "zombie":
        const zombieSlayerStats = {
          0: {},
          1: { HEALTH: 2 },
          2: { HEALTH: 4 },
          3: { HEALTH: 7 },
          4: { HEALTH: 10 },
          5: { HEALTH: 14 },
          6: { HEALTH: 18 },
          7: { HEALTH: 23 },
          8: { HEALTH: 28 },
          9: { HEALTH: 34 },
        };

        for (const [stat, value] of Object.entries(zombieSlayerStats[slayerLevel])) {
          slayerStats[stat] += value;
        }
        break;
      case "spider":
        const spiderSlayerStats = {
          0: {},
          1: { CRITICAL_DAMAGE: 1 },
          2: { CRITICAL_DAMAGE: 2 },
          3: { CRITICAL_DAMAGE: 3 },
          4: { CRITICAL_DAMAGE: 4 },
          5: { CRITICAL_DAMAGE: 6 },
          6: { CRITICAL_DAMAGE: 8 },
          7: { CRITICAL_DAMAGE: 10 },
          8: { CRITICAL_DAMAGE: 10 },
          9: { CRITICAL_DAMAGE: 10 },
        };

        for (const [stat, value] of Object.entries(spiderSlayerStats[slayerLevel] ?? 9)) {
          slayerStats[stat] += value;
        }
        break;
      case "wolf":
        const wolfSlayerStats = {
          0: {},
          1: { WALK_SPEED: 1 },
          2: { WALK_SPEED: 1, HEALTH: 2 },
          3: { WALK_SPEED: 2, HEALTH: 2 },
          4: { WALK_SPEED: 2, HEALTH: 4 },
          5: { WALK_SPEED: 2, HEALTH: 4, CRITICAL_DAMAGE: 1 },
          6: { WALK_SPEED: 2, HEALTH: 7, CRITICAL_DAMAGE: 1 },
          7: { WALK_SPEED: 2, HEALTH: 7, CRITICAL_DAMAGE: 3 },
          8: { WALK_SPEED: 3, HEALTH: 7, CRITICAL_DAMAGE: 3 },
          9: { WALK_SPEED: 3, HEALTH: 12, CRITICAL_DAMAGE: 3 },
        };
        for (const [stat, value] of Object.entries(wolfSlayerStats[slayerLevel] ?? 9)) {
          slayerStats[stat] += value;
        }
        break;
      case "enderman":
        const endermanSlayerStats = {
          0: {},
          1: { HEALTH: 1 },
          2: { HEALTH: 1, INTELLIGENCE: 2 },
          3: { HEALTH: 3, INTELLIGENCE: 2 },
          4: { HEALTH: 3, INTELLIGENCE: 4 },
          5: { HEALTH: 6, INTELLIGENCE: 4 },
          6: { HEALTH: 6, INTELLIGENCE: 9 },
          7: { HEALTH: 10, INTELLIGENCE: 9 },
          8: { HEALTH: 10, INTELLIGENCE: 9 },
          9: { HEALTH: 10, INTELLIGENCE: 9 },
        };
        for (const [stat, value] of Object.entries(endermanSlayerStats[slayerLevel] ?? 9)) {
          slayerStats[stat] += value;
        }
        break;
      case "blaze":
        const blazeSlayerStats = {
          0: {},
          1: { HEALTH: 3 },
          2: { HEALTH: 3, STRENGTH: 1 },
          3: { HEALTH: 7, STRENGTH: 1 },
          4: { HEALTH: 7, STRENGTH: 1, TRUE_DEFENSE: 1 },
          5: { HEALTH: 12, STRENGTH: 1, TRUE_DEFENSE: 1 },
          6: { HEALTH: 12, STRENGTH: 3, TRUE_DEFENSE: 1 },
          7: { HEALTH: 18, STRENGTH: 3, TRUE_DEFENSE: 1 },
          8: { HEALTH: 18, STRENGTH: 3, TRUE_DEFENSE: 3 },
          9: { HEALTH: 25, STRENGTH: 3, TRUE_DEFENSE: 3 },
        };
        for (const [stat, value] of Object.entries(blazeSlayerStats[slayerLevel] ?? 9)) {
          slayerStats[stat] += value;
        }
        break;
    }
  }
  return slayerStats;
}

// TODO: Tuning
export function parseAPIAccessoryBag(accessoryBagData, abiphoneContacts) {
  const hypixelData = JSON.parse(localStorage.getItem("HypixelData"));
  const accessorySets = accessories.sets;
  const dynamicAccessories = accessories.dynamic;
  const unfilterdAccessories = {};
  const filterdAccessories = {};

  // this array is reserved for talisman that share the same keyword for a tiered talisman set but are not a part of a tiered set
  const blackListedTalisman = ["WOLF_PAW"];
  accessoryBagData.forEach((accessory) => {
    try {
      // if slot is not empty
      if (Object.keys(accessory).length > 0) {
        const newAccessory = {};
        const extraAttributes = accessory.tag.value.ExtraAttributes.value;
        let hasLoreStats = false;
        let id = extraAttributes.id.value;
        let tempId = extraAttributes.id.value;

        // special check for crab hat because 2022 version not in api
        if (id.includes("CRAB")) id = "PARTY_HAT_CRAB";

        // check if abiphone and add a special property for contact count
        if (id.includes("ABICASE") && abiphoneContacts) {
          newAccessory.ContactCount = Math.floor(abiphoneContacts.length / 2) ?? 0;
        }
        let accKeyword = id.substring(0, id.lastIndexOf("_") + 1);
        if (blackListedTalisman.includes(id)) {
          accKeyword = id;
        }
        const reference = hypixelData.accessories[id];

        if (tempId === "PARTY_HAT_CRAB_ANIMATED") id = "PARTY_HAT_CRAB_ANIMATED";

        // if accessory is dynamic check its rarity and any stats from its lore
        if (dynamicAccessories.includes(accKeyword)) {
          let lore = accessory.tag.value.display.value.Lore.value.value;
          let accStats = defaultStats();

          //console.log(lore);
          lore.forEach((loreLine) => {
            let filtered = loreLine
              .toUpperCase()
              .replace(/^[^a-zA-Z]*([a-zA-Z].*)$/, "$1")
              .replaceAll(" ", "_")
              .replaceAll("❤", "");
            let stat = filtered.substring(0, filtered.indexOf(":")).toUpperCase();
            let val = parseFloat(filtered.substring(filtered.indexOf("+") + 1, filtered.lastIndexOf("_")));

            // special check for new years cake bag to get current health bonus, the lore can change and be Value: health instead
            // of current bonus: health
            if ((stat === "CURRENT_BONUS" || stat === "VALUE") && id === "NEW_YEAR_CAKE_BAG") stat = "HEALTH";

            // special check to change speed to walk_speed
            if (stat === "SPEED") stat = "WALK_SPEED";

            // check if the loreline ends with the value
            if (filtered.indexOf("+") > filtered.lastIndexOf("_")) val = parseFloat(filtered.substring(filtered.indexOf("+") + 1));

            if (stat in accStats) {
              hasLoreStats = true;
              accStats[stat] = val;
            }
          });
          if (hasLoreStats) {
            newAccessory.stats = { ...accStats };
          }

          // rarity is at the last index of the lore array
          newAccessory.tier = getRarityFromLore(lore[lore.length - 1]);
          newAccessory.loreRarity = true;
          newAccessory.refTier = reference.tier;

          // if no rarity is found default to common
          if (newAccessory.refTier === undefined) newAccessory.refTier = "COMMON";
        } else if ("tier" in reference) {
          newAccessory.tier = reference.tier;
          newAccessory.refTier = reference.tier;
        } else {
          newAccessory.tier = "COMMON";
          newAccessory.refTier = "COMMON";
        }

        // check for enrichment
        if ("talisman_enrichment" in extraAttributes) {
          newAccessory.talisman_enrichment = extraAttributes.talisman_enrichment.value;
        }

        // check for rarity upgrade
        if ("rarity_upgrades" in extraAttributes && newAccessory.tier !== "VERY_SPECIAL" && !newAccessory.loreRarity) {
          newAccessory.tier = tiers[tiers.indexOf(newAccessory.tier) + 1];
        }

        // check for stats unless it they were read in from the lore
        if (hasLoreStats === false && "stats" in reference) newAccessory.stats = reference.stats;

        // check if acc id is part of a set
        for (let set in accessorySets) {
          if (id in accessorySets[set]) {
            accKeyword = set;
          }
        }

        unfilterdAccessories[accKeyword] = { ...unfilterdAccessories[accKeyword] };
        if (!(id in unfilterdAccessories[accKeyword])) {
          unfilterdAccessories[accKeyword] = { ...unfilterdAccessories[accKeyword], [id]: newAccessory };
        }
      }
    } catch (err) {
      console.error(`Unable to parse ${accessory.tag.value.ExtraAttributes.value.id.value}`);
    }
  });
  // remove accessories of the same upgrade tree, keeping the highest default tier
  for (let accKeyword in unfilterdAccessories) {
    // if there are more than 1 accessories for the keyword loop through and remove the lowest tier until the highest remains
    if (Object.keys(unfilterdAccessories[accKeyword]).length > 1) {
      let dupesAcc = unfilterdAccessories[accKeyword];
      while (Object.keys(dupesAcc).length > 1) {
        let acc1 = Object.keys(dupesAcc)[0];
        let acc2 = Object.keys(dupesAcc)[1];
        if (accKeyword === "Party_Hat" && accessorySets[accKeyword][acc1] > accessorySets[accKeyword][acc2]) {
          delete dupesAcc[acc2];
        } else if (tiers.indexOf(dupesAcc[acc1].refTier) > tiers.indexOf(dupesAcc[acc2].refTier)) {
          delete dupesAcc[acc2];
        } else {
          delete dupesAcc[acc1];
        }
      }
    }
  }

  //filter accessory list by removing the keywords and replace them with the accessory for that keyword
  for (let accKeyword in unfilterdAccessories) {
    const id = Object.keys(unfilterdAccessories[accKeyword])[0];
    const acc = Object.values(unfilterdAccessories[accKeyword])[0];
    filterdAccessories[id] = acc;
  }

  return filterdAccessories;
}

export function getRarityFromLore(lore) {
  const loreLine = lore.replace(/.*?§[a-z](?=[A-Z])/g, "");
  return loreLine.substring(0, loreLine.indexOf(" ")).trim();
}

export function getMagicalPower(accessoryList) {
  let magicalPower = 0;
  for (let accessory in accessoryList) {
    if (accessory.includes("ABICASE")) magicalPower += accessoryList[accessory].ContactCount;

    switch (accessoryList[accessory].tier) {
      case "COMMON":
        magicalPower += 3;
        break;
      case "UNCOMMON":
        magicalPower += 5;
        break;
      case "RARE":
        magicalPower += 8;
        break;
      case "EPIC":
        magicalPower += 12;
        break;
      case "LEGENDARY":
        magicalPower += 16;
        if (accessory === "HEGEMONY_ARTIFACT") magicalPower += 16;
        break;
      case "MYTHIC":
        magicalPower += 22;
        if (accessory === "HEGEMONY_ARTIFACT") magicalPower += 22;
        break;
      case "SPECIAL":
        magicalPower += 3;
        break;
      case "VERY_SPECIAL":
        magicalPower += 5;
        break;
      default:
        break;
    }
  }
  return magicalPower;
}

export function getMagicalMultiplier(magicalPower) {
  const log = Math.log(0.0019 * magicalPower + 1);
  const pow = Math.pow(log, 1.2);
  return 29.97 * pow;
}

export function getMelodyIntelligence(profileData) {
  const harpRewards = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 1, 1];
  const harpQuest = profileData?.quests?.harp_quest;
  let songCompletions = 0;
  let intelligenceBonus = 0.0;

  if (!harpQuest) return 0;

  for (const song in harpQuest) {
    if (song.includes("best_completion")) {
      ++songCompletions;
    }
  }

  for (let index = 0; index < songCompletions && index < harpRewards.length; ++index) {
    intelligenceBonus += harpRewards[index];
  }

  return intelligenceBonus;
}

export function addAccessoryStats(baseStats, accessories) {
  // speed exist because at one point I saw it in there as speed instead of WALK_SPEED
  const enrichmentValues = {
    SPEED: 1,
    WALK_SPEED: 1,
    INTELLIGENCE: 2,
    CRITICAL_CHANCE: 1,
    CRITICAL_DAMAGE: 1,
    STRENGTH: 1,
    DEFENSE: 1,
    HEALTH: 3,
    MAGIC_FIND: 0.5,
    FEROCITY: 0.3,
    SEA_CREATURE_CHANCE: 0.3,
    ATTACK_SPEED: 0.5,
  };

  // add stats to base stats if any exist for the accessory
  for (const [acc, { stats, talisman_enrichment }] of Object.entries(accessories)) {
    if (stats !== undefined) {
      addStats(baseStats, stats);
    }

    // read in any enrichment stat values
    if (talisman_enrichment !== undefined) {
      if (talisman_enrichment.toUpperCase() === "SPEED") baseStats.WALK_SPEED += enrichmentValues.SPEED;
      else if (talisman_enrichment.toUpperCase() in baseStats) {
        baseStats[talisman_enrichment.toUpperCase()] += enrichmentValues[talisman_enrichment.toUpperCase()];
      }
    }
  }
}

export function getPowerstoneStats(powerstone, magicalPower) {
  // return if there is no powerstone selected or supported
  if (powerstone === "None" || !powerstones[powerstone.toLowerCase()]) return;

  // get stats associated with powerstone
  const powerstoneStats = {};
  const magicalMultiplier = getMagicalMultiplier(magicalPower);
  const uniqueValues = powerstones[powerstone.toLowerCase()]?.unique;
  const baseLevelValues = powerstones[powerstone.toLowerCase()]?.base;

  // read in values that scale with magical power
  for (const [stat, value] of Object.entries(baseLevelValues)) {
    powerstoneStats[stat] = (powerstoneStats[stat] || 0) + value * magicalMultiplier;
  }
  // read in static values from the unique stats for that powerstone
  for (const [stat, value] of Object.entries(uniqueValues)) {
    powerstoneStats[stat] = (powerstoneStats[stat] || 0) + value;
  }

  return powerstoneStats;
}

export function parsePet(petAPiData) {
  const pet = { ...initialPetState };
  const name = petAPiData.type.replaceAll('_',' ') ?? "";

  // make sure pet is supported
  if (!pets[name]) return pet;

  pet.name = name;
  pet.level = calculatePetLevel(petAPiData.exp, petAPiData.tier);
  pet.item = petItems[petAPiData.heldItem] ?? "none";
  pet.tier = petAPiData.tier;
  // pet.abilities = [...petValues.abilities];
  setNewPet(pet);
  //getPetStats(pet);
  return pet;
}

export function setNewPet(pet) {
  const petValues = pets[pet.name];

  // reset some pet values if no pet values exist for the pet name
  if (!petValues) {
    pet.level = 0;
    pet.stats = {};
    pet.minRarity = "COMMON";
    pet.maxRarity = "COMMON";
    pet.tier = "COMMON";
    pet.item = "none";
    pet.abilities = [];
    return;
  }

  if (pet.name != "GOLDEN DRAGON") {
    pet.level = Math.min(pet.level, 100);
  }

  // update new min/max rarities
  pet.minRarity = petValues.minRarity;
  pet.maxRarity = petValues.maxRarity;

  // determine if tier should stay or revert to the new pet max tier
  if (tiers.indexOf(pet.tier) < tiers.indexOf(pet.minRarity) || tiers.indexOf(pet.tier) > tiers.indexOf(pet.maxRarity)) pet.tier = pet.minRarity;

  // update abilities
  pet.abilities = [...petValues.abilities];
  getPetStats(pet);
}

export function getPetStats(pet) {
  const petValues = pets[pet.name];

  // reset some pet values if no pet values exist for the pet name
  if (!petValues) {
    pet.stats = defaultStats();
    pet.abilities = [];
    return;
  }

  // init base stats
  const stats = {
    ...defaultStats(),
    ...petValues.baseStats,
  };

  // read in stat values based on pet level
  for (const [stat, statPerLevel] of Object.entries(petValues.statsPerLevel)) {
    stats[stat] += statPerLevel * pet.level;
  }

  // apply effects from pet item to stats
  if (pet.item && pet.item.name !== "none") {
    switch (pet.item.effect) {
      // additive effect contains an object of literal values to be added
      case "additive":
        for (const [stat, value] of Object.entries(pet.item.modifiedStats)) {
          stats[stat] += value;
        }
        break;
      // multiplicative contains a value to multiply an array of stats by
      case "multiplicative":
        const multValue = pet.item.amount;
        if (pet.item.modifiedStats[0] === "all") {
          const multipler = pet.item.amount + 1;
          for (const [stat, value] of Object.entries(stats)) {
            stats[stat] = value * multipler;
          }
        } else {
          for (const stat of pet.item.modifiedStats) {
            stats[stat] += stats[stat] * multValue;
          }
        }
        break;
      default:
        break;
    }
  }

  pet.stats = stats;
}

export function tuningPointsToStats(tuningPoints) {
  const stats = defaultStats();
  for (const [stat, points] of Object.entries(tuningPoints)) {
    const statValue = tuningValues[stat.toUpperCase()] * points;
    stats[stat.toUpperCase()] += statValue;
  }
  return stats;
}

function calculatePetLevel(petXp, tier) {
  const xpValues = tier === "MYTHIC" ? petXpTable["LEGENDARY"] : petXpTable[tier];
  let level = 0;

  for (const xpThreshold of xpValues) {
    if (petXp >= xpThreshold) level += 1;
    else {
      break;
    }
  }

  return level;
}

export function calculateDamage(profileState) {
  const playerGear = profileState.playerGear;
  const playerSkills = profileState.playerSkills;
  const targetMob = profileState.targetMob;
  const stats = profileState.finalStats;

  const damageType = stats.hitValues;
  if (playerGear.weapon.name === "Unequipped") {
    return;
  }

  const multipliers = profileState.damageMultipliers;
  const abilityDamagePercent = 1 + stats.ABILITY_DAMAGE_PERCENT / 100;
  const enchantList = enchantments[playerGear.weapon.referenceCategory];

  if (playerSkills.COMBAT > 50) {
    const value = 2 + (playerSkills.COMBAT - 50) * 0.01;
    multipliers.regularBaseMulti += value;
    multipliers.magicBaseMulti += value;
  } else {
    const value = playerSkills.COMBAT * 0.04;
    multipliers.regularBaseMulti += value;
    multipliers.magicBaseMulti += value;
  }

  if (stats.godPotion && playerGear.weapon.referenceCategory === "bow") {
    multipliers.regularBaseMulti += 0.8;
  }

  const enchants = Object.entries(playerGear.weapon.enchantments);

  for (const [enchant, level] of enchants) {
    const enchantValue = enchantList[enchant][level] / 100;
    switch (enchant) {
      case "sharpness":
        multipliers.regularBaseMulti += enchantValue;
        break;
      case "ultimate_one_for_all":
        multipliers.regularBaseMulti += enchantValue;
        multipliers.magicBaseMulti += enchantValue;
        break;
      case "smite":
        if (targetMob === "Zombie" || targetMob === "Skeleton" || targetMob === "Pigmen" || targetMob === "Withers") {
          multipliers.regularBaseMulti += enchantValue;
          multipliers.magicBaseMulti += enchantValue;
        }
        break;
      case "bane_of_arthropods":
        if (targetMob === "Spider") {
          multipliers.regularBaseMulti += enchantValue;
          multipliers.magicBaseMulti += enchantValue;
        }
        break;
      case "cubism":
        if (targetMob === "Slimes" || targetMob === "Creeper" || targetMob === "Magma Cube") {
          multipliers.regularBaseMulti += enchantValue;
          multipliers.magicBaseMulti += enchantValue;
        }
        break;
      case "impaling":
        if (targetMob === "Sea Creature" || targetMob === "Lava Sea Creature") {
          multipliers.regularBaseMulti += enchantValue;
          multipliers.magicBaseMulti += enchantValue;
        }
        break;
      case "ender_slayer":
        if (targetMob === "Enderman") {
          multipliers.regularBaseMulti += enchantValue;
          multipliers.magicBaseMulti += enchantValue;
        }
        break;
      case "first_strike":
        //multipliers.regularBaseMulti += enchantValue;
        multipliers.firstStrikeMulti += enchantValue;
        break;
      case "triple_strike":
        //multipliers.regularBaseMulti += enchantValue;
        multipliers.firstStrikeMulti += enchantValue;
        break;
      case "power":
        multipliers.regularBaseMulti += enchantValue;
        break;
      case "giant_killer":
        // todo: add place for mob health
        let enchantPercentage = ((10000000 - stats.HEALTH) / stats.HEALTH) * enchantValue;
        const percentages = {
          1: 5,
          2: 10,
          3: 15,
          4: 20,
          5: 30,
          6: 45,
          7: 65,
        };
        const maxPercentage = percentages[level];
        if (enchantPercentage > maxPercentage) enchantPercentage = maxPercentage;
        else if (enchantPercentage < 0) enchantPercentage = 0;
        multipliers.regularBaseMulti += enchantPercentage / 100;
        multipliers.magicBaseMulti += enchantPercentage / 100;
        break;
      case "prosecute":
        // TODO: since I do not currently track current health this works otherwise i
        // need to (currentH / maxH)
        multipliers.regularBaseMulti += enchantValue * 100;
        multipliers.magicBaseMulti += enchantValue * 100;
        break;
      default:
        break;
    }
  }
  multipliers.firstStrikeMulti += multipliers.regularBaseMulti;
  multipliers.magicFirstStrikeMulti += multipliers.regularBaseMulti;

  const baseDamage = (5 + stats.DAMAGE) * (1 + stats.STRENGTH / 100.0) * multipliers.regularPostMulti;
  damageType.regular = baseDamage * multipliers.regularBaseMulti;
  damageType.critHit = damageType.regular * (1 + (stats.CRITICAL_DAMAGE * stats.critEffectiveness) / 100.0);

  damageType.firstStrike = baseDamage * multipliers.firstStrikeMulti;
  damageType.firstStrikeCrit = damageType.firstStrike * (1 + (stats.CRITICAL_DAMAGE * stats.critEffectiveness) / 100.0);

  // do magic damage calculations if the weapon has ability damage TODO:dungeon?
  if (playerGear.weapon?.nonDungeonStats?.WEAPON_ABILITY_DAMAGE) {
    const weaponAbilityDamage = playerGear.weapon.nonDungeonStats.WEAPON_ABILITY_DAMAGE;
    const abilityDamage = weaponAbilityDamage * (1 + (stats.INTELLIGENCE / 100.0) * playerGear.weapon.ability_damage_scaling) * abilityDamagePercent;
    if (MODIFIER_EXCLUDED_MAGIC_WEAPONS.includes(playerGear.weapon.id)) {
      damageType.magic = abilityDamage * stats.ABILITY_MULTIPLIER;
      damageType.magicFirstStrike = damageType.magic;
    } else {
      const modifiedDamage = abilityDamage * multipliers.magicPostMulti * stats.ABILITY_MULTIPLIER;
      damageType.magic = modifiedDamage * multipliers.magicBaseMulti;
      damageType.magicFirstStrike = modifiedDamage * multipliers.magicFirstStrikeMulti;
    }
  }
}

export function getArmorSetKeyword(itemID) {
  if (itemID.lastIndexOf("_") >= 0 && !itemID.includes("HAT") && !itemID.includes("MASK")) return itemID.substring(0, itemID.lastIndexOf("_"));
  return itemID;
}

export function finalStats(profileState) {
  const playerGear = profileState.playerGear;
  const baseStats = profileState.basePlayerStats;
  const skills = profileState.playerSkills;
  const targetMob = profileState.targetMob;
  const dungeonMode = profileState.dungeonMode;
  const pet = playerGear.pet;

  const finalStats = {
    ...baseStats,
    hitValues: { ...initialHitValues },
    statCaps: { WALK_SPEED: 400 },
  };

  let armorSets = {};

  const effects = [];
  const postEffects = [];
  const flatEffects = [];

  // reset multipliers
  profileState.statMultipliers = { ...initialStatMultipliers };
  profileState.damageMultipliers = { ...initialDamageMultipliers };
  profileState.finalStats = finalStats;

  const statMultipliers = profileState.statMultipliers;
  const damageMultipliers = profileState.damageMultipliers;

  for (const [stat, multi] of Object.entries(statMultipliers)) {
    statMultipliers[stat] += profileState.additionalMultiplers[stat];
  }

  for (const [stat, multi] of Object.entries(initialDamageMultipliers)) {
    damageMultipliers[stat] += profileState.additionalMultiplers[stat];
  }

  const effectTypes = {
    normal: effects,
    post: postEffects,
    flat: flatEffects,
  };

  // add catacombs health boost if dungeon mode
  if (dungeonMode) {
    finalStats.HEALTH += skills.CATACOMBS * 2;
  }

  for (const gear of ["helmet", "chestplate", "leggings", "boots", "weapon"]) {
    const gearPiece = playerGear[gear];
    addGearModifierStats(gearPiece, skills);

    if (gearPiece.modifier === "renowned") {
      for (const [stat, multi] of Object.entries(statMultipliers)) {
        statMultipliers[stat] += 0.01;
      }
    }
    if (gearPiece.modifier === "spiked" || gearPiece.modifier === "renowned") {
      const attackSpeedBonus = essencePerks["Two-Headed Spike"][baseStats.essencePerks["Two-Headed Spike"]];
      gearPiece.dungeonStats.ATTACK_SPEED += attackSpeedBonus;
      gearPiece.nonDungeonStats.ATTACK_SPEED += attackSpeedBonus;
      gearPiece.reforgeStats.ATTACK_SPEED += attackSpeedBonus;
    }
    // commented out as it is for master mode stats
    //const dungeonStarBonus = playerGear[gear].starLevel > 5 ? ((playerGear[gear].starLevel - 5) * 5) + 50 : 10 * playerGear[gear].starLevel;
    const dungeonStarBonus = playerGear[gear].starLevel > 5 ? 50 : 10 * playerGear[gear].starLevel;

    // set dungeon stats modifier if the item is a dungeon item (can be starred)
    if (playerGear[gear].itemType === "dungeon") {
      playerGear[gear].dungeonStats.dungeonModifier = 1 + (catacombValues.StatModifier[skills.CATACOMBS] + dungeonStarBonus) / 100;
    } else {
      playerGear[gear].dungeonStats.dungeonModifier = 1;
    }

    let gearStats = dungeonMode ? gearPiece.dungeonStats : gearPiece.nonDungeonStats;
    for (const [stat, val] of Object.entries(gearStats)) {
      finalStats[stat] += val;
    }

    // check for ultimate wisdom the enchant is a flat bonus to intelligence
    const ultimateWisdomLevel = gearPiece.enchantments.ultimate_wisdom;
    if (ultimateWisdomLevel) {
      const enchantValue = enchantments.armor.ultimate_wisdom[ultimateWisdomLevel];
      finalStats.INTELLIGENCE += enchantValue;
    }
  }

  // Read in equipment stats the same for each mode
  // TODO: figure out the dungeon equipment I think got added to the game
  for (const gear of ["necklace", "cloak", "belt", "gloves"]) {
    const gearPiece = playerGear[gear];
    addGearModifierStats(gearPiece, skills);
    for (const [stat, val] of Object.entries(gearPiece.nonDungeonStats)) {
      finalStats[stat] += val;
    }
  }

  // filter post effect pet abilities
  for (const ability of pet.abilities) {
    if (ability.postEffect && tiers.indexOf(pet.tier) >= tiers.indexOf(ability.minRarity) && ability.enabled) postEffects.push(ability);
  }

  // ability order; armor effects -> pet effects -> post pet effects -> post armor effects
  for (const [_, properties] of Object.entries(playerGear)) {
    const itemEffects = properties.effects;
    // update armor set counter
    if (itemEffects) {
      for (const effect of itemEffects) {
        if (!effect.enabled) continue;
        if (effect.setEffect) {
          armorSets[effect.name] = armorSets[effect.name] ? armorSets[effect.name] + 1 : 1;
        }
        if (armorSets[effect.name] < effect.required) continue;
        if (effect.postEffect) {
          postEffects.push(effect);
        } else {
          effects.push(effect);
        }
      }
    }
  }

  profileState.armorSets = armorSets;

  // filter non post effect pet abilities
  for (const ability of pet.abilities) {
    if (!ability.postEffect && tiers.indexOf(pet.tier) >= tiers.indexOf(ability.minRarity) && ability.enabled) effects.push(ability);
  }

  // add pet stats
  if (playerGear.pet.stats) {
    for (const [stat, value] of Object.entries(playerGear.pet.stats)) {
      finalStats[stat] += value;
    }
  }

  // apply all effects based on resultType
  for (const type of ["normal", "post", "flat"]) {
    const effects = effectTypes[type];
    // add multipliers before post effects
    if (type === "post") {
      for (const [stat, multiplier] of Object.entries(statMultipliers)) {
        finalStats.updateValue(stat, (finalStats[stat] ?? 0) * multiplier);
      }
    }

    for (const effect of effects) {
      // pass pet level and tier for pet abilites, armor effects ignore these parameters as they do not take any
      if (effect.resultType) {
        const values = effect.effectResults(pet.level, pet.tier);
        const condition = effect.condition;
        // check condition is met
        if (condition) {
          switch (condition.requirement) {
            case "targetMob":
              if (!condition.validParameters.includes(targetMob)) continue;
              break;
            case "weapon":
              if (!condition.validParameters.includes(playerGear.weapon.id)) continue;
              break;
            default:
              break;
          }
        }
        switch (effect.resultType) {
          case "globalMultiplier-add":
            for (const [stat, value] of Object.entries(values)) {
              statMultipliers[stat] += value;
            }
            break;
          case "globalMultiplier-add-all":
            for (const [stat, value] of Object.entries(statMultipliers)) {
              statMultipliers[stat] += values.percentage;
            }
            break;
          case "globalMultiplier-multi-all":
            for (const [stat, value] of Object.entries(statMultipliers)) {
              statMultipliers[stat] = value * values.percentage;
            }
            break;
          case "globalMultiplier-multi":
            for (const [stat, value] of Object.entries(values)) {
              statMultipliers[stat] = statMultipliers[stat] * value;
            }
            break;
          case "combatMulti":
            statMultipliers.HEALTH = statMultipliers.HEALTH * values.percentage;
            statMultipliers.DEFENSE = statMultipliers.DEFENSE * values.percentage;
            statMultipliers.STRENGTH = statMultipliers.STRENGTH * values.percentage;
            statMultipliers.CRITICAL_DAMAGE = statMultipliers.CRITICAL_DAMAGE * values.percentage;
            statMultipliers.CRITICAL_CHANCE = statMultipliers.CRITICAL_CHANCE * values.percentage;
            break;
          case "basicStats":
            for (const [stat, value] of Object.entries(values)) {
              finalStats.updateValue(stat, finalStats[stat] + value);
            }
            break;
          case "postMultiplier":
            damageMultipliers.regularPostMulti *= values;
            damageMultipliers.magicPostMulti *= values;

            break;
          case "statBasedOnSkill":
            for (const [skill, stats] of Object.entries(values)) {
              for (const stat in stats) {
                finalStats.updateValue(stat, finalStats[stat] + stats[stat] * skills[skill]);
              }
            }
            break;
          case "blackCatSpeed":
            const speedBuff = values.WALK_SPEED;

            // set speed to default speed (400) + value from pet
            finalStats.statCaps = { ...finalStats.statCaps, ["WALK_SPEED"]: speedBuff + 400 };
            finalStats.updateValue("WALK_SPEED", finalStats.WALK_SPEED + speedBuff);
            break;
          case "doubleBooks":
            for (const armor of ["helmet", "chestplate", "leggings", "boots", "weapon"]) {
              const properties = playerGear[armor];
              const dungeonModifier = properties.dungeonStats.dungeonModifier;
              if (properties.hotPotatoCount > 0) {
                //console.log(playerGear[armor].dungeonStats.dungeonModifier);
                if (armor === "weapon") {
                  properties.miscStats.STRENGTH += properties.hotPotatoCount * 2;
                  properties.miscStats.DAMAGE += properties.hotPotatoCount * 2;

                  finalStats.updateValue("STRENGTH", finalStats.STRENGTH + properties.hotPotatoCount * 2);
                  finalStats.updateValue("DAMAGE", finalStats.DAMAGE + properties.hotPotatoCount * 2);

                  properties.nonDungeonStats.STRENGTH += properties.hotPotatoCount * 2;
                  properties.nonDungeonStats.DAMAGE += properties.hotPotatoCount * 2;

                  properties.dungeonStats.STRENGTH += properties.hotPotatoCount * 2 * dungeonModifier;
                  properties.dungeonStats.DAMAGE += properties.hotPotatoCount * 2 * dungeonModifier;
                } else {
                  properties.miscStats.HEALTH += properties.hotPotatoCount * 4;
                  properties.miscStats.DEFENSE += properties.hotPotatoCount * 2;

                  finalStats.updateValue("HEALTH", finalStats.HEALTH + properties.hotPotatoCount * 4);
                  finalStats.updateValue("DEFENSE", finalStats.DEFENSE + properties.hotPotatoCount * 2);

                  properties.nonDungeonStats.HEALTH += properties.hotPotatoCount * 4;
                  properties.nonDungeonStats.DEFENSE += properties.hotPotatoCount * 2;

                  properties.dungeonStats.HEALTH += properties.hotPotatoCount * 4 * dungeonModifier;
                  properties.dungeonStats.DEFENSE += properties.hotPotatoCount * 2 * dungeonModifier;
                }
              }
            }
            break;
          case "baseMultiplier":
            damageMultipliers.regularBaseMulti += values;
            damageMultipliers.magicBaseMulti += values;

            break;
          case "firstPounce":
            //This ability will add the +X% once initially and again if one of the enchants is present with that enchant value added
            //If it is triple strike the first hit will consume the initially +X% and the next two hits will be (+X% + enchant value)

            const firstStrike = playerGear.weapon.enchantments.first_strike;
            const tripleStrike = playerGear.weapon.enchantments.triple_strike;

            // second only gets added if there is first/triple strike
            if (firstStrike || tripleStrike) {
              damageMultipliers.firstStrikeMulti += values;
            }
            // the value from the enchant is added when weapon enchants are read in via calculate damage function
            // magicFirstStrikeMulti only benefits from value on lion pet since those enchants are for melee damage ** no longer benefits since change

            break;
          case "capStat":
            for (const [stat, value] of Object.entries(values)) {
              finalStats.statCaps[stat] = value;
              finalStats.updateValue(stat, finalStats[stat]);
            }
            break;
          case "buffWeapon":
            for (const [stat, value] of Object.entries(values)) {
              playerGear["weapon"].nonDungeonStats[stat] += value;
              playerGear["weapon"].dungeonStats[stat] += value * playerGear["weapon"].dungeonStats.dungeonModifier;
              if (dungeonMode) {
                finalStats.updateValue(stat, finalStats[stat] + value * playerGear["weapon"].dungeonStats.dungeonModifier);
              } else {
                finalStats.updateValue(stat, finalStats[stat] + value);
              }
            }
            break;
          case "IceShields":
            finalStats.updateValue("DEFENSE", finalStats.DEFENSE + finalStats.STRENGTH * (values / 100) * statMultipliers.DEFENSE);
            finalStats.updateValue("DEFENSE", finalStats.DEFENSE + finalStats.STRENGTH * (values / 100) * statMultipliers.DEFENSE);
            break;
          case "statPerStat":
            const receiveAmount = (finalStats[values.dependentStat] / values.perDependent) * values.receivePer;
            const statMultiplier = statMultipliers[values.receiveStat] ?? 1;
            finalStats.updateValue(values.receiveStat, finalStats[values.receiveStat] + receiveAmount * statMultiplier);

            break;
          case "rockDefense":
            const rockDefense = finalStats.DEFENSE * statMultipliers.DEFENSE * values.percentage;
            finalStats.updateValue("DEFENSE", finalStats.DEFENSE + rockDefense);
            break;
          case "armorStatsBuff":
            for (const gear of ["helmet", "chestplate", "leggings", "boots"]) {
              const properties = playerGear[gear];
              const dungeonModifier = properties.dungeonStats.dungeonModifier;
              const multiplier = values.percentage;
              if (properties.id && getArmorSetKeyword(properties.id).includes(values.armorKeyword)) {
                for (const [stat, value] of Object.entries(properties.nonDungeonStats)) {
                  const newBaseValue = value * values.percentage;
                  const starValue = (properties.baseStats[stat] ?? 0) * Math.min(0.02 * properties.starLevel, 0.1);
                  const currentDungeonValue = properties.dungeonStats[stat];
                  const newDungeonValue = (value - starValue) * dungeonModifier * multiplier;
                  properties.nonDungeonStats[stat] = newBaseValue;

                  if (dungeonMode) {
                    if (dungeonNonBoostedStats.includes(stat)) {
                      const starBoostedValue = (value - starValue) * (properties.dungeonStarModifier + 1) * multiplier;
                      properties.dungeonStats[stat] = starBoostedValue;
                      finalStats.updateValue(stat, finalStats[stat] + (starBoostedValue - currentDungeonValue) * (statMultipliers[stat] ?? 1));
                    } else {
                      properties.dungeonStats[stat] = newDungeonValue;
                      finalStats.updateValue(stat, finalStats[stat] + (newDungeonValue - currentDungeonValue) * (statMultipliers[stat] ?? 1));
                    }
                  } else {
                    finalStats.updateValue(stat, finalStats[stat] + (newBaseValue - value) * (statMultipliers[stat] ?? 1));
                  }
                }
              }
            }
            break;
          case "weaponStats":
            const weapon = playerGear.weapon;
            const dungeonModifier = weapon.dungeonStats.dungeonModifier;
            for (const [stat, value] of Object.entries(values)) {
              const starValue = (weapon.baseStats[stat] ?? 0) * 0.02 * weapon.starLevel;
              const currentDungeonValue = weapon.dungeonStats[stat];
              const newDungeonValue = (weapon.nonDungeonStats[stat] - starValue + value) * dungeonModifier;
              weapon.nonDungeonStats[stat] += value;
              weapon.dungeonStats[stat] = newDungeonValue;
              if (dungeonMode) {
                finalStats.updateValue(stat, finalStats[stat] + (newDungeonValue - currentDungeonValue) * (statMultipliers[stat] ?? 1));
              } else {
                finalStats[stat] += value;
              }
            }
            break;
          case "livingDead":
            const affectedArmorKeywords = [
              "REVENANT",
              "ZOMBIE",
              "CRYSTALLIZED",
              "REVIVED",
              "REAPER",
              "ROTTEN",
              "SKELETON_GRUNT",
              "SKELETON_SOLDIER",
              "SKELETON_LORD",
              "SKELETON_MASTER",
              "SKELETOR",
            ];
            for (const gear of ["helmet", "chestplate", "leggings", "boots"]) {
              const properties = playerGear[gear];
              const dungeonModifier = properties.dungeonStats.dungeonModifier;

              const dungeonMultiplier = values.percentage + dungeonModifier;
              const multiplier = values.percentage;
              for (const armorKeyword of affectedArmorKeywords) {
                if (properties.id.includes(armorKeyword)) {
                  for (const [stat, value] of Object.entries(properties.nonDungeonStats)) {
                    // math.min to not take master mode stats into account
                    const starValue = (properties.baseStats[stat] ?? 0) * Math.min(0.02 * properties.starLevel, 0.1);
                    const newBaseValue = value * (1 + multiplier);
                    const newDungeonValue = (value - starValue) * dungeonMultiplier;
                    const currentDungeonValue = properties.dungeonStats[stat];
                    properties.nonDungeonStats[stat] = newBaseValue;

                    if (dungeonMode) {
                      if (dungeonNonBoostedStats.includes(stat)) {
                        const starBoostedValue = (value - starValue) * (multiplier + properties.dungeonStarModifier + 1);
                        properties.dungeonStats[stat] = starBoostedValue;
                        finalStats.updateValue(stat, finalStats[stat] ?? 0 + (starBoostedValue - currentDungeonValue) * (statMultipliers[stat] ?? 1));
                      } else {
                        properties.dungeonStats[stat] = newDungeonValue;
                        finalStats.updateValue(stat, finalStats[stat] ?? 0 + (newDungeonValue - currentDungeonValue) * (statMultipliers[stat] ?? 1));
                      }
                    } else {
                      finalStats.updateValue(stat, finalStats[stat] + (newBaseValue - value) * (statMultipliers[stat] ?? 1));
                    }
                  }
                }
              }
            }
            break;
          case "mastiff":
            finalStats.critEffectiveness -= 0.5;
            finalStats.HEALTH += finalStats.CRITICAL_DAMAGE * 50 * statMultipliers.HEALTH;
            break;
          default:
            break;
        }
      } else if (effect.processEffect) {
        effect.processEffect(profileState);
      }
    }
  }

  // add arrow damage for bows
  if (playerGear.weapon.referenceCategory === "bow") {
    const arrow = playerGear.weapon.arrow;
    const arrowDamage = arrows[arrow]?.DAMAGE ?? 0;
    finalStats.DAMAGE += arrowDamage;
    // if arrow has stats only one is magma arrow at time of doing this
    if (arrows[arrow]?.stats) {
      for (const [stat, value] of Object.entries(arrows[arrow].stats)) {
        finalStats[stat] += value;
      }
    }
  }

  calculateDamage(profileState);

  return { normal: finalStats, dungeon: finalStats };
}
