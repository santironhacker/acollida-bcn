<template>
  <b-container class="p-2" id="back-color">
    <b-row class="text-center">
      <b-col>
        <span>Segueix-nos a:</span>
        <a
          class="whited"
          target="_blank"
          href="https://www.facebook.com/AcollidaTaizeBarcelona/"
          rel="noopener noreferrer"
        >
          <font-awesome-icon class="ml-4" :icon="['fab', 'facebook-square']" />
        </a>
        <a
          class="whited"
          target="_blank"
          href="https://www.instagram.com/acollidabcn/"
          rel="noopener noreferrer"
        >
          <font-awesome-icon class="ml-4" :icon="['fab', 'instagram']" />
        </a>
        <a
          class="whited"
          target="_blank"
          href="https://twitter.com/AcollidaBCN"
          rel="noopener noreferrer"
        >
          <font-awesome-icon class="ml-4" :icon="['fab', 'twitter']" />
        </a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style scoped>
a :hover {
  cursor: pointer;
  color: black;
}

.whited {
  color: white;
}
</style>
