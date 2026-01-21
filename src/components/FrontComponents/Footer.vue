<template>
  <div>
      <!-- Footer -->
      <footer class="footer py-5 mt-5">
          <!-- Container -->
          <div class="container">
              <!-- Row -->
              <div class="row g-5">
                  <div class="col-md-12 col-xl-3">
                      <!-- Logo -->
                      <a class="logo d-flex justify-content-center d-md-block position-relative p-0" href="/Home">
                          <img style="width: 200px;" src="../../assets/image/footer_logo.png" alt="logo">

                      </a>
                      <!-- Logo End -->
                  </div>
                  <div class="col-md-6 col-xl-3">
                      <h5>სწრაფი ლინკები</h5>
                      <ul class="list-unstyled">
                          <li>
                              <a href="https://dk.ge/VacancyList?type=vip">VIP ვაკანსიები</a>
                          </li>
                          <li>
                              <a href="https://dk.ge/VacancyList?id=1&type=w_s">დისტანციური</a>
                          </li>
                          <li>
                              <a href="https://dk.ge/VacancyList?type=w_s&id=2">ჰიბრიდული</a>
                          </li>
                          <li>
                              <a href="https://dk.ge/VacancyList?type=c_e&id=1">გამოცდილების გარეშე</a>
                          </li>
                          <li>
                              <a href="https://dk.ge/VacancyList?type=c_c&id=279">CV გაგაზავნა არ არის საჭირო</a>
                          </li>
                      </ul>
                  </div>
                  <div class="col-md-6 col-xl-2">
                      <h5>ვაკანსიები</h5>
                      <ul class="list-unstyled">
                          <li>
                              <router-link to="https://dk.ge/FAQ">ვაკანსიის განთავსება</router-link>
                          </li>
                          <li>
                              <router-link to="https://dk.ge/VacancyList">ყველა ვაკანსია</router-link>
                          </li>
                      </ul>
                  </div>
                  <div id="Footer" class="col-md-6 col-xl-2">
                      <h5>KENCHADZE.GROUP</h5>
                      <ul class="list-unstyled">
                          <li>
                              <a target="_blank" href="https://academy.dk.ge/">აკადემია</a>
                          </li>
                          <li>
                              <a target="_blank" href="https://re.dk.ge/">უძრავი ქონება</a>
                          </li>
                          <li>
                              <a target="_blank" href="https://re.dk.ge/Investments">ინვესტიციები</a>
                          </li>
                          <li>
                              <a target="_blank" href="https://davidkenchadze.ge/">სამოტივაციო ბლოგი</a>
                          </li>
                      </ul>
                  </div>
                  <div class="col-md-6 col-xl-2">
                      <h5>კონტაქტი</h5>
                      <ul class="list-unstyled">
                          <li>
                              <a href="tel:598335837">598 335 837 </a>
                          </li>
                      </ul>
                  </div>
              </div>
              <!-- End Row -->
          </div>
          <!-- End Container -->
      </footer>
      <!-- End Footer -->
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: "Footer",
  data() {
      return {
          courses: []
      }
  },
  methods: {
      getCourses() {
          // axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/traning/LoadData')
          //     .then((res) => {
          //         this.courses = res.data;
          //     })
          //     .catch((error) => {
          //         console.log(error);
          //     });
      },
      // dynamicRoute(name, id) {

      //     // Replace "%20" with underscores
      //     var item_name = name.replace(/ /g, "-");

      //     this.$router.push({
      //         path: `/Course/${item_name}/${id}`
      //     })
      // }
  },
  mounted() {
      // this.getCourses();
  }
}
</script>

<style scoped>
.footer {
padding: 74px 44px 74px 44px;
background: var(--Fourth-Color);
}

.footer h5, a {
  font-family: var(--Third-Font);
  color: #fff;
  -webkit-font-feature-settings: 'case' on;
  font-feature-settings: 'case' on;
}

.footer li a {
  font-weight: normal;
}

.footer h5 {
  font-weight: bold;
  color: #f5f5f5!important;
}

.footer a:hover {
  color: #f5f5f5;
}

.list-unstyled {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-bottom: 0;
  margin-top: 20px;
}

.logo {
  padding-left: 7px;
  padding-top: 7px;
}

.logo_circle {
  background-color: var(--primary-color);
  width: 39px;
  height: 39px;
  border-radius: 50%;

  position: absolute;
  top: 2px;
  left: 0;
  z-index: -1;
}
</style>