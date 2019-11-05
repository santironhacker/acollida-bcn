<template>
  <div>
    <b-container fluid style="max-width: 100%">
      <b-row>
        <b-col>
          <div class="pt-2 pb-2 title">Login BO</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="pb-2 pl-0">Accedeix a l'area privada per administrar els busos de l'acollida.</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <form class="pt-2 pb-2 pl-0">
            <div class="form-group">
              <label
                for="username"
                class="control-label"
                :class="                  
                    form.errors
                    ? !$v.form.username.$dirty
                    ? 'text-danger' 
                    : ''
                    : ''
                "
              >Usuari: *</label>
              <input
                class="form-control"
                :class="
                  form.errors
                    ? !$v.form.username.$dirty
                    ? 'is-invalid'                    
                    : ''
                    : ''
                "
                v-model.lazy="$v.form.username.$model"
                type="text"
                id="username"
              />
              <div
                class="help-block error mt-1"
                v-if="!$v.form.username.required && $v.form.username.$error"
              >Camp obligatori</div>
            </div>

            <div class="form-group mt-2">
              <label
                for="password"
                class="control-label"
                :class="
                  form.errors
                    ? !$v.form.password.$dirty
                    ? 'text-danger' 
                    : ''
                    : ''
                "
              >Contrasenya: *</label>
              <input
                class="form-control"
                :class="
                  form.errors
                  ? !$v.form.password.$dirty
                    ? 'is-invalid '                                        
                    : ''
                    : ''
                "
                v-model.lazy="$v.form.password.$model"
                type="password"
                id="password"
              />
              <div
                class="help-block error mt-1"
                v-if="!$v.form.password.required && $v.form.password.$error"
              >Camp obligatori</div>
            </div>

            <b-button class="submit" id="back-color" @click.prevent="submit">
              <span>Envia</span>
            </b-button>
            <div class="mt-2">
              <p v-if="errors" class="error">
                Formulari amb erros.
                <br />Revisa el contingut.
              </p>
              <p
                v-else-if="formTouched && uiState === 'submit clicked'"
                class="text-warning"
              >Sense credencials, torna a provar.</p>
              <p v-else-if="uiState === 'form submitted'" class="text-success">
                Registre correcte!
                <br />Redirigint a la consola d'administrador...
              </p>
              <p
                v-else-if="uiState === 'form returns error'"
                class="text-warning"
              >Error en processar la petició. Prova més tard.</p>
              <p
                v-else-if="uiState === 'invalid credentials'"
                class="text-danger"
              >Credencials d'accés incorrectes.</p>
            </div>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { db } from '../../main';
import { auth } from '../../main';
import router from '../../router';

export default {
  name: 'loginBO',
  props: {},
  mixins: [validationMixin],
  data() {
    return {
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      formTouched: null,
      form: {
        username: null,
        password: null
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    submit: function() {
      const self = this;
      this.formTouched = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.formTouched === false) {
        auth
          .signInWithEmailAndPassword(this.form.username, this.form.password)
          .then(userCredentials => {
            console.log(userCredentials);
            this.uiState = 'form submitted';
            this.$v.form.$reset();
            Object.keys(this.form).forEach(function(key) {
              self.form[key] = '';
            });
            router.push('bo/homeBO');
          })
          .catch(function(error) {
            // Handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;
            if (
              errorCode === 'auth/invalid-email' ||
              errorCode === 'auth/user-not-found' ||
              errorCode === 'auth/wrong-password'
            ) {
              self.uiState = 'invalid credentials';
              self.$v.form.$reset();
              self.form.errors = true;
            } else {
              self.uiState = 'form returns error';
            }
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
