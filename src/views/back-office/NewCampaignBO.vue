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
          <form class="mt-2">
          <div class="pt-2 pb-2 title">
            Dades Generals            
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
              <label class="control-label" for="subscriptionsStatus">Estat de les inscripcions *</label>
              <select class="form-control" id="subscriptionsStatus" v-model="campaignForm.subscriptionsStatus">
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

            <!-- <div class="form-group mt-3" align-h="end">
              <label
                class="control-label mr-2"
                for="accept"
                :class="
                  $v.form.accept.$dirty
                    ? $v.form.accept.$model
                      ? 'text-success'
                      : 'text-danger'
                    : ''
                "
              >Accepto les condicions</label>
              <input type="checkbox" id="accept" v-model="$v.form.accept.$model" />
            </div> -->

            <div class="pt-2 pb-2 title">
                Detall per setmanes
            </div>   

            <div>
                Ara anirem afegint progresivament les diferents dates disponibles per viatjar.
            </div>

            <ol 
                v-if="campaignForm.weeks.length > 0"
                class="form-group mt-3" 
                style="padding-inline-start:1rem"
            >                
                <div>Dates seleccionades:</div>
                <li
                    v-for="(item, index) in campaignForm.weeks"
                    :key="index"
                    class="ml-3"
                >
                <div class="d-flex align-items-center">
                    <span>Del {{ item.startDate | formatDate }}</span>
                    <span class="ml-1">al {{ item.endDate | formatDate }}</span
                    >
                    <font-awesome-icon
                        @click="deleteWeek(index)"
                        class="text-danger ml-2"
                        :icon="['far', 'times-circle']"
                    />
                </div>
                </li>
            </ol>

            <!-- <div class="mt-2">
                <label
                    for="participantBirthdate"
                    class="control-label"
                    :class="
                    $v.weeksForm.weekRangeDates.$error
                        ? 'text-danger'
                        : $v.weeksForm.weekRangeDates.$dirty
                        ? 'text-success'
                        : ''
                    "
                    >Data de naixement: *</label
                >
                <v-date-picker
                    v-model="weeksForm.weekRangeDates"
                    :class="
                    $v.weeksForm.weekRangeDates.$error
                        ? 'is-invalid '
                        : $v.weeksForm.weekRangeDates.$dirty
                        ? 'is-valid'
                        : ''
                    "
                    ref="participantBirthdate"
                    type="date"
                    id="participantBirthdate"
                ></v-date-picker>

                <div
                    class="help-block error mt-1"
                    v-if="
                    !$v.weeksForm.weekRangeDates.required &&
                        $v.weeksForm.weekRangeDates.$error
                    "
                >
                    Camp obligatori
                </div>
            </div> -->

            <div
                v-if="!displayWeeksDatePicker" 
                class="mt-2"
            >
                <b-button 
                    class="default-button"
                    type="button"
                    :pressed.sync="displayWeeksDatePicker"
                >
                    Afegir data de viatge
                </b-button>
            </div>

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
                    </label
                >
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
            </div>

            <div class="mt-2">
              <p v-if="campaignForm.errors" class="error">
                El formulari conté errors,
                <br />siusplau dona-li un cop d'ull.
              </p>
              <p v-else-if="campaignForm.formTouched && campaignForm.uiState === 'addWeek clicked'" class="text-warning">
                El formulari és buit,
                <br />siusplau omple el formulari per suscriure't!
              </p>
              <p
                v-else-if="campaignForm.uiState === 'form submitted'"
                class="text-success"
              >Formulari enviat correctament!</p>
              <p
                v-else-if="campaignForm.uiState === 'form returns error'"
                class="text-warning"
              >Error en processar la petició. Provi més tard.</p>
            </div>

            <!-- <v-calendar 
                :rows="form.calendar.rows"
            />
            <div class="d-flex align-items-center p-4">
                <span class="rounder">
                    <font-awesome-icon
                        @click="removeRow()"
                        class="m-2"
                        :icon="['fa', 'calendar-minus']"
                    />
                </span>
                <span class="ml-2 mr-2">
                    Nombre de calendaris: {{ form.calendar.rows }}
                </span>
                <span class="rounder">
                    <font-awesome-icon
                        @click="addRow()"
                        class="m-2"
                        :icon="['fa', 'calendar-plus']"
                    />
                </span>
            </div> -->
            

            <!-- <div class="form-group mt-2">
              <label
                for="email"
                class="control-label"
                :class="
                  $v.form.email.$error
                    ? 'text-danger'
                    : $v.form.email.$dirty
                    ? 'text-success'
                    : ''
                "
              >Correu electrònic: *</label>
              <input
                class="form-control"
                :class="
                  $v.form.email.$error
                    ? 'is-invalid '
                    : $v.form.email.$dirty
                    ? 'is-valid'
                    : ''
                "
                v-model.lazy.trim="$v.form.email.$model"
                type="email"
                id="email"
              />
              <div
                class="help-block error mt-1"
                v-if="!$v.form.email.required && $v.form.email.$error"
              >Camp obligatori</div>
            </div> -->

            <b-button class="submit mt-3" id="back-color" @click.prevent="submit">
              <span>Crear campanya</span>
            </b-button>
            <div class="mt-2">
              <p v-if="campaignForm.errors" class="error">
                El formulari conté errors,
                <br />siusplau dona-li un cop d'ull.
              </p>
              <p v-else-if="campaignForm.formTouched && campaignForm.uiState === 'submit clicked'" class="text-warning">
                El formulari és buit,
                <br />siusplau omple el formulari per suscriure't!
              </p>
              <p
                v-else-if="campaignForm.uiState === 'form submitted'"
                class="text-success"
              >Formulari enviat correctament!</p>
              <p
                v-else-if="campaignForm.uiState === 'form returns error'"
                class="text-warning"
              >Error en processar la petició. Provi més tard.</p>
            </div>
          </form>
        </b-col>
      </b-row>
    </b-container>

    <hr />
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

export default {
  name: 'newCampaignBO',
  props: {},
  mixins: [validationMixin],
  data() {
    return {
        campaignForm: {
            // Submit controls
            uiState: 'submit not clicked',
            errors: false,
            empty: true,
            formTouched: null,
            // Form fields
            title: null,
            campaignRangeDates: null,
            subscriptionsStatus: null,
            calendar: {
                rows: 1
            },
            weeks: [],
            // Form options
            subscriptionsStatusOptions: [
                'Pre-campanya (reserves)',
                'Inscripcions obertes',
                'Llista en espera',
                'Inscripcions tancades'
            ],
      },
      weeksForm: {
          // Submit controls
            uiState: 'submit not clicked',
            errors: false,
            empty: true,
            formTouched: null,
        
        // Form fields
          weekRangeDates: {
              start: null,
              end: null
          }
          // Form options
      },
      displayWeeksDatePicker: false
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
      },
      calendar: {
          required
      }
    },
    weeksForm: {
        weekRangeDates: {
            start: {required},
            end: {required}
        }
    }
  },
  methods: {
    addRow: function() {
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
    },
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
        // FINDING A WAY TO RESET THE VALUE
        /* this.weeksForm.weekRangeDates = null;
        const self = this;
        Object.keys(this.weeksForm.weekRangeDates).forEach(function(key) {
            self.weeksForm.weekRangeDates[key] = null;
        }); */
        /* this.weeksForm.weekRangeDates.start = null;
        this.weeksForm.weekRangeDates.end = null;
        this.weeksForm.weekRangeDates = null; */
        /* console.log(this.weeksForm);
        console.log('weeks ', this.campaignForm.weeks); */
        this.$v.weeksForm.$reset();
      }
    },
    deleteWeek: function(index) {
      this.campaignForm.weeks.splice(index, 1);
    },
    submit: function() {
      this.campaignForm.formTouched = !this.$v.campaignForm.$anyDirty;
      this.campaignForm.errors = this.$v.campaignForm.$anyError;
      this.campaignForm.uiState = 'submit clicked';
      if (
        this.campaignForm.errors === false &&
        this.campaignForm.formTouched === false
      ) {
        const key = db
          .collection('campaigns')
          .doc()
          .set({
            title: this.campaignForm.title,
            surname: this.campaignForm.surname,
            email: this.campaignForm.email,
            subscriptionsStatus: this.campaignForm.subscriptionsStatus,
            createdBy: null
          })
          .then(
            () => {
              this.campaignForm.uiState = 'form submitted';
              this.$v.campaignForm.$reset();
              const self = this;
              Object.keys(this.campaignForm).forEach(function(key) {
                self.campaignForm[key] = '';
              });
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
</style>
