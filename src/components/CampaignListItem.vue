<template>
  <div class="card mb-2">

    <b-row no-gutters>
      <b-col :cols="isBO ? 8 : 12">
        <div>
          <router-link
            :to="isBO ? { name: 'campaignBO', params: { campaignId: item.id } } : { name: 'campaign', params: { campaignId: item.id } }"
            class="card-title pt-2 pl-2 mb-0"
            >{{ item.title }}</router-link
          >
          <div v-if="useMockData" class="pt-1 pl-2">
            Del {{ item.startDate | formatDate }} al {{ item.endDate | formatDate }}
          </div>
          <div v-else class="pt-1 pl-2">
            Del {{ item.startDate.toDate() | formatDate }} al {{ item.endDate.toDate() | formatDate }}
          </div>
          <campaign-status :v-if="!isBO" :status="item.status"></campaign-status>
        </div>
      </b-col>
      <b-col v-if="isBO" cols="4" class="d-flex justify-content-center">
          <publish-campaign-badge-and-modal
            :campaign="item"
            @toggleIsPublished="$emit('toggleIsPublished')"
          ></publish-campaign-badge-and-modal>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import CampaignStatus from '@/components/CampaignStatus.vue';
import PublishCampaignBadgeAndModal from '@/components/PublishCampaignBadgeAndModal';
import { useMockData } from '../main';

export default {
  name: 'campaign-list-item', 
  components: { CampaignStatus, PublishCampaignBadgeAndModal },
  props: ['item', 'isBO'],
  data() {
    return {
      useMockData
    };
  }
};
</script>

<style scoped>
.card {
  border: solid 1px black;
}

.card-title {
  font-weight: 650;
  color: #c0470b !important;
}

router-link :hover {
  cursor: pointer;
}
</style>
