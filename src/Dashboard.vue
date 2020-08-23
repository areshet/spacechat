<template>
    <div class="container">
        <div class="row">
            <Header :profile-name="profile.name" />
        </div>
        <div class="row">
            <div class="col-md-3">
                <Sidebar />    
            </div>
            <div class="col-md-9">
                <router-view />
            </div>
        </div>
            
        <section>
        </section>
    </div>
</template>
<script>
import Sidebar from './Sidebar.vue';
import Header from './DashbordHeader.vue';
export default {
    components: { Sidebar, Header },
    data() {
        return {
            profile: {}
        }
    },
    async created() {
        const resp = await this.$rest.getUserName();
        this.profile = resp.result;
    }
    
}
</script>
<style>
    section h3 {
        margin: 0.5em 0;
    }
</style>