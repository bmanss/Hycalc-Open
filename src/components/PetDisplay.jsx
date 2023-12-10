import React, { useEffect } from "react";
import { trackedStats, statAlias } from "../constants/trackedStats";
import { armorStatColor } from "../constants/colors";
import InputCounter from "./InputCounter";
import { petList } from "../constants/pets";
import { petItemsList } from "../constants/pet_items";
import { rarityColor } from "../constants/colors";
import { tiers } from "../lib/ProfileFunctions";
import SearchBox from "./SearchBox";
import { useProfileContext } from "../context/ProfileContext";
import { ProfileActions } from "../context/ProfileContext";
import { setNewPet, getPetStats } from "../lib/ProfileFunctions";
const PetDisplay = () => {
  const profileContext = useProfileContext();
  const pet = profileContext.getGearPiece("pet");

  const handlePetChange = (pet) => {
    if (profileContext.getGearPiece("pet").name !== pet.name) {
      setNewPet(pet);
    } else {
      getPetStats(pet);
    }
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_PLAYER_GEAR_PIECE, payload: { category: "pet", newGearPiece: pet } });
  };

  const abilityStatusChanged = (ability) => {
    ability.enabled = !ability.enabled;
    handlePetChange({ ...pet, abilities: pet.abilities });
  };
  return (
    <div className='petDisplay' style={{borderColor:rarityColor[pet.tier]}}>
      <div className='minecraft-text' style={{ marginBottom: "5px" }}>
        PET
      </div>
      <br />
      <SearchBox selectedItem={pet} itemList={petList()} onItemChange={(value) => handlePetChange({ ...pet, name: value })} />
      <div style={{ marginLeft: "5px" }}>
        <div className='flex-row' style={{ alignItems: "center" }}>
          <span>Level: </span>
          <InputCounter
            value={pet.level}
            min={1}
            max={pet.name === "GOLDEN DRAGON" ? 200 : 100}
            onChange={(value) => handlePetChange({ ...pet, level: value })}></InputCounter>
        </div>
        <span>
          <span>Rarity: </span>
          <select
            className='itemCard-items-dropdown'
            value={pet.tier ?? "COMMON"}
            onChange={(e) => handlePetChange({ ...pet, tier: e.target.value })}>
            {tiers.slice(tiers.indexOf(pet.minRarity), tiers.indexOf(pet.maxRarity) + 1).map((tier) => (
              <option style={{ color: "white" }} key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </span>
        <div>
          {Object.entries(pet.stats).map(
            ([stat, value]) =>
              trackedStats[stat] != undefined &&
              value != 0 && (
                <div key={stat}>
                  <span>{statAlias[stat] ? statAlias[stat] : stat.replaceAll("_", " ").toLowerCase()}: </span>
                  <span style={{ color: armorStatColor[stat] ?? "white" }}>
                    {" "}
                    {value > 0 ? "+" : ""}
                    {value.toFixed(1) ?? 0}
                  </span>
                </div>
              )
          )}
        </div>
        <div>
          <br />
          {pet.abilities.map(
            (ability, index) =>
              tiers.indexOf(pet.tier) >= tiers.indexOf(ability.minRarity) && (
                <div key={index}>
                  <div style={{ display: "flex", marginBottom: "3px", alignItems: "center" }}>
                    <span style={{ color: "#ffa929" }}>
                      {ability.name2 && ability.name2.minRarity === pet.tier ? ability.name2.name : ability.name}
                    </span>
                    {ability.hasOwnProperty("enabled") && (
                      <div
                        className='enabledBox'
                        style={{ backgroundColor: ability.enabled ? "#00ff15" : "red", marginLeft: "10px" }}
                        onClick={() => abilityStatusChanged(ability)}></div>
                    )}
                  </div>
                  {ability.description && <div style={{ marginBottom: "15px" }}>{ability.description(pet.level, pet.tier)}</div>}
                </div>
              )
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ paddingBottom: "3px", marginRight: "5px" }}>Item: </div>
          <SearchBox
            itemList={petItemsList()}
            selectedItem={pet.item?.name ?? "none"}
            onItemChange={(value) => handlePetChange({ ...pet, item: value })}
          />
        </div>
      </div>
    </div>
  );
};

export default PetDisplay;
