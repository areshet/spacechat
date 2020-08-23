<template>
    <header class="row">
        <div class="col-3">
            <div class="sidebar-header">
                <h3>Super CHAT 2.0</h3>
            </div>
        </div>
        <div class="col-9 ">
            <div class="d-flex justify-content-end actions">
                <div class="user-name"> {{ profileName }} </div>
                <router-link class="fas fa-cog setting" tag="div" to="/dashboard/setting" />
                <div class="fas fa-sign-out-alt logout" @click="logout" title="Выйти"></div>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    props: {
        profileName: {
            type: String
        }
    },
    data() {
        return {
            name: null
        }  
    },
    methods: {
        async logout() {
            await this.$rest.logout();
            window.location.href = "/";
        }
    }
}
</script>
<style>
    header.row {
        background:#000;
        width: 100%;
        padding: 0 15px;
        margin: 0 15px;
        color: #fff;
    }
    header .setting {
        font-size: 1.3em;
        cursor: pointer;
    }
    header .setting:hover {
        color:#ffbcbc;
    }
    header .logout {
        font-size: 1.3em;
        cursor: pointer;
    }
    header .logout:hover{
        color:#ffbcbc;
    }

    header .actions {
        height: 100%;
        align-items: center;
    }

    header .actions * {
        margin-left: 1em;
    }
</style>