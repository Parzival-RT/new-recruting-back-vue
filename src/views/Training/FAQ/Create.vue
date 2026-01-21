<template>
    <div>
      <loading :active.sync="isLoading"
               :can-cancel="true"
               :on-cancel="onCancel"
               :is-full-page="fullPage"></loading>
      <Header/>
      <div v-show="!isLoading" class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
        <div class="container-fluid training p-4">
  
          <div class="row mb-3">
            <!-- Col -->
            <div class="col-12">
              <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item text-primary"><router-link :to="'/FAQ/'+this.$route.params.id">FAQ</router-link></li>
                  <li class="breadcrumb-item" aria-current="page">FAQ დამატება</li>
                </ol>
              </nav>
            </div>
            <!-- End Col -->
          </div>
  
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center bg-light">
              <span class="font-weigt-bold">დაამატე FAQ</span>
            </div>
            <div class="card-body">
              <!-- End Form -->
              <form class="row" v-on:submit.prevent="submitForm">
                <div class="col-12 mb-3">
                  <label class="font-weigt-bold">FAQ დასახელება</label>
                  <input type="text" v-model="form.name" class="form-control" placeholder="FAQ დასახელება">
                </div>
                <div class="col-12 mb-3">
                  <label class="font-weigt-bold">აღწერა</label>
                  <ckeditor v-model="form.description" placeholder="აღწერა"></ckeditor>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label class="font-weigt-bold">სორტირების რიგი</label>
                  <input type="text" v-model="form.sort" class="form-control" placeholder="მიუთითე რიგის ნომერი">
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
    name: "Create",
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
          description: '',
          sort: ''
        },
        editorConfig: {
          // The configuration of the editor.
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
      submitForm(){

        if(this.form.name === '' || this.form.description === '' || this.form.sort === '') {
            alert('გამოგრჩა ველი შეავსე')
            return
        }
       
        
        this.isLoading = true;
        const token = JSON.parse(localStorage.getItem('user')).access_token;
  
        axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/Faq/create', {
            name: this.form.name,
            description:this.form.description,
            sort: this.form.sort,
            traning_id: this.$route.params.id
        } , {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then((res) => {
              this.isLoading = false;
              this.$router.push('/FAQ/'+this.$route.params.id);
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
    border-top-left-radius: 0.75rem!important;
    border-top-right-radius: 0.75rem!important;
  }
  </style>