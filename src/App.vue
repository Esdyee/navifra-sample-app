<template>

  <router-view />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  // script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env}`;
  console.log(process.env.VITE_NAVER_API_KEY);
  console.log(process.env.TEST_API);
  document.head.appendChild(script);
});

</script>


