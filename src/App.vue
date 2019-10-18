<template>
  <div id="app">
    <header class="sticky-top">
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
  components: {
    AppHeader,
    AppFooter
  },
  data: function() {
    return {
      ex: 'youpi'
    };
  }
};
</script>

<style>
#app {
  font-family: Ubuntu, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: rgba(20, 19, 19, 0.842);
}

#back-color {
  background-color: #f38148;
}

#orange-text-color {
  color: #c0470b !important;
}

.default-button {
  color: #c0470b !important;
  background: white !important;
  font-weight: 600;
}

.title {
  font-weight: 750;
}

.text-center {
  text-align: center;
}

.error {
  color: red;
}
</style>
