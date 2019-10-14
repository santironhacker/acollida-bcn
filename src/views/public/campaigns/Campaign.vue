<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <div class="pt-2 pb-2">
            <span class="title">{{ campaign.title }} -</span>
            <campaign-status :status="campaign.status"></campaign-status>
          </div>
          <p>{{ campaign.introText }}</p>
          <p v-if="campaign.busText">{{ campaign.busText }}</p>
          <p v-else>{{ campaign.busesText }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <bus-details
            v-for="(item, index) in buses"
            :key="index"
            :bus="item"
          ></bus-details>
          <!-- :v-on:show="item.showCollapse = $event" -->
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <p>
            <strong>El preu d’anada i tornada és de 100 €.</strong> Si només
            desitgeu realitzar un dels trajectes (anada o tornada), el preu serà
            de <strong>60€</strong>. Però no us encanteu! Per aquells que
            s’inscriguin dins dels 15 dies previs a la sortida del bus el preu
            serà de <strong>110€ per anada i tornada</strong> i de
            <strong>65€ per un sol trajecte</strong>.
          </p>
          <p>
            <strong>
              Si esteu interessats en viatjar amb nosaltres, primer heu de fer
              la inscripció de l’estada (individual o de grup) a Taizé,
              <a
                id="orange-text-color"
                target="_blank"
                href="http://www.taize.fr/es_article5484.html"
                >a la web</a
              >.**
            </strong>
          </p>
          <p>
            <strong
              >**IMPORTANT: els adults (majors de 29 anys), us heu d’inscriure
              el més aviat possible, és a dir, ja!**</strong
            >
          </p>
          <p>
            <strong
              >Un cop feta la inscripció de l’estada a TAIZÉ, la part del viatge
              en autocar la gestionem nosaltres</strong
            >
            i heu de seguir les següents passes:
          </p>
          <ol class="pl-3">
            <li>Fer la inscripció de l’autocar als links de la setmana.</li>
            <li>
              Quan haguem rebut la vostra inscripció us confirmarem si hi ha
              plaça a l’autocar i us informarem de les passes següents per poder
              efectuar el pagament i fer efectiva la vostre inscripció.
            </li>
          </ol>
          <p>
            <strong>Si sou joves (fins a 29 anys)</strong>
            , podeu fer la inscripció al nostre autocar immediatament després
            d’haver fet la inscripció a la web de Taizé. Cal tenir en compte que
            en la inscripció online de l’autocar us demanarem el codi
            d’inscripció que us hagin enviat automàticament de Taizé al
            inscriure-us.
          </p>
          <p>
            <strong>Si sou adults (30 anys o més)</strong>
            , a banda de fer la inscripció a la web de Taizé, heu d’esperar a
            rebre el seu mail confirmant la vostra acollida per aquells dies (NO
            és el mail automàtic que rebeu a l’instant quan feu la inscripció de
            l’estada a Taizé, sinó un altre personalitzat que trigarà algunes
            hores o dies en arribar-vos). Una vegada tingueu la confirmació
            podeu fer la inscripció online de l’autocar i enviar-nos per correu
            electrònic una còpia d’aquesta confirmació.
          </p>
          <p>
            Si voleu o necessiteu més informació, podeu posar-vos en contacte
            amb nosaltres mitjançant la pestanya “contacte” d’aquesta web.
          </p>
          <p>Ens veiem aviat!</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BusDetails from '@/components/BusDetails.vue';
import CampaignStatus from '@/components/CampaignStatus.vue';
export default {
  name: 'campaign',
  components: { CampaignStatus, BusDetails },
  data() {
    return {
      campaign: {
        introText:
          'L’estiu ja s’acosta i com cada any organitzem busos per anar a gaudir d’una experiència increible a Taizé.',
        busText: 'El bus sortirà en la següent data:',
        busesText: 'Les dates en que hi haurà bus són les següents:',
        title: 'Setmana Santa 2020',
        startDate: '1586995200000',
        endDate: '1587340799000',
        status: 1
      },
      showCollapse: true,
      buses: [
        {
          status: '2',
          showCollapse: false,
          oneWayDepartureTime: '22h00',
          oneWayDeparturePlace: 'Estació de Busos Fabra i Puig (L1)',
          oneWayArrivalTime: '8h00',
          oneWayDepartureDate: '1586995200000',
          returnArrivalDate: '1587340799000',
          returnDepartureTime: '11h15',
          returnArrivalTime: '22h00',
          returnArrivalPlace: 'Estació de Busos Fabra i Puig (L1)'
        }
      ]
    };
  }
};
</script>

<style scoped>
.card {
  border: solid 1px black;
}
</style>
