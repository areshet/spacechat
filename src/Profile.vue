<template>
    <section>
        <h3>Мой Профиль</h3>
        <b-card :img-src="'/api/profile/' + profile.login + '/avatar'" 
                :title="profile.name" 
                img-alt="Card image" 
                img-left 
                class="mb-3">
            <b-card-sub-title class="mb-2">{{ profile.status }}</b-card-sub-title>        
            <b-card-text>
              {{ birthToAge }}
            </b-card-text>
        </b-card>

        <b-modal id="modal-1" title="BootstrapVue">
            <p class="my-4">Hello from modal!</p>
        </b-modal>
    </section>
</template>
<script>
export default {
    data() {
        return {
            profile : {}
        }
    },
    async created() {
        const resp = await this.$rest.getUserName();
        this.profile = resp.result;
    },
    computed: {
        birthToAge() {     
            if(this.profile.birth) {
                let todayInMilli = Math.round(new Date()/1000);
                let ageInMilli = todayInMilli - this.profile.birth/1000;
                return `Ваш возраст: ${Math.floor(ageInMilli / (60 * 60 * 24 * 365))}`;
            }
            
            return null;   
        }
    },
}
</script>
<style scoped>
    .card img {
        width: 300px;
    }
</style>