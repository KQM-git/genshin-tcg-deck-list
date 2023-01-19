<template>
    <div
        class="w-full flex flex-row justify-center items-center gap-5 py-2 h-80 relative"
    >
        <card-component
            v-for="(card, i) in cards"
            :key="i"
            class="absolute top-3 h-60 w-[calc(15rem*7/12)] origin-[50%_130%]"
            :style="{ transform: `rotate(${10 * (1 - cards.length) + i * 20}deg)` }"
            :name="card"
            :modal="false"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'CardFan',
    props: {
        cards: {
            type: Array,
            required: true
        }
    }
})
</script>
