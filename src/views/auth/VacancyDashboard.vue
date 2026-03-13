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
          <h1 class="page-title">ვაკანსიების სტატუსი</h1>
        </div>

        <div class="col-12 mt-3">
          <a href="AddVacancy">
            <!-- Card -->
            <div class="card card-hover-shadow h-100">
              <div class="card-body">
                <div class="row align-items-center gx-2">
                  <div class="col">
                    <i class="tio-add font-weight-normal text-primary display-4 me-2"></i>
                  </div>
                  <div class="col-auto">
                        <span class="h5 text-hover-primary">
                         ვაკანსიის დამატება
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
          <router-link to="/MyVacancy/published">
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
          </router-link>
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
          <router-link to="/MyVacancy/approved">
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
          </router-link>
        </div>
        <!-- End Col-6 -->

        <!-- Col-7 -->
        <div class="col-12 mt-2 mb-4">
          <router-link to="/MyVacancy/pendding">
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
          </router-link>
        </div>
        <!-- End Col-7 -->


        <!-- Col-4 -->
        <div class="col-12 mt-2  mb-5">
          <router-link to="/MyVacancy/unpublished">
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
          </router-link>
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
  name: "VacancyDashboard",
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
.vacancy_dashboard {
  background: radial-gradient(1200px 600px at 10% 0%, #f2f7ff 0%, #f7f9fc 45%, #ffffff 100%);
}

.vacancy_dashboard .page-title {
  font-weight: 700;
  letter-spacing: 0.2px;
  color: #111827;
  font-size: 28px;
}

.vacancy_dashboard a,
.vacancy_dashboard a:visited {
  color: inherit;
  text-decoration: none;
}

.vacancy_dashboard .card {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
  box-shadow: 0 8px 20px rgba(17, 24, 39, 0.06);
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}

.vacancy_dashboard .card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(17, 24, 39, 0.12);
  border-color: #d1d5db;
}

.vacancy_dashboard .card-body {
  padding: 22px 24px;
}

.vacancy_dashboard i.display-4,
.vacancy_dashboard .display-4 {
  line-height: 1;
}

.vacancy_dashboard .display-4 {
  font-size: 36px;
  font-weight: 700;
  color: #0f172a;
}

.vacancy_dashboard .h5 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.vacancy_dashboard .text-success {
  color: #16a34a !important;
}

.vacancy_dashboard .text-warning {
  color: #f59e0b !important;
}

.vacancy_dashboard .text-danger {
  color: #dc2626 !important;
}

.vacancy_dashboard .text-primary {
  color: #2563eb !important;
}

.vacancy_dashboard .js-counter {
  color: #0f172a;
}

@media (max-width: 576px) {
  .vacancy_dashboard .page-title {
    font-size: 22px;
  }

  .vacancy_dashboard .card-body {
    padding: 18px 16px;
  }
}
</style>
