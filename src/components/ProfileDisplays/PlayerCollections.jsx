import React from "react";
import { useProfileContext } from "../../context/ProfileContext";
import InputCounter from "../InputCounter";
import { ProfileActions } from "../../context/ProfileContext";

export const PlayerCollections = () => {
  const profileContext = useProfileContext();

  const handleCollectionChange = (category, collection, newValue) => {
    const playerCollections = profileContext.getCollections();
    playerCollections[category][collection].amount = newValue;
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_PLAYER_COLLECTIONS, payload: { ...playerCollections } });
  };

  return (
    <div>
      {Object.entries(profileContext.getCollections()).map(([category, collections]) => (
        <div key={category}>
          <span className='CollectionDisplay-Category'>{category.toLowerCase()}</span>
          <div className='SkillsDisplay'>
            {Object.entries(collections).map(([collection, info]) => (
              <span key={`${collection}-${info.amount}`} className='SkillsDisplay-ItemGroup'>
                <span className='SkillsDisplay-Skill'>{collection.replaceAll("_", " ")} </span>
                <InputCounter
                  inputWidth={"100px"}
                  value={parseInt(info.amount)}
                  min={0}
                  max={999999999}
                  onChange={(value) => handleCollectionChange(category, collection, value)}
                />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
