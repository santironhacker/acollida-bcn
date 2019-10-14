<template>
  <div class="card mb-2">
    <router-link
      :to="{ name: 'campaign', params: { campaignId: item.id } }"
      class="card-title pt-2 pl-2 mb-0"
      >{{ item.title }}</router-link
    >
    <div class="pt-1 pl-2">
      Del {{ item.startDate | formatDate }} al {{ item.endDate | formatDate }}
    </div>
    <campaign-status :status="item.status"></campaign-status>
  </div>
</template>

<script>
import CampaignStatus from '@/components/CampaignStatus.vue';
export default {
  name: 'campaign-list-item',
  components: { CampaignStatus },
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
