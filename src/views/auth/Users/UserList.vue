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
          <div class="card-header d-flex justify-content-between align-items-center py-3">
            <span class="font-weigt-bold">მომხმარებლების სია</span>
            <button class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="tio-search"></i> <span class="d-none d-md-inline">ფილტრი</span></button>
            <router-link to="/Add_User" class="btn btn-outline-primary d-none"><i class="tio-user-add"></i> <span class="d-none d-md-inline">დამატება</span></router-link>
          </div>
          <div class="card-body d-block overflow-auto p-0">
            <table class="table table-responsive">
              <thead class="bg-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">სახელი, გვარი</th>
                <th scope="col">ელ.ფოსტა</th>
                <th scope="col">ქმედება</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in UserData.data" :key="item.id">
                <th scope="row">{{ item.id }}</th>
                <td>
                  <span class="d-block">{{ item.name }}</span>
                  <span v-if="item.mobile != null">{{ item.mobile }}</span>
                  <span v-else>მობილური არ აქვს</span>
                </td>
                <td>{{ item.email }}</td>
                <td><router-link :to="'/UserEdit/'+item.id+'/Edit'" target="_blank" class="btn btn-white border"><i class="tio-edit"></i> <span class="d-none d-md-inline">რედაქტირება</span></router-link> </td>
              </tr>
              </tbody>
            </table>

          </div>
          <div class="card-footer pt-2 border-top-0">
            <pagination :data="UserData" show-disabled :limit="5" @pagination-change-page="getUserResults">
              <template #prev-nav>
                <span>წინ</span>
              </template>
              <template #next-nav>
                <span>შემდეგ</span>
              </template>
            </pagination>
          </div>
        </div>
      </div>
    </div>


    <!-- User List Filter Right Canvas  -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header border-bottom">
        <h5 id="offcanvasRightLabel">ფილტრი</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body pb-4" style="height: calc(100% - 9rem);">
        <form ref="form" class="row" style="gap: 20px 0">

          <div class="col-12">
            <label class="font-weigt-bold" for="name">სახელი და გვარი</label>
            <input class="form-control" v-model="form.name" name="name" id="name" type="text" placeholder="სახელი და გვარი">
          </div>
          <!-- Col -->
          <div class="col-12">
            <label class="font-weigt-bold" for="email">ელ.ფოსტა</label>
            <input class="form-control" v-model="form.email" id="email" name="email" type="text" placeholder="ელ.ფოსტა">
          </div>
          <!-- Col -->
          <div class="col-12">
            <label class="font-weigt-bold" for="mobile">ტელეფონის ნომერი</label>
            <input class="form-control" v-model="form.mobile" name="mobile" id="mobile" type="text" placeholder="ტელეფონის ნომერი">
          </div>
          <!-- End Col -->
        </form>
      </div>
      <div class="offcanvas-body d-flex gap-1 position-absolute bottom-0 w-100 bg-white border-top">
        <button class="btn btn-primary w-100" @click="filter">გაფილტრე</button>
        <button class="btn btn-light w-100" @click="ClearFilter" data-bs-dismiss="offcanvas" aria-label="Close">გასუფთავება</button>
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
  name: "UserList",
  data () {
    return {
      isLoading: false,
      fullPage: true,
      showTopMenu: false,
      UserData: {},
      form: {
        name: this.$route.query.name,
        email: this.$route.query.email,
        mobile: this.$route.query.mobile
      }
    }
  },
  components: {
    Header,
    Loading
  },
  methods: {
    onCancel() {
    },
    getUserResults(page = 1) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/Users/LoadData' +'?page=' + page,{
        params: {
          name:this.$route.query.name,
          email:this.$route.query.email,
          mobile:this.$route.query.mobile,
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            window.scroll(0,0);
            this.isLoading = false;
            this.UserData = response.data;
          });
    },
    filter : function(){
      this.$refs.form.submit();
    },
    ClearFilter(){
      this.$router.push(this.param);
      this.form.name='';
      this.form.email='';
      this.form.mobile='';
      this.$route.query.name='';
      this.$route.query.email='';
      this.$route.query.mobile='';
      this.getUserResults();

    },
  },
  mounted() {
    this.getUserResults();
  }
}
</script>

<style scoped>
thead tr {
  vertical-align: middle;
  font-family: var(--Third-Font);
  font-size: 15px;
}
tbody tr {
  vertical-align: middle;
  font-family: var(--Third-Font);
  font-size: 15px;
}
tbody tr td span:nth-of-type(1) {
  font-weight: bold;
}
tbody tr td .btn {
  /*width: 170px;*/
  font-size: 15px;
  font-weight: 500;
}
.card-header {
  background: transparent!important;
}
.card-footer {
  background: transparent!important;
}
@media screen and (min-width: 767px) {
  tbody tr td .btn {
    width: 170px;
  }
}
</style>