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
          <h5 class="card-header bg-transparent">კომპანიის მონაცემები</h5>
          <div class="card-body">

            <div class="row">
              <a href="/Details/create">
                 <button class="btn btn-primary float-end mb-3"> + დამატება</button>
              </a>
            </div>

            <div class="row">
            <div v-for="post in ResponseData" :key="post.id" style="cursor:pointer;" class="col-12 mt-2">

                <!-- Card -->
                <div @click="EditDetail(post.id)" class="card card-hover-shadow h-100">
                  <div class="card-body">
                    <div class="row align-items-center gx-2">
                      <div class="col">
                        <i class="tio-checkmark-circle-outlined font-weight-normal text-success display-4"></i>
                        <img v-if="post.company_logo" class="img-fluid border ms-2" style="width: 50px" :src="post.company_logo" alt="company logo">
                        <img v-if="post.company_logo == ''" class="img-fluid border ms-2" style="width: 50px" src="https://motivation.ge/img/no-logo.4b5a0eb5.jpeg" alt="company logo">

                        <span class="js-counter display-4 text-dark ms-2" ></span>
                      </div>
                      <div class="col-auto">
                        <span class="h5">
                          {{ post.name }}
                        </span>
                      </div>
                    </div>
                    <!-- End Row -->
                  </div>
                </div>
                <!-- End Card -->

            </div>
            </div>





          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Header from "@/components/Header";

export default {
  name: "index",
  components: {
    Header,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      ResponseData:{}
    }
  },
  methods:{

    onCancel() {
    },
    getResults() {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/details/get_all_details',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.isLoading = false;
            this.ResponseData = response.data;
          });
    },
    DeleteDetail(id){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.delete(process.env.VUE_APP_BACKEND_URL+'/auth/details/delete_detail_by_id/'+id,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.isLoading = false;
            location.reload();
          });
    },
    EditDetail(id){

      this.$router.push({ name: 'DetailsEdit', params: { id: id  } })
    },


  },
  computed: {
    getRole(){

      return this.$store.state.user_role;
    }
  },

  mounted() {

    this.getResults();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false
    }, 300)

  }
}
</script>

<style scoped>
.card-footer, .card-header {
  background: transparent!important;
}
</style>