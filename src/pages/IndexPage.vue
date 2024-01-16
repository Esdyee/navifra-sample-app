<template>
  <q-tabs
    v-model="basicCategory"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
  >
    <q-tab name="search" label="검색" />
    <q-tab name="mails" label="Mails" />
    <q-tab name="alarms" label="Alarms" />
    <q-tab name="movies" label="Movies" />
    <q-tab v-for="category in categories"
           @click="changeMapItem(category)"
           :key="category.categoryId"
           :name="category.categoryName"
           :label="category.categoryName"
    />
  </q-tabs>
  <pre>
    {{ JSON.stringify(selectedCategory) }}
    {{ JSON.stringify(mapItems) }}
  </pre>

  <button @click="setMarker">setMarker</button>
  <button @click="getNaverDistance">getNaverDistance</button>

  <q-page class="row items-center justify-evenly">
    <div id="naver-map" class="naver-map"></div>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>


  <q-footer bordered class="bg-grey-3 text-primary">
    <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8" v-model="tab">
      <q-tab name="images" label="Images" />
      <q-tab name="videos" label="Videos" />
      <q-tab name="articles" label="Articles" />
    </q-tabs>
  </q-footer>

</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { onMounted, ref } from 'vue';
import { api } from 'boot/axios'
import { CategoryApi, Category } from '../service/category-api';
import { MapApi, MapItem } from 'src/service/map-api';
import getDistance = naver.maps.UTMK.getDistance;
import InfoWindowOptions = naver.maps.InfoWindowOptions;

// call service 부분
const categoryApi = new CategoryApi();
const mapApi = new MapApi();

// data 부분
const categories = ref(categoryApi.getCategories());
const basicCategory = ref('search');
const selectedCategory = ref<Category>(categories.value[0]);
const naverMap = ref();
let map: naver.maps.Map;

const mapItems = ref<MapItem[]>([]);

// sendRequest();

onMounted(() => {
  // const naverMapTest: HTMLElement = document.getElementById('naver-map') as HTMLElement;
  getNaverMap();
})

function getNaverDistance() {

  setMarker(37.4986080, 127.0287482);
  setMarker(37.4979518, 127.027619);

  const start = new naver.maps.LatLng(37.4986080, 127.0287482)
  const end = new naver.maps.LatLng(37.4979518, 127.027619);
  const startlower = start.destinationPoint(180, 1500);
  const endlower = end.destinationPoint(180, 1500);

  const projection = map.getProjection();
  const distance = projection.getDistance(
    start,
    end
  );

  console.log(distance);

  var sizedCircleAndDiamondLine = new naver.maps.Polyline({
    path: [
      start,
      end
    ],
    map: map,
    startIcon: naver.maps.PointingIcon.CIRCLE,
    startIconSize: 10,
    endIcon: naver.maps.PointingIcon.DIAMOND,
    endIconSize: 10,
    strokeColor: '#ff0000',
    strokeOpacity: 0.5,
    strokeWeight: 6
  });

  var infowindow = new naver.maps.InfoWindow({
    content: '<div style="padding:20px;">' + 'geolocation.getCurrentPosition() 위치' + '</div>',
    backgroundColor: '#eee',
    borderColor: '#2db400',
    borderWidth: 2,
    anchorSize: new naver.maps.Size(30, 30),
    anchorSkew: true,
    anchorColor: '#eee',
    pixelOffset: new naver.maps.Point(20, -20)
  });

  infowindow.open(map, start)
}


function getNaverMap() {
  if (window.naver && window.naver.maps) {
    const center: naver.maps.LatLng = new naver.maps.LatLng(
      37.4979518,
      127.027619
    );
    map = new naver.maps.Map('naver-map', {
      center: center,
      zoom: 16,
      mapTypeId: naver.maps.MapTypeId.NORMAL
    });
  } else {
    // 초기 로딩시에 전역 naver가 없으면 1초 뒤에 다시 실행
    setTimeout(() => {
      getNaverMap();
    }, 1000);
  }
}

function changeMapItem(category: Category) {
  console.log(category);
  selectedCategory.value = category;
  mapItems.value = mapApi.getMapItem(category);

  console.log(mapItems.value);

  // mapx == lng, mapy == lat
  mapItems.value.forEach((item) => {
    console.log(stringToLat(item.mapy), stringToLng(item.mapx));
    setMarker(stringToLat(item.mapy), stringToLng(item.mapx));
  })
}

function setMarker(lat: number, lng: number) {
  let marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(
      lat,
      lng
    ),
    map: map
  });
}

function stringToLat(str: string): number {
  // dot the 7th digit from the back
  const lat = str.slice(0, -7) + '.' + str.slice(-7);
  return Number(lat);
}

function stringToLng(str: string): number {
  // dot the 7th digit from the back
  const lng = str.slice(0, -7) + '.' + str.slice(-7);
  return Number(lng);
}

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
