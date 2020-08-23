import Registration from './Registration.vue'
import Login from './Login.vue';
import Dashboard from './Dashboard.vue';
import Profile from './Profile.vue';
import Friends from './Friends.vue';
import Messages from './Messages.vue';
import Search from './Search.vue';
import Setting from './Setting.vue';


const routes = [
    {path: '/reg', component: Registration},
    {path: '/', component: Login},
    {path: '/dashboard', redirect: '/dashboard/profile', component: Dashboard,
        children: [{
            path: 'profile',
            component: Profile
        }, {
            path: 'friends',
            component: Friends
        }, {
            path: 'messages',
            component: Messages
        }, {
            path: 'search',
            component: Search
        }, {
            path: 'setting',
            component: Setting
        }]
    },
];
export default routes;