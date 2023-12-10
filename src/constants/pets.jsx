const green = '#00ff1a';
const red = '#FF554A';
const darkRed = '#8c0000';
const orange = '#ffa929';
const lightBlue = '#00FFFF';
const white = 'white';
const magenta = '#FF54DA';
const teal = '#26c9b9';
const yellow = '#eef20f';
const blue = '#4455FF';
const darkGreen = '#1aad00';
const purple = '#7800ab';
export const pets = {
    TIGER: {
        baseStats: {
            STRENGTH: 5
        },
        statsPerLevel: {
            STRENGTH: 0.1,
            FEROCITY: 0.25,
            CRITICAL_CHANCE: 0.05,
            CRITICAL_DAMAGE: 0.5
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Merciless Swipe',
                minRarity: 'COMMON',
                resultType: 'globalMultiplier-multi',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        FEROCITY: {
                            COMMON: 0.1,
                            UNCOMMON: 0.2,
                            RARE: 0.2,
                            EPIC: 0.3,
                            LEGENDARY: 0.3
                        }
                    }
                    const value = stats.FEROCITY[tier] ? stats.FEROCITY[tier] * petLevel : stats.FEROCITY.LEGENDARY * petLevel;
                    return {
                        FEROCITY: 1 + (value / 100)
                    }
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.1,
                        UNCOMMON: 0.2,
                        RARE: 0.2,
                        EPIC: 0.3,
                        LEGENDARY: 0.3
                    }
                    return [
                        'Gain ',
                        <span key="ferocity" style={{ color: red }}>
                            +{(initialVal[tier] * petLevel).toFixed(1)}%⫽ Ferocity.
                        </span>
                    ];
                }
            },
            {
                name: 'Hemorrage ',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.3,
                        EPIC: 0.55,
                        LEGENDARY: 0.55
                    }
                    return [
                        'Melee attacks reduce healing by ',
                        <span key="ferocity" style={{ color: orange }}>
                            {(initialVal[tier] * petLevel).toFixed(1)}%
                        </span>,
                        ' for 10 seconds.'
                    ];
                }
            },
            {
                name: 'Apex Predator',
                minRarity: 'LEGENDARY',
                resultType: 'baseMultiplier',
                enabled: false,
                effectResults: (petLevel, tier) => {
                    const value = 1 * petLevel;
                    return (value / 100);
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 1
                    }
                    return [
                        'Deal ',
                        <span key="ferocity" style={{ color: red }}>
                            +{(initialVal[tier] * petLevel).toFixed(1)}%
                        </span>,
                        ' damage against targets with no other mobs within 15 blocks'
                    ];
                }
            }
        ]
    },
    LION: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.5,
            FEROCITY: 0.05,
            WALK_SPEED: 0.25
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Primal Force',
                minRarity: 'COMMON',
                resultType: 'weaponStats',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        COMMON: {DAMAGE: 0.03,STRENGTH: 0.03},
                        UNCOMMON: {DAMAGE: 0.05,STRENGTH: 0.05},
                        RARE: {DAMAGE: 0.1,STRENGTH: 0.1},
                        EPIC: {DAMAGE: 0.15,STRENGTH: 0.15},
                        LEGENDARY: {DAMAGE: 0.2,STRENGTH: 0.2},
                    }
                    return {
                        STRENGTH: stats[tier]?.STRENGTH ? stats[tier].STRENGTH * petLevel : stats.LEGENDARY.STRENGTH * petLevel,
                        DAMAGE: stats[tier]?.DAMAGE ? stats[tier].DAMAGE * petLevel : stats.LEGENDARY.DAMAGE * petLevel,
                    }
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: { DAMAGE: 0.03, STRENGTH: 0.03 },
                        UNCOMMON: { DAMAGE: 0.05, STRENGTH: 0.05 },
                        RARE: { DAMAGE: 0.1, STRENGTH: 0.1 },
                        EPIC: { DAMAGE: 0.15, STRENGTH: 0.15 },
                        LEGENDARY: { DAMAGE: 0.2, STRENGTH: 0.2 },
                    }
                    return [
                        'Adds ',
                        <span key="damage" style={{ color: red }}>
                            +{(initialVal[tier].DAMAGE * petLevel).toFixed(1)} Damage
                        </span>,
                        ' and ',
                        <span key="strength" style={{ color: red }}>
                            +{(initialVal[tier].STRENGTH * petLevel).toFixed(1)} Strength
                        </span>,
                        ' to your weapons.'
                    ];
                }
            },
            {
                name: 'First Pounce',
                minRarity: 'RARE',
                resultType: 'firstPounce',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        RARE: 0.75,
                        EPIC: 1,
                        LEGENDARY: 1
                    }
                    const value =  stats[tier] * petLevel;
                    return (value / 100);
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.75,
                        EPIC: 1,
                        LEGENDARY: 1
                    }
                    return [
                        'First strike, Triple-strike, and Combo are ',
                        <span key="key" style={{ color: green }}>
                            +{(initialVal[tier] * petLevel).toFixed(1)}%
                        </span>,
                        ' more effective.',
                    ];
                },
            },
            {
                name: 'King of the Jungle',
                minRarity: 'LEGENDARY',
                resultType: 'baseMultiplier',
                enabled: false,
                effectResults: (petLevel, tier) => {
                    const value =  1.5 * petLevel;
                    return (value / 100);
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 1.5
                    }
                    return [
                        'Deal ',
                        <span key="key" style={{ color: red }}>
                            +{(initialVal[tier] * petLevel).toFixed(1)}% Damage
                        </span>,
                        ' against mobs that have attacked you.',
                    ];
                },
                'action': 'baseMultiplierPerLevel',
                'type': 'additive',
                'amountPerLevel': [
                    1.5
                ]
            }
        ]
    },
    BAL: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.25,
            FEROCITY: 0.1
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Protective Skin',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Gives ',
                        <span key="key" style={{ color: red }}>
                            Heat
                        </span>,
                        ' immunity.',
                    ];
                },
            },
            {
                name: 'Fire Whip',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    const initialVal = {
                        EPIC: 0.1,
                        LEGENDARY: 0.1
                    }
                    return [
                        'Every 5s while in combat the Balrog will strike nearby enemies with his fire whip dealing ',
                        <span key="key" style={{ color: red }}>
                            {(initialVal[tier] * petLevel).toFixed(1)}%
                        </span>,
                        ' of your damage as ',
                        <span key="key2" style={{ color: white }}> True Damage</span>,
                    ];
                },
            },
            {
                name: 'Made of Lava',
                minRarity: 'LEGENDARY',
                resultType: 'globalMultiplier-multi-all',
                enabled: false,
                effectResults: (petLevel, tier) => {
                    const value = (0.15 * petLevel);
                    return {
                        percentage: 1 + (value / 100)
                    }
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 0.15
                    }
                    return [
                        'Gain ',
                        <span key="key" style={{ color: green }}>
                            {(initialVal[tier] * petLevel).toFixed(1)}%
                        </span>,
                        ' on ALL stats when inside the ',
                        <span key="key2" style={{ color: red }}>Magma Fields.</span>,
                    ];
                },
            }
        ]
    },
    'BLACK CAT': {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 1,
            WALK_SPEED: 0.25
        },
        minRarity: 'LEGENDARY',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                resultType: 'blackCatSpeed',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    return {
                        WALK_SPEED: 1 * petLevel
                    }
                },
                name: 'Hunter',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 1
                    }
                    return [
                        'Increases your ',
                        <span key="key" style={{ color: white }}>✦ Speed</span>,
                        ' and speed cap by ',
                        <span key="key2" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                    ];
                },
            },
            {
                name: 'Omen',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 0.15
                    }
                    return [
                        'Grants ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: magenta }}> ♣ Pet Luck</span>,
                    ];
                },
                'action': 'none'
            },
            {
                resultType: 'basicStats',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    return {
                        MAGIC_FIND: petLevel * 0.15
                    }
                },
                name: 'Supernatural',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 0.15
                    }
                    return [
                        'Grants ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: lightBlue }}> ✯Magic Find</span>,
                    ];
                },
            }
        ]
    },
    BLAZE: {
        baseStats: {
            DEFENSE: 10
        },
        statsPerLevel: {
            DEFENSE: 0.2,
            INTELLIGENCE: 1
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                minRarity: 'EPIC',
                resultType: 'globalMultiplier-multi-all',
                enabled: false,
                effectResults: (petLevel, tier) => {
                    const value = (0.1 * petLevel);
                    return {
                        percentage: 1 + (value / 100)
                    }
                },
                name: 'Nether Embodiment',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    const initialVal = {
                        EPIC: 0.1,
                        LEGENDARY: 0.1
                    }
                    return [
                        ' Increases all stats by ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' while on the ',
                        <span key="key2" style={{ color: red }}>Crimson Isle.</span>,
                    ];
                },
            },
            {
                minRarity: 'EPIC',
                resultType: 'armorStatsBuff',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.4 * petLevel;
                    return {
                        armorKeyword: 'BLAZE',
                        percentage: 1 + (value / 100)
                    }
                },
                name: 'Bling Armor',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    const initialVal = {
                        EPIC: 0.4,
                        LEGENDARY: 0.4
                    }
                    return [
                        'Upgrades ',
                        <span key="key" style={{ color: red }}>Blaze Armor</span>,
                        ' stats and ability by ',
                        <span key="key2" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%.</span>,
                    ];
                },
            },
            {
                minRarity: 'LEGENDARY',
                resultType: 'doubleBooks',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    return 2;
                },
                name: 'Fusion-Style Potato',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Double effects of Hot Potato Books.',
                    ];
                },
            }
        ]
    },
    'ENDER DRAGON': {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.5,
            CRITICAL_CHANCE: 0.1,
            CRITICAL_DAMAGE: 0.5
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                minRarity: 'EPIC',
                resultType: 'baseMultiplier',
                condition: {
                    requirement: 'targetMob',
                    validParameters: ['Enderman']
                },
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = (2 * petLevel) + 100;
                    return value / 100;
                },
                name: 'End Strike',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Deal ',
                        <span key="key" style={{ color: green }}>+{(2 * petLevel).toFixed(1)}%</span>,
                        ' more damage to end mobs.',
                    ];
                },
            },
            {
                minRarity: 'EPIC',
                resultType: 'buffWeapon',
                condition: {
                    requirement: 'weapon',
                    validParameters: ['ASPECT_OF_THE_DRAGON']
                },
                enabled: true,
                effectResults: (petLevel, tier) => {
                    return {
                        DAMAGE: 0.5 * petLevel,
                        STRENGTH: 0.3 * petLevel
                    }
                },
                name: 'One with the Dragons',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        ' Buffs the ',
                        <span key="key" style={{ color: red }}>Aspect of the Dragons </span>,
                        'sword by ',
                        <span key="key2" style={{ color: green }}>{(0.5 * petLevel).toFixed(1)} </span>,
                        <span key="key3" style={{ color: red }}> ❁Damage</span>,
                        ' and ',
                        <span key="key4" style={{ color: green }}>{(0.3 * petLevel).toFixed(1)} </span>,
                        <span key="key5" style={{ color: red }}> ❁Strength</span>,
                    ];
                },
            },
            {
                minRarity: 'LEGENDARY',
                resultType: 'globalMultiplier-add-all',
                enabled: true,
                processEffect: (profileState) =>{
                    const increaseValue = (0.1 * profileState.playerGear.pet.level) / 100;
                    for (const [stat,_] of Object.entries(profileState.statMultipliers)){
                        profileState.statMultipliers[stat] += increaseValue;
                    };
                },
                effectResults: (petLevel, tier) => {
                    return { percentage: (0.1 * petLevel) / 100 }
                },
                name: 'Superior',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 0.1
                    }
                    return [
                        'Increases most stats by ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%.</span>,
                    ];
                },
            }
        ]
    },
    MEGALODON: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.5,
            MAGIC_FIND: 0.1,
            FEROCITY: 0.05
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Blood Scent',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Deal up to ',
                        <span key="key" style={{ color: red }}>+{(0.25 * petLevel).toFixed(1)}% ❁Damage</span>,
                        ' based on the enemy\'s missing health.',
                    ];
                },
                'action': 'none'
            },
            {
                minRarity: 'EPIC',
                resultType: 'armorStatsBuff',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.2 * petLevel;
                    return {
                        armorKeyword: 'SHARK_SCALE',
                        percentage: 1 + (value / 100)
                    }
                },
                name: 'Enhanced Scales',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Increases the stats of Shark Armor by ',
                        <span key="key" style={{ color: green }}>{(0.25 * petLevel).toFixed(1)}%</span>,
                    ];
                },
            },
            {
                name: 'Feeding Frenzy',
                minRarity: 'LEGENDARY',
                resultType: 'basicStats',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    return {
                        DAMAGE: petLevel * 0.5,
                        WALK_SPEED: petLevel * 0.5
                    }
                },
                description: (petLevel, tier) => {
                    return [
                        'On kill gain ',
                        <span key="key" style={{ color: red }}>{(0.5 * petLevel).toFixed(1)} ❁Damage</span>,
                        ' and  ',
                        <span key="key2" style={{ color: white }}> ✦Speed</span>,
                        ' for 5 seconds'
                    ];
                },
                'action': 'none'
            }
        ]
    },
    'GOLDEN DRAGON': {
        baseStats: {
            ATTACK_SPEED: 25,
            STRENGTH: 25,
            MAGIC_FIND: 15
        },
        statsPerLevel: {
            ATTACK_SPEED: 0.25,
            STRENGTH: 0.25,
            MAGIC_FIND: 0.05
        },
        minRarity: 'LEGENDARY',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Gold\'s Power',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Adds ',
                        <span key="key" style={{ color: red }}>+{(0.5 * (petLevel - 100) + 50).toFixed(1)} Strength</span>,
                        ' to all golden weapons.',
                    ];
                },
                'action': 'goldsPower',
                'amountPerLevel': [
                    0.5
                ]
            },
            {
                name: 'Shining Scales',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Grants ',
                        <span key="key" style={{ color: red }}>+10 Strength</span>,
                        ' and ',
                        <span key="key2" style={{ color: lightBlue }}>+2 Magic Find</span>,
                        ' to your pet for each digit in your gold collection.',
                    ];
                },
                'action': 'shiningScales'
            },
            {
                name: 'Dragon\'s Greed',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Grants ',
                        <span key="key" style={{ color: red }}>+{(0.0025 * (petLevel - 100) + 0.25).toFixed(2)}% Strength</span>,
                        ' per ',
                        <span key="key2" style={{ color: lightBlue }}>5 Magic Find</span>,
                    ];
                },
                'action': 'dragonsGreed',
                'amountPerLevel': [
                    0.0025
                ]
            },
            {
                name: 'Legendary Treasure',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: red }}>{(0.00125 * (petLevel - 100) + 0.12125).toFixed(2)}% Damage</span>,
                        ' for every million coins in your bank.',
                    ];
                },
                'action': 'legendaryTreasure'
            }
        ]
    },
    ENDERMAN: {
        baseStats: {},
        statsPerLevel: {
            CRITICAL_DAMAGE: 0.75
        },
        minRarity: 'COMMON',
        maxRarity: 'MYTHIC',
        abilities: [
            {
                name: 'Enderian',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.1,
                        UNCOMMON: 0.2,
                        RARE: 0.2,
                        EPIC: 0.3,
                        LEGENDARY: 0.3,
                        MYTHIC: 0.3
                    }
                    return [
                        'Take ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}% </span>,
                        '  less damage from end monsters.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Teleport Savvy',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.4,
                        EPIC: 0.5,
                        LEGENDARY: 0.5,
                        MYTHIC: 0.5
                    }
                    return [
                        'Buffs the Transmission ability granting ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        ' Damage for 5s on use.',
                    ];
                },
                'action': 'addStatPerLevel',
                'stats': {
                    'DAMAGE': [
                        0,
                        0,
                        0.4,
                        0.5
                    ]
                }
            },
            {
                name: 'Zealot Madness',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Increases your odds to find a special Zealot by ',
                        <span key="key" style={{ color: green }}>{(0.25 * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Enderman Slayer',
                minRarity: 'MYTHIC',
                description: (petLevel, tier) => {
                    return [
                        'Grants ',
                        <span key="key" style={{ color: teal }}>{(0.4 * petLevel).toFixed(1)}% ☯ Combat Wisdom</span>,
                        ' against Endermen.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    GHOUL: {
        baseStats: {},
        statsPerLevel: {
            FEROCITY: 0.05,
            HEALTH: 1,
            INTELLIGENCE: 0.75
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Amplified Healing',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Grants ',
                        <span key="key" style={{ color: darkRed }}>+{(0.25 * petLevel).toFixed(1)}♨ Vitality</span>,
                        ', which increases your incoming healing.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Zombie Arm',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Increases the health and range of the Zombie Sword by ',
                        <span key="key" style={{ color: green }}>{(0.5 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Reaper Soul',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Increases the health and lifespan of the Reaper Scythe zombies by ',
                        <span key="key" style={{ color: green }}>{(1 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    GOLEM: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 1.5,
            STRENGTH: 0.5
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Last Stand',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'While less than 25% HP, deal ',
                        <span key="key" style={{ color: green }}>{(0.3 * petLevel).toFixed(1)}%</span>,
                        ' more damage.',
                    ];
                },
                'action': 'baseMultiplierPerLevel',
                'amountPerLevel': [
                    0.3
                ]
            },
            {
                name: 'Ricochet',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    const initialVal = {
                        EPIC: 0.2,
                        LEGENDARY: 0.25
                    }
                    return [
                        'Your iron plating causes ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' of attacks to ricochet and hit the attacker.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Toss',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Every 5 hits, throw the enemy up into the air and deal ',
                        <span key="key" style={{ color: green }}>{(200 + (3 * petLevel)).toFixed(1)}%</span>,
                        ' damage (10s cooldown).',
                    ];
                },
                'action': 'petAbility',
                'baseAmount': [
                    203
                ],
                'amountPerLevel': [
                    3
                ]
            }
        ]
    },
    'GRANDMA WOLF': {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.25,
            HEALTH: 1
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Kill Combo',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Gain buffs for combo kills. Effects stack as you increase your combo.'
                    ];
                },
            }
        ]
    },
    GRIFFIN: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.25,
            CRITICAL_DAMAGE: 0.5,
            INTELLIGENCE: 0.1,
            MAGIC_FIND: 0.1,
            CRITICAL_CHANCE: 0.1
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Odyssey',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Mythological creatures you find and burrows you dig scale in difficulty and rewards based on your equipped Griffin\'s rarity.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Legendary Constitution',
                minRarity: 'UNCOMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        UNCOMMON: { REGEN: 'V', STRENGTH: 'VII' },
                        RARE: { REGEN: 'VI', STRENGTH: 'VII' },
                        EPIC: { REGEN: 'VI', STRENGTH: 'VIII' },
                        LEGENDARY: { REGEN: 'VII', STRENGTH: 'VIII' },
                    }
                    return [
                        'Permanent ',
                        <span key="key" style={{ color: red }}>Regeneration {initialVal[tier].REGEN}</span>,
                        ' and ',
                        <span key="key2" style={{ color: darkRed }}>Regeneration {initialVal[tier].STRENGTH}.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Perpetual Empathy',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    const initialVal = {
                        EPIC: 0.16,
                        LEGENDARY: 0.2
                    }
                    return [
                        'Heal nearby players for ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' of the final damage you receive. Excludes other griffins.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'King of Kings',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: red }}>+{(1 + (0.14 * petLevel)).toFixed(1)}% ❁Strength </span>,
                        ' when above ',
                        <span key="key2" style={{ color: red }}>85%</span>,
                        ' health.',
                    ];
                },
                minRarity: 'LEGENDARY',
                resultType: 'globalMultiplier-multi',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 1 + (0.14 * petLevel);
                    return {
                        STRENGTH: 1 + (value / 100)
                    }
                }
            }
        ]
    },
    HORSE: {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 0.5,
            WALK_SPEED: 0.25
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Rideable',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Right-click your summoned pet to ride it!',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Run',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 1.1,
                        EPIC: 1.2,
                        LEGENDARY: 1.2,
                    }
                    return [
                        'Increases the speed of your mount by ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Ride Into Battle',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'While riding your horse, gain ',
                        <span key="key" style={{ color: green }}>{(0.25 * petLevel).toFixed(1)}%</span>,
                        ' bow damage.',
                    ];
                },
                'action': 'buffBowDamage',
                'amountPerLevel': [
                    0.25
                ]
            }
        ]
    },
    HOUND: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.4,
            FEROCITY: 0.05,
            ATTACK_SPEED: 0.15
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Scavenger',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: orange }}>+{(0.05 * petLevel).toFixed(1)}</span>,
                        ' per monster kill.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Finder',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Increases the chance for monsters to drop their armor by ',
                        <span key="key" style={{ color: green }}>{(0.1 * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Fury Claws',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Grants ',
                        <span key="key" style={{ color: green }}>{(0.1 * petLevel).toFixed(1)}%</span>,
                        <span key="key2" style={{ color: yellow }}> ⚔ Bonus Attack Speed.</span>,
                    ];
                },
                minRarity: 'LEGENDARY',
                resultType: 'globalMultiplier-multi',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.1 * petLevel;
                    return {
                        ATTACK_SPEED: 1 + (value / 100)
                    }
                }
            }
        ]
    },
    JERRY: {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: -1.0
        },
        minRarity: 'COMMON',
        maxRarity: 'MYTHIC',
        abilities: [
            {
                name: 'Jerry',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: green }}>50%</span>,
                        ' chance to deal your regular damage.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Jerry',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: green }}>100%</span>,
                        ' chance to receive a normal amount of drops from mobs.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Jerry',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 0.1,
                        MYTHIC: 0.5
                    }
                    return [
                        'Actually adds ',
                        <span key="key" style={{ color: red }}>{(initialVal[tier] * petLevel).toFixed(1)} Damage</span>,
                        ' to the Aspect of the Jerry.',
                    ];
                },
                'action': 'none'
            },
            {
                minRarity: 'RARE',
                resultType: 'buffWeapon',
                condition: {
                    requirement: 'weapon',
                    validParameters: ['ASPECT_OF_THE_JERRY']
                },
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        LEGENDARY: 0.1,
                        MYTHIC: 0.5
                    }
                    return {
                        DAMAGE: stats[tier] ? stats[tier] * petLevel : stats.MYTHIC * petLevel
                    }
                },
                name: 'Jerry',
                minRarity: 'MYTHIC',
                description: (petLevel, tier) => {
                    return [
                        'Tiny chance to find Jerry Candies when killing mobs.',
                    ];
                },
            }
        ]
    },
    KUUDRA: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.4,
            HEALTH: 4
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Crimson',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.1,
                        UNCOMMON: 0.15,
                        RARE: 0.15,
                        EPIC: 0.2,
                        LEGENDARY: 0.2,
                    }
                    return [
                        'Grants ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' extra crimson essence.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Wither Bait',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.15,
                        EPIC: 0.2,
                        LEGENDARY: 0.2,
                    }
                    return [
                        'Increases the odds of finding a Vanquisher by ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Kuudra Fortune',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: orange }}>+{(0.5 * petLevel).toFixed(1)}☘ Mining Fortune</span>,
                        ' while on the Crimson Isle.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Trophy Bait',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Increases the odds of fishing Trophy Fish by ',
                        <span key="key" style={{ color: green }}>{(0.2 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'buffMobType',
                'mobType': 'Kuudra',
                'percentageAmount': 5
            },
            {
                name: 'Kuudra Specialist',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Increases all damage to Kuudra by ',
                        <span key="key" style={{ color: red }}>5%.</span>,
                    ];
                },
                'action': 'buffMobType',
                'mobType': 'Kuudra',
                'percentageAmount': 5
            }
        ]
    },
    'MAGMA CUBE': {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.2,
            HEALTH: 0.5,
            DEFENSE: 0.333
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Slimy Minions',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.2,
                        UNCOMMON: 0.2,
                        RARE: 0.25,
                        EPIC: 0.3,
                        LEGENDARY: 0.3,
                    }
                    return [
                        'Slime minions work ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' faster while on your island.',
                    ];
                },
                'action': 'none'
            },
            {
                minRarity: 'RARE',
                resultType: 'postMultiplier',
                condition: {
                    requirement: 'targetMob',
                    validParameters: ['Slimes']
                },
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const amount = {
                        RARE: 0.2,
                        EPIC: 0.25,
                        LEGENDARY: 0.25,
                    }
                    const value = amount[tier] ? amount[tier] * petLevel : amount.LEGENDARY * petLevel;
                    return 1 + (value / 100);
                },
                name: 'Salt Blade',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.2,
                        EPIC: 0.25,
                        LEGENDARY: 0.25,
                    }
                    return [
                        'Deal ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' more damage to slimes.',
                    ];
                },
            },
            {
                minRarity: 'LEGENDARY',
                resultType: 'armorStatsBuff',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.5 * petLevel;
                    return {
                        armorKeyword: 'REKINDLED_EMBER',
                        percentage: 1 + (value / 100)
                    }
                },
                name: 'Hot Ember',
                description: (petLevel, tier) => {
                    return [
                        'Buffs the stats of Rekindled Ember Armor by ',
                        <span key="key" style={{ color: green }}>{(0.5 * petLevel).toFixed(1)}%</span>,
                    ];
                },
            }
        ]
    },
    PHOENIX: {
        baseStats: {
            STRENGTH: 10,
            INTELLIGENCE: 50
        },
        statsPerLevel: {
            STRENGTH: 0.5,
            INTELLIGENCE: 1
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Rekindle',
                minRarity: 'EPIC',
                resultType: 'basicStats',
                enabled: false,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        EPIC: 0.1,
                        LEGENDARY: 0.15
                    }
                    return {
                        STRENGTH: petLevel * stats[tier]
                    }
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        EPIC: 0.1,
                        LEGENDARY: 0.15
                    }
                    return [
                        'Before death, become immune and gain ',
                        <span key="key" style={{ color: red }}>{((15 + initialVal[tier] * petLevel).toFixed(1))} Strength</span>,
                        ' for ',
                        <span key="key2" style={{ color: green }}>{(0.02 * petLevel).toFixed(1)}</span>,
                        ' seconds 1 minute cooldown.'
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Fourth Flare',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    const initialVal = {
                        EPIC: { crit: 0.12, time: 0.02 },
                        LEGENDARY: { crit: 0.14, time: 0.03 },
                    }
                    return [
                        'On 4th melee strike, ignite mobs, dealing ',
                        <span key="key" style={{ color: red }}>{(1 + initialVal[tier].crit * petLevel).toFixed(1)}x</span>,
                        ' your ',
                        <span key="key2" style={{ color: blue }}>Crit Damage</span>,
                        ' each second for ',
                        <span key="key3" style={{ color: green }}>{(initialVal[tier].time * petLevel).toFixed(1)}</span>,
                        ' seconds.'
                    ];
                },
                'action': 'petAbility'
            },
            {
                name: 'Magic Bird',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'You may always fly on your Private Island.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Eternal Coins',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Don\'t lose coins from death.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    PIGMAN: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.5,
            FEROCITY: 0.05,
            DEFENSE: 0.5
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Bacon Farmer',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Pig minions work ',
                        <span key="key" style={{ color: green }}>{(0.3 * petLevel).toFixed(1)}%</span>,
                        ' faster while on your island.',
                    ];
                },
                'action': 'none'
            },
            {
                minRarity: 'EPIC',
                resultType: 'buffWeapon',
                condition: {
                    requirement: 'weapon',
                    validParameters: ['PIGMAN_SWORD']
                },
                enabled: true,
                effectResults: (petLevel, tier) => {
                    return {
                        DAMAGE: 0.4 * petLevel,
                        STRENGTH: 0.25 * petLevel
                    }
                },
                name: 'Pork Master',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Buffs the Pigman Sword by ',
                        <span key="key" style={{ color: red }}>{(0.4 * petLevel).toFixed(1)} ❁Damage </span>,
                        ' and ',
                        <span key="key2" style={{ color: red }}>{(0.25 * petLevel).toFixed(1)} ❁Strength.</span>,
                    ];
                },
            },
            {
                name: 'Giant Slayer',
                minRarity: 'LEGENDARY',
                resultType: 'baseMultiplier',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.25 * petLevel;
                    return (value / 100);
                },
                description: (petLevel, tier) => {
                    return [
                        'Deal ',
                        <span key="key" style={{ color: green }}>{(0.25 * petLevel).toFixed(1)}%</span>,
                        ' extra damage to monsters level 100 and up.',
                    ];
                },
                'action': 'baseMultiplierPerLevel',
                'amountPerLevel': [
                    0.25
                ]
            }
        ]
    },
    RAT: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.5,
            CRITICAL_DAMAGE: 0.1,
            HEALTH: 1
        },
        minRarity: 'LEGENDARY',
        maxRarity: 'MYTHIC',
        abilities: [
            {
                name: 'Morph',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Right-click your summoned pet to morph into it!',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'CHEESE!',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'As a Rat, you smell ',
                        <span key="key" style={{ color: yellow }}>CHEESE</span>,
                        ' nearby! Yummy!'
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Rat\'s Blessing',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Has a chance to grant a random player ',
                        <span key="key" style={{ color: lightBlue }}>{(2 + 0.05 * petLevel).toFixed(1)}</span>,
                        ' for ',
                        <span key="key2" style={{ color: green }}>{(20 + 0.4 * petLevel).toFixed(1)}</span>,
                        ' seconds after finding a yummy piece of Cheese! If the player gets a drop during this buff, you have a ',
                        <span key="key3" style={{ color: green }}>20%</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Extreme Speed',
                minRarity: 'MYTHIC',
                description: (petLevel, tier) => {
                    return [
                        'The Rat is TWO times faster.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    'SKELETON HORSE': {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 1,
            WALK_SPEED: 0.5
        },
        minRarity: 'LEGENDARY',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Rideable',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Right-click your summoned pet to ride it!',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Run',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Increases the speed of your mount by ',
                        <span key="key" style={{ color: green }}>{(1.5 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Ride Into Battle',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'While riding your horse, gain ',
                        <span key="key" style={{ color: green }}>+{(0.4 * petLevel).toFixed(1)}%</span>,
                        ' bow damage.',
                    ];
                },
                'action': 'buffBowDamage',
                'amountPerLevel': [
                    0.4
                ]
            }
        ]
    },
    SNOWMAN: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.25,
            CRITICAL_DAMAGE: 0.25,
            DAMAGE: 0.25
        },
        minRarity: 'LEGENDARY',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Blizzard',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Slow all enemies within ',
                        <span key="key" style={{ color: green }}>{(4 + 0.04 * petLevel).toFixed(1)}</span>,
                        ' blocks.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Frostbite',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Your freezing aura slows enemy attacks causing you to take ',
                        <span key="key" style={{ color: green }}>{(0.15 * petLevel).toFixed(1)}%</span>,
                        ' reduced damage.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Snow Cannon',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Your snowman fires a snowball dealing ',
                        <span key="key" style={{ color: green }}>5x</span>,
                        ' your ',
                        <span key="key2" style={{ color: red }}>Strength</span>,
                        ' when a mob gets close to you. (1s cooldown)'
                    ];
                },
                'action': 'none'
            }
        ]
    },
    SKELETON: {
        baseStats: {},
        statsPerLevel: {
            CRITICAL_CHANCE: 0.15,
            CRITICAL_DAMAGE: 0.3
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Bone Arrows',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.1,
                        UNCOMMON: 0.15,
                        RARE: 0.15,
                        EPIC: 0.2,
                        LEGENDARY: 0.2,
                    }
                    return [
                        'Increase arrow damage by ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' which is tripled while in Dungeons',
                    ];
                },
                'action': 'buffArrowDamage'
            },
            {
                name: 'Combo',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 0.15,
                        LEGENDARY: 0.17,
                        LEGENDARY: 0.3,
                    }
                    return [
                        'Gain a combo stack for every bow hit granting ',
                        <span key="key" style={{ color: red }}>+3 Strength</span>,
                        ' Max ',
                        <span key="key2" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        ' stacks, stacks disappear after ',
                        <span key="key4" style={{ color: green }}>8</span>,
                        ' seconds.'
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Skeletal Defense',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Your skeleton shoots an arrow dealing ',
                        <span key="key" style={{ color: green }}>30x</span>,
                        ' your ',
                        <span key="key2" style={{ color: blue }}>Crit Damage </span>,
                        ' when a mob gets close to you (5s cooldown).'
                    ];
                },
                'action': 'none'
            }
        ]
    },
    SPIDER: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.1,
            CRITICAL_CHANCE: 0.1
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'One With the Spider',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: red }}>{(0.1 * petLevel).toFixed(1)} Strength</span>,
                        ' for every nearby spider. (max 10 spiders).',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Web-Weaver',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    return [
                        'Upon hitting a monster it becomes slowed by ',
                        <span key="key" style={{ color: green }}>{(0.4 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Spider Whisperer',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Spider and tarantula minions work ',
                        <span key="key" style={{ color: green }}>{(0.3 * petLevel).toFixed(1)}%.</span>,
                        ' faster while on your island.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    SPIRIT: {
        baseStats: {},
        statsPerLevel: {
            WALK_SPEED: 0.3,
            INTELLIGENCE: 1
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Spirit Assistance ',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Spawns and assists you when you are ghost in dungeons.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Spirit Cooldowns',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Reduces the cooldown of your ghost abilities in dungeons by ',
                        <span key="key" style={{ color: green }}>{(5 + 0.45 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Half Life',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        ' If you are the first player to die in a dungeon, the score penalty for that death is reduced to ',
                        <span key="key" style={{ color: green }}>1.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    TARANTULA: {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.1,
            CRITICAL_CHANCE: 0.1,
            CRITICAL_DAMAGE: 0.3
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Webbed Cells',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Anti-healing is ',
                        <span key="key" style={{ color: green }}>{(0.3 * petLevel).toFixed(1)}%</span>,
                        ' less effective against you.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Eight Legs',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        ' Decreases the Mana Cost of Spider, Tarantula and Spirit Boots boots by ',
                        <span key="key" style={{ color: green }}>{(0.5 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Arachnid Slayer',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Grants ',
                        <span key="key" style={{ color: green }}>{(0.5 * petLevel).toFixed(1)}% </span>,
                        <span key="key2" style={{ color: teal }}>☯ Combat Wisdom</span>,
                        ' against Spiders.'
                    ];
                },
                'action': 'none'
            }
        ]
    },
    TURTLE: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 0.1,
            DEFENSE: 1
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                minRarity: 'EPIC',
                resultType: 'globalMultiplier-add',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 3 + (0.27 * petLevel);
                    return {
                        DEFENSE: (value / 100)
                    }
                },
                name: 'Turtle Tactics',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Gain  ',
                        <span key="key" style={{ color: green }}>{(3 + 0.27 * petLevel).toFixed(1)}% Defense.</span>,
                    ];
                },
            },
            {
                name: 'Genius Amniote',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Gain  ',
                        <span key="key" style={{ color: green }}>{(5 + 0.25 * petLevel).toFixed(1)} Defense.</span>,
                        ' for every player around you, up to 4 nearby players.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Unflippable',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gain immunity to knockback.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Turtle Shell',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'When under ',
                        <span key="key" style={{ color: red }}>33%</span>,
                        ' maximum HP, you take ',
                        <span key="key2" style={{ color: green }}>{(0.25 * petLevel).toFixed(1)}%</span>,
                        ' less damage.'
                    ];
                },
                'action': 'none'
            }
        ]
    },
    WOLF: {
        baseStats: {},
        statsPerLevel: {
            TRUE_DEFENSE: 0.1,
            CRITICAL_DAMAGE: 0.1,
            HEALTH: 0.5,
            WALK_SPEED: 0.2
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Alpha Dog',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.1,
                        UNCOMMON: 0.2,
                        RARE: 0.2,
                        EPIC: 0.3,
                        LEGENDARY: 0.3,
                    }
                    return [
                        'Take ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' less damage from wolves.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Pack Leader',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.1,
                        EPIC: 0.15,
                        LEGENDARY: 0.15,
                    }
                    return [
                        'Gain ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}% </span>,
                        <span key="key2" style={{ color: blue }}>Crit Damage </span>,
                        ' for every nearby wolf (max 10 wolves).',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Combat Wisdom Boost',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 1
                    }
                    return [
                        'Grants ',
                        <span key="key2" style={{ color: teal }}>+{(0.3 * petLevel).toFixed(1)}☯ Combat Wisdom.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    ZOMBIE: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 1,
            CRITICAL_DAMAGE: 0.3
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Chomp',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Heal ',
                        <span key="key" style={{ color: red }}>+{(0.25 * petLevel).toFixed(1)} Health</span>,
                        '  per Zombie kill.',
                    ];
                },
                'action': 'none'
            },
            {
                resultType: 'postMultiplier',
                condition: {
                    requirement: 'targetMob',
                    validParameters: ['Zombie']
                },
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const percentage = {
                        RARE: 0.20,
                        EPIC: 0.25,
                        LEGENDARY: 0.25,
                    }
                    const value = percentage[tier] * petLevel;
                    return 1 + (value / 100);
                },
                name: 'Rotten Blade',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.2,
                        EPIC: 0.25,
                        LEGENDARY: 0.25,
                    }
                    return [
                        'Deal ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' more damage to zombies.',
                    ];
                },
            },
            {
                resultType: 'livingDead',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.2 * petLevel;
                    return {
                        percentage: value / 100
                    }
                },
                name: 'Living Dead',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Increases all undead armor sets by ',
                        <span key="key" style={{ color: green }}>{(0.2 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
            }
        ]
    },
    BEE: {
        baseStats: {
            STRENGTH: 5
        },
        statsPerLevel: {
            STRENGTH: 0.25,
            INTELLIGENCE: 0.5,
            WALK_SPEED: 0.1
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Hive',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: { INTEL: 0.02, STRENGTH: 0.02 },
                        UNCOMMON: { INTEL: 0.04, STRENGTH: 0.04 },
                        RARE: { INTEL: 0.09, STRENGTH: 0.07 },
                        EPIC: { INTEL: 0.14, STRENGTH: 0.11 },
                        LEGENDARY: { INTEL: 0.19, STRENGTH: 0.14 },
                    }
                    return [
                        'Gain ',
                        <span key="key" style={{ color: lightBlue }}>{(1 + initialVal[tier].INTEL * petLevel).toFixed(1)} ✎Intelligence</span>,
                        ' and ',
                        <span key="key2" style={{ color: red }}>{(1 + initialVal[tier].STRENGTH * petLevel).toFixed(1)} ❁Strength </span>,
                        ' for each nearby bee. (max 15 bees)'
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Busy Buzz Buzz',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.5,
                        EPIC: 0.5,
                        LEGENDARY: 1,
                    }
                    return [
                        'Has ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' chance for flowers to drop an extra one',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Weaponized Honey',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: green }}>{(5 + 0.2 * petLevel).toFixed(1)}</span>,
                        ' of received damage as ',
                        <span key="key2" style={{ color: orange }}>Absorption.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    CHICKEN: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 2
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Light Feet',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.3,
                        UNCOMMON: 0.3,
                        RARE: 0.4,
                        EPIC: 0.5,
                        LEGENDARY: 0.5
                    }
                    return [
                        'Reduces fall damage by ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Eggstra',
                minRarity: 'RARE    ',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.8,
                        EPIC: 1,
                        LEGENDARY: 1
                    }
                    return [
                        'Killing chickens has a ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' chance to drop an egg.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Mighty Chickens',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 1
                    }
                    return [
                        ' Chicken Minions work ',
                        <span key="key" style={{ color: green }}>{(0.3 * petLevel).toFixed(1)}%</span>,
                        ' faster while on your island.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    ELEPHANT: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 1,
            INTELLIGENCE: 0.75
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                resultType: 'statPerStat',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const receiveAmount = {
                        COMMON: 0.15,
                        UNCOMMON: 0.15,
                        RARE: 0.15,
                        EPIC: 0.20,
                        LEGENDARY: 0.20,
                    }
                    const dependentAmount = 100;
                    return {
                        receiveStat: 'DEFENSE',
                        receivePer: receiveAmount[tier] ? receiveAmount[tier] * petLevel : receiveAmount.LEGENDARY * petLevel,
                        dependentStat: 'WALK_SPEED',
                        perDependent: dependentAmount
                    }
                },
                name: 'Stomp',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.15,
                        UNCOMMON: 0.15,
                        RARE: 0.15,
                        EPIC: 0.2,
                        LEGENDARY: 0.2
                    }
                    return [
                        'Gain ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        ' for every ',
                        <span key="key2" style={{ color: white }}>100 ✦ Speed.</span>,
                    ];
                },
            },
            {
                resultType: 'statPerStat',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const receiveAmount = 0.01;
                    const dependentAmount = 10;
                    return {
                        receiveStat: 'HEALTH',
                        receivePer: receiveAmount * petLevel,
                        dependentStat: 'DEFENSE',
                        perDependent: dependentAmount
                    }
                },
                name: 'Walking Fortress',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: red }}>{(0.01 * petLevel).toFixed(1)} Health</span>,
                        ' for every ',
                        <span key="key2" style={{ color: green }}>10 Defense.</span>,
                    ];
                },
            },
            {
                name: 'Trunk Efficiency',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        ' Grants ',
                        <span key="key" style={{ color: orange }}>+{(1.8 * petLevel).toFixed(1)} Farming Fortune,</span>,
                        ' which increases your chance for multiple drops.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    'MOOSHROOM COW': {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 1
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Efficient Mushrooms',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.2,
                        UNCOMMON: 0.2,
                        RARE: 0.3,
                        EPIC: 0.3,
                        LEGENDARY: 0.3
                    }
                    return [
                        'Mushroom and Mycelium minions work ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' faster while on your island.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Mushroom Eater',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    return [
                        'When Breaking crops, there is a ',
                        <span key="key" style={{ color: green }}>{(1 * petLevel).toFixed(1)}%</span>,
                        ' chance that a mushroom will drop.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Farming Strength',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: orange }}>+1 Farming Fortune</span>,
                        ' per every ',
                        <span key="key2" style={{ color: red }}>{(40 - 0.2 * petLevel).toFixed(1)} Strength.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    PIG: {
        baseStats: {},
        statsPerLevel: {
            WALK_SPEED: 0.25
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Ridable',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Right-click your summoned pet to ride it!',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Run',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.3,
                        UNCOMMON: 0.4,
                        RARE: 0.4,
                        EPIC: 0.5,
                        LEGENDARY: 0.5
                    }
                    return [
                        'Increases the speed of your mount by ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Sprint',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.4,
                        EPIC: 0.5,
                        LEGENDARY: 0.5
                    }
                    return [
                        ' While holding an Enchanted Carrot on a Stick, increase the speed of your mount by ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Trample',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'While on your private island, break all the crops your pig rides over.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    RABBIT: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 1,
            WALK_SPEED: 0.2
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Happy Feet',
                minRarity: 'COMMON',
                resultType: 'basicStats',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        COMMON: 0.3,
                        UNCOMMON: 0.4,
                        RARE: 0.4,
                        EPIC: 0.5,
                        LEGENDARY: 0.5
                    }
                    return {
                        WALK_SPEED: stats[tier] * petLevel
                    }
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.3,
                        UNCOMMON: 0.4,
                        RARE: 0.4,
                        EPIC: 0.5,
                        LEGENDARY: 0.5
                    }
                    return [
                        'Jump potions also give ',
                        <span key="key" style={{ color: green }}>+{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: white }}> ✦ Speed.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Farming Wisdom Boost',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.25,
                        EPIC: 0.3,
                        LEGENDARY: 0.3
                    }
                    return [
                        ' Grants ',
                        <span key="key2" style={{ color: teal }}>+{(initialVal[tier] * petLevel).toFixed(1)} ☯ Farming Wisdom.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Efficient Farming',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Farming minions work ',
                        <span key="key" style={{ color: green }}>{(0.3 * petLevel).toFixed(1)}%</span>,
                        ' faster while on your island.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    ARMADILLO: {
        baseStats: {},
        statsPerLevel: {
            DEFENSE: 2
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Ridable',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Right-click your summoned pet to ride it!',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Tunneller',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'The Armadillo breaks all stone or ore in its path while you are riding it in the Crystal Hollows.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Earth Surfer',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'The Armadillo moves faster based on your Speed.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Rolling Miner',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.2,
                        EPIC: 0.3,
                        LEGENDARY: 0.3
                    }
                    return [
                        'Every ',
                        <span key="key" style={{ color: green }}>{(60 - initialVal[tier] * petLevel).toFixed(1)}</span>,
                        ' seconds, the next gemstone you mine gives 2x drops.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Mobile Tank',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    const initialVal = {
                        LEGENDARY: 1
                    }
                    return [
                        'For every ',
                        <span key="key" style={{ color: green }}>{(100 - 0.5 * petLevel).toFixed(1)}</span>,
                        ' gain ',
                        <span key="key2" style={{ color: white }}>+1 ✦ Speed</span>,
                        ' and ',
                        <span key="key3" style={{ color: orange }}>+1  Mining Speed.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    BAT: {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 1,
            WALK_SPEED: 0.05
        },
        minRarity: 'COMMON',
        maxRarity: 'MYTHIC',
        abilities: [
            {
                name: 'Candy Lover',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.1,
                        UNCOMMON: 0.15,
                        RARE: 0.15,
                        EPIC: 0.2,
                        LEGENDARY: 0.2,
                        MYTHIC: 0.2
                    }
                    return [
                        'Increases drop chance of candies from mobs by ',
                        <span key="key2" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Nightmare',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: { INTEL: 0.2, SPEED: 0.4 },
                        EPIC: { INTEL: 0.3, SPEED: 0.5 },
                        LEGENDARY: { INTEL: 0.3, SPEED: 0.5 },
                        MYTHIC: { INTEL: 0.3, SPEED: 0.5 },
                    }
                    return [
                        'During night, gain ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier].INTEL * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: lightBlue }}> Intelligence, </span>,
                        <span key="key3" style={{ color: green }}>{(initialVal[tier].SPEED * petLevel).toFixed(1)}</span>,
                        <span key="key4" style={{ color: white }}> ✦ Speed</span>,
                        ' , and Night Vision.',

                    ];
                },
                'action': 'addStatPerLevel',
                'stats': {
                    'INTELLIGENCE': [
                        { INTEL: 0.2, SPEED: 0.4 },
                        0.2,
                        0.3
                    ],
                    'WALK_SPEED': [
                        0.4,
                        0.4,
                        0.5
                    ]
                }
            },
            {
                name: 'Wings of Steel',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Deal ',
                        <span key="key" style={{ color: green }}>+{(0.5 * petLevel).toFixed(1)}%</span>,
                        ' damage to Spooky enemies during the Spooky Festival.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Sonar',
                minRarity: 'MYTHIC',
                description: (petLevel, tier) => {
                    return [
                        <span key="key" style={{ color: green }}>+{(0.25 * petLevel).toFixed(1)}%</span>,
                        ' chance to fish up spooky sea creatures',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    ENDERMITE: {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 1
        },
        minRarity: 'COMMON',
        maxRarity: 'MYTHIC',
        abilities: [
            {
                name: 'More Stonks',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.5,
                        UNCOMMON: 0.75,
                        RARE: 0.75,
                        EPIC: 1,
                        LEGENDARY: 1,
                        MYTHIC: 1
                    }
                    return [
                        'Gain more exp orbs for breaking end stone and gain a ',
                        <span key="key1" style={{ color: green }}>+{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' chance to get an extra block dropped.',

                    ];
                },
                'action': 'none'
            },
            {
                name: 'Daily Commuter',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.75,
                        EPIC: 0.1,
                        LEGENDARY: 0.1,
                        MYTHIC: 0.1
                    }
                    return [
                        <span key="key" style={{ color: blue }}>Transmission Abilities</span>,
                        ' cost ',
                        <span key="key2" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' less mana.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Mite Bait',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gain a ',
                        <span key="key" style={{ color: green }}>{(0.03 * petLevel).toFixed(1)}%</span>,
                        ' chance to dig up a bonus ',
                        <span key="key2" style={{ color: red }}>Nest Endermite</span>,
                        ' per ',
                        <span key="key3" style={{ color: magenta }}>+1 ♣ Pet Luck</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Sacrificer',
                minRarity: 'MYTHIC',
                description: (petLevel, tier) => {
                    return [
                        'Increases the odds of rolling for bonus items in the ',
                        <span key="key" style={{ color: red }}>Draconic Altar</span>,
                        ' by ',
                        <span key="key2" style={{ color: green }}>{(0.1 * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    'MITHRIL GOLEM': {
        baseStats: {},
        statsPerLevel: {
            TRUE_DEFENSE: 0.5
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Mithril Affinity',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.5,
                        UNCOMMON: 0.75,
                        RARE: 0.75,
                        EPIC: 1,
                        LEGENDARY: 1,
                    }
                    return [
                        'Gain ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: orange }}> Mining Speed</span>,
                        ' when mining ',
                        <span key="key3" style={{ color: yellow }}>Mithril</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'The Smell Of Powder',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.1,
                        EPIC: 0.2,
                        LEGENDARY: 0.2
                    }
                    return [
                        'Gain ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' more ',
                        <span key="key2" style={{ color: darkGreen }}>Mithril Powder</span>,
                        ' while mining.'
                    ];
                },
                'action': 'none'
            },
            {
                resultType: 'combatMulti',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = (0.2 * petLevel);
                    return {
                        percentage: 1 + (value / 100)
                    }
                },
                name: 'Danger Averse',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Increases your combat stats by ',
                        <span key="1" style={{ color: green }}>{(0.2 * petLevel).toFixed(1)}%</span>,
                        ' on mining islands.',
                    ];
                },
            }
        ]
    },
    ROCK: {
        baseStats: {},
        statsPerLevel: {
            TRUE_DEFENSE: 0.1,
            DEFENSE: 2
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Rideable',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Right-click on your summoned pet to ride it!',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Sailing Stone',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    return [
                        'Sneak to move your rock to your location (15s cooldown)',
                    ];
                },
                'action': 'none'
            },
            {
                resultType: 'rockDefense',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const baseIncrease = {
                        RARE: 0.2,
                        EPIC: 0.25,
                        LEGENDARY: 0.25,
                    }
                    const value = baseIncrease[tier] ? baseIncrease[tier] * petLevel : baseIncrease.LEGENDARY * petLevel;
                    return {
                        percentage: (value / 100)
                    }
                },
                name: 'Fortify',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.3,
                        EPIC: 0.25,
                        LEGENDARY: 0.25
                    }
                    return [
                        'While sitting on your rock, gain ',
                        <span key="key" style={{ color: green }}>+{(initialVal[tier] * petLevel).toFixed(1)}% ❈Defense</span>,
                    ];
                },
            },
            {
                resultType: 'postMultiplier',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.3 * petLevel;
                    return 1 + (value / 100);
                },
                name: 'Steady Ground',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'While sitting on your rock, gain ',
                        <span key="key" style={{ color: green }}>+{(0.3 * petLevel).toFixed(1)}%</span>,
                        <span key="key2" style={{ color: red }}> ❁Damage</span>,
                    ];
                },
            }
        ]
    },
    SCATHA: {
        baseStats: {},
        statsPerLevel: {
            DEFENSE: 1
        },
        minRarity: 'RARE',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Grounded',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 1,
                        EPIC: 1.25,
                        LEGENDARY: 1.25
                    }
                    return [
                        'Gain ',
                        <span key="key" style={{ color: orange }}>+{(initialVal[tier] * petLevel).toFixed(1)} ☘ Mining Fortune.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Burrowing',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.025,
                        EPIC: 0.03,
                        LEGENDARY: 0.03
                    }
                    return [
                        'When mining, there is a ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' chance to mine up a treasure burrow.',

                    ];
                },
                'action': 'none'
            },
            {
                name: 'Wormhole',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Gives a ',
                        <span key="key" style={{ color: green }}>{(1 * petLevel).toFixed(1)}%</span>,
                        ' chance to mine 2 adjacent stone or hard stone.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Gemstone Power',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key2" style={{ color: green }}>+{(0.2 * petLevel).toFixed(1)}%</span>,
                        ' more Gemstone Powder.',

                    ];
                },
                'action': 'none'
            }
        ]
    },
    SILVERFISH: {
        baseStats: {},
        statsPerLevel: {
            DEFENSE: 1,
            HEALTH: 0.2
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                resultType: 'basicStats',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        COMMON: 0.05,
                        UNCOMMON: 0.1,
                        RARE: 0.1,
                        EPIC: 0.15,
                        LEGENDARY: 0.15
                    }
                    return {
                        TRUE_DEFENSE: stats[tier] ? stats[tier] * petLevel : stats.LEGENDARY * petLevel
                    }
                },
                name: 'True Defense Boost',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.05,
                        UNCOMMON: 0.1,
                        RARE: 1,
                        EPIC: 0.15,
                        LEGENDARY: 0.15
                    }
                    return [
                        'Boosts your ',
                        <span key="key" style={{ color: white }}>❂True Defense</span>,
                        ' by ',
                        <span key="key2" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                    ];
                },
            },
            {
                name: 'Mining Wisdom Boost',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.25,
                        EPIC: 0.3,
                        LEGENDARY: 0.3,
                    }
                    return [
                        'Grants ',
                        <span key="key2" style={{ color: teal }}>+{(initialVal[tier] * petLevel).toFixed(1)} ☯Mining Wisdom.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Dexterity',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gives permanent haste III.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    SNAIL: {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 1
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Red Sand Enjoyer',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.1,
                        UNCOMMON: 0.2,
                        RARE: 0.3,
                        EPIC: 0.3,
                        LEGENDARY: 0.3
                    }
                    return [
                        'Red Sand minions work ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' faster while on your island.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Slow Moving',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.3,
                        EPIC: 0.5,
                        LEGENDARY: 0.5
                    }
                    return [
                        'Converts all ',
                        <span key="key" style={{ color: white }}>✦ Speed</span>,
                        ' over 100 into ',
                        <span key="key2" style={{ color: orange }}>☘ Mining Fortune</span>,
                        ' for Non-Ores at ',
                        <span key="key3" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' efficiency.'
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Slow But Efficient',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Reduces the mana cost of ',
                        <span key="key" style={{ color: blue }}>Utility Abilities</span>,
                        ' by ',
                        <span key="key2" style={{ color: green }}>{(0.01 * petLevel).toFixed(1)}%</span>,
                        ' for every 15 ',
                        <span key="key3" style={{ color: white }}>✦ Speed</span>,
                        ' converted.'
                    ];
                },
                'action': 'none'
            }
        ]
    },
    'WITHER SKELETON': {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.25,
            CRITICAL_DAMAGE: 0.25,
            DEFENSE: 0.25,
            CRITICAL_CHANCE: 0.05,
            INTELLIGENCE: 0.25
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Stronger Bones',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Take ',
                        <span key="key" style={{ color: green }}>{(0.3 * petLevel).toFixed(1)}%</span>,
                        ' less damage from Skeletons',
                    ];
                },
                'action': 'none'
            },
            {

                resultType: 'postMultiplier',
                condition: {
                    requirement: 'targetMob',
                    validParameters: ['Wither']
                },
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.25 * petLevel;
                    return 1 + (value / 100);
                },
                name: 'Wither Blood',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Deal ',
                        <span key="key" style={{ color: green }}>{(0.25 * petLevel).toFixed(1)}%</span>,
                        ' more damage against wither mobs.',
                    ];
                },
            },
            {
                name: 'Death\'s Touch',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Upon hitting an enemy inflict the wither effect for ',
                        <span key="key" style={{ color: green }}>{(2 * petLevel).toFixed(1)}%</span>,
                        ' damage over 3 seconds. Does not stack',

                    ];
                },
                'action': 'petAbility'
            }
        ]
    },
    GIRAFFE: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 1,
            CRITICAL_CHANCE: 0.05
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Good Heart',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.05,
                        UNCOMMON: 0.1,
                        RARE: 0.15,
                        EPIC: 0.2,
                        LEGENDARY: 0.25
                    }
                    return [
                        'Regen ',
                        <span key="key" style={{ color: red }}>{(initialVal[tier] * petLevel).toFixed(1)} ❤Health</span>,
                        ' per second.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Higher Ground',
                minRarity: 'RARE',
                enabled: false,
                resultType: 'basicStats',
                effectResults: (petLevel, tier) => {
                    const stats = {
                        RARE: { strength: 0.4, crit: 0.1 },
                        EPIC: { strength: 0.5, crit: 0.25 },
                        LEGENDARY: { strength: 0.5, crit: 0.4 }
                    }
                    return {
                        STRENGTH: petLevel * stats[tier].strength,
                        CRITICAL_DAMAGE: petLevel * stats[tier].crit,
                    }
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: { strength: 0.4, crit: 0.1 },
                        EPIC: { strength: 0.5, crit: 0.25 },
                        LEGENDARY: { strength: 0.5, crit: 0.4 }
                    }
                    return [
                        'Grants ',
                        <span key="key" style={{ color: green }}>+{(initialVal[tier].strength * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: red }}> ❁Strength</span>,
                        ' and ',
                        <span key="key3" style={{ color: green }}>+{(initialVal[tier].crit * petLevel).toFixed(1)}</span>,
                        <span key="key4" style={{ color: blue }}> ☠Crit Damage </span>,
                        'when mid air.'
                    ];
                },
                'action': 'addStatPerLevel',
                'stats': {
                    'STRENGTH': [
                        0.4,
                        0.4,
                        0.4,
                        0.5
                    ],
                    'CRITICAL_DAMAGE': [
                        0.1,
                        0.1,
                        0.1,
                        0.25,
                        0.4
                    ]
                }
            },
            {
                name: 'Long Neck',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'See enemies from afar and gain ',
                        <span key="key" style={{ color: green }}>{(0.25 * petLevel).toFixed(1)}%</span>,
                        ' dodge chance.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    MONKEY: {
        baseStats: {},
        statsPerLevel: {
            WALK_SPEED: 0.2,
            INTELLIGENCE: 0.5
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Treeborn',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.4,
                        UNCOMMON: 0.5,
                        RARE: 0.5,
                        EPIC: 0.6,
                        LEGENDARY: 0.6
                    }
                    return [
                        'Grants ',
                        <span key="key" style={{ color: green }}>+{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: orange }}> ☘Foraging Fortune,</span>,
                        ' which increases your chances at double logs.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Vine Swing',
                minRarity: 'RARE',
                resultType: 'basicStats',
                enabled: false,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        RARE: 0.75,
                        EPIC: 1,
                        LEGENDARY: 1
                    }
                    return {
                        WALK_SPEED: petLevel * stats[tier]
                    }
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.75,
                        EPIC: 1,
                        LEGENDARY: 1
                    }
                    return [
                        'Gain ',
                        <span key="key" style={{ color: green }}>+{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: white }}> ✦Speed</span>,
                        ' while in The Park.',
                    ];
                },
                'action': 'addStatPerLevel',
                'stats': {
                    'WALK_SPEED': [
                        0.75,
                        0.75,
                        0.75,
                        1
                    ]
                }
            },
            {
                name: 'Evolves Axes',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Reduce the cooldown of Jungle Axe and Treecapitator by ',
                        <span key="key" style={{ color: green }}>{(0.5 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    OCELOT: {
        baseStats: {},
        statsPerLevel: {
            WALK_SPEED: 0.5,
            FEROCITY: 0.1
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Foraging Wisdom Boost',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.2,
                        UNCOMMON: 0.25,
                        RARE: 0.25,
                        EPIC: 0.3,
                        LEGENDARY: 0.3
                    }
                    return [
                        'Grants ',
                        <span key="key" style={{ color: teal }}>+{(initialVal[tier] * petLevel).toFixed(1)} ☯Foraging Wisdom.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Tree Hugger',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.3,
                        EPIC: 0.3,
                        LEGENDARY: 0.3
                    }
                    return [
                        'Foraging minions work ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' faster while on your island.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Tree Essence',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Increases your ',
                        <span key="key" style={{ color: green }}>{(0.3 * petLevel).toFixed(1)}%</span>,
                        ' chance to get exp from breaking a log.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    AMMONITE: {
        baseStats: {},
        statsPerLevel: {},
        minRarity: 'LEGENDARY',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Heart of the Sea',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Grants ',
                        <span key="key" style={{ color: teal }}>+{(0.1 * petLevel).toFixed(1)}% Sea Creature Chance </span>,
                        ' to your pet for each ',
                        <span key="key2" style={{ color: purple }}>Heart of the Mountain</span>,
                        ' level.',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Expert Cave Fisher',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'The fishing speed reduction from being underground is attenuated by ',
                        <span key="key" style={{ color: green }}>{(1 * petLevel).toFixed(1)}%.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                resultType: 'statBasedOnSkill',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    return {
                        MINING: {
                            WALK_SPEED: 0.02 * petLevel,
                            DEFENSE: 0.02 * petLevel
                        },
                        FISHING: {
                            WALK_SPEED: 0.02 * petLevel,
                            DEFENSE: 0.02 * petLevel
                        }
                    }
                },
                name: 'Gift of the Ammonite',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Each Mining and Fishing level grants ',
                        <span key="key" style={{ color: lightBlue }}>+{(0.005 * petLevel).toFixed(2)} ☂Fishing Speed,</span>,
                        <span key="key2" style={{ color: white }}> +{(0.02 * petLevel).toFixed(1)} ✦Speed</span>,
                        ' and ',
                        <span key="key3" style={{ color: green }}> +{(0.02 * petLevel).toFixed(1)} ❈Defense.</span>,
                    ];
                },
            }
        ]
    },
    'BABY YETI': {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.4,
            INTELLIGENCE: 0.75
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                resultType: 'basicStats',
                enabled: false,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        EPIC: {
                            STRENGTH: 0.5,
                            CRITICAL_DAMAGE: 0.5
                        },
                        LEGENDARY: {
                            STRENGTH: 0.5,
                            CRITICAL_DAMAGE: 0.5
                        },
                    }
                    return {
                        STRENGTH: stats[tier]?.STRENGTH ? stats[tier].STRENGTH * petLevel : stats.LEGENDARY.STRENGTH * petLevel,
                        CRITICAL_DAMAGE: stats[tier]?.CRITICAL_DAMAGE ? stats[tier].CRITICAL_DAMAGE * petLevel : stats.LEGENDARY.CRITICAL_DAMAGE * petLevel,
                    }
                },
                name: 'Cold Breeze',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Gives ',
                        <span key="key" style={{ color: green }}>{(0.5 * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: red }}> ❁ Strength</span>,
                        ' and ',
                        <span key="key3" style={{ color: blue }}>☠ Crit Damage</span>,
                        ' when near snow.',
                    ];
                },
            },
            {
                resultType: 'IceShields',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const percentages = {
                        EPIC: 0.5,
                        LEGENDARY: 0.75,
                    }
                    return percentages[tier] ? percentages[tier] * petLevel : percentages.LEGENDARY * petLevel;
                },
                name: 'Ice Shields',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    const initialVal = {
                        EPIC: 0.5,
                        LEGENDARY: 0.75,
                    }
                    return [
                        'Gain ',
                        <span key="key2" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' of your strength as ',
                        <span key="key3" style={{ color: green }}> ❈Defense.</span>,
                    ];
                },
            },
            {
                minRarity: 'LEGENDARY',
                resultType: 'buffWeapon',
                condition: {
                    requirement: 'weapon',
                    validParameters: ['YETI_SWORD']
                },
                enabled: true,
                effectResults: (petLevel, tier) => {
                    return {
                        DAMAGE: 1 * petLevel,
                        INTELLIGENCE: 1 * petLevel
                    }
                },
                name: 'Yeti Fury',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Buff the Yeti Sword by ',
                        <span key="key" style={{ color: green }}>{(1 * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: red }}> ❁Damage</span>,
                        ' and ',
                        <span key="key3" style={{ color: lightBlue }}> ✎Intelligence.</span>,
                    ];
                },
            }
        ]
    },
    BLUE_WHALE: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 2
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Ingest',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.5,
                        UNCOMMON: 1,
                        RARE: 1.5,
                        EPIC: 2,
                        LEGENDARY: 2
                    }
                    return [
                        'All potions heal ',
                        <span key="key" style={{ color: red }}>+{(initialVal[tier] * petLevel).toFixed(1)} ❤HP.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                resultType: 'statPerStat',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const dependentAmount = {
                        RARE: 30,
                        EPIC: 25,
                        LEGENDARY: 20,
                    }
                    const receiveAmount = 0.01 * petLevel;
                    return {
                        receiveStat: 'DEFENSE',
                        receivePer: receiveAmount,
                        dependentStat: 'HEALTH',
                        perDependent: dependentAmount[tier] ? dependentAmount[tier] : dependentAmount.LEGENDARY,
                    }
                },
                name: 'Bulk',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 30,
                        EPIC: 25,
                        LEGENDARY: 20,
                    }
                    return [
                        ' Gain ',
                        <span key="key" style={{ color: green }}>+{(0.01 * petLevel).toFixed(2)} ❈Defense</span>,
                        ' per ',
                        <span key="key2" style={{ color: red }}>{initialVal[tier]} Max ❤Health.</span>,
                    ];
                },
            },
            {
                resultType: 'globalMultiplier-add',
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.2 * petLevel;
                    return {
                        HEALTH: value / 100
                    };
                },
                name: 'Archimedes',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gain ',
                        <span key="key" style={{ color: red }}>+{(0.2 * petLevel).toFixed(1)}% Max ❤Health.</span>,
                    ];
                },
            }
        ]
    },
    DOLPHIN: {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 1
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Pod Tactics',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.06,
                        UNCOMMON: 0.08,
                        RARE: 0.08,
                        EPIC: 0.1,
                        LEGENDARY: 0.1
                    }
                    return [
                        'Grants ',
                        <span key="key" style={{ color: lightBlue }}>+{(initialVal[tier] * petLevel).toFixed(1)}% ☂Fishing Speed</span>,
                        ' for each player within ',
                        <span key="key2" style={{ color: green }}>30</span>,
                        ' blocks, up to ',
                        <span key="key3" style={{ color: green }}>5</span>,
                        ' players.'
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Echolocation',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.07,
                        EPIC: 0.1,
                        LEGENDARY: 0.1
                    }
                    return [
                        'Grants ',
                        <span key="key" style={{ color: teal }}>+{(initialVal[tier] * petLevel).toFixed(1)}% Sea Creature Chance.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Splash Surprise',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Stun sea creatures for ',
                        <span key="key" style={{ color: green }}>5s</span>,
                        ' after fishing them up.',
                    ];
                },
                'action': 'none'
            }
        ]
    },
    'FLYING FISH': {
        baseStats: {},
        statsPerLevel: {
            STRENGTH: 0.5,
            DEFENSE: 0.5
        },
        minRarity: 'RARE',
        maxRarity: 'MYTHIC',
        abilities: [
            {
                name: 'Quick Reel',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.6,
                        EPIC: 0.75,
                        LEGENDARY: 0.8,
                        MYTHIC: 0.8
                    }
                    return [
                        'Grants ',
                        <span key="key2" style={{ color: lightBlue }}>+{(initialVal[tier] * petLevel).toFixed(1)} ☂Fishing Speed.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Water Bender',
                name2: { minRarity: 'MYTHIC', name: 'Lava Bender' },
                minRarity: 'RARE',
                enabled: false,
                resultType: 'basicStats',
                effectResults: (petLevel, tier) => {
                    const stats = {
                        RARE: 0.8,
                        EPIC: 1,
                        LEGENDARY: 1,
                        MYTHIC: 1
                    }
                    return {
                        STRENGTH: petLevel * stats[tier],
                        DEFENSE: petLevel * stats[tier],
                    }
                },
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.8,
                        EPIC: 1,
                        LEGENDARY: 1,
                        MYTHIC: 1
                    }
                    return [
                        'Gives ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: red }}> ❁Strength</span>,
                        ' and ',
                        <span key="key3" style={{ color: green }}> ❈Defense</span>,
                        ` when near ${tier === 'MYTHIC' ? 'Lava.' : 'Water.'}`,
                    ];
                },
                'action': 'addStatPerLevel',
                'stats': {
                    'STRENGTH': [
                        0.8,
                        0.8,
                        0.8,
                        1
                    ],
                    'DEFENSE': [
                        0.8,
                        0.8,
                        0.8,
                        1
                    ]
                }
            },
            {
                minRarity: 'LEGENDARY',
                resultType: 'armorStatsBuff',
                postEffect: true,
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const value = 0.2 * petLevel;
                    if (tier === 'LEGENDARY') {
                        return {
                            armorKeyword: 'DIVER',
                            percentage: 1 + (value / 100)
                        }
                    }
                    else if (tier === 'MYTHIC') {
                        return {
                            armorKeyword: 'MAGMA_LORD',
                            percentage: 1 + (value / 100)
                        }
                    }
                },
                name: 'Deep Sea Diver',
                name2: { minRarity: 'MYTHIC', name: 'Magmatic Diver' },
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        `Increases the stats of ${tier === 'MYTHIC' ? 'Magma Lord Armor ' : 'Diver\'s Armor'} by `,
                        <span key="key2" style={{ color: green }}>{(0.2 * petLevel).toFixed(1)}%</span>,
                    ];
                },
            }
        ]
    },
    SQUID: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 0.5,
            INTELLIGENCE: 0.5
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'More Ink',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.5,
                        UNCOMMON: 0.75,
                        RARE: 0.75,
                        EPIC: 1,
                        LEGENDARY: 1
                    }
                    return [
                        'Gain a ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier] * petLevel).toFixed(1)}%</span>,
                        ' hance to get double drops from squids.'
                    ];
                },
                'action': 'none'
            },
            {
                resultType: 'buffWeapon',
                condition: {
                    requirement: 'weapon',
                    validParameters: ['INK_WAND']
                },
                enabled: true,
                effectResults: (petLevel, tier) => {
                    const stats = {
                        RARE: { DAMAGE: 0.3, STRENGTH: 0.1 },
                        EPIC: { DAMAGE: 0.4, STRENGTH: 0.2 },
                        LEGENDARY: { DAMAGE: 0.4, STRENGTH: 0.2 }
                    }
                    return {
                        DAMAGE: stats[tier].DAMAGE ? stats[tier].DAMAGE * petLevel : stats.LEGENDARY.DAMAGE * petLevel,
                        STRENGTH: stats[tier].STRENGTH ? stats[tier].STRENGTH * petLevel : stats.LEGENDARY.STRENGTH * petLevel
                    }
                },
                name: 'Ink Specialty',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: { strength: 0.1, damage: 0.3 },
                        EPIC: { strength: 0.2, damage: 0.4 },
                        LEGENDARY: { strength: 0.2, damage: 0.4 },
                    }
                    return [
                        'Buffs the Ink Wand by ',
                        <span key="key" style={{ color: green }}>{(initialVal[tier].damage * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: red }}> ❁Damage</span>,
                        ' and ',
                        <span key="key3" style={{ color: green }}>{(initialVal[tier].strength * petLevel).toFixed(1)}</span>,
                        <span key="key4" style={{ color: red }}> ❁Strength.</span>,
                    ];
                },
            },
            {
                name: 'Fishing Wisdom Boost',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Grants ',
                        <span key="key" style={{ color: teal }}>+{(0.3 * petLevel).toFixed(1)} ☯Fishing Wisdom.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    GUARDIAN: {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 1,
            DEFENSE: 0.5
        },
        minRarity: 'COMMON',
        maxRarity: 'MYTHIC',
        abilities: [
            {
                name: 'Lazerbeam',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.02,
                        UNCOMMON: 0.06,
                        RARE: 0.1,
                        EPIC: 0.15,
                        LEGENDARY: 0.2,
                        MYTHIC: 1.2
                    }
                    return [
                        'Zaps your enemies for ', 
                        <span key="key" style={{ color: lightBlue }}>{(initialVal[tier] * petLevel).toFixed(1)}x</span>,
                        ' your ',
                        <span key="key2" style={{ color: lightBlue }}> ✎Intelligence</span>,
                        ' every ',
                        <span key="key3" style={{ color: green }}>3s.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Enchanting Wisdom Boost',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    const initialVal = {
                        RARE: 0.25,
                        EPIC: 0.3,
                        LEGENDARY: 0.3,
                        MYTHIC: 0.3
                    }
                    return [
                        'Grants ', 
                        <span key="key" style={{ color: teal }}>{(initialVal[tier] * petLevel).toFixed(1)} ☯Enchanting Wisdom.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Mana Pool',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Regenerate ', 
                        <span key="key" style={{ color: lightBlue }}>{(0.3 * petLevel).toFixed(1)}%</span>,
                        ' extra ',
                        <span key="key2" style={{ color: lightBlue }}>✎Mana,</span>,
                        ' doubled when near or in water.'
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Lucky Seven',
                minRarity: 'MYTHIC',
                description: (petLevel, tier) => {
                    return [
                        'Gain ', 
                        <span key="key" style={{ color: lightBlue }}>+{(0.07 * petLevel).toFixed(1)}%</span>,
                        ' chance to find ',
                        <span key="key2" style={{ color: purple }}>ultra rare</span>,
                        ' books in ',
                        <span key="key3" style={{ color: magenta }}>SuperPairs.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    JELLYFISH: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 2
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Radiant Scyphozoa',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'While in dungeons, reduces the mana cost of Power Orbs by ', 
                        <span key="key" style={{ color: green }}>{(0.5 * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Stored Energy',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'While in dungeons, for every ', 
                        <span key="key" style={{ color: red }}>2,000 HP</span>,
                        ' you heal teammates, the cooldown of ',
                        <span key="key2" style={{ color: green }}>Wish</span>,
                        ' is reduced by ',
                        <span key="key3" style={{ color: green }}>{(0.01 * petLevel).toFixed(1)}s</span>,
                        ' up to ',
                        <span key="key4" style={{ color: green }}>30s</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Powerful Potions',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'While in dungeons, increase the effectiveness of Dungeon Potions by ', 
                        <span key="key" style={{ color: green }}>{(0.5 * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    PARROT: {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 1,
            CRITICAL_DAMAGE: 0.1
        },
        minRarity: 'EPIC',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Flamboyant',
                minRarity: 'EPIC',
                
                description: (petLevel, tier) => {
                    const initialVal = {
                        EPIC: 15,
                        LEGENDARY: 20
                    }
                    return [
                        'Adds ', 
                        <span key="key" style={{ color: green }}>{(((petLevel/100) * (initialVal[tier] - 1)) + 1).toFixed(0)}</span>,
                        ' level(s) to intimidation accessories.',
                        
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Repeat',
                minRarity: 'EPIC',
                description: (petLevel, tier) => {
                    return [
                        'Boosts potions duration by ', 
                        <span key="key" style={{ color: green }}>{(5 + 0.35 * petLevel).toFixed(1)}%</span>, 
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Bird Discourse',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gives ', 
                        <span key="key" style={{ color: green }}>+{(5 + 0.25 * petLevel).toFixed(1)}</span>,
                        <span key="key2" style={{ color: red }}> ❁Strength</span>,
                        ' to players within 20 Blocks (doesn\'t stack).',
                        
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Parrot Feather Infusion',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'When summoned or in your pets menu, boost the duration of consumed God Potions by ', 
                        <span key="key" style={{ color: green }}>+{(0.2 * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    },
    SHEEP: {
        baseStats: {},
        statsPerLevel: {
            INTELLIGENCE: 1,
            ABILITY_DAMAGE_PERCENT: 0.2
        },
        minRarity: 'COMMON',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Mana Saver',
                minRarity: 'COMMON',
                description: (petLevel, tier) => {
                    const initialVal = {
                        COMMON: 0.1,
                        UNCOMMON: 0.1,
                        RARE: 0.1,
                        EPIC: 0.2,
                        LEGENDARY: 0.2
                    }
                    return [
                        'Reduces the ', 
                        <span key="key" style={{ color: lightBlue }}>✎Mana</span>,
                        ' cost of abilities by ',
                        <span key="key2" style={{ color: green }}>{(0.2 * petLevel).toFixed(1)}%</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Overheal',
                minRarity: 'RARE',
                description: (petLevel, tier) => {
                    return [
                        'Gives a ', 
                        <span key="key" style={{ color: green }}>{(0.1 * petLevel).toFixed(1)}%</span>,
                        ' shield after not taking damage for ',
                        <span key="key2" style={{ color: green }}>10s.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Dungeon Wizard',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Increases your total ', 
                        <span key="key" style={{ color: lightBlue }}>✎Mana</span>,
                        ' by ',
                        <span key="key2" style={{ color: green }}>{(0.25 * petLevel).toFixed(1)}%</span>,
                        ' while in Dungeons.'
                    ];
                },
                'action': 'none'
            }
        ]
    },
    REINDEER: {
        baseStats: {},
        statsPerLevel: {
            HEALTH: 1
        },
        minRarity: 'LEGENDARY',
        maxRarity: 'LEGENDARY',
        abilities: [
            {
                name: 'Winter Spirit',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gain ', 
                        <span key="key" style={{ color: magenta }}>double</span>,
                        ' pet ',
                        <span key="key2" style={{ color: green }}>EXP.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Infused',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Gives ', 
                        <span key="key" style={{ color: lightBlue }}>+{(0.75 * petLevel).toFixed(1)} ☂Fishing Speed </span>,
                        ' and ',
                        <span key="key2" style={{ color: teal }}>+10 Sea Creature Chance </span>,
                        '  while on ',
                        <span key="key3" style={{ color: red }}>Jerry's Workshop.</span>,
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Snow Power',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Grants ', 
                        <span key="key" style={{ color: green }}>+{(0.1 * petLevel).toFixed(1)}%</span>,
                        ' bonus gift chance during the ',
                        <span key="key2" style={{ color: red }}>Gift Attack</span>,
                        ' event. ',
                    ];
                },
                'action': 'none'
            },
            {
                name: 'Icy Wind',
                minRarity: 'LEGENDARY',
                description: (petLevel, tier) => {
                    return [
                        'Grants ', 
                        <span key="key" style={{ color: green }}>+{(0.2 * petLevel).toFixed(1)}%</span>,
                        ' chance of getting double ',
                        <span key="key2" style={{ color: lightBlue }}>Ice Essence.</span>,
                    ];
                },
                'action': 'none'
            }
        ]
    }
}

export const petList = () =>{
    const list =  Object.keys(pets).sort();
    list.unshift('Unequipped');
    return list;
};