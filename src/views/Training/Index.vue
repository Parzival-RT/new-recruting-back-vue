<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <Header />
    <div
      v-show="!isLoading"
      class="main"
      :class="
        this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'
      "
    >
      <div class="container-fluid p-4">
        <div class="row mb-3">
          <!-- Col -->
          <div class="col-6">
            <h1 class="page-title">ტრენინგები</h1>
          </div>
          <!-- End Col -->
          <!-- Col -->
          <div
            class="col-12 col-md-6 text-md-end"
            v-if="permission == 'administrator'"
          >
            <router-link to="/Recommendations">
              <button class="btn btn-success me-1">რეკომენდაციები</button>
            </router-link>
            <router-link to="/Create_Training">
              <button class="btn btn-primary">+ დამატება</button>
            </router-link>
          </div>
          <!-- End Col -->
        </div>

        <div class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center bg-light"
          >
            ტრენინგების ჩამონათვალი
            <div class="input-group w-50">
              <input
                type="text"
                class="form-control"
                v-model="keyword"
                :options="ResponseData"
                placeholder="ძებნა"
                aria-label="ძებნა"
                aria-describedby="button-addon2"
              />
              <button
                class="btn btn-outline-primary d-none"
                type="button"
                id="button-addon2"
              >
                <i class="tio-search"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 mt-2">
                <table class="table">
                  <tbody>
                    <tr v-for="post in filter" :key="post.id">
                      <td>
                        <div class="row align-items-center">
                          <div class="col-7">
                            {{ post.name }}
                          </div>
                          <!-- Action -->
                          <div class="col-5 d-flex justify-content-end">
                            <!-- Example single danger button -->
                            <div class="btn-group me-1">
                              <button
                                type="button"
                                class="btn btn-light dropdown-toggle border"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-three-dots-vertical"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                                  />
                                </svg>
                              </button>
                              <ul class="dropdown-menu p-3">
                                <li class="mb-1">
                                  <router-link
                                    :to="'/Packages/' + post.id"
                                    class="btn btn-success w-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-bag-check-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"
                                      />
                                    </svg>
                                    პაკეტები
                                  </router-link>
                                </li>
                                <li class="mb-1">
                                  <router-link
                                    :to="'/Registered/' + post.id"
                                    class="btn btn-primary d-flex align-items-center"
                                  >
                                    <i class="tio-group-equal me-1"></i>
                                    რეგისტრირებული
                                  </router-link>
                                </li>
                                <li>
                                  <router-link
                                    v-if="permission == 'administrator'"
                                    :to="'/FAQ/' + post.id"
                                    class="btn btn-warning d-block"
                                  >
                                    <span>FAQ / ხ.დ.კ</span>
                                  </router-link>
                                </li>
                              </ul>
                            </div>

                            <a
                              v-if="permission == 'administrator'"
                              @click="EditDetail(post.id)"
                              class="btn btn-yellow me-1"
                            >
                              <span class="d-none d-md-block">რედაქტირება</span>
                              <i class="tio-edit d-block d-md-none"></i>
                            </a>
                            <div
                              v-if="permission == 'administrator'"
                              class="btn btn-danger"
                              data-bs-toggle="modal"
                              :data-bs-target="'#deletePosition_' + post.id"
                            >
                              <span class="d-none d-md-block">წაშლა</span>
                              <i class="tio-clear d-block d-md-none"></i>
                            </div>
                            <!-- Delete Modal -->
                            <div
                              class="modal fade"
                              :id="'deletePosition_' + post.id"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              tabindex="-1"
                              aria-labelledby="staticBackdropLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5
                                      class="modal-title"
                                      id="staticBackdropLabel"
                                    >
                                      ტრენინგის წაშლა
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    ნამდვილად გსურთ ტრენინგის წაშლა?
                                  </div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      გაუქმება
                                    </button>
                                    <button
                                      @click="deleteDataById(post.id)"
                                      class="btn btn-danger"
                                    >
                                      წაშლა
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End Delete Modal -->
                          </div>
                          <!-- End Action -->
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <pagination
                  :data="ResponseData"
                  @pagination-change-page="getResults"
                >
                </pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import axios from "axios";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "index",
  components: {
    Header,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      ResponseData: {},
      keyword: "",
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
    this.getResults();
  },
  methods: {
    onCancel() {},
    getResults(page = 1) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      axios
        .get(
          process.env.VUE_APP_BACKEND_URL +
            "/auth/traning/LoadData" +
            "?page=" +
            page,
          {
            params: {
              keyword: this.keyword,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          this.isLoading = false;
          this.ResponseData = response.data;
        });
    },
    deleteDataById(id) {
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      axios
        .delete(
          process.env.VUE_APP_BACKEND_URL + "/auth/traning/delete/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          location.reload();
        })
        .catch((error) => {});
    },
    EditDetail(id) {
      this.$router.push({ name: "Edit_Training", params: { id: id } });
    },
  },
  computed: {
    filter() {
      return this.ResponseData.filter((item) => {
        return item.name.toLowerCase().includes(this.keyword.toLowerCase());
      });
    },
    ...mapGetters({ permission: "getCurrentPermission" }),
  },
};
</script>

<style scoped>
.card-header {
  border-top-left-radius: 0.75rem !important;
  border-top-right-radius: 0.75rem !important;
}
</style>
