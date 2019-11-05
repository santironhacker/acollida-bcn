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
              <div v-if="campaigns">
                {{ campaigns }}
                <!-- <campaign-list-item
                  v-for="(item, index) in openCampaigns"
                  :key="index"
                  :item="item"
                ></campaign-list-item> -->
              </div>
              <div v-else>
                <div>
                  No hi ha campanyes. Per començar, crea una nova campanya.
                </div> 
                <b-button class="mt-2" type="button" id="back-color" @click="addCampaign">
                  <span>Crea una nova campanya</span>
                </b-button>
              </div>
            </div>
          </section>
          
        </b-col>
      </b-row>

    </b-container>
  </div>
  
</template>

<script>
// import { auth } from '../../main';
import { db } from '../../main';
import router from '../../router';

export default {
  name: 'campaignsBO',
  data() {
    return {
      campaigns: null,
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
    db.collection('campaigns').orderBy('uid').limit(3).get()
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
      .finally(() => this.loading = false)
  }
};
</script>

<style scoped>
  
</style>