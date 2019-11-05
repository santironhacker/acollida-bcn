<template>
  <b-container fluid style="max-width: 100%">
    <b-row>
      <b-col>
        <div class="pt-2 pb-2 title">Tauler de control de l'acollida</div>
        <div class="mb-3">Benvingut {{ userEmail }}</div>        
      </b-col>
    </b-row>
    <b-row>
      <b-col>        
        <div class="pt-2 pb-2 title">Accions</div>        
        <div class="pb-2 pl-0 actions">
            <ol style="padding-inline-start:1rem">
              <li type="circle">                
                <router-link to="/bo/campaignsBO">Gestionar campanyes</router-link>
              </li>
              <li type="circle">
                <router-link to="/bo/homeBO">Veure el meu perfil d'usuari</router-link>                
              </li>
              <li type="circle">
                <router-link to="/bo/homeBO">Altres</router-link>              
              </li>
            </ol>
          </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="pt-2 pb-2 title">Avisos</div>
        <div>Cap avis en les últimes setmanes</div>        
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { auth } from '../../main';

export default {
  name: 'homeBO',
  data() {
    return {
      userEmail: auth.currentUser.email
    };
  }
};
</script>

<style scoped>
  .actions a {
    color: rgba(20, 19, 19, 0.842);
  }
</style>
