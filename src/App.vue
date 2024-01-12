<template>

  <router-view />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import * as process from 'process';

onMounted(() => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  // script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env}`;
  console.log(process.env.NODE_ENV);
  document.head.appendChild(script);
});

</script>


