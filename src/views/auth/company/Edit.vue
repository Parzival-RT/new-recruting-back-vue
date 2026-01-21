<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"></loading>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card">
          <h5 class="card-header bg-transparent">რეკვიზიტების მართვა</h5>
          <div class="card-body">

            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(submitForm)" class="rowpt-70">
              <div class="row">
                <div class="col-md-6">
                  <label>სახელი გვარი</label>

                  <input  type="text" v-model="form.user_name" disabled class="form-control" placeholder="სახელი გვარი">
                  <span  class="text-danger">{{ errors[0] }}</span>

                </div>
                <div class="col-md-6 mt-3 mt-md-0">
                  <label>მობილურის ნომერი</label>

                  <input  type="text" v-model="form.user_mobile" disabled class="form-control" placeholder="მობილური">
                  <span  class="text-danger">{{ errors[0] }}</span>

                </div>
                <div class="col-md-6 mt-3">
                  <ValidationProvider name="Company Name" rules="required" v-slot="{ errors }">
                    <label>კომპანიის დასახელება</label>

                    <input  type="text" v-model="form.name" class="form-control" placeholder="კომპანიის დასახელება">
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>
                <div class="col-md-6 mt-3">
                  <ValidationProvider name="Brand Name" rules="required" v-slot="{ errors }">

                    <label>ბრენდის დასახელება</label>

                    <input  type="text" v-model="form.brandname" class="form-control" placeholder="ბრენდის დასახელება">
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>

                <div class="col-md-6 mt-3">
                  <ValidationProvider name="Taxcode" rules="required" v-slot="{ errors }">

                    <label>ს/კ</label>

                    <input type="text" v-model="form.taxcode" class="form-control" placeholder="ს/კ">
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>


                <div class="col-md-6 mt-3">
                  <ValidationProvider name="Email" rules="required" v-slot="{ errors }">

                    <label>ელ.ფოსტა</label>

                    <input type="email" v-model="form.email" class="form-control" placeholder="ელ.ფოსტა">
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>


                <div class="col-md-6 mt-3">
                  <ValidationProvider name="Director Name" rules="required" v-slot="{ errors }">

                    <label>დირექტორის სახელი გვარი</label>

                    <input type="text" class="form-control" v-model="form.director_name" placeholder="დირექტორის სახელი გვარი">
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>


                <div class="col-md-6 mt-3">
                  <ValidationProvider name="address" rules="required" v-slot="{ errors }">

                    <label>მისამართი</label>

                    <input type="text" class="form-control" v-model="form.address" placeholder="მისამართი">
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>

                <div class="col-md-6 mt-3">
                  <label>ვებ გვერდი</label>

                  <input type="text" class="form-control" v-model="form.website" placeholder="ვებ გვერდი">
                  <span  class="text-danger">{{ errors[0] }}</span>

                </div>


                <div class="col-md-6 mt-3">
                  <label>Facebook</label>

                  <input type="text" class="form-control" v-model="form.facebook" placeholder="Facebook">
                  <span  class="text-danger">{{ errors[0] }}</span>

                </div>
                <div class="col-md-12 mt-3">
                  <label>ლოგოს ატვირთვა</label>
                  <vue-dropzone ref="myVueDropzoneLogo"  id="dropzone-logo" useCustomSlot=true :headers="dropzoneLogoOptions.headers" v-on:vdropzone-success="uploadLogoSuccess" :options="dropzoneLogoOptions">
                    <div class="dropzone-custom-content">
                      <div class="subtitle"><i class="tio-upload-on-cloud"></i> ატვირთე ლოგო</div>
                    </div>
                  </vue-dropzone>
                </div>

                <div class="col-md-3 mt-3">
                  <label>ატვირთული ლოგო</label>
                  <img :src="form.logo_path"  class="img-fluid border">
                </div>



                <div class="col-md-12 mt-3">
                  <button class="btn btn-primary">+ შენახვა</button>
                </div>


              </div>
            </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import Header from "@/components/Header";
import axios from "axios";
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'
export default {
  name: "CreateDetail",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      error:false,
      errors:{},
      signiture_base:'',
      profile_name:'',
      user_name: '',
      user_mobile: '',

      form:{
        name:'',
        brandname:'',
        taxcode:'',
        email:'',
        director_name:'',
        address:'',
        logo:'',
        signiture:'',
        facebook:'',
        website:''
      },
      dropzoneLogoOptions: {

        url: process.env.VUE_APP_BACKEND_URL+'/auth/details/upload_logo',
        headers: {
          'Cache-Control': null,
          'X-Requested-With': null,
          'authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
        },
        thumbnailWidth: 200,
        addRemoveLinks: true,

      },

    }
  },
  components: {
    Loading,
    Header,
    vueDropzone: vue2Dropzone
  },
  methods: {

    submitForm(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;

      axios.put(process.env.VUE_APP_BACKEND_URL+'/auth/details/update_all_company_detail/'+this.$route.params.id,{'data':this.form}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
            this.isLoading = false;
            this.$router.push('/all_company');
          })
          .catch((error) => {
            this.isLoading = false;


          });

    },
    onFailure(message){
      this.error=true;
    },
    setErrors(errors){
      this.errors=errors;
    },
    hasError(fieldName){
      return (fieldName in this.errors);
    },
    clearError(event){
      delete this.errors[event.target.name]
    },
    uploadLogoSuccess: function(file, response) {
      this.form.logo=response.success;
    },
    uploadSignitureSuccess: function(file, response) {
      this.form.signiture=response.success;
    },
    getDataById(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/details/get_by_id_company/'+this.$route.params.id, {
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
    },


  },
  mounted() {

    this.getDataById();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false
    }, 300)
  }
}
</script>

<style scoped>
.card-footer, .card-header {
  background: transparent!important;
}
</style>