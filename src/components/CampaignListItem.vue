<template>
  <div class="card mb-2">
    <div class="card-title pt-2 pl-2 mb-0">{{ item.title }}</div>
    <div class="pt-2 pl-2">Del {{ item.startDate }} al {{ item.endDate }}</div>
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
</style>