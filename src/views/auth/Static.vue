<template>
  <div>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card">

          <div class="card-body">
            <div>
              <h5 class="card-title">რეგისტრაცის გვერდის აღწერილობა</h5>
              <br>
              <h5 class="card-title">რატომ შეიქმნა ეს გვერდი?</h5>
              <input class="form-control mb-2" type="text" v-model="form.whyCreated_title"  placeholder="სათაური" />
              <VueEditor :editorToolbar="customToolbar" v-model="form.whyCreated_text" placeholder="აღწერა"/>
              <br>
              <h5 class="card-title">რას მიიღებთ ვაკანსიის ჩვენთან განთავსებით?</h5>
              <input class="form-control mb-2" type="text" v-model="form.whatDoYouGet_title"  placeholder="სათაური" />
              <VueEditor :editorToolbar="customToolbar" v-model="form.whatDoYouGet_text" placeholder="აღწერა"/>
              <br>
              <h5 class="card-title">რატომ ჯობია მოიძიო ახალი კანდიდატები ჩვენი გვერდის/სისტემის საშუალებით?</h5>
              <input class="form-control mb-2" type="text" v-model="form.findNewCandidats_title"  placeholder="სათაური" />
              <VueEditor :editorToolbar="customToolbar" v-model="form.findNewCandidats_text" placeholder="აღწერა"/>
              <br>
              <h5 class="card-title">რას ნიშნავს ვაკანსიის ეფექტური შედგენა?</h5>
              <input class="form-control mb-2" type="text" v-model="form.effectiveJob_title"  placeholder="სათაური" />
              <VueEditor :editorToolbar="customToolbar" v-model="form.effectiveJob_text" placeholder="აღწერა"/>
              <br>
              <h5 class="card-title">რას ნიშნავს კანდიდატების მოძიება პროაქტიულად?</h5>
              <input class="form-control mb-2" type="text" v-model="form.findeProactivelyCandidats_title"  placeholder="სათაური" />
              <VueEditor :editorToolbar="customToolbar" v-model="form.findeProactivelyCandidats_text" placeholder="აღწერა"/>
              <br>
              <h5 class="card-title">რა ღირს ვაკანსიის განთავსება?</h5>
              <input class="form-control mb-2" type="text" v-model="form.priceOfVacancy_title"  placeholder="სათაური" />
              <VueEditor :editorToolbar="customToolbar" v-model="form.priceOfVacancy_text" placeholder="აღწერა"/>
              <br>
              <h5 class="card-title">რამდენი არის დავით კენჭაძის გვერდის მიერ სოციალური ქსელების მოცვა?</h5>
              <input class="form-control mb-2" type="text" v-model="form.socialNetworkEngagement_title"  placeholder="სათაური" />
              <VueEditor :editorToolbar="customToolbar" v-model="form.socialNetworkEngagement_text" placeholder="აღწერა"/>
              <br>
              <h5 class="card-title">როგორი კომპანიები ანთავსებენ ვაკანსიებს სისტემაში</h5>
              <input class="form-control mb-2" type="text" v-model="form.companyTypes_title"  placeholder="სათაური" />
              <VueEditor :editorToolbar="customToolbar" v-model="form.companyTypes_text" placeholder="აღწერა"/>
              <br>


<!--              <VueEditor :editorToolbar="customToolbar" v-model="form.text_front" placeholder="Description"/>-->

<!--              <br><br>-->
<!--              <h5 class="card-title">Welcome გვერდის აღწერილობა</h5>-->
<!--              <VueEditor :editorToolbar="customToolbar" v-model="form.text_back" placeholder="Description"/>-->
<!--              <br><br>-->
              <h5 class="card-title">ატვირთე სურათი</h5>
              <vue-dropzone ref="myVueDropzoneLogo"  id="dropzone-logo" useCustomSlot=true :headers="dropzoneLogoOptions.headers" v-on:vdropzone-success="uploadLogoSuccess" :options="dropzoneLogoOptions">
                <div class="dropzone-custom-content">
                  <div class="subtitle"><i class="tio-upload-on-cloud"></i> ატვირთე სურათი</div>
                </div>
              </vue-dropzone>
              <img class="py-3" :src="form.file_image" height="200">
            </div>

            <button class="btn btn-primary float-end mt-2" @click="submitForm();">შენახვა</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { VueEditor } from "vue2-editor/dist/vue2-editor.core.js";
import Header from '@/components/Header.vue'
import axios from "axios";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import vue2Dropzone from 'vue2-dropzone';

export default {
  name: "Static",
  data () {
    return {

      form:{
        text_front:'',
        text_back:'',
        // --------
        whyCreated_title: '',
        whyCreated_text: '',
        whatDoYouGet_title: '',
        whatDoYouGet_text: '',
        findNewCandidats_title: '',
        findNewCandidats_text: '',
        effectiveJob_title: '',
        effectiveJob_text: '',
        findeProactivelyCandidats_title: '',
        findeProactivelyCandidats_text: '',
        priceOfVacancy_title: '',
        priceOfVacancy_text: '',
        socialNetworkEngagement_title: '',
        socialNetworkEngagement_text: '',
        companyTypes_title: '',
        companyTypes_text: '',
        file: ''
      },
      dropzoneLogoOptions: {

        url: process.env.VUE_APP_BACKEND_URL+'/auth/static/upload_photo',
        headers: {
          'Cache-Control': null,
          'X-Requested-With': null,
          'authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
        },
        thumbnailWidth: 200,
        addRemoveLinks: true,

      },
      showTopMenu: false,
      staticData:[],
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
  components: {
    Header,
    vueDropzone: vue2Dropzone
  },
  methods:{
    submitForm(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;

      axios.put(process.env.VUE_APP_BACKEND_URL+'/auth/static/update_static',this.form, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
            this.isLoading = false;
            this.$router.push('/');
          })
          .catch((error) => {
            this.isLoading = false;


          });

    },
    LoadDesc(){
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/static/loadData',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.form=response.data;
          });
    },
    uploadLogoSuccess: function(file, response) {
      this.form.file=response.success;
    }
  },
  mounted() {
    this.LoadDesc();
    this.showTopMenu=localStorage.getItem('showTopMenu');
  }
}
</script>

<style scoped>

</style>