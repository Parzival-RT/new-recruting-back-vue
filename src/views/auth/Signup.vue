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
              <h1 class="text-center login-title">რეგისტრაცია</h1>
              <p class="text-center">
                გაქვთ უკვე ანგარიში?
                <router-link to="/Signin">ავტორიზაცია</router-link>
              </p>
              <br>
              <ValidationObserver v-slot="{ handleSubmit }">
              <form  @submit.prevent="handleSubmit(submitForm)" @keydown="clearError" class="row">

                <!-- Form Group -->
                <div class="form-group">
                  <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                  <label class="input-label" for="singupname">თქვენი სახელი გვარი</label>
                  <div class="row">
                    <div class="col-12 col-md-12">
                      <input class="form-control form-control-lg" v-model="form.name" type="text" id="singupname" placeholder="სახელი გვარი">
                    </div>
                  </div>
                  <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div class="form-group">
                  <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                  <label class="input-label" for="signin-email">თქვენი ელ-ფოსტა</label>
                  <input class="form-control form-control-lg" v-model="form.email" type="email" id="signin-email" placeholder="example@davidkenchadze.com">
                  <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div class="form-group">
                  <ValidationProvider  name="Number" :rules="{ required, regex: /^[0-9]+$/ }" v-slot="{ errors }">
                  <label class="input-label" for="mobile-number">თქვენი მობილურის ნომერი</label>
                  <input minlength="9" maxlength="9" class="form-control form-control-lg" v-model="form.mobile" type="text" id="mobile-number" placeholder="თქვენი მობილურის ნომერი: xxx xx xx xx">
                  <span  class="text-danger" v-if="errors[0]">გთხოვთ მიუთითოთ ნომერი სრულად (სწორი ფორმატით)</span>
                  </ValidationProvider>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div class="form-group">
                  <ValidationProvider name="password" rules="required|password:@confirm" v-slot="{ errors }">
                  <label class="input-label" for="singnup-password">პაროლი</label>
                  <input class="form-control form-control-lg" v-model="form.password" type="password" id="singnup-password" placeholder="პაროლი">
                  <span  class="text-danger" v-if="errors[0] && form.password.length == 0">აუცილებელი ველი</span>
                  <span  class="text-danger" v-if="form.password.length >= 1">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div class="form-group">
                  <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
                  <label class="input-label" for="singnup-repassword">გაიმეორეთ პაროლი</label>
                  <input class="form-control form-control-lg" v-model="form.repassword" type="password" id="singnup-repassword" placeholder="გაიმეორე პაროლი">
                    <span  class="text-danger" v-if="errors[0] && form.repassword.length == 0">აუცილებელი ველი</span>
                    <span  class="text-danger" v-if="form.repassword.length >= 1">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div class="form-group">

                  <div class="custom-control">
                    <input class="custom-control-input" type="checkbox" id="pass-checkbox">
                    <label class="custom-control-label text-muted" for="pass-checkbox">მე ვეთანხმები პირობებს <a href="https://recruting.dkcapital.ge/rules.pdf" target="_blank"><b>პირობები</b></a> </label>

                  </div>
                </div>
                <!-- End Form Group -->

                <!-- Button -->
                <button type="submit" class="btn btn-lg btn-block btn-primary">რეგისტრაცია</button>
                <!-- End Button -->

              </form>
              </ValidationObserver>
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

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios'

export default {
  name: "Singup",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      isActive: true,
      StatusPassword:'fas fa-eye-slash',
      InputType:'password',
      error: false,
      errors: {},
      form: {
        name: '',
        email: '',
        mobile: '',
        password: '',
        repassword: '',
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
      axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/signup', this.form)
          .then((res) => {
            localStorage.setItem('user',JSON.stringify(res.data))
            window.location ='/';
          })
          .catch((error) => {
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
  }
}
</script>

<style scoped>
.login-logo h1 {
  color: #023e79!important;
}
</style>