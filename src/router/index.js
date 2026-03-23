import Vue from 'vue'
import VueRouter from 'vue-router'
/*import Home from '../views/Home.vue'*/
import Main from '../views/Main.vue'
import Dashboard from '../views/auth/Home.vue'
import FrontSignin from '../views/auth/Signin.vue'
import FrontSignup from '../views/auth/Signup.vue'
import FrontRecovery from '../views/auth/Recovery.vue'
import AddVacancy from '../views/auth/AddVacancy.vue'
import MyVacancy from '../views/auth/MyVacancy.vue'
import UserDeals from '../views/auth/UserDeals.vue'
import VacancyDashboard from '../views/auth/VacancyDashboard.vue'
import Details from '../views/pages/details/index.vue'
import CreateDetail from '../views/pages/details/Create.vue'
import DetailsEdit from '../views/pages/details/Edit.vue'
import CandidatsDashboard from '../views/auth/CandidatsDashboard.vue'
import Candidats from '../views/auth/Candidats.vue'
import PasswordChange from '../views/auth/profile/password_change.vue'
import VacancyEdit from '../views/auth/VacancyEdit.vue'
import OnlyWatchVacancy from '../views/auth/OnlyWatchVacancy.vue'
import Static from '../views/auth/Static.vue'
import NegotiationsWar from '../views/auth/NegotiationsWar.vue'
import AllCompany from '../views/auth/company/index.vue'
import CompanyEdit from '../views/auth/company/Edit.vue'
import FrontPasswordReset from '../views/auth/profile/PasswordReset.vue'
/* Pages/Types/Positions */
import PositionList from '../views/pages/types/Positions/Index.vue'
import AddPosition from '../views/pages/types/Positions/AddPosition.vue'
import positionEdit from '../views/pages/types/Positions/Details/Edit.vue'
/* Pages/Types/Jobs */
import JobList from '../views/pages/types/Jobs/Index.vue'
import AddJob from '../views/pages/types/Jobs/AddJob.vue'
import jobEdit from '../views/pages/types/Jobs/Details/Edit.vue'
/* Pages/Types/WorkReasons */
import WorkReasons from '../views/pages/types/WorkReasons/index.vue'
import AddWorkReason from '../views/pages/types/WorkReasons/Details/AddWorkReason.vue'
import WorkReasonEdit from '../views/pages/types/WorkReasons/Details/Edit.vue'
/* Pages/Types/Job_Category */
import JobCategory from '../views/pages/types/Job_Category/index.vue'
import AddJobCategory from '../views/pages/types/Job_Category/AddCategory.vue'
import JobCategoryEdit from '../views/pages/types/Job_Category/Details/Edit.vue'
/* Pages/Types/Category */
import Category from '../views/pages/types/Category/Index.vue'
import AddCategory from '../views/pages/types/Category/AddCategory.vue'
import CategoryEdit from '../views/pages/types/Category/Details/Edit.vue'
/* Pages/Types/Work_Schedule */
import WorkSchedule from '../views/pages/types/Work_Schedule/Index.vue'
import AddWorkSchedule from '../views/pages/types/Work_Schedule/AddWorkSchedule.vue'
import WorkScheduleEdit from '../views/pages/types/Work_Schedule/Details/Edit.vue'
/* Pages/Types/WorkExperience */
import WorkExperience from '../views/pages/types/Exprience/Index.vue'
import AddWorkExperience from '../views/pages/types/Exprience/AddExperience.vue'
import WorkExperienceEdit from '../views/pages/types/Exprience/Details/Edit.vue'

/* Pages/Registration_Description */
import RegistrationInfo from '../views/pages/Registration_Description/Index.vue'
import RegistrationInfoCreate from '../views/pages/Registration_Description/Create.vue'
import RegistrationInfoEdit from '../views/pages/Registration_Description/Details/Edit.vue'

/* Teacher */
// import Teacher__dashboard from '../views/Teacher/Dashboard.vue'
// import Add__Subject from '../views/Teacher/auth/Add__Subject.vue'
// import Subject__Status from '../views/Teacher/auth/Subject__Status.vue'
// import My__Subjects from '../views/Teacher/auth/My__Subjects.vue'
/* End Teacher */

/* Front Components */
import Signin from '../views/auth/FrontAuth/Signin.vue'
import Signup from '../views/auth/FrontAuth/Signup.vue'
import Recovery from '../views/auth/FrontAuth/Recovery.vue'
import PasswordReset from '../views/auth/FrontAuth/PasswordReset.vue'

/* Training */
import Training from '../views/Training/Index.vue'
import Create_Training from '../views/Training/Create.vue'
import Edit_Training from '../views/Training/Edit.vue'

/* Contact */
import Contact from '../components/Contact.vue'

/* User */
import UserList from '../views/auth/Users/UserList.vue'
import Add_User from '../views/auth/Users/Add_User.vue'
import UserEdit from '../views/auth/Users/Edit.vue'

/* Recommendation */
import Recommendations from '../views/Training/Recommend/index.vue'
import Recommend_edit from '../views/Training/Recommend/edit.vue'
import create_recommend from '../views/Training/Recommend/create.vue'

/* FAQ For Training */
import FAQ from '../views/Training/FAQ/index.vue'
import FAQ_edit from '../views/Training/FAQ/Edit.vue'
import create_FAQ from '../views/Training/FAQ/Create.vue'

/* Registered Leads */
import Registered from '../views/Training/Registered/index.vue'

/* Packages and their features */
import Packages from '../views/Training/Packages/index.vue'
import add_package from '../views/Training/Packages/add.vue'
import edit_package from '../views/Training/Packages/edit.vue'
import Features from '../views/Training/Packages/Features/index.vue'
import add_feature from '../views/Training/Packages/Features/add.vue'
import edit_feature from '../views/Training/Packages/Features/edit.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: 'Main',
  //   name: 'Main',
  //   component: Main
  // },
  {
    path: '/',
    name: 'Dashboard',
    component: VacancyDashboard
  },
  {
    path: '/FrontSignin',
    name: 'FrontSignin',
    component: FrontSignin
  },
  {
    path: '/FrontSignup',
    name: 'FrontSignup',
    component: FrontSignup
  },
  {
    path: '/FrontRecovery',
    name: 'FrontRecovery',
    component: FrontRecovery
  },
  {
    path: '/FrontPasswordReset',
    name: 'FrontPasswordReset',
    component: FrontPasswordReset
  },
  {
    path: '/MyVacancy/:param',
    name: 'MyVacancy',
    component: MyVacancy
  },
  {
    path: '/UserDeals',
    name: 'UserDeals',
    component: UserDeals
  },
  {
    path: '/VacancyDashboard',
    name: 'VacancyDashboard',
    component: VacancyDashboard
  },
  {
    path: '/AddVacancy',
    name: 'AddVacancy',
    component: AddVacancy
  },
  {
    path:'/vacancy/:id/edit',
    name:'VacancyEdit',
    component: VacancyEdit
  },
  {
    path:'/watch/:id/edit',
    name:'OnlyWatchVacancy',
    component: OnlyWatchVacancy
  },

  {
    path:'/Details',
    name:'Details',
    component: Details
  },
  {
    path:'/Details/create',
    name:'CreateDetail',
    component: CreateDetail
  },
  {
    path:'/Details/:id/edit',
    name:'DetailsEdit',
    component: DetailsEdit
  },

  {
    path: '/Candidats/:id/:status',
    name: 'Candidats',
    component: Candidats
  },
  {
    path: '/Candidats/:id',
    name: 'CandidatsDashboard',
    component: CandidatsDashboard
  },
  {
    path: '/password_change',
    name: 'PasswordChange',
    component: PasswordChange
  },
  {
    path: '/static',
    name: 'Static',
    component: Static
  },
  {
    path: '/NegotiationsWar',
    name: 'NegotiationsWar',
    component: NegotiationsWar
  },
  {
    path: '/all_company',
    name: 'AllCompany',
    component: AllCompany
  },
  {
    path:'/all_company/:id/edit',
    name:'CompanyEdit',
    component: CompanyEdit
  },
  /* Pages/Types/Positions */
  {
    path:'/PositionList',
    name:'PositionList',
    component: PositionList
  },
  {
    path:'/AddPosition',
    name:'AddPosition',
    component: AddPosition
  },
  {
    path:'/positionEdit/:id/edit',
    name:'positionEdit',
    component: positionEdit
  },
  /* Pages/Types/Jobs */
  {
    path:'/JobList',
    name:'JobList',
    component: JobList
  },
  {
    path:'/AddJob',
    name:'AddJob',
    component: AddJob
  },
  {
    path:'/jobEdit/:id/edit',
    name:'jobEdit',
    component: jobEdit
  },
  /* Pages/Types/WorkReasons */
  {
    path:'/WorkReasons',
    name:'WorkReasons',
    component: WorkReasons
  },
  {
    path:'/AddWorkReason',
    name:'AddWorkReason',
    component: AddWorkReason
  },
  {
    path:'/WorkReasonEdit/:id/edit',
    name:'WorkReasonEdit',
    component: WorkReasonEdit
  },
  /* Pages/Types/Job_Cateogry */
  {
    path:'/JobCategory',
    name:'JobCategory',
    component: JobCategory
  },
  {
    path:'/AddJobCategory',
    name:'AddJobCategory',
    component: AddJobCategory
  },
  {
    path:'/JobCategoryEdit/:id/edit',
    name:'JobCategoryEdit',
    component: JobCategoryEdit
  },
  /* Pages/Types/Category */
  {
    path:'/Category',
    name:'Category',
    component: Category
  },
  {
    path:'/AddCategory',
    name:'AddCategory',
    component: AddCategory
  },
  {
    path:'/CategoryEdit/:id/edit',
    name:'CategoryEdit',
    component: CategoryEdit
  },
  /* Pages/Types/WorkSchedule */
  {
    path:'/WorkSchedule',
    name:'WorkSchedule',
    component: WorkSchedule
  },
  {
    path:'/AddWorkSchedule',
    name:'AddWorkSchedule',
    component: AddWorkSchedule
  },
  {
    path:'/WorkScheduleEdit/:id/edit',
    name:'WorkScheduleEdit',
    component: WorkScheduleEdit
  },
  /* Pages/Types/Experience */
  {
    path:'/WorkExperience',
    name:'WorkExperience',
    component: WorkExperience
  },
  {
    path:'/AddWorkExperience',
    name:'AddWorkExperience',
    component: AddWorkExperience
  },
  {
    path:'/WorkExperienceEdit/:id/edit',
    name:'WorkExperienceEdit',
    component: WorkExperienceEdit
  },

  /* Pages/Registration_Description */
  {
    path:'/RegistrationInfo',
    name:'RegistrationInfo',
    component: RegistrationInfo
  },
  {
    path:'/RegistrationInfoCreate',
    name:'RegistrationInfoCreate',
    component: RegistrationInfoCreate
  },
  {
    path:'/RegistrationInfo/:id/edit',
    name:'RegistrationInfoEdit',
    component: RegistrationInfoEdit
  },
  /* Training/Recommend */
  {
    path:'/Recommendations',
    name:'Recommendations',
    component: Recommendations
  },
  {
    path:'/Recommend_edit/:id',
    name:'Recommend_edit',
    component: Recommend_edit
  },
  {
    path:'/create_recommend',
    name:'create_recommend',
    component: create_recommend
  },
  /* Training/FAQ */
  {
    path:'/FAQ/:id',
    name:'FAQ',
    component: FAQ
  },
  {
    path:'/FAQ_edit/:id',
    name:'FAQ_edit',
    component: FAQ_edit
  },
  {
    path:'/create_FAQ/:id',
    name:'create_FAQ',
    component: create_FAQ
  },
  /* Registered Leads */
  {
    path:'/Registered/:id',
    name:'Registered',
    component: Registered
  },
  /* Packages and their features */
  {
    path:'/Packages/:id',
    name:'Packages',
    component: Packages
  },
  {
    path:'/add_package/:id',
    name:'add_package',
    component: add_package
  },
  {
    path:'/edit_package/:id/:training_id',
    name:'edit_package',
    component: edit_package
  },
  {
    path:'/Features/:id',
    name:'Features',
    component: Features
  },
  {
    path:'/add_feature/:id',
    name:'add_feature',
    component: add_feature
  },
  {
    path:'/edit_feature/:id/:feature_id',
    name:'edit_feature',
    component: edit_feature
  },


  {
    path:'/Signin',
    name:'Signin',
    component: Signin
  },
  {
    path:'/Signup',
    name:'Signup',
    component: Signup
  },
  {
    path:'/Recovery',
    name:'Recovery',
    component: Recovery
  },
  {
    path:'/PasswordReset',
    name:'PasswordReset',
    component: PasswordReset
  },

  /* Teacher */
  // {
  //   path:'/Teacher__dashboard',
  //   name:'Teacher__dashboard',
  //   component: Teacher__dashboard
  // },
  // {
  //   path:'/Add__Subject',
  //   name:'Add__Subject',
  //   component: Add__Subject
  // },
  // {
  //   path:'/Subject__Status',
  //   name:'Subject__Status',
  //   component: Subject__Status
  // },
  // {
  //   path:'/My__Subjects/:param',
  //   name:'My__Subjects',
  //   component: My__Subjects
  // }
  /* End Teacher */


  /* Training */
  {
    path:'/Training',
    name:'Training',
    component: Training
  },
  {
    path:'/Create_Training',
    name:'Create_Training',
    component: Create_Training
  },
  {
    path:'/Edit_Training/:id',
    name:'Edit_Training',
    component: Edit_Training
  },
  /* End Training */

  /* Contact */
  {
    path:'/Contact',
    name:'Contact',
    component: Contact
  },
  /* End Contact */

  /* User */
  {
    path:'/UserList',
    name:'UserList',
    component: UserList
  },
  {
    path:'/Add_User',
    name:'Add_User',
    component: Add_User
  },
  {
    path:'/UserEdit/:id/Edit',
    name:'UserEdit',
    component: UserEdit
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
  next()


  if (to.name != 'VacancyEdit') {
    const status = localStorage.getItem('status');
    const page = localStorage.getItem('page');

    if (page && status) {
      localStorage.removeItem('status');
      localStorage.removeItem('page');
    }
  }


  if (to.name === 'Signin' || to.name==='Signup' || to.name==='Recovery' || to.name==='PasswordReset') {
    if(localStorage.getItem('user')){
      router.push('/')
    }else{
      next() // login route is always  okay (we could use the requires auth flag below). prevent a redirect loop
    }
  } else if (to.meta && to.meta.requiresAuth === false) {
    next() // requires auth is explicitly set to false
  } else if (localStorage.getItem('user')) {

    next() // i'm logged in. carry on
  } else {
    if(to.name==='Signup'){
      next({ name: 'Signup' }) // always put your redirect as the default case
    }else{
      next({ name: 'Signin' }) // always put your redirect as the default case
    }

  }
})

export default router
