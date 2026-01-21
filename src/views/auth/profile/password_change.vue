<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"></loading>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card">
          <h5 class="card-header bg-transparent">პაროლის ცვლილება</h5>
          <div class="card-body">

            <form  v-on:submit.prevent="submitForm" class="rowpt-70">

              <div class="col-md-12 mb-3">
                <label>ძველი პაროლი</label>
                <input type="password" v-model="form.old_password" class="form-control" placeholder="ძველი პაროლი">
              </div>

              <div class="col-md-12 mb-3">
                <label>ახალი პაროლი</label>
                <input type="password" v-model="form.password" class="form-control" placeholder="ახალი პაროლი">
              </div>


              <div class="col-md-12 mb-3">
                <label>გაიმეორეთ ახალი პაროლი</label>
                <input type="password" v-model="form.re_password" class="form-control" placeholder="გაიმეორეთ ახალი პაროლი">
              </div>

              <div class="col-md-12">
                <button class="btn btn-primary">შენახვა</button>
              </div>

            </form>





          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import Header from "@/components/Header";
import axios from "axios";
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'
export default {
  name: "PasswordChange",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      error:false,
      errors:{},
      form:{
        "old_password":'',
        "password":'',
        "re_password":''
      }


    }
  },
  components: {
    Loading,
    Header,
  },
  methods: {

    submitForm(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;

      axios.put(process.env.VUE_APP_BACKEND_URL+'/auth/change_password',this.form, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
            this.isLoading = false;
            this.$router.push('/Details');
          })
          .catch((error) => {
            this.isLoading = false;


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