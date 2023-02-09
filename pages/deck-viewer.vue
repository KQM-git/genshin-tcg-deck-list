<template>
    <div class="flex flex-col items-center">
        <p class="text-3xl font-genshin p-2">
            Deck Viewer
        </p>
        <div class="p-3 w-full">
            <input
                v-model="deckCode"
                onfocus="this.select()"
                class="p-1 w-full text-black"
                placeholder="Insert GenshinCards deck code here"
            >
        </div>

        <button
            class="bg-kqm-purple p-1 w-24 rounded-lg"
            @click="submit"
        >
            View Deck
        </button>
        <div
            v-if="characters.length > 0"
            class="flex flex-col gap-5 shrink m-5"
        >
            <div class="rounded-xl p-5 bg-[#2D282F] border-2 border-[#584F65] flex flex-row justify-center gap-3 lg:justify-between">
                <card-component
                    v-for="(character, i) in characters"
                    :key="i"
                    :name="character"
                    class="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 rounded-full"
                    type="character"
                />
            </div>

            <div class="rounded-xl p-5 bg-[#2D282F] border-2 border-[#584F65] flex flex-col justify-between gap-2">
                <p class="font-genshin text-2xl">
                    Deck List
                </p>
                <DeckList :deck-list="deckList" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'DeckViewerPage',
    async asyncData ({ query, $content }) {
        const deckCode = query['deck-code'] ?? ''
        const codeMapping: { [key: string]: string} = {}
        const cardcodes = await $content('cardcodes').fetch() as any
        for (const entry of cardcodes.body) {
            codeMapping[entry.Code] = entry.Card
        }

        if (!deckCode) {
            return {
                codeMapping
            }
        }

        const cards = (query['deck-code'] as string).replace(/[!=?]/g, '').match(/\.?.{2}/g) ?? []
        const characters: any[] = cards.slice(0, 3).map((code: string) => codeMapping[code])
        const deckList: any = {}
        for (const card of cards.slice(3)) {
            deckList[codeMapping[card.replace('.', '')]] = card.includes('.') ? 2 : 1
        }

        return {
            codeMapping,
            characters,
            deckList,
            deckCode
        }
    },
    data () {
        return {
            codeMapping: {} as { [key: string]: string},
            characters: [] as string[],
            deckList: {} as { [key: string]: number},
            deckCode: ''
        }
    },
    methods: {
        submit () {
            this.$router.push({ query: { 'deck-code': this.deckCode } })
            this.parseDeckCode()
        },
        parseDeckCode () {
            const cards = this.deckCode.replace(/[!=?]/g, '').match(/\.?.{2}/g) ?? []
            this.characters = cards.slice(0, 3).map((code: string) => this.codeMapping[code])
            this.deckList = {}
            for (const card of cards.slice(3)) {
                this.deckList[this.codeMapping[card.replace('.', '')]] = card.includes('.') ? 2 : 1
            }
        }
    }
})
</script>
