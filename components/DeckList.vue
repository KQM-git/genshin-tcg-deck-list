<template>
    <div class="flex flex-col text-lg">
        <div
            v-for="(amount, card) of deckList"
            :key="card"
            class="h-14 relative"
        >
            <div class="absolute h-full w-full flex flex-row items-center z-10 pointer-events-none">
                <div
                    class="font-genshin p-2 flex flex-row"
                >
                    <div
                        v-for="point of cardsData?.find(cardData => cardData.name === card)?.skills.find(skill => skill.name === 'Description')?.points"
                        :key="point.point_type"
                        :style="`backgroundImage: url(${require(`~/assets/icons/cost/${point.point_type}.png`)}); text-shadow: -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 1px 1px 0 #333`"
                        class="w-12 h-12 bg-center bg-contain flex justify-center items-center text-2xl"
                    >
                        {{ point.point_count }}
                    </div>
                </div>
                <p class="w-full">
                    {{ card }}
                </p>
                <p class="font-genshin p-3">
                    {{ amount }}
                </p>
            </div>
            <card-component
                class="h-full w-full rounded-xl"
                :name="card"
                :gradient="true"
                type="list"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'DeckList',
    props: {
        deckList: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            cardsData: [] as any[]
        }
    },
    async mounted () {
        this.cardsData = await this.$content('cards').fetch() as any[]
    }
})
</script>
