<template>
<div id="table">
    <v-simple-table fixed-header height="300px">
        <thead>
            <tr align="right">
                <th>
                    <router-link to="/admin/computer/add">
                        <v-btn depressed color="primary">
                            Add Product
                        </v-btn>
                    </router-link>

                </th>
            </tr>
            <tr>
                <th class="text-left">
                    <h3>Products</h3>
                </th>
                <th class="text-center">
                    <h3>Description</h3>
                </th>
                <th class="text-left">
                    <h3>Actions</h3>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, idx) in products" :key="idx">
                <td>{{ product.name_oz }}</td>
                <td>{{ product.desc_uz }}</td>
                <td>

                    <v-icon small class="mr-2" @click="editItem()">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>

                </td>
            </tr>
        </tbody>
    </v-simple-table>
</div>
</template>

<script>
export default {
    name: 'BlogIndex',
    data: () => ({
        products: [],
    }),

    created() {
        this.initialize()
    },

    methods: {
        async initialize() {
            try {
                const response = await this.$api.get('/v1/computers')

                this.products = response.data.data
            } catch (err) {
                console.log(err)
            }

        },

        // done(e) {
        //     e.forEach((elem) => {
        //         return elem;
        //     })
        // }
    },
}
</script>

<style>
#table {
    width: 1000px;
    float: right;
}
</style>
