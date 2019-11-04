<template>
  <div>
    <header class="sticky">
      <AppHeader></AppHeader>
    </header>
    <router-view></router-view>
    <!-- <pre>{{ $data }}</pre> -->
    <!-- class="fixed-bottom" -->
    <footer>
      <AppFooter></AppFooter>
    </footer>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'layout',
  components: {
    AppHeader,
    AppFooter
  },
  data: function() {
    return {};
  }
};
</script>

<style>
</style>
