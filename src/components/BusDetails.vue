<template>
  <div>
    <!-- :class="bus.showCollapse ? 'collapsed' : null" -->
    <div
      aria-controls="collapse-4"
      :aria-expanded="bus.showCollapse ? 'true' : 'false'"
      v-on:click="bus.showCollapse = !bus.showCollapse"
    >
      <font-awesome-icon class="mr-2" :icon="['fa', 'location-arrow']" />
      <span id="orange-text-color">
        <strong>Del {{ bus.oneWayDepartureDate | formatDate }} al {{ bus.returnArrivalDate | formatDate }}</strong>
      </span>
    </div>
    <b-collapse id="collapse-4" class="mt-2" v-model="bus.showCollapse">
      <b-card>
        <div>
          <font-awesome-icon class="mr-2" :icon="['fa', 'bus']" />
          <font-awesome-icon class="mr-2" :icon="['fa', 'long-arrow-alt-right']" />
          <span>Anada</span>
        </div>
        <div>
          <font-awesome-icon class="mr-2" :icon="['far', 'calendar-alt']" />
          <span>{{ bus.oneWayDepartureDate | formatDate }}</span>
        </div>
        <div>
          <font-awesome-icon class="mr-2" :icon="['far', 'clock']" />
          <span>{{ bus.oneWayDepartureTime }}</span>
        </div>
        <div>
          <font-awesome-icon class="mr-2 ml-1" :icon="['fa', 'map-marker-alt']" />
          <span>{{ bus.oneWayDeparturePlace }}</span>
        </div>
      </b-card>
      <b-card>
        <div>
          <font-awesome-icon class="mr-2" :icon="['fa', 'long-arrow-alt-left']" />
          <font-awesome-icon class="mr-2" :icon="['fa', 'bus']" />
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
          <font-awesome-icon class="mr-2 ml-1" :icon="['fa', 'map-marker-alt']" />
          <span>{{ bus.returnArrivalPlace }}</span>
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'BusDetails',
  props: ['bus'],
  data() {
    return {};
  }
};
</script>