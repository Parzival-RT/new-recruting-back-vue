<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"></loading>
    <Header/>
    <section class="main vacancy" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <!-- Row -->
        <div class="row">
          <!-- Col -->
          <div class="col-12 mb-4">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-primary"><router-link to="/VacancyDashboard">ვაკანსიების სტატუსი</router-link></li>
                <li class="breadcrumb-item" aria-current="page">
                  <span v-if="vacancyStatus=='published'">გამოქვეყნებული</span>
                  <span v-if="vacancyStatus=='approved'">დადასტურებული</span>
                  <span v-if="vacancyStatus=='pendding'">განსახილველი</span>
                  <span v-if="vacancyStatus=='unpublished'">გაუქმებული</span>
                </li>
              </ol>
            </nav>


          </div>
          <!-- End Col -->


          <!-- Col -->
          <div class="col-12 col-md-12 mb-3" v-for="item in LoadVacancy">
            <div class="card">
              <div class="card-header d-flex">
                <small class="" v-if="item.id">
                  {{ item.id }}
                </small>
                <small class="ms-auto" v-if="item.amount_type=='1'">
                  მინ: {{ item.avarage_min_bonus}} {{ item.currency}} - მაქს: {{ item.avarage_max_bonus}} {{ item.currency}}
                </small>
                <small class="ms-auto" v-if="item.amount_type=='2'">
                  მინ: {{ item.min_amount}} {{ item.currency}} - მაქს: {{ item.max_amount}} {{ item.currency}}
                </small>
                <small class="ms-auto" v-if="item.amount_type=='3'">
                  ფიქსირებული: {{ item.fixed_amount }} {{ item.currency}}
                </small>


              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <b v-b-tooltip.hover.top="'პოზიციის დასახელება'">{{ item.position }}</b>

                  <span class="badge rounded-pill bg-green" style="line-height: 1.4" v-if="vacancyStatus=='published'">
                  გამოქვეყნებული
                </span>
                  <span class="badge rounded-pill bg-primary" style="line-height: 1.4" v-if="vacancyStatus=='approved'">
                  დადასტურებული
                </span>
                  <span class="badge rounded-pill bg-warning" style="line-height: 1.4" v-if="vacancyStatus=='pendding'">
                  განსახილველი
                </span>
                  <span class="badge rounded-pill bg-danger" style="line-height: 1.4" v-if="vacancyStatus=='unpublished'">
                  გაუქმებული
                </span>


                </div>
                <!--              <small class="text-muted" title="დამატების თარიღი"> {{ item.created_at }}</small>-->
                <small class="card-title text-muted d-block mb-0 mt-2">
                  <b>{{ item.detail_name}}</b>
                </small>
                <small class="card-title text-muted">
                  {{ item.detail_address}}
                </small>
                <br><br>
                <small class="card-title text-muted">
                  ვაკანსიის დასრულების ვადა:
                  {{ item.end_at}}
                </small>
              </div>
              <div class="card-footer text-muted bg-transparent">
                <div class="row align-items-center">
                  <div class="col-6 col-md-2">
                    <button v-if="param=='published'" class="btn btn-danger btn-sm w-100" data-bs-toggle="modal" :data-bs-target="`#turnOff_`+item.id">გათიშვა</button>
                    <button v-if="param=='unpublished'" class="btn btn-success btn-sm w-100" @click="VacancyStatusChange(item.id,'pendding');">გააქტიურება</button>
                  </div>
                  <div class="col-6 col-md-2" v-show="param == 'published' && permission=='administrator'">
                    <button type="button" class="btn btn-primary btn-sm w-100" data-bs-toggle="modal" :data-bs-target="`#exampleModal_`+item.id">კოპირება</button>
                  </div>
                  <div class="col-6 col-md-2 mt-2 mt-md-0 ms-0 ms-md-auto">
                    <button class="btn btn-sm btn-success w-100" title="CV-ები" @click="LoadCandidates(item.id)" v-if="vacancyStatus=='published'">
                      {{ item.count }} CV
                    </button>
                  </div>
                  <div class="col-6 col-md-2 mt-2 mt-md-0">
                    <a :href="'/vacancy/'+item.id+'/edit'" v-if="param=='published'  && permission=='administrator'">
                      <button class="btn btn-yellow btn-sm ms-auto w-100" title="ვაკანსიის რედაქტირება">
                        რედაქტირება
                      </button>
                    </a>


                    <a :href="'/vacancy/'+item.id+'/edit'" v-if="param!='published' && param!='unpublished'">
                      <button class="btn btn-yellow btn-sm ms-auto w-100" title="ვაკანსიის რედაქტირება">
                        რედაქტირება
                      </button>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
          <!-- End Col -->



        </div>
        <!-- End Row -->
      </div>
    </section>

    <!-- Vacancy Copy Modal -->
    <div class="modal fade" :id="`exampleModal_`+item.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-for="item in LoadVacancy">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ვაკანსიის დაკოპირება</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="border rounded p-3" :id="`copyVacancy_`+item.id">
              <li>
                <p>თუ დაალაიქებ ან დააკომენტარებ ამ ვაკანსიას ეს ნიშნავს, რომ მეტი ადამიანი ნახავს ამ პოსტს. შესაბამისად მეტ ადამიანს დაეხმარები #დასაქმება-ში. ძალა ერთობაშია ❤️</p>
              </li>
              <li><span class="font-weigt-bold">📢 #ვაკანსია: </span> {{ item.position }}</li>
              <li><span class="font-weigt-bold">🔴️ ანაზღაურების ტიპი:</span> {{ item.amount_type_value}}  </li>
              <li v-show="item.fixed_amount"><span class="font-weigt-bold">🔴️ ფიქსირებული:</span> {{ item.fixed_amount }} {{ item.currency }}</li>
              <li v-if="item.amount_type=='1'"><span class="font-weigt-bold">🔴️ ჯამური საშუალო #შემოსავალი:</span> <span v-if="item.amount_type=='1'">{{ item.avarage_min_bonus }}</span> {{ item.currency }} - <span v-if="item.amount_type=='1'">{{ item.avarage_max_bonus }}</span>{{ item.currency }}</li>
              <li v-if="item.amount_type=='2'"><span class="font-weigt-bold">🔴️ ჯამური საშუალო #შემოსავალი:</span> <span v-if="item.amount_type=='2'">{{ item.min_amount }}</span> {{ item.currency }} - <span v-if="item.amount_type=='2'">{{ item.max_amount }}</span> {{ item.currency }}</li>
              <li><span class="font-weigt-bold">🚀 საქმიანობა, რომლის გაკეთებაც უნდა იცოდე კარგად:</span> {{ item.sphere }} </li>
              <br>
              <li v-show="item.brandname"><span class="font-weigt-bold">🟢️ კომპანია:</span> {{ item.brandname }}</li>
              <li><span class="font-weigt-bold">🟢️ სამუშაო გრაფიკი:</span> {{ item.work_schedule }}</li>
              <li><span class="font-weigt-bold">🟢️ გამოცდილება:</span> {{ item.work_experience }} </li>
              <li><span class="font-weigt-bold">🟢️ ქალაქი:</span> {{ item.location }} </li>
              <br>
              <li>
                <p>დეტალების ნახვა და სივის გაგზავნა შესაძლებელია კომენტარში მითითებულ მისამართზე</p>
              </li>
              <li>
                <p>დეტალური ინფორმაციის ნახვა და CV ის გაგზავნა შესაძლებელია აქ: https://motivation.ge/VacancyDetails/{{ item.id }}</p>
              </li>
            </ul>
            <div v-if="copyButton" class="text-success text-center">
              ტექსტი დაკოპირებულია
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">დახურვა</button>
            <button type="button" class="btn btn-primary" @click="copy(`copyVacancy_`+item.id)">კოპირება</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Vacancy Turn Off  -->
    <div class="modal fade" :id="'turnOff_'+item.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" v-for="item in LoadVacancy">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">ვაკანსიის გათიშვა</h5>
          </div>
          <div class="modal-body">
            ნამდვილად გსურთ ვაკანსიის გათიშვა?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">გაუქმება</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="VacancyStatusChange(item.id,'unpublished');">გათიშვა</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapActions, mapGetters } from "vuex";

export default {
  name: "My__Subjects",
  data() {
    return {
      showTopMenu: true,
      LoadVacancy:[],
      vacancyStatus:'',
      isLoading: false,
      fullPage: true,
      isActive: true,
      param:this.$route.params.param,
      copyButton: false
    }
  },
  components: {
    Header,
    Loading
  },
  methods:{
    /* ...mapActions({ addPermission: "setCurrentPermission" }),*/
    LoadVacancies(){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/vacancy/LoadVacancies/'+this.$route.params.param,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.LoadVacancy=response.data;
            this.isLoading = false;
          });
    },
    LoadCandidates(id){

      this.$router.push({ name: 'CandidatsDashboard', params: { id: id  } })
    },
    VacancyStatusChange(id,status){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/vacancy/vacancy_status_change/'+id,{
        status:status
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.LoadVacancies();
            this.isLoading = false;
          });
    },
    uploadLogoSuccess: function(file, response) {
      this.form.logo=response.success;
    },
    copy(id){
      var r = document.createRange();
      r.selectNode(document.getElementById(id));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      this.copyButton = true;
      setTimeout(() => this.copyButton=false, 3000);
    }
  },
  mounted(){
    /*  this.addPermission();*/
    this.LoadVacancies();
    this.vacancyStatus=this.$route.params.param;
  },
  computed: {
    ...mapGetters({ permission: "getCurrentPermission" })
    // joke() {
    // return this.getCurrentJoke;
    // }
  }
}
</script>

<style scoped>
</style>