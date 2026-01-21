<template>
    <div>
      <loading :active.sync="isLoading"
               :can-cancel="true"
               :on-cancel="onCancel"
               :is-full-page="fullPage"></loading>
      <Header/>
      <div v-show="!isLoading" class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
        <div class="container-fluid p-4">
  
          <div class="row mb-3">
            <!-- Col -->
            <div class="col-6">
              <h1 class="page-title">FAQ</h1>
            </div>
            <!-- End Col -->
            <!-- Col -->
            <div class="col-6 text-end">
              <router-link :to="'/create_FAQ/'+this.$route.params.id">
                <button class="btn btn-primary"> + დამატება</button>
              </router-link>
            </div>
            <!-- End Col -->
          </div>
  
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center bg-light">
              FAQ ჩამონათვალი
              <!-- <div class="input-group w-50">
                <input type="text" class="form-control" v-model="keyword" :options="ResponseData" placeholder="ძებნა" aria-label="ძებნა" aria-describedby="button-addon2">
                <button class="btn btn-outline-primary d-none" type="button" id="button-addon2"><i class="tio-search"></i></button>
              </div> -->
            </div>
            <div class="card-body">
  
              <div class="row">
                <div class="col-12 mt-2">
  
                  <table class="table">
                    <thead>
                        <tr>
                            <th>დასახელება</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    <tr v-for="item in ResponseData" :key="item.id">
                      <td>
                        {{item.sort + ') ' + item.name }}
                      </td>
                      <td>
                        <div class="row align-items-center">
                          <div class="col-8">
                            <!-- {{ item.TraningDetail.text }} -->
                          </div>
                          <!-- Action -->
                          <div class="col-4 d-flex justify-content-end">
                            <button @click="EditDetail(item.id)" class="btn btn-yellow me-1">
                              <span class="d-none d-md-block">რედაქტირება</span>
                              <i class="tio-edit d-block d-md-none"></i>
                            </button>
                            <div class="btn btn-danger" data-bs-toggle="modal" :data-bs-target="'#deletePosition_'+item.id">
                              <span class="d-none d-md-block">წაშლა</span>
                              <i class="tio-clear d-block d-md-none"></i>
                            </div>
                            <!-- Delete Modal -->
                            <div class="modal fade" :id="'deletePosition_'+item.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">FAQ ის წაშლა</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                    ნამდვილად გსურთ FAQ ის  წაშლა?
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">გაუქმება</button>
                                    <button @click="deleteDataById(item.id)" class="btn btn-danger">წაშლა</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End Delete Modal -->
                          </div>
                          <!-- End Action -->
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>

  
                </div>
              </div>
  
  
  
  
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import axios from "axios";
  
  export default {
    name: "index",
    components: {
      Header,
      Loading
    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        ResponseData:[],
        keyword: ''
      }
    },
    mounted() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 300);
      this.getResults()
    },
    methods: {
      onCancel() {
      },
      getResults() {
        this.isLoading = true;
        const token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/Faq/GetList/'+this.$route.params.id, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then(response => {
              this.isLoading = false;
              this.ResponseData = response.data;
            });
      },
      deleteDataById(id){
        const token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.delete(process.env.VUE_APP_BACKEND_URL+'/auth/Faq/delete/'+id, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then((res) => {
              location.reload()
            })
            .catch((error) => {
  
  
            });
      },
      EditDetail(id){
        this.$router.push({ path: '/FAQ_edit/'+id })
      },
    }
  }
  </script>
  
  <style scoped>
  .card-header {
    border-top-left-radius: 0.75rem!important;
    border-top-right-radius: 0.75rem!important;
  }
  </style>
  