<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <h2 class="title pt-3 pb-2">Campanya BO</h2>
          <h2 class="title pt-3 pb-2"> xxx </h2>
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col>
          <h4 class="title">Detalls de la campanya</h4>
          
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
  name: 'campaignBO',
  data() {
    return {
        
    };
  },
  methods: {
    
  },
  mounted() {
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
  }
};
</script>

<style scoped>
  
</style>