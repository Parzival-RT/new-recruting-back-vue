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
                <li class="breadcrumb-item text-primary"><router-link to="/Category">კატეგორიები</router-link></li>
                <li class="breadcrumb-item" aria-current="page">კატეგორიის დამატება</li>
              </ol>
            </nav>
          </div>
          <!-- End Col -->
        </div>

        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center bg-light">
            <span class="font-weigt-bold">დაამატე კატეგორია</span>
          </div>
          <div class="card-body">
            <!-- End Form -->
            <form class="row" v-on:submit.prevent="submitForm">
              <div class="col-12 mb-3">
                <input type="text" v-model="form.name" class="form-control" placeholder="კატეგორიის დასახელება">
              </div>
              <div class="col-12 mb-3">
                <vue-dropzone ref="myVueDropzoneLogo"  id="dropzone-logo" useCustomSlot=true :headers="dropzoneLogoOptions.headers" v-on:vdropzone-success="uploadLogoSuccess" :options="dropzoneLogoOptions">
                  <div class="dropzone-custom-content">
                    <div class="subtitle"><i class="tio-upload-on-cloud"></i> ატვირთე ლოგო</div>
                  </div>
                </vue-dropzone>
              </div>
              <div class="col-12 text-end">
                <button class="btn btn-primary"> + დამატება</button>
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
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "AddCategory",
  components: {
    Header,
    Loading,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      form: {
        name: '',
        file: ''
      },
      dropzoneLogoOptions: {

        url: process.env.VUE_APP_BACKEND_URL+'/auth/Categories/upload_photo',
        headers: {
          'Cache-Control': null,
          'X-Requested-With': null,
          'authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
        },
        thumbnailWidth: 200,
        addRemoveLinks: true,
        acceptedFiles:'image/*'

      },
    }
  },
  methods: {
    onCancel() {
    },
    uploadLogoSuccess: function(file, response) {
      this.form.file=response.success;
    },
    submitForm(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;

      axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/Categories/create', this.form , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
            this.isLoading = false;
            this.$router.push('/Category');
          })
          .catch((error) => {
            this.isLoading = false;


          });

    },
  },
  mounted() {
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