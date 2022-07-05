<template>
<v-app-bar app clipped-left>
    <v-app-bar-nav-icon @click.stop="$emit('change', drawer = !drawer)" />
    <v-toolbar-title>Dashboard</v-toolbar-title>
</v-app-bar>
</template>

<script>
export default {
    name: 'header-layout',
    data() {
        return {
            drawer: true
        }
    }
}
</script>
