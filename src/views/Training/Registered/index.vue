<template>
    <div>
      <loading :active.sync="isLoading"
               :can-cancel="true"
               :on-cancel="onCancel"
               :is-full-page="fullPage"></loading>
      <Header/>
      <div v-show="!isLoading" class="main registered-page" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
        <div class="container-fluid p-4">

          <div class="row mb-4 g-3 align-items-center">
            <!-- Col -->
            <div class="col-12 col-md-8">
              <h1 class="page-title">კურსზე რეგისტრირებული მომხმარებელი</h1>
            </div>
            <!-- End Col -->

            <!-- Col -->
            <div class="col-12 col-md-4 d-flex justify-content-md-end">
              <div class="stat-badge">
                <i class="tio-group-equal"></i>
                <span class="stat-label">რაოდენობა</span>
                <span class="stat-value">{{ ResponseData.total }}</span>
              </div>
            </div>
            <!-- End Col -->
          </div>

          <div class="main-card">
            <div class="main-card-header">
              <span>რეგისტრირებულები</span>
              <button class="btn-copy" @click="copy('for_excel')">
                <i class="fas fa-copy"></i>
                <span>ექსელისთვის</span>
                <span v-if="copyButton" class="copied-badge">დაკოპირდა!</span>
              </button>
            </div>
            <div class="p-0">

              <div class="row">
                <div class="col-12">

                  <div class="table-responsive">
                    <table class="registered-table" style="width: 200%;" id="for_excel">
                        <thead>
                            <tr>
                                <th>პაკეტი</th>
                                <th>მოსწავლის სახელი და გვარი</th>
                                <th>თარიღი</th>
                                <th>მოსწავლის ტელ.ნომერი</th>
                                <th>მოსწავლის ელ.ფოსტა</th>
                                <th>მოზარდის ასაკი</th>
                                <th>მოსწავლის ასაკი</th>
                                <th>მშობლის სახელი და გვარი</th>
                                <th>მშობლის ელ.ფოსტა</th>
                                <th>მშობლის ტელ.ნომერი</th>
                                <th>მოკლე აღწერა</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="post in ResponseData.data" :key="post.id">
                                <td><div v-if="post.PackageInfo">{{ post.PackageInfo.name + ': ' + post.PackageInfo.price + '₾' }} </div></td>
                                <td><div>{{ post.name }} </div></td>
                                <td>
                                    <div>{{ new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) }} </div>
                                </td>
                                <td> 
                                    <div>{{ post.mobile }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.email }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.age }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.age_type }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.parent_name }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.parent_email }}</div>
                                </td>
                                <td> 
                                    <div>{{ post.parent_mobile }}</div>
                                </td>
                                <td>
                                    <div>{{ post.comment }}</div>
                                </td>
                            </tr>
                        </tbody>
                  </table>
                  </div>
  
  
                  <div class="px-3 py-3">
                    <pagination :data="ResponseData" @pagination-change-page="getResults"></pagination>
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
  import Header from '@/components/Header.vue'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import axios from "axios";
  
  export default {
    name: "index",
    components: {
      Header,
      Loading
    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        ResponseData:[],
        keyword: '',
        copyButton: false
      }
    },
    mounted() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 300);
      this.getResults()
    },
    methods: {
      onCancel() {
      },
      getResults(page = 1) {
        this.isLoading = true;
        const token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/traning/GetList/Signup/' + this.$route.params.id + '?page=' + page, {
          //   params: {
          //     keyword: this.keyword
          //   },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            this.isLoading = false;
            this.ResponseData = response.data;

            //   var inputDateStr = "2023-10-23 15:04:32.000000";

            //   // Parse the input date string
            //   var inputDate = new Date(inputDateStr);

            //   // Format the date as "YYYY-MM-DD"
            //   var formattedDate = inputDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

            //   this.ResponseData.created_at = formattedDate;

          });
      },
      copy(id) {
        var r = document.createRange();
        r.selectNode(document.getElementById(id));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        this.copyButton = true;
        setTimeout(() => this.copyButton=false, 3000);
      }
    }
  }
  </script>
  
  <style scoped>

/* ── Page ── */
.registered-page { background: #f8fafc; color: #0f172a; }

/* ── Page title ── */
.page-title { font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0; }

/* ── Stat badge ── */
.stat-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.875rem;
  color: #1d4ed8;
}
.stat-badge i { font-size: 1.1rem; }
.stat-label { font-size: 0.75rem; font-weight: 600; color: #6b7280; }
.stat-value { font-size: 1.25rem; font-weight: 800; color: #1d4ed8; line-height: 1; }

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

/* ── Copy button ── */
.btn-copy {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  background: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
  border-radius: 0.625rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
}
.btn-copy:hover { background: #dcfce7; }
.copied-badge {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: #111827;
  color: #fff;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.375rem;
  white-space: nowrap;
  pointer-events: none;
}

/* ── Table ── */
.registered-table { width: 100%; border-collapse: collapse; }
.registered-table th {
  padding: 0.625rem 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 2px solid #f1f5f9;
  background: #fafafa;
  white-space: nowrap;
}
.registered-table td {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
  font-size: 0.8125rem;
  color: #374151;
  white-space: nowrap;
}
.registered-table tbody tr:last-child td { border-bottom: none; }
.registered-table tbody tr:hover td { background: #f8fafc; }

/* ── Pagination ── */
:deep(.pagination .page-link) {
  border-radius: 0.625rem; border-color: #e5e7eb; color: #374151; font-size: 0.8125rem;
}
:deep(.pagination .page-item.active .page-link) {
  background-color: #2563eb; border-color: #2563eb; color: #fff;
}

@media (max-width: 576px) {
  .main-card-header { flex-direction: column; gap: 0.75rem; align-items: flex-start; }
}
  </style>
  