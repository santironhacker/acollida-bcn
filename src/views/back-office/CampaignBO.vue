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
              <span v-if="campaign.startDate && campaign.endDate">
                del {{ campaign.startDate | formatDate }} al {{ campaign.endDate | formatDate }}
              </span>
            </div>
            <div v-else>
              Dates:
              <span v-if="campaign.startDate && campaign.endDate">
                del {{ campaign.startDate.toDate() | formatDate }} al {{ campaign.endDate.toDate() | formatDate }}
              </span>
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
              <!-- WEEK CARD HEADER -->
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block href="#" v-b-toggle="week.id" variant="info">
                  <span v-if="week.startDate && week.endDate">
                    Setmana del {{ week.startDate.toDate() | formatDate }} al {{ week.endDate.toDate() | formatDate }} 
                  </span>
                </b-button>
              </b-card-header>
              <!-- CARD DISPLAYING ONE WAY INFO -->
              <b-collapse :id="week.id" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text v-if="week.oneWayBuses.length > 0">
                    Els busos d'anada son:
                    <!-- <ul>
                      <li 
                        v-for="(busId, index) in week.oneWayBuses"
                        :key="index"
                        :item="busId"
                      >
                        <span v-if="campaign.buses[[busesMap[busId]]]">
                          <strong>{{ campaign.buses[busesMap[busId]].busLabel }}</strong>
                          que marxa el <span>{{ campaign.buses[busesMap[busId]].oneWayDepartureDate.toDate() | formatDate }}</span>
                        </span>
                      </li>
                    </ul> -->
                    <div
                      v-for="(busId, index) in week.oneWayBuses"
                      :key="index"
                      :item="busId"
                    >
                      <div v-if="campaign.buses[[busesMap[busId]]]">
                        <span
                          :aria-controls="busId"
                          :aria-expanded="campaign.buses[[busesMap[busId]]].showCollapse ? 'true' : 'false'"
                          v-on:click="campaign.buses[[busesMap[busId]]].showCollapse = !campaign.buses[[busesMap[busId]]].showCollapse"
                        >
                          <font-awesome-icon
                            v-if="campaign.buses[[busesMap[busId]]].showCollapse"
                            class="mr-1"
                            :icon="['fa', 'angle-double-down']"
                          />
                          <font-awesome-icon
                            v-else
                            class="mr-1"
                            :icon="['fa', 'location-arrow']"
                          />
                          <span id="orange-text-color" class="clickable">
                            <strong>
                              {{ campaign.buses[[busesMap[busId]]].busLabel }}
                              <!-- <span v-if="campaign.buses[[busesMap[busId]]].oneWayDepartureDate">
                                Marxa el {{ campaign.buses[[busesMap[busId]]].oneWayDepartureDate.toDate() | formatDate }}
                              </span> -->
                            </strong>
                          </span>
                          <b-collapse :id="busId" class="mt-2" v-model="campaign.buses[[busesMap[busId]]].showCollapse">
                            <bus-details
                              class="mb-3"
                              :bus="campaign.buses[[busesMap[busId]]]"
                              :isBO="true"
                              :display="'oneWay'"
                              
                            ></bus-details>
                              <!-- v-for="(busId, index) in week.oneWayBuses"
                              :key="index"
                              :busId="busId"
                              :buses="campaign.buses"
                              :busesMap="busesMap" -->
                          </b-collapse>
                        </span>
                      </div>
                    </div>
                  </b-card-text>
                  <b-card-text v-else class="d-flex">
                    <div>
                      No existeixen busos relacionats amb aquesta setmana per al <strong>viatge d'anada</strong>.
                      Clica per relacionar un bus existent.
                    </div>
                    <b-button 
                      class="d-flex justify-content-center ml-2"
                      v-b-modal="week.id + 'oneWay'"
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
              <b-modal :id="week.id + 'oneWay'">
                  <template v-slot:modal-title>
                      Tria un bus de la llista per relacionarlo amb el viatge d'anada de la setmana del 
                        <span v-if="week.startDate && week.endDate">
                          {{ week.startDate.toDate() | formatDate }} al {{ week.endDate.toDate() | formatDate }}
                        </span>
                      :
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
                          <span v-if="bus.oneWayDepartureDate">
                            - Surt el {{ bus.oneWayDepartureDate.toDate() | formatDate }}
                          </span>
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
                              @click="$bvModal.hide(week.id + 'oneWay')"
                          >
                              Cancela
                          </b-button>
                      </div>
                  </template>
              </b-modal>

              <hr>

              <!-- CARD DISPLAYING RETURN INFO -->
              <b-collapse :id="week.id" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text v-if="week.returnBuses.length > 0">
                    Els busos de tornada son:
                    <ul>
                      <li 
                        v-for="(busId, index) in week.returnBuses"
                        :key="index"
                        :item="busId"
                      >
                        <span v-if="campaign.buses[busesMap[busId]]">
                          <strong>{{ campaign.buses[busesMap[busId]].busLabel }}</strong> que marxa el 
                          <span>
                            {{ campaign.buses[busesMap[busId]].returnDepartureDate.toDate() | formatDate }}
                          </span>
                        </span>
                      </li>
                    </ul>
                  </b-card-text>
                  <b-card-text v-else class="d-flex">
                    <div>
                      No existeixen busos relacionats amb aquesta setmana per al <strong>viatge de tornanada</strong>.
                      Clica per relacionar un bus existent.
                    </div>
                    <b-button 
                      class="d-flex justify-content-center ml-2"
                      v-b-modal="week.id + 'return'"
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

              <!-- MODAL TO CHOOSE RETURN BUSES -->
              <b-modal :id="week.id + 'return'">
                  <template v-slot:modal-title>
                      Tria un bus de la llista per relacionarlo amb el viatge de tornada de la setmana del 
                      <span v-if="week.endDate && week.startDate">
                        {{ week.startDate.toDate() | formatDate }} al {{ week.endDate.toDate() | formatDate }}
                      </span>
                      :
                  </template>
                  <div class="d-block text-center">
                    <b-list-group>
                      <b-list-group-item 
                        v-for="(bus, index) in campaign.buses"
                        :key="index"
                        button
                        @click="activeBus = bus"
                        :disabled="bus.assignedReturnWeek !== null"
                      >
                        <div>
                          <strong>{{ bus.busLabel }}</strong>
                          <span v-if="bus.returnDepartureDate">
                            - Surt el {{ bus.returnDepartureDate.toDate() | formatDate }}
                          </span>
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
                              @click="matchReturnBusWithWeek(week, activeBus)"
                              :disabled="activeBus === null"
                          >
                              Confirma
                          </b-button>
                          <b-button
                              variant="danger"
                              class="float-right mr-2"
                              @click="$bvModal.hide(week.id + 'return')"
                          >
                              Cancela
                          </b-button>
                      </div>
                  </template>
              </b-modal>

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

      <b-button
        class="m-2" 
        id="back-color" 
        :disabled="!isChangesOnBusToWeekAssign"
        @click="submitChangesOnBusToWeekAssign"
      >
        Desa els canvis
      </b-button>

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
import BusDetails from '@/components/BusDetails';

export default {
  name: 'campaignBO',
  components: { PublishCampaignBadgeAndModal, CampaignStatus, BusDetails },
  data() {
    return {
        useMockData,
        campaign: {
          buses: [],
          weeks: [
            {
              oneWayBuses: [],
              returnBuses: []
            }
          ]
        },
        busesMap: {
          // key is a busId - Value is the index in the campaign.buses array
        },
        loading: true,
        activeBus: null,
        isChangesOnBusToWeekAssign: false,
        toastCount: 0
    };
  },
  methods: {
    matchOneWayBusWithWeek: function(week, bus) {
      bus.assignedOneWayWeek = week.id;
      week.oneWayBuses.push(bus.id);
      this.activeBus = null;
      this.$bvModal.hide(week.id + 'oneWay');
      this.isChangesOnBusToWeekAssign = true;
      week.isChanges = true;
      bus.isChanges = true;
    },
    matchReturnBusWithWeek: function(week, bus) {
      bus.assignedReturnWeek = week.id;
      week.returnBuses.push(bus.id);
      this.activeBus = null;
      this.$bvModal.hide(week.id + 'return');
      this.isChangesOnBusToWeekAssign = true;
      week.isChanges = true;
      week.isChanges = true;
    },
    submitChangesOnBusToWeekAssign: function() {
      if(this.isChangesOnBusToWeekAssign) {
        // Get a new write batch
        let batch = db.batch();
        // Iterate over weeks
        this.campaign.weeks.forEach(
          week => {
            // Iterate over oneWay and return buses to store bus id
            if(week && week.id && week.isChanges) {
              let weekOneWayBusesId = [];
              week.oneWayBuses.forEach(
                busId => weekOneWayBusesId.push(busId)
              )
              let weekReturnBusesId = [];
              week.returnBuses.forEach(
                busId => weekReturnBusesId.push(busId)
              )
              const weekRef = db.collection('campaigns').doc('KEDLiUVy7sGtpYsU2yA6').collection('weeks').doc(week.id);
              batch.update(weekRef, {
                oneWayBuses: weekOneWayBusesId,
                returnBuses: weekReturnBusesId,
                isChanges: false
              });
            }
          });
          // Iterate also over buses
          this.campaign.buses.forEach(
            bus => {
              if(bus && bus.id && bus.isChanges) {
                const busRef = db.collection('campaigns').doc('KEDLiUVy7sGtpYsU2yA6').collection('buses').doc(bus.id);
                if(bus.assignedOneWayWeek) {
                  batch.update(busRef, {
                    assignedOneWayWeek: bus.assignedOneWayWeek,
                    isChanges: false
                  });
                }
                if(bus.assignedReturnWeek) {
                  batch.update(busRef, {
                    assignedReturnWeek: bus.assignedReturnWeek,
                    isChanges: false
                  });
                }
              }
            }
          );
        // Commit the batch
        const self = this;
        return batch.commit()
          .then(function () {
              this.isChangesOnBusToWeekAssign = false;
              this.makeToast(
                'Les dades s\'han desat correctament',
                'Desant dades de campanya',
                true,
                'success'
              );
          })
          .catch((error)=>{
            console.error('Exception saving batch', error);
            this.makeToast(
              'Error en la petició, prova més tard', 
              'Desant dades de campanya',
              true,
              'danger'
            );
          });
      }
    },
    makeToast(message, title, append = true, variant = 'info') {
      this.toastCount++
      this.$bvToast.toast(message + `This is toast number ${this.toastCount}`, {
        title: 'BootstrapVue Toast',
        appendToast: append,
        variant: variant,
        autoHideDelay: 3000
      })
    }
  },
  mounted() {
    if(!useMockData) {
      /* GET CAMPAIGN COLLECTION */
      db.collection('campaigns').limit(1).get()
        .then(snapshot => {
          if(snapshot.empty) {
            console.warning('No matching campaigns');
            return;
          } else {
            snapshot.forEach(doc => {
              const idObject = { id: doc.id }
              const dataObject = doc.data();
              const toPushObject = Object.assign(dataObject, idObject);
              Object.assign(this.campaign, toPushObject);
            });

            /* GET WEEKS COLLECTION */
            db.collection('campaigns').doc(this.campaign.id).collection('weeks').orderBy('startDate', 'asc').get()
              .then(snapshot => {
                  if(snapshot.empty) {
                    console.warning('No matching weeks');
                    return;
                  } else {
                    snapshot.forEach(doc => {
                      const idObject = { id: doc.id }
                      const dataObject = doc.data();
                      const toPushObject = Object.assign(dataObject, idObject);
                      this.campaign.weeks.push(toPushObject);
                    });

                    /* GET BUSES COLLECTION */
                    db.collection('campaigns').doc(this.campaign.id).collection('buses').orderBy('oneWayDepartureDate', 'asc').get()
                      .then(snapshot => {
                          if(snapshot.empty) {
                            console.warning('No matching buses');
                            return;
                          } else {
                            snapshot.forEach(doc => {
                              // Save busesMap to link to weeks for the display
                              this.busesMap[doc.id] = this.campaign.buses.length;
                              // Save campaign buses
                              const idObject = { id: doc.id }
                              const dataObject = doc.data();
                              const toPushObject = Object.assign(dataObject, idObject);
                              this.campaign.buses.push(toPushObject);
                            });
                            console.log('Buses map', this.busesMap);
                            console.log('Final object is ', this.campaign);
                          }
                      })
                      .catch(err => {
                        console.error('Error getting buses', err);
                        this.errored = true;
                      })
                  }
              })
              .catch(err => {
                console.error('Error getting weeks', err);
                this.errored = true;
              })
            .finally(() => this.loading = false)
          }
        })
        .catch(err => {
          console.error('Error getting campaign', err);
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