import AsyncStorage from "@react-native-async-storage/async-storage";

const NAMESPACE = "auth";

export default {
  getAccessToken: async () => {
    const token = await AsyncStorage.getItem(`${NAMESPACE}:token`);
    return token && JSON.parse(token);
  },

  setAccessToken: async (accessToken) => {
    const stringifiedToken = JSON.stringify(accessToken);
    await AsyncStorage.setItem(`${NAMESPACE}:token`, stringifiedToken);
  },

  removeAccessToken: async () => {
    await AsyncStorage.removeItem(`${NAMESPACE}:token`);
  },
};
