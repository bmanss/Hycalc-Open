import { useState } from "react";
import { rarityColor, armorStatColor, gemCutColor, loreColors } from "../constants/colors";
import { trackedStats, statAlias } from "../constants/trackedStats";
import { arrowList } from "../constants/arrows";
import { gemstoneSlots, gemstones } from "../constants/gemStones";
import InputCounter from "./InputCounter";
import SearchBox from "./SearchBox";
import { useProfileContext } from "../context/ProfileContext";
import { ProfileActions } from "../context/ProfileContext";
import { createGearPiece, changeGearPiece } from "../lib/ProfileFunctions";
import { parseLore } from "../lib/Util";

const ItemCard = (props) => {
  const profileContext = useProfileContext();
  const gearPiece = props.gearPiece;
  const reforgeList = props.reforgeList;
  const enchantmentList = props.enchantmentList;

  const [selectedEnchant, setSelectedEnchant] = useState(enchantmentList && enchantmentList[0]);
  const [enchantMaxLevels, setEnchantMaxLevels] = useState(selectedEnchant && selectedEnchant.maxLevels);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const updateModifier = (geartype, modifierType, value) => {
    const updatedGear = profileContext.getGearPiece(geartype);
    updatedGear[modifierType] = value;
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_PLAYER_GEAR_PIECE, payload: { category: geartype, newGearPiece: updatedGear } });
  };

  const updateGem = (slotName, type, gem, cut) => {
    const updatedGems = {
      ...gearPiece.gemSlots,
      [slotName]: {
        type: type,
        gem: gem,
        cut: cut,
      },
    };
    updateModifier(gearPiece.category, "gemSlots", updatedGems);
  };

  const addEnchant = () => {
    const updatedEnchants = {
      ...props.gearPiece.enchantments,
      [selectedEnchant.name]: selectedLevel,
    };
    updateModifier(props.gearPiece.category, "enchantments", updatedEnchants);
  };
  const removeEnchant = () => {
    if (selectedEnchant.name in props.gearPiece.enchantments) {
      const updatedEnchants = {
        ...props.gearPiece.enchantments,
      };
      delete updatedEnchants[selectedEnchant.name];
      updateModifier(props.gearPiece.category, "enchantments", updatedEnchants);
    }
  };
  const clearEnchant = () => {
    updateModifier(props.gearPiece.category, "enchantments", {});
  };

  const handleEnchantChange = (value) => {
    setSelectedEnchant(value);
    setEnchantMaxLevels(value.maxLevels);
    setSelectedLevel(1);
  };
  const handleGearChange = (category, newID) => {
    const newGearPiece = createGearPiece(profileContext.getGearPiece(category), newID, category);
    changeGearPiece(profileContext.getGearPiece(category), newGearPiece);
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_PLAYER_GEAR_PIECE, payload: { category: category, newGearPiece: newGearPiece } });
  };

  const toggleEffect = (effectIndex) => {
    gearPiece.effects[effectIndex].enabled = !gearPiece.effects[effectIndex].enabled;
    profileContext.dispatchProfileUpdate({
      type: ProfileActions.SET_PLAYER_GEAR_PIECE,
      payload: { category: gearPiece.category, newGearPiece: gearPiece },
    });
  };

  return (
    <div className='itemCard' style={{ border: `2px solid ${rarityColor[gearPiece.tier]}` }}>
      <span className='minecraft-text'>{props.gearPiece.category ?? ""}</span>
      <div className='flex-column'>
        <div className='flex-column'>
          {/* Stars Visual*/}
          {gearPiece.itemType !== "normal" && (
            <span style={{ height: "15px", display: "flex", alignItems: "center" }}>
              {[...Array(Math.min(gearPiece.starLevel, 5))].map((_, index) =>
                gearPiece.starLevel > 0 && gearPiece.starLevel - index > 5 ? (
                  <span className='minecraft-text' style={{ fontSize: "20px", color: "#fc66ff" }} key={index}>
                    ✪
                  </span>
                ) : (
                  <span className='minecraft-text' style={{ fontSize: "20px", color: "#ffc908" }} key={index}>
                    ✪
                  </span>
                )
              )}
            </span>
          )}
          {/* Item list */}
          <SearchBox
            recombob={gearPiece.rarityUpgrades}
            itemList={props.itemList}
            selectedItem={props.gearPiece}
            onItemChange={(value) => handleGearChange(gearPiece.category, value)}
          />

          {/* Arrow list if bow */}
          {gearPiece.referenceCategory === "bow" && (
            <span className='flex-row' style={{ alignItems: "center" }}>
              <span className='ItemCard-properties' style={{ marginBottom: "3px", marginRight: "5px", marginLeft: "5px" }}>
                Arrow:{" "}
              </span>
              <SearchBox
                itemList={arrowList()}
                selectedItem={gearPiece.arrow}
                onItemChange={(value) => updateModifier(gearPiece.category, "arrow", value)}
              />
            </span>
          )}
        </div>
        {/* Reforges */}
        <div className='ItemCard-properties' style={{ marginLeft: "5px" }}>
          <div style={{ display: "flex" }}>
            <span className='ItemCard-stat'>Reforge:</span>
            <select
              className='itemCard-reforge-dropdown'
              value={gearPiece.modifier}
              onChange={(e) => updateModifier(gearPiece.category, "modifier", e.target.value)}>
              {reforgeList.map((reforge) => (
                <option key={reforge} value={reforge}>
                  {reforge}
                </option>
              ))}
            </select>
          </div>
          {/* recombob */}
          <div className='flex-row' style={{ alignItems: "center" }}>
            <span>Recombobulated</span>
            <input
              className='checkBox'
              type='checkbox'
              checked={gearPiece.rarityUpgrades ?? false}
              value={gearPiece.rarityUpgrades}
              onChange={(e) => updateModifier(gearPiece.category, "rarityUpgrades", !gearPiece.rarityUpgrades)}
            />
          </div>
          {/* stars */}
          {gearPiece.itemType !== "normal" && (
            <div className='flex-row' style={{ alignItems: "center" }}>
              <span style={{ marginRight: "5px", paddingTop: "5px" }}>Stars: </span>
              <InputCounter
                value={gearPiece.starLevel}
                min={0}
                max={10}
                onChange={(value) => updateModifier(gearPiece.category, "starLevel", value)}
              />
            </div>
          )}
          {/* books */}
          {gearPiece.generalCategory !== "equipment" && (
            <div className='flex-row ' style={{ alignItems: "center" }}>
              <span style={{ marginRight: "5px", paddingTop: "5px" }}>Books: </span>
              <InputCounter
                value={gearPiece.hotPotatoCount}
                min={0}
                max={15}
                onChange={(value) => updateModifier(gearPiece.category, "hotPotatoCount", value)}
              />
            </div>
          )}
          {/* stats */}
          {gearPiece.nonDungeonStats &&
            Object.entries(gearPiece.nonDungeonStats).map(
              ([stat, value]) =>
                trackedStats[stat] !== undefined &&
                value !== 0 && (
                  <div key={stat} className='flex-row'>
                    <span className='ItemCard-stat'>{statAlias[stat] ? statAlias[stat] : stat.replaceAll("_", " ").toLowerCase()}: </span>
                    <span style={{ color: armorStatColor[stat] ?? "#00ff1a", marginRight: "5px" }}>{`${value.toFixed(2)}`}</span>
                    {/* potato books stats */}
                    {stat === "HEALTH" && gearPiece.miscStats.HEALTH ? (
                      <span className='ItemCard-stat' style={{ color: "yellow" }}>{`(+${gearPiece.miscStats.HEALTH})`}</span>
                    ) : null}
                    {stat === "DEFENSE" && gearPiece.miscStats.DEFENSE ? (
                      <span className='ItemCard-stat' style={{ color: "yellow" }}>{`(+${gearPiece.miscStats.DEFENSE})`}</span>
                    ) : null}
                    {stat === "STRENGTH" && gearPiece.miscStats.STRENGTH ? (
                      <span className='ItemCard-stat' style={{ color: "yellow" }}>{`(+${gearPiece.miscStats.STRENGTH})`}</span>
                    ) : null}
                    {stat === "DAMAGE" && gearPiece.miscStats.DAMAGE ? (
                      <span className='ItemCard-stat' style={{ color: "yellow" }}>{`(+${gearPiece.miscStats.DAMAGE})`}</span>
                    ) : null}

                    {/* Reforge stats additions */}
                    {gearPiece.reforgeStats[stat] && (
                      <span style={{ color: "blue", marginRight: "1px" }}>{`(${gearPiece.reforgeStats[stat] > 0 ? "+" : ""}${
                        gearPiece.reforgeStats[stat]
                      })`}</span>
                    )}

                    {/* Gem stats additions */}
                    {gearPiece.gemStats?.[stat] && <span style={{ color: "#FF54DA", marginRight: "1px" }}>{`(+${gearPiece.gemStats[stat]})`}</span>}

                    {/* Dungeon stats additions */}
                    {gearPiece.generalCategory !== "equipment" && gearPiece.itemType === "dungeon" && gearPiece.dungeonStats[stat] > 0 && (
                      <span style={{ color: "grey" }}>{`(+${gearPiece.dungeonStats[stat].toFixed(2)})`}</span>
                    )}
                  </div>
                )
            )}

          {/* Gem slots */}
          {gearPiece.gemSlots && (
            <div className='Itemcard-Gemslots'>
              {Object.entries(gearPiece.gemSlots).map(([slotName, properties]) => (
                <span className='Itemcard-Gemslots-Gem' key={slotName}>
                  <span className='Itemcard-Gemslots-Popup'>
                    {gemstoneSlots[properties.type].gems.map((gemType) => (
                      <div key={`${slotName}${gemType}`} className='Itemcard-Gemslots-Gems-Container'>
                        <div
                          className='Itemcard-Gemslots-Gem-image-Container'
                          onClick={() => {
                            updateGem(slotName, properties.type, undefined, undefined);
                          }}>
                          <div className='Itemcard-Gemslots-Gem-image-text'>Remove {gemType.toLowerCase()}</div>
                          <div className='Itemcard-Gemslots-Gem-image-Remove'>X</div>
                        </div>
                        <div
                          className='Itemcard-Gemslots-Gem-image-Container'
                          onClick={() => {
                            updateGem(slotName, properties.type, gemType, "ROUGH");
                          }}>
                          <div className='Itemcard-Gemslots-Gem-image-text'>Rough {gemType.toLowerCase()}</div>
                          <img alt='' className='Itemcard-Gemslots-Gem-image' src={`/images/gemstones/rough/${gemType.toLowerCase()}.png`} />
                        </div>
                        <div
                          className='Itemcard-Gemslots-Gem-image-Container'
                          onClick={() => {
                            updateGem(slotName, properties.type, gemType, "FINE");
                          }}>
                          <div className='Itemcard-Gemslots-Gem-image-text'>Fine {gemType.toLowerCase()}</div>
                          <img alt='' className='Itemcard-Gemslots-Gem-image' src={`/images/gemstones/fine/${gemType.toLowerCase()}.png`} />
                        </div>
                        <div
                          className='Itemcard-Gemslots-Gem-image-Container'
                          onClick={() => {
                            updateGem(slotName, properties.type, gemType, "FLAWED");
                          }}>
                          <div className='Itemcard-Gemslots-Gem-image-text'>Flawed {gemType.toLowerCase()}</div>
                          <img alt='' className='Itemcard-Gemslots-Gem-image' src={`/images/gemstones/flawed/${gemType.toLowerCase()}.png`} />
                        </div>
                        <div
                          className='Itemcard-Gemslots-Gem-image-Container'
                          onClick={() => {
                            updateGem(slotName, properties.type, gemType, "FLAWLESS");
                          }}>
                          <div className='Itemcard-Gemslots-Gem-image-text'>Flawless {gemType.toLowerCase()}</div>
                          <img alt='' className='Itemcard-Gemslots-Gem-image' src={`/images/gemstones/flawless/${gemType.toLowerCase()}.png`} />
                        </div>
                        <div
                          className='Itemcard-Gemslots-Gem-image-Container'
                          onClick={() => {
                            updateGem(slotName, properties.type, gemType, "PERFECT");
                          }}>
                          <div className='Itemcard-Gemslots-Gem-image-text'>Perfect {gemType.toLowerCase()}</div>
                          <img alt='' className='Itemcard-Gemslots-Gem-image' src={`/images/gemstones/perfect/${gemType.toLowerCase()}.png`} />
                        </div>
                      </div>
                    ))}
                  </span>
                  <span style={{ color: gemCutColor[properties.cut] ?? "#828282", fontWeight: "700" }}>[</span>
                  <span className='Itemcard-Gemslots-Gem-Symbol' style={{ color: gemstones[properties.gem]?.color ?? "#828282" }}>
                    {gemstoneSlots[properties.type].symbol}
                  </span>
                  <span style={{ color: gemCutColor[properties.cut] ?? "#828282", fontWeight: "700" }}>]</span>
                </span>
              ))}
            </div>
          )}

          {/* options to modify enchants */}
          {enchantmentList && (
            <div>
              <div style={{ display: "flex" }}>
                <SearchBox
                  itemList={enchantmentList}
                  onItemChange={(value) => {
                    handleEnchantChange(value);
                  }}
                />
                <InputCounter value={selectedLevel} min={1} max={enchantMaxLevels} onChange={(value) => setSelectedLevel(value)} />
              </div>
              <div className='itemCard-enchant-buttons'>
                <button onClick={addEnchant}>Add</button>
                <button onClick={removeEnchant}>Remove</button>
                <button onClick={clearEnchant}>Clear</button>
              </div>
            </div>
          )}
          {/* display enchants on item */}
          <div className='itemCard-enchant-container'>
            {gearPiece.enchantments &&
              Object.entries(gearPiece.enchantments).map(([enchant, level], index) => (
                <span key={enchant}>
                  {index % 2 === 0 && <br />}
                  <span className='itemCard-enchant'>{`${enchant.replaceAll("_", " ").toLowerCase()} ${level} `}</span>
                </span>
              ))}
          </div>
          {gearPiece.effects.map((effect, index) => (
            <div key={effect.name}>
              <div style={{ display: "flex", alignItems: "center", whiteSpace: "pre-wrap" }}>
                <div>{effect.description && parseLore(effect.name, effect.name)}</div>
                {effect.hasOwnProperty("setEffect") ? (
                  <div style={{ display: "flex", alignItems: "center", whiteSpace: "pre-wrap" }}>
                    <span
                      style={{ color: profileContext.profileState.armorSets[effect.name] >= effect.required ? loreColors["§6"] : loreColors["§8"] }}>
                      {` (${profileContext.profileState.armorSets[effect.name] ?? 0}/${effect.required})`}
                    </span>
                    <div
                      className='enabledBox'
                      style={{ backgroundColor: effect.enabled ? "#00ff15" : "red", marginLeft: "10px" }}
                      onClick={() => toggleEffect(index)}></div>
                  </div>
                ) : (
                  effect.hasOwnProperty("enabled") && (
                    <div
                      className='enabledBox'
                      style={{ backgroundColor: effect.enabled ? "#00ff15" : "red", marginLeft: "10px" }}
                      onClick={() => toggleEffect(index)}></div>
                  )
                )}
              </div>
              <div>
                {effect.description && parseLore(effect.description, effect.name)}
                <br />
              </div>
            </div>
          ))}
          {gearPiece.effects.length === 0 && gearPiece.effectsLore && (
            <div>
              {gearPiece.effectsLore.map((loreString, index) => (
                <div key={`effect-${index}`}>
                  <span style={{ fontSize: "12px" }}>{"(No Effect)"}</span>
                  <div>
                    {parseLore(loreString)}
                    <br />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
