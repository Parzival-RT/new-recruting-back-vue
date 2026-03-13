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
      class="main training-page"
      :class="
        this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'
      "
    >
      <div class="container-fluid p-4">
        <div class="row mb-3 align-items-center">
          <!-- Col -->
          <div class="col-6">
            <h1 class="page-title">ტრენინგები</h1>
          </div>
          <!-- End Col -->
          <!-- Col -->
          <div
            class="col-12 col-md-6 text-md-end d-flex gap-2 justify-content-md-end mt-2 mt-md-0"
            v-if="permission == 'administrator'"
          >
            <router-link to="/Recommendations" class="btn-recommendations">
              <i class="fas fa-star"></i> რეკომენდაციები
            </router-link>
            <router-link to="/Create_Training" class="btn-add">
              <i class="fas fa-plus"></i> დამატება
            </router-link>
          </div>
          <!-- End Col -->
        </div>

        <div class="main-card">
          <div class="main-card-header">
            <span>ტრენინგების ჩამონათვალი</span>
            <input
              type="text"
              class="search-input"
              v-model="keyword"
              :options="ResponseData"
              placeholder="🔍  ძებნა"
            />
          </div>
          <div class="p-0">
            <div class="row">
              <div class="col-12">
                <table class="training-table">
                  <tbody>
                    <tr v-for="post in filter" :key="post.id">
                      <td>
                        <div class="row align-items-center">
                          <div class="col-7">
                            <span class="training-name">{{ post.name }}</span>
                          </div>
                          <!-- Action -->
                          <div class="col-5 d-flex justify-content-end gap-2">
                            <!-- Example single danger button -->
                            <div class="btn-group me-0">
                              <button
                                type="button"
                                class="btn-dots dropdown-toggle"
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
                              class="btn-edit"
                            >
                              <i class="tio-edit"></i>
                              <span class="d-none d-md-inline">რედაქტირება</span>
                            </a>
                            <div
                              v-if="permission == 'administrator'"
                              class="btn-delete"
                              data-bs-toggle="modal"
                              :data-bs-target="'#deletePosition_' + post.id"
                            >
                              <i class="tio-clear"></i>
                              <span class="d-none d-md-inline">წაშლა</span>
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

                <div class="px-3 py-3">
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

/* ── Page ── */
.training-page {
  background: #f8fafc;
  color: #0f172a;
}

/* ── Page title ── */
.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

/* ── Action buttons ── */
.btn-recommendations {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1.1rem;
  background: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
  border-radius: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
}
.btn-recommendations:hover { background: #dcfce7; color: #15803d; }

.btn-add {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1.1rem;
  background: #2563eb;
  color: #fff;
  border: 1px solid #2563eb;
  border-radius: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
}
.btn-add:hover { background: #1d4ed8; color: #fff; }

/* ── Main card ── */
.main-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.07);
  overflow: hidden;
}

/* ── Card header ── */
.main-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

/* ── Search input ── */
.search-input {
  border-radius: 0.625rem !important;
  border: 1px solid #e5e7eb !important;
  font-size: 0.8125rem;
  padding: 0.45rem 0.875rem;
  background: #fff;
  color: #111827;
  width: 220px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.search-input:focus {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.1) !important;
  outline: none;
}

/* ── Table ── */
.training-table {
  width: 100%;
  border-collapse: collapse;
}
.training-table td {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
}
.training-table tbody tr:last-child td {
  border-bottom: none;
}
.training-table tbody tr:hover td {
  background: #f8fafc;
}

/* ── Training name ── */
.training-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

/* ── Action buttons in table ── */
.btn-dots {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-dots:hover { background: #f1f5f9; }

.btn-edit {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.875rem;
  background: #fefce8;
  color: #854d0e;
  border: 1px solid #fde047;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
}
.btn-edit:hover { background: #fef9c3; color: #713f12; }

.btn-delete {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.875rem;
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-delete:hover { background: #fee2e2; color: #991b1b; }

/* ── Dropdown menu ── */
:deep(.dropdown-menu) {
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 12px 24px rgba(15,23,42,0.12);
  padding: 0.5rem;
}
:deep(.dropdown-menu .btn) {
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
}

/* ── Pagination ── */
:deep(.pagination .page-link) {
  border-radius: 0.625rem;
  border-color: #e5e7eb;
  color: #374151;
  font-size: 0.8125rem;
}
:deep(.pagination .page-item.active .page-link) {
  background-color: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

/* ── Modal ── */
:deep(.modal-content) {
  border-radius: 1rem;
  border: none;
  box-shadow: 0 20px 40px rgba(15,23,42,0.15);
}
:deep(.modal-header) {
  border-bottom: 1px solid #f1f5f9;
  padding: 1.25rem 1.5rem;
}
:deep(.modal-footer) {
  border-top: 1px solid #f1f5f9;
  padding: 1rem 1.5rem;
}

@media (max-width: 576px) {
  .main-card-header { flex-direction: column; gap: 0.75rem; align-items: flex-start; }
  .search-input { width: 100%; }
  .training-table td { padding: 0.625rem 0.875rem; }
}
</style>
