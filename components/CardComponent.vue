<template>
    <div
        class="bg-center bg-cover"
        :style="{
            backgroundImage: (gradient ? 'linear-gradient(to right, black, transparent), ' : '')
                + `url(&quot;${require(`~/assets/cards/${name.replace(/[:!]/g, '')}.png`)}&quot;)`
        }"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
        @mousemove="mouseMove"
    >
        <div
            v-show="isHover"
            class="fixed z-20 w-96 pointer-events-none"
        >
            <img
                class="h-40 w-full object-cover rounded-t-xl"
                :src="require(`~/assets/cards/${name.replace(/[:!]/g, '')}.png`)"
            >
            <div class="flex flex-col p-5 bg-[#2D282F] border-x-2 border-b-2 border-[#584F65] rounded-b-xl">
                <div class="w-full">
                    <p class="font-genshin text-2xl">
                        {{ name }}
                    </p>
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
        }
    },
    data () {
        return {
            isHover: false
        }
    },
    methods: {
        mouseMove (e: any) {
            const offset = 20 // px

            if (e.clientX + offset + e.target.childNodes[0].offsetWidth > document.documentElement.clientWidth) {
                e.target.childNodes[0].style.left = 'unset'
                e.target.childNodes[0].style.right = `${document.documentElement.clientWidth - e.clientX + offset}px`
            } else {
                e.target.childNodes[0].style.left = `${e.clientX + offset}px`
                e.target.childNodes[0].style.right = 'unset'
            }

            if (e.clientY + offset + e.target.childNodes[0].offsetHeight > document.documentElement.clientHeight) {
                e.target.childNodes[0].style.top = 'unset'
                e.target.childNodes[0].style.bottom = `${document.documentElement.clientHeight - e.clientY + offset}px`
            } else {
                e.target.childNodes[0].style.top = `${e.clientY + offset}px`
                e.target.childNodes[0].style.bottom = 'unset'
            }
        }
    }
})

</script>
