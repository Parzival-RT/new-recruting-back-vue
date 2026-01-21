import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    showTopMenu:false,
    permission: '',
    page_permissions:''
  },
  mutations: {
    //syncrous
    setCurrentPermission(state, payload) {
      state.permission = payload;
    },
    setCurrentPermissions(state, payload) {
      state.page_permissions = payload;
    }
  },
  actions: {



    async setCurrentPermission(state) {
      if(localStorage.getItem('user')) {
        const token = JSON.parse(localStorage.getItem('user')).access_token;

        axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/check-user', {'data': localStorage.getItem('user')}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then((res) => {
              state.commit("setCurrentPermission", res.data.permission);
              state.commit("setCurrentPermissions", res.data.permissions);

            })
            .catch((error) => {

              localStorage.removeItem('user');
              this.$router.push('/signin')

            });
      }


    },


  },
  modules: {},
  getters: {
    getCurrentPermission: state => state.permission,
    getCurrentPermissions: state => state.page_permissions,
  }
});
