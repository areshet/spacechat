<template>
    <section>
        <h3> Настройки Профиля </h3>
        <b-form>
            <b-form-group
                id="input-group-1"
                label="Ваше имя:"
                label-for="setting-name">
                <b-form-input
                id="setting-name"
                v-model="profile.name"
                type="text"
                ></b-form-input>
                <b-form-invalid-feedback :force-show="!!errorMessage">{{ errorMessage }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Статус:"
                label-for="setting-status">
                <b-form-input
                id="setting-status"
                v-model="profile.status"
                type="text"
                placeholder="О чем ты думаешь?"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-3"
                label="Дата рождения:"
                label-for="setting-birth">
                <b-form-datepicker id="setting-datepicker" :value-as-date="true" v-model="profile.birth" class="mb-2"></b-form-datepicker>
            </b-form-group>
            <b-button type="button" @click="saveProfile" variant="primary">Сохранить</b-button>
        </b-form>
    </section>
</template>
<script>
export default {
     data() {
        return {
            profile: {},
            errorMessage: null
        }
    },
    async created() {
        const resp = await this.$rest.getUserName();
        this.profile = resp.result;
        if (this.profile.birth) {
            var date = new Date(this.profile.birth);
            this.profile.birth = date;
        }        
    },
    methods: {
        saveProfile() {
            if (!this.profile.name) {
                this.errorMessage = 'Поле "Имя" обязательно для заполнения';
                return;
            }
            //this.profile.birth.getTime()
            
            this.errorMessage = '';
        }
    }
}
</script>