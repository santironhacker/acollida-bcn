<template>
  <div>
    <ol 
        v-if="show"
        class="form-group mt-3" 
        style="padding-inline-start:1rem"
    >
        <div v-if="listTitle === 'weeks'">Dates seleccionades:</div>
        <div v-else-if="listTitle === 'buses'">Busos afegits:</div>
        <li
            v-for="(item, index) in list"
            :key="index"
            class="ml-3"
        >   
            <!-- Display for weeks -->
            <div v-if="listTitle === 'weeks'" class="d-flex align-items-center">
                <font-awesome-icon
                    class="mr-1"
                    :class="colorizeIcon ? colors[index] : ''"
                    :icon="['fa', 'calendar']"
                />
                <span v-if="item.startDate">Del {{ item.startDate | formatDate }}</span>
                <span v-else class="text-warning">No startDate available</span>
                <span v-if="item.endDate" class="ml-1">al {{ item.endDate | formatDate }}</span>
                <span v-else class="text-warning">No endDate available</span>
                <font-awesome-icon
                    @click="$emit('delete-week', index)"
                    class="text-danger ml-2"
                    :icon="['far', 'times-circle']"
                />
            </div>
            <!-- Display for buses -->
            <div v-else-if="listTitle === 'buses'" class="d-flex align-items-center">
                <div>
                    <div>
                        <font-awesome-icon
                            class="mr-1"
                            :class="colorizeIcon ? colors[index] : ''"
                            :icon="['fa', 'bus']"
                        />
                        <span>{{ item.busName || 'No bus name available'}}</span>
                    </div>
                    <div>
                        <span>
                            Marxa el {{ item.startDate | formatDate }}
                        </span>
                        <font-awesome-icon
                            class="ml-2"
                            :class="
                                item.oneWayAcceptsPassengers
                                ? 'text-success'
                                : 'text-danger'
                            "
                            :icon="['fa', 'users']"
                        />
                    </div>
                    <div>
                        <span>
                            Torna el {{ item.endDate | formatDate }}
                        </span>
                        <font-awesome-icon
                            class="ml-2"
                            :class="
                                item.returnAcceptsPassengers
                                ? 'text-success'
                                : 'text-danger'
                            "
                            :icon="['fa', 'users']"
                        />
                    </div>
                </div>
                <div>
                    <font-awesome-icon
                        @click="$emit('delete-bus', index)"
                        class="text-danger ml-2"
                        :icon="['far', 'times-circle']"
                        size="lg"
                    />
                </div>
            </div>
        </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'list-component',
  props: {
      show: Boolean,
      listTitle: String,
      list: Array,
      colorizeIcon: Boolean,
      colors: Array
  },
  data() {
    return {};
  }
};
</script>

<style scoped>

router-link :hover {
  cursor: pointer;
}
</style>
