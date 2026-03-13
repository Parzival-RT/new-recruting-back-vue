<template>
  <div>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu == true ? 'collapsed' : 'uncollapsed'">
      <div class="container-fluid p-4">

        <!-- Page header -->
        <div class="d-flex align-items-center gap-3 mb-4">
          <router-link to="/UserList" class="back-btn">
            <i class="fas fa-arrow-left"></i>
          </router-link>
          <div>
            <h1 class="page-title">მომხმარებლის დამატება</h1>
            <p class="page-subtitle">შეავსეთ ახალი მომხმარებლის მონაცემები</p>
          </div>
        </div>

        <div class="form-card">
          <div class="form-card-header">
            <i class="fas fa-user-plus"></i>
            <span>ახალი მომხმარებელი</span>
          </div>

          <form class="form-body">
            <div class="fields-grid">

              <div class="field-group">
                <label for="name">სახელი</label>
                <input class="form-control" name="name" id="name" type="text" placeholder="სახელი">
              </div>

              <div class="field-group">
                <label for="surname">გვარი</label>
                <input class="form-control" name="surname" id="surname" type="text" placeholder="გვარი">
              </div>

              <div class="field-group">
                <label for="email">ელ.ფოსტა</label>
                <input class="form-control" name="email" id="email" type="email" placeholder="user@example.com">
              </div>

              <div class="field-group">
                <label for="mobile">მობილურის ნომერი</label>
                <input class="form-control" name="mobile" id="mobile" type="number" placeholder="5XX XXX XXX">
              </div>

              <div class="field-group field-group-full">
                <label for="password">პაროლი</label>
                <input class="form-control" name="password" id="password" type="password" placeholder="პაროლი">
              </div>

            </div>

            <div class="form-actions">
              <button type="submit" class="btn-save">
                <i class="fas fa-plus"></i> დამატება
              </button>
              <router-link to="/UserList" class="btn-cancel">
                <i class="fas fa-arrow-left"></i> უკან
              </router-link>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header.vue'

export default {
  name: "Add_User",
  components: { Header },

  mounted() {
    window.scroll(0, 0);
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

/* ── Form card ── */
.form-card {
  background: #fff;
  border-radius: 1.25rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.08);
  overflow: hidden;
  max-width: 720px;
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
  font-size: 0.9rem;
}

.form-body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── Fields grid ── */
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
@media (max-width: 576px) {
  .fields-grid { grid-template-columns: 1fr; }
}
.field-group-full { grid-column: 1 / -1; }

.field-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.4rem;
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
