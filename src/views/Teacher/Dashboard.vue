<template>
  <div>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card">
          <div class="card-body">
            <img alt="" class="rounded-3 mb-4" :src="form.file_image" height="200">

            <div class="accordion" id="accordionExample">
              <div v-for="item in ResponseData" :key="item.id" class="accordion-item">
                <h2 class="accordion-header" :id="`headingOne_`+item.id">
                  <div class="accordion-button font-weigt-bold collapsed" data-bs-toggle="collapse" :data-bs-target="`#collapseOne`+item.id" aria-expanded="true" :aria-controls="`collapseOne`+item.id" style="cursor:pointer;">
                    {{ item.name }}
                  </div>
                </h2>
                <div :id="`collapseOne`+item.id" class="accordion-collapse collapse" :aria-labelledby="`headingOne_`+item.id" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <p v-html="item.desc"></p>
                  </div>
                </div>
              </div>
            </div>

            <!--            <p class="card-text" v-html="form.text_back"></p>-->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header.vue'
import axios from "axios";
export default {
  name: "Dashboard",
  data () {
    return {
      ResponseData: {},
      form:{
        file: ''
      },
      showTopMenu: false
    }
  },
  components: {
    Header
  },
  methods:{
    LoadDesc(){
      axios.get(process.env.VUE_APP_BACKEND_URL+'/public/static/loadData')
          .then(response => {
            this.form=response.data;
          });
    },
    LoadData(){
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/RegGroup/loadData')
          .then(response => {
            this.ResponseData = response.data.data;
          });
    }
  },
  mounted() {
    this.LoadDesc();
    this.LoadData();
    this.showTopMenu=localStorage.getItem('showTopMenu');
  }
}
</script>

<style scoped>

</style>