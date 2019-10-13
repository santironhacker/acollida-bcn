<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <div class="pt-2 pb-2">
            <span class="title">{{ campaign.title }}</span>
            <!-- <span>{{ campaign.status }}</span> -->
          </div>
          <div class="card p-3">
            <div>
              <font-awesome-icon class="mr-2" :icon="['fa', 'bus']" />
              <font-awesome-icon class="mr-2" :icon="['fa', 'long-arrow-alt-right']" />
              <span>Anada</span>
            </div>
            <div>
              <font-awesome-icon class="mr-2" :icon="['far', 'calendar-alt']" />
              <span>{{ campaign.startDate | formatDate }}</span>
            </div>
            <div>
              <font-awesome-icon class="mr-2" :icon="['far', 'clock']" />
              <span>{{ campaign.oneWayDepartureTime }}</span>
            </div>
            <div>
              <font-awesome-icon class="mr-2 ml-1" :icon="['fa', 'map-marker-alt']" />
              <span>{{ campaign.oneWayDeparturePlace }}</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="card p-3 mt-3">
            <div>
              <font-awesome-icon class="mr-2" :icon="['fa', 'long-arrow-alt-left']" />
              <font-awesome-icon class="mr-2" :icon="['fa', 'bus']" />
              <span>Tornada</span>
            </div>
            <div>
              <font-awesome-icon class="mr-2" :icon="['far', 'calendar-alt']" />
              <span>{{ campaign.endDate | formatDate }}</span>
            </div>
            <div>
              <font-awesome-icon class="mr-2" :icon="['far', 'clock']" />
              <span>{{ campaign.returnArrivalTime }}</span>
            </div>
            <div>
              <font-awesome-icon class="mr-2 ml-1" :icon="['fa', 'map-marker-alt']" />
              <span>{{ campaign.returnArrivalPlace }}</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'campaign',
  data() {
    return {
      campaign: {
        title: 'Setmana Santa 2020',
        startDate: '1586995200000',
        endDate: '1587340799000',
        status: 1,
        oneWayDepartureTime: '22h00',
        oneWayDeparturePlace: 'Estació de Busos Fabra i Puig (L1)',
        oneWayArrivalTime: '8h00',
        returnDepartureTime: '11h15',
        returnArrivalTime: '22h00',
        returnArrivalPlace: 'Estació de Busos Fabra i Puig (L1)'
      }
    };
  }
};
</script>

<style scoped>
.card {
  border: solid 1px black;
}
</style>