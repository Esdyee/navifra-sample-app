<template>
  <p>로그인 페이지</p>

  <div class="login-box">
    <div id="naverOauthLogin" @click="naverCallback">팝업 테스트</div>
    <div id="naverIdLogin">로그인</div>

    <div id="naverIdLogout" v-if="isNaverLogin" @click="setNaverLogout">
      로그아웃
    </div>
    <!-- 네이버 로그인 버튼 노출 영역 -->
    <!--    <div id='naver_id_login'></div>-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'boot/axios';

const route = useRoute();

let naverLogin: any;
let naverLogout: any;
let naverOauthToken: any;
let naverHashData: any;
let isNaverLogin = ref(false);

let state = {
  naverClientId: process.env.NAVER_LOGIN_API_KEY,
  clientSecret: process.env.NAVER_LOGIN_SECRET_KEY,
  callbackUrl: process.env.NAVER_LOGIN_CALLBACK_URL,
  state: 'test',
};

let myInfo = {
  id: '',
  nickname: '',
  age: '',
  gender: '',
  email: '',
  name: '',
};

onMounted(() => {
  // naverOauthToken = localStorage.getItem('com.naver.nid.oauth.state_token');
  // if(naverOauthToken) {
  //   isNaverLogin.value = true;
  // }

  // getNaverHash();

  if (naverHashData) {
    // naverCallback();
  } else {
    // getNaverLogin();
  }

  getNaverLogin();
  // naverCallback();
});

function getNaverLogin() {
  if (window.naver) {
    naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NAVER_LOGIN_API_KEY,
      callbackUrl: process.env.NAVER_LOGIN_CALLBACK_URL,
      // isPopup: true,
      callbackHandle: true,
      loginButton: {
        color: 'green',
        type: 3,
        height: 50,
      },
    });

    naverLogin.init();

    naverLogin.getLoginStatus(function (status: any) {
      if (status) {
        console.log(status, 'status');
        console.log(naverLogin.user, 'user');

        const nickName = naverLogin.user.getNickName();
        const age = naverLogin.user.getAge();
        const birthday = naverLogin.user.getBirthday();

        //닉네임을 선택하지 않으면 선택창으로 돌아갑니다.
        if (nickName === null || nickName === undefined) {
          alert('별명이 필요합니다. 정보제공을 동의해주세요.');
          naverLogin.reprompt();
          return;
        } else {
          console.log('로그인 성공하였습니다.');
          // naverCallback();
          // setLoginStatus(); //모든 필수 정보 제공 동의하면 실행하는 함수
        }
      } else {
        console.log('AccessToken이 올바르지 않습니다.');
      }
    });
  } else {
    // 초기 로딩시에 전역 naver가 없으면 1초 뒤에 다시 실행
    setTimeout(() => {
      getNaverLogin();
    }, 1000);
  }
}

function getNaverHash() {
  if (route.hash.length === 0) return;

  naverHashData = setNaverHashData(route.hash);
  console.log(naverHashData, 'naverHashData');
}

// callback url
const naverCallback = async () => {
  console.log('state', state);

  const url =
    `https://nid.naver.com/oauth2.0/authorize?response_type=code` +
    `&client_id=${state.naverClientId}` +
    `&state=${state.state}` +
    `&redirect_uri=${state.callbackUrl}`;

  window.open(url, '네이버 아이디로 로그인', 'width=600, height=600');

  // const headers = {
  //   'X-Naver-Client-Id': state.naverClientId,
  //   'X-Naver-Client-Secret': state.clientSecret
  // };

  // const { data } = await api.get(url);
  //
  // console.log('data => ' , data);
  //
  // console.log('data.access_token => ' , naverHashData.access_token);
  // state.access_token = naverHashData.access_token
  //
  // console.log('data.refresh_token => ' , data.refresh_token);
  // state.refresh_token = data.refresh_token

  // naverUserInfo();
};

// 사용자 정보 전달받기
const naverUserInfo = async () => {
  const url = `/v1/nid/me`;
  let header = 'Bearer ' + naverHashData.access_token;
  const headers = { Authorization: header };
  console.log('headers => ', headers);
  const { data } = await api.get(url, { headers });
  console.log('*****naverUserInfo data***** => ', data);

  // // 변수에 값 넣기
  // state.userid = data.response.email;
  // state.nickname = data.response.nickname;
  // state.apiimageurl = data.response.profile_image;
  //
  // // 생일 쪼개기
  // let birtharr = data.response.birthday.split('-');
  // state.birthday = birtharr.join('');
  // state.birthyear = data.response.birthyear.substring(2);
  // state.birth = state.birthyear + state.birthday
  //
  // // 휴대폰 번호 쪼개기
  // let phonearr = data.response.mobile.split('-');
  // state.phone = phonearr.join('');

  // naverUseridCheck(data);
};

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

function setNaverLogout() {
  naverLogin.logout();

  if (process.env.NAVER_LOGIN_SERVICE_URL) {
    console.log('replace url');
    location.replace(process.env.NAVER_LOGIN_SERVICE_URL);
  }
}

// naver hash 데이터 변경
function setNaverHashData(hash: string) {
  // remove hash character
  hash = hash.substring(1);

  const naverHashData = hash.split('&');
  const naverHashDataObj: any = {};

  naverHashData.forEach((item) => {
    const itemArr = item.split('=');
    naverHashDataObj[itemArr[0]] = itemArr[1];
  });

  return naverHashDataObj;
}
</script>

<style scoped>
.login-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: yellow;
}

#naverOauthLogin {
  height: 40px;
  margin: 0 auto;
  background-color: red;
}

#naverIdLogin {
  height: 40px;
  margin: 0 auto;
  background-color: red;
}

#naverIdLogout {
  height: 40px;
  margin: 0 auto;
  background-color: green;
}
</style>
