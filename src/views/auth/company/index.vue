<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :is-full-page="fullPage"></loading>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card" v-if="permission=='administrator'">
          <h5 class="card-header d-flex justify-content-between bg-transparent">
            კომპანიის მონაცემები
            <button v-if="permission=='administrator'" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="tio-search"></i> ფილტრი</button>
          </h5>
          <div class="card-body">

            <div class="row">
              <a href="/Details/create">
                 <button class="btn btn-primary mb-3"> + დამატება</button>
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

    <!-- Vacancy Filter Right Canvas  -->
    <div class="offcanvas offcanvas-end" ref="canvasbar" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header border-bottom">
        <h5 id="offcanvasRightLabel">ფილტრი</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body pb-4" style="height: calc(100% - 9rem);">
        <form ref="form" class="row" style="gap: 20px 0">
          <!-- Col -->
          <div class="col-12">
            <label class="font-weigt-bold">კომპანიის დასახელება</label>
            <input class="form-control" v-model="form.name" name="name" type="text" placeholder="კომპანიის დასახელება">
          </div>
          <!-- Col -->
          <div class="col-12">
            <label class="font-weigt-bold">ს/კ</label>
            <input class="form-control" v-model="form.taxcode" name="taxcode" type="text" placeholder="ს/კ">
          </div>
          <!-- Col -->
<!--          <div class="col-12">-->
<!--            <label class="font-weigt-bold">მობილური</label>-->
<!--            <input class="form-control" v-model="form.mobile" name="mobile" type="number" placeholder="მობილური">-->

<!--          </div>-->

          <!-- Col -->
          <div class="col-12">
            <label class="font-weigt-bold">ელ.ფოსტა</label>
            <input class="form-control" v-model="form.email" name="email" type="text" placeholder="ელ.ფოსტა">

          </div>
          <!-- End Col -->
        </form>
      </div>
      <div class="offcanvas-body d-flex gap-1 position-absolute bottom-0 w-100 bg-white border-top">
        <button class="btn btn-primary w-100" @click="filter()">გაფილტრე</button>
        <button class="btn btn-light w-100" data-bs-dismiss="offcanvas" aria-label="Close" @click="ClearFilter()">გასუფთავება</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

import Loading from "vue-loading-overlay";
import Header from "@/components/Header";
import {mapGetters} from "vuex";

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
      ResponseData:{},
      form:{
        name:this.$route.query.name,
        taxcode:this.$route.query.taxcode,
        // mobile:this.$route.query.mobile,
        email:this.$route.query.email
      },
    }
  },
  methods:{

    onCancel() {
    },
    getResults() {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/details/get_all_company_details',{
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          name:this.$route.query.name,
          taxcode:this.$route.query.taxcode,
          // mobile:this.$route.query.mobile,
          email:this.$route.query.email
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

      this.$router.push({ name: 'CompanyEdit', params: { id: id  } })
    },


  },
  computed: {
    ...mapGetters({ permission: "getCurrentPermission" }),
    getRole(){

      return this.$store.state.user_role;
    },
    filter : function(){
      this.$refs.form.submit();
    },
    ClearFilter(){
      this.$router.push(this.param);
      this.form.name='';
      this.form.taxcode='';
      this.form.email='';
      this.form.mobile='';


      this.$route.query.name='';
      this.$route.query.taxcode='';
      this.$route.query.email='';
      this.$route.query.mobile='';
      this.getResults();
    },
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

/* ── Page ── */
.main { background: #f8fafc; }

/* ── Outer card ── */
.card {
  border: 1px solid #e5e7eb !important;
  border-radius: 1.25rem !important;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.07) !important;
  background: #fff !important;
}

/* ── Card header ── */
.card-header {
  background: #f8fafc !important;
  border-bottom: 1px solid #f1f5f9 !important;
  border-radius: 1.25rem 1.25rem 0 0 !important;
  padding: 1rem 1.5rem !important;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

/* ── Header filter button ── */
.card-header .btn-primary {
  background: #f8fafc !important;
  color: #374151 !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 0.625rem !important;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.45rem 1rem;
  box-shadow: none !important;
}
.card-header .btn-primary:hover {
  background: #f1f5f9 !important;
}

/* ── Add button ── */
.card-body > .row .btn-primary {
  background: #2563eb !important;
  border-color: #2563eb !important;
  border-radius: 0.625rem !important;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.5rem 1.1rem;
  box-shadow: none !important;
}
.card-body > .row .btn-primary:hover {
  background: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
}

/* ── Company item card ── */
.card-hover-shadow {
  border: 1px solid #e5e7eb !important;
  border-radius: 1rem !important;
  box-shadow: 0 2px 8px -2px rgba(0,0,0,0.06) !important;
  transition: box-shadow 0.18s ease, border-color 0.18s ease, transform 0.15s ease !important;
  cursor: pointer;
}
.card-hover-shadow:hover {
  box-shadow: 0 8px 24px -6px rgba(37,99,235,0.14) !important;
  border-color: #bfdbfe !important;
  transform: translateY(-1px);
}
.card-hover-shadow .card-body {
  padding: 0.875rem 1.25rem !important;
}

/* ── Logo ── */
.card-hover-shadow .img-fluid {
  border-radius: 0.5rem !important;
  border: 1px solid #f1f5f9 !important;
  object-fit: contain;
}

/* ── Checkmark icon ── */
.card-hover-shadow .tio-checkmark-circle-outlined {
  color: #22c55e !important;
  font-size: 1.4rem !important;
}

/* ── Company name ── */
.card-hover-shadow .h5 {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

/* ── Offcanvas ── */
.offcanvas-header {
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9 !important;
  padding: 1.25rem 1.5rem;
}
.offcanvas-header h5 {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
}
.offcanvas-body { padding: 1.25rem 1.5rem; }

/* ── Filter form labels ── */
.offcanvas-body label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.35rem;
}

/* ── Filter inputs ── */
.offcanvas-body .form-control {
  border-radius: 0.625rem !important;
  border: 1px solid #e5e7eb !important;
  font-size: 0.8125rem;
}
.offcanvas-body .form-control:focus {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.1) !important;
}

/* ── Offcanvas footer buttons ── */
.offcanvas-body.position-absolute .btn-primary {
  background: #2563eb !important;
  border-color: #2563eb !important;
  border-radius: 0.625rem !important;
  font-size: 0.8125rem;
  font-weight: 600;
}
.offcanvas-body.position-absolute .btn-primary:hover {
  background: #1d4ed8 !important;
}
.offcanvas-body.position-absolute .btn-light {
  background: #f8fafc !important;
  border: 1px solid #e5e7eb !important;
  color: #374151 !important;
  border-radius: 0.625rem !important;
  font-size: 0.8125rem;
  font-weight: 600;
}
.offcanvas-body.position-absolute .btn-light:hover {
  background: #f1f5f9 !important;
}

</style>