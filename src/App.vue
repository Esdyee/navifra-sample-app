<template>
  <router-view />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

function loadScript(url: string, callback: () => void) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = function() {
    callback();
  };
  document.head.appendChild(script);
}

const naverMapUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.VITE_NAVER_API_KEY}`;
const naverLoginUrl = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
const naverPayUrl = 'https://nsp.pay.naver.com/sdk/js/naverpay.min.js';

onMounted(() => {

  // 새로운 전역변수에 라이브러리를 담고
  // 이 라이브러리를 호출 하는 방식
  // loadScript(naverMapUrl, () => {
  //   window.naverMap = window.naver;
  // })
  //
  // loadScript(naverMapUrl, () => {
  //   window.naverLogin = window.naver;
  // })


  // 네이버 지도 API 로드
  // loadScript(naverMapUrl, () => {
  //
  //   window.naverMap = window.naver;
  //
  //   // 네이버 로그인 API 로드
  //   loadScript(naverLoginUrl, () => {
  //     window.naverLogin = window.naver;
  //     window.naver = Object.assign(window.naverMap, window.naverLogin)
  //   });
  //
  //   console.log('네이버 지도 API 로드 완료');
  // });

  callNaverMap();

});

function callNaverMap() {
  // 네이버 지도 API 로드
  loadScript(naverMapUrl, () => {
    window.naverMap = window.naver;
    callNaverLogin()
    console.log('네이버 지도 API 로드 완료');
  });
}

function callNaverLogin() {
  // 네이버 로그인 API 로드
  loadScript(naverLoginUrl, () => {
    window.naverLogin = window.naver;
    callNaverPay();
    // window.naver = Object.assign(window.naverMap, window.naverLogin)
  });
}

function callNaverPay() {
  // 네이버 페이 API 로드
  loadScript(naverPayUrl, () => {
    window.naverPay = window.naver;
    window.naver = Object.assign(window.naverMap, window.naverLogin, window.naverPay)
  });
}

</script>


