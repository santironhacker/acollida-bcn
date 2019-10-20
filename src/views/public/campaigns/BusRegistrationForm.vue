<template>
  <div>
    <b-container fluid style="max-width: 100%">
      <b-row>
        <b-col class="pt-2 pb-2 title">
          <div>Inscripció al bus de l'acollida</div>
          <div>{{ busRegistrationForm.campaignTitle }}</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="text-warning">
            En cas de CANCEL·LACIÓ un cop realitzat el pagament, només es retornaran els diners si hi ha causa justificada.
            Aquest formulari és només per inscriure's al bus per la campanya de {{ busRegistrationForm.campaignTitle }}.
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <div>Passes a seguir:</div>
          <ol style="padding-inline-start:1rem">
            <li>Realitzeu la inscripció a l'autocar (formulari) només quan ja tingueu feta la inscripció a Taizé.</li>
            <li>La primera persona inscrita de cada grup ha de ser la responsable de la comunicació entre el grup i l'equip d'Acollida Barcelona.</li>
            <li>Les persones adultes (de 35 anys o més) que no sigueu acompanyants responsables d'un grup de joves ens heu de reenviar per correu electrònic (acollidabcn@gmail.com) el missatge de confirmació de Taizé conforme teniu plaça. Aquest no és el missatge automàtic que es rep en el moment de fer la inscripció, i és una condició necessària per viatjar a l'autocar.</li>
          </ol>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <div>
            Si-us-plau, empleneu amb les vostres dades:
            <form action>
              <div class="form-group mt-3">
                <label
                  class="control-label"
                  for="contactLanguage"
                >Idioma de comunicació amb l'Acollida Barcelona</label>
                <select class="form-control" id="contactLanguage" v-model="form.contactLanguage">
                  <option
                    v-for="option in contactLanguageOptions"
                    v-bind:value="option"
                    style="font-family: Ubuntu, font-size: 10px, overflow: none"
                  >{{ option }}</option>
                </select>
              </div>

              <div class="form-group">
                <label
                  class="control-label"
                  :class="
                  $v.form.name.$error
                    ? 'text-danger'
                    : $v.form.name.$dirty
                    ? 'text-success'
                    : ''
                "
                >Nom: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.form.name.$error
                    ? 'is-invalid '
                    : $v.form.name.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.form.name.$model"
                  type="text"
                  id="name"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.name.required && $v.form.name.$error"
                >Camp obligatori</div>
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.name.minLength && $v.form.name.$error"
                >
                  El nom ha de tenir com a mínim
                  {{ $v.form.name.$params.minLength.min }} lletres.
                </div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="surname"
                  class="control-label"
                  :class="
                  $v.form.surname.$error
                    ? 'text-danger'
                    : $v.form.surname.$dirty
                    ? 'text-success'
                    : ''
                "
                >Cognoms: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.form.surname.$error
                    ? 'is-invalid '
                    : $v.form.surname.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.form.surname.$model"
                  type="text"
                  id="surname"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.surname.required && $v.form.surname.$error"
                >Camp obligatori</div>
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.surname.minLength && $v.form.surname.$error"
                >
                  Els cognoms han de tenir com a mínim
                  {{ $v.form.surname.$params.minLength.min }} lletres.
                </div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="dni"
                  class="control-label"
                  :class="
                  $v.form.dni.$error
                    ? 'text-danger'
                    : $v.form.dni.$dirty
                    ? 'text-success'
                    : ''
                "
                >DNI / NIE: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.form.dni.$error
                    ? 'is-invalid '
                    : $v.form.dni.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.form.dni.$model"
                  type="text"
                  id="dni"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.dni.required && $v.form.dni.$error"
                >Camp obligatori</div>
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.dni.mustBeNineLength && $v.form.dni.$error"
                >El document d'identitat ha d'estar composat per 9 caràcters.</div>
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.dni.mustContainAtLeastOneLetter && $v.form.dni.$error"
                >El document d'identitat ha de tenir com a mínim una lletra.</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="birthdate"
                  class="control-label"
                  :class="
                  $v.form.birthdate.$error
                    ? 'text-danger'
                    : $v.form.birthdate.$dirty
                    ? 'text-success'
                    : ''
                "
                >Data de naixement: *</label>
                <v-date-picker
                  v-model.lazy="$v.form.birthdate.$model"
                  id="birthdate"
                  :class="
                  $v.form.birthdate.$error
                    ? 'is-invalid '
                    : $v.form.birthdate.$dirty
                    ? 'is-valid'
                    : ''
                "
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.birthdate.required && $v.form.birthdate.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
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
              </div>

              <div class="form-group mt-2">
                <label
                  for="cellphone"
                  class="control-label"
                  :class="
                  $v.form.cellphone.$error
                    ? 'text-danger'
                    : $v.form.cellphone.$dirty
                    ? 'text-success'
                    : ''
                "
                >Mòbil: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.form.cellphone.$error
                    ? 'is-invalid '
                    : $v.form.cellphone.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.form.cellphone.$model"
                  type="text"
                  id="cellphone"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.email.required && $v.form.email.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="taizeRegistrationCode"
                  class="control-label"
                  :class="
                  $v.form.taizeRegistrationCode.$error
                    ? 'text-danger'
                    : $v.form.taizeRegistrationCode.$dirty
                    ? 'text-success'
                    : ''
                "
                >Codi d'inscripció a Taizé: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.form.taizeRegistrationCode.$error
                    ? 'is-invalid '
                    : $v.form.taizeRegistrationCode.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.form.taizeRegistrationCode.$model"
                  type="text"
                  id="taizeRegistrationCode"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.taizeRegistrationCode.required && $v.form.taizeRegistrationCode.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="selectedDepartureDate"
                  class="control-label"
                  :class="
                  $v.form.selectedDepartureDate.$error
                    ? 'text-danger'
                    : $v.form.selectedDepartureDate.$dirty
                    ? 'text-success'
                    : ''
                "
                >Trajecte d'anada:</label>
                <v-date-picker
                  v-model.lazy.trim="$v.form.selectedDepartureDate.$model"
                  :available-dates="departureAvailableDates"
                  :class="
                    $v.form.selectedDepartureDate.$error
                      ? 'is-invalid '
                      : $v.form.selectedDepartureDate.$dirty
                      ? 'is-valid'
                      : ''
                  "
                  type="text"
                  id="selectedDepartureDate"
                ></v-date-picker>

                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.selectedDepartureDate.required && $v.form.selectedDepartureDate.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="selectedReturnDate"
                  class="control-label"
                  :class="
                  $v.form.selectedReturnDate.$error
                    ? 'text-danger'
                    : $v.form.selectedReturnDate.$dirty
                    ? 'text-success'
                    : ''
                "
                >Trajecte de tornada:</label>
                <v-date-picker
                  :class="
                  $v.form.selectedReturnDate.$error
                    ? 'is-invalid '
                    : $v.form.selectedReturnDate.$dirty
                    ? 'is-valid'
                    : ''
                "
                  :available-dates="returnAvailableDates"
                  v-model.lazy.trim="$v.form.selectedReturnDate.$model"
                  type="text"
                  id="selectedReturnDate"
                />

                <div
                  class="help-block error mt-1"
                  v-if="!$v.form.selectedReturnDate.required && $v.form.selectedReturnDate.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="remarks"
                  class="control-label"
                  :class="
                  $v.form.remarks.$error
                    ? 'text-danger'
                    : $v.form.remarks.$dirty
                    ? 'text-success'
                    : ''
                "
                >Observacions:</label>
                <input
                  class="form-control"
                  :class="
                  $v.form.remarks.$error
                    ? 'is-invalid '
                    : $v.form.remarks.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.form.remarks.$model"
                  type="text"
                  id="remarks"
                />
              </div>

              <b-button class="submit" id="back-color" @click.prevent="submit">
                <span>Envia</span>
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
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

const mustBeNineLength = value => value.length === 9;
const mustContainAtLeastOneLetter = value =>
  value.match(/^[A-Za-z]+$/) ? true : false;
const isCellphone = value => (value.match(/\d/g) ? true : false);

export default {
  name: 'bus-registration-form',
  props: [],
  mixins: [validationMixin],
  data() {
    return {
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      formTouched: null,
      busRegistrationForm: {
        campaignTitle: 'Setmana Santa 2020'
      },
      form: {
        contactLanguage: 'Català',
        name: '',
        surname: '',
        dni: '',
        birthdate: '',
        email: '',
        cellphone: ''
      },
      contactLanguageOptions: ['Català', 'Castellà', 'Anglès'],
      attributes: [
        {
          /* key: 'today',
          highlight: true,
          dates: {
            start: new Date(2020, 3, 16), // Jan 1st, 2018
            end: new Date(202, 3, 20), // Jan 1st, 2019
            weekdays: [1, 7] // ...on Sundays and Saturdays
          } */
          key: 'today',
          highlight: true,
          dates: new Date()
        }
      ],
      departureAvailableDates: {
        // start: new Date(),
        start: new Date(
          'Mon Oct 22 2019 00:00:00 GMT+0200 (Central European Summer Time)'
        ),
        end: new Date(
          'Sat Oct 25 2019 00:00:00 GMT+0200 (Central European Summer Time)'
        )
        //end: null
      },
      returnAvailableDates: {
        start: new Date(
          'Mon Oct 22 2019 00:00:00 GMT+0200 (Central European Summer Time)'
        ),
        end: new Date(
          'Sat Oct 25 2019 00:00:00 GMT+0200 (Central European Summer Time)'
        )
      }
    };
  },
  validations: {
    form: {
      name: {
        /* required,
        minLength: minLength(2) */
      },
      surname: {
        /* required,
        minLength: minLength(2) */
      },
      dni: {
        /* required,
        mustBeNineLength,
        mustContainAtLeastOneLetter */
      },
      birthdate: {
        // required
      },
      email: {
        /* required,
        email */
      },
      cellphone: {
        // isCellphone
      },
      taizeRegistrationCode: {
        // required
      },
      selectedDepartureDate: {},
      selectedReturnDate: {},
      remarks: {}
    }
  },
  methods: {
    submit: function() {
      this.formTouched = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.formTouched === false) {
        console.log(this.form);
        //this is where you send the responses
        /* const key = db
          .ref()
          .child('newsletter')
          .push().key;
        db.ref()
          .child('newsletter')
          .child(key)
          .set({
            name: this.form.name,
            surname: this.form.surname,
            email: this.form.email,
            hearFromUs: this.form.hearFromUs,
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
          ); */
      }
    }
  }
};
</script>