<template>
    <div
        class="overflow-hidden"
    >
        <div
            :class="'bg-center bg-cover h-full w-full' + (modal ? ' cursor-pointer' : '')"
            :style="{
                backgroundImage: (gradient ? 'linear-gradient(to right, black, transparent), ' : '')
                    + `url(&quot;${require(`~/assets/cards/${name.replace(/[:*!?<>\/\\]/g, '')}.png`)}&quot;)`
            }"
            @click="showModal = true"
        />
        <div
            v-if="modal"
            v-show="showModal"
            class="bg-[#000000da] fixed inset-0 z-50 flex flex-row gap-10 justify-center items-center"
            @click="showModal = false"
        >
            <div
                class="relative w-full max-w-md pointer-events-none font-genshin"
            >
                <div
                    v-if="card.hp"
                    class="absolute -top-8 -left-8 w-16 h-16 bg-center bg-contain flex items-center justify-center font-genshin text-2xl"
                    :style="`backgroundImage: url(${require(`~/assets/icons/hp.png`)})`"
                >
                    <div
                        class="mt-3"
                        style="text-shadow: -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 1px 1px 0 #333"
                    >
                        {{ card.hp }}
                    </div>
                </div>
                <img
                    class="h-40 w-full object-cover object-[50%_30%] rounded-t-xl"
                    :src="require(`~/assets/cards/${name.replace(/[:*!?<>\/\\]/g, '')}.png`)"
                >
                <div class="flex flex-col p-5 bg-[#2D282F] border-x-2 border-b-2 border-[#584F65] rounded-b-xl min-h-[400px]">
                    <div class="w-full flex flex-row justify-between items-center">
                        <p class="text-2xl">
                            {{ name }}
                        </p>
                        <div v-if="card.tags?.length != 0" class="flex flex-row">
                            <img
                                v-for="tag of card.tags"
                                :key="tag"
                                class="w-12 h-12"
                                :src="require(`~/assets/icons/${tag}.png`)"
                            >
                        </div>
                    </div>
                    <div v-if="card.skills" class="w-full flex flex-col gap-5">
                        <div
                            v-for="skill of card.skills.filter(skill => skill.points[0].point_count > 0 || skill.name === 'Description')"
                            :key="skill.name"
                            class="w-full flex flex-col"
                        >
                            <div
                                class="flex flex-row items-center"
                            >
                                <img
                                    :src="require(`~/assets/skills/${skill.name.replace(/[:*!?<>\/\\]/g, '')}.png`)"
                                    class="w-12 h-12"
                                >
                                <p class="text-lg">
                                    {{ skill.name }}
                                </p>
                                <div
                                    v-for="point of skill.points.filter(point => point.point_count > 0)"
                                    :key="point.point_type"
                                    :style="`backgroundImage: url(${require(`~/assets/icons/cost/${point.point_type}.png`)}); text-shadow: -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 1px 1px 0 #333`"
                                    class="w-12 h-12 bg-center bg-contain flex justify-center items-center text-2xl"
                                >
                                    {{ point.point_count }}
                                </div>
                            </div>
                            <div class="skill-desc" v-html="skill.description" />
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="card.skills"
                class="flex flex-col gap-5 font-genshin max-w-md"
            >
                <div
                    v-for="skill of card.skills.filter(skill => skill.points[0].point_count === -1)"
                    :key="skill.name"
                    class="w-full p-5 bg-[#2D282F] border-2 border-[#584F65] rounded-xl"
                >
                    <div class="flex flex-row items-center">
                        <img
                            :src="require(`~/assets/skills/${skill.name.replace(/[:*!?<>\/\\]/g, '')}.png`)"
                            class="w-12 h-12"
                        >
                        <p class="text-lg">
                            {{ skill.name }}
                        </p>
                    </div>
                    <div class="skill-desc" v-html="skill.description" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        name: {
            type: String,
            required: true
        },
        gradient: {
            type: Boolean,
            default: false
        },
        modal: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            showModal: false,
            card: {} as any
        }
    },
    async fetch () {
        this.card = await this.$content('cards', this.name.replace(/[:*!?<>/\\]/g, '')).fetch() as any[]
    }
})

</script>

<style lang="postcss" scoped>
::v-deep .skill-desc {
    @apply -mt-3;
}

::v-deep .skill-desc > p {
    @apply mt-3;
}
</style>
