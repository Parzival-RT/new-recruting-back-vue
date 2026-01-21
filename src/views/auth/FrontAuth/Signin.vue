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
          <div class="col-12 w-100  d-flex justify-content-center  mb-5">
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
/* Auth (signin) */
.front-signin {
  margin-top: 109px;
}
.front-signin .signin-container {
  max-width: 472px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px 0;
  padding-top:32px;
  border-radius: 1.5rem;
}
.front-signin .signin-title {
  font-family: var(--First-Font);
  font-style: normal!important;
  font-weight: 500!important;
  font-size: 18px!important;
  line-height: 22px!important;

  text-align: center!important;
  font-feature-settings: 'case' on!important;

  color: var(--Second-Color)!important;

}
.front-signin .signin-container label {
  font-family: var(--Third-Font)!important;
  font-style: normal!important;
  font-weight: 400!important;
  font-size: 16px!important;
  line-height: 19px!important;
  text-transform: lowercase!important;

  color: var(--Second-Color)!important;
  margin-bottom: 10px!important;
}
.front-signin .auth-control {
  width: 100%!important;
  height: 56px!important;
  background: var(--input-background)!important;
  padding: 17px 17px 18px!important;
  border: 1px solid var(--input-border)!important;
  border-radius: 10px!important;

  font-family: var(--Third-Font)!important;
  font-style: normal!important;
  font-weight: 400!important;
  font-size: 16px!important;
  line-height: 19px!important;

  color: rgba(66, 66, 66, 0.5);

}
.front-signin .auth-control:hover,
.front-signin .auth-control:focus {
  border: 1px solid var(--input-border-hover) !important;
}
.front-signin .auth-control.lost {
  margin-bottom: 16px;
}
.front-signin .lost-passoword {
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #31319D;
}
.front-signin input::placeholder {
  color: rgba(66, 66, 66, 0.5) !important;
}
.front-signin input:focus {
  outline: none!important;
}
.front-signin .signin-container .text-center {
  margin-top:4px;
  margin-bottom: 16px;
}
.front-signin .signin-container .text-center span {
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: var(--Second-Color);
  margin-right: 16px;
}
.front-signin .signin-container .text-center a {
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-decoration: none;

  color: #31319D;
}
.front-signin .signin-container .text-center a:hover {
  text-decoration-line: underline;
}
.front-signin .signin-container .btn-auth {
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
.front-signin .signin-container .btn-auth:hover {
  background: var(--Second-Color-Background-Btn-Hover);
}
.front-signin .row .d-1:nth-child(3) {
  display: none;
}
.front-signin .row .d-1 span:nth-of-type(1) {
  max-width: 472px;
  width: 100%;
}
@media screen and (max-width: 1366px) {
  .front-signin .img-fluid {
    max-width: 500px;
    width: 100%;
  }
}
@media screen and (max-width: 1199px) {
  .front-signin {
    margin-top: 57px;
  }
  .front-signin .row .d-1:nth-child(1),
  .front-signin .row .d-1:nth-child(2) {
    display: none!important;
  }
  .front-signin .row .d-1:nth-child(3) {
    display: block;
  }
  .front-signin .signin-container {
    max-width: 100%;
    padding-top: 32px;
  }
}
@media screen and (max-width: 768px) {
  .front-footer {
    margin-top: 268px;
  }
  .front-signin .auth-control {
    height: 50px!important;
    padding: 16px 28px 17px 28px!important;
  }
  .front-signin .signin-title {
    font-size: 16px!important;
    line-height: 19px!important;
  }
  .front-signin .signin-container label {
    margin-bottom: 16px;
    font-size: 14px!important;
    line-height: 17px!important;
  }
  .front-signin .signin-container .text-center span {
    font-size: 14px!important;
    line-height: 17px!important;
  }
  .front-signin .signin-container .text-center a {
    font-size: 14px!important;
    line-height: 17px!important;
  }
  .front-signin .signin-container .btn-auth {
    height: 50px;
  }
}
</style>