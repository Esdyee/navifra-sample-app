<template>
  <div class="message-box">
    <div class="fail-message">
      <p>결제에 실패하였습니다</p>
    </div>
    <div>
      <p>{{ countSeconds }} 초후 결제 메인 페이지로 돌아갑니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const countSeconds = ref(10);

onMounted(() => {
  setTimeout(() => {
    window.location.href = '/';
  }, 10000);

  setInterval(() => {
    countDown();
  }, 1000);
});

function countDown() {
  countSeconds.value -= 1;
}
</script>

<style scoped>
.message-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  flex-direction: column;
}

.fail-message {
  font-family: 'Toss Product Sans', 'Tossface', -apple-system,
    BlinkMacSystemFont, 'Bazier Square', 'Noto Sans KR', 'Segoe UI',
    Apple SD Gothic Neo, Roboto, 'Noto Sans KR', 'Helvetica Neue', Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  font-size: 2rem;
  font-weight: 700;
}
</style>
