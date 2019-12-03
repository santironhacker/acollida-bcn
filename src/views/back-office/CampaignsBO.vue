<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <h2 class="title pt-3 pb-2">Campanyes BO</h2>
          <div>
            En aquesta secció podràs crear i editar campanyes, així com gestionar els busos de cada campanya. 
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col>
          <h4 class="title">Historial de campanyes</h4>
            
          <section v-if="errored">
            <p>
              No som capaços de retornar la informació en aquest moment.
              Siusplau, torneu a provar més tard.
            </p>
          </section>

          <section v-else>
            <div v-if="loading">Carregant ...</div>
            <div v-else>
              <div v-if="campaigns.length > 0">
                <campaign-list-item
                  v-for="(campaign, index) in campaigns"
                  :key="index"
                  :item="campaign"
                  :isBO="true"
                  @toggleIsPublished="campaign.isPublished = !campaign.isPublished"
                >
                </campaign-list-item>
              </div>
              <div v-else>
                No hi ha campanyes. Per començar, crea una nova campanya.
              </div>
                <b-button class="mt-2" type="button" id="back-color" @click="addCampaign">
                  <span>Crea una nova campanya</span>
                </b-button>
            </div>
          </section>
          
        </b-col>
      </b-row>

    </b-container>
  </div>
  
</template>

<script>
import { db } from '../../main';
import router from '../../router';
import CampaignListItem from '@/components/CampaignListItem';
import { useMockData } from '../../main';

export default {
  name: 'campaignsBO',
  components: {
    CampaignListItem
  },
  data() {
    return {
      campaigns: [],
      loading: true,
      errored: false
    };
  },
  methods: {
    addCampaign: function() {
      router.push('new-campaignBO');
    }
  },
  mounted() {
    const self = this;
    // DB Call
    if(!useMockData) {
      // .orderBy('uid')
      db.collection('campaigns').limit(1).get()
        .then(snapshot => {
          console.log('snapshot', snapshot)
          if(snapshot.empty) {
            console.log('No matching campaigns');
            return;
          } else {
            snapshot.docs.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
              const idObject = { id: doc.id }
              const dataObject = doc.data();
              const toPushObject = Object.assign(dataObject, idObject);
              self.campaigns.push(toPushObject);
            });
          }
        })
        .catch(err => {
          console.log('Error getting documents', err);
          this.errored = true;
        })
        .finally(() => this.loading = false)
    } else {
      // MOCK Call
      const mockCampaignsArray = [
        {
          id: 'HftFwqBPbLmG70A1fjDf',
          buses: [],
          createdBy: null,
          endDate: new Date('2020-09-06T00:00:00'),
          startDate: new Date('2020-07-27T00:00:00'),
          subscriptionsStatus: 'Inscripcions obertes',
          title: 'Estiu 2020',
          weeks: [],
          isPublished: true
        },
        {
          id: 'HvkCw71omWM52eHXPVIV',
          buses: [],
          createdBy: null,
          endDate: new Date('2020-04-12T00:00:00'),
          startDate: new Date('2020-04-08T00:00:00'),
          subscriptionsStatus: 'Llista d\'espera',
          title: 'Setmana Santa 2020',
          weeks: [],
          isPublished: false
        }
      ];
      mockCampaignsArray.forEach(
        item => {
          self.campaigns.push(item);
        }
      );
      this.loading = false;
    }
  }
};
</script>

<style scoped>
  
</style>