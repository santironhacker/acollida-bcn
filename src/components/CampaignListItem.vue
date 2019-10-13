<template>
  <div class="card mb-2">
    <router-link
      :to="{ name: 'campaign', params: { campaignId: item.id }}"
      class="card-title pt-2 pl-2 mb-0"
    >{{ item.title }}</router-link>
    <div class="pt-1 pl-2">Del {{ item.startDate | formatDate }} al {{ item.endDate | formatDate }}</div>
    <div class="pt-1 pl-2 text-success" v-if="item.status === 1">Places disponibles</div>
    <div class="pt-1 pl-2 text-info" v-if="item.status === 2">Poques places disponibles</div>
    <div class="pt-1 pl-2 text-warning" v-if="item.status === 3">Amb llista d'espera</div>
    <div class="pt-1 pl-2 text-danger" v-if="item.status === 4">Inscripcions tancades</div>
  </div>
</template>

<script>
import CampaignListItem from '@/components/CampaignListItem.vue';
export default {
  name: 'campaign-list-item',
  props: ['item'],
  data() {
    return {};
  }
};
</script>

<style scoped>
.card {
  border: solid 1px black;
}

.card-title {
  /* padding: 0.5rem; */
  font-weight: 650;
  color: #c0470b !important;
}

router-link :hover {
  cursor: pointer;
}
</style>