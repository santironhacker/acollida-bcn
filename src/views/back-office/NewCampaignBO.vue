<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <h2 class="title pt-3 pb-2">Nova campanya</h2>
          <div>
            Completa el formulari per tal de crear una nova campanya. Més endavant podràs afegir els busos.
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
// import { db } from '../../main';
// import router from '../../router';

export default {
  name: 'newCampaignBO',
  data() {
    return {
      campaigns: null,
      loading: true,
      errored: false
    };
  },
  methods: {
    
  },
  mounted() {

  }
};
</script>

<style scoped>
  
</style>