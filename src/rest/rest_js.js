import axios from 'axios'

class RestApi{
    constructor() {
        this.__axios = axios.create({
            timeout: 1000
        });
    }


    async __request(url, data = {}, opts = {}) {
        const reqt = Object.assign({
            method: 'POST',
            headers: {
                'X-Access-Token': this.__token ||''
            }
        }, opts);

        reqt.url = url;
        reqt.data = data;
        reqt.validateStatus = () => true

        let error;
        let resp;

        try {
            resp = await this.__axios.request({
                method: 'POST',
                url,
                ...reqt,
            });

            const data = resp.data;

            return data;
        } catch (e) {
            error = e;
        }

        error.resp = resp;

        throw error;
    }

    login(data) {
        return this.__request('/user/login', data);
    }

    logout() {
        return this.__request('/user/logout');
    }

    registration(data) {
        return this.__request('/user/registration', data);
    }

    getUserName() {
        return this.__request('/api/profile/get');
    }

    getFriendList(data) {
        return this.__request('/api/friends/list', data);
    }

    checkLogin() {
        return this.__request('/api/session/check');
    }

    searchFriends(data) {
        return this.__request('/api/friends/search', data);
    }

    cancelFriend(data) {
        return this.__request('/api/friends/request/cancel', data);
    }

    abortFriend(data) {
        return this.__request('/api/friends/request/abort', data);
    }

    addFriend(data) {
        return this.__request('/api/friends/add', data);
    }

    deleteFriend(data) {
        return this.__request('/api/friends/remove', data);
    }

    getIncomingFriends(data) {
        return this.__request('/api/friends/request/list/in', data);
    }

    getOutcomingFriends(data) {
        return this.__request('/api/friends/request/list/out', data);
    }

    acceptFriend(data) {
        return this.__request('/api/friends/request/accept', data);
    }

    getChatList() {
        return this.__request('/api/chat/list');
    }
}


export default RestApi;