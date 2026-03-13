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
          <div class="col-12 d-flex  justify-content-center mt-5 mb-5">
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
h1,h2,h3,h4,h5,h6 { margin: 0 !important; }

/* ── Page ── */
.front-recovery {
  margin-top: 82px;
  min-height: calc(100vh - 82px);
  background: #f8fafc;
  padding-bottom: 4rem;
}

/* ── Alerts ── */
.front-recovery .alert {
  border-radius: 0.75rem !important;
  font-size: 0.875rem;
  font-weight: 500;
}

/* ── Form card ── */
.front-recovery .recovery-container {
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

/* ── Description text ── */
.front-recovery .recovery-container .text-center p {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
}

/* ── Title ── */
.front-recovery .recovery-title {
  font-weight: 700 !important;
  font-size: 1.25rem !important;
  line-height: 1.3 !important;
  text-align: center !important;
  color: #111827 !important;
}

/* ── Labels ── */
.front-recovery .recovery-container label {
  display: block;
  font-weight: 600 !important;
  font-size: 0.8125rem !important;
  line-height: 1.4 !important;
  color: #374151 !important;
  margin-bottom: 0.4rem !important;
  text-transform: none !important;
}

/* ── Inputs ── */
.front-recovery .auth-control {
  width: 100% !important;
  height: 48px !important;
  background: #fff !important;
  padding: 0 1rem !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 0.625rem !important;
  font-size: 0.9375rem !important;
  color: #111827 !important;
  text-transform: none !important;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.front-recovery .auth-control:hover {
  border-color: #cbd5e1 !important;
}
.front-recovery .auth-control:focus {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.1) !important;
  outline: none !important;
}
.front-recovery input::placeholder { color: #9ca3af !important; }

/* ── Submit button (Bootstrap btn-primary) ── */
.front-recovery .recovery-container .btn-primary {
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
.front-recovery .recovery-container .btn-primary:hover {
  background: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
}

/* ── Legacy btn-auth ── */
.front-recovery .recovery-container .btn-auth {
  width: 100%; height: 48px;
  background: #2563eb; border: none; border-radius: 0.625rem;
  font-size: 0.9375rem; font-weight: 600; color: #fff;
  transition: background 0.15s;
}
.front-recovery .recovery-container .btn-auth:hover { background: #1d4ed8; }

/* ── Misc ── */
.front-recovery .row .d-1:nth-child(3) { display: none; }
.front-recovery .row .d-1 span:nth-of-type(1) { max-width: 472px; width: 100%; }

@media screen and (max-width: 1199px) {
  .front-recovery { margin-top: 57px; }
  .front-recovery .row .d-1:nth-child(1),
  .front-recovery .row .d-1:nth-child(2) { display: none !important; }
  .front-recovery .row .d-1:nth-child(3) { display: block; }
  .front-recovery .recovery-container { max-width: 100%; }
}

@media screen and (max-width: 768px) {
  .front-recovery .recovery-container { padding: 2rem 1.25rem !important; }
  .front-recovery .auth-control { height: 44px !important; }
  .front-recovery .recovery-title { font-size: 1.125rem !important; }
}
</style>
