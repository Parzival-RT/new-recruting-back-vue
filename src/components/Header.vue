<template>
    <div class="header">

      <!-- ===== MOBILE BACKDROP ===== -->
      <transition name="backdrop-fade">
        <div class="sidebar-backdrop d-md-none"
             v-if="this.$store.state.showTopMenu == true"
             @click="toggleMenu">
        </div>
      </transition>

      <!-- ===== SIDEBAR ===== -->
      <div class="navbar-vertical bg-white sidebar-shadow navbar-vertical-aside-mobile-overlay"
           :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">

        <!-- Mobile: Brand with close button -->
        <div class="navbar-brand justify-content-between" style="color:#fff;"
             :class="this.$store.state.showTopMenu == true ? 'd-flex' : 'd-none'">
          <router-link to="/">
            <img class="w-100" src="../assets/image/new_white_logo.svg" alt="">
          </router-link>
          <button class="sidebar-close-btn d-block d-md-none" type="button" @click="toggleMenu">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Desktop: Brand -->
        <div class="navbar-brand navbar-disabled d-none d-md-flex"
             style="background-color:#2563eb;margin-right:0px;height:60px;color:#fff;"
             :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">
          <router-link to="/">
            <img class="w-75" src="../assets/image/new_white_logo.svg" alt="">
          </router-link>
        </div>

        <!-- Nav content -->
        <div class="navbar-vertical-content border-end">
          <ul class="nav flex-column navbar-tabs sidebar-nav">

            <!-- Home -->
            <li class="nav-item pt-1">
              <router-link to="/" class="nav-link" :class="{ 'nav-link-active': isRoute('/') }">
                <i class="fas fa-home nav-icon"></i>
                <span>მთავარი გვერდი</span>
              </router-link>
            </li>

            <li class="sidebar-divider" v-if="permission=='administrator' || permission=='custumer'"></li>

            <!-- Users (admin only) -->
            <li class="nav-item" v-if="permission=='administrator'"
                :class="{ show: isActive == 'link-2' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-2')"
                   :class="{ 'nav-link-active': isActive == 'link-2' }">
                <i class="fas fa-users nav-icon"></i>
                <span>მომხმარებლები</span>
              </div>
              <transition name="slide">
                <ul class="vertical-aside-submenu nav nav-sub" v-if="isActive == 'link-2'">
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/UserList"
                       :class="{ 'sub-link-active': isRoute('/UserList') }">
                      <i class="fas fa-user sub-icon"></i>
                      <span>მომხმარებლები</span>
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>

            <!-- Vacancies dropdown -->
            <li class="nav-item"
                v-if="permission=='administrator' || permission=='custumer'"
                :class="{ show: isActive == 'link-3' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-3')"
                   :class="{ 'nav-link-active': isActive == 'link-3' }">
                <i class="fas fa-briefcase nav-icon"></i>
                <span>ვაკანსიები</span>
              </div>
              <transition name="slide">
                <ul class="vertical-aside-submenu nav nav-sub overflow-hidden" v-if="isActive == 'link-3'">
                  <li class="nav-item" v-for="item in LoadVacancyDatas" :key="item.id">
                    <router-link class="nav-link sub-link" :to="'/Candidats/'+item.id"
                       :class="{ 'sub-link-active': isRoute('/Candidats/'+item.id) }">
                      <i class="fas fa-bullhorn sub-icon"></i>
                      <span>{{ item.position }}</span>
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>

            <!-- Vacancy Status -->
            <li class="nav-item" v-if="permission=='administrator' || permission=='custumer'">
              <router-link class="nav-link" to="/VacancyDashboard"
                 :class="{ 'nav-link-active': isRoute('/VacancyDashboard') }">
                <i class="fas fa-chart-pie nav-icon"></i>
                <span>ვაკანსიების სტატუსი</span>
              </router-link>
            </li>

            <!-- User Deals -->
            <li class="nav-item" v-if="permission=='administrator'">
              <router-link class="nav-link" to="/UserDeals"
                 :class="{ 'nav-link-active': isRoute('/UserDeals') }">
                <i class="fas fa-clipboard-list nav-icon"></i>
                <span>მომხმარებლის მოთხოვნები</span>
              </router-link>
            </li>

            <!-- Add Vacancy -->
            <li class="nav-item" v-if="permission=='administrator' || permission=='custumer'">
              <router-link class="nav-link" to="/Addvacancy"
                 :class="{ 'nav-link-active': isRoute('/Addvacancy') }">
                <i class="fas fa-plus-circle nav-icon"></i>
                <span>ვაკანსიის დამატება</span>
              </router-link>
            </li>

            <!-- Profile dropdown -->
            <li class="nav-item"
                v-if="permission=='administrator' || permission=='custumer'"
                :class="{ show: isActive == 'link-4' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-4')"
                   :class="{ 'nav-link-active': isActive == 'link-4' }">
                <i class="fas fa-building nav-icon"></i>
                <span>პროფილი</span>
              </div>
              <transition name="slide">
                <ul class="vertical-aside-submenu nav nav-sub" v-if="isActive == 'link-4'">
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/Details"
                       :class="{ 'sub-link-active': isRoute('/Details') }">
                      <i class="fas fa-id-card sub-icon"></i>
                      <span>კომპანია</span>
                    </router-link>
                  </li>
                  <li class="nav-item" v-if="permission=='administrator'">
                    <router-link class="nav-link sub-link" to="/all_company"
                       :class="{ 'sub-link-active': isRoute('/all_company') }">
                      <i class="fas fa-sitemap sub-icon"></i>
                      <span>ყველა კომპანია</span>
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>

            <li class="sidebar-divider" v-if="permission=='administrator'"></li>

            <!-- Text Management (admin only) -->
            <li class="nav-item" v-if="permission=='administrator'"
                :class="{ show: isActive == 'link-5' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-5')"
                   :class="{ 'nav-link-active': isActive == 'link-5' }">
                <i class="fas fa-edit nav-icon"></i>
                <span>ტექსტების მართვა</span>
              </div>
              <transition name="slide">
                <ul class="vertical-aside-submenu nav nav-sub" v-if="isActive == 'link-5'">
                  <li class="nav-item">
                    <router-link to="/RegistrationInfo" class="nav-link sub-link"
                       :class="{ 'sub-link-active': isRoute('/RegistrationInfo') }">
                      <i class="fas fa-file-alt sub-icon"></i>
                      <span>რეგისტრაციის აღწერილობა</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/NegotiationsWar"
                       :class="{ 'sub-link-active': isRoute('/NegotiationsWar') }">
                      <i class="fas fa-handshake sub-icon"></i>
                      <span>მოლაპარაკებების ომი</span>
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>

            <!-- Types dropdown (admin only) -->
            <li class="nav-item" v-if="permission=='administrator'"
                :class="{ show: isActive == 'link-1' }">
              <div class="nav-link nav-link-toggle" @click.prevent="navItem('link-1')"
                   :class="{ 'nav-link-active': isActive == 'link-1' }">
                <i class="fas fa-tags nav-icon"></i>
                <span>ტიპები</span>
              </div>
              <transition name="slide">
                <ul class="vertical-aside-submenu nav nav-sub" v-if="isActive == 'link-1'">
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/PositionList"
                       :class="{ 'sub-link-active': isRoute('/PositionList') }">
                      <i class="fas fa-layer-group sub-icon"></i>
                      <span>პოზიციები</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/AddPosition"
                       :class="{ 'sub-link-active': isRoute('/AddPosition') }">
                      <i class="fas fa-plus sub-icon"></i>
                      <span>პოზიციის დამატება</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/JobList"
                       :class="{ 'sub-link-active': isRoute('/JobList') }">
                      <i class="fas fa-suitcase sub-icon"></i>
                      <span>საქმიანობები</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/AddJob"
                       :class="{ 'sub-link-active': isRoute('/AddJob') }">
                      <i class="fas fa-plus sub-icon"></i>
                      <span>საქმიანობის დამატება</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/WorkReasons"
                       :class="{ 'sub-link-active': isRoute('/WorkReasons') }">
                      <i class="fas fa-list-ul sub-icon"></i>
                      <span>სამუშაო მიზეზები</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/AddWorkReason"
                       :class="{ 'sub-link-active': isRoute('/AddWorkReason') }">
                      <i class="fas fa-plus sub-icon"></i>
                      <span>მიზეზის დამატება</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/JobCategory"
                       :class="{ 'sub-link-active': isRoute('/JobCategory') }">
                      <i class="fas fa-folder sub-icon"></i>
                      <span>სამუშაო კატეგორიები</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/AddJobCategory"
                       :class="{ 'sub-link-active': isRoute('/AddJobCategory') }">
                      <i class="fas fa-plus sub-icon"></i>
                      <span>კატეგორიის დამატება</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/WorkSchedule"
                       :class="{ 'sub-link-active': isRoute('/WorkSchedule') }">
                      <i class="fas fa-clock sub-icon"></i>
                      <span>სამუშაო გრაფიკი</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/AddWorkSchedule"
                       :class="{ 'sub-link-active': isRoute('/AddWorkSchedule') }">
                      <i class="fas fa-plus sub-icon"></i>
                      <span>გრაფიკის დამატება</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/Category"
                       :class="{ 'sub-link-active': isRoute('/Category') }">
                      <i class="fas fa-th-large sub-icon"></i>
                      <span>კატეგორიები</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/AddCategory"
                       :class="{ 'sub-link-active': isRoute('/AddCategory') }">
                      <i class="fas fa-plus sub-icon"></i>
                      <span>კატეგორიების დამატება</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/WorkExperience"
                       :class="{ 'sub-link-active': isRoute('/WorkExperience') }">
                      <i class="fas fa-history sub-icon"></i>
                      <span>სამუშაო გამოცდილება</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/AddWorkExperience"
                       :class="{ 'sub-link-active': isRoute('/AddWorkExperience') }">
                      <i class="fas fa-plus sub-icon"></i>
                      <span>გამოცდილების დამატება</span>
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>

            <!-- Training -->
            <li class="nav-item" v-if="permission=='administrator' || permission=='traning'">
              <router-link class="nav-link" to="/Training"
                 :class="{ 'nav-link-active': isRoute('/Training') }">
                <i class="fas fa-graduation-cap nav-icon"></i>
                <span>ტრენინგები</span>
              </router-link>
            </li>
            
            <li class="sidebar-divider"></li>


            <!-- Contact -->
            <li class="nav-item">
              <router-link class="nav-link" to="/Contact"
                 :class="{ 'nav-link-active': isRoute('/Contact') }">
                <i class="fas fa-envelope nav-icon"></i>
                <span>კონტაქტი</span>
              </router-link>
            </li>

          </ul>
        </div>
      </div>


      <!-- ===== TOP NAVBAR ===== -->
      <nav class="navbar navbar-horizontal topbar pt-0 pb-0"
           :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">
        <div class="container-fluid px-0 pe-3 position-relative">

          <!-- Hamburger -->
          <button class="topbar-toggle" type="button" @click="toggleMenu">
            <i class="fas fa-bars"></i>
          </button>

          <!-- Logo: desktop (when sidebar is collapsed) -->
          <transition name="fade">
            <div class="topbar-logo d-none d-md-block" v-if="this.$store.state.showTopMenu == true" style="max-width:180px;">
              <router-link to="/">
                <img class="w-100" src="../assets/image/new_white_logo.svg" alt="">
              </router-link>
            </div>
          </transition>

          <!-- Logo: mobile always visible -->
          <div class="topbar-logo d-block d-md-none" style="max-width:160px;">
            <router-link to="/">
              <img class="w-100" src="../assets/image/new_white_logo.svg" alt="">
            </router-link>
          </div>

          <!-- Right side -->
          <ul class="navbar-nav align-items-center flex-row ms-auto">
            <li class="nav-item position-relative">

              <!-- User button -->
              <a class="topbar-user" @click.prevent="navItem('button-2')">
                <div class="topbar-avatar">
                  <span>{{ name ? name[0].toUpperCase() : 'U' }}</span>
                </div>
                <div class="d-none d-lg-flex flex-column topbar-user-info">
                  <span class="topbar-user-name">{{ name }}</span>
                  <span class="topbar-user-role">{{ permission }}</span>
                </div>
                <i class="fas fa-chevron-down topbar-chevron d-none d-lg-inline"
                   :class="{ 'topbar-chevron-open': isActive == 'button-2' }"></i>
              </a>

              <!-- Dropdown -->
              <transition name="dropdown-slide">
                <div class="topbar-dropdown" v-if="isActive == 'button-2'">

                  <!-- Header -->
                  <div class="topbar-dd-header">
                    <div class="topbar-avatar topbar-avatar-lg">
                      <span>{{ name ? name[0].toUpperCase() : 'U' }}</span>
                    </div>
                    <div class="topbar-dd-info">
                      <div class="topbar-dd-name">{{ name }}</div>
                      <div class="topbar-dd-email">{{ email }}</div>
                    </div>
                  </div>

                  <div class="topbar-dd-divider"></div>

                  <router-link class="topbar-dd-item" to="/password_change">
                    <i class="fas fa-lock"></i>
                    <span>პაროლის ცვლილება</span>
                  </router-link>
                  <a class="topbar-dd-item topbar-dd-item-danger" @click="logout" style="cursor:pointer">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>გამოსვლა</span>
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
import { mapGetters } from "vuex";

const SUBMENU_ROUTES = {
  'link-1': [
    '/PositionList', '/AddPosition', '/JobList', '/AddJob',
    '/WorkReasons', '/AddWorkReason', '/JobCategory', '/AddJobCategory',
    '/WorkSchedule', '/AddWorkSchedule', '/Category', '/AddCategory',
    '/WorkExperience', '/AddWorkExperience'
  ],
  'link-2': ['/UserList', '/Add_User'],
  'link-3': ['/Candidats'],
  'link-4': ['/Details', '/all_company'],
  'link-5': ['/RegistrationInfo', '/NegotiationsWar'],
};

export default {
  name: "Header",

  data () {
    return {
      isActive: null,
      showTopMenu: true,
      name: '',
      email: '',
      LoadVacancyDatas: []
    }
  },

  mounted() {
    this.LoadVacancy();
    this.syncActiveFromRoute();

    try {
      JSON.parse(localStorage.getItem('user'))
    } catch(e) {
      localStorage.removeItem('user');
      this.$router.push('/signin')
    }

    const user_info = JSON.parse(localStorage.getItem('user'));
    this.name  = user_info.user.name;
    this.email = user_info.user.email;
    const token = JSON.parse(localStorage.getItem('user')).access_token;

    axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/check-user', { 'data': localStorage.getItem('user') }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {})
    .catch(() => {
      localStorage.removeItem('user');
      this.$router.push('/signin');
    });
  },

  watch: {
    '$route': {
      handler: function (to) {
        console.log('Route changed to:', to.path);
        this.syncActiveFromRoute(to.path);
        if (window.innerWidth <= 767 && this.$store.state.showTopMenu === true) {
          this.$store.state.showTopMenu = false;
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    navItem(index) {
      this.isActive = this.isActive === index ? null : index;
    },

    syncActiveFromRoute(path) {
      const currentPath = path || (this.$route ? this.$route.path : '');
      for (const [key, routes] of Object.entries(SUBMENU_ROUTES)) {
        if (routes.some(r => currentPath === r || currentPath.startsWith(r + '/'))) {
          this.isActive = key;
          return;
        }
      }
      this.isActive = null;
    },

    isRoute(path) {
      if (!this.$route) return false;
      if (path === '/') return this.$route.path === '/';
      return this.$route.path === path || this.$route.path.startsWith(path + '/');
    },

    LoadVacancy() {
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/vacancy/LoadVacanciesList/published', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        this.LoadVacancyDatas = response.data;
        this.isLoading = false;
      });
    },

    toggleMenu() {
      this.$store.state.showTopMenu = !this.$store.state.showTopMenu;
    },

    logout() {
      this.$store.permission = '';
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

/* =============================================
   TOP NAVBAR
   ============================================= */

.topbar-toggle {
  background: rgba(255,255,255,0.15);
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  cursor: pointer;
  margin: 0 0.75rem 0 0;
  flex-shrink: 0;
}
.topbar-toggle:hover {
  background: rgba(255,255,255,0.28);
}

.topbar-logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}
.topbar-logo a,
.topbar-logo img {
  pointer-events: auto;
}

/* User button */
.topbar-user {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.375rem 0.625rem;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background 0.18s;
  text-decoration: none !important;
  margin-right: 0.25rem;
}
.topbar-user:hover {
  background: rgba(255,255,255,0.15);
}

/* Avatar circle */
.topbar-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  color: #1e40af;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(255,255,255,0.4);
}

.topbar-user-info {
  line-height: 1.25;
}
.topbar-user-name {
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}
.topbar-user-role {
  color: rgba(255,255,255,0.65);
  font-size: 0.68rem;
  text-transform: capitalize;
  white-space: nowrap;
}
.topbar-chevron {
  color: rgba(255,255,255,0.6);
  font-size: 0.65rem;
  transition: transform 0.22s ease;
}
.topbar-chevron-open {
  transform: rotate(180deg);
}

/* ── Dropdown ── */
.topbar-dropdown {
  position: absolute;
  top: calc(100% + 0.625rem);
  right: 0;
  width: 230px;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 20px 40px -8px rgba(0,0,0,0.18), 0 4px 12px -4px rgba(0,0,0,0.08);
  z-index: 999;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.topbar-dd-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
}
.topbar-avatar-lg {
  width: 42px;
  height: 42px;
  font-size: 1.05rem;
}
.topbar-dd-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.topbar-dd-email {
  font-size: 0.72rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topbar-dd-divider {
  height: 1px;
  background: #f3f4f6;
}

.topbar-dd-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.7rem 1rem;
  font-size: 0.8125rem;
  color: #374151;
  text-decoration: none !important;
  transition: background 0.14s;
  cursor: pointer;
}
.topbar-dd-item:hover {
  background: #f9fafb;
  color: #111827;
}
.topbar-dd-item i {
  width: 16px;
  text-align: center;
  color: #9ca3af;
  font-size: 0.8rem;
  flex-shrink: 0;
}
.topbar-dd-item:hover i {
  color: #2563eb;
}
.topbar-dd-item-danger:hover {
  background: #fff1f2;
  color: #dc2626;
}
.topbar-dd-item-danger:hover i {
  color: #dc2626;
}

/* =============================================
   SIDEBAR BACKDROP (mobile)
   ============================================= */
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  z-index: 99;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}
.backdrop-fade-enter-active {
  transition: opacity 0.28s ease;
}
.backdrop-fade-leave-active {
  transition: opacity 0.22s ease;
}
.backdrop-fade-enter,
.backdrop-fade-leave-to {
  opacity: 0;
}

/* =============================================
   SIDEBAR: Mobile close button
   ============================================= */
.sidebar-close-btn {
  background: rgba(37,99,235,0.1);
  border: none;
  border-radius: 0.5rem;
  color: #2563eb;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s;
}
.sidebar-close-btn:hover {
  background: rgba(37,99,235,0.18);
}

/* =============================================
   SIDEBAR NAV — pill style
   ============================================= */
.sidebar-nav .nav-item .nav-link {
  display: flex !important;
  align-items: center !important;
  gap: 0.625rem !important;
  padding: 0.575rem 0.875rem !important;
  margin: 2px 0.625rem !important;
  border-radius: 0.6rem !important;
  border: none !important;
  color: #4b5563 !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  transition: background-color 0.18s ease, color 0.18s ease !important;
  width: auto !important;
  white-space: nowrap !important;
}

.sidebar-nav .nav-item .nav-link:hover {
  background-color: #eff6ff !important;
  color: #2563eb !important;
}

.sidebar-nav .nav-item .nav-link.nav-link-active {
  background-color: #eff6ff !important;
  color: #2563eb !important;
  font-weight: 600 !important;
}

.sidebar-nav .nav-item.show > .nav-link-toggle {
  background-color: #eff6ff !important;
  color: #2563eb !important;
  border-radius: 0.6rem 0.6rem 0 0 !important;
}

/* =============================================
   ICONS
   ============================================= */
.nav-icon {
  width: 18px !important;
  text-align: center !important;
  font-size: 0.8rem !important;
  color: #9ca3af !important;
  opacity: 1 !important;
  margin-right: 0 !important;
  transition: color 0.18s ease !important;
  flex-shrink: 0 !important;
}
.nav-link:hover .nav-icon,
.nav-link-toggle:hover .nav-icon {
  color: #2563eb !important;
}
.sidebar-nav .nav-item.show .nav-icon,
.nav-link-active .nav-icon {
  color: #2563eb !important;
}

/* =============================================
   SUBMENU
   ============================================= */
.vertical-aside-submenu {
  padding: 4px 0 6px !important;
  margin: 0 0.625rem 4px !important;
  border-left: 2px solid #dbeafe !important;
  background: #f8faff !important;
  border-radius: 0 0 0.6rem 0.6rem !important;
  list-style: none !important;
}

.sub-link {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  padding: 0.42rem 0.875rem !important;
  margin: 1px 0.375rem !important;
  border-radius: 0.45rem !important;
  border: none !important;
  color: #6b7280 !important;
  font-size: 0.775rem !important;
  font-weight: 400 !important;
  white-space: nowrap !important;
  transition: background-color 0.15s ease, color 0.15s ease !important;
}
.sub-link:hover {
  background-color: #dbeafe !important;
  color: #2563eb !important;
}
.sub-link.sub-link-active {
  background-color: #dbeafe !important;
  color: #2563eb !important;
  font-weight: 600 !important;
}

.sub-icon {
  width: 14px;
  text-align: center;
  font-size: 0.7rem;
  color: #cbd5e1;
  flex-shrink: 0;
  transition: color 0.15s ease;
}
.sub-link:hover .sub-icon,
.sub-link-active .sub-icon {
  color: #2563eb;
}

/* =============================================
   DIVIDER
   ============================================= */
.sidebar-divider {
  height: 1px;
  background: #f1f5f9;
  margin: 0.5rem 1.25rem;
  list-style: none;
}

/* =============================================
   TRANSITIONS
   ============================================= */

/* Submenu slide */
.slide-enter-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.slide-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}
.slide-enter {
  opacity: 0;
  transform: translateY(-6px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Profile dropdown */
.dropdown-slide-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-slide-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-slide-enter {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}
.dropdown-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
