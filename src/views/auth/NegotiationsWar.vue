<template>
  <div>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card">

          <div class="card-body">
            <div>
              <h5 class="card-title">მოლაპარაკებების ომი</h5>
              <br>
              <h6 class="card-title">Youtube embed URL</h6>
              <input class="form-control mb-3" v-model="form.youtube" type="text" placeholder="ვიდეო embed ლინკი">

              <h6 class="card-title">აღწერა</h6>
              <VueEditor :editorToolbar="customToolbar" v-model="form.text_front" placeholder="Description"/>

<!--              <br><br>
              <h5 class="card-title">Welcome გვერდის აღწერილობა</h5>
              <VueEditor :editorToolbar="customToolbar" v-model="form.text_back" placeholder="Description"/>-->
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
  name: "NegotiationsWar",
  data () {
    return {

      form:{
        text_front:'',
        text_back:'',
        youtube:''
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

      axios.put(process.env.VUE_APP_BACKEND_URL+'/auth/dealstatic/update_static',this.form, {
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
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/dealstatic/loadData',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.form=response.data;
          });
    },
    // uploadLogoSuccess: function(file, response) {
    //   this.form.file=response.success;
    // }
  },
  mounted() {
    this.LoadDesc();
    this.showTopMenu=localStorage.getItem('showTopMenu');
  }
}
</script>

<style scoped>

</style>