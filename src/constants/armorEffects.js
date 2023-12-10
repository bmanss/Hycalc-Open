const undead = ["Zombie", "Skeleton", "Wither", "Pigmen"];
const green = "#00ff1a";
const red = "#FF554A";
const darkRed = "#8c0000";
const orange = "#ffa929";
const lightBlue = "#00FFFF";
const white = "white";
const magenta = "#FF54DA";
const teal = "#26c9b9";
const yellow = "#eef20f";
const blue = "#4455FF";
const darkGreen = "#1aad00";
const purple = "#7800ab";
export const armorSetEffects = {
  MASTIFF: {
    required: 4,
    effects: [
      {
        resultType: "mastiff",
        postEffect: true,
        effectName: "Absolute Unit",
        effectResults: () => {
          return undefined; // added a special rule for mastiff when effects are applied
        },
        description:
          "§7Strength: §c+10 §9(+10)\n§7Crit Chance: §c+6% §9(+6%)\n§7Crit Damage: §c+98% §9(+18%)\n§7Health: §a+115 §e(+40)\n§7Defense: §a+40 §e(+20)\n§7Intelligence: §a+150\n\n§9Growth V\n" +
          "§7Grants §a+75 §c❤ Health§7.\n§9Protection V\n§7Grants §a+20 §a❈ Defense§7.\n§9Thorns III\n§7Grants a §a50% §7chance to\n§7rebound §a9% §7of damage dealt\n§7back at the attacker." +
          "\n\n§6Full Set Bonus: Dashing\n§7Max health set to §c150❤§7.\n§7Deal §c+100% §7damage!\n§8Very stylish.\n\n§6§lLEGENDARY CHESTPLATE",
      },
    ],
  },
  FINAL_DESTINATION: {
    required: 4,
    effects: [
      {
        resultType: "basicStats",
        effectResults: () => {
          return {
            STRENGTH: 30,
            ATTACK_SPEED: 20,
            WALK_SPEED: 10,
            FEROCITY: 200,
          };
        },
      },
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Enderman"],
        },
        effectResults: () => {
          return 1;
        },
      },
    ],
  },
  SUPERIOR_DRAGON: {
    required: 4,
    effects: [
      {
        resultType: "globalMultiplier-add-all",
        condition: undefined,
        effectResults: () => {
          return {
            percentage: 0.05,
          };
        },
      },
    ],
  },
  STRONG_DRAGON: {
    required: 4,
    effects: [
      {
        resultType: "buffWeapon",
        condition: {
          requirement: "weapon",
          validParameters: ["ASPECT_OF_THE_END"],
        },
        effectResults: () => {
          return {
            DAMAGE: 75,
          };
        },
      },
    ],
  },
  REAPER: {
    required: 3,
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Zombie"],
        },
        effectResults: () => {
          return 1;
        },
      },
    ],
  },
  CHEAP_TUXEDO: {
    required: 3,
    effects: [
      {
        resultType: "baseMultiplier",
        effectResults: () => {
          return 0.5;
        },
      },
      {
        resultType: "capStat",
        effectResults: () => {
          return {
            HEALTH: 75,
          };
        },
      },
    ],
  },
  FANCY_TUXEDO: {
    required: 3,
    effects: [
      {
        resultType: "baseMultiplier",
        effectResults: () => {
          return 1;
        },
      },
      {
        resultType: "capStat",
        effectResults: () => {
          return {
            HEALTH: 150,
          };
        },
      },
    ],
  },
  ELEGANT_TUXEDO: {
    required: 3,
    effects: [
      {
        resultType: "baseMultiplier",
        effectResults: () => {
          return 1.5;
        },
      },
      {
        resultType: "capStat",
        effectResults: () => {
          return {
            HEALTH: 250,
          };
        },
      },
    ],
  },
};

export const singleArmorEffects = {
  RAMPART_HELMET: {
    effects: [
      {
        resultType: "basicStats",
        condition: undefined,
        effectResults: () => {
          return {
            HEALTH: 50,
            STRENGTH: 20,
            CRITICAL_DAMAGE: 15,
          };
        },
      },
    ],
  },
  RAMPART_CHESTPLATE: {
    effects: [
      {
        resultType: "basicStats",
        condition: undefined,
        effectResults: () => {
          return {
            HEALTH: 50,
            STRENGTH: 20,
            CRITICAL_DAMAGE: 15,
          };
        },
      },
    ],
  },
  RAMPART_LEGGINGS: {
    effects: [
      {
        resultType: "basicStats",
        condition: undefined,
        effectResults: () => {
          return {
            HEALTH: 50,
            STRENGTH: 20,
            CRITICAL_DAMAGE: 15,
          };
        },
      },
    ],
  },
  RAMPART_BOOTS: {
    effects: [
      {
        resultType: "basicStats",
        condition: undefined,
        effectResults: () => {
          return {
            HEALTH: 50,
            STRENGTH: 20,
            CRITICAL_DAMAGE: 15,
          };
        },
      },
    ],
  },
  THUNDER_HELMET: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.2;
        },
      },
    ],
  },
  THUNDER_CHESTPLATE: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.2;
        },
      },
    ],
  },
  THUNDER_LEGGINGS: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.2;
        },
      },
    ],
  },
  THUNDER_BOOTS: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.2;
        },
      },
    ],
  },
  THUNDERBOLT_NECKLACE: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.1;
        },
      },
    ],
  },
  MAGMA_LORD_HELMET: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.3;
        },
      },
    ],
  },
  MAGMA_LORD_CHESTPLATE: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.3;
        },
      },
    ],
  },
  MAGMA_LORD_LEGGINGS: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.3;
        },
      },
    ],
  },
  MAGMA_LORD_BOOTS: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.3;
        },
      },
    ],
  },
  MAGMA_LORD_GAUNTLET: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.1;
        },
      },
    ],
  },
  TAURUS_HELMET: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.1;
        },
      },
    ],
  },
  FLAMING_CHESTPLATE: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.1;
        },
      },
    ],
  },
  MOOGMA_LEGGINGS: {
    effects: [
      {
        resultType: "baseMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Lava Sea Creature"],
        },
        effectResults: () => {
          return 0.1;
        },
      },
    ],
  },
  CROWN_OF_GREED: {
    effects: [
      {
        resultType: "postMultiplier",
        effectResults: () => {
          return 1.25;
        },
      },
    ],
  },
  RANCHERS_BOOTS: {
    effects: [
      {
        resultType: "statBasedOnSkill",
        effectResults: () => {
          return {
            FARMING: {
              WALK_SPEED: 4,
              DEFENSE: 2,
            },
          };
        },
      },
    ],
  },
  FARMER_BOOTS: {
    effects: [
      {
        resultType: "statBasedOnSkill",
        effectResults: () => {
          return {
            FARMING: {
              WALK_SPEED: 4,
              DEFENSE: 2,
            },
          };
        },
      },
    ],
  },
  ENCHANTED_JACK_O_LANTERN: {
    effects: [
      {
        resultType: "statBasedOnSkill",
        effectResults: () => {
          return {
            FARMING: {
              HEALTH: 4,
              DEFENSE: 2,
            },
          };
        },
      },
    ],
  },
  DRAGON_SHORTBOW: {
    effects: [
      {
        resultType: "baseMultiplier",
        effectResults: () => {
          return 0.15;
        },
      },
    ],
  },
  VOIDWALKER_KATANA: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Enderman"],
        },
        effectResults: () => {
          return 2.5;
        },
      },
    ],
  },
  VOIDEDGE_KATANA: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Enderman"],
        },
        effectResults: () => {
          return 3;
        },
      },
    ],
  },
  VORPAL_KATANA: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Enderman"],
        },
        effectResults: () => {
          return 3.5;
        },
      },
    ],
  },
  ATOMSPLIT_KATANA: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Enderman"],
        },
        effectResults: () => {
          return 4;
        },
      },
    ],
  },
  UNDEAD_SWORD: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: undead,
        },
        effectResults: () => {
          return 2;
        },
      },
    ],
  },
  REVENANT_SWORD: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Zombie"],
        },
        effectResults: () => {
          return 2.5;
        },
      },
    ],
  },
  REAPER_SWORD: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Zombie"],
        },
        effectResults: () => {
          return 3;
        },
      },
    ],
  },
  AXE_OF_THE_SHREDDED: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Zombie"],
        },
        effectResults: () => {
          return 3.5;
        },
      },
    ],
  },
  SPIDER_SWORD: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Spider"],
        },
        effectResults: () => {
          return 2;
        },
      },
    ],
  },
  SCORPION_FOIL: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Spider"],
        },
        effectResults: () => {
          return 3.5;
        },
      },
    ],
  },
  END_SWORD: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Enderman", "Dragon"],
        },
        effectResults: () => {
          return 2;
        },
      },
    ],
  },
  SWORD_OF_REVELATIONS: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Mythological"],
        },
        effectResults: () => {
          return 3;
        },
      },
    ],
  },
  //todo add damage per taming level
  DAEDALUS_AXE: {
    effects: [
      {
        resultType: "postMultiplier",
        condition: {
          requirement: "targetMob",
          validParameters: ["Mythological"],
        },
        effectResults: () => {
          return 3;
        },
      },
    ],
  },
  WARDEN_HELMET: {
    effects: [
      {
        resultType: "warden",
        postEffect: true,
        effectResults: () => {
          return 0.2;
        },
      },
    ],
  },
  POOCH_SWORD: {
    effects: [
      {
        resultType: "statPerStat",
        postEffect: true,
        effectResults: () => {
          return {
            receiveStat: "DAMAGE",
            receivePer: 1,
            dependentStat: "HEALTH",
            perDependent: 50,
          };
        },
      },
      {
        resultType: "basicStats",
        flatEffect: true,
        condition: {
          requirement: "targetMob",
          validParameters: ["Wolf"],
        },
        effectResults: () => {
          return { STRENGTH: 150 };
        },
      },
    ],
  },
  SHAMAN_SWORD: {
    effects: [
      {
        resultType: "statPerStat",
        postEffect: true,
        effectResults: () => {
          return {
            receiveStat: "DAMAGE",
            receivePer: 1,
            dependentStat: "HEALTH",
            perDependent: 50,
          };
        },
      },
    ],
  },
};
