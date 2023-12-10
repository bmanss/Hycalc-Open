export const petItems = {
    PET_ITEM_BIG_TEETH_COMMON: {
        name: 'Big Teeth',
        effect: 'additive',
        modifiedStats: {
            'CRITICAL_CHANCE': 5
        }
    },
    BIGGER_TEETH: {
        name: 'Bigger Teeth',
        effect: 'additive',
        modifiedStats: {
            'CRITICAL_CHANCE': 10
        }
    },
    PET_ITEM_SHARPENED_CLAWS_UNCOMMON: {
        name: 'Sharpened Claws',
        effect: 'additive',
        modifiedStats: {
            'CRITICAL_DAMAGE': 15
        }
    },
    SERRATED_CLAWS: {
        name: 'Serrated Claws',
        effect: 'additive',
        modifiedStats: {
            'CRITICAL_DAMAGE': 25
        }
    },
    PET_ITEM_IRON_CLAWS_COMMON: {
        name: 'Iron Claws',
        effect: 'multiplicative',
        amount: 0.40,
        modifiedStats: [
            'CRITICAL_CHANCE',
            'CRITICAL_DAMAGE'
        ]
    },
    GOLD_CLAWS: {
        name: 'Gold Claws',
        effect: 'multiplicative',
        amount: 0.50,
        modifiedStats: [
            'CRITICAL_CHANCE',
            'CRITICAL_DAMAGE'
        ]
    },
    PET_ITEM_HARDENED_SCALES_UNCOMMON: {
        name: 'Hardened Scales',
        effect: 'additive',
        modifiedStats: {
            'DEFENSE': 25
        }
    },
    REINFORCED_SCALES: {
        name: 'Reinforced Scales',
        effect: 'additive',
        modifiedStats: {
            'DEFENSE': 40
        }
    },
    PET_ITEM_TEXTBOOK: {
        name: 'Textbook',
        effect: 'multiplicative',
        amount: 1,
        modifiedStats: [
            'INTELLIGENCE'
        ]
    },
    PET_ITEM_LUCKY_CLOVER: {
        name: 'Lucky Clover',
        effect: 'additive',
        modifiedStats: {
            'MAGIC_FIND': 7
        }
    },
    CROCHET_TIGER_PLUSHIE: {
        name: 'Crochet Tiger Plushie',
        effect: 'additive',
        modifiedStats: {
            'ATTACK_SPEED': 35
        }
    },
    ANTIQUE_REMEDIES: {
        name: 'Antique Remedies',
        effect: 'multiplicative',
        amount: 0.80,
        modifiedStats: [
            'STRENGTH'
        ]
    },
    MINOS_RELIC: {
        name: 'Minos Relic',
        effect: 'multiplicative',
        amount: 0.333,
        modifiedStats: [
            'all'
        ]
    },
    PET_ITEM_SPOOKY_CUPCAKE: {
        name: 'Spooky Cupcake',
        effect: 'additive',
        modifiedStats: {
            'STRENGTH': 30,
            'WALK_SPEED': 20
        }
    }
}

export const petItemsList = () => {
    const list = [];
    for (const item of Object.keys(petItems)) {
        list.push(petItems[item]);
    }

    list.sort((a, b) => a.name.localeCompare(b.name));
    list.unshift('none');
    return list;
};
