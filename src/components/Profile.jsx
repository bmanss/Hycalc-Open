import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUUID } from "../LocalTesting/fetchUUID";
// import { fetchUUID } from "../lib/Util";
import * as ProfilesFunctions from "../lib/ProfileFunctions";
import { useRef } from "react";
import SearchBox from "./SearchBox";
import { powerstoneList } from "../constants/powerstones";
import { mobList } from "../constants/mobs";
import { trackedStats, statAlias } from "../constants/trackedStats";
import { useProfileContext } from "../context/ProfileContext";
import { ProfileActions } from "../context/ProfileContext";
import { PlayerArmor } from "./ProfileDisplays/PlayerArmor";
import { PlayerEquipment } from "./ProfileDisplays/PlayerEquipment";
import { PlayerCombatGear } from "./ProfileDisplays/PlayerCombatGear";
import { PlayerStats } from "./ProfileDisplays/PlayerStats";
import { PlayerSkills } from "./ProfileDisplays/PlayerSkills";
import { PlayerCollections } from "./ProfileDisplays/PlayerCollections";
import { cacheHypixelData } from "../LocalTesting/cacheHypixelData";

const Profile = () => {
  const profileContext = useProfileContext();
  const [playerUUID, setUUID] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [navDisplay, setNavDisplay] = useState({
    armor: true,
    baseStats: false,
    skills: false,
    collections: false,
    equipment: false,
    combatGear: false,
    active: "armor",
  });
  const { profileName } = useParams();
  const navigate = useNavigate();

  const [sortedItems, setSortedItems] = useState(() => {
    const items = JSON.parse(localStorage.getItem("HypixelData"));
    const categories = ["helmet", "chestplate", "leggings", "boots", "necklace", "cloak", "belt", "gloves", "weapon"];

    const sortedItems = {};

    categories.forEach((category) => {
      sortedItems[category] = Object.entries(items[category]).map(([item, props]) => ({
        name: props.name,
        id: props.id,
        tier: props.tier,
      }));

      // Add an empty string element to the beginning of the array
      sortedItems[category].unshift({ name: "", tier: "COMMON", id: "none" });

      // Sort the items by name
      sortedItems[category].sort((a, b) => a.name.localeCompare(b.name));

      // set the empty string element to the 'unequipped' option
      sortedItems[category][0].name = "Unequipped";
    });

    return sortedItems;
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [playerSearch, setPlayerSearch] = useState("");
  const skillCaps = useRef(JSON.parse(localStorage.getItem("HypixelData")).skillCaps);

  const [godPotionEnabled, setGodPotionEnabled] = useState(() => {
    return false;
  });

  async function getHypixelProfile(uuid) {
    let profile;
    const response = await fetch(`/.netlify/functions/api?uuid=${uuid}`);

    // use this when local testing
    // const response = await fetch(`https://api.hypixel.net/v2/skyblock/profiles?key=your_key&uuid=${uuid}`);
    profile = await response.json();

    // throw error if player has no hypixel profile
    if (profile.profiles === null) {
      throw new Error("Profile not found");
    }
    setProfileData(profile);
  }

  const navigateProfile = (player) => {
    async function getNewProfile() {
      const uuid = await fetchUUID(player);
      await getHypixelProfile(uuid.id);
      setUUID(uuid.id);
      navigate(`/profile/${player}`);
    }
    getNewProfile().catch((error) => {
      if (error.response && error.response.status) {
        setErrorMessage(`Error ${error.response.status} unable to fetch profile.`);
      } else {
        setErrorMessage("Profile Not Found.");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    });
    setPlayerSearch("");
  };

  async function validateProfile() {
    if (profileName === undefined) {
      // make default profile god potion disabled by default
      setGodPotionEnabled(false);
    } else {
      try {
        const data = await fetchUUID(profileName);
        await getHypixelProfile(data.id);
        setUUID(data.id);
        document.title = `Hycalc - ${profileName}`;
      } catch (error) {
        console.error("Error fetching UUID.");
        setErrorMessage("Profile not found.");
        setTimeout(() => {
          setErrorMessage("");
        }, 1500);
        navigate("/");
      }
    }
  }

  const loadDefault = () => {
    profileContext.buildProfile();
    setGodPotionEnabled(false);
    navigate("/");
  };

  useEffect(() => {
    if (profileName) {
      validateProfile();
    } else {
      profileContext.buildProfile();
      setGodPotionEnabled(false);
    }
  }, [profileName]);

  async function parseProfile() {
    profileContext.buildActiveProfile();
  }

  useEffect(() => {
    if (profileData !== null) {
      profileContext.setProfilesData({ UUID: playerUUID, profilesArray: profileData.profiles });
      setGodPotionEnabled(true);
    }
    parseProfile();
  }, [profileData]);

  const changeProfile = async (profile) => {
    profileContext.buildProfile(profile);
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_ACTIVE_PROFILE, payload: profile });
  };

  const handleMobChange = (mob) => {
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_TARGET_MOB, payload: mob });
  };

  const handleGodPotion = () => {
    const updatedStats = profileContext.getBaseStats();
    if (!godPotionEnabled) {
      ProfilesFunctions.addStats(updatedStats, ProfilesFunctions.godPotionStats);
      setGodPotionEnabled(true);
    } else if (godPotionEnabled) {
      ProfilesFunctions.removeStats(updatedStats, ProfilesFunctions.godPotionStats);
      setGodPotionEnabled(false);
    }
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_BASE_PLAYER_STATS, payload: { ...profileContext.getBaseStats() } });
  };

  const handlePowerstoneChange = (newPower) => {
    const updatedStats = profileContext.getBaseStats();
    const currentStone = profileContext.getPowerStone();
    if (newPower === "none") {
      ProfilesFunctions.removeStats(updatedStats, ProfilesFunctions.getPowerstoneStats(currentStone, updatedStats.MAGICAL_POWER));
    } else {
      ProfilesFunctions.removeStats(updatedStats, ProfilesFunctions.getPowerstoneStats(currentStone, updatedStats.MAGICAL_POWER));
      ProfilesFunctions.addStats(updatedStats, ProfilesFunctions.getPowerstoneStats(newPower, updatedStats.MAGICAL_POWER));
    }
    const updatedState = {
      powerstone: newPower,
      basePlayerStats: updatedStats,
    };
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_MULTIPLE, payload: { ...updatedState } });
  };

  const handleNavChange = (location) => {
    setNavDisplay((currentNav) => {
      return {
        ...currentNav,
        [currentNav.active]: false,
        [location]: true,
        active: location,
      };
    });
  };

  const handleStatTypeChange = (event) => {
    profileContext.dispatchProfileUpdate({ type: ProfileActions.SET_DUNGEON_MODE, payload: event });
  };

  return (
    <div>
      {localStorage.getItem("HypixelData") ? (
        <div style={{ height: "100vh" }}>
          <div className='InfoBar'>
            <div className='InfoBar-PlayerInfo'>
              <div>{`${profileName ?? "Default-Profile"} `}</div>
              {profileName && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>On </div>
                  <div className={"InfoBar-Cutename"}>
                    {profileContext.profileState.activeProfile}
                    <div className='InfoBar-Cutename-Dropdown'>
                      {profileContext.profiles.map((profile) => (
                        <div key={profile} onMouseDown={() => changeProfile(profile)} className='InfoBar-Cutename-Dropdown-item'>
                          {profile}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* <div> Playing {profileContext.profilesData[selectedProfile]?.gameMode ?? "Normal"}</div> */}
                </div>
              )}
            </div>
            <div style={{ display: "flex", columnGap: "10px" }}>
              <input
                placeholder='Player Profile'
                value={playerSearch}
                className='InfoBar-Player-Search'
                type='text'
                onChange={(e) => setPlayerSearch(e.target.value.trim())}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && playerSearch) navigateProfile(playerSearch);
                }}></input>
              <button
                className='InfoBar-Player-Search-button'
                onClick={() => {
                  playerSearch && navigateProfile(playerSearch);
                }}>
                Load
              </button>
              <button className='InfoBar-Player-Search-button' onClick={loadDefault}>
                Default
              </button>
              <span style={{ color: "red" }}>{errorMessage}</span>
            </div>
          </div>
          <div style={{ height: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div className='StatsBar'>
                <div className='StatsBar-Header'>Stats:</div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                  <span className='StatToggle'>
                    <input type='checkbox' id='checkbox' onChange={(e) => handleStatTypeChange(e.target.checked)} />
                    <label htmlFor='checkbox'></label>
                  </span>
                </div>
                <div className='StatsBar-ItemGroup'>
                  <div>God Potion</div>
                  <div
                    className='enabledBox'
                    style={{ backgroundColor: godPotionEnabled ? "#2bff00" : "#ff0000", borderRadius: "2px" }}
                    onClick={handleGodPotion}
                  />
                </div>
                <div className='StatsBar-ItemGroup'>
                  <span>PowerStone: </span>
                  <SearchBox
                    maxWidth={"155px"}
                    placeholder={"Powerstone"}
                    itemList={powerstoneList()}
                    selectedItem={profileContext.getPowerStone()}
                    onItemChange={(value) => handlePowerstoneChange(value)}
                  />
                </div>
                {Object.entries(trackedStats).map(([stat]) => (
                  <span key={stat}>
                    <span style={{ color: trackedStats[stat].color ?? "white" }}>
                      {trackedStats[stat].Symbol} {statAlias[stat] ? statAlias[stat].toLowerCase() : stat.replaceAll("_", " ").toLowerCase()}:{" "}
                    </span>
                    <span>{profileContext.getFinalStats()[stat]?.toFixed(2) ?? 0}</span>
                  </span>
                ))}
                <div className='StatsBar-Header' style={{ marginTop: "10px" }}>
                  Damage Stats:
                </div>
                <div className='StatsBar-ItemGroup'>
                  <span>Target Mob</span>
                  <SearchBox
                    maxWidth={"155px"}
                    placeholder={"Mob Type"}
                    itemList={mobList()}
                    selectedItem={profileContext.getTargetMob()}
                    onItemChange={(value) => handleMobChange(value)}
                  />
                </div>
                {/* damage stats */}
                <span> Regular: {parseFloat(profileContext.getFinalStats().hitValues?.regular?.toFixed(2)).toLocaleString() ?? 0}</span>
                <span> Crit: {parseFloat(profileContext.getFinalStats().hitValues?.critHit?.toFixed(2)).toLocaleString() ?? 0}</span>
                <span> First Strike: {parseFloat(profileContext.getFinalStats().hitValues?.firstStrike?.toFixed(2)).toLocaleString() ?? 0}</span>
                <span>
                  {" "}
                  First Strike Crit: {parseFloat(profileContext.getFinalStats().hitValues?.firstStrikeCrit?.toFixed(2)).toLocaleString() ?? 0}
                </span>
                <span> Ability: {parseFloat(profileContext.getFinalStats().hitValues?.magic?.toFixed(2)).toLocaleString() ?? 0}</span>
                {/* Special case for lion pet **no longer applicable since 0.19.8**  */}
                {/* {profileContext.getFinalStats().hitValues?.magic !== profileContext.getFinalStats().hitValues?.magicFirstStrike && (
                  <span>
                    {" "}
                    Ability First Strike: {parseFloat(profileContext.getFinalStats().hitValues?.magicFirstStrike?.toFixed(2)).toLocaleString() ?? 0}
                  </span>
                )} */}
              </div>
              <div className='ContentContainer'>
                <div className='ContentNav'>
                  <span className={`ContentNav-Option ${navDisplay.baseStats && "active"}`} onMouseDown={() => handleNavChange("baseStats")}>
                    Stat Extras
                  </span>
                  <span className={`ContentNav-Option ${navDisplay.skills && "active"}`} onMouseDown={() => handleNavChange("skills")}>
                    Skills
                  </span>
                  <span className={`ContentNav-Option ${navDisplay.collections && "active"}`} onMouseDown={() => handleNavChange("collections")}>
                    Collections
                  </span>
                  <span className={`ContentNav-Option ${navDisplay.armor && "active"}`} onMouseDown={() => handleNavChange("armor")}>
                    Armor
                  </span>
                  <span className={`ContentNav-Option ${navDisplay.equipment && "active"}`} onMouseDown={() => handleNavChange("equipment")}>
                    Equipment
                  </span>
                  <span className={`ContentNav-Option ${navDisplay.combatGear && "active"}`} onMouseDown={() => handleNavChange("combatGear")}>
                    Combat Gear
                  </span>
                </div>
                {navDisplay.armor && <PlayerArmor sortedItems={sortedItems} />}
                {navDisplay.equipment && <PlayerEquipment sortedItems={sortedItems} />}
                {navDisplay.combatGear && <PlayerCombatGear sortedItems={sortedItems} />}
                {navDisplay.baseStats && <PlayerStats />}
                {navDisplay.skills && <PlayerSkills skillCaps={skillCaps} />}
                {navDisplay.collections && <PlayerCollections />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span style={{ color: "red" }}>Unable to fetch Hypixel Data</span>
      )}
    </div>
  );
};
export default Profile;
