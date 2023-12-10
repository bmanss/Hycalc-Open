import React from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { trackedStats } from "../../constants/trackedStats";
import InputCounter from "../InputCounter";
import { statAlias } from "../../constants/trackedStats";
import { addStats, removeStats, getPowerstoneStats } from "../../lib/ProfileFunctions";
import { ProfileActions } from "../../context/ProfileContext";

export const PlayerStats = () => {
  const profileContext = useProfileContext();

  const handleStatChange = (stat, newValue) => {
    const updatedStats = { ...profileContext.getBaseStats() };
    if (stat === "MAGICAL_POWER") {
      removeStats(updatedStats, getPowerstoneStats(profileContext.getPowerStone(), updatedStats.MAGICAL_POWER));
      addStats(updatedStats, getPowerstoneStats(profileContext.getPowerStone(), newValue));
    }
    updatedStats[stat] = newValue;
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_BASE_PLAYER_STATS, payload: { ...updatedStats } });
  };

  const handleStatMultiChange = (stat, newValue) => {
    const additionalMultiplers = { ...profileContext.getAdditionalMultiplers() };
    const multis = profileContext.getStatMultipliers();
    additionalMultiplers[stat] += newValue - multis[stat];
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_ADDITIONAL_MULIPLIERS, payload: additionalMultiplers });
  };

  const handleDamageMultiChange = (stat, newValue) => {
    const additionalMultiplers = { ...profileContext.getAdditionalMultiplers() };
    const multis = profileContext.getDamageMultiplers();
    additionalMultiplers[stat] += newValue - multis[stat];
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_ADDITIONAL_MULIPLIERS, payload: additionalMultiplers });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className='SkillsDisplay-Category'>Base Stats: </span>
        </div>
        <div className='BaseStats'>
          {Object.entries(trackedStats).map(([stat]) => (
            <span key={`${stat}`} className='StatsBar-ItemGroup'>
              <span className='StatsBar-Stat' style={{ color: trackedStats[stat].color ?? "white" }}>
                {trackedStats[stat].Symbol} {statAlias[stat] ? statAlias[stat].toLowerCase() : stat.replaceAll("_", " ").toLowerCase()}:{" "}
              </span>
              <InputCounter
                floating={true}
                precision={2}
                min={0}
                max={50000}
                value={parseFloat(profileContext.getBaseStats()[stat])}
                inputWidth={"85px"}
                onChange={(value) => handleStatChange(stat, value)}
              />
            </span>
          ))}
          <span key={`stat-MagicalPower`} className='StatsBar-ItemGroup'>
            <span className='StatsBar-Stat' style={{ color: "white" }}>
              {" "}
              Magical Power:{" "}
            </span>
            <InputCounter
              min={0}
              max={50000}
              value={profileContext.getBaseStats().MAGICAL_POWER}
              inputWidth={"85px"}
              onChange={(value) => handleStatChange("MAGICAL_POWER", value)}
            />
          </span>
        </div>
      </div>
      <div>
        <span className='SkillsDisplay-Category'>Additional Stat Multipliers: </span>
        <div className='BaseStats'>
          {Object.entries(profileContext.getStatMultipliers()).map(([stat, statValue]) => (
            <span key={`${stat}-multi`} className='StatsBar-ItemGroup'>
              <span className='StatsBar-Stat' style={{ color: trackedStats[stat].color ?? "white" }}>
                {trackedStats[stat].Symbol} {statAlias[stat] ? statAlias[stat].toLowerCase() : stat.replaceAll("_", " ").toLowerCase()}:{" "}
              </span>
              <InputCounter
                floating={true}
                precision={3}
                min={1}
                max={50}
                step={0.1}
                value={parseFloat(statValue)}
                inputWidth={"85px"}
                onChange={(value) => handleStatMultiChange(stat, value)}
              />
            </span>
          ))}
        </div>
      </div>
      <div>
        <span className='SkillsDisplay-Category'>Additional Damage Multipliers: </span>
        <div className='BaseStats'>
          <div className='SkillsDisplay-ItemGroup'>
            <span className='StatsBar-Stat'>Normal Base Multi: </span>
            <InputCounter
              floating={true}
              precision={3}
              min={1}
              max={20}
              step={0.1}
              inputWidth={"60px"}
              value={profileContext.getDamageMultiplers().regularBaseMulti}
              onChange={(value) => handleDamageMultiChange("regularBaseMulti", value)}
            />
          </div>
          <div className='SkillsDisplay-ItemGroup'>
            <span className='StatsBar-Stat'>Normal Post Multi: </span>
            <InputCounter
              floating={true}
              precision={3}
              min={1}
              max={20}
              inputWidth={"60px"}
              value={profileContext.getDamageMultiplers().regularPostMulti}
              onChange={(value) => handleDamageMultiChange("regularPostMulti", value)}
            />
          </div>
          <div className='SkillsDisplay-ItemGroup'>
            <span className='StatsBar-Stat'>Magic Base Multi: </span>
            <InputCounter
              floating={true}
              precision={3}
              min={1}
              max={20}
              inputWidth={"60px"}
              value={profileContext.getDamageMultiplers().magicBaseMulti}
              onChange={(value) => handleDamageMultiChange("magicBaseMulti", value)}
            />
          </div>
          <div className='SkillsDisplay-ItemGroup'>
            <span className='StatsBar-Stat'>Magic Post Multi: </span>
            <InputCounter
              floating={true}
              precision={3}
              min={1}
              max={20}
              inputWidth={"60px"}
              value={profileContext.getDamageMultiplers().magicPostMulti}
              onChange={(value) => handleDamageMultiChange("magicPostMulti", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
