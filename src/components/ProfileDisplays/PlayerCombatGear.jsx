import React from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { enchantmentList } from "../../constants/enchantments";
import { reforgeList } from "../../constants/reforges";
import ItemCard from "../ItemCard";
import PetDisplay from "../PetDisplay";

export const PlayerCombatGear = ({ sortedItems }) => {
  const profileContext = useProfileContext();
  return (
    sortedItems && (
      <div className='ItemCard-Container'>
        <ItemCard
          itemList={sortedItems.weapon}
          gearPiece={profileContext.getGearPiece("weapon")}
          reforgeList={reforgeList[profileContext.getGearPiece("weapon").referenceCategory] ?? reforgeList.sword}
          enchantmentList={enchantmentList[profileContext.getGearPiece("weapon").referenceCategory] ?? enchantmentList.sword}
        />
        <PetDisplay pet={profileContext.getGearPiece("pet")} />
      </div>
    )
  );
};
