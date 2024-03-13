<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Gangnam Search App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <FooterLayout v-if="$q.screen.xs || $q.screen.sm"/>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import { ionKey, ionLocationOutline, ionCard } from '@quasar/extras/ionicons-v6';
import FooterLayout from "layouts/FooterLayout.vue";


const essentialLinks: EssentialLinkProps[] = [
  {
    title: '내 위치',
    caption: '내 위치를 확인합니다.',
    icon: ionLocationOutline,
    link: '/'
  },
  {
    title: '로그인',
    caption: '로그인 페이지로 이동합니다.',
    icon: ionKey,
    link: '/login'
  },
  {
    title: '결제',
    caption: '결제 페이지로 이동합니다.',
    icon: ionCard,
    link: '/payment'
  }
];

const leftDrawerOpen = ref(false);

onMounted(() => {
  leftDrawerOpen.value = false;
});

function toggleLeftDrawer() {
  console.log('toggleLeftDrawer!!');
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
