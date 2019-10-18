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
                <!-- class="form-control"
                -->
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
      form: {
        contactLanguage: 'Català',
        name: '',
        surname: '',
        dni: '',
        birthdate: '',
        email: '',
        cellphone: ''
      },
      contactLanguageOptions: ['Català', 'Castellà', 'Anglès']
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(2)
      },
      surname: {
        required,
        minLength: minLength(2)
      },
      dni: {
        required,
        mustBeNineLength,
        mustContainAtLeastOneLetter
      },
      birthdate: {
        required
      },
      email: {
        required,
        email
      },
      cellphone: {
        isCellphone
      }
    }
  }
};
</script>