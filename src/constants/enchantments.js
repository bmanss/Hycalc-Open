export const enchantments = {
    "armor": {
        "growth": {
            "1": 15,
            "2": 30,
            "3": 45,
            "4": 60,
            "5": 75,
            "6": 90,
            "7": 105
        },
        "protection": {
            "1": 4,
            "2": 8,
            "3": 12,
            "4": 16,
            "5": 20,
            "6": 25,
            "7": 30
        },
        "ultimate_wisdom": {
            "1": 20,
            "2": 40,
            "3": 60,
            "4": 80,
            "5": 100
        }
    },
    "helmet": {
        "big_brain": {
            "1": 15,
            "2": 20,
            "3": 25
        }
    },
    "chestplate": {
        "true_protection": {
            "1": 5
        }
    },
    "leggings": {
        "smarty_pants": {
            "1": 5,
            "2": 10,
            "3": 15,
            "4": 20,
            "5": 25
        }
    },
    "boots": {
        "sugar_rush": {
            "1": 2,
            "2": 4,
            "3": 6
        }
    },
    "sword": {
        "ultimate_one_for_all": {
            "1": 500
        },
        "sharpness": {
            "1": 5,
            "2": 10,
            "3": 15,
            "4": 20,
            "5": 30,
            "6": 45,
            "7": 65
        },
        "smite": {
            "1": 10,
            "2": 20,
            "3": 30,
            "4": 40,
            "5": 60,
            "6": 80,
            "7": 100
        },
        "bane_of_arthropods": {
            "1": 10,
            "2": 20,
            "3": 30,
            "4": 40,
            "5": 60,
            "6": 80,
            "7": 100
        },
        "critical": {
            "1": 10,
            "2": 20,
            "3": 30,
            "4": 40,
            "5": 50,
            "6": 70,
            "7": 100
        },
        "ender_slayer": {
            "1": 15,
            "2": 30,
            "3": 45,
            "4": 60,
            "5": 80,
            "6": 100,
            "7": 130
        },
        "cubism": {
            "1": 10,
            "2": 20,
            "3": 30,
            "4": 40,
            "5": 60,
            "6": 80
        },
        "impaling": {
            "1": 25,
            "2": 50,
            "3": 75
        },
        "first_strike": {
            "1": 25,
            "2": 50,
            "3": 75,
            "4": 100,
            "5": 125
        },
        "triple_strike": {
            "1": 10,
            "2": 20,
            "3": 30,
            "4": 40,
            "5": 50
        },
        "giant_killer": {
            "1": 10,
            "2": 20,
            "3": 30,
            "4": 40,
            "5": 60,
            "6": 90,
            "7": 120
        },
        "prosecute": {
            "1": 0.1,
            "2": 0.2,
            "3": 0.3,
            "4": 0.4,
            "5": 0.7,
            "6": 1
        },
        "dragon_hunter": {
            "1": 8,
            "2": 16,
            "3": 24,
            "4": 32,
            "5": 40
        }
    },
    "bow": {
        "cubism": {
            "1": 10,
            "2": 20,
            "3": 30,
            "4": 40,
            "5": 50,
            "6": 60
        },
        "dragon_hunter": {
            "1": 8,
            "2": 16,
            "3": 24,
            "4": 32,
            "5": 40
        },
        "impaling": {
            "1": 12.5,
            "2": 25,
            "3": 37.5
        },
        "overload": {
            "1": 10,
            "2": 20,
            "3": 30,
            "4": 40,
            "5": 50
        },
        "power": {
            "1": 8,
            "2": 16,
            "3": 24,
            "4": 32,
            "5": 40,
            "6": 50,
            "7": 65
        }
    }
}

export const allEnchants = (() => {
    return Object.entries(enchantments).flatMap(([category, enchants]) => {
        return Object.keys(enchants);
    });
})();

export const enchantmentList = (() => {
    const armorEnchants = Object.entries(enchantments.armor).map(([enchant, levels]) => ({
        name: enchant,
        maxLevels: Object.values(levels).length,
    }));

    const helmetEnchants = [
        ...armorEnchants,
        ...Object.entries(enchantments.helmet).map(([enchant, levels]) => ({
            name: enchant,
            maxLevels: Object.values(levels).length,
        })),
    ];
    const chestplateEnchants = [
        ...armorEnchants,
        ...Object.entries(enchantments.chestplate).map(([enchant, levels]) => ({
            name: enchant,
            maxLevels: Object.values(levels).length,
        })),
    ];
    const leggingsEnchants = [
        ...armorEnchants,
        ...Object.entries(enchantments.leggings).map(([enchant, levels]) => ({
            name: enchant,
            maxLevels: Object.values(levels).length,
        })),
    ];
    const bootsEnchants = [
        ...armorEnchants,
        ...Object.entries(enchantments.boots).map(([enchant, levels]) => ({
            name: enchant,
            maxLevels: Object.values(levels).length,
        })),
    ];

    const swordEnchants = Object.entries(enchantments.sword).map(([enchant, levels]) => ({
        name: enchant,
        maxLevels: Object.values(levels).length,
    })); 

    const bowEnchants = Object.entries(enchantments.bow).map(([enchant, levels]) => ({
        name: enchant,
        maxLevels: Object.values(levels).length,
    }));

    helmetEnchants.sort((a, b) => a.name.localeCompare(b.name));
    chestplateEnchants.sort((a, b) => a.name.localeCompare(b.name));
    leggingsEnchants.sort((a, b) => a.name.localeCompare(b.name));
    bootsEnchants.sort((a, b) => a.name.localeCompare(b.name));
    swordEnchants.sort((a, b) => a.name.localeCompare(b.name));
    bowEnchants.sort((a, b) => a.name.localeCompare(b.name));

    return {
        helmet: helmetEnchants,
        chestplate: chestplateEnchants,
        leggings: leggingsEnchants,
        boots: bootsEnchants,
        sword: swordEnchants,
        bow: bowEnchants,
    }
})();