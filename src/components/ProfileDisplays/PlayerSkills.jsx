import React from "react";
import InputCounter from "../InputCounter";
import { useProfileContext } from "../../context/ProfileContext";
import { updateSkillBonus } from "../../lib/ProfileFunctions";
import { ProfileActions } from "../../context/ProfileContext";
export const PlayerSkills = ({skillCaps}) => {
  const profileContext = useProfileContext();

  // update base stats with new stat bonus from skill and update skills state
  const handleSkillLevelChange = (skillName, newLevel) => {
    const updatedSkills = { ...profileContext.getSkills() };
    const prevLevel = updatedSkills[skillName];
    const updatedStats = { ...profileContext.getBaseStats() };
    updatedSkills[skillName] = newLevel;
    const updatedState = {
      basePlayerStats: updatedStats,
      playerSkills: updatedSkills,
    };
    updateSkillBonus(updatedStats, skillName, prevLevel, newLevel);
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_MULTIPLE, payload: { ...updatedState } });
  };
  return (
    <div className='SkillsDisplay'>
      {Object.entries(profileContext.getSkills()).map(([skill, level]) => (
        <span key={`${skill}-${level}`} className='SkillsDisplay-ItemGroup'>
          <span className='SkillsDisplay-Skill' key={skill}>
            {skill.replaceAll("_", " ").toLowerCase()}{" "}
          </span>
          <InputCounter
            inputWidth={"50px"}
            value={level}
            min={0}
            max={skillCaps.current[skill] ?? 500}
            onChange={(value) => handleSkillLevelChange(skill, value)}
          />
        </span>
      ))}
    </div>
  );
};
