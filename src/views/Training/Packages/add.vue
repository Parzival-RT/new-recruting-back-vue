<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="fullPage"></loading>
    <Header />
    <div v-show="!isLoading" class="main" :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid training p-4">

        <div class="row mb-3">
          <!-- Col -->
          <div class="col-12">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-primary"><router-link
                    :to="'/Packages/' + this.$route.params.id">პაკეტები</router-link></li>
                <li class="breadcrumb-item" aria-current="page">პაკეტის დამატება</li>
              </ol>
            </nav>
          </div>
          <!-- End Col -->
        </div>

        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center bg-light">
            <span class="font-weigt-bold">დაამატე პაკეტი</span>
          </div>
          <div class="card-body">
            <!-- End Form -->
            <form class="row" v-on:submit.prevent="submitForm">
              <div class="col-12 mb-3">
                <label class="font-weigt-bold">გადახდის ტიპი</label>
                <v-select v-model="form.type" class="lss-form-select" label="text" placeholder="გადახდის ტიპი" :options="[
                  { text: 'თვეში', id: 'monthly' },
                  { text: 'წლიური', id: 'annual' },
                  { text: 'ერთიანი გადახდა', id: 'free' }]">
                </v-select>
              </div>
              <div class="col-12 mb-3">
                <label class="font-weigt-bold">პაკეტის დასახელება</label>
                <input type="text" v-model="form.name" class="form-control" placeholder="პაკეტის დასახელება">
              </div>

              <div class="col-12 mb-3">
                <label class="font-weigt-bold">პაკეტის ძველი ფასი</label>
                <input type="text" v-model="form.old_price" class="form-control" placeholder="პაკეტის ძველი ფასი">
              </div>

              <div class="col-12 mb-3">
                <label class="font-weigt-bold">პაკეტის ღირებულება</label>
                <input type="text" v-model="form.price" class="form-control" placeholder="პაკეტის ღირებულება">
              </div>

              <div class="col-12 mb-3">
                <label class="font-weigt-bold">რას მოიცავს</label>
                <textarea class="form-control" v-model="form.includes" rows="5"></textarea>
              </div>

              <div class="col-12 text-end">
                <button class="btn btn-primary"> + დამატება</button>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "add",
  components: {
    Header,
    Loading,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      form: {
        name: '',
        type: '',
        price: '',
        old_price: '',
        includes: '',
        traning_id: this.$route.params.id

      },
      editorConfig: {
        // The configuration of the editor.
      },
      dropzoneLogoOptions: {

        url: process.env.VUE_APP_BACKEND_URL + '/auth/traning/upload_photo',
        headers: {
          'Cache-Control': null,
          'X-Requested-With': null,
          'authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
        },
        thumbnailWidth: 200,
        addRemoveLinks: true,
        acceptedFiles: 'image/*'

      },
      customToolbar: [

        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        ["link"],
        ["clean"],
      ]
    }
  },
  methods: {
    onCancel() {
    },
    uploadLogoSuccess: function (image, response) {
      this.form.image = response.success;
    },
    submitForm() {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;

      axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/packages/create', this.form, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          this.isLoading = false;
          this.$router.push('/Packages/' + this.$route.params.id);
        })
        .catch((error) => {
          this.isLoading = false;

        });

    },
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false
    }, 300);
  }
}
</script>

<style scoped>
.card-header {
  border-top-left-radius: 0.75rem !important;
  border-top-right-radius: 0.75rem !important;
}
</style>