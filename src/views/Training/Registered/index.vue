<template>
    <div>
      <loading :active.sync="isLoading"
               :can-cancel="true"
               :on-cancel="onCancel"
               :is-full-page="fullPage"></loading>
      <Header/>
      <div v-show="!isLoading" class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
        <div class="container-fluid p-4">
  
          <div class="row mb-4 g-3">
            <!-- Col -->
            <div class="col-12">
              <h1 class="page-title">კურსზე რეგისტრირებული მომხმარებელი</h1>
            </div>
            <!-- End Col -->

            <!-- Col -->
            <div class="col-4">
                <div class="card bg-primary">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-white"> რაოდენობა</h6>
                        <h5 class="card-title text-white"><i class="tio-group-equal"></i> {{ ResponseData.total }}</h5>
                    </div>
                </div>
            </div>
            <!-- End Col -->
          </div>
  
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center bg-light">
              რეგისტრირებულები
              <!-- <div class="input-group w-50">
                <input type="text" class="form-control" v-model="keyword" :options="ResponseData" placeholder="ძებნა" aria-label="ძებნა" aria-describedby="button-addon2">
                <button class="btn btn-outline-primary d-none" type="button" id="button-addon2"><i class="tio-search"></i></button>
              </div> -->
            </div>
            <div class="card-body">
  
              <div class="row">
                <div class="col-12">
                  <button class="btn btn-primary" @click="copy('for_excel')">დაკოპირება ექსელისთვის</button>
                  <p v-if="copyButton" class="text-success">დაკოპირებულია</p>
                </div>
                <div class="col-12 mt-2">
  
                  <div class="table-responsive">
                    <table class="table " style="width: 200%;" id="for_excel">
                        <thead>
                            <tr>
                                <th>პაკეტი</th>
                                <th>მოსწავლის სახელი და გვარი</th>
                                <th>თარიღი</th>
                                <th>მოსწავლის ტელ.ნომერი</th>
                                <th>მოსწავლის ელ.ფოსტა</th>
                                <th>მოზარდის ასაკი</th>
                                <th>მოსწავლის ასაკი</th>
                                <th>მშობლის სახელი და გვარი</th>
                                <th>მშობლის ელ.ფოსტა</th>
                                <th>მშობლის ტელ.ნომერი</th>
                                <th>მოკლე აღწერა</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="post in ResponseData.data" :key="post.id">
                                <td><div v-if="post.PackageInfo">{{ post.PackageInfo.name + ': ' + post.PackageInfo.price + '₾' }} </div></td>
                                <td><div>{{ post.name }} </div></td>
                                <td>
                                    <div>{{ new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) }} </div>
                                </td>
                                <td> 
                                    <div>{{ post.mobile }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.email }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.age }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.age_type }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.parent_name }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.parent_email }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.parent_mobile }}</div>
                                </td>
                                <td>
                                    <div>{{ post.comment }}</div>
                                </td>
                            </tr>
                        </tbody>
                  </table>
                  </div>
  
  
                  <pagination :data="ResponseData" 	 @pagination-change-page="getResults">
  
                  </pagination>
  
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
        keyword: '',
        copyButton: false
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
      getResults(page = 1) {
        this.isLoading = true;
        const token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/traning/GetList/Signup/' + this.$route.params.id + '?page=' + page, {
          //   params: {
          //     keyword: this.keyword
          //   },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            this.isLoading = false;
            this.ResponseData = response.data;

            //   var inputDateStr = "2023-10-23 15:04:32.000000";

            //   // Parse the input date string
            //   var inputDate = new Date(inputDateStr);

            //   // Format the date as "YYYY-MM-DD"
            //   var formattedDate = inputDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

            //   this.ResponseData.created_at = formattedDate;

          });
      },
      copy(id) {
        var r = document.createRange();
        r.selectNode(document.getElementById(id));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        this.copyButton = true;
        setTimeout(() => this.copyButton=false, 3000);
      }
    }
  }
  </script>
  
  <style scoped>
  .card-header {
    border-top-left-radius: 0.75rem!important;
    border-top-right-radius: 0.75rem!important;
  }
  </style>
  