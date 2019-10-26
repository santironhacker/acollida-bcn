<template>
  <div>
    <b-container fluid style="max-width: 100%">
      <b-row>
        <b-col>
          <div class="pt-2 pb-2 title">Punt de trobada entre Taizé i Barcelona</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-img
            :src="require('../../assets/img/home-altar.jpeg')"
            fluid
            alt="Altar Taizé"
            style="max-width: 100%"
          ></b-img>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="pt-2 pb-2 pl-0">
            <ol style="padding-inline-start:1rem">
              <li type="circle">
                Informa't de les nostres campanyes per viatjar acompanyat fins a
                Taizé.
              </li>
              <li type="circle">
                Assabenta't de les pregàries celebrades a l'area metropolitana
                de Barcelona.
              </li>
              <li type="circle">
                Escriu-nos per conèixer més sobre la comunitat i la rebuda que
                fan als joves.
              </li>
            </ol>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="pt-2 pb-2 title">
            Rep les últimes novetats
            <font-awesome-icon class icon="bullhorn" />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          Vols saber quan marxa el proper bus a Taizé? Subscriu-te al butlleti i
          rebràs els avisos d'inici de campanya.
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <form class="mt-2">
            <div class="form-group">
              <label
                for="name"
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
                {{ $v.form.name.$params.minLength.min }} lletres.
              </div>
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

            <!-- <div>
              <input class="form-control" type="radio" id="yes" value="Si" v-model="form.radio" />
              <label for="yes">Si</label>
              <br />
              <input class="form-control" type="radio" id="no" value="No" v-model="form.radio" />
              <label for="no">No</label>
            </div>-->

            <div class="form-group mt-3">
              <label class="control-label" for="hearFromUs">Com ens has conegut?</label>
              <select class="form-control" id="hearFromUs" v-model="form.hearFromUs">
                <option
                  v-for="option in hearFromUsOptions"
                  :key="option"
                  style="font-family: Ubuntu, font-size: 10px, overflow: none"
                >{{ option }}</option>
              </select>
            </div>

            <div class="form-group mt-3" align-h="end">
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
import { required, minLength, email } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { db } from '../../main';
// @ is an alias to /src

export default {
  name: 'home',
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
        name: null,
        surname: null,
        age: 0,
        email: null,
        radio: null,
        hearFromUs: null,
        accept: null
      },
      hearFromUsOptions: [
        'Amics o familiars',
        'Xarxes Socials (Instagram, Twitter, Facebook...)',
        'Cerca al google/web'
      ]
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
      email: {
        required,
        email
      },
      accept: {
        required
      }
    }
  },
  methods: {
    submit: function() {
      this.formTouched = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = 'submit clicked';
      if (
        this.errors === false &&
        this.formTouched === false &&
        this.form.accept === true
      ) {
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
        //this is where you send the responses
        const key = db
          .collection('newsletter')
          .doc(this.form.email)
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
          );
      }
    }
  }
};
</script>

<style scoped></style>
