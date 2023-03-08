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

        <div class="w-full p-3 rounded-xl bg-[#2D282F] border-2 border-[#584F65] flex flex-col gap-2">
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
                class="w-full flex flex-col gap-2"
            >
                <div
                    v-for="(tagSection, index) in [
                        ['Easy', 'Medium', 'Hard', 'Very Hard'], ['Aggro', 'Combo', 'Control']]"
                    :key="index"
                    class="w-full flex flex-row gap-2 overflow-x-auto"
                >
                    <button
                        v-for="tag of tagSection"
                        :key="tag"
                        @click="addFilter(tag, searchFilters.tags)"
                    >
                        <tag-bar
                            class="rounded-md text-center font-bold px-2 whitespace-nowrap"
                            :tag="tag"
                        />
                    </button>
                </div>
            </div>

            <div
                v-if="searchSection === 'Element'"
                class="w-full flex flex-row gap-2 overflow-x-auto"
            >
                <button
                    v-for="element of ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo']"
                    :key="element"
                    class="w-10 h-10 shrink-0"
                    @click="addFilter(element, searchFilters.elements)"
                >
                    <img
                        :class="['w-full h-full', searchFilters.elements.length > 0 && !searchFilters.elements.includes(element) ? 'brightness-50' : '']"
                        :src="require(`~/assets/icons/${element}.png`)"
                    >
                </button>
            </div>

            <div
                v-if="searchSection === 'Faction'"
                class="w-full flex flex-row gap-2 overflow-x-auto"
            >
                <button
                    v-for="faction of ['Mondstadt', 'Liyue', 'Inazuma', 'Sumeru', 'Fatui', 'Monster', 'Hilichurl']"
                    :key="faction"
                    class="w-10 h-10 shrink-0"
                    @click="addFilter(faction, searchFilters.factions)"
                >
                    <img
                        :class="['w-full h-full', searchFilters.factions.length > 0 && !searchFilters.factions.includes(faction) ? 'brightness-50' : '']"
                        :src="require(`~/assets/icons/${faction}.png`)"
                    >
                </button>
            </div>

            <div
                v-if="searchSection === 'Weapon'"
                class="w-full flex flex-row gap-2 overflow-x-auto"
            >
                <button
                    v-for="weapon of ['Sword', 'Claymore', 'Polearm', 'Catalyst', 'Bow', 'Other Weapons']"
                    :key="weapon"
                    class="w-10 h-10 shrink-0"
                    @click="addFilter(weapon, searchFilters.weapons)"
                >
                    <img
                        :class="['w-full h-full', searchFilters.weapons.length > 0 && !searchFilters.weapons.includes(weapon) ? 'brightness-50' : '']"
                        :src="require(`~/assets/icons/${weapon}.png`)"
                    >
                </button>
            </div>

            <div
                v-if="searchSection !== 'Tags'"
                class="w-full flex flex-row gap-2 overflow-x-auto"
            >
                <button
                    v-for="character of filteredCharacters"
                    :key="character.name"
                    @click="addFilter(character.name, searchFilters.characters)"
                >
                    <card-component
                        :name="character.name"
                        :modal="false"
                        type="character"
                        class="w-16 h-16 rounded-full"
                    />
                </button>
            </div>
        </div>

        <div
            v-if="searchFilters.tags.length + searchFilters.characters.length > 0"
            class="w-full flex flex-row"
        >
            <div class="flex flex-row gap-2 overflow-x-auto">
                <button
                    v-for="tag of searchFilters.tags"
                    :key="tag"
                    @click="removeFilter(tag, searchFilters.tags)"
                >
                    <tag-bar
                        class="rounded-md text-center font-bold px-2 whitespace-nowrap"
                        :tag="tag"
                    />
                </button>
                <button
                    v-for="character of searchFilters.characters"
                    :key="character"
                    @click="removeFilter(character, searchFilters.characters)"
                >
                    <card-component
                        :name="character"
                        :modal="false"
                        type="character"
                        class="w-16 h-16 rounded-full"
                    />
                </button>
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

    if (searchFilters.characters?.length > 0) {
        decks = decks.filter((deck: any) => searchFilters.characters.every((character: string) => deck.characters.includes(character)))
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

        const characters = (await $content('cards').fetch() as any[]).filter((card: any) => card.type === 'Character Card')
        const filteredCharacters = characters

        return { codeMapping, decks, characters, filteredCharacters }
    },
    data () {
        return {
            search: '',
            searchSection: 'Tags',
            searchFilters: {
                tags: [] as string[],
                elements: [] as string[],
                factions: [] as string[],
                weapons: [] as string[],
                characters: [] as string[]
            },
            codeMapping: {} as { [key: string]: string},
            decks: [] as any[],
            characters: [] as any[],
            filteredCharacters: [] as any[]
        }
    },
    watch: {
        async search (search) {
            this.decks = await getDecks(this.$content, this.codeMapping, search, this.searchFilters)
        },
        searchFilters: {
            handler: async function (searchFilters) {
                this.decks = await getDecks(this.$content, this.codeMapping, this.search, searchFilters)

                let filteredCharacters = [...this.characters]

                if (searchFilters.elements.length > 0) {
                    filteredCharacters = filteredCharacters.filter((character: any) => searchFilters.elements.includes(character.element))
                }

                if (searchFilters.factions.length > 0) {
                    filteredCharacters = filteredCharacters.filter((character: any) => character.tags.some((tag: string) => searchFilters.factions.includes(tag)))
                }

                if (searchFilters.weapons.length > 0) {
                    filteredCharacters = filteredCharacters.filter((character: any) => searchFilters.weapons.includes(character.weapon))
                }

                this.filteredCharacters = filteredCharacters
            },
            deep: true
        }
    },
    methods: {
        removeFilter (filter: string, filterType: string[]) {
            filterType.splice(filterType.indexOf(filter), 1)
        },
        addFilter (filter: string, filterType: string[]) {
            if (filterType.includes(filter)) {
                this.removeFilter(filter, filterType)
            } else {
                filterType.push(filter)
            }
        }
    }
})
</script>
