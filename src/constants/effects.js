const black = "§0";
const darkBlue = "§1";
const darkGreen = "§2";
const teal = "§3";
const darkRed = "§4";
const magenta = "§5";
const orange = "§6";
const gray = "§7";
const darkGray = "§8";
const mediumBlue = "§9";
const green = "§a";
const lightBlue = "§b";
const red = "§c";
const lightMagenta = "§e";
const yellow = "§e";
const white = "§f";

// common effects that get a reusable function
const modifyBaseMultiplier = (profileState, value) => {
  profileState.damageMultipliers.magicBaseMulti += value;
  profileState.damageMultipliers.regularBaseMulti += value;
};

const modifyPostMultiplier = (profileState, value) => {
  profileState.damageMultipliers.magicPostMulti += value;
  profileState.damageMultipliers.regularPostMulti += value;
};

const modifyStats = (profileState, statValues) => {
  for (const [stat, value] of Object.entries(statValues)) {
    profileState.finalStats[stat] += value;
  }
};

const modifyStatMultipliers = (profileState, multipliers) => {
  for (const [stat, value] of Object.entries(multipliers)) {
    profileState.statMultipliers[stat] += value;
  }
};

const incrementAllStatMultipliers = (profileState, value) => {
  for (const [stat, _] of Object.entries(profileState.statMultipliers)) {
    profileState.statMultipliers[stat] += value;
  }
};

const buffWeapon = (profileState, stats) => {
  const weapon = profileState.playerGear.weapon;
  const finalStats = profileState.finalStats;
  for (const [stat, value] of Object.entries(stats)) {
    if (profileState.dungeonMode && weapon.itemType === "dungeon") {
      finalStats.updateValue(stat, finalStats[stat] + value * weapon.dungeonStats.dungeonModifier);
      weapon.dungeonStats[stat] += value * weapon.dungeonStats.dungeonModifier;
    } else {
      weapon.nonDungeonStats[stat] += value;
      finalStats.updateValue(stat, finalStats[stat] + value);
    }
  }
};

export const effects = {
  BRUTE_FORCE: {
    name: "§6Ability: Brute Force",
    enabled: true,
    postEffect: true,
    description: "§7Halves your §f✦ Speed §7but\n§7grants §c+20% §7base weapon\n§7damage for every §a25 §f✦\n§fSpeed§7.",
    processEffect: (profileState) => {
      const finalStats = profileState.finalStats;
      finalStats.statCaps.WALK_SPEED /= 2;
      finalStats.updateValue("WALK_SPEED", finalStats.WALK_SPEED);
      const multi = (profileState.finalStats.WALK_SPEED / 25) * 0.2 + 1;
      profileState.damageMultipliers.regularBaseMulti += multi;
      profileState.damageMultipliers.magicBaseMulti += multi;
    },
  },
  SUPERIOR_BLOOD: {
    required: 4,
    enabled: true,
    setEffect: true,
    name: "§6Full Set Bonus: Superior Blood",
    description: "§7Most of your stats are increased\n§7by §a5% §7and §6Aspect of the\n§6Dragons §7ability deals §a50%\n§7more damage.",
    processEffect: (profileState) => incrementAllStatMultipliers(profileState, 0.05),
  },
  STRONG_BLOOD: {
    required: 4,
    enabled: true,
    setEffect: true,
    name: "§6Full Set Bonus: Strong Blood",
    description: `${gray}Improves ${mediumBlue}the Aspect of the End:
                  ${red}+75 Damage
                  ${gray}Instant Transmission:
                  ${green}+2 ${gray}Teleport distance
                  ${green}+3 ${gray}seconds of duration
                  ${red}+5❁ Strength ${gray}on cast`,
    processEffect: (profileState) => {
      const weaponID = profileState.playerGear.weapon.id;
      if (weaponID === "ASPECT_OF_THE_END") {
        const stats = { DAMAGE: 75 };
        buffWeapon(profileState, stats);
      }
    },
  },
  ENRAGE: {
    name: "§6Ability: Enrage",
    required: 3,
    enabled: true,
    setEffect: true,
    description: `${gray}Enrage for ${green}6s ${gray}gaining ${white}100✦\n${white}Speed, ${red}100❁ Damage, ${gray}and ${red}100❁ Strength.\n${darkGray}Cooldown: ${green}25s`,
    processEffect: (profileState) => {
      const finalStats = profileState.finalStats;
      finalStats.updateValue("WALK_SPEED", finalStats["WALK_SPEED"] + 100);
      finalStats.updateValue("STRENGTH", finalStats["STRENGTH"] + 100);
      finalStats.updateValue("DAMAGE", finalStats["DAMAGE"] + 100);
    },
  },
  TROLLING_THE_REAPER: {
    name: "§6Ability: Trolling the Reaper ",
    required: 3,
    enabled: true,
    setEffect: true,
    description: `${gray}Healing Wands heal ${green}+50%.\n${gray}Gain ${green}+100 ❈ ${gray}Defense against Zombies.
                  ${gray}Deal ${red}+100% ${gray}damage to Zombies\n${gray}but  ${red}1% ${gray}to all other Mobs.`,
    processEffect: (profileState) => {
      if (profileState.targetMob === "Zombie") {
        modifyBaseMultiplier(profileState, 1);
      } else {
        // profileState.damageMultipliers.regularPostMulti = 0.1;
      }
    },
  },
  ZOMBIE_BULWARK: {
    name: "§6Ability: Zombie Bulwark",
    enabled: true,
    description: `${gray}Kill Zombies to accumulate\n${gray}defense against them.`,
  },
};

export const itemEffectsMap = {
  WARDEN_HELMET: [effects.BRUTE_FORCE],
  SUPERIOR_DRAGON_HELMET: [effects.SUPERIOR_BLOOD],
  SUPERIOR_DRAGON_CHESTPLATE: [effects.SUPERIOR_BLOOD],
  SUPERIOR_DRAGON_LEGGINGS: [effects.SUPERIOR_BLOOD],
  SUPERIOR_DRAGON_BOOTS: [effects.SUPERIOR_BLOOD],
  STRONG_DRAGON_HELMET: [effects.STRONG_BLOOD],
  STRONG_DRAGON_CHESTPLATE: [effects.STRONG_BLOOD],
  STRONG_DRAGON_LEGGINGS: [effects.STRONG_BLOOD],
  STRONG_DRAGON_BOOTS: [effects.STRONG_BLOOD],
  REAPER_CHESTPLATE: [effects.ENRAGE, effects.TROLLING_THE_REAPER, effects.ZOMBIE_BULWARK],
  REAPER_LEGGINGS: [effects.ENRAGE, effects.TROLLING_THE_REAPER, effects.ZOMBIE_BULWARK],
  REAPER_BOOTS: [effects.ENRAGE, effects.TROLLING_THE_REAPER, effects.ZOMBIE_BULWARK],
};
