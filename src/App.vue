<template>
  <router-view />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {
  const naverMapScript = document.createElement('script');
  naverMapScript.type = 'text/javascript';
  naverMapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.VITE_NAVER_API_KEY}`;
  document.head.appendChild(naverMapScript);

  const naverLoginScript = document.createElement('script');
  naverLoginScript.type = 'text/javascript';
  naverLoginScript.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
  document.head.appendChild(naverLoginScript);
});

</script>


