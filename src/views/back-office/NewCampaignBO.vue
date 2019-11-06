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
                  $v.form.title.$error
                    ? 'text-danger'
                    : $v.form.title.$dirty
                    ? 'text-success'
                    : ''
                "
              >Títol: *</label>
              <input
                class="form-control"
                :class="
                  $v.form.title.$error
                    ? 'is-invalid '
                    : $v.form.title.$dirty
                    ? 'is-valid'
                    : ''
                "
                v-model.lazy.trim="$v.form.title.$model"
                type="text"
                id="title"
                placeholder="ex: Setmana Santa 2020"
              />
              <div
                class="help-block error mt-1"
                v-if="!$v.form.title.required && $v.form.title.$error"
              >Camp obligatori</div>
            </div>

            <div class="form-group mt-2">
                <label
                  for="campaignRangeDates"
                  class="control-label"
                  :class="
                    $v.form.campaignRangeDates.$error
                      ? 'text-danger'
                      : $v.form.campaignRangeDates.$dirty
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
                  v-model.lazy="$v.form.campaignRangeDates.$model"
                  mode="range"
                  id="campaignRangeDates"
                  :class="
                    $v.form.campaignRangeDates.$error
                      ? 'is-invalid '
                      : $v.form.campaignRangeDates.$dirty
                      ? 'is-valid'
                      : ''
                  "
                  type="date"
                />
                <div
                  class="help-block error mt-1"
                  v-if="
                    !$v.form.campaignRangeDates.required &&
                      $v.form.campaignRangeDates.$error
                  "
                >
                  Camp obligatori
                </div>
              </div>

            <div class="form-group mt-3">
              <label class="control-label" for="subscriptionsStatus">Estat de les inscripcions *</label>
              <select class="form-control" id="subscriptionsStatus" v-model="form.subscriptionsStatus">
                <option
                  v-for="option in subscriptionsStatusOptions"
                  :key="option"
                  style="font-family: Ubuntu, font-size: 10px, overflow: none"
                >{{ option }}</option>
              </select>
              <div
                  class="help-block error mt-1"
                  v-if="
                    !$v.form.subscriptionsStatus.required &&
                      $v.form.subscriptionsStatus.$error
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

            <b-button class="submit" id="back-color" @click.prevent="submit">
              <span>Crear campanya</span>
            </b-button>
            <div class="mt-2">
              <p v-if="errors" class="error">
                El formulari conté errors,
                <br />siusplau dona-li un cop d'ull.
              </p>
              <p v-else-if="formTouched && uiState === 'submit clicked'" class="text-warning">
                El formulari és buit,
                <br />siusplau omple el formulari per suscriure't!
              </p>
              <p
                v-else-if="uiState === 'form submitted'"
                class="text-success"
              >Formulari enviat correctament!</p>
              <p
                v-else-if="uiState === 'form returns error'"
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
  components: {},
  props: {},
  mixins: [validationMixin],
  data() {
    return {
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      formTouched: null,
      form: {
        title: null,
        campaignRangeDates: null,
        subscriptionsStatus: null,
      },
      subscriptionsStatusOptions: [
        'Pre-campanya (reserves)',
        'Inscripcions obertes',
        'Llista en espera',
        'Inscripcions tancades'
      ],
      calendarRows: 1
    };
  },
  validations: {
    form: {
      title: {
        required
      },
      campaignRangeDates: {
        required
      },
      subscriptionsStatus: {
        required
      }
    }
  },
  methods: {
    addRow: function() {
        this.calendarRows += 1;
    },
    submit: function() {
      this.formTouched = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = 'submit clicked';
      if (
        this.errors === false &&
        this.formTouched === false
      ) {
        const key = db
          .collection('campaigns')
          .doc()
          .set({
            title: this.form.title,
            surname: this.form.surname,
            email: this.form.email,
            subscriptionsStatus: this.form.subscriptionsStatus,
            accept: this.form.accept
          })
          .then(
            () => {
              this.uiState = 'form submitted';
              this.$v.form.$reset();
              const self = this;
              Object.keys(this.form).forEach(function(key) {
                self.form[key] = '';
              });
            },
            () => {
              this.uiState = 'form returns error';
            }
          );
      }
    }
  }
};
</script>

<style scoped></style>
