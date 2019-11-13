<template>
  <div>
    <ol 
        v-if="show"
        class="form-group mt-3" 
        style="padding-inline-start:1rem"
    >
        <div>Dates seleccionades:</div>
        <li
            v-for="(item, index) in list"
            :key="index"
            class="ml-3"
        >
        <div class="d-flex align-items-center">
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
        </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'list-component',
  props: {
      show: Boolean,
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
