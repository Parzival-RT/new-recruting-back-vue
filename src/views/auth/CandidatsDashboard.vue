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

/* ── Page ── */
.vacancy_dashboard {
  background: #f8fafc;
  color: #0f172a;
}

/* ── Breadcrumb ── */
.vacancy_dashboard .breadcrumb {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.5rem 0.875rem;
  box-shadow: 0 2px 8px rgba(15,23,42,0.06);
  font-size: 0.8125rem;
  margin-bottom: 0;
  display: inline-flex;
  align-items: center;
}
.vacancy_dashboard .breadcrumb-item + .breadcrumb-item::before { color: #cbd5e1; }
.vacancy_dashboard .breadcrumb a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}
.vacancy_dashboard .breadcrumb a:hover { color: #1d4ed8; text-decoration: underline; }
.vacancy_dashboard .breadcrumb-item { color: #374151; font-weight: 500; }

/* ── Base card ── */
.vacancy_dashboard .card {
  border-radius: 1.25rem;
  border: 1px solid #f1f5f9;
  background: #fff;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.07);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  overflow: hidden;
}
.vacancy_dashboard .card:hover {
  transform: translateY(-2px);
}
.vacancy_dashboard .card-body { padding: 1.5rem 1.75rem; }

/* ── Numbers ── */
.vacancy_dashboard .display-4 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  line-height: 1;
}

/* ── Labels ── */
.vacancy_dashboard .h5 {
  font-size: 0.7rem;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ── Color utilities ── */
.vacancy_dashboard .text-blue-custom { color: #2563eb !important; }
.vacancy_dashboard .text-success     { color: #16a34a !important; }
.vacancy_dashboard .text-warning     { color: #d97706 !important; }
.vacancy_dashboard .text-danger      { color: #dc2626 !important; }

/* ── Won — blue (2nd child) ── */
.vacancy_dashboard .col-12:nth-child(2) .card {
  border-left: 4px solid #2563eb;
  background: linear-gradient(135deg, #fff 0%, #eff6ff 100%);
}
.vacancy_dashboard .col-12:nth-child(2) .card:hover {
  box-shadow: 0 10px 30px -6px rgba(37,99,235,0.22);
}

/* ── Closing — green (3rd child) ── */
.vacancy_dashboard .col-12:nth-child(3) .card {
  border-left: 4px solid #16a34a;
  background: linear-gradient(135deg, #fff 0%, #f0fdf4 100%);
}
.vacancy_dashboard .col-12:nth-child(3) .card:hover {
  box-shadow: 0 10px 30px -6px rgba(22,163,74,0.22);
}

/* ── Meeting — amber (4th child) ── */
.vacancy_dashboard .col-12:nth-child(4) .card {
  border-left: 4px solid #d97706;
  background: linear-gradient(135deg, #fff 0%, #fffbeb 100%);
}
.vacancy_dashboard .col-12:nth-child(4) .card:hover {
  box-shadow: 0 10px 30px -6px rgba(217,119,6,0.22);
}

/* ── Offers — indigo (5th child) ── */
.vacancy_dashboard .col-12:nth-child(5) .card {
  border-left: 4px solid #6366f1;
  background: linear-gradient(135deg, #fff 0%, #f5f3ff 100%);
}
.vacancy_dashboard .col-12:nth-child(5) .card:hover {
  box-shadow: 0 10px 30px -6px rgba(99,102,241,0.22);
}

/* ── Rejects — red (6th child) ── */
.vacancy_dashboard .col-12:nth-child(6) .card {
  border-left: 4px solid #dc2626;
  background: linear-gradient(135deg, #fff 0%, #fef2f2 100%);
}
.vacancy_dashboard .col-12:nth-child(6) .card:hover {
  box-shadow: 0 10px 30px -6px rgba(220,38,38,0.22);
}

@media (max-width: 576px) {
  .vacancy_dashboard .card-body { padding: 1rem 1.25rem; }
}

</style>
