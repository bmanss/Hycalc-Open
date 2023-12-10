import React from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { enchantmentList } from "../../constants/enchantments";
import { reforgeList } from "../../constants/reforges";
import ItemCard from "../ItemCard";

export const PlayerArmor = ({ sortedItems }) => {
  const profileContext = useProfileContext();
  return (
    sortedItems && (
      <div className='ItemCard-Container'>
        <ItemCard
          itemList={sortedItems.helmet}
          gearPiece={profileContext.getGearPiece("helmet")}
          reforgeList={reforgeList.helmet}
          enchantmentList={enchantmentList.helmet}
        />
        <ItemCard
          itemList={sortedItems.chestplate}
          gearPiece={profileContext.getGearPiece("chestplate")}
          reforgeList={reforgeList.chestplate}
          enchantmentList={enchantmentList.chestplate}
        />
        <ItemCard
          itemList={sortedItems.leggings}
          gearPiece={profileContext.getGearPiece("leggings")}
          reforgeList={reforgeList.generalArmor}
          enchantmentList={enchantmentList.leggings}
        />
        <ItemCard
          itemList={sortedItems.boots}
          gearPiece={profileContext.getGearPiece("boots")}
          reforgeList={reforgeList.generalArmor}
          enchantmentList={enchantmentList.boots}
        />
      </div>
    )
  );
};
