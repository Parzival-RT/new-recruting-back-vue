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
                <h1 class="text-center login-title">დაგავიწყდა პაროლი?</h1>
                <p>შეიყვანეთ ელ.ფოსტის მისამართი, რომელითაც მოხდა რეგისტრაციის გავლა და ჩვენ გამოგიგზავნით თქვენი პაროლის აღდგენის ინსტრუქციას.</p>
              </div>
              <div class="alert alert-success" v-if="successAlert">
                    თქვენი მოთხოვნა წარმატებით შესრულდა.
              </div>
              <div class="alert alert-danger" v-if="failAlert">
                    შეყვანილი ელ.ფოსტა არ არის სწორი.
              </div>
              <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(submitForm)">
                <ValidationProvider name="How is it Measured" rules="required" v-slot="{ errors }">
                <!-- Form Group -->
                <div class="form-group">
                  <label class="input-label" for="recovery-email">ელ-ფოსტა</label>
                  <input class="form-control form-control-lg" v-model="form.email" type="email" id="recovery-email" placeholder="მიუთითე შენი ელ-ფოსტა">
                  <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                </div>

                  <!-- End Form Group -->
                </ValidationProvider>

                <!-- Button -->
                <button type="submit" class="btn btn-lg btn-block btn-primary">გაგზავნა</button>
                <!-- End Button -->

                <div class="text-center mt-3">
                  <router-link to="/Signin" style="font-size: 0.9rem;font-weight: bold">
                    <i class="fas fa-angle-left"></i>&nbsp; დაბრუნდი ავტორიზაციის გვერდზე
                  </router-link>
                </div>

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
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "Recovery",
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      successAlert: false,
      failAlert: false,
      form: {
        email: ''
      }
    }
  },
  methods: {
    onCancel() {

    },
    submitForm() {
      this.isLoading = true;
      axios.post(process.env.VUE_APP_BACKEND_URL+'/public/password_reset', this.form)
          .then((res) => {
            this.isLoading = false
            this.form.email = ""
            this.successAlert = true
          })
          .catch((error) => {
            this.isLoading = false
            this.failAlert = true
          });
    },
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

</style>