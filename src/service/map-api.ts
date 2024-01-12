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
    } else {
      mapItems = food;
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
