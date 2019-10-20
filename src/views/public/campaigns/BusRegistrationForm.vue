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
                <select
                  class="form-control"
                  id="contactLanguage"
                  v-model="mainForm.contactLanguage"
                >
                  <option
                    v-for="(option, index) in mainForm.contactLanguageOptions"
                    :key="index"
                    style="font-family: Ubuntu, font-size: 10px, overflow: none"
                  >{{ option }}</option>
                </select>
              </div>

              <div class="form-group">
                <label
                  class="control-label"
                  :class="
                  $v.mainForm.name.$error
                    ? 'text-danger'
                    : $v.mainForm.name.$dirty
                    ? 'text-success'
                    : ''
                "
                >Nom: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.mainForm.name.$error
                    ? 'is-invalid '
                    : $v.mainForm.name.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.mainForm.name.$model"
                  type="text"
                  id="name"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.name.required && $v.mainForm.name.$error"
                >Camp obligatori</div>
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.name.minLength && $v.mainForm.name.$error"
                >
                  El nom ha de tenir com a mínim
                  {{ $v.mainForm.name.$params.minLength.min }} lletres.
                </div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="surname"
                  class="control-label"
                  :class="
                  $v.mainForm.surname.$error
                    ? 'text-danger'
                    : $v.mainForm.surname.$dirty
                    ? 'text-success'
                    : ''
                "
                >Cognoms: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.mainForm.surname.$error
                    ? 'is-invalid '
                    : $v.mainForm.surname.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.mainForm.surname.$model"
                  type="text"
                  id="surname"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.surname.required && $v.mainForm.surname.$error"
                >Camp obligatori</div>
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.surname.minLength && $v.mainForm.surname.$error"
                >
                  Els cognoms han de tenir com a mínim
                  {{ $v.mainForm.surname.$params.minLength.min }} lletres.
                </div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="dni"
                  class="control-label"
                  :class="
                  $v.mainForm.dni.$error
                    ? 'text-danger'
                    : $v.mainForm.dni.$dirty
                    ? 'text-success'
                    : ''
                "
                >DNI / NIE: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.mainForm.dni.$error
                    ? 'is-invalid '
                    : $v.mainForm.dni.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.mainForm.dni.$model"
                  type="text"
                  id="dni"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.dni.required && $v.mainForm.dni.$error"
                >Camp obligatori</div>
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.dni.mustBeNineLength && $v.mainForm.dni.$error"
                >El document d'identitat ha d'estar composat per 9 caràcters.</div>
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.dni.mustContainAtLeastOneLetter && $v.mainForm.dni.$error"
                >El document d'identitat ha de tenir com a mínim una lletra.</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="birthdate"
                  class="control-label"
                  :class="
                  $v.mainForm.birthdate.$error
                    ? 'text-danger'
                    : $v.mainForm.birthdate.$dirty
                    ? 'text-success'
                    : ''
                "
                >Data de naixement: *</label>
                <v-date-picker
                  v-model.lazy="$v.mainForm.birthdate.$model"
                  id="birthdate"
                  :class="
                  $v.mainForm.birthdate.$error
                    ? 'is-invalid '
                    : $v.mainForm.birthdate.$dirty
                    ? 'is-valid'
                    : ''
                "
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.birthdate.required && $v.mainForm.birthdate.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="email"
                  class="control-label"
                  :class="
                  $v.mainForm.email.$error
                    ? 'text-danger'
                    : $v.mainForm.email.$dirty
                    ? 'text-success'
                    : ''
                "
                >Correu electrònic: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.mainForm.email.$error
                    ? 'is-invalid '
                    : $v.mainForm.email.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.mainForm.email.$model"
                  type="email"
                  id="email"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.email.required && $v.mainForm.email.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="cellphone"
                  class="control-label"
                  :class="
                  $v.mainForm.cellphone.$error
                    ? 'text-danger'
                    : $v.mainForm.cellphone.$dirty
                    ? 'text-success'
                    : ''
                "
                >Mòbil: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.mainForm.cellphone.$error
                    ? 'is-invalid '
                    : $v.mainForm.cellphone.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.mainForm.cellphone.$model"
                  type="text"
                  id="cellphone"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.email.required && $v.mainForm.email.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="taizeRegistrationCode"
                  class="control-label"
                  :class="
                  $v.mainForm.taizeRegistrationCode.$error
                    ? 'text-danger'
                    : $v.mainForm.taizeRegistrationCode.$dirty
                    ? 'text-success'
                    : ''
                "
                >Codi d'inscripció a Taizé: *</label>
                <input
                  class="form-control"
                  :class="
                  $v.mainForm.taizeRegistrationCode.$error
                    ? 'is-invalid '
                    : $v.mainForm.taizeRegistrationCode.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.mainForm.taizeRegistrationCode.$model"
                  type="text"
                  id="taizeRegistrationCode"
                />
                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.taizeRegistrationCode.required && $v.mainForm.taizeRegistrationCode.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="selectedDepartureDate"
                  class="control-label"
                  :class="
                  $v.mainForm.selectedDepartureDate.$error
                    ? 'text-danger'
                    : $v.mainForm.selectedDepartureDate.$dirty
                    ? 'text-success'
                    : ''
                "
                >Trajecte d'anada:</label>
                <v-date-picker
                  v-model.lazy.trim="$v.mainForm.selectedDepartureDate.$model"
                  :available-dates="departureAvailableDates"
                  :class="
                    $v.mainForm.selectedDepartureDate.$error
                      ? 'is-invalid '
                      : $v.mainForm.selectedDepartureDate.$dirty
                      ? 'is-valid'
                      : ''
                  "
                  type="text"
                  id="selectedDepartureDate"
                ></v-date-picker>

                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.selectedDepartureDate.required && $v.mainForm.selectedDepartureDate.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="selectedReturnDate"
                  class="control-label"
                  :class="
                  $v.mainForm.selectedReturnDate.$error
                    ? 'text-danger'
                    : $v.mainForm.selectedReturnDate.$dirty
                    ? 'text-success'
                    : ''
                "
                >Trajecte de tornada:</label>
                <v-date-picker
                  :class="
                  $v.mainForm.selectedReturnDate.$error
                    ? 'is-invalid '
                    : $v.mainForm.selectedReturnDate.$dirty
                    ? 'is-valid'
                    : ''
                "
                  :available-dates="returnAvailableDates"
                  v-model.lazy.trim="$v.mainForm.selectedReturnDate.$model"
                  type="text"
                  id="selectedReturnDate"
                />

                <div
                  class="help-block error mt-1"
                  v-if="!$v.mainForm.selectedReturnDate.required && $v.mainForm.selectedReturnDate.$error"
                >Camp obligatori</div>
              </div>

              <div class="form-group mt-2">
                <label
                  for="remarks"
                  class="control-label"
                  :class="
                  $v.mainForm.remarks.$error
                    ? 'text-danger'
                    : $v.mainForm.remarks.$dirty
                    ? 'text-success'
                    : ''
                "
                >Observacions:</label>
                <input
                  class="form-control"
                  :class="
                  $v.mainForm.remarks.$error
                    ? 'is-invalid '
                    : $v.mainForm.remarks.$dirty
                    ? 'is-valid'
                    : ''
                "
                  v-model.lazy.trim="$v.mainForm.remarks.$model"
                  type="text"
                  id="remarks"
                />
              </div>

              <!-- PARTICIPANTS -->
              <div class="form-group mt-2">
                <label
                  for="participants"
                  class="control-label"
                  :class="
                  $v.mainForm.participants.$error
                    ? 'text-danger'
                    : $v.mainForm.participants.$dirty
                    ? 'text-success'
                    : ''
                "
                >Participants: *</label>
                <!-- PARTICIPANTS LIST -->
                <div>
                  <label
                    for="participantName"
                    class="control-label"
                    :class="
                  $v.participantForm.name.$error
                    ? 'text-danger'
                    : $v.participantForm.name.$dirty
                    ? 'text-success'
                    : ''
                "
                  >Nom: *</label>
                  <input
                    v-model.lazy.trim="$v.participantForm.name.$model"
                    class="form-control"
                    :class="
                    $v.participantForm.name.$error
                      ? 'is-invalid '
                      : $v.participantForm.name.$dirty
                      ? 'is-valid'
                      : ''
                  "
                    type="text"
                    id="participantName"
                  />
                  <label
                    for="participantSurname"
                    class="control-label"
                    :class="
                  $v.participantForm.surname.$error
                    ? 'text-danger'
                    : $v.participantForm.surname.$dirty
                    ? 'text-success'
                    : ''
                "
                  >Cognoms: *</label>
                  <input
                    v-model.lazy.trim="$v.participantForm.surname.$model"
                    class="form-control"
                    :class="
                    $v.participantForm.surname.$error
                      ? 'is-invalid '
                      : $v.participantForm.surname.$dirty
                      ? 'is-valid'
                      : ''
                  "
                    type="text"
                    id="participantSurname"
                  />
                </div>
                <div v-for="(item, index) in mainForm.participants" :key="index" class="form-group">
                  <ul>
                    <li>{{ item.name}} {{ item.surname }}</li>
                  </ul>
                </div>
                <!-- <div class="">
                  <b-button ></b-button>
                </div>-->
                <div class="mt-3 mb-3 text-center">
                  <b-button @click="addParticipant" class="p-2 default-button">
                    <span>Afegir participant</span>
                    <font-awesome-icon class="ml-2" :icon="['fa', 'user-plus']" />
                  </b-button>
                </div>
              </div>

              <b-button class="submit" id="back-color" @click.prevent="submit">
                <span>Envia</span>
              </b-button>
              <div class="mt-2">
                <p v-if="mainForm.errors" class="error">
                  El formulari conté errors,
                  <br />siusplau dona-li un cop d'ull.
                </p>
                <p
                  v-else-if="mainForm.formTouched && mainForm.uiState === 'submit clicked'"
                  class="text-warning"
                >
                  El formulari és buit,
                  <br />siusplau omple el formulari per suscriure't!
                </p>
                <p
                  v-else-if="mainForm.uiState === 'form submitted'"
                  class="text-success"
                >Formulari enviat correctament!</p>
                <p
                  v-else-if="mainForm.uiState === 'form returns error'"
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
      busRegistrationForm: {
        campaignTitle: 'Setmana Santa 2020'
      },
      mainForm: {
        // Submit controls
        uiState: 'submit not clicked',
        errors: false,
        empty: true,
        touched: null,
        // Form fields
        contactLanguage: 'Català',
        name: '',
        surname: '',
        dni: '',
        birthdate: '',
        email: '',
        cellphone: '',
        participants: [],
        // Form options
        contactLanguageOptions: ['Català', 'Castellà', 'Anglès']
      },
      participantForm: {
        // Submit controls
        uiState: 'submit not clicked',
        errors: false,
        empty: true,
        touched: null,
        // Form fields
        name: '',
        surname: ''
      },
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
    mainForm: {
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
      remarks: {},
      participants: {}
    },
    participantForm: {
      name: {},
      surname: {}
    }
  },
  methods: {
    addParticipant: function() {
      this.participantForm.touched = !this.$v.participantForm.$anyDirty;
      this.participantForm.errors = this.$v.participantForm.$anyError;
      this.participantForm.uiState = 'submit clicked';
      if (
        this.participantForm.errors === false &&
        this.participantForm.touched === false
      ) {
        console.log(this.participantForm);
        this.mainForm.participants.push({
          name: this.participantForm.name,
          surname: this.participantForm.surname
        });
        console.log('participants ', this.mainForm.participants);
        const self = this;
        Object.keys(this.participantForm).forEach(function(key) {
          self.participantForm[key] = '';
        });
        // this.$v.participantForm.$reset();
      }
    },
    submit: function() {
      this.mainForm.touched = !this.$v.mainForm.$anyDirty;
      this.mainForm.errors = this.$v.mainForm.$anyError;
      this.mainForm.uiState = 'submit clicked';
      if (this.mainForm.errors === false && this.mainForm.touched === false) {
        console.log(this.mainForm);
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