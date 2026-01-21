<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :is-full-page="fullPage"></loading>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card">
          <div class="card-header font-weigt-bold py-3">
            მომხმარებლის რედაქტირება
          </div>
          <div class="card-body">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form v-on:submit.prevent="handleSubmit(submitForm)" class="row gap-3">
                <!-- Col -->
                <div class="col-12">
                  <label class="font-weigt-bold" for="name">სახელი და გვარი</label>
                  <input class="form-control" name="id" v-model="form.name" id="name" type="text" placeholder="სახელი და გვარი">
                </div>
                <!-- Col -->
                <div class="col-12">
                  <label class="font-weigt-bold" for="email">ელ.ფოსტა</label>
                  <input class="form-control" name="id" v-model="form.email" id="email" type="email" placeholder="ელ.ფოსტა">
                </div>
                <!-- Col -->
                <div class="col-12">
                  <label class="font-weigt-bold" for="mobile">მობილურის ნომერი</label>
                  <input class="form-control" name="id" v-model="form.mobile" id="mobile" type="number" placeholder="მობილურის ნომერი">
                </div>
                <!-- Col -->
                <div class="col-12">
                  <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                    <label class="font-weigt-bold" for="password">პაროლი</label>
                    <input class="form-control" name="id" v-model="form.password" id="password" type="password" placeholder="პაროლი">
                    <span  class="text-danger d-block" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>
                <div class="col-12 mt-3">
                  <button class="btn btn-primary me-1"><i class="tio-edit"></i> რედაქტირება</button>
                  <router-link to="/UserList" class="btn btn-outline-blue"><i class="tio-back-ui"></i> გაუქმება</router-link>
                </div>
                <!-- End Col -->
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header.vue'
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "Edit",
  data () {
    return {
      isLoading: false,
      fullPage: true,
      showTopMenu: false,
      form: {
        password: ''
      }
    }
  },
  components: {
    Header,
    Loading
  },
  methods: {
    submitForm(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;

      axios.put(process.env.VUE_APP_BACKEND_URL+'/auth/Users/update_password/'+this.$route.params.id, this.form , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
            this.isLoading = false;
            this.$router.push('/UserList');
          })
          .catch((error) => {
            this.isLoading = false;


          });

    },
    getUserDataById(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/Users/get_by_id/'+this.$route.params.id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
            window.scroll(0,0);
            this.isLoading = false;
            this.form=res.data;
          })
          .catch((error) => {
            this.isLoading = false;


          });
    }
  },
  mounted() {
    this.getUserDataById();
  }
}
</script>

<style scoped>
.card-header {
  background: transparent!important;
}
.card-footer {
  background: transparent!important;
}
</style>