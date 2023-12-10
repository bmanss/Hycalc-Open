import axios from "axios";
export async function fetchUUID(username) {
    const url = `https://api.ashcon.app/mojang/v2/user/${username}`;
    try {
      const response = await axios.get(url);
      return {id: response.data.uuid.replaceAll('-','')};
    } catch (error) {
      throw error;
    }
  }