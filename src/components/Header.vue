<template>
    <div class="header" >
      <div class="navbar-vertical  bg-white navbar-vertical-aside-mobile-overlay" :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">
        <div class="navbar-brand justify-content-between" style="color:#fff;" :class="this.$store.state.showTopMenu == true ? 'd-flex' : 'd-none'">
          <!-- <router-link class="logo_text" to="/">David Kenchadze</router-link> -->
          <router-link to="/">
            <img class="w-100" src="../assets/image/new_white_logo.svg" alt="">
          </router-link>
          <button class="border-0 p-0 bg-transparent close d-block d-md-none" type="button" @click="toggleMenu">
            <i class="fas fa-bars"></i>
          </button>
        </div>
        <div class="navbar-brand navbar-disabled d-none d-md-flex"  style="background-color:#023e79;margin-right:0px;height:59px;color:#fff;" :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">
          <!-- <router-link class="logo_text" to="/">David Kenchadze</router-link> -->
          <router-link to="/">
            <img class="w-100" src="../assets/image/new_white_logo.svg" alt="">
          </router-link>
        </div>
        <div class="navbar-vertical-content border-end">
          <ul class="nav flex-column navbar-tabs">

            <li class="nav-item">
              <a href="/" class="nav-link ">
                <span>მთავარი გვერდი</span>
              </a>
            </li>

            <!-- Users -->
            <li class="nav-item"  v-if="permission=='administrator'" :class="{ show: isActive == 'link-2' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-2')">

                <span>მომხმარებლები</span>
              </div>
              <transition name="fade">
                <ul class="vertical-aside-submenu nav nav-sub" v-if="isActive == 'link-2'">
                  <li class="nav-item">
                    <a class="nav-link" href="/UserList">

                      <span>მომხმარებლები</span>
                    </a>
                  </li>

<!--                  <li class="nav-item">-->
<!--                    <a class="nav-link" href="/Add_User">-->

<!--                      <span>მომხმარებლის დამატება</span>-->
<!--                    </a>-->
<!--                  </li>-->

                </ul>
              </transition>
            </li>
            <!-- End Users -->


            <!-- Vacancies-->
            <li class="nav-item" v-if="permission=='administrator' || permission=='custumer'" :class="{ show: isActive == 'link-3' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-3')">

                <span>ვაკანსიები</span>
              </div>
              <transition name="fade">
              <ul class="vertical-aside-submenu nav nav-sub" v-if="isActive == 'link-3'">
                <li class="nav-item" v-for="item in LoadVacancyDatas">
                  <a class="nav-link" :href="'/Candidats/'+item.id" style="padding-left: 2.5rem">
                    <span style="font-size: 12px"><i class="fa fa-bullhorn text-secondary"></i> {{ item.position }}</span>

                  </a>
                </li>
              </ul>

              </transition>
            </li>
            <!-- End Vacancies -->

            <li class="nav-item" v-if="permission=='administrator' || permission=='custumer'">
              <a class="nav-link" href="/VacancyDashboard">
                <span>ვაკანსიების სტატუსი</span>
              </a>
            </li>

            <li class="nav-item" v-if="permission=='administrator' || permission=='custumer'">
              <a class="nav-link" href="/Addvacancy">

                <span>ვაკანსიის დამატება</span>
              </a>
            </li>

<!--            <li class="nav-item">-->
<!--              <a class="nav-link" href="/Subject__Status">-->

<!--                <span>საგნის სტატუსი</span>-->
<!--              </a>-->
<!--            </li>-->

<!--            <li class="nav-item">-->
<!--              <a class="nav-link" href="/Add__Subject">-->

<!--                <span>საგნის რეგისტრაცია</span>-->
<!--              </a>-->
<!--            </li>-->


            <li class="nav-item" v-if="permission=='administrator' || permission=='custumer'" :class="{ show: isActive == 'link-4' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-4')">

                <span>პროფილი</span>
              </div>
              <transition name="fade">
                <ul class="vertical-aside-submenu nav nav-sub" v-if="isActive == 'link-4'">
                  <li class="nav-item">
                    <a class="nav-link" href="/Details">

                      <span>კომპანია</span>
                    </a>
                  </li>

                  <li class="nav-item" v-if="permission=='administrator'">
                    <a class="nav-link" href="/all_company">

                      <span>ყველა კომპანია</span>
                    </a>
                  </li>

                </ul>
              </transition>
            </li>

            <li v-if="permission=='administrator'" class="nav-item" :class="{ show: isActive == 'link-5' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-5')">

                <span>ტექსტების მართვა</span>
              </div>
              <transition name="fade">
                <ul class="vertical-aside-submenu nav nav-sub" v-if="isActive == 'link-5'">
                  <li class="nav-item">
                    <a href="/RegistrationInfo" class="nav-link ">
                      <span>რეგისტრაციის აღწერილობა</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="/NegotiationsWar">
                      <span>მოლაპარაკებების ომი</span>
                    </a>
                  </li>

                </ul>
              </transition>
            </li>

            <li v-if="permission=='administrator'" class="nav-item" :class="{ show: isActive == 'link-1' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-1')">
                <span>ტიპები</span>
              </div>
              <transition name="fade">
                <ul class="vertical-aside-submenu nav nav-sub" v-if="isActive == 'link-1'">
                  <!-- Nav Item Duo -->
                  <li class="nav-item">
                    <a class="nav-link" href="/PositionList">
                      <span>პოზიციები</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/AddPosition">
                      <span>პოზიციის დამატება</span>
                    </a>
                  </li>
                  <!-- Nav Item Duo -->
                  <li class="nav-item">
                    <a class="nav-link" href="/JobList">
                      <span>საქმიანობები</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/AddJob">
                      <span>საქმიანობის დამატება</span>
                    </a>
                  </li>
                  <!-- Nav Item Duo -->
                  <li class="nav-item">
                    <a class="nav-link" href="/WorkReasons">
                      <span>სამუშაო მიზეზები</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/AddWorkReason">
                      <span>მიზეზის დამატება</span>
                    </a>
                  </li>
                  <!-- Nav Item Duo -->
                  <li class="nav-item">
                    <a class="nav-link" href="/JobCategory">
                      <span>სამუშაო კატეგორიები</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/AddJobCategory">
                      <span>სამუშაო კატეგორიების დამატება</span>
                    </a>
                  </li>
                  <!-- Nav Item Duo -->
                  <li class="nav-item">
                    <a class="nav-link" href="/WorkSchedule">
                      <span>სამუშაო გრაფიკი</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/AddWorkSchedule">
                      <span>სამუშაო გრაფიკის დამატება</span>
                    </a>
                  </li>
                  <!-- Nav Item Duo -->
                  <li class="nav-item">
                    <a class="nav-link" href="/Category">
                      <span>კატეგორიები</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/AddCategory">
                      <span>კატეგორიების დამატება</span>
                    </a>
                  </li>
                  <!-- Work Experience -->
                  <li class="nav-item">
                    <a class="nav-link" href="/WorkExperience">
                      <span>სამუშაო გამოცილება</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/AddWorkExperience">
                      <span>სამუშაო გამოცდილების დამატება</span>
                    </a>
                  </li>
                </ul>

              </transition>
            </li>

            <li class="nav-item" v-if="permission=='administrator' || permission=='traning'">
              <a class="nav-link" href="/Training">
                <span>ტრენინგები</span>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/Contact">

                <span>კონტაქტი</span>
              </a>
            </li>


          </ul>
        </div>
      </div>


      <nav class="navbar navbar-horizontal border-bottom pt-0 pb-0" style="background-color:#023e79;" :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">
        <div class="container-fluid px-0">
          <button class="navbar-brand border-0 p-0 bg-transparent close" style="color:#fff;" type="button" @click="toggleMenu">
            <i class="fas fa-bars"></i>
          </button>
          <div class="navbar-brand navbar-disabled p-0 m-0" style="max-width: 200px" v-if="this.$store.state.showTopMenu == true">
            <!-- <router-link class="logo_text" to="/">David Kenchadze</router-link> -->
            <router-link to="/">
              <img class="w-100" src="../assets/image/new_white_logo.svg" alt="">
            </router-link>
          </div>
          <div class=" p-0 m-0 d-inline-block d-md-none" style="max-width: 200px;">
            <!-- <router-link class="logo_text" to="/">David Kenchadze</router-link> -->
            <router-link to="/">
              <img class="w-100" src="../assets/image/new_white_logo.svg" alt="">
            </router-link>
          </div>
          <ul class="navbar-nav align-items-center flex-row">
<!--            <li class="me-2 d-none d-md-block">
              <div class="position-relative d-inline-block">
                <a class="btn btn-icon btn-outline-light position-relative rounded-circle" style="background-color:#fff;"  @click.prevent="navItem('button-1')">
                  <i class="fas fa-bell text-secondary" style="color:black;"></i>
                  <span class="btn-status btn-sm-status bg-danger rounded-circle"></span>
                </a>
              </div>

              <transition name="fade">
              <div class="dropdown_menu dropdown-menu-right navbar-dropdown-menu" v-if="isActive == 'button-1'">
                &lt;!&ndash; Header &ndash;&gt;
                <div class="card-header">
                  <span class="card-title">შეტყობინებები</span>

                  &lt;!&ndash; Unfold &ndash;&gt;
                  <div class="position-relative d-inline-block">

                  </div>
                  &lt;!&ndash; End Unfold &ndash;&gt;
                </div>
                &lt;!&ndash; End Header &ndash;&gt;

                &lt;!&ndash; Card Footer &ndash;&gt;
                <a class="card-footer text-center d-block" href="#">
                  შეტყობინება არ არის &nbsp;&nbsp;
                  <i class="fas fa-angle-right" style="margin-top: 3px"></i>
                </a>
                &lt;!&ndash; End Card Footer &ndash;&gt;
              </div>
              </transition>
            </li>-->
            <li>
              <div class="position-relative d-inline-block">
                <a class="navbar-horizontal-profile"  @click.prevent="navItem('button-2')">
                  <div class="avatar avatar-sm avatar-circle" style="text-align: center;line-height: 38px;font-weight: bold;font-size: 21px;">
                    <span class="profile_p"><i class="tio-user-outlined text-secondary"></i> </span>
                    <span class="avatar-status avatar-sm-status avatar-status-success"></span>
                  </div>
                </a>
              </div>
              <transition name="fade">
                <div class="dropdown_menu dropdown-menu-right" v-if="isActive == 'button-2'">
                  <div class="dropdown_item_text">
                    <div class="media align-items-center">
                      <div class="avatar avatar-sm avatar-circle me-2 profile-circle">
                        <i class="tio-user-outlined text-secondary"></i>
                      </div>
                      <div class="media-body">
                        <span class="card-title mb-0">{{ name }}</span>
                        <span class="card-text">{{ email }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown_item" href="/password_change">
                    <span class="text-truncate pr-2" title="Profile &amp; account">პაროლის ცვლილება</span>
                  </a>
                  <a class="dropdown_item"  v-on:click="logout" style="cursor: pointer">
                    <span class="text-truncate pr-2" title="Profile &amp; account">გამოსვლა</span>
                  </a>
                </div>
              </transition>
            </li>
          </ul>
        </div>
      </nav>

    </div>

</template>


<script>
import axios from 'axios'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",

  data () {
    return {
      isActive: null,
      showTopMenu: true,
      name:'',
      email:'',
      LoadVacancyDatas:[]
    }
  },

  mounted(){

    this.LoadVacancy();

    try {
      JSON.parse(localStorage.getItem('user'))

    }catch(e) {
      localStorage.removeItem('user');
      this.$router.push('/signin')
    }
    const user_info=JSON.parse(localStorage.getItem('user'));
    this.name=user_info.user.name;
    this.email=user_info.user.email;
    const token = JSON.parse(localStorage.getItem('user')).access_token;



    axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/check-user',{'data':localStorage.getItem('user')}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
        .then((res) => {

/*
          this.$store.state.permission=res.data.permission;
*/
/*


          this.$store.state.commit("setCurrentPermission", res.data.permission);*/





        })
        .catch((error) => {

          localStorage.removeItem('user');
          this.$router.push('/signin')

        });




  },

  methods: {
    navItem(index) {
      this.isActive = this.isActive === index ? null : index
    },
    LoadVacancy(){
      const token = JSON.parse(localStorage.getItem('user')).access_token;

      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/vacancy/LoadVacanciesList/published',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.LoadVacancyDatas=response.data;
            this.isLoading = false;
          });
    },
    toggleMenu() {

      if (this.$store.state.showTopMenu == true) {
        this.$store.state.showTopMenu = false;
      } else {
        this.$store.state.showTopMenu = true;
      }
    },
    logout(){
      this.$store.permission='';
      localStorage.removeItem('user');
      this.$router.push('/signin');

    }
  },
  computed: {
    ...mapGetters({ permission: "getCurrentPermission" })
  }
}
</script>

<style scoped>
.profile_p {
  margin-bottom: 2px;
}
.logo_text {
  color: #ffffff;
}
</style>