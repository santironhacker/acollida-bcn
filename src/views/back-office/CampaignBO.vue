<template>
  <div>
    <b-container fluid>

      <b-row>
        <b-col cols="8">
          <h2 class="title pt-3 pb-2">Campanya BO</h2>
        </b-col>
        <b-col cols="4" class="d-flex justify-content-center">
          <publish-campaign-badge-and-modal
            v-if="!loading"
            :campaign="campaign"
            @toggleIsPublished="campaign.isPublished = !campaign.isPublished"
          ></publish-campaign-badge-and-modal>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div>
            Benvingut al menú d'edició de la campanya. Aquí podràs editar totes les questions relatives a la campanya, així com visualitzar els busos i usuaris inscrits.
          </div>
        </b-col>
      </b-row>

      <div v-if="loading">
        Carregant...
      </div>
      
      <div v-else>
        <b-row class="mt-3 mb-3">
          <b-col>
            <div class="title">Detalls de la campanya</div>
            <div>
              Títol:
              {{ campaign.title }}
            </div>
            <div v-if="useMockData">
              Dates:
              del {{ campaign.startDate | formatDate }} al {{ campaign.endDate | formatDate }}
            </div>
            <div v-else>
              Dates:
              del {{ campaign.startDate.toDate() | formatDate }} al {{ campaign.endDate.toDate() | formatDate }}
            </div>
            <div>
              Estat de les subscripcions:
              <campaign-status :status="campaign.subscriptionsStatus"></campaign-status>
            </div>
            <div>
              Creada per:
              {{ campaign.createdBy }}
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-3 mb-3">
          <b-col>
            <div class="title">Detall per setmanes</div>
            <!-- CARD FOR EVERY WEEK ON THE CAMPAIGN -->
            <b-card
              v-for="(week, index) in campaign.weeks"
              :key="index"
              :item="week"
              no-body 
              class="mb-1"
              role="tablist"
            >
              <!-- CARD DISPLAYING ONE WAY INFO -->
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block href="#" v-b-toggle="week.id" variant="info">
                  Setmana del {{ week.startDate.toDate() | formatDate }} al {{ week.endDate.toDate() | formatDate }} 
                </b-button>
              </b-card-header>
              <b-collapse :id="week.id" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text v-if="week.oneWayBuses.length > 0">
                    Els busos d'anada son:
                    <ul>
                      <li 
                        v-for="(bus, index) in week.oneWayBuses"
                        :key="index"
                        :item="bus"
                      >
                        <strong>{{ bus.busLabel }}</strong> que marxa el {{ bus.oneWayDepartureDate.toDate() | formatDate }}
                      </li>
                    </ul>
                  </b-card-text>
                  <b-card-text v-else class="d-flex">
                    <div>
                      No existeixen busos relacionats amb aquesta setmana per al viatge d'anada.
                      Clica per relacionar un bus existent.
                    </div>
                    <b-button 
                      class="d-flex justify-content-center ml-2"
                      v-b-modal="week.startDate.toDate().toString()"
                    >
                      <font-awesome-icon
                          class=""
                          :icon="['fa', 'bus']"
                      />
                      <font-awesome-icon
                          class="ml-1"
                          :icon="['fa', 'plus']"
                      />
                    </b-button>
                  </b-card-text>
                </b-card-body>
              </b-collapse>

              <!-- MODAL TO CHOOSE ONE WAY BUSES -->
              <b-modal :id="week.startDate.toDate().toString()">
                  <template v-slot:modal-title>
                      Tria un bus de la llista per relacionarlo amb el viatge d'anada de la setmana del {{ week.startDate.toDate() | formatDate }} al {{ week.endDate.toDate() | formatDate }}:
                  </template>
                  <div class="d-block text-center">
                    <b-list-group>
                      <b-list-group-item 
                        v-for="(bus, index) in campaign.buses"
                        :key="index"
                        button
                        @click="activeBus = bus"
                        :disabled="bus.assignedOneWayWeek !== null"
                      >
                        <div>
                          <strong>{{ bus.busLabel }}</strong>
                          - Surt el {{ bus.oneWayDepartureDate.toDate() | formatDate }}
                        </div>
                      </b-list-group-item>
                      <b-list-group-item>
                        Witness Item
                      </b-list-group-item>
                    </b-list-group>
                  </div>
                  <template v-slot:modal-footer>
                      <div class="w-100">
                          <b-button
                              variant="success"
                              class="float-right"
                              @click="matchOneWayBusWithWeek(week, activeBus)"
                              :disabled="activeBus === null"
                          >
                              Confirma
                          </b-button>
                          <b-button
                              variant="danger"
                              class="float-right mr-2"
                              @click="$bvModal.hide(week.startDate.toDate().toString())"
                          >
                              Cancela
                          </b-button>
                      </div>
                  </template>
              </b-modal>

              <!-- CARD DISPLAYING RETURN INFO -->
              <!-- MODAL TO CHOOSE RETURN BUSES -->

            </b-card>
            
            <!-- <div>
              Títol:
              {{ campaign.title }}
            </div>
            <div>
              Dates:
              del {{ campaign.startDate | formatDate }} al {{ campaign.endDate | formatDate }}
            </div>
            <div>
              Estat de les subscripcions:
              <campaign-status :status="campaign.subscriptionsStatus"></campaign-status>
            </div>
            <div>
              Creada per:
              {{ campaign.createdBy }}
            </div> -->
          </b-col>
        </b-row>
      </div>

    </b-container>
  </div>
  
</template>

<script>
// import { auth } from '../../main';
/* import router from '../../router'; */
import { db } from '../../main';
import { useMockData } from '../../main';
import PublishCampaignBadgeAndModal from '@/components/PublishCampaignBadgeAndModal';
import CampaignStatus from '@/components/CampaignStatus';

export default {
  name: 'campaignBO',
  components: { PublishCampaignBadgeAndModal, CampaignStatus },
  data() {
    return {
        useMockData,
        campaign: {
          buses: [],
          weeks: []
        },
        loading: true,
        activeBus: null
    };
  },
  methods: {
    matchOneWayBusWithWeek: function(week, bus) {
      bus.assignedToWeek = true;
      week.oneWayBuses.push(bus.id);
      this.activeBus = null;
      console.log('week ', week);
      console.log('bus ', bus);
      this.$bvModal.hide(week.startDate.toDate().toString())
    }
  },
  mounted() {
    const self = this;
    if(!useMockData) {
      /* GET CAMPAIGN COLLECTION */
      db.collection('campaigns').limit(1).get()
        .then(snapshot => {
          console.log('Campaign is', snapshot)
          if(snapshot.empty) {
            console.log('No matching campaigns');
            return;
          } else {
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
              const idObject = { id: doc.id }
              const dataObject = doc.data();
              const toPushObject = Object.assign(dataObject, idObject);
              Object.assign(this.campaign, toPushObject);
              // console.log('Campaign is ', this.campaign);
            });

            /* GET WEEKS COLLECTION */
            db.collection('campaigns').doc(this.campaign.id).collection('weeks').get()
              .then(snapshot => {
                  console.log('Weeks', snapshot);
                  if(snapshot.empty) {
                    console.log('No matching weeks');
                    return;
                  } else {
                    snapshot.forEach(doc => {
                      console.log(doc.id, '=>', doc.data());
                      const idObject = { id: doc.id }
                      const dataObject = doc.data();
                      const toPushObject = Object.assign(dataObject, idObject);
                      // Object.assign(self.campaign, toPushObject);
                      this.campaign.weeks.push(toPushObject);
                    });

                    /* GET BUSES COLLECTION */
                    db.collection('campaigns').doc(this.campaign.id).collection('buses').get()
                      .then(snapshot => {
                          console.log('Buses', snapshot);
                          if(snapshot.empty) {
                            console.log('No matching buses');
                            return;
                          } else {
                            snapshot.forEach(doc => {
                              console.log(doc.id, '=>', doc.data());
                              const idObject = { id: doc.id }
                              const dataObject = doc.data();
                              const toPushObject = Object.assign(dataObject, idObject);
                              // Object.assign(self.campaign, toPushObject);
                              this.campaign.buses.push(toPushObject);
                            });
                            console.log('Final object is ', this.campaign);
                          }
                      })
                      .catch(err => {
                        console.log('Error getting buses', err);
                        this.errored = true;
                      })
                  }
              })
              .catch(err => {
                console.log('Error getting weeks', err);
                this.errored = true;
              })
            .finally(() => this.loading = false)

          }
        })
        .catch(err => {
          console.log('Error getting campaign', err);
          this.errored = true;
        })
        
    } else {
      this.campaign = {
        id: 'HftFwqBPbLmG70A1fjDf',
        buses: [
          {
            campaignId: 'HftFwqBPbLmG70A1fjDf',
            subscriptionsStatus: 'Inscripcions obertes',
            showCollapse: false,

            oneWayDepartureDate: new Date('2020-06-27T00:00:00'),
            oneWayDepartureTime: '',
            oneWayDeparturePlace: '',
            oneWayArrivalDate: null,
            oneWayArrivalTime: null,

            returnDepartureDate: new Date('2020-06-28T00:00:00'),
            returnDepartureTime: '',
            returnArrivalDate: null,
            returnArrivalTime: null,
            returnArrivalPlace: '',

            busLabel: 'Bus 1',
            availablePassengerSeats: null,
            driversNames: null,
            busBrand: null,
            busRegistrationForms: [],
            busRegistrationFormModel: null,
            isPublished: false
          },
          {
            campaignId: 'HftFwqBPbLmG70A1fjDf',
            subscriptionsStatus: 'Inscripcions obertes',
            showCollapse: false,

            oneWayDepartureDate: new Date('2020-07-04T00:00:00'),
            oneWayDepartureTime: '',
            oneWayDeparturePlace: '',
            oneWayArrivalDate: null,
            oneWayArrivalTime: null,

            returnDepartureDate: new Date('2020-07-05T00:00:00'),
            returnDepartureTime: '',
            returnArrivalDate: null,
            returnArrivalTime: null,
            returnArrivalPlace: '',

            busLabel: 'Bus 2',
            availablePassengerSeats: null,
            driversNames: null,
            busBrand: null,
            busRegistrationForms: [],
            busRegistrationFormModel: null,
            isPublished: false
          }
        ],
        createdBy: 'santi92.network@gmail.com',
        endDate: new Date('2020-09-06T23:59:59'),
        startDate: new Date('2020-06-27T00:00:00'),
        subscriptionsStatus: 'Inscripcions obertes',
        title: 'Estiu 2020',
        weeks: [
          {
            dates: [
              { 
                start: new Date('2020-06-27T00:00:00'),
                end: new Date('2020-07-05T23:59:59')
              }
            ],
            oneWayBuses: [],
            returnBuses: []
          }
        ],
        isPublished: false
      }
    }
  }
};
</script>

<style scoped>
  
</style>