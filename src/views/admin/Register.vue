<template>
<v-app id="inspare">
    <v-container>
        <v-layout wrap>
            <v-flex sm6 md9 offset-md1>
                <v-card elevation="12" light tag="section">
                    <v-card-text>
                        <v-form v-model="valid">
                            <v-text-field v-model="form.name" :counter="10" :rules="nameRules" label="Ism" required></v-text-field>

                            <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" required></v-text-field>

                            <v-text-field outline hide-details :rules="passwordRules" required label="Paroll" type="password" v-model="form.password"></v-text-field>

                            <v-btn color="primary" class="mr-4" @click="register">
                                Register
                            </v-btn>

                        </v-form>
                    </v-card-text>
                </v-card>

                <v-divider></v-divider>

            </v-flex>
        </v-layout>
    </v-container>
</v-app>
</template>

<script>
export default {
    data: () => ({
        form: {
            name: null,
            email: null,
            password: null
        },
        valid: true,
        nameRules: [
            v => !!v || 'Ism kiritilishi shart',
            v => (v && v.length <= 10) || "Ism 10 harfdan kam bo'lmasligi kerak",
        ],
        emailRules: [
            v => !!v || 'E-mail kiritilishi shart',
            v => /.+@.+\..+/.test(v) || "E-mail to'g'ri kiritilishi shart",
        ],
        passwordRules: [
            v => !!v || 'Paroll kiritilishi shart'
        ]
      
    }),

    methods: {
        async register() {
            try {
                const response = await this.$api.post('register', this.form);
                this.$router.push('/login');
                console.log(response);
            } catch (err) {
                console.log(err)
            }
        }
    },
}
</script>
