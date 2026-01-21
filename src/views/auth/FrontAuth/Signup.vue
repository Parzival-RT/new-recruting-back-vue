<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"></loading>
    <Header/>
    <section class="front-signup ">
      <div class="container">
        <!-- Row -->
        <div class="row">
          <!-- Col -->
          <!-- <div class="col-12 col-lg-7 d-none d-lg-block">
            <img class="img-fluid" alt="home image" src="../../../assets/image/Signup.png">
          </div> -->
          <!-- Col -->
          <div class="col-12 mb-5">
            <ValidationObserver class="w-100" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(submitForm)" @keydown="clearError" class="signup-container border shadow-lg p-5 mx-auto">
                <h4 class="signup-title">რეგისტრაცია</h4>
                <div>
                  <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                    <label for="singupname">სახელი და გვარი</label>
                    <input class="auth-control" v-model="form.name" type="text" id="singupname" placeholder="სახელი და გვარი">
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>
                <div>
                  <ValidationProvider  name="Number" :rules="{required, regex: /^[0-9]+$/ }" v-slot="{ errors }">
                    <label for="mobile-number">მობილური</label>
                    <input minlength="9" maxlength="9" v-model="form.mobile" class="auth-control" type="text" id="mobile-number" placeholder="xxx xx xx xx">
                    <span  class="text-danger" v-if="errors[0]">გთხოვთ მიუთითოთ ნომერი სრულად (სწორი ფორმატით)</span>
                  </ValidationProvider>
                </div>
                <div>
                  <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                    <label for="signup-email">ელ.ფოსტა</label>
                    <input type="email" class="auth-control" v-model="form.email" id="signup-email" placeholder="example@motivation.com">
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>
                <div>
                  <ValidationProvider name="password" rules="required|password:@confirm" v-slot="{ errors }">
                    <label for="singnup-password">პაროლი</label>
                    <input class="auth-control" type="password" v-model="form.password" id="singnup-password" placeholder="პაროლი">
                    <span  class="text-danger" v-if="errors[0] && form.password.length == 0">აუცილებელი ველი</span>
                    <span  class="text-danger" v-if="form.password.length >= 1">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div>
                  <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
                    <label for="singnup-repassword">გაიმეორეთ პაროლი</label>
                    <input class="auth-control" type="password" v-model="form.repassword" id="singnup-repassword" placeholder="გაიმეორე პაროლი">
                    <span  class="text-danger" v-if="errors[0] && form.repassword.length == 0">აუცილებელი ველი</span>
                    <span  class="text-danger" v-if="form.repassword.length >= 1">{{ errors[0] }}</span>
                  </ValidationProvider>

                  <div class="mt-2">
                    <ValidationProvider name="terms" rules="checked" v-slot="{ errors }">
                      <input class="custom-control-input me-2" name="terms" v-model="form.terms" type="checkbox" id="terms">
                      <label class="custom-control-label text-muted mb-0" for="terms">მე ვეთანხმები პირობებს <a class="terms" href="https://dk.ge/terms.pdf" target="_blank"><b>პირობები</b></a> </label>
                      <span  class="text-danger d-block" v-if="errors[0]">{{errors[0]}}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <div class="text-center">
                    <span>გაქვთ ანგარიში?</span>
                    <RouterLink to="/Signin">შესვლა</RouterLink>
                  </div>
                 <button class="btn btn-primary py-2 rouned-3">რეგისტრაცია</button>
                </div>
              </form>
            </ValidationObserver>
          </div>
          <!-- Col -->
     
        </div>
        <!-- End Row -->
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/FrontComponents/Header.vue'
import Footer from '@/components/FrontComponents/Footer_1.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios'

export default {
  name: "Signup",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      isActive: true,
      StatusPassword:'fas fa-eye-slash',
      InputType:'password',
      error: false,
      errors: {},
      required: '',
      form: {
        name: '',
        email: '',
        mobile: '',
        password: '',
        repassword: '',
        terms: false
      },
      checkRules:''
    }
  },
  components: {
    Header,
    Footer,
    Loading
  },
  methods: {

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
    }, 300);
    window.scroll(0, 0);
  }
}
</script>

<style scoped>
.terms { 
  color: #4355FF;
  -webkit-font-feature-settings: 'case' on!;
  font-feature-settings: "case" on;
  font-size: 14px;
  /* font-family: var(--First-Font); */
}
.terms:hover { 
  color: #0920ec;
}

h1,h2,h3,h4,h5,h6 {
  margin: 0!important;
}
/* Auth (signin) */
.front-signup{
  margin-top: 109px;
}
.front-signup .signup-container {
  max-width: 472px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px 0;
  padding-top:32px;
    border-radius: 1.5rem;
}
.front-signup .signup-title {
  font-family: var(--First-Font);
  font-style: normal!important;
  font-weight: 500!important;
  font-size: 18px!important;
  line-height: 22px!important;

  text-align: center!important;
  font-feature-settings: 'case' on!important;

  color: var(--Second-Color)!important;

}
.front-signup .signup-container label {
  font-family: var(--Third-Font)!important;
  font-style: normal!important;
  font-weight: 400!important;
  font-size: 16px!important;
  line-height: 19px!important;
  text-transform: lowercase!important;

  color: var(--Second-Color)!important;
  margin-bottom: 10px!important;
}
.front-signup .auth-control {
  width: 100%!important;
  height: 56px!important;
  background: var(--input-background)!important;
  padding: 17px 17px 18px!important;
  border: 1px solid var(--input-border) !important;
  border-radius: 10px!important;

  font-family: var(--Third-Font)!important;
  font-style: normal!important;
  font-weight: 400!important;
  font-size: 16px!important;
  line-height: 19px!important;

  color: rgba(66, 66, 66, 0.5);
}
.front-signup .auth-control:hover,
.front-signup .auth-control:focus {
  border: 1px solid var(--input-border-hover) !important;
}
.front-signup .auth-control.lost {
  margin-bottom: 16px;
}
.front-signup .lost-passoword {
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #31319D;
}
.front-signup input::placeholder {
  color: rgba(66, 66, 66, 0.5) !important;
}
.front-signup input:focus {
  outline: none!important;
}
.front-signup .signup-container .text-center {
  margin-top:4px;
  margin-bottom: 16px;
}
.front-signup .signup-container .text-center span {
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: var(--Second-Color);
  margin-right: 16px;
}
.front-signup .signup-container .text-center a {
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-decoration: none;

  color: #31319D;
}
.front-signup .signup-container .text-center a:hover {
  text-decoration-line: underline;
}
.front-signup .signup-container .btn-auth {
  width: 100%;
  height: 54px;
  background: #FFDD04;
  border: 1px solid transparent;
  border-radius: 10px;

  text-align: center;
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: var(--Second-Color);
  outline: none!important;
  transition: 0.3s;
}
.front-signup .signup-container .btn-auth:hover {
  background: var(--Second-Color-Background-Btn-Hover);
}
.front-signup .row .d-1:nth-child(3) {
  display: none;
}
.front-signup .row .d-1 span:nth-of-type(1) {
  max-width: 472px;
  width: 100%;
}
@media screen and (max-width: 1199px) {
  .front-signup {
    margin-top: 57px;
  }
  .front-signup .row .d-1:nth-child(1),
  .front-signup .row .d-1:nth-child(2) {
    display: none!important;
  }
  .front-signup .row .d-1:nth-child(3) {
    display: block;
  }
  .front-signup .signup-container {
    max-width: 100%;
    padding-top: 32px;
  }
}
@media screen and (max-width: 768px) {
  .front-footer {
    margin-top: 268px;
  }
  .front-signup .auth-control {
    height: 50px!important;
    padding: 16px 28px 17px 28px!important;
  }
  .front-signup .signup-title {
    font-size: 16px!important;
    line-height: 19px!important;
  }
  .front-signup .signup-container label {
    margin-bottom: 16px;
    font-size: 14px!important;
    line-height: 17px!important;
  }
  .front-signup .signup-container .text-center span {
    font-size: 14px!important;
    line-height: 17px!important;
  }
  .front-signup .signup-container .text-center a {
    font-size: 14px!important;
    line-height: 17px!important;
  }
  .front-signup .signup-container .btn-auth {
    height: 50px;
  }
}
</style>