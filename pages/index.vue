<template>
    <div class="flex flex-col gap-3 mx-auto max-w-2xl w-full p-2">
        <form action onsubmit="return false" class="flex justify-center">
            <input
                v-model="search"
                type="search"
                placeholder="Search"
                class="rounded-md p-1 pl-9 w-full max-w-sm bg-gray-600 bg-no-repeat bg-left text-white"
                :style="{
                    'background-image': `url(${require('~/assets/icons/magnify.svg')})`,
                    'background-position': '0.5em 50%'
                }"
            >
        </form>

        <div
            v-if="searchFilters.tags.length > 0"
            class="w-full flex flex-row"
        >
            <div class="flex flex-row gap-2 overflow-x-auto">
                <button
                    v-for="tag of searchFilters.tags"
                    :key="tag"
                    @click="removeTag(tag)"
                >
                    <tag-bar
                        class="rounded-md text-center font-bold px-2 whitespace-nowrap"
                        :tag="tag"
                    />
                </button>
            </div>
        </div>

        <div class="w-full p-3 rounded-xl bg-[#2D282F] border-2 border-[#584F65]">
            <div class="w-full flex flex-row gap-3 overflow-x-auto">
                <button
                    v-for="section of ['Tags', 'Element', 'Faction', 'Weapon']"
                    :key="section"
                    :class="'text-lg font-bold ' + (searchSection === section ? 'text-white' : 'text-gray-400')"
                    @click="searchSection = section"
                >
                    {{ section }}
                </button>
            </div>

            <div
                v-if="searchSection === 'Tags'"
                class="w-full flex flex-col pt-1 gap-2"
            >
                <div
                    v-for="(tagSection, index) in [
                        ['Easy', 'Medium', 'Hard', 'Very Hard'], ['Aggro', 'Combo']]"
                    :key="index"
                    class="w-full flex flex-row gap-2 overflow-x-auto"
                >
                    <button
                        v-for="tag of tagSection"
                        :key="tag"
                        @click="addTag(tag)"
                    >
                        <tag-bar
                            class="rounded-md text-center font-bold px-2 whitespace-nowrap"
                            :tag="tag"
                        />
                    </button>
                </div>
            </div>
        </div>

        <nuxt-link
            v-for="deck of decks"
            :key="deck.slug"
            :to="deck.slug"
            class="rounded-xl bg-[#2D282F] border-2 border-[#584F65] h-52 flex flex-row"
        >
            <div class="w-1/2 flex flex-col p-3 sm:p-6 gap-2 justify-center">
                <p class="w-full font-genshin text-xl sm:text-3xl">
                    {{ deck.name }}
                </p>
                <div class="w-full flex flex-row flex-wrap justify-start items-center gap-2">
                    <tag-bar
                        v-for="tag of deck.tags"
                        :key="tag"
                        :tag="tag"
                        class="rounded-md text-center font-bold px-2"
                    />
                </div>
            </div>
            <div class="w-1/2 flex flex-row mr-3">
                <card-component
                    v-for="(character, i) in deck.characters"
                    :key="i"
                    :name="character"
                    :modal="false"
                    class="w-full bg-[length:150%]"
                    style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);"
                />
            </div>
        </nuxt-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardComponent from '~/components/CardComponent.vue'

async function getDecks ($content: any, codeMapping: { [key: string]: string}, search: string = '', searchFilters: any = []): Promise<any[]> {
    let decks: any[]
    if (search !== '') {
        decks = await $content('decks').search('name', search).fetch() as any[]
    } else {
        decks = await $content('decks').fetch() as any[]
    }

    decks.forEach((deck) => {
        const cards = deck.deck_code.replace(/[!=?]/g, '').match(/\.?.{2}/g)
        deck.characters = cards.slice(0, 3).map((code: string) => codeMapping[code])
        deck.deck_list = {}
        for (const card of cards.slice(3)) {
            deck.deck_list[codeMapping[card.replace('.', '')]] = card.includes('.') ? 2 : 1
        }
    })

    if (searchFilters.tags?.length > 0) {
        decks = decks.filter((deck: any) => searchFilters.tags.every((tag: string) => deck.tags.includes(tag)))
    }

    return decks
}

export default Vue.extend({
    name: 'IndexPage',
    components: { CardComponent },
    async asyncData ({ $content }) {
        const codeMapping: { [key: string]: string} = {}
        const cardcodes = await $content('cardcodes').fetch() as any
        for (const entry of cardcodes.body) {
            codeMapping[entry.Code] = entry.Card
        }

        const decks = await getDecks($content, codeMapping)

        return { codeMapping, decks }
    },
    data () {
        return {
            search: '',
            searchSection: 'Tags',
            searchFilters: {
                tags: [] as string[],
                elements: [] as string[],
                factions: [] as string[],
                weapons: [] as string[]
            },
            codeMapping: {} as { [key: string]: string},
            decks: [] as any[]
        }
    },
    watch: {
        async search (search) {
            this.decks = await getDecks(this.$content, this.codeMapping, search)
        },
        searchFilters: {
            handler: async function (searchFilters) {
                this.decks = await getDecks(this.$content, this.codeMapping, this.search, searchFilters)
            },
            deep: true
        }
    },
    methods: {
        addTag (tag: string) {
            if (!this.searchFilters.tags.includes(tag)) {
                this.searchFilters.tags.push(tag)
            }
        },
        removeTag (tag: string) {
            this.searchFilters.tags = this.searchFilters.tags.filter((t: string) => t !== tag)
        }
    }
})
</script>
