<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <Header />
    <section class="main vacancy" :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <!-- Row -->
        <div class="row">
          <!-- Col -->
          <div v-if="!isLoading" class="col-12 mb-4">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-primary"><a href="/MyVacancy/published">ვაკანსიების სტატუსი</a></li>
                <li class="breadcrumb-item" aria-current="page">
                  <a :href="'/Candidats/' + this.$route.params.id">
                    {{ result_data.position.name }}</a>
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <span v-if="this.$route.params.status == 'won'">აყვანილი კანდიდატები</span>
                  <span v-if="this.$route.params.status == 'closing'">საუკეთესო კანდიდატები</span>
                  <span v-if="this.$route.params.status == 'meeting'">შესახვედრი კანდიდატები</span>
                  <span v-if="this.$route.params.status == 'offers'">განსახილველი კანდიდატები</span>
                  <span v-if="this.$route.params.status == 'rejects'">უარყოფილი კანდიდატები</span>
                </li>
              </ol>
            </nav>
          </div>
          <!-- End Col -->

          <!-- Col -->
          <div v-if="LoadVacancy.length > 1" class="col-12 mb-4 d-none">
            <button class="btn btn-success"><i class="tio-download-to"></i> ყველას ჩამოტვირთვა</button>
          </div>
          <!-- End Col -->




          <!-- Col -->
          <div v-for="(item, index) in LoadVacancy.data" :key="index" class="col-12 col-xl-6 mb-3 h-100">
            <div class="card">
              <div class="card-header d-flex px-2 px-md-3">
                <small class="text-muted">
                  <b>ID:</b> {{ item.id }}
                  <span v-b-tooltip.hover.top="'CV ნანახია'" v-if="item.seen == 'seen'"
                    class="badge bg-warning text-dark">ნანახი</span>
                  <span v-b-tooltip.hover.top="'CV სანახავია'" v-if="item.seen == 'unseen'"
                    class="badge bg-success">სანახავი</span>
                </small>
                <small class="text-muted ms-auto" title="დამატების თარიღი"> {{ item.inserted_at }}</small>
              </div>
              <div class="card-body px-2 px-md-3">
                <div class="row">
                  <div v-if="!item.attachment" class="col-12 mb-2">
                    <small><i class="fa-sharp fa-solid fa-file-excel text-danger"></i> სივის გარეშე</small>
                  </div>
                  <div v-else class="col-12 mb-2">
                    <small><i class="fa fa-file-text text-success"></i> სივით</small>
                  </div>
                  <div class="col-6 col-xl-7 d-flex">
                    <a v-if="item.offer_status != 'won'" class="text-hover-primary">
                      <i class="tio-info-outined me-1" :id="`message_` + item.id"></i>
                    </a>
                    <b-tooltip class="bg-transparent p-0" variant="light" :target="`message_` + item.id"
                      triggers="hover">
                      <div class="tooltip-inner">
                        <b>შეტყობინება:</b><br>
                        <span v-if="item.message">{{ item.message }}</span>
                        <span v-if="!item.message">შეტყობინების გარეშე...</span>
                      </div>
                    </b-tooltip>
                    <div>
                      <b>{{ item.name }}</b>
                      <small v-b-tooltip.hover.top="'აპლიკანტის ნომერი'" class="text-muted d-block"
                        title="აპლიკანტის ნომერი"> {{ item.mobile }}</small>
                    </div>
                  </div>
                  <div class="col-6 col-xl-5 mt-0 mt-md-0 text-end text-md-end">


                    <b-button-group>
                      <b-dropdown v-if="item.offer_status == 'offers'" id="dropdown" text="სტატუსი" variant="primary">
                        <b-dropdown-item @click="OfferStatus(item.id, 'meeting')">
                          <i class="tio-calendar-month text-success"></i>
                          შეხვედრის დანიშვნა
                        </b-dropdown-item>
                        <b-dropdown-item @click="OfferStatus(item.id, 'rejects')">
                          <i class="tio-clear-circle-outlined text-danger"></i>
                          უარი
                        </b-dropdown-item>
                      </b-dropdown>
                      <b-dropdown v-if="item.offer_status == 'rejects'" id="dropdown" text="სტატუსი" variant="primary">
                        <b-dropdown-item @click="OfferStatus(item.id, 'meeting')">
                          <i class="tio-refresh text-success"></i> გააქტიურება
                        </b-dropdown-item>
                        <!--                        <b-dropdown-item @click="OfferStatus(item.id,'rejects')">-->
                        <!--                          <i class="tio-clear-circle-outlined text-danger"></i>-->
                        <!--                          უარი-->
                        <!--                        </b-dropdown-item>-->
                      </b-dropdown>
                      <b-dropdown v-if="item.offer_status == 'meeting'" id="dropdown" text="სტატუსი" variant="primary">
                        <b-dropdown-item @click="OfferStatus(item.id, 'closing')">
                          <i class="tio-calendar-month text-success"></i> ბოლო ეტაპზე გადაყვანა
                        </b-dropdown-item>
                        <b-dropdown-item @click="OfferStatus(item.id, 'rejects')">
                          <i class="tio-clear-circle-outlined text-danger"></i>
                          უარი
                        </b-dropdown-item>
                      </b-dropdown>
                      <b-dropdown v-if="item.offer_status == 'closing'" id="dropdown" text="სტატუსი" variant="primary">
                        <b-dropdown-item @click="OfferStatus(item.id, 'won')">
                          <i class="tio-calendar-month text-success"></i> სამსახურში აყვანა
                        </b-dropdown-item>
                        <b-dropdown-item @click="OfferStatus(item.id, 'rejects')">
                          <i class="tio-clear-circle-outlined text-danger"></i>
                          უარი
                        </b-dropdown-item>
                      </b-dropdown>
                      <a v-if="item.attachment" @click="cvCheck(item.id)" target="_blank"
                        class="btn btn-outline-secondary text-nowrap px-2 px-md-1 px-md-3">
                        <i class="fa fa-eye me-1"></i>
                        <span class="d-none d-md-inline-block">CV</span>
                      </a>
                      <button v-if="!item.attachment && item.seen !== 'seen'" @click="noCvCheck(item.id)"
                        class="btn btn-outline-success" v-b-tooltip.hover.top="'დავუკავშირდი'" type="button">
                        <i class="fa fa-check me-1"></i>
                      </button>
                    </b-button-group>




                  </div>
                  <!-- End Col -->
                </div>
              </div>
            </div>
          </div>
          <!-- End Col -->

          <pagination :data="LoadVacancy" @pagination-change-page="getResults">

          </pagination>



        </div>
        <!-- End Row -->
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
  name: "Candidat",
  data() {
    return {
      time1: null,
      time2: null,
      time3: null,
      name: '',
      nameState: null,
      submittedNames: [],
      isLoading: false,
      fullPage: true,
      isActive: true,
      LoadVacancy: [],
      result_data: {
        IndustryDetail: {
          text: '',
          id: ''
        },
        position: {

        }
      }
    }
  },
  components: {
    Header,
    Loading
  },
  methods: {

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    LoadGetById() {

      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/vacancy/get_by_vacancy_id/' + this.$route.params.id + '/' + this.$route.params.status, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          this.LoadVacancy = response.data;
        });

    },
    // getResults(page = 1){

    //   const token = JSON.parse(localStorage.getItem('user')).access_token;
    //   axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/vacancy/get_by_vacancy_id/'+this.$route.params.id+'/'+this.$route.params.status ,{
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   })
    //       .then(response => {
    //         this.LoadVacancy=response.data;
    //       });

    // },
    getResults(page = 1) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/vacancy/get_by_vacancy_id/' + this.$route.params.id + '/' + this.$route.params.status + '?page=' + page, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          this.isLoading = false;
          this.LoadVacancy = response.data;
        });
    },
    OfferStatus(id, offer_status) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/vacancy/offer_status/' + id + '/' + offer_status, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          this.LoadGetById();
          this.isLoading = false;
        });
    },
    getVacancyById() {
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/vacancy/get_by_id/' + this.$route.params.id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          this.result_data = response.data;
        });
    },

    cvCheck(id) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/vacancy/cv_seen/' + id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          window.open(response.data.url, '_blank');
          this.isLoading = false;
        });
    },

    noCvCheck(id) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/vacancy/cv_seen/' + id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          setTimeout(() => {
            this.getResults();
          }, 1000)
          this.isLoading = false;
        });
    }

  },
  mounted() {
    // this.LoadGetById();
    this.getResults();
    this.getVacancyById();
    this.isLoading = true;
    this.showTopMenu = localStorage.getItem('showTopMenu');
    setTimeout(() => {
      this.isLoading = false
    }, 300);
  },
}
</script>

<style scoped>
.tooltip-inner:last-child {
  position: absolute;
  transform: translate3d(-10px, 50px, 0px);
  top: 0px;
  left: 0px;
  will-change: transform;
  max-width: 350px !important;
  width: 350px;
  text-align: start !important;
  border-top: 3px solid #0d6efd;
}

@media screen and (max-width: 500px) {
  .tooltip-inner:last-child {
    max-width: 310px !important;
    width: 310px !important;
  }
}

.tooltip-inner:last-child::before {
  content: '';
  position: absolute;
  top: -11px;
  left: -7px;
  background-color: #0d6efd;
  width: 50px;
  height: 50px;
  -webkit-clip-path: polygon(50% 0%, 41% 20%, 60% 20%);
  clip-path: polygon(50% 0%, 41% 20%, 60% 20%);
}
</style>