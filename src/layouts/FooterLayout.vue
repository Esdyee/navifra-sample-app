<template>
  <q-footer bordered class='bg-grey-3 text-primary'>
    <q-tabs no-caps active-color='primary' indicator-color='transparent' class='text-grey-8'>
      <q-tab name='images' @click='goMyLocation'>
        <q-icon :name='ionLocationOutline' size='42px'/>
        내 위치
      </q-tab>
      <q-tab name='login' @click='goLogin'>
        <q-icon :name='ionKey' size='42px'/>
        로그인
      </q-tab>
      <q-tab name='payments' @click="goPayment">
        <q-icon :name='ionCard' size='42px'/>
        결제
      </q-tab>
    </q-tabs>
  </q-footer>
</template>

<script setup lang="ts">

import { ionKey, ionLocationOutline, ionCard } from '@quasar/extras/ionicons-v6';
import { useRouter } from 'vue-router';
const router = useRouter();

const emit = defineEmits(['setMyLocation']);

function goMyLocation() {
  router.push('/');
}

function goLogin() {
  router.push('/login');
}

function goPayment() {
  router.push('/payment');
}

</script>

<style scoped>

</style>
