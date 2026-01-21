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
    <div class="container-fluid py-5" v-if="!isLoading">
      <div class="row justify-content-center">
        <!-- Col -->
        <div class="col-md-7 col-lg-5">
          <!-- Card -->
          <div class="card">
            <div class="card-body p-4">
              <div class="text-center mb-5">
                <h1 class="text-center login-title">განაახლეთ თქვენი პაროლი</h1>
                <p>იმისათვის, რომ ანგარიში იყოს კარგად დაცული გთხოვთ გამოიყენოთ 8 ან მეტი ასოების, რიცხვების და სიმბოლოების ნაზავი.</p>
              </div>
              <div class="alert alert-danger" v-if="update_status=='password_error'">
                  პაროლი არ არის სწორი.
              </div>

              <div class="alert alert-success" v-if="update_status=='success'">
                თქვენი მოთხოვნა წარმატებით შესრულდა.
              </div>
              <form v-on:submit.prevent="submitForm">
                <!-- Form Group -->
                <div class="form-group">
                  <label class="input-label" for="recovery-password">პაროლი</label>
                  <input class="form-control form-control-lg" v-model="form.password" type="password" id="recovery-password" placeholder="ახალი პაროლი">
                </div>
                <!-- End Form Group -->
                <!-- Form Group -->
                <div class="form-group">
                  <label class="input-label" for="recovery-repassword">გაიმეორე პაროლი</label>
                  <input class="form-control form-control-lg" v-model="form.repassword" type="password" id="recovery-repassword" placeholder="გაიმეორე პაროლი">
                </div>
                <!-- End Form Group -->

                <!-- Button -->
                <button type="submit" class="btn btn-lg btn-block btn-primary">პაროლის განახლება</button>
                <!-- End Button -->

                <div class="text-center mt-3">
                  <router-link to="/Signin" style="font-size: 0.9rem;font-weight: bold">
                    <i class="fas fa-angle-left"></i>&nbsp; დაბრუნდი ავტორიზაციის გვერდზე
                  </router-link>
                </div>

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
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "PasswordReset",
  components: {
    Loading
  },
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
    }, 300)
  }
}
</script>

<style scoped>

</style>