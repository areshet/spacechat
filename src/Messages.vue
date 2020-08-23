<template>
    <section class="row">
        <h3>{{ title }}</h3>
        <div class="col-6 block">
        </div>
        <div class="col-6 block">
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            name : null,
            title : 'Сообщения'
        }
    },
    async mounted() {
        const chat = await this.$rest.getChatList();
        console.log(chat)
    }
}
</script>
<style>
    section.row{
        padding: 0 15px;
    }
</style>