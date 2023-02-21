<template>
    <div class="flex flex-col items-center">
        <p class="text-3xl font-genshin p-2">
            About
        </p>
        <nuxt-content
            class="bg-[#2D282F] border-2 border-[#584F65] rounded-xl p-5 pt-0 m-2 text-lg"
            :document="about"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AboutPage',
    async asyncData ({ $content }) {
        const about = await $content('about').fetch()

        return { about }
    }
})
</script>

<style lang="postcss" scoped>
::v-deep .nuxt-content p {
    @apply pt-5;
}
</style>
