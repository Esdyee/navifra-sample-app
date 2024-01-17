<template>
  <q-page class="items-center justify-evenly">
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
    <div class="button-box">
      <button @click="setMyLocation">setMyLocation</button>
      <button @click="setMarker">setMarker</button>
      <button @click="getNaverDistance">getNaverDistance</button>
      <button @click="sendDirectionRequest">sendDirectionRequest</button>
    </div>
    <div class="map-box">
      <div id="naver-map" class="naver-map"></div>
    </div>
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
import imgUrl from '../assets/image/red-marker.png';

// call service 부분
const categoryApi = new CategoryApi();
const mapApi = new MapApi();

// data 부분
const categories = ref(categoryApi.getCategories());
const basicCategory = ref('search');
const selectedCategory = ref<Category>(categories.value[0]);
const naverMap = ref();

let myLocation: naver.maps.LatLng;
let map: naver.maps.Map;

const mapItems = ref<MapItem[]>([]); // 카테고리의 map item 저장
const polylines = ref<naver.maps.Polyline[]>([]); // polyline 이력 저장

onMounted(() => {
  // const naverMapTest: HTMLElement = document.getElementById('naver-map') as HTMLElement;
  getNaverMap();
})

async function getNaverDistance(endpoint: naver.maps.LatLng) {

  let start = myLocation;
  let end;

  console.log(start, endpoint);

  if(!endpoint) {
    end = new naver.maps.LatLng(37.4986080, 127.0287482);
  } else {
    end = endpoint;
  }

  // setMarker(start);
  // setMarker(end);

  const startlower = start.destinationPoint(180, 1500);
  const endlower = end.destinationPoint(180, 1500);


  const projection = map.getProjection();
  const distance = projection.getDistance(
    start,
    end
  );

  await sendDirectionRequest(
    start,
    end
  )

}

function setMyLocation() {
  myLocation = new naver.maps.LatLng(
    37.4979518,
    127.027619
  );

  map.setCenter(myLocation);
  setMarker(myLocation, true);
}

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

function changeMapItem(category: Category) {
  console.log(category);
  selectedCategory.value = category;
  mapItems.value = mapApi.getMapItem(category);

  console.log(mapItems.value);

  // mapx == lng, mapy == lat
  mapItems.value.forEach((item) => {

    const latLng = new naver.maps.LatLng(
      stringToLat(item.mapy),
      stringToLng(item.mapx)
    );

    // 마커 찍기
    setMarker(latLng);

  })
}

function setMarker(latLng: naver.maps.LatLng, myLocation = false) {

  let marker = new naver.maps.Marker({
    position: latLng,
    map: map,
    icon: myLocation ? {
      url: imgUrl, //아이콘 경로
      size: new naver.maps.Size(50, 52),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(25, 26)
    } : ''
  });


  // 마커 클릭 이벤트
  naver.maps.Event.addListener(marker, 'click', function() {
    console.log('click marker');
    getNaverDistance(latLng);
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

  polylines.value.push(polyline);
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
  startLngLat: naver.maps.LatLng,
  endLngLat: naver.maps.LatLng
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

      let startLatLng = new naver.maps.LatLng(Number(startLat), Number(startLng));
      let previousLatLng: naver.maps.LatLng;
      let nextLatLng: naver.maps.LatLng;
      let finalLatLng;

      // remove all polyline
      polylines.value.forEach((polyline) => {
        polyline.setMap(null);
      })


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
  width: 85vw;
  min-width: 400px;
  min-height: 300px;
  border: black 1px solid;
  margin-top: 20px;
}

.map-box {
width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
