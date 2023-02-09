<template>
    <deck-list
        class="max-w-md mx-auto"
        :deck-list="cards"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import DeckList from '~/components/DeckList.vue'

export default Vue.extend({
    name: 'IndexPage',
    components: { DeckList },
    async asyncData ({ $content }) {
        const cards: any = {}
        const cardcodes = await $content('cardcodes').fetch() as any
        for (const entry of cardcodes.body) {
            cards[entry.Card] = 1
        }
        const cardsData = await $content('cards').fetch() as any[]

        return { cards, cardsData }
    }
})
</script>
