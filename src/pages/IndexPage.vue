<template>
  <q-page class='items-center justify-evenly'>
    <q-tabs
      v-model='basicCategory'
      dense
      class='text-grey'
      active-color='primary'
      indicator-color='primary'
      align='justify'
    >
      <q-tab name='search' label='검색' />
      <q-tab v-for='category in categories'
             @click='changeMapItem(category)'
             :key='category.categoryId'
             :name='category.label'
             :label='category.label'
      />
    </q-tabs>

    <div class="button-box">
      <q-btn
        @click="setMyLocation">내 위치 설정</q-btn>
      <q-btn
        @click="setMyLocation">딥링크 테스트</q-btn>
    </div>
    <div class='input-box' v-if="basicCategory === 'search'">
      <q-input
        outlined v-model='searchText' label='검색어를 입력하세요'
        @keyup.enter='changeMapItem(selectedCategory, searchText)'
      />
    </div>

    <div class='button-box' v-if='false'>
      <button @click='setMyLocation'>setMyLocation</button>
      <button @click='setMarker'>setMarker</button>
      <button @click='getNaverDistance'>getNaverDistance</button>
      <button @click='sendDirectionRequest'>sendDirectionRequest</button>
      <button @click='deleteMarker'>deleteMarker</button>
    </div>

    <div class='map-box'>
      <div id='naver-map' class='naver-map'></div>
    </div>

    <div class='list-box'>
      <q-list v-if='mapItems.length' bordered separator>
        <q-expansion-item
          v-for='item in mapItems'
          :key='item.mapx+item.mapy'
          expand-separator
          :icon='ionLocationOutline'
          :label='item.title'
          :caption='item.address'
        >
          <q-card>
            <q-card-section>
              <p> 카테고리 : {{ item.category }}</p>
              <p v-if='item.link'>
                링크 : <a :href='item.link'>{{ item.link }}</a>
              </p>
              <p v-if='item.opentime'>
                영업시간 : {{ item.opentime }} ~ {{ item.closetime }}
              </p>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>


<!--    <pre>
      test : {{ String(myLocationMarker) }}
      mapItems: {{ mapItems }}
    </pre>-->

    <q-page-sticky position='bottom-right' :offset='[12, 12]'
      @click="termsVisible = !termsVisible"
    >
      <q-btn fab icon='help' color='primary' />
    </q-page-sticky>

  <TermsDialog :visible="termsVisible" />

  </q-page>

  <FooterLayout />


</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Category, CategoryApi } from '../service/category-api';
import { MapApi, MapItem } from 'src/service/map-api';
import imgUrl from '../assets/image/red-marker.png';
import { ionLocationOutline, ionKey } from '@quasar/extras/ionicons-v6';
import FooterLayout from 'layouts/FooterLayout.vue';
import TermsDialog from 'pages/TermsDialog.vue';

// call service 부분
const categoryApi = new CategoryApi();
const mapApi = new MapApi();
const router = useRouter();


// data 부분
const categories = ref(categoryApi.getCategories());
const basicCategory = ref('search');
const selectedCategory = ref<Category>(categories.value[0]);
const naverMap = ref();
const searchText = '';

// 약관 버튼
const termsVisible = ref(false);

// 지도 관련 데이터
let myLocation = ref<naver.maps.LatLng>();
let myLocationMarker = ref<naver.maps.Marker>();
let map: naver.maps.Map;
const mapItems = ref<MapItem[]>([]); // 카테고리의 map item 저장
const categoryMarkers = ref<naver.maps.Marker[]>([]); // 카테고리별 마커 저장
const polylines = ref<naver.maps.Polyline[]>([]); // polyline 이력 저장

watch(mapItems, (value) => {
  console.log('mapItems', value);
})

onMounted(() => {
  console.log('onMounted');
  // const naverMapTest: HTMLElement = document.getElementById('naver-map') as HTMLElement;
  getNaverMap();
})


// 좌표간 거리 가져오기
async function getNaverDistance(endpoint: naver.maps.LatLng,
                                mapItem: MapItem) {

  let start, end;

  if(!myLocation.value) {
    start = new naver.maps.LatLng(37.4979518, 127.027619);
  } else {
    start = myLocation.value;
  }

  if(!endpoint) {
    end = new naver.maps.LatLng(37.4986080, 127.0287482);
  } else {
    end = endpoint;
  }


  const projection = map.getProjection();
  const distance = projection.getDistance(
    start,
    end
  );

  await sendDirectionRequest(
    start,
    end,
    mapItem
  )

}


// 현재 내 위치 셋팅
function setMyLocation() {

  const lat = 37.4979518;
  const lng = 127.027619;

  const randomLat = Number((lat + (Math.random() * 0.003)).toFixed(7));
  const randomLng = Number((lng + (Math.random() * 0.003)).toFixed(7));

  // 마커 삭제
  deleteMarker();

  // mapItems 초기화
  mapItems.value = [];

  basicCategory.value = 'search';


  myLocation.value = new naver.maps.LatLng(
    randomLat,
    randomLng
  );

  map.setCenter(myLocation.value);
  setMarker(myLocation.value, null, true);
}

function goLogin() {
  router.push('/login');
}

// 마커 삭제
function deleteMarker() {
  // 기존 마커 삭제
  categoryMarkers.value.forEach((marker) => {
    marker.setMap(null);
  })

  // 마커 배열 비우기
  categoryMarkers.value = [];

}

// 네이버 지도 가져오기
function getNaverMap() {
  if (window.naver && window.naver.maps) {
    console.log('loaded naver map');
    map = new naver.maps.Map('naver-map', {
      center: new naver.maps.LatLng(37.4979518, 127.027619),
      zoom: 16,
      mapTypeId: naver.maps.MapTypeId.NORMAL
    });
  } else {
    console.log('not loaded naver map');
    // 초기 로딩시에 전역 naver가 없으면 1초 뒤에 다시 실행
    setTimeout(() => {
      getNaverMap();
    }, 1000);
  }
}

// 카테고리 클릭시 데이터 가져오기
async function changeMapItem(category: Category, searchText = '') {
  selectedCategory.value = category;

  if(category.categoryId.includes('0001')
    || category.categoryId.includes('0002')
    || category.categoryId.includes('0003')
  ) {
    mapItems.value = mapApi.getMapItem(category)
  } else {
    let query;
    // 1에서 5까지 랜덤으로 숫자 생성
    const randomNumber = Math.floor(Math.random() * 5) + 1;

    if(searchText) {
      query = '강남역' + searchText;
    } else {
      query = '강남역 ' + category.categoryName + randomNumber;
    }

    await mapApi.sendSearchRequest(query, mapItems)
      .then((res) => {
        mapItems.value = res.data.items.map((item: any) => {
          item.title = stripHtml(item.title)
          return item;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 마커 삭제
  deleteMarker();

  // mapx == lng, mapy == lat
  mapItems.value.forEach((item) => {

    const latLng = new naver.maps.LatLng(
      stringToLat(item.mapy),
      stringToLng(item.mapx)
    );

    // 마커 찍기
    setMarker(latLng, item);

  })
}


// 마커 생성
function setMarker(latLng: naver.maps.LatLng, item: MapItem | null = null,
                   myLocation = false) {

  let marker = new naver.maps.Marker({
    position: latLng,
    map: map,
    icon: myLocation ? {
      url: imgUrl, //아이콘 경로
      size: new naver.maps.Size(52, 52),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(25, 26)
    } : ''
  });

  if(myLocation) { // 내 위치 마커
    if(myLocationMarker.value) {
      myLocationMarker.value.setMap(null);
    }
    myLocationMarker.value = marker;

  } else { // 카테고리 마커

    // 카테고리 마커 배열에 쌓기
    categoryMarkers.value.push(marker);

    // 카테고리 마커 클릭 이벤트
    naver.maps.Event.addListener(marker, 'click', function() {
      console.log('click marker');

      if(!myLocationMarker.value) {
        alert('내 위치를 먼저 설정해주세요.');
        return;
      }

      if(item) {
        getNaverDistance(latLng, item);
      }
    });
  }

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

// API에서 html로 오는 부분 제거
function stripHtml(html: string) {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}


// 경로 검색 요청
function sendDirectionRequest(
  startLngLat: naver.maps.LatLng,
  endLngLat: naver.maps.LatLng,
  mapItem: MapItem
) {

  // API에 보낼 파라미터 셋팅
  const startLng = startLngLat.lng().toString();
  const startLat = startLngLat.lat().toString();
  const endLng = endLngLat.lng().toString();
  const endLat = endLngLat.lat().toString();

  return mapApi.sendDirectionRequest(
    startLng,
    startLat,
    endLng,
    endLat
  )
    .then((res) => {

      let startLatLng = new naver.maps.LatLng(Number(startLat), Number(startLng));
      let previousLatLng: naver.maps.LatLng;
      let nextLatLng: naver.maps.LatLng;
      let finalLatLng;

      // polyline 전체 삭제
      polylines.value.forEach((polyline) => {
        polyline.setMap(null);
      })


      // 경로 검색 결과마다 polyline 생성
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

      const distance = res.data.route.trafast[0].summary.distance;
      const speed = res.data.route.trafast[0].section[0].speed

      // InfoWindow(결과안내모달) 열기

      let opentimeString;

      if(mapItem.opentime) {
        opentimeString = `<p>영업시간 : ${mapItem.opentime} ~ ${mapItem.closetime}</p>`;
      } else {
        opentimeString = '';
      }

      setInfoWindow(
        `
          <div class='info-window' style='padding: 10px'>
            <p>${mapItem.title}</p>
            ${opentimeString}
            <p>거리: ${distance}(M)</p>
            <p>속도: ${speed}(km/h)</p>
          </div>
          `
      ).open(map, finalLatLng);
    })
    .catch((err) => {
      console.log(err);
    })

}

</script>

<style>
#naver-map {
  width: 85vw;
  height: 50vh;
  min-width: 400px;
  min-height: 300px;
  border: black 1px solid;
  margin-top: 20px;
}

.button-box {
  width: 85vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0 auto;
}

.q-btn {
  flex: 1;
}

.input-box {
  width: 100%;
  /*background-color: yellow;*/
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.input-box .q-input {
  width: 85vw;
}

.map-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-box {
  width: 100%;
  height: 100%;
  /*background-color: yellow;*/
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.list-box .q-list {
  width: 85vw;
  background-color: #f5f5f5;
  margin-bottom: 20px;
}

.list-box .q-card p {
  font-family: Arial, sans-serif;
  margin-bottom: 3px;
  color: #333;
}

.list-box .q-card a {
  color: #0066cc;
  text-decoration: none;
}

.list-box .q-card a:hover {
  text-decoration: underline;
  color: #0056b3;
}

.info-window p {
  margin: 0;
}
</style>
