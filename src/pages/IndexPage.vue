<template>
  <q-page class="row items-center justify-evenly">
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
    <div>
      <button @click="myLocation">myLocation</button>
      <button @click="setMarker">setMarker</button>
      <button @click="getNaverDistance">getNaverDistance</button>
      <button @click="sendDirectionRequest">sendDirectionRequest</button>
    </div>
    <div id="naver-map" class="naver-map"></div>
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
import { onMounted, ref } from 'vue';
import { api } from 'boot/axios'
import { CategoryApi, Category } from '../service/category-api';
import { MapApi, MapItem } from 'src/service/map-api';

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


onMounted(() => {
  // const naverMapTest: HTMLElement = document.getElementById('naver-map') as HTMLElement;
  getNaverMap();
})


function myLocation() {

  const center: naver.maps.LatLng = new naver.maps.LatLng(
    37.4979518,
    127.027619
  );

  map.setCenter(center);

}


// 거리 재기
async function getNaverDistance() {

  const start = new naver.maps.LatLng(37.4979518, 127.027619);
  const end = new naver.maps.LatLng(37.4986080, 127.0287482);

  setMarker(start);
  setMarker(end);

  // const startlower = start.destinationPoint(180, 1500);
  // const endlower = end.destinationPoint(180, 1500);

  // 지도의 투영도를 생성, 이 위에 그림을 그림
  const projection = map.getProjection();
  const distance = projection.getDistance(
    start,
    end
  );

  // 네비게이션 API 호출
  await sendDirectionRequest(
    start,
    end
  )

}

// 네이버 MAP 로딩
function getNaverMap() {
  if (window.naver && window.naver.maps) {

    map = new naver.maps.Map('naver-map', {
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

// 카테고리 마커 찍기
function changeMapItem(category: Category) {
  selectedCategory.value = category;
  mapItems.value = mapApi.getMapItem(category);

  // mapx == lng, mapy == lat
  mapItems.value.forEach((item) => {

    const latlng = new naver.maps.LatLng(stringToLat(item.mapy), stringToLng(item.mapx));
    setMarker(latlng);

  })
}

function setMarker(latlng: naver.maps.LatLng) {
  let marker = new naver.maps.Marker({
    position: latlng,
    map: map
  });
}

function setPolyLine(start: naver.maps.LatLng, end: naver.maps.LatLng) {
  const polyline = new naver.maps.Polyline({
    map: map,
    path: [
      start,
      end
    ],
    strokeWeight: 5,
    strokeColor: '#ff0000',
    strokeOpacity: 0.5
  });
}

function setInfoWindow(content: string) {
  return new naver.maps.InfoWindow({
    content: content,
    backgroundColor: '#eee',
    borderColor: '#2db400',
    borderWidth: 2,
    anchorSize: new naver.maps.Size(30, 30),
    anchorSkew: true,
    anchorColor: '#eee',
    pixelOffset: new naver.maps.Point(20, -20)
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

function sendSearchRequest() {
  api.get('/v1/search/local.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=random', {
    headers: {
      'X-Naver-Client-Id': process.env.X_NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.X_NAVER_CLIENT_SECRET,
    }
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
}

function sendDirectionRequest(
  startLngLat:  naver.maps.LatLng,
  endLngLat: naver.maps.LatLng,
 ) {

  const startLng = startLngLat.lng().toString();
  const startLat = startLngLat.lat().toString();
  const endLng = endLngLat.lng().toString();
  const endLat = endLngLat.lat().toString();

  return api.get(`/map-direction/v1/driving?start=${startLng},${startLat}&goal=${endLng},${endLat}&option=trafast`, {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
      'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
    }
  })
    .then((res) => {
      console.log(res.data);

      let startLatLng = new naver.maps.LatLng(Number(startLat), Number(startLng));
      let previousLatLng: naver.maps.LatLng;
      let nextLatLng: naver.maps.LatLng;
      let finalLatLng;

      res.data.route.trafast[0].path.forEach((path:number[], index: number) => {

          const lng = path[0];
          const lat = path[1];

          if(index === 0) {
            previousLatLng = startLatLng;
            nextLatLng = new naver.maps.LatLng(lat, lng);
          } else {
            previousLatLng = nextLatLng;
            nextLatLng = new naver.maps.LatLng(lat, lng);

            // finalLatLng 마지막 좌표
            if(index === res.data.route.trafast[0].path.length - 1) {
              finalLatLng = nextLatLng;
            }
          }

          console.log(previousLatLng, nextLatLng)

          // set polyline
          setPolyLine(
            previousLatLng,
            nextLatLng
          )
        })

      const { distance, speed } = res.data.route.trafast[0].section[0]

      setInfoWindow(
        `
          <div style="padding: 10px">
            <p>distance: ${distance} / speed: ${speed}</p>
          </div>
          `
      ).open(map, finalLatLng);
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
