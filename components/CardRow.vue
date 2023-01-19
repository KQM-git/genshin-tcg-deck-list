<template>
    <div class="w-full flex flex-row justify-center items-center gap-5 py-2">
        <card-component
            v-for="(card, i) in cards"
            :key="i"
            class="h-60 w-[calc(15rem*7/12)]"
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
