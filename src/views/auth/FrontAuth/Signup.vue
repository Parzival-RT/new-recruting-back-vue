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
          <div class="col-12 mb-5 mt-5">
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
h1,h2,h3,h4,h5,h6 { margin: 0 !important; }

/* ── Page ── */
.front-signup {
  margin-top: 82px;
  min-height: calc(100vh - 82px);
  background: #f8fafc;
  padding-bottom: 4rem;
}

/* ── Form card ── */
.front-signup .signup-container {
  max-width: 460px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 1.5rem !important;
  box-shadow: 0 4px 24px -6px rgba(0,0,0,0.09) !important;
  padding: 2.5rem 2.25rem !important;
}

/* ── Title ── */
.front-signup .signup-title {
  font-weight: 700 !important;
  font-size: 1.25rem !important;
  line-height: 1.3 !important;
  text-align: center !important;
  color: #111827 !important;
}

/* ── Labels ── */
.front-signup .signup-container label {
  display: block;
  font-weight: 600 !important;
  font-size: 0.8125rem !important;
  line-height: 1.4 !important;
  color: #374151 !important;
  margin-bottom: 0.4rem !important;
  text-transform: none !important;
}

/* ── Inputs ── */
.front-signup .auth-control {
  width: 100% !important;
  height: 48px !important;
  background: #fff !important;
  padding: 0 1rem !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 0.625rem !important;
  font-size: 0.9375rem !important;
  color: #111827 !important;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.front-signup .auth-control:hover {
  border-color: #cbd5e1 !important;
}
.front-signup .auth-control:focus {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.1) !important;
  outline: none !important;
}
.front-signup input::placeholder { color: #9ca3af !important; }

/* ── Checkbox label ── */
.front-signup .custom-control-label {
  font-size: 0.8125rem !important;
  color: #6b7280 !important;
  font-weight: 400 !important;
}

/* ── Terms link ── */
.terms {
  color: #2563eb;
  font-size: 0.8125rem;
  font-feature-settings: "case" on;
  text-decoration: none;
}
.terms:hover { color: #1d4ed8; text-decoration: underline; }

/* ── "გაქვთ ანგარიში?" row ── */
.front-signup .signup-container .text-center {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
.front-signup .signup-container .text-center span {
  font-size: 0.875rem !important;
  color: #6b7280 !important;
  margin-right: 0.375rem;
}
.front-signup .signup-container .text-center a {
  font-size: 0.875rem !important;
  font-weight: 600;
  color: #2563eb !important;
  text-decoration: none;
}
.front-signup .signup-container .text-center a:hover { text-decoration: underline; }

/* ── Submit button (Bootstrap btn-primary) ── */
.front-signup .signup-container .btn-primary {
  width: 100%;
  height: 48px;
  background: #2563eb !important;
  border-color: #2563eb !important;
  border-radius: 0.625rem !important;
  font-size: 0.9375rem !important;
  font-weight: 600;
  color: #fff !important;
  transition: background 0.15s, border-color 0.15s;
  box-shadow: none !important;
}
.front-signup .signup-container .btn-primary:hover {
  background: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
}

/* ── Legacy btn-auth ── */
.front-signup .signup-container .btn-auth {
  width: 100%; height: 48px;
  background: #2563eb; border: none; border-radius: 0.625rem;
  font-size: 0.9375rem; font-weight: 600; color: #fff;
  transition: background 0.15s;
}
.front-signup .signup-container .btn-auth:hover { background: #1d4ed8; }

/* ── Misc ── */
.front-signup .row .d-1:nth-child(3) { display: none; }
.front-signup .row .d-1 span:nth-of-type(1) { max-width: 472px; width: 100%; }

@media screen and (max-width: 1199px) {
  .front-signup { margin-top: 57px; }
  .front-signup .row .d-1:nth-child(1),
  .front-signup .row .d-1:nth-child(2) { display: none !important; }
  .front-signup .row .d-1:nth-child(3) { display: block; }
  .front-signup .signup-container { max-width: 100%; }
}

@media screen and (max-width: 768px) {
  .front-signup .signup-container { padding: 2rem 1.25rem !important; }
  .front-signup .auth-control { height: 44px !important; }
  .front-signup .signup-title { font-size: 1.125rem !important; }
}
</style>