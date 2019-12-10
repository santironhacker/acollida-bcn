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
      <b-card v-if="display === 'oneWay'">
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
export default {
  name: 'BusDetails',
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
    return {};
  }
};
</script>

<style scoped></style>
