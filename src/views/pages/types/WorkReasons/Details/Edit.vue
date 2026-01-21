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
          <div class="col-12">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-primary"><router-link to="/WorkReasons">სამუშაო მიზეზები</router-link></li>
                <li class="breadcrumb-item" aria-current="page">სამუშაო მიზეზის დამატება</li>
              </ol>
            </nav>
          </div>
          <!-- End Col -->
        </div>

        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center bg-light">
            <span class="font-weigt-bold">დაამატე სამუშაო მიზეზი</span>
          </div>
          <div class="card-body">
            <!-- End Form -->
            <form class="row" v-on:submit.prevent="submitForm">
              <div class="col-12 mb-3">
                <input type="text" v-model="form.name" class="form-control" placeholder="სამუშაო მიზეზის დასახელება">
              </div>
              <div class="col-12 text-end">
                <button class="btn btn-primary"> + რედაქტირება</button>
              </div>
            </form>
            <!-- End Form -->
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
  name: "Edit",
  components: {
    Header,
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      form: {
        name: ''
      }
    }
  },
  methods:{
    onCancel() {
    },
    submitForm(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;

      axios.put(process.env.VUE_APP_BACKEND_URL+'/auth/work_reason/update/'+this.$route.params.id, this.form , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
            this.isLoading = false;
            this.$router.push('/WorkReasons');
          })
          .catch((error) => {
            this.isLoading = false;


          });

    },
    getDataById(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/work_reason/get_by_id/'+this.$route.params.id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
            this.isLoading = false;
            this.form=res.data;
          })
          .catch((error) => {
            this.isLoading = false;


          });
    }
  },
  mounted() {
    this.getDataById();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false
    }, 300);
  }
}
</script>

<style scoped>
.card-header {
  border-top-left-radius: 0.75rem!important;
  border-top-right-radius: 0.75rem!important;
}
</style>