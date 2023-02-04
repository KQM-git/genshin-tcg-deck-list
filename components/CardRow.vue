<template>
    <div class="w-full flex flex-row justify-center items-center gap-1 sm:gap-3 lg:gap-5 py-2">
        <card-component
            v-for="(card, i) in cards"
            :key="i"
            class="h-24 w-[calc(6rem*7/12)] sm:h-32 sm:w-[calc(8rem*7/12)] lg:h-60 lg:w-[calc(15rem*7/12)]"
            :name="card"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'CardRow',
    props: {
        cards: {
            type: Array,
            required: true
        }
    }
})
</script>
