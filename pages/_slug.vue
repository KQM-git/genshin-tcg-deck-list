<template>
    <div class="flex flex-col m-5">
        <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-5">
                <div class="rounded-xl p-5 bg-[#2D282F] border-2 border-[#584F65] flex flex-row justify-between">
                    <img v-for="character of deck.characters" :key="character" :src="require(`~/assets/cards/${character}.png`)" class="h-32 w-32 object-cover rounded-full">
                </div>

                <div class="rounded-xl p-5 bg-[#2D282F] border-2 border-[#584F65] flex flex-col justify-between gap-2">
                    <p class="font-genshin text-2xl">
                        Deck List
                    </p>
                    <div class="flex flex-col text-lg">
                        <div
                            v-for="(amount, card) of deck.deck_list"
                            :key="card"
                            class="card-list h-14 flex flex-row items-center rounded-xl bg-cover bg-center"
                            :style="{ backgroundImage: `linear-gradient(to right, black, transparent), url(&quot;${require(`~/assets/cards/${card.replace(/[:!]/g, '')}.png`)}&quot;)` }"
                        >
                            <p class="font-genshin p-3">
                                0
                            </p>
                            <p class="w-full">
                                {{ card }}
                            </p>
                            <p class="font-genshin p-3">
                                {{ amount }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <div class="rounded-xl p-5 bg-[#2D282F] border-2 border-[#584F65] flex flex-col gap-8">
                    <div class="flex flex-row items-center gap-3">
                        <p class="font-genshin text-3xl">
                            {{ deck.name }}
                        </p>
                        <div
                            v-for="tag of deck.tags"
                            :key="tag"
                            :class="({
                                'Easy': 'bg-green-400',
                                'Medium': 'bg-yellow-400',
                                'Hard': 'bg-red-400',
                                'Very Hard': 'bg-red-600'
                            }[tag] || 'bg-kqm-purple') + ' py-2 px-4 rounded-lg text-lg font-bold'"
                        >
                            {{ tag }}
                        </div>
                    </div>
                    <p class="text-lg font-genshin">
                        {{ deck.description }}
                    </p>
                    <div class="w-full">
                        <p class="text-2xl font-genshin">
                            Good Against
                        </p>
                        <div class="grid grid-cols-3 gap-5">
                            <div v-for="(_deck, i) in deck.good_against" :key="i" class="w-full h-16 relative">
                                <img
                                    v-for="(character, j) in _deck"
                                    :key="j"
                                    :src="require(`~/assets/cards/${character}.png`)"
                                    class="w-16 h-16 object-cover rounded-full absolute"
                                    :style="{ left: `${j * 100 / 3}px` }"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <p class="text-2xl font-genshin">
                            Bad Against
                        </p>
                        <div class="grid grid-cols-3 gap-5">
                            <div v-for="(_deck, i) in deck.bad_against" :key="i" class="w-full h-16 relative">
                                <img
                                    v-for="(character, j) in _deck"
                                    :key="j"
                                    :src="require(`~/assets/cards/${character}.png`)"
                                    class="w-16 h-16 object-cover rounded-full absolute"
                                    :style="{ left: `${j * 100 / 3}px` }"
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rounded-xl p-5 bg-[#2D282F] border-2 border-[#584F65]">
                    <p class="text-2xl font-genshin">
                        Video
                    </p>
                    <div class="h-0 pb-[56.25%] relative">
                        <iframe
                            class="absolute inset-0 w-full h-full"
                            :src="deck.video_url.includes('watch?v=') ? `https://www.youtube.com/embed/${deck.video_url.split('watch?v=').pop()}` : `https://www.youtube.com/embed/${deck.video_url.split('/').pop()}`"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'IndexPage',
    validate ({ $content, params }) {
        return $content('decks').fetch().then((decks) => {
            return decks.map((deck: any) => deck.slug).includes(params.slug)
        })
    },
    async asyncData ({ $content, params }) {
        const deck = await $content('decks', params.slug).fetch() as any
        const deckList: any = {}
        for (const card of deck.deck_list) {
            if (deckList[card]) {
                deckList[card]++
            } else {
                deckList[card] = 1
            }
        }
        deck.deck_list = deckList

        return { deck }
    },
    data () {
        return {
            deck: [] as any
        }
    }
})
</script>
