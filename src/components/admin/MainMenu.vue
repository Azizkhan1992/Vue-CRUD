<template>
<v-navigation-drawer v-model="toggle" app clipped>
    <v-list dense>

        <v-list-item>
            <v-list-item-action>

                <v-icon large color="orange darken-2">mdi-view-dashboard</v-icon>

            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item to="/admin/computer">
            <v-list-item-action>
                <v-icon large color="orange darken-2">mdi-newspaper</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Computers</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

         <v-list-item to="/admin/book">
            <v-list-item-action>
                <v-icon large color="orange darken-2">mdi-newspaper</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Books</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item>
            <v-list-item-action>
                <v-icon large color="orange darken-2">
                    mdi-arrow-up-bold-box-outline
                </v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Categories</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

    </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
    name: 'main-menu',
    props: {
        toggle: {
            type: Boolean,
            default: true
        }
    }
}
</script>
