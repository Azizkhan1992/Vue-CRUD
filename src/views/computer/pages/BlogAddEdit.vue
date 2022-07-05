<template>
<v-container>
    <validation-observer ref="observer">
        <!-- v-slot="{ invalid }" -->

        <form @submit.prevent="submit">
            <v-tabs v-model="tabs.nameTab">
                <v-tab>Name</v-tab>
                <v-tab>Name uz</v-tab>
                <v-tab>Name ru</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs.nameTab">
                <v-tab-item>
                    <validation-provider v-slot="{ errors }" name="Name" rules="required|max:20">
                        <v-text-field v-model="form.name" :counter="20" :error-messages="errors" label="Name" required></v-text-field>
                    </validation-provider>
                </v-tab-item>
                <v-tab-item>
                    <validation-provider v-slot="{ errors }" name="NameUz" rules="required|max:20">
                        <v-text-field v-model="form.name_uz" :counter="10" :error-messages="errors" label="Name Uz" required></v-text-field>
                    </validation-provider>
                </v-tab-item>
                <v-tab-item>
                    <validation-provider v-slot="{ errors }" name="NameRu" rules="required|max:20">
                        <v-text-field v-model="form.name_ru" :counter="10" :error-messages="errors" label="Name ru" required></v-text-field>
                    </validation-provider>
                </v-tab-item>
            </v-tabs-items>

            <v-tabs v-model="tabs.descTab">
                <v-tab>Desc</v-tab>
                <v-tab>Desc uz</v-tab>
                <v-tab>Desc ru</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs.descTab">
                <v-tab-item>
                    <validation-provider v-slot="{ errors }" name="Desc" rules="required|max:50">
                        <v-text-field v-model="form.desc" :counter="50" :error-messages="errors" label="Desc" required></v-text-field>
                    </validation-provider>
                </v-tab-item>
                <v-tab-item>
                    <validation-provider v-slot="{ errors }" name="DescUz" rules="required|max:50">
                        <v-text-field v-model="form.desc_uz" :counter="50" :error-messages="errors" label="Desc Uz" required></v-text-field>
                    </validation-provider>
                </v-tab-item>
                <v-tab-item>
                    <validation-provider v-slot="{ errors }" name="DescRu" rules="required|max:50">
                        <v-text-field v-model="form.desc_ru" :counter="50" :error-messages="errors" label="Desc ru" required></v-text-field>
                    </validation-provider>
                </v-tab-item>
            </v-tabs-items>
            <br />

            <v-file-input color="deep-purple accent-4" label="File input" v-model="form.image" multiple placeholder="Select your files" prepend-icon="mdi-paperclip" outlined :show-size="1000" @change='uploadImage($event)'>
                <template v-slot:selection="{index, text}">
                    <v-chip v-if="index<2" color="deep-purple accent-4" dark label small>
                        {{text}}
                    </v-chip>

                    <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
                        +{{ form.featured_image.length-2 }} File(s)
                    </span>
                </template>
            </v-file-input>

            <v-text-field outline label="Monofacture" type="text" v-model="form.monofacture_id"></v-text-field>

            <v-btn class="ma-4" color="success" @click="send">
                {{ isEdit ? "Edit" : "Add" }}
            </v-btn>

        </form>
    </validation-observer>

</v-container>
</template>

<script>
import {
    required,
    digits,
    email,
    max,
    regex
} from 'vee-validate/dist/rules'
import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode
} from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
    ...email,
    message: 'Email must be valid',
})
export default {
    name: 'blog-add-edit',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        form: {
            name: null,
            desc: null,
            name_ru: null,
            desc_ru: null,
            name_uz: null,
            desc_uz: null,
            image: null,
            monofacture_id: null
        },
        tabs: {
            nameTab: null,
            descTab: null
        },
        statuses: [{
                id: 1,
                name: 'Active'
            },
            {
                id: 0,
                name: 'Inactive'
            }
        ],
        id: null,
        isEdit: false
    }),

    created() {
        this.getId();
        this.getArticle();
    },

    methods: {
        getId() {
            const id = this.$route.params.id;

            if (id) {
                this.id = id;
                this.isEdit = true;
            }
        },

        async getArticle() {
            try {
                if (this.isEdit) {
                    const response = await this.$api.get(`/v1/computers/${this.id}`)
                    this.form = response.data.data;
                    this.form.status = +this.form.status;
                }
            } catch (err) {
                console.log(err)
            }
        },

        send() {
            const image = this.form.image;
            this.form.image = image && Array.isArray(image) && image.length > 0 ? image[0] : null;

            const formData = new FormData();

            for (let item in this.form) {
                const element = this.form[item]
                if (Array.isArray(element)) {
                    for (let i = 0; i < element.length; i++) {
                        formData.append(`${item}[]`, element[i]);
                        // console.log(formData)
                    }
                } else {
                    // console.log(formData)
                    formData.append(item, element);
                }
            }

            if (!this.isEdit) {
                this.add(formData);
            } else {
                this.update(formData);
            }
        },

        add(formData) {
            return this.$api.post('/v1/computers', formData);
        },

        update(formData) {
            return this.$api.post(`/v1/computers/${this.id}?_method=PUT`, formData);
        },

        uploadImage(e) {
            console.log(e)
        }
        // submit () {
        //   this.$refs.observer.validate()
        // },
        // clear () {
        //   this.name = ''
        //   this.phoneNumber = ''
        //   this.email = ''
        //   this.select = null
        //   this.checkbox = null
        //   this.$refs.observer.reset()
        // },
    },
}
</script>
