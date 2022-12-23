<template>
    <div class="flex flex-col text-white">
        <nuxt-link v-for="deck of decks" :key="deck.slug" :to="deck.slug">
            {{ deck.name }}
        </nuxt-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'IndexPage',
    data () {
        return {
            decks: [] as any[]
        }
    },
    async fetch () {
        this.decks = await this.$content('decks').fetch() as any[]
    }
})
</script>
