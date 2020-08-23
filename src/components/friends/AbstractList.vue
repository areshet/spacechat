<template>
    <div>
        <div v-for="(item, index) in list" :key="item.login">
            <slot :item="item" :index="index"/>
        </div>
        <div v-if="list.length == 0">Нет заявок</div>
        <infinite-loading @distance="1" @infinite="infiniteHandler">
            <span slot="no-more"></span>
            <span slot="no-results"></span>
        </infinite-loading>
    </div>
</template>
<script>
export default {
    props: {
        methodRest: {
            type: String,
            required: true
        },
        currentPage: {
            type: Number,
            default: 0
        },
        showPerPage: {
            type: Number,
            default: 20
        },
        list: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            page: 0,
            perPage: 20
        }
    },
    methods: {
        async infiniteHandler($state) {
            const resp = await this.$rest[this.methodRest]({ 
                currentPage: this.page,
                showPerPage: this.perPage
            });

            this.$emit('add', resp.result.data);

            if ($state) {
                if (resp.result.data.length > 0) {
                    $state.loaded();
            } else {
                    $state.complete();
                }           
            }            

            this.page++;
        }
    },
    async created() {
        this.perPage = this.showPerPage;
        this.page = this.currentPage;
    }
}
</script>
<style scoped>
    .card img {
        width:150px;
    }
</style>