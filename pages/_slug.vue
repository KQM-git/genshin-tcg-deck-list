<template>
    <div class="flex flex-col m-5 gap-5">
        <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-5">
                <div class="rounded-xl p-5 bg-[#2D282F] border-2 border-[#584F65] flex flex-row justify-between">
                    <card-component v-for="(character, i) in deck.characters" :key="i" :name="character" class="h-32 w-32 rounded-full" />
                </div>

                <div class="rounded-xl p-5 bg-[#2D282F] border-2 border-[#584F65] flex flex-col justify-between gap-2">
                    <p class="font-genshin text-2xl">
                        Deck List
                    </p>
                    <div class="flex flex-col text-lg">
                        <div
                            v-for="(amount, card) of deck.deck_list"
                            :key="card"
                            class="h-14 relative"
                        >
                            <div class="absolute h-full w-full flex flex-row items-center z-10 pointer-events-none">
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
                            <card-component
                                class="h-full w-full rounded-xl"
                                :name="card"
                                :gradient="true"
                            />
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
                        <tag-bar
                            v-for="tag of deck.tags"
                            :key="tag"
                            :tag="tag"
                            class="py-2 px-4 rounded-lg text-lg font-bold"
                        />
                    </div>
                    <p class="text-lg font-genshin">
                        {{ deck.description }}
                    </p>
                    <div
                        v-if="deck.good_against"
                        class="w-full"
                    >
                        <p class="text-2xl font-genshin">
                            Good Against
                        </p>
                        <div class="grid grid-cols-3 gap-5">
                            <div v-for="(_deck, i) in deck.good_against" :key="i" class="w-full h-16 relative">
                                <card-component
                                    v-for="(character, j) in _deck"
                                    :key="j"
                                    :name="character"
                                    class="w-16 h-16 rounded-full absolute"
                                    :style="{ left: `${j * 100 / 3}px` }"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="deck.bad_against"
                        class="w-full"
                    >
                        <p class="text-2xl font-genshin">
                            Bad Against
                        </p>
                        <div class="grid grid-cols-3 gap-5">
                            <div v-for="(_deck, i) in deck.bad_against" :key="i" class="w-full h-16 relative">
                                <card-component
                                    v-for="(character, j) in _deck"
                                    :key="j"
                                    :name="character"
                                    class="w-16 h-16 rounded-full absolute"
                                    :style="{ left: `${j * 100 / 3}px` }"
                                />
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
        <div
            v-for="(section, index) in mainSections"
            :key="index"
            class="px-5 pt-5 pb-2 border-2 border-[#584F65] rounded-xl font-genshin text-lg"
            :class="(section[0].tag === 'h2' ? 'bg-[#2D282F]' : 'bg-[#423745] -mt-6 rounded-t-none') + ((mainSections[index + 1] ?? [])[0]?.tag === 'h3' ? ' rounded-b-none' : '')"
        >
            <nuxt-content :document="{ body: { children : section } }" />
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

        const mainSections = []
        let currentSection = []
        for (let i = 0; i < deck.body.children.length; i++) {
            const children = deck.body.children[i]
            if (['h2', 'h3'].includes(children.tag) && i !== 0) {
                mainSections.push(currentSection)
                currentSection = []
                currentSection.push(children)
            } else if (i === deck.body.children.length - 1) {
                currentSection.push(children)
                mainSections.push(currentSection)
            } else {
                currentSection.push(children)
            }
        }

        return { deck, mainSections }
    },
    data () {
        return {
            deck: [] as any
        }
    }
})
</script>

<style lang="postcss" scoped>
::v-deep .nuxt-content h2 {
    @apply font-bold text-4xl pb-2
}
::v-deep .nuxt-content h3 {
    @apply font-bold text-2xl pb-1
}
</style>
