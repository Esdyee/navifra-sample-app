/* eslint-disable */

// Forces TS to apply `@quasar/app-vite` augmentations of `quasar` package
// Removing this would break `quasar/wrappers` imports as those typings are declared
//  into `@quasar/app-vite`
// As a side effect, since `@quasar/app-vite` reference `quasar` to augment it,
//  this declaration also apply `quasar` own
//  augmentations (eg. adds `$q` into Vue component context)
/// <reference types="@quasar/app-vite" />
interface Window {
  naver_id_login: any; // 'any' 대신 더 구체적인 타입을 사용할 수 있습니다.
  naver: {
    LoginWithNaverId: any;
  };
  naverMap: any;
  naverLogin: any;
  naverPay: any;
}
