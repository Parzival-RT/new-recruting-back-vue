<template>
    <div>
      <loading :active.sync="isLoading"
               :can-cancel="true"
               :on-cancel="onCancel"
               :is-full-page="fullPage"></loading>
      <Header/>
      <div v-show="!isLoading" class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
        <div class="container-fluid training p-4">
  
          <div class="row mb-3">
            <!-- Col -->
            <div class="col-12">
              <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item text-primary"><router-link to="/Recommendations">რეკომენდაციები</router-link></li>
                  <li class="breadcrumb-item" aria-current="page">რეკომენდაციის დამატება</li>
                </ol>
              </nav>
            </div>
            <!-- End Col -->
          </div>
  
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center bg-light">
              <span class="font-weigt-bold">რეკომენდაციის დამატება</span>
            </div>
            <div class="card-body">
              <!-- End Form -->
              <ValidationObserver v-slot="{ handleSubmit }">
                <form class="row" v-on:submit.prevent="handleSubmit(submitForm)">
                  <div class="col-12 mb-3">
                    <label class="font-weigt-bold">სახელი და გვარი</label>
                    <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                      <input type="text" v-model="form.name" name="name" class="form-control" placeholder="სახელი და გვარი">
                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                    </ValidationProvider>
                  </div>
                  <div class="col-12 mb-3">
                    <label class="font-weigt-bold">კურსები</label>
                    <ValidationProvider name="training_type" rules="required" v-slot="{ errors }">
                      <v-select v-model="form.training_type" name="training_type" class="lss-form-select" label="text" placeholder="ტრენინგის ტიპი"  :options="training_list">
                      </v-select>
                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                    </ValidationProvider>
                  </div>
                  <div class="col-12 mb-3">
                    <label class="font-weigt-bold">მოკლე აღწერა</label>
    <!--                <VueEditor :editorToolbar="customToolbar" v-model="form.short_desc" placeholder="მოკლე აღწერა"/>-->
                    <ValidationProvider name="short_desc" rules="required" v-slot="{ errors }">
                      <ckeditor v-model="form.short_desc" name="short_desc" placeholder="მოკლე აღწერა"></ckeditor>
                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                    </ValidationProvider>
    
                  </div>
                  <div class="col-12 mb-3">
                    <label class="font-weigt-bold">facebook</label>
                    <input type="text" v-model="form.facebook" class="form-control" placeholder="ლინკი">
                  </div>
                  <div class="col-12 mb-3">
                    <label class="font-weigt-bold">instagram</label>
                    <input type="text" v-model="form.instagram" class="form-control" placeholder="ლინკი">
                  </div>
                  <div class="col-12 mb-3">
                    <label class="font-weigt-bold">linkedin</label>
                    <input type="text" v-model="form.linkedin" class="form-control" placeholder="ლინკი">
                  </div>
                  <!-- <div class="col-12 mb-3">
                    <label class="font-weigt-bold">ატვირთე პროფილის ფოტო</label>
                    <vue-dropzone ref="myVueDropzoneLogo"  id="dropzone-logo" useCustomSlot=true :headers="dropzoneLogoOptions.headers" v-on:vdropzone-success="uploadLogoSuccess" :options="dropzoneLogoOptions">
                      <div class="dropzone-custom-content">
                        <div class="subtitle"><i class="tio-upload-on-cloud"></i> ატვირთე პროფილის ფოტო</div>
                      </div>
                    </vue-dropzone>
                  </div> -->
                  <div class="col-12 text-end">
                    <button class="btn btn-primary"> + დამატება</button>
                  </div>
                </form>
              </ValidationObserver>
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
  // import vue2Dropzone from "vue2-dropzone";
  
  export default {
    name: "create",
    components: {
      Header,
      Loading
    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        form: {
          name: '',
          short_desc: '',
          training_type: '',
          facebook: '',
          instagram: '',
          linkedin: ''
        },
        editorConfig: {
          // The configuration of the editor.
        },
        dropzoneLogoOptions: {
  
          url: process.env.VUE_APP_BACKEND_URL+'/auth/traning/upload_photo',
          headers: {
            'Cache-Control': null,
            'X-Requested-With': null,
            'authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
          },
          thumbnailWidth: 200,
          addRemoveLinks: true,
          acceptedFiles:'image/*'
  
        },
        customToolbar: [
  
          [{ header: [false, 1, 2, 3, 4, 5, 6] }],
          ["bold", "italic", "underline", "strike"], // toggled buttons
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" }
          ],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ color: [] }, { background: [] }],
          ["link"],
          ["clean"],
        ],
        training_list: []
      }
    },
    methods: {
      onCancel() {
      },
      uploadLogoSuccess: function(image, response) {
        this.form.image=response.success;
      },
      submitForm(){
        this.isLoading = true;
        const token = JSON.parse(localStorage.getItem('user')).access_token;
  
        axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/recomendation/create', this.form , {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then((res) => {
              this.isLoading = false;
              this.$router.push('/Recommendations');
            })
            .catch((error) => {
              this.isLoading = false;
  
  
            });
  
      },
      trainingList(){
        this.isLoading = true;
        const token = JSON.parse(localStorage.getItem('user')).access_token;
  
        axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/traning/GetListTraning', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then((res) => {
              this.isLoading = false;
              this.training_list = res.data;
              // this.$router.push('/Training');
            })
            .catch((error) => {
              this.isLoading = false;
  
  
            });
  
      },
    },
    mounted() {
      this.trainingList();
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