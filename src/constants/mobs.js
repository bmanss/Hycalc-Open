
export const mobTypes = [
    "Blaze",
    "Creeper",
    "Dragon",
    "Enderman",
    "Lava Sea Creature",
    "Magma Cube",
    "Mythological",
    "Pigmen",
    "Sea Creature",
    "Skeleton",
    "Slimes",
    "Spider",
    "Undead",
    "Wither",
    "Wolf",
    "Zombie"
  ];

  export const mobList = () => {
    const list = [];
    for (const mob of mobTypes){
      list.push(mob);
    }
    list.unshift('None');
    return list;
  }
  