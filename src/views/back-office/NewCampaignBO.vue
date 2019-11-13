<template>
  <div>
    <b-container fluid style="max-width: 100%">
      <b-row>
        <b-col>
          <h2 class="pt-2 pb-2 title">
            Nova campanya            
          </h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          Completa el formulari per tal de crear una nova campanya. Els busos els podràs afegir més endavant.
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <hr>
          <form class="mt-2">
            <!-- GENERAL DETAILS SECTION -->
            <section>
                <div class="pt-2 pb-2 title">
                  Dades Generals (Bloc 1)
                </div>
                <div class="form-group">
                  <label
                    for="title"
                    class="control-label"
                    :class="
                      $v.campaignForm.title.$error
                        ? 'text-danger'
                        : $v.campaignForm.title.$dirty
                        ? 'text-success'
                        : ''
                    "
                  >Títol: *</label>
                  <input
                    class="form-control"
                    :class="
                      $v.campaignForm.title.$error
                        ? 'is-invalid '
                        : $v.campaignForm.title.$dirty
                        ? 'is-valid'
                        : ''
                    "
                    v-model.lazy.trim="$v.campaignForm.title.$model"
                    type="text"
                    id="title"
                    placeholder="ex: Setmana Santa 2020"
                  />
                  <div
                    class="help-block error mt-1"
                    v-if="!$v.campaignForm.title.required && $v.campaignForm.title.$error"
                  >Camp obligatori</div>
                </div>

                <div class="form-group mt-2">
                    <label
                      for="campaignRangeDates"
                      class="control-label"
                      :class="
                        $v.campaignForm.campaignRangeDates.$error
                          ? 'text-danger'
                          : $v.campaignForm.campaignRangeDates.$dirty
                          ? 'text-success'
                          : ''
                      "
                      >
                        <div>Dates de la campanya: *</div>
                        <div>
                            <em>
                                (Prendre com a referència el dia que marxa que marxa el primer bus y el dia en que retorna l'últim bus).
                            </em>
                        </div>
                    </label>
                    <v-date-picker
                      v-model.lazy="$v.campaignForm.campaignRangeDates.$model"
                      mode="range"
                      id="campaignRangeDates"
                      :class="
                        $v.campaignForm.campaignRangeDates.$error
                          ? 'is-invalid '
                          : $v.campaignForm.campaignRangeDates.$dirty
                          ? 'is-valid'
                          : ''
                      "
                      type="date"
                    />
                    <div
                      class="help-block error mt-1"
                      v-if="
                        !$v.campaignForm.campaignRangeDates.required &&
                          $v.campaignForm.campaignRangeDates.$error
                      "
                    >
                      Camp obligatori
                    </div>
                </div>

                <div class="form-group mt-3">
                  <label 
                    for="subscriptionsStatus"
                    class="control-label"
                    :class="
                      $v.campaignForm.subscriptionsStatus.$error
                        ? 'text-danger'
                        : $v.campaignForm.subscriptionsStatus.$dirty
                        ? 'text-success'
                        : ''
                    "
                  >Estat de les inscripcions *</label>
                  <select 
                    id="subscriptionsStatus"
                    class="form-control"
                    :class="
                      $v.campaignForm.subscriptionsStatus.$error
                        ? 'is-invalid '
                        : $v.campaignForm.subscriptionsStatus.$dirty
                        ? 'is-valid'
                        : ''
                    "
                    v-model="campaignForm.subscriptionsStatus"
                  >
                    <option
                      v-for="option in campaignForm.subscriptionsStatusOptions"
                      :key="option"
                      style="font-family: Ubuntu, font-size: 10px, overflow: none"
                    >{{ option }}</option>
                  </select>
                  <div
                      class="help-block error mt-1"
                      v-if="
                        !$v.campaignForm.subscriptionsStatus.required &&
                          $v.campaignForm.subscriptionsStatus.$error
                      "
                    >
                      Camp obligatori
                    </div>
                </div>
            </section>

            <div class="d-flex justify-content-center">
              <b-button
                  v-show="!displayWeeksSection"
                  class="default-button"
                  type="button"
                  :pressed.sync="displayWeeksSection"
              >
                Triar setmanes de viatge
              </b-button>
            </div>

            <!-- WEEK DETAILS SECTION -->
            <section v-show="displayWeeksSection">
              <hr>
              <div class="pt-2 pb-2 title">
                  Detall per setmanes (Bloc 2)
              </div>
              <div>
                  Ara anirem afegint progresivament les diferents dates disponibles per viatjar.
              </div>

              <!-- Weeks list -->
              <list-component 
                :show="campaignForm.weeks.length > 0"
                :list="campaignForm.weeks"
                :colorize-icon="displayCampaignResume"
                :colors="calendar.colors"
                @delete-week="deleteWeek"
              ></list-component>

              <!-- Adding weeks or switching to buses section -->
              <section
                v-if="!displayWeeksDatePicker"
              >
                <div
                  class="mt-2 d-flex justify-content-center"
                >
                    <b-button
                        class="default-button mr-3 d-flex align-items-center"
                        type="button"
                        :pressed.sync="displayWeeksDatePicker"
                    >
                        <span>
                            Afegir data de viatge
                        </span>
                        <font-awesome-icon
                            class="m-2"
                            :icon="['fa', 'calendar-plus']"
                        />
                    </b-button>
                    <b-button 
                        v-if="campaignForm.weeks.length > 0 && !displayBusesSection"
                        id="back-color"
                        class="d-flex align-items-center"
                        type="button"
                        :pressed.sync="displayBusesSection"
                    >
                        <span>
                            Ja he acabat amb les dates, vull afegir busos.
                        </span>
                        <font-awesome-icon
                            class="m-2"
                            :icon="['fa', 'bus']"
                        />
                    </b-button>
                </div>
              </section>

              <!-- Adding weeks form -->
              <div 
                  v-else
                  class="form-group mt-2"
              >
                  <label
                    for="weekRangeDates"
                    class="control-label"
                    :class="
                    $v.weeksForm.weekRangeDates.$error
                        ? 'text-danger'
                        : $v.weeksForm.weekRangeDates.$dirty
                        ? 'text-success'
                        : ''
                    "
                    >
                    <div v-if="campaignForm.weeks.length === 0">Dates de la primera setmana: *</div>
                    <div v-else>Dates de la setmana: *</div>
                    <div>
                        <em>
                            (Prendre com a referència el dia en que surt el bus i el dia en que arriba de tornada).
                        </em>
                    </div>
                  </label>
                  <v-date-picker
                      v-model.lazy="$v.weeksForm.weekRangeDates.$model"
                      mode="range"
                      id="weekRangeDates"
                      :class="
                      $v.weeksForm.weekRangeDates.$error
                          ? 'is-invalid '
                          : $v.weeksForm.weekRangeDates.$dirty
                          ? 'is-valid'
                          : ''
                      "
                      type="date"
                  />
                  <div
                      class="help-block error mt-1"
                      v-if="
                      !$v.weeksForm.weekRangeDates.required &&
                          $v.weeksForm.weekRangeDates.$error
                      "
                  >
                      Camp obligatori
                  </div>
                  <div class="submit mt-3 d-flex justify-content-center">
                      <b-button
                          class="cancel-button mr-3"
                          :pressed.sync="displayWeeksDatePicker"
                      >
                          <span>Cancelar</span>
                      </b-button>
                      <b-button 
                          class="validate-button"
                          @click.prevent="addWeek"
                          :pressed.sync="displayWeeksDatePicker"
                      >
                          <span>Valida les dates</span>
                      </b-button>
                  </div>

                  <div class="mt-2">
                    <p v-if="weeksForm.errors" class="error">
                      La setmana conté errors,
                      <br />siusplau dona-li un cop d'ull.
                    </p>
                    <p v-else-if="weeksForm.touched && weeksForm.uiState === 'submit clicked'" class="text-warning">
                      No hi ha dates seleccionades,
                      <br />siusplau omple el formulari!
                    </p>
                    <p
                      v-else-if="weeksForm.uiState === 'form returns error'"
                      class="text-warning"
                    >Error en processar la petició. Prova més tard.</p>
                  </div>
              </div>
            </section>


            <!-- BUSES DETAILS SECTION -->
            <section
              v-if="displayBusesSection"
            >
                <hr>
                <div class="pt-2 pb-2 title">
                    Detall dels busos (Bloc 3)
                </div>
                <div>
                    És moment de triar el nombre de busos i les seves dates de viatge.
                </div>

                <!-- Buses list -->
                <ol 
                  v-if="campaignForm.buses.length > 0"
                  class="form-group mt-3" 
                  style="padding-inline-start:1rem"
                >
                  <div>Busos afegits:</div>
                  <li
                      v-for="(item, index) in campaignForm.buses"
                      :key="index"
                      class="ml-3"
                  >
                    <div class="d-flex align-items-center">
                        <div>
                          <div>
                            <font-awesome-icon
                              :icon="['fa', 'bus']"
                              :class="displayCampaignResume ? calendar.colors[index] : ''"
                            />
                            <span>
                              {{ item.busName }}
                            </span>
                          </div>
                          <div>
                            <span>
                              Marxa el {{ item.startDate | formatDate }}
                            </span>
                            <font-awesome-icon
                                class="ml-2"
                                :class="
                                  item.oneWayAcceptsPassengers
                                  ? 'text-success'
                                  : 'text-danger'
                                "
                                :icon="['fa', 'users']"
                            />
                          </div>
                          <div>
                            <span>
                              Torna el {{ item.endDate | formatDate }}
                            </span>
                            <font-awesome-icon
                                class="ml-2"
                                :class="
                                  item.returnAcceptsPassengers
                                  ? 'text-success'
                                  : 'text-danger'
                                "
                                :icon="['fa', 'users']"
                            />
                          </div>
                        </div>
                          <font-awesome-icon
                              @click="deleteBus(index)"
                              class="text-danger ml-2"
                              :icon="['far', 'times-circle']"
                              size="lg"
                          />
                    </div>
                  </li>
                </ol>

                <!-- Adding more buses button or switching to resumé section -->
                <div
                  v-if="!displayBusDatePicker" 
                  class="mt-2 d-flex justify-content-center"
                >
                  <b-button
                      class="default-button mr-3 d-flex align-items-center"
                      type="button"
                      :pressed.sync="displayBusDatePicker"
                  >
                      <span>
                          Afegir bus
                      </span>
                      <font-awesome-icon
                          class="ml-2"
                          :icon="['fa', 'bus']"
                      />
                      <font-awesome-icon
                          class="ml-1"
                          :icon="['fa', 'plus']"
                      />
                  </b-button>
                  <b-button 
                      v-if="campaignForm.buses.length > 0 && !displayCampaignResume"
                      id="back-color"
                      @click="loadCalendarResume"
                  >
                      Llestos, mostra'm el resum final!
                  </b-button>
              </div>

              <!-- Buses Form -->
              <div v-else>
                <div class="form-group mt-3">
                  <label
                    for="busName"
                    class="control-label"
                    :class="
                      $v.busesForm.busName.$error
                        ? 'text-danger'
                        : $v.busesForm.busName.$dirty
                        ? 'text-success'
                        : ''
                    "
                  >Nom del bus: *</label>
                  <input
                    class="form-control"
                    :class="
                      $v.busesForm.busName.$error
                        ? 'is-invalid '
                        : $v.busesForm.busName.$dirty
                        ? 'is-valid'
                        : ''
                    "
                    v-model.lazy.trim="$v.busesForm.busName.$model"
                    type="text"
                    id="busName"
                    placeholder="ex: setmana del 4 al 11 de juliol"
                  />
                  <div
                    class="help-block error mt-1"
                    v-if="!$v.busesForm.busName.required && $v.busesForm.busName.$error"
                  >Camp obligatori</div>
                </div>

                <div class="form-group mt-2">
                    <label
                        for="busRangeDates"
                        class="control-label"
                        :class="
                        $v.busesForm.busRangeDates.$error
                            ? 'text-danger'
                            : $v.busesForm.busRangeDates.$dirty
                            ? 'text-success'
                            : ''
                        "
                        >
                            <div>Dates del bus: *</div>
                            <div>
                                <em>
                                    (Prendre com a referència el dia en que surt el bus i el dia en que arriba de tornada).
                                </em>
                            </div>
                        </label
                    >
                    <v-date-picker
                        v-model.lazy="$v.busesForm.busRangeDates.$model"
                        mode="range"
                        id="busRangeDates"
                        :class="
                        $v.busesForm.busRangeDates.$error
                            ? 'is-invalid '
                            : $v.busesForm.busRangeDates.$dirty
                            ? 'is-valid'
                            : ''
                        "
                        type="date"
                    />
                    <div
                        class="help-block error mt-1"
                        v-if="
                        !$v.busesForm.busRangeDates.required &&
                            $v.busesForm.busRangeDates.$error
                        "
                    >
                        Camp obligatori
                    </div>
                </div>

                <div class="form-group m-0">
                  <label
                    class="control-label mr-2"
                    for="oneWayAcceptsPassengers"
                  >
                    Accepta passatgers d'anada?
                  </label>
                  <input type="checkbox" id="oneWayAcceptsPassengers" v-model="$v.busesForm.oneWayAcceptsPassengers.$model" />
                </div>

                <div class="form-group mt-0" align-h="end">
                  <label
                    class="control-label mr-2"
                    for="returnAcceptsPassengers"              
                  >
                    Accepta passatgers de tornada?
                  </label>
                  <input type="checkbox" id="returnAcceptsPassengers" v-model="$v.busesForm.returnAcceptsPassengers.$model" />
                </div>

                <div class="submit mt-3 d-flex justify-content-center">
                    <b-button
                        class="cancel-button mr-3"
                        :pressed.sync="displayBusDatePicker"
                    >
                        <span>Cancelar</span>
                    </b-button>
                    <b-button 
                        class="validate-button"
                        @click.prevent="addBus"
                    >
                        <span>Valida el bus</span>
                    </b-button>
                </div>

                <div class="mt-2">
                  <p v-if="busesForm.errors" class="error">
                    El bus conté errors,
                    <br />siusplau dona-li un cop d'ull.
                  </p>
                  <p v-else-if="busesForm.touched && busesForm.uiState === 'submit clicked'" class="text-warning">
                    El bus no conté dades,
                    <br />siusplau omple el formulari!
                  </p>
                  <p
                    v-else-if="busesForm.uiState === 'form returns error'"
                    class="text-warning"
                  >Error en processar la petició. Prova més tard.</p>
                </div>

              </div>
            </section>

            <section v-if="displayCampaignResume">
              <!-- <div>
                Standard <strong>{{ campaignForm.weeks[0].startDate || "No date" }}</strong>
              </div>
              <div>
                JSON <strong>{{ campaignForm.weeks[0].startDate.toJSON() || "No date" }}</strong>
              </div> -->
              <!-- <div>
                attributes <strong>{{ attributes[0].dates[0].start || "No date" }}</strong>
              </div> -->
              <!-- <div>
                toISOstring from GMT <strong>{{ attributes[0].dates[0].start.toISOString() || "No date" }}</strong>
              </div> -->
              <!-- <div>
                toISOstring from JSON <strong>{{ campaignForm.weeks[0].startDate.toISOString() || "No date" }}</strong>
              </div> -->
              <div class="pt-4 pb-2 title">
                    Resum de la campanya (Bloc 4)
                </div>
                <div>
                    Verifica que la informació és correcte. En cas contrari, torna enrere per rectificar el contingut.
                </div>

                <v-calendar
                  is-expanded
                  :attributes="attributes"
                  :from-date="calendar.firstDate ? calendar.calendarFistDate : new Date()"
                  :rows="calendar.rows"
                />
            </section>

            <b-form-row v-show="displayCampaignResume">
              <b-col>
                <b-button
                    class="mt-2 default-button d-flex align-items-center"
                    type="button"
                    @click="loadCalendarResume"
                >
                    <span>
                        Refrescar resum de campanya
                    </span>
                    <font-awesome-icon
                        class="ml-2"
                        :icon="['fa', 'redo']"
                    />
                </b-button>
                <b-button v-if="displayCampaignResume" class="submit mt-2" id="back-color" @click.prevent="submit">
                  <span>Crear campanya</span>
                </b-button>
              </b-col>
            </b-form-row>

            <div class="mt-2">
              <p v-if="campaignForm.errors" class="error">
                El formulari conté errors,
                <br />siusplau dona-li un cop d'ull.
              </p>
              <p v-else-if="campaignForm.touched && campaignForm.uiState === 'submit clicked'" class="text-warning">
                El formulari és buit,
                <br />siusplau omple el formulari per suscriure't!
              </p>
              <!-- <p
                v-else-if="campaignForm.uiState === 'form submitted'"
                class="text-success"
              >Formulari enviat correctament!</p> -->
              <p
                v-else-if="campaignForm.uiState === 'form returns error'"
                class="text-warning"
              >Error en processar la petició. Prova més tard.</p>
            </div>

          </form>
        </b-col>
      </b-row>
    </b-container>

    <!-- <div class="alert alert-success alert-dismissible fade show" role="alert">
      With Bootstrap!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>-->
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { db } from '../../main';
import ListComponent from '@/components/ListComponent';

export default {
  name: 'newCampaignBO',
  props: {},
  components: {ListComponent},
  mixins: [validationMixin],
  data() {
    return {
        // Section displayers
        displayWeeksSection: false,
        displayWeeksDatePicker: false,
        displayBusesSection: false,
        displayBusDatePicker: false,
        displayCampaignResume: false,
        campaignForm: {
            // Submit controls
            uiState: 'submit not clicked',
            errors: false,
            empty: true,
            touched: null,
            // Form fields
            title: null,
            campaignRangeDates: null,
            subscriptionsStatus: null,
            weeks: [],
            buses: [],
            // Form options
            subscriptionsStatusOptions: [
                'Pre-campanya (reserves)',
                'Inscripcions obertes',
                'Llista d\'espera',
                'Inscripcions tancades'
            ],
      },
      weeksForm: {
          // Submit controls
            uiState: 'submit not clicked',
            errors: false,
            empty: true,
            touched: null,
        // Form fields
          weekRangeDates: {
              start: null,
              end: null
          }
      },
      busesForm: {
            // Submit controls
            uiState: 'submit not clicked',
            errors: false,
            empty: true,
            touched: null,
            // Form fields
            busName: null,
            busRangeDates: [],
            oneWayAcceptsPassengers: true,
            returnAcceptsPassengers: true
      },
      calendar: {
        attributes: [],
        colors: ['green', 'red', 'blue', 'yellow', 'teal', 'orange', 'gray', 'purple', 'pink', 'indigo' ],
        firstDate: null,
        rows: 1,
      }
    };
  },
  validations: {
    campaignForm: {
      title: {
        required
      },
      campaignRangeDates: {
        required
      },
      subscriptionsStatus: {
        required
      }
    },
    weeksForm: {
        weekRangeDates: {
            start: {required},
            end: {required}
        }
    },
    busesForm: {
        busName: {
            required
        },
        busRangeDates: {
          start: {required},
          end: {required}
        },
        oneWayAcceptsPassengers: {},
        returnAcceptsPassengers: {}
    }
  },
  methods: {
    /* addRow: function() {
        if(this.campaignForm.calendar.rows <= 12) {
            if(this.campaignForm.calendar.rows || this.campaignForm.calendar.rows === 0) {
                this.campaignForm.calendar.rows += 1;            
            }
        }
    },
    removeRow: function() {
        if(this.campaignForm.calendar.rows > 1) {
            if(this.campaignForm.calendar.rows || this.campaignForm.calendar.rows === 0) {
                this.campaignForm.calendar.rows -= 1;
            }
        }
    }, */
    addWeek: function() {
      this.weeksForm.touched = !this.$v.weeksForm.$anyDirty;
      this.weeksForm.errors = this.$v.weeksForm.$anyError;
      this.weeksForm.uiState = 'submit clicked';
      if (
        this.weeksForm.errors === false &&
        this.weeksForm.touched === false
      ) {
        this.campaignForm.weeks.push({
          startDate: this.$v.weeksForm.weekRangeDates.start.$model,
          endDate: this.$v.weeksForm.weekRangeDates.end.$model
        });
        const self = this;
        Object.keys(this.weeksForm).forEach(function(key) {
          self.weeksForm[key] = null;
        });
        this.$v.weeksForm.$reset();
      }
    },
    deleteWeek: function(index) {
      this.campaignForm.weeks.splice(index, 1);
    },
    addBus: function() {
      this.busesForm.touched = !this.$v.busesForm.$anyDirty;
      this.busesForm.errors = this.$v.busesForm.$anyError;
      this.busesForm.uiState = 'submit clicked';
      if (
        this.busesForm.errors === false &&
        this.busesForm.touched === false
      ) {
        this.campaignForm.buses.push({
          busName: this.$v.busesForm.busName.$model,
          startDate: this.$v.busesForm.busRangeDates.start.$model,
          endDate: this.$v.busesForm.busRangeDates.end.$model,
          oneWayAcceptsPassengers: this.$v.busesForm.oneWayAcceptsPassengers.$model,
          returnAcceptsPassengers: this.$v.busesForm.returnAcceptsPassengers.$model
        });
        const self = this;
        Object.keys(this.busesForm).forEach(function(key) {
          self.busesForm[key] = null;
        });
        this.$v.busesForm.$reset();
        this.displayBusDatePicker = !this.displayBusDatePicker;
      }
    },
    deleteBus: function(index) {
      this.campaignForm.buses.splice(index, 1);
    },
    loadCalendarResume: function() {
      this.displayCampaignResume = false;
      this.attributes = [];
      let dates = [];
      // Load weeks
      if(this.campaignForm.weeks) {
        let weekColorsIndex = 0;
        this.campaignForm.weeks.forEach(
          week => {
            // Push week
            this.attributes.push(
              {
                bar: this.calendar.colors[weekColorsIndex],
                dates: [
                  { 
                    start: new Date(week.startDate.getFullYear(), week.startDate.getMonth(), week.startDate.getDate()),
                    end: new Date(week.endDate.getFullYear(), week.endDate.getMonth(), week.endDate.getDate())
                  }
                ]
              }
            );
            // Push dates to general dates container variable
            dates.push(new Date(week.startDate.getFullYear(), week.startDate.getMonth(), week.startDate.getDate()));
            dates.push(new Date(week.endDate.getFullYear(), week.endDate.getMonth(), week.endDate.getDate()));
            // Update colors weekColorsIndex
            if(weekColorsIndex === 9) {
              weekColorsIndex = 0;
            } else {
                weekColorsIndex ++;
            };
          }
        )
      }
      // Load buses
      if(this.campaignForm.buses) {
        let busesColorsIndex = 0;
        this.campaignForm.buses.forEach(
          bus => {
            // Push bus
            this.attributes.push(
              {
                highlight: this.calendar.colors[busesColorsIndex],
                dates: [
                  {
                    start: new Date(bus.startDate.getFullYear(), bus.startDate.getMonth(), bus.startDate.getDate()),
                    end: new Date(bus.endDate.getFullYear(), bus.endDate.getMonth(), bus.endDate.getDate())
                  }
                ]
              }
            );
            // Push dates to general dates container variable
            dates.push(new Date(bus.startDate.getFullYear(), bus.startDate.getMonth(), bus.startDate.getDate()));
            dates.push(new Date(bus.endDate.getFullYear(), bus.endDate.getMonth(), bus.endDate.getDate()));
            // Update colors busesColorsIndex
            if(busesColorsIndex === 9) {
              busesColorsIndex = 0;
            } else {
                busesColorsIndex ++;
            };
          }
        );
      }
      // Organise dates cronologically
      dates.sort(function(a, b){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0; 
      });
      // Calculate rows to display on calendar
      let monthsCollection = [];
      dates.forEach(
        date => {
          if((monthsCollection.indexOf(date.getMonth() + '-' + date.getFullYear())) === -1) {
            monthsCollection.push(date.getMonth() + '-' + date.getFullYear());
          }
        }
      );
      this.calendar.rows = monthsCollection.length;
      // Calendar first date
      this.calendar.firstDate = dates[0];
      // Toggle campaign resume
      this.displayCampaignResume = !this.displayCampaignResume;
    },
    submit: function() {
      this.campaignForm.touched = !this.$v.campaignForm.$anyDirty;
      this.campaignForm.errors = this.$v.campaignForm.$anyError;
      this.campaignForm.uiState = 'submit clicked';
      if (
        this.campaignForm.errors === false &&
        this.campaignForm.touched === false
      ) {
        console.log('campaign created');
        console.log('rangeDates ', this.campaignForm.campaignRangeDates)
        const self = this;
        const key = db
          .collection('campaigns')
          .add({
            title: this.campaignForm.title,
            startDate: this.campaignForm.campaignRangeDates.start,
            endDate: this.campaignForm.campaignRangeDates.end,
            subscriptionsStatus: this.campaignForm.subscriptionsStatus,
            weeks: [],
            buses: [],
            createdBy: null
          })
          .then(
            ref => {
              console.log(ref);
              console.log('Added campaign with id ', ref.id);
              self.campaignForm.weeks
              // Reset campaignForm
              /* this.campaignForm.uiState = 'form submitted';
              this.$v.campaignForm.$reset();
              const self = this;
              Object.keys(this.campaignForm).forEach(function(key) {
                self.campaignForm[key] = '';
              }); */
            },
            () => {
              this.campaignForm.uiState = 'form returns error';
            }
          );
      }
    }
  }
};
</script>

<style scoped>
    .rounder {
        border: 0.1rem solid black;
        border-radius: 2rem;
        padding: 0.5rem
    }

    .green {
      color: green;
    }

    .red {
      color: red;
    }

    .blue {
      color: blue;
    }

    .yellow {
      color: yellow;
    }

    .teal {
      color: teal;
    }

    .orange {
      color: orange;
    }

    .gray {
      color: gray;
    }

    .purple {
      color: purple;
    }

    .pink {
      color: pink;
    }

    .indigo {
      color: indigo;
    }
</style>

