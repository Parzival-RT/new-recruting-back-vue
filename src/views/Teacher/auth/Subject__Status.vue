<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"></loading>
    <Header/>
    <section class="main vacancy vacancy_dashboard" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">

      <div class="container-fluid p-4">
        <div class="row align-items-center">
          <div class="col-12">
            <h1 class="page-title">საგნის სტატუსი</h1>
          </div>

          <div class="col-12 mt-3">
            <a href="/Add__Subject">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="tio-add font-weight-normal text-primary display-4 me-2"></i>
                    </div>
                    <div class="col-auto">
                        <span class="h5 text-hover-primary">
                         საგნის დამატება
                        </span>
                    </div>
                  </div>
                  <!-- End Row -->
                </div>
              </div>
              <!-- End Card -->
            </a>
          </div>

          <!-- Col-2 -->
          <div class="col-12 mt-5">
            <a href="/My__Subjects/published">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="fa fa-bullhorn font-weight-normal display-4 text-success"></i>
                      <span class="js-counter display-4 text-dark ms-2" :data-value="LoadStatistic.published">{{  LoadStatistic.published }}</span>
                    </div>
                    <div class="col-auto">
                        <span class="h5">
                          გამოქვეყნებული
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



          <!-- Col-5 -->
          <!--        <div class="col-12 mt-2">
                    <a href="/MyVacancy/unpaid">
                      &lt;!&ndash; Card &ndash;&gt;
                      <div class="card card-hover-shadow h-100">
                        <div class="card-body">
                          <div class="row align-items-center gx-2">
                            <div class="col">
                              <i class="tio-credit-card-remove font-weight-normal display-4 text-danger"></i>
                              <span class="js-counter display-4 text-dark ms-2" :data-value=" LoadStatistic.unpaid">{{  LoadStatistic.unpaid }}</span>
                            </div>
                            <div class="col-auto">
                                <span class="h5">
                                  გადაუხდელი
                                </span>
                            </div>
                          </div>
                          &lt;!&ndash; End Row &ndash;&gt;
                        </div>
                      </div>
                      &lt;!&ndash; End Card &ndash;&gt;
                    </a>
                  </div>-->
          <!-- End Col-5 -->

          <!-- Col-6 -->
          <div class="col-12 mt-2">
            <a href="/My__Subjects/approved">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="tio-checkmark-circle-outlined font-weight-normal text-success display-4"></i>
                      <span class="js-counter display-4 text-dark ms-2" :data-value="LoadStatistic.approved">{{   LoadStatistic.approved }}</span>
                    </div>
                    <div class="col-auto">
                      <span class="h5">
                        დადასტურებული
                      </span>
                    </div>
                  </div>
                  <!-- End Row -->
                </div>
              </div>
              <!-- End Card -->
            </a>
          </div>
          <!-- End Col-6 -->

          <!-- Col-7 -->
          <div class="col-12 mt-2 mb-4">
            <a href="/My__Subjects/pendding">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="fa fa-spinner font-weight-normal text-warning display-4"></i>
                      <span class="js-counter display-4 text-dark ms-2" :data-value=" LoadStatistic.pedding">{{ LoadStatistic.pedding }}</span>
                    </div>
                    <div class="col-auto">
                      <span class="h5">
                        განსახილველი
                      </span>
                    </div>
                  </div>
                  <!-- End Row -->
                </div>
              </div>
              <!-- End Card -->
            </a>
          </div>
          <!-- End Col-7 -->


          <!-- Col-4 -->
          <div class="col-12 mt-2  mb-5">
            <a href="/My__Subjects/unpublished">
              <!-- Card -->
              <div class="card card-hover-shadow h-100">
                <div class="card-body">
                  <div class="row align-items-center gx-2">
                    <div class="col">
                      <i class="tio-clear-circle-outlined font-weight-normal text-danger display-4"></i>
                      <span class="js-counter display-4 text-dark ms-2" :data-value="LoadStatistic.unpublished">{{  LoadStatistic.unpublished }}</span>
                    </div>
                    <div class="col-auto">
                      <span class="h5">
                        გაუქმებული
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
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  data () {
    return {
      LoadStatistic:[],
      isLoading: false,
      fullPage: true,
      isActive: true,
    }
  },
  name: "Subject__Status",
  components: {
    Header,
    Loading
  },
  methods:{
    LoadStatuses(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/vacancy/LoadStatuses',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.LoadStatistic=response.data;
            this.isLoading = false;
          });
    }
  },
  mounted(){
    this.LoadStatuses();
  }
}
</script>

<style scoped>

</style>
