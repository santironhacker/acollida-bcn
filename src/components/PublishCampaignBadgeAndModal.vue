<template>
    <div class="d-flex justify-content-center">
        <b-button
            v-if="campaign.isPublished"
            v-b-modal="campaign.id"
            class="badge align-self-center"
            variant="success"
            pill
        >
            Campanya publicada
        </b-button>
        <b-button 
            v-else
            v-b-modal="campaign.id"
            class="badge align-self-center"
            variant="danger"
            pill
        >
            Campanya sense publicar
        </b-button>
        <b-modal :id="campaign.id">
            <template v-slot:modal-title>
                Modifica l'estat de la campanya
            </template>
            <div class="d-block text-center">
                <p v-if="campaign.isPublished">
                    Ets a punt de <strong>despublicar</strong> la campanya <strong>{{ campaign.title }}</strong>.
                    Això vol dir que la campanya desapareixarà del web públic de l'acollida de Barcelona i els visitants no en podran veure el detall, ni inscriure's en els busos.
                </p>
                <p v-else>
                    Ets a punt de <strong>publicar</strong> la campanya <strong>{{ campaign.title }}</strong>.
                    Això implica que els visitants que visitin el web de l'acollida de Barcelona podran veure aquesta campanya d'entre el llistat de campanyes, accedir als detalls e inscriure's en els busos.
                </p>
            </div>
            <template v-slot:modal-footer>
                <div class="w-100">
                    <b-button
                        variant="success"
                        class="float-right"
                        @click="publishCampaign()"
                    >
                        Confirma
                    </b-button>
                    <b-button
                        variant="danger"
                        class="float-right mr-2"
                        @click="$bvModal.hide(campaign.id)"
                    >
                        Cancela
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'PublishCampaignBadgeAndModal',
    props: {
        campaign: {
            id: String,
            isPublished: Boolean,
            title: String
        }
    },
    methods: {
        publishCampaign() {
            this.$emit('toggleIsPublished');
            this.$bvModal.hide(this.campaign.id);
        }
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