<template>
<div id="app">
    <v-app>
        <header-layout @change="toggleMenu($event)" />
        <main-menu :toggle="isOpen" />

        <v-main>
            <router-view />
        </v-main>

        <footer-layout />
    </v-app>
</div>
</template>

<script>
import HeaderLayout from './HeaderLayout.vue'
import MainMenu from './MainMenu.vue'
import FooterLayout from './FooterLayout.vue'
export default {
    name: 'main-dashboard-layout',
    components: {
        HeaderLayout,
        MainMenu,
        FooterLayout
    },
    data() {
        return {
            isOpen: true
        }
    },
    methods: {
        toggleMenu(e) {
            this.isOpen = e;
        }
    }
}
</script>
