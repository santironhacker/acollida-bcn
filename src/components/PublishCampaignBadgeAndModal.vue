<template>
        <b-badge
            v-if="isPublished"
            class="badge align-self-center"
            variant="success"
            pill
          >
            Campanya publicada
          </b-badge>
          <b-badge 
            v-else
            class="badge align-self-center"
            variant="danger"
            pill
          >
            Campanya sense publicar
          </b-badge>
</template>

<script>
export default {
    name: 'PublishCampaignBadgeAndModal',
    props: {
        isPublished: Boolean
    }
}
</script>

<style scoped>
    .badge {
        white-space: normal;
        /* word-break: break-word; */
        width: 80%;
        padding: 0.5rem;
    }
</style>