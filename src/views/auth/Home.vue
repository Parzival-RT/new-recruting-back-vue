<template>
  <div>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu == true ? 'collapsed' : 'uncollapsed'">
      <div class="container-fluid p-4">

        <!-- Page header -->
        <div class="page-header mb-4">
          <!-- <h1 class="page-title">მთავარი გვერდი</h1> -->
          <!-- <p class="page-subtitle">გაეცანით კომპანიის მისიას, ღირებულებებს და ძირითად მიმართულებებს</p> -->
        </div>

        <!-- Company banner card -->
        <div class="banner-card mb-4 d-inline-block" v-if="form.file_image">
 <img alt="" class="rounded-3 mb-4" :src="form.file_image" height="200">
          <div class="banner-overlay"></div>
        </div>

        <!-- Accordion section -->
        <div class="section-card">
          <!-- <div class="section-header">
            <div class="section-icon">
              <i class="fas fa-bookmark"></i>
            </div>
            <div>
              <h2 class="section-title">ხშირად დასვარი კითხვები</h2>
              <p class="section-desc">სათაურზე დაჭერით გაეცანით თითოეული მიმართულების შინაარსს</p>
            </div>
          </div> -->

          <div class="accordion-list">
            <div
              v-for="(item, index) in ResponseData"
              :key="item.id"
              class="acc-item"
              :class="{ 'acc-open': openItem === item.id }"
            >
              <button class="acc-trigger" @click="toggleAccordion(item.id)">
                <div class="acc-trigger-left">
                  <span class="acc-index">{{ index + 1 }}</span>
                  <span class="acc-name">{{ item.name }}</span>
                </div>
                <i class="fas fa-chevron-down acc-chevron"></i>
              </button>
              <transition name="acc-slide">
                <div class="acc-body" v-if="openItem === item.id">
                  <p v-html="item.desc" class="acc-text"></p>
                </div>
              </transition>
            </div>

            <!-- Empty state -->
            <div class="empty-state" v-if="!ResponseData || ResponseData.length === 0">
              <i class="fas fa-inbox empty-icon"></i>
              <p>მონაცემები არ მოიძებნა</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header.vue'
import axios from "axios";

export default {
  name: "Dashboard",
  components: { Header },

  data() {
    return {
      ResponseData: [],
      form: { file: '' },
      openItem: null,
    }
  },

  methods: {
    toggleAccordion(id) {
      this.openItem = this.openItem === id ? null : id;
    },

    LoadDesc() {
      axios.get(process.env.VUE_APP_BACKEND_URL + '/public/static/loadData')
        .then(response => { this.form = response.data; });
    },

    LoadData() {
      axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/RegGroup/loadData')
        .then(response => { this.ResponseData = response.data.data; });
    }
  },

  mounted() {
    this.LoadDesc();
    this.LoadData();
  }
}
</script>


<style scoped>

/* ── Page header ── */
.page-header {
  padding: 0.25rem 0;
}
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

/* ── Banner card ── */
.banner-card {
  border-radius: 1.25rem;
  overflow: hidden;
  position: relative;
  height: 200px;
  box-shadow: 0 4px 24px -4px rgba(0,0,0,0.10);
}
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(0,0,0,0.04) 100%);
  pointer-events: none;
}

/* ── Section card ── */
.section-card {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.08);
  border: 1px solid #f1f5f9;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
}
.section-icon {
  width: 42px;
  height: 42px;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px -2px rgba(37,99,235,0.35);
}
.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.2rem;
}
.section-desc {
  font-size: 0.775rem;
  color: #9ca3af;
  margin: 0;
}

/* ── Accordion list ── */
.accordion-list {
  padding: 0.75rem;
}

/* ── Single accordion item ── */
.acc-item {
  border-radius: 0.75rem;
  margin-bottom: 0.375rem;
  border: 1px solid #f1f5f9;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.acc-item:last-child {
  margin-bottom: 0;
}
.acc-item.acc-open {
  border-color: #bfdbfe;
  box-shadow: 0 2px 12px -3px rgba(37,99,235,0.12);
}

.acc-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  gap: 0.75rem;
}
.acc-trigger:hover {
  background: #f8faff;
}
.acc-item.acc-open .acc-trigger {
  background: #eff6ff;
}

.acc-trigger-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}
.acc-index {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e0e7ff;
  color: #2563eb;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.acc-item.acc-open .acc-index {
  background: #2563eb;
  color: #fff;
}
.acc-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.acc-item.acc-open .acc-name {
  color: #2563eb;
}

.acc-chevron {
  font-size: 0.7rem;
  color: #9ca3af;
  transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
  flex-shrink: 0;
}
.acc-item.acc-open .acc-chevron {
  transform: rotate(180deg);
  color: #2563eb;
}

/* ── Accordion body ── */
.acc-body {
  padding: 0 1rem 1rem 1rem;
  border-top: 1px solid #eff6ff;
}
.acc-text {
  font-size: 0.8125rem;
  color: #4b5563;
  line-height: 1.75;
  margin: 0.875rem 0 0;
}

/* ── Transition ── */
.acc-slide-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.acc-slide-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.acc-slide-enter {
  opacity: 0;
  transform: translateY(-6px);
}
.acc-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Empty state ── */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #9ca3af;
}
.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  display: block;
  color: #d1d5db;
}
.empty-state p {
  font-size: 0.875rem;
  margin: 0;
}
</style>
