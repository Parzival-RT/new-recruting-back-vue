<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :is-full-page="fullPage"></loading>
    <Header/>
    <section class="front-signin">
      <div class="container">
        <!-- Row -->
        <div class="row">
          <!-- Col -->
          <!-- <div class="col-12 col-md-7 d-1"> -->
            <!-- <img class="img-fluid" alt="home image" src="../../../assets/image/Signin.png"> -->
          <!-- </div> -->
          <!-- Col -->
          <div class="col-12 w-100  d-flex justify-content-center  mb-5 mt-5">
            <ValidationObserver class="w-100" v-slot="{ handleSubmit }">
            <form v-on:submit.prevent="handleSubmit(submitForm)" class="signin-container border p-5 shadow-lg mx-auto">
              <h4 class="signin-title">ავტორიზაცია</h4>
              <div>
                <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                  <label>ელ.ფოსტა</label>
                  <input type="email"  v-model="form.email" class="auth-control d-block" placeholder="ელ.ფოსტა">
                  <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                </ValidationProvider>
              </div>
              <div>
                <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                  <label>პაროლი</label>
                  <input type="password" v-model="form.password" class="auth-control lost" placeholder="პაროლი">
                  <span  class="text-danger d-block" v-if="errors[0]">აუცილებელი ველი</span>
                </ValidationProvider>
                <router-link to="/Recovery"><span class="lost-passoword">დაგავიწყდა პაროლი?</span></router-link>
              </div>
              <div class="d-flex flex-column">
                <div class="text-center">
                  <span>არ გაქვთ ანგარიში?</span>
                  <router-link to="/Signup">რეგისტრაცია</router-link>
                </div>
                <button class="btn btn-primary py-2 rouned-3">შესვლა</button>
              </div>
            </form>
            </ValidationObserver>
          </div>
          <!-- Col -->
          <div class="col-12 d-none">
            <form v-on:submit.prevent="submitForm" @keydown="clearError" class="signin-container">
              <h4 class="signin-title">ავტორიზაცია</h4>
              <div>
                <label>ელ.ფოსტა</label>
                <input type="email" v-model="form.email" class="auth-control d-block" placeholder="ელ.ფოსტა">
              </div>
              <div>
                <label>პაროლი</label>
                <input type="password" v-model="form.password" class="auth-control lost" placeholder="პაროლი">
                <router-link to="/Recovery"><span class="lost-passoword">დაგავიწყდა პაროლი?</span></router-link>
              </div>
              <div class="d-flex flex-column">
                <div class="text-center">
                  <span>არ გაქვთ ანგარიში?</span>
                  <router-link to="/Signup">რეგისტრაცია</router-link>
                </div>
                <button class="btn-auth">შესვლა</button>
              </div>
            </form>
          </div>
        </div>
        <!-- End Row -->
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import Header from '@/components/FrontComponents/Header.vue'
import Footer from '@/components/FrontComponents/Footer_1.vue'

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
    Header,
    Footer,
    Loading
  },
  methods: {
    onCancel() {
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
    }, 300);
    window.scroll(0, 0);
  }
}
</script>

<style scoped>
h1,h2,h3,h4,h5,h6 {
  margin: 0!important;
}

/* ── Page ── */
.front-signin {
  margin-top: 82px;
  min-height: calc(100vh - 82px);
  background: #f8fafc;
  display: flex;
  align-items: flex-start;
  padding-bottom: 4rem;
}

/* ── Form card ── */
.front-signin .signin-container {
  max-width: 460px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px 0;
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 1.5rem !important;
  box-shadow: 0 4px 24px -6px rgba(0,0,0,0.09) !important;
  padding: 2.5rem 2.25rem !important;
}

/* ── Title ── */
.front-signin .signin-title {
  font-weight: 700 !important;
  font-size: 1.25rem !important;
  line-height: 1.3 !important;
  text-align: center !important;
  color: #111827 !important;
  margin-bottom: 0.25rem;
}

/* ── Labels ── */
.front-signin .signin-container label {
  display: block;
  font-weight: 600 !important;
  font-size: 0.8125rem !important;
  line-height: 1.4 !important;
  color: #374151 !important;
  margin-bottom: 0.4rem !important;
  text-transform: none !important;
}

/* ── Inputs ── */
.front-signin .auth-control {
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
.front-signin .auth-control:hover {
  border-color: #cbd5e1 !important;
}
.front-signin .auth-control:focus {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.1) !important;
  outline: none !important;
}
.front-signin input::placeholder {
  color: #9ca3af !important;
}
.front-signin .auth-control.lost {
  margin-bottom: 0.5rem;
}

/* ── Forgot password link ── */
.front-signin .lost-passoword {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;
}
.front-signin .lost-passoword:hover {
  text-decoration: underline;
}

/* ── Register row ── */
.front-signin .signin-container .text-center {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
.front-signin .signin-container .text-center span {
  font-size: 0.875rem !important;
  color: #6b7280 !important;
  margin-right: 0.375rem;
}
.front-signin .signin-container .text-center a {
  font-size: 0.875rem !important;
  font-weight: 600;
  color: #2563eb !important;
  text-decoration: none;
}
.front-signin .signin-container .text-center a:hover {
  text-decoration: underline;
}

/* ── Submit button (Bootstrap btn-primary) ── */
.front-signin .signin-container .btn-primary {
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
.front-signin .signin-container .btn-primary:hover {
  background: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
}

/* ── Legacy btn-auth (d-none form) ── */
.front-signin .signin-container .btn-auth {
  width: 100%;
  height: 48px;
  background: #2563eb;
  border: none;
  border-radius: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #fff;
  transition: background 0.15s;
}
.front-signin .signin-container .btn-auth:hover {
  background: #1d4ed8;
}

/* ── Misc ── */
.front-signin .row .d-1:nth-child(3) { display: none; }
.front-signin .row .d-1 span:nth-of-type(1) { max-width: 472px; width: 100%; }

@media screen and (max-width: 1199px) {
  .front-signin { margin-top: 57px; }
  .front-signin .row .d-1:nth-child(1),
  .front-signin .row .d-1:nth-child(2) { display: none !important; }
  .front-signin .row .d-1:nth-child(3) { display: block; }
  .front-signin .signin-container { max-width: 100%; }
}

@media screen and (max-width: 768px) {
  .front-signin .signin-container { padding: 2rem 1.25rem !important; }
  .front-signin .auth-control { height: 44px !important; }
  .front-signin .signin-title { font-size: 1.125rem !important; }
}
</style>