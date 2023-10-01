<template>
    <div class="w-full min-h-screen py-0.5 text-white">
        <div class="max-w-screen-lg mx-auto h-full">
            <NavBar />
            <Nuxt />
            <a href="https://www.netlify.com">
                <img
                    class="mx-auto p-3"
                    src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg"
                    alt="Deploys by Netlify"
                >
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'DefaultLayout',
    head () {
        return {
            bodyAttrs: {
                style: 'background-color: #232024'
            },
            script: [
                {
                    src: 'https://s.nitropay.com/ads-938.js',
                    async: true
                }
            ]
        }
    },
    mounted () {
        const wndw = window as any
        wndw.nitroAds = wndw.nitroAds || {
            createAd () {
                // @ts-ignore
                window.nitroAds.queue.push(['createAd', arguments])
            },
            queue: []
        }
        // @ts-ignore
        wndw.nitroAds.createAd('KQM-tcg', {
            refreshLimit: 10,
            refreshTime: 30,
            format: 'anchor',
            anchor: 'bottom',
            anchorPersistClose: false,
            report: {
                enabled: true,
                wording: 'Report Ad',
                position: 'top-right'
            },
            mediaQuery: '(min-width: 1025px), (min-width: 320px) and (max-width: 767px)'
        })
    }
})
</script>
