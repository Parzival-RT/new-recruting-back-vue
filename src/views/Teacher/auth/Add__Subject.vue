<template>
  <div>
    <Header/>
    <section class="main vacancy" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <!-- Row -->
        <div class="row">
          <!-- Col -->
          <div class="col-12 mb-4">
            <h1 class="page-title">საგნის რეგისტრაცია</h1>
          </div>
          <!-- End Col -->

          <ValidationObserver v-slot="{ handleSubmit }">
            <form v-if="permissions.vacancy_permission=='enabled'"   @submit.prevent="handleSubmit(submitForm)" class="rowpt-70">
              <!-- Col -->
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <form class="row">

                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                          <label class="font-weigt-bold">ტრენერის სახელი და გვარი </label>
                          <input type="text" disabled class="form-control" style="height: 53px;" placeholder="სახელი და გვარი">
                      </div>
                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                          <label class="font-weigt-bold">ტრენერის ელ.ფოსტა </label>
                          <input type="text" disabled class="form-control" style="height: 53px;" placeholder="ელ.ფოსტა">
                      </div>
                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                          <label class="font-weigt-bold">ვებ-გვერდი </label>
                          <input type="text" class="form-control" style="height: 53px;" placeholder="ვებ-გვერდი">
                      </div>
                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                          <label class="font-weigt-bold">ფბ-გვერდი </label>
                          <input type="text" class="form-control" style="height: 53px;" placeholder="ფბ-გვერდი">
                      </div>





                      <div class="form-group col-12">
                        <div class="card-header ps-0">
                          <div class="font-weigt-bold">მახასიათებლები</div>
                        </div>
                      </div>

                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider name="Location" rules="required" v-slot="{ errors }">
                          <label class="font-weigt-bold">საგანი/საქმიანობა  <i class="tio-info text-primary" v-b-tooltip.hover title="გთხოვთ შეიყვანოთ იმ საგნის ან საქმიანობის დასახელება რომელსაც შეასწავლით მოსწავლეს"></i></label>
                          <input type="text" class="form-control" style="height: 53px;" placeholder="საგანი/საქმიანობა">
                          <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                        </ValidationProvider>

                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider name="Location" rules="required" v-slot="{ errors }">
                          <label class="font-weigt-bold">ქალაქი  </label>
                          <v-select v-model="form.location" class="lss-form-select" placeholder="აირჩიეთ ქალაქი" label="text" :options="LocationData"></v-select>
                          <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                        </ValidationProvider>

                      </div>

                      <!-- End Col -->


                      <!-- Col -->
                      <div class="form-group col-12 col-md-9">
                        <ValidationProvider name="Vacancy Fixed Variable max amount" rules="required" v-slot="{ errors }">

                          <label class="font-weigt-bold d-block">სწავლის ხანგრძლივობა საათებში <i class="fa fa-info-circle text-primary" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#teachingTime"></i></label>
                          <div class="row" role="group" aria-label="Basic radio toggle button group">


                            <div class="col-12 col-md-6" v-if="salary != '1' && salary != '2'">
                              <input type="radio" class="btn-check show" name="salary" id="salary1" autocomplete="off" @click="salaryAmount('1')" :class="{show:salary == '1'}" data-bs-toggle="modal" data-bs-target="#teachingTime">
                              <label class="btn btn-outline-primary w-100" for="salary1">წინასწარ განსაზვრული პროგრამა</label>
                            </div>

                            <div class="col-12 col-md-6" v-if="salary != '1' && salary != '2'">
                              <input type="radio" class="btn-check" name="salary" id="salary2" autocomplete="off" @click="salaryAmount('2')" :class="{show:salary == '2'}" data-bs-toggle="modal" data-bs-target="#teachingTime">
                              <label class="btn btn-outline-primary w-100" for="salary2">საათობრივი სწავლება </label>
                            </div>


                          <div class="col-12 col-md-6" v-if="salary == '1' || salary == '2'">
                            <input :checked="salary == '1'" type="radio" class="btn-check show" name="salary" id="salary1" autocomplete="off" @click="salaryAmount('1')" :class="{show:salary == '1'}">
                            <label class="btn btn-outline-primary w-100" for="salary1">წინასწარ განსაზვრული პროგრამა</label>
                          </div>

                          <div class="col-12 col-md-6" v-if="salary == '1' || salary == '2'">
                            <input :checked="salary == '2'" type="radio" class="btn-check" name="salary" id="salary2" autocomplete="off" @click="salaryAmount('2')" :class="{show:salary == '2'}">
                            <label class="btn btn-outline-primary w-100" for="salary2">საათობრივი სწავლება</label>
                          </div>

                          <span  class="text-danger" v-if="errors[0]">აუცილებელი მოსანიშნი</span>
                          </div>
                        </ValidationProvider>
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12" v-if="salary == '1'">
                        <!-- Card -->
                        <div class="card">
                          <div class="card-header bg-light">
                            <h5 class="card-title" >წინასწარ განსაზღვრული პროგრამა</h5>
                          </div>
                          <div class="card-body">
                            <!-- Row -->
                            <div class="row">
                              <!-- Col -->
                              <div class="form-group col-12">


                              </div>
                              <!-- End Col -->

                              <!-- Col -->
                              <div class="form-group col-6">

                              </div>
                              <!-- End Col -->

                              <!-- Col -->
                              <div class="form-group col-6">

                              </div>
                              <!-- End Col -->
                            </div>
                            <!-- End Row -->
                          </div>
                        </div>
                        <!-- Card -->
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12" v-if="salary == '2'" >
                        <!-- Card -->
                        <div class="card">
                          <div class="card-header bg-light">
                            <h5 class="card-title" >საათობრივი სწავლება</h5>
                          </div>
                          <div class="card-body">
                            <!-- Row -->
                            <div class="row">
                              <!-- Col -->
                              <div class="form-group col-6">

                              </div>
                              <!-- End Col -->

                              <!-- Col -->
                              <div class="form-group col-6">

                              </div>
                              <!-- End Col -->







                              <!-- End Col -->

                              <!-- Col -->

                              <!-- End Col -->
                            </div>
                            <!-- End Row -->
                          </div>
                        </div>
                        <!-- Card -->
                      </div>
                      <!-- End Col -->


                      <!-- Col -->
                      <div class="form-group col-12 col-dm-6">
                        <ValidationProvider name="What we do" rules="required" v-slot="{ errors }">
                          <label class="font-weigt-bold" >გადამზადებული ადამიანების რაოდენობა <i class="fa fa-info-circle text-primary" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#what_to_do"></i></label>
                          <input type="number" class="form-control" style="height: 53px;" placeholder="რაოდენობა">
                          <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                        </ValidationProvider>
                      </div>
                      <!-- End Col -->


                      <!-- Col -->
                      <div class="form-group col-12">
                        <label class="font-weigt-bold" >დამატებითი ჩასაწერი</label>
                        <textarea rows="5" class="form-control" v-model="form.additional__info" type="text" placeholder="ჩაწერე ტექსტი"></textarea>
                      </div>
                      <!-- End Col -->
                    </form>
                  </div>
                  <div class="card-footer py-4 bg-transparent">
                    <button :class="disableBtn == true ? 'd-none' : ''" type="submit" class="btn btn-primary">ვაკანსიის დამატება +</button>
                    <button :class="disableBtn == false ? 'd-none' : ''" class="btn btn-primary" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      იტვირთება...
                    </button>
                  </div>
                </div>
              </div>
              <!-- End Col -->
            </form>
          </ValidationObserver>
          <div class="alert alert-danger text-center" v-if="this.permissions.vacancy_permission=='disabled'" >
            იმისთვის რომ შეძლოთ ვაკანსის განთავსება ვებ გვერდზე საჭიროა შეავსოთ კომპანის რეკვზიტები  <a href="/Details/create">შემდეგ მისამართზე</a>
          </div>
        </div>
        <!-- End Row -->
      </div>
    </section>




    <!-- Modals -->

   <!-- salary Modals -->
    <div class="modal fade" id="teachingTime" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">საათობრივი სწავლება </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>გთხოვთ შეავსოთ თქვენი 1 საათის ღირებულება იმ სწავლების სახეობის და სტუდენტების რაოდენობის მიხედვით, თუ არ გაქვს რომელიმე სახეობა მაშინ დატოვეთ ცარიელი</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">გასაგებია</button>
          </div>
        </div>
      </div>
    </div>

    <!-- End Modals -->

  </div>

</template>

<script>
import Header from '@/components/Header.vue'
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Add__Subject",
  data () {
    return {
      showTopMenu: true,
      selected: '',
      datePick: false,
      checkRadio: '',
      salary: '',
      time1: null,
      time2: null,
      time3: null,
      weekDays: ['ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი', 'კვირა'],
      selected_1: [],
      allSelected: false,
      indeterminate: false,
      CurrencyData:[],
      form:{
        additional__info:'',
      },
      disableBtn: false,
      SphereData:[],
      LocationData:[],
      PositionData:[],
      IndustryData:[],
      DetailData:[],
      minimum_amount:'',
      maxsimum_amount:'',
      workReason: '',
      /* Modals Variable */
      sphere: true,
      workExperience: true,
      whatToDo: true,
    }
  },
  components: {
    Header
  },
  methods: {
    /* Modals Variable */

    /* End Modals Variable */

    toggleAll(checked) {
      this.selected_1 = checked ? this.weekDays.slice() : []
    },
    salaryAmount(index) {
      this.salary = index;
      this.form.amount_type=index;
      if (this.salary != 1) {
        this.form.fixed_amount = '';
        this.form.min_bonus = '';
        this.form.max_bonus = '';
        this.minimum_amount = '';
        this.maxsimum_amount = '';
      }
      if(this.salary != 2) {
        this.form.min_amount = '';
        this.form.max_amount = '';
      }
      if(this.salary != 3) {
        this.form.fixed_amount = '';
      }
    },
    checkedRadio(index) {
      this.checkRadio = index;
      if(index==1){
        this.form.result_to_work='yes';
      }else{
        this.form.result_to_work='no';
      }
    },
    loadCurrency(){
      axios.get(process.env.VUE_APP_BACKEND_URL+'/public/LoadCurrency')
          .then(response => {
            this.CurrencyData=response.data;
          });
    },

    loadSphere(){
      axios.get(process.env.VUE_APP_BACKEND_URL+'/public/LoadSphere')
          .then(response => {
            this.SphereData=response.data;
          });
    },

    LoadLocation(){
      axios.get(process.env.VUE_APP_BACKEND_URL+'/public/LoadLocations')
          .then(response => {
            this.LocationData=response.data;
          });
    },

    loadPosition(){
      axios.get(process.env.VUE_APP_BACKEND_URL+'/public/LoadPosition')
          .then(response => {
            this.PositionData=response.data;
          });
    },

    loadIndustry(){
      axios.get(process.env.VUE_APP_BACKEND_URL+'/public/LoadIndustry')
          .then(response => {
            this.IndustryData=response.data;
          });
    },
    workReasons(){
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/work_reason/LoadPosition', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.workReason=response.data;
          });
    },
    loadDetails(){
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/details/get_all_details_option',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.DetailData=response.data;
          });
    },
    submitForm(){
      this.isLoading = true;
      this.disableBtn = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;

      axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/vacancy/add_new_vacancy',{'data':this.form}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then((res) => {
            this.isLoading = false;
            this.$router.push('/VacancyDashboard');
          })
          .catch((error) => {
            this.isLoading = false;


          });

    },
    change_min(){
      let calculatetotal=Number(this.form.fixed_amount)+Number(this.form.min_bonus);
      this.minimum_amount=calculatetotal;
    },
    change_max(){
      let calculatetotal=Number(this.form.fixed_amount)+Number(this.form.max_bonus);
      this.maxsimum_amount=calculatetotal;
    },

    ...mapActions({ addPermission: "setCurrentPermission" }),

  },
  mounted() {
    this.LoadLocation();
    this.loadDetails();
    this.loadCurrency();
    this.loadSphere();
    this.loadPosition();
    this.loadIndustry();
    this.workReasons();
    this.showTopMenu=localStorage.getItem('showTopMenu');



  },
  computed: {
    ...mapGetters({ permissions: "getCurrentPermissions" }),


    // joke() {
    // return this.getCurrentJoke;
    // }
  },

  watch: {
    selected_1(newValue, oldValue) {
      if (newValue.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newValue.length === this.weekDays.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    }
  }
}
</script>

<style scoped>
.card-footer:last-child {
  border-radius: 0 0 0.6875rem 0.6875rem!important;
}
</style>