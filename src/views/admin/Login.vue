<template>
<div id="app">
    <v-app :dark="darkTheme" id="inspire">
        <v-container>
            <v-layout wrap>
                <v-flex sm12 md6 offset-md2>
                    <v-card elevation="4" light tag="section">

                        <v-card-text>
                            <v-form v-model="valid">
                                <v-text-field outline label="UserEmail" type="text" :rules="useremail_rule" :counter="100" v-model="form.email"></v-text-field>
                                <v-text-field outline hide-details label="Password" type="password" v-model="form.password"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions :class="{ 'pa-4': $vuetify.breakpoint.smAndUp }">
                            <v-spacer></v-spacer>
                            <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" @click="login">
                                Login
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</div>
</template>

<script>
import TokenService from '@/services/TokenService'
export default {
    name: 'login',
    data() {
        return {
            darkTheme: true,
            valid: false,
            form: {
                email: '',
                password: ''
            },
            useremail_rule: [
                v => !!v || 'Username is required',
                v => (v && v.length >= 2) || 'Username must be more than 2 characters',
                v => (v && v.length <= 100) || 'Username must be less than 10 characters',
            ],
        }
    },
    methods: {
        async login() {
            try {
                const response = await this.$api.post('login', {
                    email: this.form.email,
                    password: this.form.password
                })
                const res = response.data.data;
                if (res.token) {
                    TokenService.saveToken(res.token);
                    this.$router.push({
                        name: 'admin'
                    });
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>
