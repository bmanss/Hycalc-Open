import { createContext, useContext, useReducer } from "react";
import { parseNBT } from "../lib/Util";
import * as ProfilesFunctions from "../lib/ProfileFunctions";

const ProfileContext = createContext();
let profilesData = {};
let profiles = [];

const initialProfileState = {
  playerGear: ProfilesFunctions.defaultGear(),
  basePlayerStats: ProfilesFunctions.defaultPlayerStats(),
  finalStats: ProfilesFunctions.defaultPlayerStats(),
  playerSkills: ProfilesFunctions.defaultSkillS(),
  playerCollections: {},
  statMultipliers: { ...ProfilesFunctions.initialStatMultipliers },
  damageMultipliers: { ...ProfilesFunctions.initialDamageMultipliers },
  additionalMultiplers: ProfilesFunctions.allMultipliers(),
  powerstone: "none",
  activeProfile: "",
  targetMob: "None",
  dungeonMode: false,
};

export const ProfileActions = {
  SET_PLAYER_GEAR: "SET_PLAYER_GEAR",
  SET_PLAYER_GEAR_PIECE: "SET_PLAYER_GEAR_PIECE",
  SET_BASE_PLAYER_STATS: "SET_BASE_PLAYER_STATS",
  SET_FINAL_PLAYER_STATS: "SET_FINAL_PLAYER_STATS",
  SET_PLAYER_SKILLS: "SET_PLAYER_SKILLS",
  SET_PLAYER_COLLECTIONS: "SET_PLAYER_COLLECTIONS",
  SET_POWERSTONE: "SET_POWERSTONE",
  SET_MULTIPLE: "SET_MULTIPLE",
  SET_ACTIVE_PROFILE: "SET_ACTIVE_PROFILE",
  SET_TARGET_MOB: "SET_TARGET_MOB",
  SET_DUNGEON_MODE: "SET_DUNGEON_MODE",
  SET_ADDITIONAL_MULIPLIERS: "SET_ADDITIONAL_MULIPLIERS",
};

const profileReducer = (state, action) => {
  let updatedState = state;
  switch (action.type) {
    case ProfileActions.SET_PLAYER_GEAR:
      updatedState = { ...state, playerGear: action.payload };
      break;
    case ProfileActions.SET_PLAYER_GEAR_PIECE:
      updatedState = {
        ...state,
        playerGear: {
          ...state.playerGear,
          [action.payload.category]: action.payload.newGearPiece,
        },
      };
      break;
    case ProfileActions.SET_BASE_PLAYER_STATS:
      updatedState = { ...state, basePlayerStats: action.payload };
      break;
    case ProfileActions.SET_PLAYER_SKILLS:
      updatedState = { ...state, playerSkills: action.payload };
      break;
    case ProfileActions.SET_PLAYER_COLLECTIONS:
      updatedState = { ...state, playerCollections: action.payload };
      break;
    case ProfileActions.SET_POWERSTONE:
      updatedState = { ...state, powerstone: action.payload };
      break;
    case ProfileActions.SET_MULTIPLE:
      updatedState = { ...state, ...action.payload };
      break;
    case ProfileActions.SET_ACTIVE_PROFILE:
      updatedState = { ...state, activeProfile: action.payload };
      break;
    case ProfileActions.SET_TARGET_MOB:
      updatedState = { ...state, targetMob: action.payload };
      break;
    case ProfileActions.SET_ADDITIONAL_MULIPLIERS:
      updatedState = { ...state, additionalMultiplers: action.payload };
      break;
    case ProfileActions.SET_DUNGEON_MODE:
      updatedState = { ...state, dungeonMode: action.payload };
      break;
    default:
      break;
  }
  ProfilesFunctions.finalStats(updatedState,updatedState.dungeonMode);
//   const finalStats = ProfilesFunctions.getFinalStats(updatedState);
  // updatedState.finalPlayerStats = finalStats;
  // console.log(updatedState);
//   console.log(ProfilesFunctions.finalStats(updatedState));
  return updatedState;
};

export const ProfileProvider = ({ children }) => {
  const [profileState, dispatchProfileUpdate] = useReducer(profileReducer, initialProfileState);

  // quick accessors for componenets so the entire path does not need to be typed out
  const getGearPiece = (type) => {
    return profileState.playerGear[type];
  };
  const getBaseStats = () => {
    return profileState.basePlayerStats;
  };
  const getSkills = () => {
    return profileState.playerSkills;
  };
  const getFinalStats = () => {
    return profileState.finalStats;
  };
  const getPowerStone = () => {
    return profileState.powerstone;
  };
  const getCollections = () => {
    return profileState.playerCollections;
  };
  const getTargetMob = () => {
    return profileState.targetMob;
  };
  const getStatMultipliers = () => {
    return profileState.statMultipliers;
  };
  const getDamageMultiplers = () => {
    return profileState.damageMultipliers;
  };
  const getAdditionalMultiplers = () => {
    return profileState.additionalMultiplers;
  };
  const isDungeonMode = () => {
    return profileState.dungeonMode;
  };

  /**
   * Sets profile data based on the given UUID and profiles array.
   * Profiles are stored with cute names as keys.
   * @param UUID - The UUID to identify the player.
   * @param profilesArray - An array of profiles to process.
   */
  const setProfilesData = ({ UUID, profilesArray }) => {
    const data = {};
    for (let i = 0; i < profilesArray.length; i++) {
      const profileSlotData = {};
      profileSlotData.gameMode = profilesArray[i].game_mode ?? "normal";
      profileSlotData.index = i;
      profileSlotData.data = profilesArray[i].members[UUID];
      if (profilesArray[i].selected) {
        profileState.activeProfile = profilesArray[i].cute_name;
      }
      data[profilesArray[i].cute_name] = profileSlotData;
    }
    profiles = Object.keys(data);
    profilesData = data;
  };

  /**
   * Must be called after setting the profiles data with {@link setProfilesData}.
   * If called without cute name it will build a default profile.
   * @param {string} CuteName - Cute name of the profile to build.
   */
  const buildProfile = async (CuteName) => {
    if (profilesData[CuteName]) {
      const parsedProfile = {};
      let parsedGear = ProfilesFunctions.defaultGear();
      let parsedAccessories = {};
      const profile = profilesData[CuteName].data;
      const armor = profile?.inventory?.inv_armor && (await parseNBT(profile.inventory.inv_armor.data)).value.i.value.value;
      const equipment = profile?.inventory?.equipment_contents && (await parseNBT(profile.inventory.equipment_contents.data)).value.i.value.value;
      const inventory = profile?.inventory?.inv_contents && (await parseNBT(profile.inventory.inv_contents.data)).value.i.value.value;
      const accessoryBag =
        profile?.inventory?.bag_contents?.talisman_bag && (await parseNBT(profile.inventory.bag_contents.talisman_bag.data)).value.i.value.value;
      const powerstone = profile?.accessory_bag_storage?.selected_power ?? "none";
      const tuningSlot_0 = profile?.accessory_bag_storage?.tuning && profile.accessory_bag_storage.tuning.slot_0;
      const calculatedSkills = await ProfilesFunctions.calculateSkillLevels(profile);
      const abiphoneContacts = profile?.nether_island_player_data?.abiphone?.active_contacts;
      const collectionsData = profile?.collection && profile.collection;
      const essencePerks = profile?.player_data?.perks && ProfilesFunctions.parseEssencePerks(profile.player_data.perks);
      const petData = profile?.pets_data?.pets && ProfilesFunctions.parsePetApiData(profile.pets_data.pets);
      (await armor) && ProfilesFunctions.parseApiGear(parsedGear, armor, "armor");
      (await equipment) && ProfilesFunctions.parseApiGear(parsedGear, equipment, "equipment");
      (await inventory) && ProfilesFunctions.parseApiGear(parsedGear, [inventory[0]], "weapon");
      
      parsedAccessories = accessoryBag && ProfilesFunctions.parseAPIAccessoryBag(accessoryBag, abiphoneContacts);

      if (petData?.activePet) parsedGear.pet = ProfilesFunctions.parsePet(petData.activePet);

      const magicalPower = ProfilesFunctions.getMagicalPower(parsedAccessories);
      const updatedStats = ProfilesFunctions.defaultPlayerStats();

      updatedStats.MAGIC_FIND += petData?.magicFindBonus ?? 0;

      updatedStats.essencePerks = essencePerks;

      updatedStats.MAGICAL_POWER = magicalPower;

      ProfilesFunctions.addStats(updatedStats, ProfilesFunctions.getPowerstoneStats(powerstone, magicalPower));
      // read in accessory stats
      parsedAccessories && ProfilesFunctions.addAccessoryStats(updatedStats, parsedAccessories);

      // read in initial skill bonus stats
      for (let skill in calculatedSkills) {
        ProfilesFunctions.updateSkillBonus(updatedStats, skill, 0, calculatedSkills[skill]);
      }

      // add slayer stats
      ProfilesFunctions.addStats(updatedStats, ProfilesFunctions.getSlayerBonusStats(profile));

      // melody bonus intelligence
      updatedStats.INTELLIGENCE += ProfilesFunctions.getMelodyIntelligence(profile);

      // add tuning stats to base stats
      tuningSlot_0 && ProfilesFunctions.addStats(updatedStats, ProfilesFunctions.tuningPointsToStats(tuningSlot_0));

      // god potion
      ProfilesFunctions.addStats(updatedStats, ProfilesFunctions.godPotionStats);

      parsedProfile.basePlayerStats = updatedStats;
      parsedProfile.powerstone = powerstone;
      parsedProfile.playerGear = parsedGear;
      parsedProfile.playerSkills = calculatedSkills;
      parsedProfile.additionalMultiplers = ProfilesFunctions.allMultipliers();
      parsedProfile.playerCollections = ProfilesFunctions.parseCollectionsData(collectionsData, ProfilesFunctions.defaultCollections());
      dispatchProfileUpdate({ type: ProfileActions.SET_MULTIPLE, payload: parsedProfile });
    }
    // if no rawData build profile for default state
    else {
      const defaultProfile = {
        basePlayerStats: ProfilesFunctions.defaultPlayerStats(),
        finalPlayerStats: { normal: ProfilesFunctions.defaultPlayerStats(), dungeon: ProfilesFunctions.defaultPlayerStats() },
        playerGear: ProfilesFunctions.defaultGear(),
        playerSkills: ProfilesFunctions.defaultSkillS(),
        playerCollections: ProfilesFunctions.defaultCollections(),
        statMultipliers: { ...ProfilesFunctions.initialStatMultipliers },
        damageMultipliers: { ...ProfilesFunctions.initialDamageMultipliers },
        additionalMultiplers: ProfilesFunctions.allMultipliers(),
        targetMob: "None",
        powerstone: "None"
      };
      dispatchProfileUpdate({ type: ProfileActions.SET_MULTIPLE, payload: defaultProfile });
    }
  };

  const buildActiveProfile = async () => {
    buildProfile(profileState.activeProfile);
  };

  const contextValues = {
    buildProfile: buildProfile,
    setProfilesData: setProfilesData,
    dispatchProfileUpdate: dispatchProfileUpdate,
    getGearPiece: getGearPiece,
    getBaseStats: getBaseStats,
    getFinalStats: getFinalStats,
    getSkills: getSkills,
    getPowerStone: getPowerStone,
    getCollections: getCollections,
    buildActiveProfile: buildActiveProfile,
    getTargetMob: getTargetMob,
    getStatMultipliers: getStatMultipliers,
    getDamageMultiplers: getDamageMultiplers,
    getAdditionalMultiplers: getAdditionalMultiplers,
    isDungeonMode:isDungeonMode,
    profiles: profiles,
    profileState: profileState,
  };

  return <ProfileContext.Provider value={contextValues}>{children}</ProfileContext.Provider>;
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within an ProfileProvider");
  }
  return context;
};
