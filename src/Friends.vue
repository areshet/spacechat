<template>
    <section>
        <h3>Друзья</h3>
        <b-tabs content-class="mt-3">
            <b-tab title="Друзья" active>
                <AbstractList :methodRest="'getFriendList'" 
                              :list="friendsList"
                              @add="appendList(friendsList, $event)"
                              >
                    <div slot-scope="{item, index}">
                        <b-card :img-src="'/api/profile/' + item.login + '/avatar'" :img-alt="'Avatar '+item.name" img-left class="mb-3">
                            <b-card-text class="h4">
                                {{ item.name }}
                            </b-card-text>  
                            <b-button variant="primary" class="m-2">Написать</b-button>
                            <b-button variant="danger" @click="deleteFriend(item.login, index)" class="m-2">Удалить из друзей</b-button>
                        </b-card>
                    </div>
                </AbstractList>
            </b-tab>
            <b-tab :title="countFriendsIn">
                <AbstractList :methodRest="'getIncomingFriends'" 
                              :list="friendsListIn"
                              ref="incoming"
                              @add="appendList(friendsListIn, $event)">
                    <div slot-scope="{item, index}">
                        <b-card :img-src="'/api/profile/' + item.login + '/avatar'" :img-alt="'Avatar '+item.name" img-left class="mb-3">
                            <b-card-text class="h4">
                                {{ item.name }}
                            </b-card-text>
                            <b-button variant="primary" @click="addFriend(item.login, index)" class="m-2">Добавить</b-button>
                            <b-button variant="danger" @click="abortFriend(item.login, index)" class="m-2">Удалить</b-button>
                        </b-card>
                    </div>
                </AbstractList>
            </b-tab>
            <b-tab title="Исходящие">
                <AbstractList :methodRest="'getOutcomingFriends'" 
                              :list="friendsListOut"
                              ref="outcoming"
                              @add="appendList(friendsListOut, $event)">
                    <div slot-scope="{item, index}">
                        <b-card :img-src="'/api/profile/' + item.login + '/avatar'" :img-alt="'Avatar '+item.name" img-left class="mb-3">
                            <b-card-text class="h4">
                                {{ item.name }}
                            </b-card-text>
                            <b-button variant="danger" @click="cancelFriend(item.login, index)" class="m-2">Отменить заявку</b-button>
                        </b-card>
                    </div>
                </AbstractList>
            </b-tab>
        </b-tabs>

    </section>
</template>
<script>
import AbstractList from './components/friends/AbstractList.vue';
export default {
    components: { 
        AbstractList
    },
    data() {
        return {
            friendsList:    [],
            friendsListIn:  [],
            friendsListOut: [],
            titleFriendsIn: 'Входящие'
        }
    },
    computed: {
        countFriendsIn() {
            let count = this.friendsListIn.length;
            if (count == 0)
                return this.titleFriendsIn;

            return `${this.titleFriendsIn} (${count})`;
        }
    },
    methods: {
        async abortFriend(login, index) {
            const data = await this.$rest.abortFriend({ login : login });

            if (data.result) {
                this.friendsListIn.splice(index, 1);
            }
        },
        async addFriend(login, index) {
            const data = await this.$rest.acceptFriend({ login : login });

            if (data.result) {
                const friend = this.friendsListIn[index];
                this.friendsListIn.splice(index, 1);
                this.friendsList.push(friend);
            }
            
        },
        async deleteFriend(login, index) {
            const data = await this.$rest.deleteFriend({ login : login });

            if (data.result) {
                const friend = this.friendsList[index];
                this.friendsList.splice(index, 1);
                this.friendsListIn.push(friend);
            }  
        },
        async cancelFriend(login, index) {
            const data = await this.$rest.cancelFriend({ login : login });

            if (data.result) {
                this.friendsListOut.splice(index, 1);
            }  
        },

        appendList(source, list) {
            list.forEach(it => {
                source.push(it);
            })
        }
    },
    mounted() {
        this.$refs.incoming.infiniteHandler();
        this.$refs.outcoming.infiniteHandler();
    }
}
</script>