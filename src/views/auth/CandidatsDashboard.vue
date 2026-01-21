<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"></loading>
    <Header/>
    <section class="main vacancy vacancy_dashboard" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="row align-items-center">
          <div v-if="!isLoading" class="col-12">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-primary"><a href="/MyVacancy/published">ვაკანსია</a></li>
                <li class="breadcrumb-item" aria-current="page">{{ result_data.position.name}} </li>
              </ol>
            </nav>
          </div>

          <!-- Col-1 -->
          <div class="col-12 mt-3">
            <a :href="'/Candidats/'+id+'/won'">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="tio-star font-weight-normal display-4 text-blue-custom"></i>
                      <span class="js-counter display-4 text-dark ms-2" :data-value="LoadCounts.won">{{ LoadCounts.won }}</span>
                    </div>
                    <div class="col-auto">
                        <span class="h5">
                         აყვანილი კანდიდატები
                        </span>
                    </div>
                  </div>
                  <!-- End Row -->
                </div>
              </div>
              <!-- End Card -->
            </a>
          </div>
          <!-- End Col-1 -->

          <!-- Col-1 -->
          <div class="col-12 mt-3">
            <a :href="'/Candidats/'+id+'/closing'">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="tio-users-switch font-weight-normal display-4 text-success"></i>
                      <span class="js-counter display-4 text-dark ms-2" :data-value="LoadCounts.closing">{{ LoadCounts.closing }}</span>
                    </div>
                    <div class="col-auto">
                        <span class="h5">
                          საუკეთესო კანდიდატები
                        </span>
                    </div>
                  </div>
                  <!-- End Row -->
                </div>
              </div>
              <!-- End Card -->
            </a>
          </div>
          <!-- End Col-1 -->

          <!-- Col-2 -->
          <div class="col-12 mt-2">
            <a :href="'/Candidats/'+id+'/meeting'">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="tio-appointment font-weight-normal text-warning display-4"></i>
                      <span class="js-counter display-4 text-dark ms-2" :data-value="LoadCounts.meeting">{{ LoadCounts.meeting }}</span>
                    </div>
                    <div class="col-auto">
                      <span class="h5">
                        შესახვედრი კანდიდატები
                      </span>
                    </div>
                  </div>
                  <!-- End Row -->
                </div>
              </div>
              <!-- End Card -->
            </a>
          </div>
          <!-- End Col-2 -->

          <!-- Col-3 -->
          <div class="col-12 mt-2 mb-4">
            <a :href="'/Candidats/'+id+'/offers'">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="tio-user-add font-weight-normal display-4"></i>
                      <span class="js-counter display-4 text-dark ms-2" :data-value="LoadCounts.offer">{{ LoadCounts.offer }}</span>
                    </div>
                    <div class="col-auto">
                      <span class="h5">
                        განსახილველი რეზიუმები
                      </span>
                    </div>
                  </div>
                  <!-- End Row -->
                </div>
              </div>
              <!-- End Card -->
            </a>
          </div>
          <!-- End Col-3 -->

          <!-- Col-4 -->
          <div class="col-12 mt-2">
            <a :href="'/Candidats/'+id+'/rejects'">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="fa fa-thumbs-down font-weight-normal text-danger display-4"></i>
                      <span class="js-counter display-4 text-dark ms-2" :data-value="LoadCounts.rejects">{{ LoadCounts.rejects }}</span>
                    </div>
                    <div class="col-auto">
                      <span class="h5">
                        უარყოფილი კანდიდატები
                      </span>
                    </div>
                  </div>
                  <!-- End Row -->
                </div>
              </div>
              <!-- End Card -->
            </a>
          </div>
          <!-- End Col-4 -->

        </div>
      </div>
    </section>

  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from "axios";
export default {
  name: "CandidatsDashboard",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      isActive: true,
      id:this.$route.params.id,
      LoadCounts:[],
      result_data:{
        IndustryDetail:{
          text:'',
          id:''
        },
        position:{

        }
      }
    }
  },
  components: {
    Header,
    Loading
  },
  methods:{
    LoadCount(){

      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/vacancy/get_count_candidates/'+this.$route.params.id,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.LoadCounts=response.data;
          });

    },
    getVacancyById(){
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/vacancy/get_by_id/'+this.$route.params.id,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.result_data=response.data;
          });
    }
  },

  mounted() {
    this.getVacancyById();
    this.LoadCount();
    this.isLoading = true;
    this.showTopMenu=localStorage.getItem('showTopMenu');
    setTimeout(() => {
      this.isLoading = false
    }, 300);
  },
}
</script>

<style scoped>

</style>