<template>
  <div class="layout">
    <div class="login-box" v-if="!isLogin">
      <div id="naverOauthLogin" @click="naverCallback">
        <img src="../assets/image/naver/btnG_완성형.png" />
      </div>
    </div>
    <div class="profile-box" v-if="isLogin">
      <div class="text-center">
        <q-avatar
          v-if="loginStore.getMyInfo?.profileImage"
          size="150px"
          class="q-mb-md"
        >
          <img :src="loginStore.getMyInfo?.profileImage" alt="프로필 이미지" />
        </q-avatar>
      </div>

      <q-list bordered separator>
        <q-item v-ripple>
          <q-item-section class="col-3">
            <q-item-label>이름</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ loginStore.getMyInfo?.name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section class="col-3">
            <q-item-label>나이</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ loginStore.getMyInfo?.age }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section class="col-3">
            <q-item-label>성별</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ loginStore.getMyInfo?.gender }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section class="col-3">
            <q-item-label>메일</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ loginStore.getMyInfo?.email }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'boot/axios';
import { useLoginStore } from '../stores/login-store';
import FooterLayout from 'layouts/FooterLayout.vue';

const route = useRoute();
const loginStore = useLoginStore();

let naverLogin: any;
let naverLogout: any;
let naverOauthToken: any;
let isLogin = ref(false);

let authorizeState = {
  response_type: 'code',
  naverClientId: process.env.NAVER_LOGIN_API_KEY,
  clientSecret: process.env.NAVER_LOGIN_SECRET_KEY,
  callbackUrl: process.env.NAVER_LOGIN_CALLBACK_URL,
  state: 'test',
  grant_type: 'authorization_code',
  code: '',
};

type PostMessage = {
  code: string;
  state: string;
};

onMounted(() => {
  checkLogin();

  // 팝업창으로 열렸을 경우
  if (window.opener) {
    // code만 부모에게 넘기고 닫기
    if (typeof route.query.code === 'string') {
      console.log('route.query.code => ', route.query.code);

      window.opener.postMessage(
        {
          code: route.query.code,
          state: route.query.state,
        },
        '*'
      );

      window.close();
    }
  }

  if (authorizeState.code.length > 0) {
    console.log('authorizeState.code => ', authorizeState.code);
    getNaverToken();
  }

  window.addEventListener('message', getMessage, false);
  // getNaverLogin();
  // naverCallback();
});

const getMessage = (e: any) => {
  console.log('e => ', e);
  const data: PostMessage = e.data;

  if (e.data?.code) {
    authorizeState.code = data.code;
    authorizeState.state = data.state;
    getNaverToken();
  }
};

// callback url
const naverCallback = async () => {
  console.log('naverCallback', authorizeState);
  const url =
    `https://nid.naver.com/oauth2.0/authorize?response_type=${authorizeState.response_type}` +
    `&client_id=${authorizeState.naverClientId}` +
    `&state=${authorizeState.state}` +
    `&redirect_uri=${authorizeState.callbackUrl}`;

  window.open(url, '네이버 아이디로 로그인', 'width=600, height=600');

  // naverUserInfo();
};

function checkLogin() {
  if (loginStore.getToken?.access_token) {
    isLogin.value = true;
  }
}

// 네이버 토큰 가져오기
async function getNaverToken() {
  console.log('getNaverToken');
  const url =
    `/oauth2.0/token?grant_type=${authorizeState.grant_type}` +
    `&client_id=${authorizeState.naverClientId}` +
    `&client_secret=${authorizeState.clientSecret}` +
    `&code=${authorizeState.code}` +
    `&state=${authorizeState.state}`;

  await api
    .get(url)
    .then((res) => {
      console.log('getToken res => ', res);
      loginStore.setToken(res.data);
      getNaverProfile();
    })
    .catch((err) => {
      console.log('err => ', err);
    });
}

// 네이버 프로필 가져오기
async function getNaverProfile() {
  const url = `/v1/nid/me`;
  console.log('get_access_token', loginStore.getToken);
  if (loginStore.getToken?.access_token) {
    let header = 'Bearer ' + loginStore.getToken.access_token;
    const headers = { Authorization: header };
    console.log('headers => ', headers);

    await api
      .get(url, { headers })
      .then((res) => {
        console.log('get Profile res => ', res);
        loginStore.setMyInfo(res.data.response);
        isLogin.value = true;
      })
      .catch((err) => {
        console.log('err => ', err);
      });
  }
}

// 로그아웃
function setLoginStatus() {
  const button_area = document.getElementById('button_area');

  if (!button_area) return;

  button_area.innerHTML = "<button id='btn_logout'>로그아웃</button>";

  const logout = document.getElementById('btn_logout');

  if (!logout) return;

  logout.addEventListener('click', (e) => {
    naverLogin.logout();

    if (process.env.NAVER_LOGIN_SERVICE_URL) {
      location.replace(process.env.NAVER_LOGIN_SERVICE_URL);
    }
  });
}
</script>

<style scoped>
.layout {
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /*background-color: red;*/
}

.login-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /*background-color: yellow;*/
}

#naverOauthLogin {
  height: 40px;
  margin: 0 auto;
}

#naverOauthLogin img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

#naverIdLogin {
  height: 40px;
  margin: 0 auto;
  /*background-color: red;*/
}

#naverIdLogout {
  height: 40px;
  margin: 0 auto;
  /*background-color: green;*/
}

.profile-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /*background-color: beige;*/
}

.profile-box .q-item-label {
}
</style>
