<template>
  <p>로그인 페이지</p>

  <div class='login-box'>
    <div id='naverOauthLogin' @click='naverCallback'>팝업 테스트</div>
    <div id='naverIdLogin'>로그인</div>

<!--    <div id='naverIdLogout'
         v-if='isNaverLogin'
         @click='setNaverLogout'>로그아웃</div>-->
    <!-- 네이버 로그인 버튼 노출 영역 -->
<!--    <div id='naver_id_login'></div>-->
  </div>

</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'boot/axios';

const route = useRoute();

let naverLogin: any;
let naverLogout: any;
let naverOauthToken: any;
let isNaverLogin = ref(false);


let authorizeState = ({
  response_type: 'code',
  naverClientId : process.env.NAVER_LOGIN_API_KEY,
  clientSecret : process.env.NAVER_LOGIN_SECRET_KEY,
  callbackUrl : process.env.NAVER_LOGIN_CALLBACK_URL,
  state: 'test',
  grant_type: 'authorization_code',
  code: '',
})

let tokenState = ({
  access_token: '',
  refresh_token: '',
  token_type: '',
  expires_in: '',
  error: '',
  error_description: ''
})

let myInfo = ({
  id: '',
  nickname: '',
  age: '',
  gender: '',
  email: '',
  name: ''
})


onMounted(() => {
  naverOauthToken = localStorage.getItem('com.naver.nid.oauth.state_token');
  if(naverOauthToken) {
    isNaverLogin.value = true;
  }

  if(typeof route.query.code === 'string') {
    authorizeState.code = route.query.code;
  }

  if(authorizeState.code.length > 0) {
    getNaverToken();
  }

  // getNaverLogin();
  // naverCallback();

})

// callback url
const naverCallback = async() => {

  const url = `https://nid.naver.com/oauth2.0/authorize?response_type=${authorizeState.response_type}`
    + `&client_id=${authorizeState.naverClientId}`
    + `&state=${authorizeState.state}`
    + `&redirect_uri=${authorizeState.callbackUrl}`;

  window.open(url, '네이버 아이디로 로그인', 'width=600, height=600');

  // naverUserInfo();
}

// 네이버 토큰 가져오기
async function getNaverToken() {
  const url = `/oauth2.0/token?grant_type=${authorizeState.grant_type}`
    + `&client_id=${authorizeState.naverClientId}`
    + `&client_secret=${authorizeState.clientSecret}`
    + `&code=${authorizeState.code}`
    + `&state=${authorizeState.state}`;

  await api.get(url)
    .then((res) => {
      console.log('res => ', res);
      tokenState.access_token = res.data.access_token;
      tokenState.refresh_token = res.data.refresh_token;
      tokenState.token_type = res.data.token_type;
      tokenState.expires_in = res.data.expires_in;
      tokenState.error = res.data.error;
      tokenState.error_description = res.data.error_description;

      getNaverProfile();
    })
    .catch((err) => {
      console.log('err => ', err);
    })


}

// 네이버 프로필 가져오기
async function getNaverProfile() {
  const url = `/v1/nid/me`;
  let header = "Bearer " + tokenState.access_token;
  const headers = {"Authorization": header};
  console.log("headers => ", headers);


  await api.get(url, { headers })
    .then((res) => {
      console.log('res => ', res);
      myInfo.id = res.data.response.id;
      myInfo.nickname = res.data.response.nickname;
      myInfo.age = res.data.response.age;
      myInfo.email = res.data.response.email;
      myInfo.name = res.data.response.name;
      myInfo.gender = res.data.response.gender;
    })
    .catch((err) => {
      console.log('err => ', err);
    })

  // // 변수에 값 넣기
  // state.userid = data.response.email;
}

// 로그아웃
function setLoginStatus(){

  const button_area = document.getElementById('button_area');

  if(!button_area) return;

  button_area.innerHTML="<button id='btn_logout'>로그아웃</button>";

  const logout=document.getElementById('btn_logout');

  if(!logout) return;

  logout.addEventListener('click',(e)=>{
    naverLogin.logout();

    if(process.env.NAVER_LOGIN_SERVICE_URL) {
      location.replace(process.env.NAVER_LOGIN_SERVICE_URL);
    }
  })
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
