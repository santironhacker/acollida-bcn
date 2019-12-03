<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="8">
          <h2 class="title pt-3 pb-2">Campanya BO</h2>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div>
            Benvingut al menú d'edició de la campanya. Aquí podràs editar totes les questions relatives a la campanya, així com visualitzar els busos y usuaris inscrits.
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col>
          <div class="title">Detalls de la campanya</div>
          <div>
            Títol:
            {{ campaign.title }}
          </div>
          <div>
            Dates:
            del {{ campaign.startDate | formatDate }} al {{ campaign.endDate | formatDate }}
          </div>
          <div>
            Creada per:
            {{ campaign.createdBy }}
          </div>
          <!-- <h2 class="title pt-3 pb-2"></h2> -->
        </b-col>
      </b-row>

    </b-container>
  </div>
  
</template>

<script>
// import { auth } from '../../main';
import { db } from '../../main';
import router from '../../router';
import { useMockData } from '../../main';

export default {
  name: 'campaignBO',
  data() {
    return {
        campaign: {}
    };
  },
  methods: {
    
  },
  mounted() {
    if(!useMockData) {
      /* db.collection('campaigns').orderBy('uid').limit(3).get()
        .then(snapshot => {
          console.log('snapshot', snapshot)
          if(snapshot.empty) {
            console.log('No matching campaigns');
            return;
          } else {
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
            });
            this.campaigns = snapshot.docs;
          }
        })
        .catch(err => {
          console.log('Error getting documents', err);
          this.errored = true;
        })
        .finally(() => this.loading = false) */
    } else {
      this.campaign = {
        id: 'HftFwqBPbLmG70A1fjDf',
        buses: [],
        createdBy: 'santi92.network@gmail.com',
        endDate: new Date('2020-09-06T23:59:59'),
        startDate: new Date('2020-06-27T00:00:00'),
        subscriptionsStatus: 'Inscripcions obertes',
        title: 'Estiu 2020',
        weeks: [],
        isPublished: false
      }
    }
  }
};
</script>

<style scoped>
  
</style>