<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :is-full-page="fullPage"></loading>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu == true ? 'collapsed' : 'uncollapsed'">
      <div class="container-fluid p-4">

        <!-- Page header -->
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 class="page-title">მომხმარებლები</h1>
            <p class="page-subtitle">სისტემის ყველა მომხმარებლის სია</p>
          </div>
          <button class="btn-filter" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <i class="fas fa-sliders-h"></i>
            <span>ფილტრი</span>
          </button>
        </div>

        <!-- Table card -->
        <div class="table-card">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>სახელი და გვარი</th>
                  <th>ელ.ფოსტა</th>
                  <th>ტელეფონი</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in UserData.data" :key="item.id">
                  <td class="td-id">{{ item.id }}</td>
                  <td>
                    <div class="user-cell">
                      <div class="user-avatar">{{ item.name ? item.name[0].toUpperCase() : 'U' }}</div>
                      <span class="user-name">{{ item.name }}</span>
                    </div>
                  </td>
                  <td class="td-email">{{ item.email }}</td>
                  <td class="td-phone">
                    <span v-if="item.mobile" class="badge-phone">{{ item.mobile }}</span>
                    <span v-else class="td-empty">—</span>
                  </td>
                  <td class="td-action">
                    <router-link :to="'/UserEdit/'+item.id+'/Edit'" target="_blank" class="btn-edit">
                      <i class="fas fa-pen"></i>
                      <span>რედაქტირება</span>
                    </router-link>
                  </td>
                </tr>
                <tr v-if="!UserData.data || UserData.data.length === 0">
                  <td colspan="5" class="empty-row">
                    <i class="fas fa-users empty-icon"></i>
                    <p>მომხმარებლები არ მოიძებნა</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="table-footer">
            <pagination :data="UserData" show-disabled :limit="5" @pagination-change-page="getUserResults">
              <template #prev-nav><span>← წინ</span></template>
              <template #next-nav><span>შემდეგ →</span></template>
            </pagination>
          </div>
        </div>

      </div>
    </div>


    <!-- Filter offcanvas -->
    <div class="offcanvas offcanvas-end filter-canvas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="filter-canvas-header">
        <div class="filter-canvas-title">
          <i class="fas fa-sliders-h"></i>
          <span id="offcanvasRightLabel">ფილტრი</span>
        </div>
        <button type="button" class="filter-close" data-bs-dismiss="offcanvas" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="filter-canvas-body">
        <form ref="form" class="filter-form">
          <div class="filter-field">
            <label for="name">სახელი და გვარი</label>
            <input class="form-control" v-model="form.name" name="name" id="name" type="text" placeholder="მაგ: გიორგი მამულაშვილი">
          </div>
          <div class="filter-field">
            <label for="email">ელ.ფოსტა</label>
            <input class="form-control" v-model="form.email" id="email" name="email" type="text" placeholder="მაგ: user@example.com">
          </div>
          <div class="filter-field">
            <label for="mobile">ტელეფონის ნომერი</label>
            <input class="form-control" v-model="form.mobile" name="mobile" id="mobile" type="text" placeholder="მაგ: 5XX XXX XXX">
          </div>
        </form>
      </div>

      <div class="filter-canvas-footer">
        <button class="btn-apply" @click="filter">
          <i class="fas fa-check"></i> გაფილტრე
        </button>
        <button class="btn-clear" @click="ClearFilter" data-bs-dismiss="offcanvas" aria-label="Close">
          <i class="fas fa-redo"></i> გასუფთავება
        </button>
      </div>
    </div>

  </div>
</template>


<script>
import Header from '@/components/Header.vue'
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "UserList",
  components: { Header, Loading },

  data() {
    return {
      isLoading: false,
      fullPage: true,
      showTopMenu: false,
      UserData: {},
      form: {
        name: this.$route.query.name,
        email: this.$route.query.email,
        mobile: this.$route.query.mobile
      }
    }
  },

  methods: {
    onCancel() {},

    getUserResults(page = 1) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/Users/LoadData' + '?page=' + page, {
        params: {
          name: this.$route.query.name,
          email: this.$route.query.email,
          mobile: this.$route.query.mobile,
        },
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(response => {
        window.scroll(0, 0);
        this.isLoading = false;
        this.UserData = response.data;
      });
    },

    filter() {
      this.$refs.form.submit();
    },

    ClearFilter() {
      this.$router.push(this.param);
      this.form.name = '';
      this.form.email = '';
      this.form.mobile = '';
      this.$route.query.name = '';
      this.$route.query.email = '';
      this.$route.query.mobile = '';
      this.getUserResults();
    },
  },

  mounted() {
    this.getUserResults();
  }
}
</script>


<style scoped>

/* ── Page header ── */
.page-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.25rem;
}
.page-subtitle {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0;
}

/* ── Filter button ── */
.btn-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.575rem 1rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.6rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
  white-space: nowrap;
}
.btn-filter:hover { background: #1d4ed8; }

/* ── Table card ── */
.table-card {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.08);
  border: 1px solid #f1f5f9;
  overflow: hidden;
}

.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead tr {
  background: #f8faff;
  border-bottom: 1px solid #e5e7eb;
}
.data-table thead th {
  padding: 0.875rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.data-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.12s;
}
.data-table tbody tr:last-child { border-bottom: none; }
.data-table tbody tr:hover { background: #fafbff; }

.data-table tbody td {
  padding: 0.875rem 1.25rem;
  font-size: 0.8125rem;
  color: #374151;
  vertical-align: middle;
}

/* ── Cells ── */
.td-id {
  color: #9ca3af;
  font-size: 0.75rem;
  font-weight: 600;
  width: 48px;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #2563eb;
  font-weight: 700;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-name {
  font-weight: 600;
  color: #111827;
}

.td-email { color: #6b7280; }

.badge-phone {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: #f0fdf4;
  color: #16a34a;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #bbf7d0;
}
.td-empty { color: #d1d5db; }

.td-action { text-align: right; }
.btn-edit {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.42rem 0.875rem;
  background: #f8faff;
  color: #2563eb;
  border: 1px solid #dbeafe;
  border-radius: 0.5rem;
  font-size: 0.775rem;
  font-weight: 500;
  text-decoration: none !important;
  transition: background 0.15s, border-color 0.15s;
  white-space: nowrap;
}
.btn-edit:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}
.btn-edit i { font-size: 0.7rem; }

/* ── Empty row ── */
.empty-row {
  text-align: center;
  padding: 3.5rem 1rem !important;
  color: #9ca3af;
}
.empty-icon {
  font-size: 2.5rem;
  color: #d1d5db;
  display: block;
  margin-bottom: 0.75rem;
}
.empty-row p { margin: 0; font-size: 0.875rem; }

/* ── Pagination footer ── */
.table-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: flex-end;
}

/* ── Filter offcanvas ── */
.filter-canvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
}
.filter-canvas-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
}
.filter-canvas-title i {
  color: #2563eb;
  font-size: 0.9rem;
}
.filter-close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #f1f5f9;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background 0.15s;
}
.filter-close:hover { background: #e5e7eb; color: #374151; }

.filter-canvas-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}
.filter-form { display: flex; flex-direction: column; gap: 1.25rem; }
.filter-field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.375rem;
}

.filter-canvas-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  gap: 0.5rem;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.btn-apply {
  flex: 1;
  padding: 0.625rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.6rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
}
.btn-apply:hover { background: #1d4ed8; }
.btn-clear {
  flex: 1;
  padding: 0.625rem;
  background: #f8faff;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  border-radius: 0.6rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
}
.btn-clear:hover { background: #f1f5f9; color: #374151; }
</style>
