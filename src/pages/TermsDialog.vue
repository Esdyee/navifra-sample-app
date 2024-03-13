<template>
   <div class="q-pa-md q-gutter-sm">
   <q-dialog v-model="fixed">
      <q-card>
        <q-card-section>
          <div class="text-h6">사용방법</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <h3>조회 기능</h3>
          <div>
            <p> - [내 위치 설정]은 강남역 주변으로 랜덤으로 배치 됩니다.</p>
            <p> - [내 위치 설정]을 하면 검색했던 항목이 초기화 됩니다.</p>
            <p> - 음식점, 병원 옷가게, 은행은 이미 정해진 데이터를 기준으로 출력됩니다.</p>
            <p> - 위의 정해진 데이터에만 '입점시간'이 존재합니다. </p>
            <p> - 카테고리 옆에 (API)가 있는 항목은 실제 Naver의 API를 사용하여 출력됩니다.</p>
            <p> - [내 위치 설정]이 된 상태에서 지도 위에 검색결과 Pin을 클릭하면 <br/> 실시간 길찾기, 거리, 속도를 알 수 있습니다. </p>
          </div>
          <h3>환경설정(env) 파일</h3>
          <div>
            <p> - 정상적인 경우라면 zip파일로 별도 제공될 예정입니다.</p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
<!--<q-btn flat label="Decline" color="primary" v-close-popup />-->
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

const fixed = ref(false);

const props = defineProps({
  visible: Boolean,
});

watch(() => props.visible, (val) => {
  fixed.value = true;
});

onMounted(() => {
  console.log('mounted');
});



</script>

<style scoped>
h3 {
  margin: 0;
  font-weight: bold;
  font-size: 1.2em;
}
p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: 1em;
}
</style>
