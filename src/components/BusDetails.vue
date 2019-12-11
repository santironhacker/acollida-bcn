<template>
  <div>
    <!-- :class="bus.showCollapse ? 'collapsed' : null" -->
    <!-- <div v-if="buses[[busesMap[busId]]]">
      <span
        aria-controls="collapse-4"
        :aria-expanded="buses[[busesMap[busId]]].showCollapse ? 'true' : 'false'"
        v-on:click="buses[[busesMap[busId]]].showCollapse = !buses[[busesMap[busId]]].showCollapse"
      >
        <font-awesome-icon
          v-if="buses[[busesMap[busId]]].showCollapse"
          class="mr-1"
          :icon="['fa', 'angle-double-down']"
        />
        <font-awesome-icon
          v-else
          class="mr-1"
          :icon="['fa', 'location-arrow']"
        />
        <span id="orange-text-color">
          <strong>
            {{ buses[[busesMap[busId]]].busLabel }} - 
            Del {{ buses[[busesMap[busId]]].oneWayDepartureDate.toDate() | formatDate }} al
            {{ buses[[busesMap[busId]]].returnArrivalDate.toDate() | formatDate }}
          </strong>
          <strong v-else>
            Del {{ week.oneWayDepartureDate.toDate() | formatDate }} al
            {{ week.returnArrivalDate | formatDate }}
          </strong>
        </span>
      </span>
    </div> -->
    <!-- <b-collapse id="collapse-4" class="mt-2" v-model="bus.showCollapse"> --> 

      <!-- DISPLAY OF ONE WAY INFO -->
      <div v-if="display === 'oneWay'">
        <div v-if="isBO">
          Detalls del viatge
          <em 
            class="clickable"
            v-b-modal="bus.id + 'oneWay'"
          >(edita)</em>
        </div>
        <b-card>
          <div>
            <font-awesome-icon 
              class="mr-2"
              :class="bus.isPublished ? 'text-success' : 'text-danger'"
              :icon="['fa', 'bus']"
            />
            <font-awesome-icon
              class="mr-2"
              :icon="['fa', 'long-arrow-alt-right']"
            />
            <span>Anada</span>
          </div>
          <div>
            <div>
              <font-awesome-icon class="mr-2" :icon="['far', 'calendar-alt']" />
              <span v-if="bus.oneWayDepartureDate">
                {{ bus.oneWayDepartureDate.toDate() | formatDate }}
              </span>
            </div>
            <div>
              <font-awesome-icon class="mr-2" :icon="['far', 'clock']" />
              <span v-if="bus.oneWayDepartureTime">
                {{ bus.oneWayDepartureTime }}
              </span>
            </div>
            <div>
              <font-awesome-icon
                class="mr-2 ml-1"
                :icon="['fa', 'map-marker-alt']"
              />
              <span>{{ bus.oneWayDeparturePlace }}</span>
            </div>
          </div>
        </b-card>
        <b-card v-if="isBO">
          <div v-if="bus.isPublished">
            Bus publicat!
          </div>
          <div v-else>
            Aquest bus no ha estat publicat encara. Això vol dir que accepta pre-reserves, però encara no s'ha confirmat que es faci el viatge als interessats que han omplert el formulari. Per publicar el bus i notificar els usuaris, clica sobre el botó.
          </div>
        </b-card>
      </div>

      <!-- MODAL TO EDIT BUS TRIP DETAILS FOR ONE WAY -->
      <b-modal :id="bus.id + 'oneWay'">
        <template v-slot:modal-title>
            Edita la informació del viatje d'anada del bus: 
            <strong id="orange-text-color">
              {{ bus.busLabel }}
            </strong>
        </template>
        <div class="d-block">
          <form>
            <!-- Departure Date -->
            <div class="form-group">
              <label 
                for="oneWayDepartureDate"
                class="control-label"
                :class="$v.busForm.oneWayDepartureDate.$error
                  ? 'text-danger'
                  : $v.busForm.oneWayDepartureDate.$dirty
                  ? 'text-success'
                  : ''"
              >
                <font-awesome-icon class="mr-2" :icon="['far', 'calendar-alt']"/>
                Data de sortida
              </label>
              <v-date-picker
                v-model.lazy="$v.busForm.oneWayDepartureDate.$model"
                mode="single"
                id="oneWayDepartureDate"
                :class="
                  $v.busForm.oneWayDepartureDate.$error
                    ? 'is-invalid '
                    : $v.busForm.oneWayDepartureDate.$dirty
                    ? 'is-valid'
                    : ''
                  "
                type="date"
                :locale="{ id: 'cat', firstDayOfWeek: 2 }"
              />
            </div>
            <!-- Departure Time -->
            <div class="form-group">
              <label 
                for="oneWayDepartureTime"
                class="control-label"
                :class="$v.busForm.oneWayDepartureTime.$error
                  ? 'text-danger'
                  : $v.busForm.oneWayDepartureTime.$dirty
                  ? 'text-success'
                  : ''"
              >
                <font-awesome-icon class="mr-2" :icon="['far', 'clock']" />
                Hora de sortida
              </label>
              <div>
                <input 
                  id="oneWayDepartureTime" 
                  name="oneWayDepartureTime"
                  type="time" 
                  v-model.lazy="$v.busForm.oneWayDepartureTime.$model"
                  :class="
                    $v.busForm.oneWayDepartureTime.$error
                      ? 'is-invalid '
                      : $v.busForm.oneWayDepartureTime.$dirty
                      ? 'is-valid'
                      : ''
                    "
                >
              </div>
            </div>
            <!-- Departure Place -->
            <div class="form-group">
              <label 
                for="oneWayDeparturePlace"
                class="control-label"
                :class="$v.busForm.oneWayDeparturePlace.$error
                  ? 'text-danger'
                  : $v.busForm.oneWayDeparturePlace.$dirty
                  ? 'text-success'
                  : ''"
              >
                <font-awesome-icon class="mr-2 ml-1" :icon="['fa', 'map-marker-alt']"/>
                Lloc de sortida
              </label>
              <div>
                <input 
                  id="oneWayDeparturePlace" 
                  name="oneWayDeparturePlace"
                  type="text" 
                  v-model.lazy="$v.busForm.oneWayDeparturePlace.$model"
                  :class="
                    $v.busForm.oneWayDeparturePlace.$error
                      ? 'is-invalid '
                      : $v.busForm.oneWayDeparturePlace.$dirty
                      ? 'is-valid'
                      : ''
                    "
                >
              </div>
            </div>
          </form>
        </div>
        <template v-slot:modal-footer>
            <div class="w-100">
                <b-button
                    variant="success"
                    class="float-right"
                    @click="saveOneWayChanges(bus)"
                >
                    Confirma
                </b-button>
                <b-button
                    variant="danger"
                    class="float-right mr-2"
                    @click="$bvModal.hide(bus.id + 'oneWay')"
                >
                    Cancela
                </b-button>
            </div>
        </template>
    </b-modal>

    <!-- DISPLAY OF RETURN INFO -->
      <b-card v-if="display === 'return'">
        <div>
          <font-awesome-icon
            class="mr-2"
            :icon="['fa', 'long-arrow-alt-left']"
          />
          <font-awesome-icon 
            class="mr-2"
            :class="bus.isPublished ? 'text-success' : 'text-danger'"
            :icon="['fa', 'bus']"
          />
          <span>Tornada</span>
        </div>
        <div>
          <font-awesome-icon class="mr-2" :icon="['far', 'calendar-alt']" />
          <span>{{ bus.returnArrivalDate | formatDate }}</span>
        </div>
        <div>
          <font-awesome-icon class="mr-2" :icon="['far', 'clock']" />
          <span>{{ bus.returnArrivalTime }}</span>
        </div>
        <div>
          <font-awesome-icon
            class="mr-2 ml-1"
            :icon="['fa', 'map-marker-alt']"
          />
          <span>{{ bus.returnArrivalPlace }}</span>
        </div>
      </b-card>

      <!-- MODAL TO EDIT BUS TRIP DETAILS FOR ONE WAY -->


      <!-- <div class="mt-3 mb-3 text-center">
        <b-button class="p-2 default-button">
          <router-link
            :to="{ name: 'bus-registration-form', params: { busId: bus.id } }"
          >
            <span>Inscriure'm al bus</span>
            <font-awesome-icon class="ml-2" :icon="['fa', 'user-plus']" />
          </router-link>
        </b-button>
      </div> -->
    <!-- </b-collapse> -->
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'BusDetails',
  mixins: [validationMixin],
  props: {
    bus: Object,
    display: String,
    isBO: Boolean,

    busId: String,
    buses: Array,
    busesMap: Object,
    week: Object
  },
  data() {
    return {
      busForm: {
        oneWayDepartureDate: new Date(this.bus.oneWayDepartureDate.toDate()),
        oneWayDepartureTime: this.toTime(this.bus.oneWayDepartureTime),
        oneWayDeparturePlace: this.bus.oneWayDeparturePlace
      },
      isOneWayModalChanges: false
    };
  },
  validations: {
    busForm: {
        oneWayDepartureDate: { required },
        oneWayDepartureTime: {},
        oneWayDeparturePlace: {}
    }
  },
  methods: {
    toTime: function(timestamp) {
      // With plain strings
      let arr = Array.from(timestamp);
      let arr2 = Array.from(timestamp);
      let minutes = arr.slice(arr.indexOf(':') + 1).join('');
      let hours = arr2.slice(0, arr.indexOf(':')).join('');
      /* console.log('minutes ', minutes);
      console.log('hours', hours); */
      // With timestamp
      /* let minutes = new Date(timestamp).getHours();
      let hours = new Date(timestamp).getMinutes().toString(); */
      if (minutes < 10 && minutes.length != 2) { 
        minutes = '0' + minutes;
      }
      if (hours < 10 && hours.length != 2) {
        hours = '0' + hours;
      }
      const result = hours + ':' + minutes;
      console.log('result ', result);
      return result;
    },
    saveOneWayChanges: function(bus) {
      this.busForm.oneWayDepartureDate = this.$v.busForm.oneWayDepartureDate.$model;
      this.busForm.oneWayDepartureTime = this.$v.busForm.oneWayDepartureTime.$model;
      this.busForm.oneWayDeparturePlace = this.$v.busForm.oneWayDeparturePlace.$model;
      this.$bvModal.hide(bus.id + 'oneWay');
      this.$emit('update-trip-details', bus, this.busForm);
    }
  }
};
</script>

<style scoped>
</style>
