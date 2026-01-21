<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :is-full-page="fullPage"></loading>
    <Header/>
    <section class="front-recovery">
      <div class="container">
        <!-- Row -->
        <div class="row">
          <!-- Col -->
          <!-- <div class="col-12 col-md-7 d-1">
            <img class="img-fluid" alt="home image" src="../../../assets/image/home.png">
          </div> -->
          <!-- Col -->
          <div class="col-12 d-flex  justify-content-center ">
            <div class="alert alert-success w-100 m-0" v-if="successAlert" style="max-width: 472px;">
              თქვენი მოთხოვნა წარმატებით შესრულდა.
            </div>
            <div class="alert alert-danger w-100 m-0" v-if="failAlert" style="max-width: 472px">
              შეყვანილი ელ.ფოსტა არ არის სწორი.
            </div>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(submitForm)" class="recovery-container border shadow-lg p-5 mx-auto">
                <div class="text-center w-100 m-0" style="max-width: 472px;">
                  <p class="m-0">იმისათვის, რომ ანგარიში იყოს კარგად დაცული გთხოვთ გამოიყენოთ 8 ან მეტი ასოების, რიცხვების და სიმბოლოების ნაზავი.</p>
                </div>
                <h4 class="recovery-title">პაროლის აღდგენა</h4>
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
                </div>
                <div class="d-flex flex-column">
                  <div class="text-center">
                  </div>
                  <button class="btn btn-primary py-2 rouned-3">გაგზავნა</button>
                </div>
              </form>
            </ValidationObserver>
          </div>
          <!-- Col -->
          <div class="col-12 d-none">
            <div class="alert alert-success w-100 m-0" v-if="successAlert">
              თქვენი მოთხოვნა წარმატებით შესრულდა.
            </div>
            <div class="alert alert-danger w-100 m-0" v-if="failAlert">
              შეყვანილი ელ.ფოსტა არ არის სწორი.
            </div>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(submitForm)" class="recovery-container">
                <div class="text-center m-0">
                  <p class="m-0">შეიყვანეთ ელ.ფოსტის მისამართი, რომლითაც მოხდა რეგისტრაციის გავლა და ჩვენ გამოგიგზავნით თქვენი პაროლის აღდგენის ინსტრუქციას.</p>
                </div>
                <h4 class="recovery-title">პაროლის აღდგენა</h4>
                <div>
                  <ValidationProvider name="How is it Measured" rules="required|email" v-slot="{ errors }">
                    <label for="recovery-email">ელ.ფოსტა</label>
                    <input class="auth-control" v-model="form.email" type="email" id="recovery-email" placeholder="მიუთითე შენი ელ-ფოსტა">
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                  </ValidationProvider>
                </div>
                <div class="d-flex flex-column">
                  <div class="text-center">
                  </div>
                  <button class="btn-auth">აღდგენა</button>
                </div>
              </form>
            </ValidationObserver>
          </div>
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
  name: "PasswordReset",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      successAlert: false,
      update_status:'',
      form: {
        password: '',
        repassword:'',
        reset_token:this.$route.query.token
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
    submitForm() {
      this.isLoading = true;
      axios.post(process.env.VUE_APP_BACKEND_URL+'/public/update_password', this.form)
          .then((res) => {
            this.isLoading = false
            this.form.password = ""
            this.form.repassword = ""
            this.email = ""
            this.successAlert = true
            this.update_status=res.data.status;
            setTimeout(() => {
              this.$router.push('/Signin');
            }, 3000)
          })
          .catch((error) => {
            this.update_status=error.response.data.status;
            this.isLoading = false
          });
    },
    CheckToken(){
      this.isLoading = true;
      axios.post(process.env.VUE_APP_BACKEND_URL+'/public/check_token', {"token":this.$route.query.token})
          .then((res) => {
            this.isLoading = false
          })
          .catch((error) => {
            this.isLoading = false;
            this.$router.push('/Signin');
          });
    }
  },
  mounted() {
    this.CheckToken();
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
.front-recovery {
  margin-top: 109px;
}
.front-recovery .recovery-container {
  max-width: 472px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px 0;
  padding-top:32px;
  border-radius: 1.5rem;
}
.front-recovery .recovery-title {
  font-family: var(--First-Font);
  font-style: normal!important;
  font-weight: 500!important;
  font-size: 18px!important;
  line-height: 22px!important;

  text-align: center!important;
  font-feature-settings: 'case' on!important;

  color: var(--Second-Color)!important;

}
.front-recovery .recovery-container label {
  font-family: var(--Third-Font)!important;
  font-style: normal!important;
  font-weight: 400!important;
  font-size: 16px!important;
  line-height: 19px!important;
  text-transform: lowercase!important;

  color: var(--Second-Color)!important;
  margin-bottom: 10px!important;
}
.front-recovery .auth-control {
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
  text-transform: lowercase!important;

  color: rgba(66, 66, 66, 0.5);

}
.front-recovery .auth-control:hover,
.front-recovery .auth-control:focus {
  border: 1px solid var(--input-border-hover) !important;
}
.front-recovery .auth-control.lost {
  margin-bottom: 16px;
}
.front-recovery .lost-passoword {
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #31319D;
}
.front-recovery input::placeholder {
  color: rgba(66, 66, 66, 0.5) !important;
}
.front-recovery input:focus {
  outline: none!important;
}
.front-recovery .recovery-container .text-center {
  margin-top:4px;
  margin-bottom: 16px;
}
.front-recovery .recovery-container .text-center span {
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: var(--Second-Color);
  margin-right: 16px;
}
.front-recovery .recovery-container .text-center a {
  font-family: var(--Third-Font);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-decoration: none;

  color: #31319D;
}
.front-recovery .recovery-container .text-center a:hover {
  text-decoration-line: underline;
}
.front-recovery .recovery-container .btn-auth {
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
.front-recovery .recovery-container .btn-auth:hover {
  background: var(--Second-Color-Background-Btn-Hover);
}
.front-recovery .row .d-1:nth-child(3) {
  display: none;
}
.front-recovery .row .d-1 span:nth-of-type(1) {
  max-width: 472px;
  width: 100%;
}
@media screen and (max-width: 1199px) {
  .front-recovery {
    margin-top: 57px;
  }
  .front-recovery .row .d-1:nth-child(1),
  .front-recovery .row .d-1:nth-child(2) {
    display: none!important;
  }
  .front-recovery .row .d-1:nth-child(3) {
    display: block;
  }
  .front-recovery .recovery-container {
    max-width: 100%;
    padding-top: 32px;
  }
}
@media screen and (max-width: 768px) {
  .front-footer {
    margin-top: 268px;
  }
  .front-recovery .auth-control {
    height: 50px!important;
    padding: 16px 28px 17px 28px!important;
  }
  .front-recovery .recovery-title {
    font-size: 16px!important;
    line-height: 19px!important;
  }
  .front-recovery .recovery-container label {
    margin-bottom: 16px;
    font-size: 14px!important;
    line-height: 17px!important;
  }
  .front-recovery .recovery-container .text-center span {
    font-size: 14px!important;
    line-height: 17px!important;
  }
  .front-recovery .recovery-container .text-center a {
    font-size: 14px!important;
    line-height: 17px!important;
  }
  .front-recovery .recovery-container .btn-auth {
    height: 50px;
  }
}
</style>
