<template>
  <!-- AsyncComponent Test Page-->
  <AsyncPage />
  <FooterLayout />
</template>

<script setup lang='ts'>
import FooterLayout from 'layouts/FooterLayout.vue';
import { onMounted, ref, defineAsyncComponent } from 'vue';
import LoadingComponent from '../components/LoadingComp.vue';
import ErrorComponent from '../components/ErrorComp.vue';

const AsyncPage = defineAsyncComponent({
  // 로더 함수
  loader: () => import('./LoginPageLegacy.vue'),

  // 비동기 컴포넌트가 로드되는 동안 사용할 로딩 컴포넌트입니다.
  loadingComponent: LoadingComponent,
  // 로딩 컴포넌트를 표시하기 전에 지연할 시간. 기본값: 200ms
  delay: 200,

  // 로드 실패 시 사용할 에러 컴포넌트
  errorComponent: ErrorComponent,
  // 시간 초과 시, 에러 컴포넌트가 표시됩니다. 기본값: 무한대
  timeout: 3000
})
</script>

<style scoped>

</style>
