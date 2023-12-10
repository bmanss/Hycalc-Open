
export const arrows = {
    Flint: { DAMAGE: 1 },
    Reinforced_Iron_Arrow: { DAMAGE: 5 },
    Gold_tipped_Arrow: { DAMAGE: 10 },
    Redstone_tipped_Arrow: { DAMAGE: 15 },
    Emerald_tipped_Arrow: { DAMAGE: 20 },
    Bouncy_Arrow: { DAMAGE: 5 },
    Icy_Arrow: { DAMAGE: 24 },
    Armorshred_Arrow: { DAMAGE: 5 },
    Explosive_Arrow: { DAMAGE: 3 },
    Glue_Arrow: { DAMAGE: 15 },
    Nanosorb_Arrow: { DAMAGE: 5 },
    Magma_Arrow: { DAMAGE: 40, stats: { CRITICAL_CHANCE: 10 } },
}

export const arrowList = () => {
    const list = Object.keys(arrows).sort();
    list.unshift('None');
    return list;
};