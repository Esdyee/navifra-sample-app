import { defineStore } from 'pinia';

type token = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  error: string;
  error_description: string;
};

type myInfo = {
  id: string;
  nickname: string;
  age: number;
  gender: string;
  email: string;
  name: string;
  profileImage: string;
};

export const useLoginStore = defineStore('login', {
  state: () => ({
    tokenState: undefined as token | undefined,
    myInfoState: undefined as myInfo | undefined,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
    getToken: (state): token | undefined => state.tokenState,
    getMyInfo: (state): myInfo | undefined => {
      if (state.myInfoState) {
        state.myInfoState.profileImage = 'https://i.pravatar.cc/300';
      }
      return state.myInfoState;
    },
  },
  actions: {
    setToken(token: token) {
      this.tokenState = token;
    },
    setMyInfo(myInfo: myInfo) {
      this.myInfoState = myInfo;
    },
  },
});
