<template>
  <q-page class="row items-center justify-evenly">
    <div id="naver-map" class="naver-map"></div>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { onMounted, ref } from 'vue';
import { api } from 'boot/axios'

const naverMap = ref();

///v1/search/local.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=random

sendRequest();

onMounted(() => {
  // const naverMapTest: HTMLElement = document.getElementById('naver-map') as HTMLElement;
  let map: naver.maps.Map;
  const center: naver.maps.LatLng = new naver.maps.LatLng(
    37.4979518,
    127.027619
  );

  map = new naver.maps.Map('naver-map', {
    center: center,
    zoom: 16
  });

})

function sendRequest() {
  api.get('/v1/search/local.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=random')
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
}

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
]);
const meta = ref<Meta>({
  totalCount: 1200
});
</script>

<style>
#naver-map {
  width: 80vw;
  height: 20vw;
  min-width: 400px;
  min-height: 400px;
  border: black 1px solid;
}
</style>
