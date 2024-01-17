import { Category } from 'src/service/category-api';

export interface  MapItem {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
  opentime: string;
  closetime: string;
}

export class MapApi {
  public getMapItem(category: Category): MapItem[] {
    let mapItems: MapItem[] = [];

    if(category.categoryId === '0001') {
      mapItems = food;
    } else if(category.categoryId === '0002') {
      mapItems = hospital;
    } else if(category.categoryId === '0003') {
      mapItems = clothes;
    }
    return mapItems;
  }

}

// Test Map Data Start

const food: MapItem[] = [
  {
    'title': '고수닭갈비',
    'link': 'http://starfoods.modoo.at/',
    'category': '한식>닭갈비',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 818-2',
    'roadAddress': '서울특별시 강남구 강남대로96길 12',
    'mapx': '1270281716',
    'mapy': '374997744',
    'opentime': '11:00',
    'closetime': '21:00'
  },
  {
    'title': '맥도날드 강남2호점',
    'link': 'https://www.mcdonalds.co.kr/',
    'category': '양식>햄버거',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 822-2 메디타워 2층',
    'roadAddress': '서울특별시 강남구 테헤란로 107 메디타워 2층',
    'mapx': '1270287482',
    'mapy': '374986080',
    'opentime': '09:00',
    'closetime': '23:00'
  },
  {
    'title': '스타벅스 강남2점',
    'link': 'http://www.starbucks.co.kr/',
    'category': '카페,디저트>카페',
    'description': '',
    'telephone': '',
    'address': '서울특별시 서초구 서초동 1307-19 유빌딩 1,2층',
    'roadAddress': '서울특별시 서초구 서초대로77길 27',
    'mapx': '1270256109',
    'mapy': '375001309',
    'opentime': '11:00',
    'closetime': '22:00'
  },
  {
    'title': '감탄성신',
    'link': 'https://www.instagram.com/sungsin_01',
    'category': '일식>일식당',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 813-2 지상1층',
    'roadAddress': '서울특별시 강남구 강남대로106길 14 지상1층',
    'mapx': '1270267044',
    'mapy': '375029522',
    'opentime': '11:00',
    'closetime': '21:00'
  },
  {
    'title': '유니네 고깃간',
    'link': '',
    'category': '한식>육류,고기요리',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 817-2 1층',
    'roadAddress': '서울특별시 강남구 강남대로98길 12 1층',
    'mapx': '1270276997',
    'mapy': '375006717',
    'opentime': '09:00',
    'closetime': '21:00'
  },
  {
    'title': '장인닭갈비 강남점',
    'link': 'https://jangindak.co.kr/',
    'category': '한식>닭갈비',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 820-1',
    'roadAddress': '서울특별시 강남구 테헤란로1길 19',
    'mapx': '1270274938',
    'mapy': '374996548',
    'opentime': '10:00',
    'closetime': '24:00'
  },
  {
    'title': '파이브가이즈 강남',
    'link': 'https://www.instagram.com/fiveguys.korea',
    'category': '음식점>햄버거',
    'description': '',
    'telephone': '',
    'address': '서울특별시 서초구 서초동 1305-5 주류성빌딩 1층, 2층',
    'roadAddress': '서울특별시 서초구 강남대로 435 주류성빌딩 1층, 2층',
    'mapx': '1270255738',
    'mapy': '375011826',
    'opentime': '11:00',
    'closetime': '22:00'
  },
  {
    'title': '에이비카페',
    'link': 'http://www.abcafe.co.kr/',
    'category': '카페,디저트>카페',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 618-15',
    'roadAddress': '서울특별시 강남구 강남대로102길 32',
    'mapx': '1270278949',
    'mapy': '375029431',
    'opentime': '12:00',
    'closetime': '21:00'
  },
  {
    'title': '폴바셋 강남삼성타운점',
    'link': 'https://www.baristapaulbassett.co.kr/Index.pb',
    'category': '카페,디저트>카페',
    'description': '',
    'telephone': '',
    'address': '서울특별시 서초구 서초동 1327-1 홍우제2빌딩 1층',
    'roadAddress': '서울특별시 서초구 서초대로78길 22 홍우제2빌딩 1층',
    'mapx': '1270274093',
    'mapy': '374958967',
    'opentime': '14:00',
    'closetime': '23:00'
  },
  {
    'title': '남소관 우육도삭면',
    'link': '',
    'category': '중식>중식당',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 820-1',
    'roadAddress': '서울특별시 강남구 테헤란로1길 19',
    'mapx': '1270275677',
    'mapy': '374996443',
    'opentime': '08:00',
    'closetime': '21:00'
  },
  {
    'title': '미도인 강남',
    'link': '',
    'category': '일식>일식당',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 619-3 지상 2층',
    'roadAddress': '서울특별시 강남구 강남대로102길 16 지상 2층',
    'mapx': '1270271668',
    'mapy': '375021187',
    'opentime': '09:00',
    'closetime': '24:00'
  },
  {
    'title': '고베규카츠 서울 강남점',
    'link': 'https://www.instagram.com/kobekyu/',
    'category': '일식>돈가스',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 617-3 예촌빌딩',
    'roadAddress': '서울특별시 강남구 강남대로102길 29 예촌빌딩',
    'mapx': '1270275998',
    'mapy': '375028973',
    'opentime': '11:00',
    'closetime': '21:00'
  },
  {
    'title': '후추포인트',
    'link': 'https://www.instagram.com/whuchu.official',
    'category': '음식점>양식',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 812-3 1층',
    'roadAddress': '서울특별시 강남구 봉은사로6길 30 1층',
    'mapx': '1270273065',
    'mapy': '375030803',
    'opentime': '09:00',
    'closetime': '23:00'
  },
  {
    'title': '프리모바치오바치 강남점',
    'link': 'http://instagram.com/primo_baciobaci',
    'category': '양식>이탈리아음식',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 816-3 창림빌딩',
    'roadAddress': '서울특별시 강남구 강남대로 416 창림빌딩',
    'mapx': '1270270830',
    'mapy': '374998350',
    'opentime': '11:00',
    'closetime': '22:00'
  },
  {
    'title': '이자카야나무 <b>강남역</b>3호점',
    'link': 'https://app.catchtable.co.kr/ct/shop/IzakayanamuGangnamNo_3',
    'category': '음식점>술집>이자카야',
    'description': '',
    'telephone': '',
    'address': '서울특별시 서초구 서초동 1307-11 지하1층~지상4층',
    'roadAddress': '서울특별시 서초구 서초대로75길 23 지하1층~지상4층',
    'mapx': '1270253464',
    'mapy': '374997854',
    'opentime': '09:00',
    'closetime': '22:00'
  },
  {
    'title': '틴틴 강남점',
    'link': 'https://www.instagram.com/tteenteen_official',
    'category': '음식점>이탈리아음식',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 810-4',
    'roadAddress': '서울특별시 강남구 봉은사로2길 19',
    'mapx': '1270261977',
    'mapy': '375035726',
    'opentime': '10:00',
    'closetime': '24:00'
  },
  {
    'title': '갓덴스시 강남점',
    'link': 'https://www.instagram.com/gattensushi_kr/',
    'category': '일식>초밥,롤',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 822-4 강남제일빌딩 1F',
    'roadAddress': '서울특별시 강남구 테헤란로 109 강남제일빌딩 1F',
    'mapx': '1270290626',
    'mapy': '374987359',
    'opentime': '11:00',
    'closetime': '22:00'
  },
  {
    'title': '스시마이우 강남CGV점',
    'link': '',
    'category': '일식>초밥,롤',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 619-4 장연빌딩 1층 101호',
    'roadAddress': '서울특별시 강남구 강남대로102길 14 장연빌딩',
    'mapx': '1270270557',
    'mapy': '375019755',
    'opentime': '11:00',
    'closetime': '20:00'
  },
  {
    'title': '샤브쌈주머니 서울강남점',
    'link': '',
    'category': '일식>샤브샤브',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 819-4',
    'roadAddress': '서울특별시 강남구 테헤란로5길 11',
    'mapx': '1270292815',
    'mapy': '374995395',
    'opentime': '09:00',
    'closetime': '23:00'
  },
  {
    'title': '농민백암순대',
    'link': '',
    'category': '한식>순대,순댓국',
    'description': '',
    'telephone': '',
    'address': '서울특별시 강남구 역삼동 830-9',
    'roadAddress': '서울특별시 강남구 역삼로3길 20-4',
    'mapx': '1270314467',
    'mapy': '374949366',
    'opentime': '10:00',
    'closetime': '21:00'
  }
]
const hospital: MapItem[] = [
  {
    "title": "루미에의원",
    "link": "https://booking.naver.com/",
    "category": "병원,의원>피부과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 814-1 강남한웰빌딩",
    "roadAddress": "서울특별시 강남구 강남대로 446 강남한웰빌딩",
    "mapx": "1270258450",
    "mapy": "375024600",
    "opentime": "09:00",
    "closetime": "18:00"
  },
  {
    "title": "원데이치과의원 제1관",
    "link": "http://www.onedaydent.co.kr",
    "category": "병원,의원>치과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 813-4 W빌딩 3층",
    "roadAddress": "서울특별시 강남구 봉은사로2길 31 W빌딩 3층",
    "mapx": "1270265991",
    "mapy": "375025821",
    "opentime": "09:00",
    "closetime": "19:00"
  },
  {
    "title": "포에버의원 <b>강남역</b>점",
    "link": "https://www.4-ever.co.kr/",
    "category": "병원,의원>피부과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 814-1 강남한웰빌딩 10층",
    "roadAddress": "서울특별시 강남구 강남대로 446 강남한웰빌딩 10층",
    "mapx": "1270259587",
    "mapy": "375024061",
    "opentime": "09:00",
    "closetime": "19:00"
  },
  {
    "title": "쿠키성형외과의원",
    "link": "https://www.instagram.com/cooki_ps/",
    "category": "병원,의원>성형외과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 822-1 A타워 9층",
    "roadAddress": "서울특별시 강남구 테헤란로 105 A타워 9층",
    "mapx": "1270285461",
    "mapy": "374987178",
    "opentime": "09:00",
    "closetime": "20:00"
  },
  {
    "title": "옥스치과의원",
    "link": "http://www.oaksdental.kr/",
    "category": "병원,의원>치과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 822-1",
    "roadAddress": "서울특별시 강남구 테헤란로 105 A타워 7층",
    "mapx": "1270284818",
    "mapy": "374986450",
    "opentime": "10:00",
    "closetime": "18:00"
  },
  {
    "title": "VS라인의원 강남점",
    "link": "http://vsline2.co.kr",
    "category": "병원,의원>피부과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 822-2 메디타워 3층",
    "roadAddress": "서울특별시 강남구 테헤란로 107 메디타워 3층",
    "mapx": "1270287237",
    "mapy": "374986640",
    "opentime": "08:00",
    "closetime": "18:00"
  },
  {
    "title": "드레스성형외과의원",
    "link": "https://blog.naver.com/blackrosespa",
    "category": "병원,의원>성형외과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1304-2 영신빌딩 4, 5, 6층",
    "roadAddress": "서울특별시 서초구 강남대로 449 영신빌딩 4, 5, 6층",
    "mapx": "1270250456",
    "mapy": "375023744",
    "opentime": "09:00",
    "closetime": "19:00"
  },
  {
    "title": "젊어지는치과의원",
    "link": "http://www.dentalsalon.co.kr/",
    "category": "병원,의원>치과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1318-2 통영빌딩 5층, 9층, 12층",
    "roadAddress": "서울특별시 서초구 강남대로 405 통영빌딩 5층, 9층, 12층",
    "mapx": "1270265953",
    "mapy": "374987655",
    "opentime": "08:00",
    "closetime": "18:00"
  },
  {
    "title": "블리비의원 <b>강남역</b>점",
    "link": "http://www.velyb.kr",
    "category": "병원,의원>피부과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1306-2 한승빌딩 3층",
    "roadAddress": "서울특별시 서초구 강남대로 423 한승빌딩 3층",
    "mapx": "1270258452",
    "mapy": "375002585",
    "opentime": "09:00",
    "closetime": "17:00"
  },
  {
    "title": "뉴케이의원",
    "link": "https://www.newkclinic.com/",
    "category": "병원,의원>피부과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 815-2",
    "roadAddress": "서울특별시 강남구 강남대로 430 7층",
    "mapx": "1270266741",
    "mapy": "375009676",
    "opentime": "09:00",
    "closetime": "19:00"
  },
  {
    "title": "강남아이디안과의원",
    "link": "https://www.ideye.co.kr/",
    "category": "병원,의원>안과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1317-20 아라타워 3층",
    "roadAddress": "서울특별시 서초구 서초대로77길 3 아라타워 3층",
    "mapx": "1270264971",
    "mapy": "374980499",
    "opentime": "09:00",
    "closetime": "20:00"
  },
  {
    "title": "톡스미의원",
    "link": "http://toxme.co.kr/",
    "category": "병원,의원>성형외과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1317-20 아라타워 12층 톡스미의원",
    "roadAddress": "서울특별시 서초구 서초대로77길 3 아라타워 12층 톡스미의원",
    "mapx": "1270264971",
    "mapy": "374980499",
    "opentime": "10:00",
    "closetime": "18:00"
  },
  {
    "title": "글로리서울안과의원",
    "link": "http://cafe.naver.com/gloryseoul",
    "category": "병원,의원>안과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1320 글로리서울빌딩",
    "roadAddress": "서울특별시 서초구 서초대로74길 3 글로리서울빌딩",
    "mapx": "1270262314",
    "mapy": "374972231",
    "opentime": "08:00",
    "closetime": "18:00"
  },
  {
    "title": "온누리스마일안과의원",
    "link": "http://www.onnurismile.com/",
    "category": "병원,의원>안과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1317-20 아라타워 B2층",
    "roadAddress": "서울특별시 서초구 서초대로77길 3 아라타워 B2층",
    "mapx": "1270266007",
    "mapy": "374979622",
    "opentime": "10:00",
    "closetime": "18:00"
  },
  {
    "title": "제아치과의원",
    "link": "https://blog.naver.com/omfs123",
    "category": "병원,의원>치과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 816-3 창림빌딩 4층",
    "roadAddress": "서울특별시 강남구 강남대로 416 창림빌딩 4층",
    "mapx": "1270271619",
    "mapy": "374996548",
    "opentime": "09:00",
    "closetime": "19:00"
  },
  {
    "title": "미케이의원",
    "link": "http://mikclinic.com/",
    "category": "병원,의원>피부과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1306-4 4층",
    "roadAddress": "서울특별시 서초구 서초대로77길 24 4층",
    "mapx": "1270259826",
    "mapy": "375000226",
    "opentime": "09:00",
    "closetime": "17:00"
  },
  {
    "title": "하와유재활의학과의원",
    "link": "http://www.howareyou.clinic",
    "category": "병원,의원>정형외과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 822-4 강남제일빌딩 2층, 5층",
    "roadAddress": "서울특별시 강남구 테헤란로 109 강남제일빌딩 2층, 5층",
    "mapx": "1270290056",
    "mapy": "374988358",
    "opentime": "09:00",
    "closetime": "19:00"
  },
  {
    "title": "올림 피움 채움 올피채의원 강남점",
    "link": "https://gn.ollpichae.com/",
    "category": "병원,의원>피부과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1306-4 10층",
    "roadAddress": "서울특별시 서초구 서초대로77길 24 10층",
    "mapx": "1270260094",
    "mapy": "375000183",
    "opentime": "09:00",
    "closetime": "18:00"
  },
  {
    "title": "마음편한유외과의원",
    "link": "http://yourclinic.kr",
    "category": "병원,의원>외과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1329-4 우남빌딩 9층",
    "roadAddress": "서울특별시 서초구 강남대로 349 우남빌딩 9층",
    "mapx": "1270290794",
    "mapy": "374939737",
    "opentime": "09:00",
    "closetime": "19:00"
  },
  {
    "title": "원데이치과의원 제1관",
    "link": "http://www.onedaydent.co.kr",
    "category": "병원,의원>치과",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 813-4 W빌딩 3층",
    "roadAddress": "서울특별시 강남구 봉은사로2길 31 W빌딩 3층",
    "mapx": "1270265991",
    "mapy": "375025821",
    "opentime": "08:00",
    "closetime": "18:00"
  }
]
const clothes: MapItem[] = [
  {
    "title": "서양네트웍스",
    "link": "http://www.r-robot.co.kr/",
    "category": "쇼핑,유통>유아동복",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1327-1",
    "roadAddress": "서울특별시 서초구 서초대로78길 22",
    "mapx": "1270275715",
    "mapy": "374958166",
    "opentime": "11:00",
    "closetime": "23:00"
  },
  {
    "title": "이브니에",
    "link": "",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 821-1",
    "roadAddress": "서울특별시 강남구 테헤란로 101",
    "mapx": "1270280682",
    "mapy": "374986293",
    "opentime": "10:00",
    "closetime": "21:00"
  },
  {
    "title": "이너프",
    "link": "https://blog.naver.com/goodenuf",
    "category": "패션>여성의류",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 821-1 강남지하쇼핑센터 E-30호",
    "roadAddress": "서울특별시 강남구 테헤란로 101 강남지하쇼핑센터 E-30호",
    "mapx": "1270276338",
    "mapy": "374980342",
    "opentime": "09:00",
    "closetime": "22:00"
  },
  {
    "title": "아이보리",
    "link": "",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 821-1 강남역지하상가E-2호",
    "roadAddress": "서울특별시 강남구 테헤란로 101",
    "mapx": "1270280314",
    "mapy": "374986785",
    "opentime": "12:00",
    "closetime": "24:00"
  },
  {
    "title": "로즈라인",
    "link": "",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 821-1 강남지하B36",
    "roadAddress": "서울특별시 강남구 테헤란로 101",
    "mapx": "1270280314",
    "mapy": "374986785",
    "opentime": "10:00",
    "closetime": "21:00"
  },
  {
    "title": "브랜드마켓 강남점",
    "link": "",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 815-2",
    "roadAddress": "서울특별시 강남구 강남대로 430",
    "mapx": "1270266359",
    "mapy": "375009443",
    "opentime": "13:00",
    "closetime": "20:00"
  },
  {
    "title": "미니브랜드",
    "link": "",
    "category": "패션>보세의류",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 815-2 지하1층 미니브랜드",
    "roadAddress": "서울특별시 강남구 강남대로 430 지하1층 미니브랜드",
    "mapx": "1270266132",
    "mapy": "375008789",
    "opentime": "14:00",
    "closetime": "22:00"
  },
  {
    "title": "ClubU2 <b>강남역</b>지하쇼핑센터점",
    "link": "",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 858 강남역지하쇼핑센터 D-26,D-27",
    "roadAddress": "서울특별시 강남구 강남대로 396 강남역지하쇼핑센터 D-26,D-27",
    "mapx": "1270277034",
    "mapy": "374983957",
    "opentime": "09:00",
    "closetime": "22:00"
  },
  {
    "title": "베네통코리아",
    "link": "http://www.benettonkorea.co.kr/",
    "category": "패션>여성의류",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초2동 1321-11 14층,15층,16층",
    "roadAddress": "서울특별시 서초구 서초대로 398 14층,15층,16층",
    "mapx": "1270251327",
    "mapy": "374966508",
    "opentime": "09:00",
    "closetime": "20:00"
  },
  {
    "title": "F-SHOP2 <b>강남역</b>지하쇼핑센터점",
    "link": "",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 858 강남역지하쇼핑센터 남-5,남-6",
    "roadAddress": "서울특별시 서초구 강남대로 396 강남역지하쇼핑센터 남-5,남-6",
    "mapx": "1270277554",
    "mapy": "374976273",
    "opentime": "11:00",
    "closetime": "22:00"
  },
  {
    "title": "토마토 강남",
    "link": "",
    "category": "패션>보세의류",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1318-3",
    "roadAddress": "서울특별시 서초구 강남대로 405",
    "mapx": "1270266269",
    "mapy": "374987304",
    "opentime": "10:00",
    "closetime": "23:00"
  },
  {
    "title": "주나코",
    "link": "http://www.joonako.co.kr",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 619-3 5층",
    "roadAddress": "서울특별시 강남구 강남대로102길 16 5층",
    "mapx": "1270272009",
    "mapy": "375020885",
    "opentime": "11:00",
    "closetime": "22:00"
  },
  {
    "title": "스튜디오마치스",
    "link": "http://www.instagram.com/studio_machis",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1328-3 12층 1344호",
    "roadAddress": "서울특별시 서초구 강남대로 369 12층 1344호",
    "mapx": "1270282508",
    "mapy": "374957309",
    "opentime": "11:00",
    "closetime": "23:00"
  },
  {
    "title": "blessmybebe",
    "link": "http://www.blessmybebe.com",
    "category": "쇼핑,유통>유아동복",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1328-3",
    "roadAddress": "서울특별시 서초구 강남대로 369 12층",
    "mapx": "1270282508",
    "mapy": "374957309",
    "opentime": "12:00",
    "closetime": "20:00"
  },
  {
    "title": "시크릿라인몰",
    "link": "",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초동 1330-3",
    "roadAddress": "서울특별시 서초구 서초대로74길 45 ENDEAVOR TOWER",
    "mapx": "1270280328",
    "mapy": "374936574",
    "opentime": "09:00",
    "closetime": "21:00"
  },
  {
    "title": "조셉",
    "link": "",
    "category": "쇼핑,유통>패션",
    "description": "",
    "telephone": "",
    "address": "서울특별시 서초구 서초4동 1310-5",
    "roadAddress": "서울특별시 서초구 서운로 184",
    "mapx": "1270231824",
    "mapy": "374997906",
    "opentime": "12:00",
    "closetime": "21:00"
  },
  {
    "title": "초요주",
    "link": "",
    "category": "패션>여성의류",
    "description": "",
    "telephone": "",
    "address": "서울특별시 강남구 역삼동 630-4",
    "roadAddress": "서울특별시 강남구 논현로99길 37",
    "mapx": "1270323480",
    "mapy": "375029584",
    "opentime": "10:00",
    "closetime": "21:00"
  }
]


