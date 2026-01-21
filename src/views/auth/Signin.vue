<template>

<main class="login-main">
  <loading :active.sync="isLoading"
           :can-cancel="true"
           :on-cancel="onCancel"
           :is-full-page="fullPage"></loading>
  <div class="position-fixed top-0 start-0 end-0 bg-image-login">
    <figure class="position-absolute end-0 bottom-0 start-0 mb-0">
      <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1921 273">
        <polygon fill="#fff" points="0,273 1921,273 1921,0 "></polygon>
      </svg>
    </figure>
  </div>
  <div class="container-fluid py-5">
    <div class="row justify-content-center">
      <!-- Col -->
      <div class="col-md-7 col-lg-5">
        <!-- Card -->
        <div class="card">
          <div class="card-body p-4">
            <div class="login-logo text-center mb-3">
              <h1>DAVID KENCHADZE</h1>
            </div>
            <h1 class="text-center login-title">ავტორიზაცია</h1>
            <p class="text-center">
              ჯერ კიდევ არ გაქვს ანგარიში?
              <router-link class="rg" to="/Signup">რეგისტრაცია</router-link>
            </p>
            <br>
            <form v-on:submit.prevent="submitForm" @keydown="clearError" class="rowpt-70">
              <!-- Form Group -->
              <div class="form-group">
                <label class="input-label" for="signin-email">ელ-ფოსტა</label>
                <input class="form-control form-control-lg" v-model="form.email" type="email" id="signin-email" placeholder="example@davidkenchadze.com">
              </div>
              <!-- End Form Group -->

              <!-- Form Group -->
              <div class="form-group">
                <label class="input-label" for="signin-password">
                    <span class="d-flex justify-content-between align-items-center">
                      პაროლი
                      <router-link class="input-label-secondary" to="/Recovery">დაგავიწყდა პაროლი?</router-link>
                    </span>
                </label>
                <input class="form-control form-control-lg" v-model="form.password" type="password" id="signin-password" placeholder="პაროლი">
              </div>
              <!-- End Form Group -->

              <!-- Form Group -->
              <div class="form-group">
                <div class="custom-control">
                  <input class="custom-control-input" type="checkbox" id="pass-checkbox">
                  <label class="custom-control-label text-muted" for="pass-checkbox">დაიმახსოვრე</label>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Button -->
              <button type="submit" class="btn btn-lg btn-block btn-primary">ავტორიზაცია</button>
              <!-- End Button -->

            </form>
          </div>
        </div>
        <!-- End Card -->
      </div>
      <!-- End Col -->
    </div>
  </div>
</main>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {mapGetters,mapMutations} from "vuex";

export default {
  name: "Signin",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      isActive: true,
      StatusPassword:'fas fa-eye-slash',
      InputType:'password',
      error:false,
      errors:{},
      form: {
        email: '',
        password: '',
      }
    }
  },
  components: {
    Loading
  },
  methods:{
    onCancel() {

    },
    show_password: function() {

      if(this.isActive===true){
        this.isActive=false;
        this.InputType='text';

      }else{
        this.isActive=true;
        this.InputType='password';

      }

    },
    submitForm(){
      this.isLoading = true;
      axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/login', this.form)
          .then((res) => {
            this.$store.commit("setCurrentPermission", res.data.permission);
            this.isLoading = false
            localStorage.setItem('user',JSON.stringify(res.data));
            /*this.$store.state.user_role=res.role;*/


            if(res.data.active_status==='end_user' && this.$router.currentRoute.name!='Billing'){
              this.$router.push('/Billing')
            }else{
              this.$router.push('/')
            }
            // window.location ='/Home';

          })
          .catch((error) => {
            this.isLoading = false
            var error_response=error.response.data;
            if(error.response.status==422){
              this.setErrors(error.response.data.errors);
            }else{
              this.setErrors(error.response.data.message);
            }
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
    }
  },
  mounted() {



    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false
    }, 300)
  },




}
</script>

<style scoped>
.login-logo h1 {
  color: #023e79!important;
}
</style>