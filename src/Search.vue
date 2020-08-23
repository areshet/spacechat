<template>
    <section>
        <div>
            <h3>Найти друганов</h3>
            <div class="row list">
                <div class="col-4 mb-3" v-for="item in friendsList" :key="item.login">
                    <b-card
                        :title="item.name"
                        :img-src="'/api/profile/' + item.login + '/avatar'"
                        :img-alt="item.name + ' ava'"
                        img-top
                        tag="div"
                    >
                        <b-card-text>
                            {{ item.message }}
                        </b-card-text>

                        <b-button href="#" variant="primary" @click="add(item.login)" v-if="item.status == 'NOT_FRIEND'">Добавить</b-button>
                        <b-button href="#" variant="danger" @click="cancel(item.login)" v-if="item.status == 'REQUESTED'">Отменить</b-button>
                    </b-card>
                </div>
            </div>
            <infinite-loading @distance="1" @infinite="infiniteHandler">
                <span slot="no-more"></span>
            </infinite-loading>
        </div>     
    </section>
</template>
<script>
export default {
    data() {
        return {
            friendsList : [],
            pagination: {
                currentPage: 0,
                showPerPage: 20
            }
        }
    },
    methods: {
        async cancel(login) {
            const data = await this.$rest.cancelFriend({login: login});
            if (data.result) {
                let item = this.friendsList.find((item) => { 
                    return item.login == login
                });
                item.status = 'NOT_FRIEND';
            }
        },
        async add(login) {
            const data = await this.$rest.addFriend({login: login});
            if (data.result) {
                let item = this.friendsList.find((item) => { 
                    return item.login == login
                });
                item.status = 'REQUESTED';
            }
        },
        async infiniteHandler($state) {
            const resp = await this.$rest.searchFriends(this.pagination);
            resp.result.data.forEach(it => {
                this.friendsList.push(it);
            });

            if (resp.result.data.length > 0) {
                $state.loaded();
            } else {
                $state.complete();
            }
            this.pagination.currentPage++;
        }
    }
}
</script>
<style scoped>

</style>