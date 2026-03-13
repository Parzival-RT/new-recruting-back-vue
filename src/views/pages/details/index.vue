<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :is-full-page="fullPage"></loading>
    <Header/>
    <div class="main details-page" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">

        <!-- Page header -->
        <div class="row mb-3 align-items-center">
          <div class="col">
            <h1 class="page-title">კომპანიის მონაცემები</h1>
          </div>
          <div class="col-auto">
            <a href="/Details/create" class="btn-add">
              <i class="fas fa-plus"></i> დამატება
            </a>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="!ResponseData || ResponseData.length === 0" class="empty-state">
          <i class="fas fa-building empty-icon"></i>
          <p class="empty-title">კომპანია არ არის დამატებული</p>
          <a href="/Details/create" class="btn-add">
            <i class="fas fa-plus"></i> კომპანიის დამატება
          </a>
        </div>

        <!-- Company cards -->
        <div class="row g-3">
          <div v-for="post in ResponseData" :key="post.id" class="col-12">
            <div @click="EditDetail(post.id)" class="company-card">
              <div class="company-logo-wrap">
                <img v-if="post.company_logo" :src="post.company_logo" alt="company logo" class="company-logo">
                <div v-else class="company-logo-placeholder">
                  <i class="fas fa-building"></i>
                </div>
              </div>
              <div class="company-info">
                <span class="company-name">{{ post.name }}</span>
                <span class="company-edit-hint"><i class="tio-edit"></i> რედაქტირება</span>
              </div>
              <i class="fas fa-chevron-right company-arrow"></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Header from "@/components/Header";

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
      ResponseData:{}
    }
  },
  methods:{

    onCancel() {
    },
    getResults() {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/details/get_all_details',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.isLoading = false;
            this.ResponseData = response.data;
          });
    },
    DeleteDetail(id){
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.delete(process.env.VUE_APP_BACKEND_URL+'/auth/details/delete_detail_by_id/'+id,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.isLoading = false;
            location.reload();
          });
    },
    EditDetail(id){
      this.$router.push({ name: 'DetailsEdit', params: { id: id  } })
    },


  },
  computed: {
    getRole(){
      return this.$store.state.user_role;
    }
  },

  mounted() {
    this.getResults();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false
    }, 300)
  }
}
</script>

<style scoped>

/* ── Page ── */
.details-page { background: #f8fafc; color: #0f172a; }

/* ── Page title ── */
.page-title { font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0; }

/* ── Add button ── */
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

/* ── Company card ── */
.company-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  box-shadow: 0 2px 12px -4px rgba(0,0,0,0.07);
  cursor: pointer;
  transition: box-shadow 0.18s ease, border-color 0.18s ease, transform 0.15s ease;
}
.company-card:hover {
  box-shadow: 0 8px 24px -6px rgba(37,99,235,0.14);
  border-color: #bfdbfe;
  transform: translateY(-1px);
}

/* ── Logo ── */
.company-logo-wrap {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.company-logo { width: 100%; height: 100%; object-fit: contain; }
.company-logo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 1.25rem;
}

/* ── Info ── */
.company-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.company-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
}
.company-edit-hint {
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
}

/* ── Arrow ── */
.company-arrow {
  color: #cbd5e1;
  font-size: 0.8rem;
  flex-shrink: 0;
  transition: color 0.15s, transform 0.15s;
}
.company-card:hover .company-arrow {
  color: #2563eb;
  transform: translateX(2px);
}

/* ── Empty state ── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1rem;
  text-align: center;
  background: #fff;
  border: 1px dashed #e5e7eb;
  border-radius: 1.25rem;
}
.empty-icon {
  font-size: 2.5rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}
.empty-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 1.25rem;
}

@media (max-width: 576px) {
  .company-card { padding: 0.875rem 1rem; }
}
</style>
