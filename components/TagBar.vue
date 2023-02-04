<template>
    <div
        :class="({
            'Easy': 'bg-green-400',
            'Medium': 'bg-yellow-400',
            'Hard': 'bg-red-400',
            'Very Hard': 'bg-red-600'
        }[tag] || 'bg-kqm-purple')"
    >
        {{ tag }}
    </div>
</template>

<script lang="
        ts"
    >
import Vue from 'vue'

export default Vue.extend({
    props: {
        tag: {
            type: String,
            required: true
        }
    }
})
</script>
