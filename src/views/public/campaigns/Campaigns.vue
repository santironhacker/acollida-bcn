<template>
  <div class="about">
    <b-container fluid>
      <b-row>
        <b-col>
          <h2 class="title pt-3 pb-2">Campanyes</h2>
          <div>Les campanyes son periodes de l'any en que l'acollida posa en marxa un sistema de busos a l'atenció dels participants per anar a les encontres de Taizé sortint des de Barcelona.</div>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <h4 class="title">Campanyes en curs</h4>
          <campaign-list-item v-for="(item, index) in openCampaigns" :key="index" :item="item"></campaign-list-item>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <h4 class="title">Campanyes tancades</h4>
          <campaign-list-item v-for="(item, index) in closedCampaigns" :key="index" :item="item"></campaign-list-item>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CampaignListItem from '@/components/CampaignListItem.vue';
export default {
  name: 'campaigns',
  components: { CampaignListItem },
  props: {},
  data() {
    return {
      openCampaigns: [
        {
          title: 'Setmana Santa 2020',
          startDate: '16/04/2020',
          endDate: '16/04/2020'
        }
      ],
      closedCampaigns: [
        {
          title: 'Bus Núvol',
          startDate: '',
          endDate: ''
        },
        {
          title: 'Estiu 2019',
          startDate: '',
          endDate: ''
        },
        {
          title: 'Trobada Europea 2019 - Madrid',
          startDate: '',
          endDate: ''
        }
      ]
    };
  }
};
</script>
