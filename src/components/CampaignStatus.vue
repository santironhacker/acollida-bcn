<template>
  <span>
    <span class="pt-1 pl-2 text-success" v-if="status === 1"
      >Places disponibles</span
    >
    <span class="pt-1 pl-2 text-info" v-if="status === 2"
      >Poques places disponibles</span
    >
    <span class="pt-1 pl-2 text-warning" v-if="status === 3"
      >Amb llista d'espera</span
    >
    <span class="pt-1 pl-2 text-danger" v-if="status === 4"
      >Inscripcions tancades</span
    >
  </span>
</template>

<script>
export default {
  name: 'campaign-status',
  props: ['status']
};
</script>
