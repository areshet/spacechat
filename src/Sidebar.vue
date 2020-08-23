<template>
    <nav id="sidebar">
        <ul>
            <router-link class="link" active-class="active" tag="li" to="/dashboard/profile">Мой профиль</router-link>
            <router-link class="link" active-class="active" tag="li" to="/dashboard/friends">Мой друганы</router-link>
            <router-link class="link" active-class="active" tag="li" to="/dashboard/messages">Сообщения</router-link>
            <router-link class="link" active-class="active" tag="li" to="/dashboard/search">Найти друганов</router-link>
        </ul>
    </nav>
</template>
<script>

export default {
    methods: {        
    },
    data() {
        return {

        }
    }
}
</script>
<style>
    #sidebar{
        width:100%;
        background: #bcbcbc52;
    }
    #sidebar ul{
        list-style: none;
        padding: 0 0px 15px 20px;
    }
    #sidebar ul li.link{
        padding: 5px;
        border-bottom: 1px solid;
        text-indent: 10px;
        cursor: pointer;
    }
    #sidebar ul li.link:hover{
        background: #000;
        color: #fff;
        font-weight: 600;
    }
    #sidebar .active{
        background: #000;
        color: #fff;
        font-weight: 600;
    }    
</style>