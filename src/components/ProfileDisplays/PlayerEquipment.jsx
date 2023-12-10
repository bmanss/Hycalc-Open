import React from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { enchantmentList } from "../../constants/enchantments";
import { reforgeList } from "../../constants/reforges";
import ItemCard from "../ItemCard";

export const PlayerEquipment = ({ sortedItems }) => {
  const profileContext = useProfileContext();
  return (
    sortedItems && (
      <div className='ItemCard-Container'>
        <ItemCard
          itemList={sortedItems.necklace}
          gearPiece={profileContext.getGearPiece("necklace")}
          reforgeList={reforgeList.equipment}
        />
        <ItemCard
          itemList={sortedItems.cloak}
          gearPiece={profileContext.getGearPiece("cloak")}
          reforgeList={reforgeList.equipment}
        />
        <ItemCard
          itemList={sortedItems.belt}
          gearPiece={profileContext.getGearPiece("belt")}
          reforgeList={reforgeList.equipment}
        />
        <ItemCard
          itemList={sortedItems.gloves}
          gearPiece={profileContext.getGearPiece("gloves")}
          reforgeList={reforgeList.equipment}
        />
      </div>
    )
  );
};
