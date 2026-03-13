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
        <div class="d-flex align-items-center gap-3 mb-4">
          <router-link to="/UserList" class="back-btn">
            <i class="fas fa-arrow-left"></i>
          </router-link>
          <div>
            <h1 class="page-title">მომხმარებლის რედაქტირება</h1>
            <p class="page-subtitle">შეცვალეთ მომხმარებლის მონაცემები</p>
          </div>
        </div>

        <div class="edit-layout">

          <!-- Avatar card -->
          <div class="avatar-card">
            <div class="avatar-circle">
              {{ form.name ? form.name[0].toUpperCase() : 'U' }}
            </div>
            <p class="avatar-name">{{ form.name || '—' }}</p>
            <p class="avatar-email">{{ form.email || '—' }}</p>
            <div class="avatar-badge">
              <i class="fas fa-user-check"></i> მომხმარებელი
            </div>
          </div>

          <!-- Form card -->
          <div class="form-card">
            <div class="form-card-header">
              <i class="fas fa-pen"></i>
              <span>ინფორმაციის განახლება</span>
            </div>

            <ValidationObserver v-slot="{ handleSubmit }">
              <form v-on:submit.prevent="handleSubmit(submitForm)" class="form-body">

                <div class="field-group">
                  <label for="name">სახელი და გვარი</label>
                  <input class="form-control" v-model="form.name" id="name" name="name" type="text" placeholder="სახელი და გვარი">
                </div>

                <div class="field-group">
                  <label for="email">ელ.ფოსტა</label>
                  <input class="form-control" v-model="form.email" id="email" name="email" type="email" placeholder="user@example.com">
                </div>

                <div class="field-group">
                  <label for="mobile">მობილურის ნომერი</label>
                  <input class="form-control" v-model="form.mobile" id="mobile" name="mobile" type="number" placeholder="5XX XXX XXX">
                </div>

                <div class="field-group">
                  <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                    <label for="password">
                      პაროლი
                      <span class="label-required">*</span>
                    </label>
                    <input class="form-control" v-model="form.password" id="password" name="password" type="password" placeholder="ახალი პაროლი">
                    <span class="field-error" v-if="errors[0]">
                      <i class="fas fa-exclamation-circle"></i> აუცილებელი ველი
                    </span>
                  </ValidationProvider>
                </div>

                <div class="form-actions">
                  <button type="submit" class="btn-save">
                    <i class="fas fa-check"></i> შენახვა
                  </button>
                  <router-link to="/UserList" class="btn-cancel">
                    <i class="fas fa-times"></i> გაუქმება
                  </router-link>
                </div>

              </form>
            </ValidationObserver>
          </div>

        </div>
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
  name: "Edit",
  components: { Header, Loading },

  data() {
    return {
      isLoading: false,
      fullPage: true,
      showTopMenu: false,
      form: { password: '' }
    }
  },

  methods: {
    onCancel() {},

    submitForm() {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.put(process.env.VUE_APP_BACKEND_URL + '/auth/Users/update_password/' + this.$route.params.id, this.form, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(() => {
        this.isLoading = false;
        this.$router.push('/UserList');
      })
      .catch(() => { this.isLoading = false; });
    },

    getUserDataById() {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem('user')).access_token;
      axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/Users/get_by_id/' + this.$route.params.id, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((res) => {
        window.scroll(0, 0);
        this.isLoading = false;
        this.form = res.data;
      })
      .catch(() => { this.isLoading = false; });
    }
  },

  mounted() {
    this.getUserDataById();
  }
}
</script>


<style scoped>

/* ── Page header ── */
.page-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.2rem;
}
.page-subtitle {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0;
}
.back-btn {
  width: 38px;
  height: 38px;
  border-radius: 0.6rem;
  background: #f1f5f9;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  text-decoration: none !important;
  transition: background 0.15s;
  flex-shrink: 0;
}
.back-btn:hover { background: #e2e8f0; color: #111827; }

/* ── Layout ── */
.edit-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 767px) {
  .edit-layout { grid-template-columns: 1fr; }
}

/* ── Avatar card ── */
.avatar-card {
  background: #fff;
  border-radius: 1.25rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.08);
  padding: 2rem 1.5rem;
  text-align: center;
}
.avatar-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #2563eb;
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 12px -2px rgba(37,99,235,0.2);
}
.avatar-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.25rem;
}
.avatar-email {
  font-size: 0.775rem;
  color: #6b7280;
  margin: 0 0 1rem;
  word-break: break-all;
}
.avatar-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3rem 0.75rem;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  border: 1px solid #dbeafe;
}

/* ── Form card ── */
.form-card {
  background: #fff;
  border-radius: 1.25rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.08);
  overflow: hidden;
}
.form-card-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  font-size: 0.9rem;
  font-weight: 700;
  color: #111827;
}
.form-card-header i {
  color: #2563eb;
  font-size: 0.85rem;
}
.form-body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Fields ── */
.field-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.4rem;
}
.label-required {
  color: #ef4444;
  margin-left: 2px;
}
.field-error {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.775rem;
  color: #ef4444;
  margin-top: 0.375rem;
}

/* ── Actions ── */
.form-actions {
  display: flex;
  gap: 0.625rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f3f4f6;
}
.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.625rem 1.5rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.6rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
}
.btn-save:hover { background: #1d4ed8; }
.btn-cancel {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.625rem 1.25rem;
  background: #f8faff;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  border-radius: 0.6rem;
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none !important;
  transition: background 0.15s;
}
.btn-cancel:hover { background: #f1f5f9; color: #374151; }
</style>
