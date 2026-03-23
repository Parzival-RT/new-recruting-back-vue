<template>
  <div>
    <Header />
    <div class="main" :class="this.$store.state.showTopMenu == true ? 'collapsed' : 'uncollapsed'">
      <div class="container-fluid p-4">

        <!-- Page header -->
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h1 class="page-title">მომხმარებლის მოთხოვნები</h1>
            <p class="page-subtitle">{{ filteredDeals.length }} / {{ deals.length }} მომხმარებელი</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn-manage-tags" @click="showTagManager = true">
              <i class="fas fa-tags"></i>
              <span>თეგების მართვა</span>
            </button>
            <button
              class="btn-filter"
              data-bs-toggle="offcanvas"
              data-bs-target="#dealsFilter"
              aria-controls="dealsFilter"
              :class="{ 'btn-filter--active': hasActiveFilters }"
            >
              <i class="fas fa-sliders-h"></i>
              <span>ფილტრი</span>
              <span v-if="activeFilterCount" class="filter-count-badge">{{ activeFilterCount }}</span>
            </button>
          </div>
        </div>

        <!-- Active filter chips -->
        <div v-if="hasActiveFilters" class="active-chips mb-3">
          <span v-if="activeFilter.min_salary" class="chip">
            <i class="fas fa-money-bill-wave"></i>
            მინ. {{ activeFilter.min_salary }} ₾
            <button @click="activeFilter.min_salary = ''">×</button>
          </span>
          <span v-if="activeFilter.location" class="chip">
            <i class="fas fa-map-marker-alt"></i>
            {{ activeFilter.location }}
            <button @click="activeFilter.location = ''">×</button>
          </span>
          <span v-if="activeFilter.industry" class="chip">
            <i class="fas fa-industry"></i>
            {{ activeFilter.industry }}
            <button @click="activeFilter.industry = ''">×</button>
          </span>
          <span v-if="activeFilter.work_schedule" class="chip">
            <i class="fas fa-clock"></i>
            {{ activeFilter.work_schedule }}
            <button @click="activeFilter.work_schedule = ''">×</button>
          </span>
          <span v-if="activeFilter.job_type" class="chip">
            <i class="fas fa-laptop-house"></i>
            {{ activeFilter.job_type }}
            <button @click="activeFilter.job_type = ''">×</button>
          </span>
          <span v-for="tagId in activeFilter.tagIds" :key="tagId" class="chip chip--tag"
            :style="{ background: getTag(tagId).color + '18', color: getTag(tagId).color, borderColor: getTag(tagId).color + '44' }">
            <span class="chip-dot" :style="{ background: getTag(tagId).color }"></span>
            {{ getTag(tagId).name }}
            <button @click="removeFilterTag(tagId)" :style="{ color: getTag(tagId).color }">×</button>
          </span>
          <button class="chip-clear" @click="clearFilters">
            <i class="fas fa-redo"></i> გასუფთავება
          </button>
        </div>

        <!-- Cards grid -->
        <div v-if="filteredDeals.length" class="deals-grid">
          <div v-for="deal in filteredDeals" :key="deal.id" class="deal-card">

            <!-- Card header -->
            <div class="deal-card-header">
              <div class="user-cell">
                <div class="user-avatar">{{ deal.name[0].toUpperCase() }}</div>
                <div>
                  <div class="user-name">{{ deal.name }}</div>
                  <div class="user-meta">
                    <span v-if="deal.email"><i class="fas fa-envelope"></i> {{ deal.email }}</span>
                    <span v-if="deal.mobile"><i class="fas fa-phone"></i> {{ deal.mobile }}</span>
                  </div>
                </div>
              </div>
              <div class="tags-area">
                <span
                  v-for="tagId in deal.tagIds"
                  :key="tagId"
                  class="tag-pill"
                  :style="{ background: getTag(tagId).color + '22', color: getTag(tagId).color, borderColor: getTag(tagId).color + '55' }"
                >
                  <span class="tag-dot" :style="{ background: getTag(tagId).color }"></span>
                  {{ getTag(tagId).name }}
                  <button class="tag-remove" @click="removeTag(deal, tagId)">×</button>
                </span>
                <button class="tag-add-btn" @click="openTagPicker(deal)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <!-- Requirements -->
            <div class="deal-section">
              <div class="section-label">
                <i class="fas fa-clipboard-list"></i> მოთხოვნები
              </div>
              <div class="filter-grid">
                <div class="filter-item">
                  <span class="fi-icon fi-icon--required"><i class="fas fa-money-bill-wave"></i></span>
                  <div>
                    <div class="fi-label">მინ. სასურველი შემოსავალი</div>
                    <div class="fi-value">{{ deal.filter.min_salary }} ₾</div>
                  </div>
                </div>
                <div v-if="deal.filter.location" class="filter-item">
                  <span class="fi-icon"><i class="fas fa-map-marker-alt"></i></span>
                  <div>
                    <div class="fi-label">ადგილმდებარეობა</div>
                    <div class="fi-value">{{ deal.filter.location }}</div>
                  </div>
                </div>
                <div v-if="deal.filter.industry" class="filter-item">
                  <span class="fi-icon"><i class="fas fa-briefcase"></i></span>
                  <div>
                    <div class="fi-label">საქმიანობის სფერო</div>
                    <div class="fi-value">{{ deal.filter.industry }}</div>
                  </div>
                </div>
                <div v-if="deal.filter.work_schedule" class="filter-item">
                  <span class="fi-icon"><i class="fas fa-calendar-alt"></i></span>
                  <div>
                    <div class="fi-label">სამუშაო გრაფიკი</div>
                    <div class="fi-value">{{ deal.filter.work_schedule }}</div>
                  </div>
                </div>
                <div v-if="deal.filter.job_type" class="filter-item">
                  <span class="fi-icon"><i class="fas fa-laptop-house"></i></span>
                  <div>
                    <div class="fi-label">სამუშაოს ტიპი</div>
                    <div class="fi-value">{{ deal.filter.job_type }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Note -->
            <div class="deal-section">
              <div class="section-label">
                <i class="fas fa-sticky-note"></i> შენიშვნა
              </div>
              <textarea
                class="note-area"
                v-model="deal.note"
                placeholder="ჩაინიშნე კომენტარი ამ კანდიდატზე..."
                rows="3"
              ></textarea>
              <div class="note-footer">
                <span v-if="deal.noteSaved" class="note-saved-badge">
                  <i class="fas fa-check-circle"></i> შენახულია
                </span>
                <button class="btn-save-note" @click="saveNote(deal)">
                  <i class="fas fa-check"></i> შენახვა
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state">
          <i class="fas fa-search empty-icon"></i>
          <p>ფილტრის შედეგი ვერ მოიძებნა</p>
          <button class="chip-clear mt-2" @click="clearFilters">
            <i class="fas fa-redo"></i> გასუფთავება
          </button>
        </div>

      </div>
    </div>

    <!-- ── Filter Offcanvas ── -->
    <div class="offcanvas offcanvas-end filter-canvas" tabindex="-1" id="dealsFilter" aria-labelledby="dealsFilterLabel">
      <div class="filter-canvas-header">
        <div class="filter-canvas-title">
          <i class="fas fa-sliders-h"></i>
          <span id="dealsFilterLabel">ფილტრი</span>
        </div>
        <button type="button" class="filter-close" data-bs-dismiss="offcanvas" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="filter-canvas-body">
        <!-- Requirements filter -->
        <div class="filter-group-title">მოთხოვნები</div>

        <div class="filter-field">
          <label>მინ. სასურველი შემოსავალი (₾)</label>
          <input class="form-control" v-model="activeFilter.min_salary" type="number" placeholder="მაგ: 2000" min="0" />
        </div>

        <div class="filter-field">
          <label>ადგილმდებარეობა</label>
          <select class="form-control" v-model="activeFilter.location">
            <option value="">ყველა</option>
            <option v-for="loc in locationOptions" :key="loc" :value="loc">{{ loc }}</option>
          </select>
        </div>

        <div class="filter-field">
          <label>საქმიანობის სფერო</label>
          <select class="form-control" v-model="activeFilter.industry">
            <option value="">ყველა</option>
            <option v-for="ind in industryOptions" :key="ind" :value="ind">{{ ind }}</option>
          </select>
        </div>

        <div class="filter-field">
          <label>სამუშაო გრაფიკი</label>
          <select class="form-control" v-model="activeFilter.work_schedule">
            <option value="">ყველა</option>
            <option v-for="s in scheduleOptions" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <div class="filter-field">
          <label>სამუშაოს ტიპი</label>
          <select class="form-control" v-model="activeFilter.job_type">
            <option value="">ყველა</option>
            <option v-for="t in jobTypeOptions" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>

        <!-- Tag filter -->
        <div class="filter-group-title mt-2">თეგები</div>
        <div class="tag-filter-list">
          <label
            v-for="tag in allTags"
            :key="tag.id"
            class="tag-filter-item"
            :class="{ 'tag-filter-item--active': activeFilter.tagIds.includes(tag.id) }"
            @click="toggleFilterTag(tag.id)"
          >
            <span class="tag-dot" :style="{ background: tag.color }"></span>
            <span>{{ tag.name }}</span>
            <i v-if="activeFilter.tagIds.includes(tag.id)" class="fas fa-check tag-check ms-auto"></i>
          </label>
          <div v-if="!allTags.length" class="no-tags-msg">თეგები ჯერ არ დამატებულა</div>
        </div>
      </div>

      <div class="filter-canvas-footer">
        <button class="btn-apply" data-bs-dismiss="offcanvas">
          <i class="fas fa-check"></i> გამოყენება
        </button>
        <button class="btn-clear" @click="clearFilters" data-bs-dismiss="offcanvas">
          <i class="fas fa-redo"></i> გასუფთავება
        </button>
      </div>
    </div>

    <!-- ── Tag Picker ── -->
    <div v-if="tagPickerDeal" class="tag-picker-overlay" @click.self="tagPickerDeal = null">
      <div class="tag-picker">
        <div class="tag-picker-header">თეგის დამატება</div>
        <div class="tag-picker-list">
          <button
            v-for="tag in allTags"
            :key="tag.id"
            class="tag-picker-item"
            :class="{ 'tag-picker-item--active': tagPickerDeal.tagIds.includes(tag.id) }"
            @click="toggleTag(tagPickerDeal, tag.id)"
          >
            <span class="tag-dot" :style="{ background: tag.color }"></span>
            <span>{{ tag.name }}</span>
            <i v-if="tagPickerDeal.tagIds.includes(tag.id)" class="fas fa-check ms-auto tag-check"></i>
          </button>
          <div v-if="!allTags.length" class="tag-picker-empty">თეგები არ არის. შექმენი.</div>
        </div>
        <div class="tag-picker-footer">
          <button class="tag-picker-manage" @click="showTagManager = true; tagPickerDeal = null">
            <i class="fas fa-cog"></i> თეგების მართვა
          </button>
        </div>
      </div>
    </div>

    <!-- ── Tag Manager Modal ── -->
    <div v-if="showTagManager" class="modal-overlay" @click.self="showTagManager = false">
      <div class="modal-box">
        <div class="modal-header-row">
          <span class="modal-title"><i class="fas fa-tags"></i> თეგების მართვა</span>
          <button class="modal-close" @click="showTagManager = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="existing-tags">
            <div v-for="tag in allTags" :key="tag.id" class="existing-tag-row">
              <span class="tag-color-dot" :style="{ background: tag.color }"></span>
              <span class="existing-tag-name">{{ tag.name }}</span>
              <button class="btn-delete-tag" @click="deleteTag(tag.id)"><i class="fas fa-trash"></i></button>
            </div>
            <div v-if="!allTags.length" class="no-tags-msg">თეგები ჯერ არ დამატებულა</div>
          </div>
          <div class="divider"></div>
          <div class="add-tag-form">
            <div class="add-tag-form-title">ახალი თეგი</div>
            <div class="add-tag-row">
              <input v-model="newTag.name" class="tag-name-input" placeholder="თეგის სახელი" @keyup.enter="addTag" />
              <div class="color-swatches">
                <button
                  v-for="color in colorPalette"
                  :key="color"
                  class="color-swatch"
                  :class="{ 'color-swatch--active': newTag.color === color }"
                  :style="{ background: color }"
                  @click="newTag.color = color"
                ></button>
              </div>
              <button class="btn-add-tag" @click="addTag" :disabled="!newTag.name.trim()">
                <i class="fas fa-plus"></i> დამატება
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "UserDeals",
  components: { Header },

  data() {
    return {
      showTagManager: false,
      tagPickerDeal: null,

      colorPalette: [
        '#ef4444', '#f97316', '#eab308', '#22c55e',
        '#3b82f6', '#8b5cf6', '#ec4899', '#64748b',
        '#06b6d4', '#10b981',
      ],

      locationOptions: ['თბილისი', 'ბათუმი', 'ქუთაისი', 'რუსთავი', 'გორი', 'ნებისმიერი'],
      industryOptions: ['IT / ტექნოლოგია', 'მარკეტინგი', 'ფინანსები / ბუღალტერია', 'HR / პერსონალი', 'დიზაინი', 'გაყიდვები', 'სამართლებრივი', 'ლოჯისტიკა', 'მშენებლობა', 'განათლება', 'ჯანდაცვა', 'სხვა'],
      scheduleOptions: ['სრული განაკვეთი', 'ნახევარი განაკვეთი', 'მოქნილი გრაფიკი', 'ღამის ცვლა', 'ცვლური'],
      jobTypeOptions: ['საოფისე', 'დისტანციური', 'ჰიბრიდული'],

      activeFilter: {
        min_salary: '',
        location: '',
        industry: '',
        work_schedule: '',
        job_type: '',
        tagIds: [],
      },

      allTags: [
        { id: 1, name: 'პერსპექტიული', color: '#22c55e' },
        { id: 2, name: 'განსახილველი', color: '#eab308' },
        { id: 3, name: 'გადაწყვეტილია', color: '#3b82f6' },
        { id: 4, name: 'არ შეესაბამება', color: '#ef4444' },
        { id: 5, name: 'VIP', color: '#8b5cf6' },
      ],

      newTag: { name: '', color: '#3b82f6' },

      deals: [
        {
          id: 1,
          name: 'გიორგი მამულაშვილი',
          email: 'giorgi@example.com',
          mobile: '555 12 34 56',
          note: '',
          noteSaved: false,
          tagIds: [1],
          filter: {
            min_salary: 2500,
            location: 'თბილისი',
            industry: 'IT / ტექნოლოგია',
            work_schedule: 'სრული განაკვეთი',
            job_type: 'დისტანციური',
          },
        },
        {
          id: 2,
          name: 'ნინო კვარაცხელია',
          email: 'nino.k@example.com',
          mobile: '599 88 77 66',
          note: '',
          noteSaved: false,
          tagIds: [2, 5],
          filter: {
            min_salary: 1800,
            location: 'ბათუმი',
            industry: 'დიზაინი',
            work_schedule: 'მოქნილი გრაფიკი',
            job_type: 'ჰიბრიდული',
          },
        },
        {
          id: 3,
          name: 'დავით ბერიძე',
          email: 'davit.b@example.com',
          mobile: '577 44 55 66',
          note: 'კარგი კანდიდატი, PHP-ში ძლიერი',
          noteSaved: false,
          tagIds: [3],
          filter: {
            min_salary: 3000,
            location: 'თბილისი',
            industry: 'IT / ტექნოლოგია',
            work_schedule: 'სრული განაკვეთი',
            job_type: 'საოფისე',
          },
        },
        {
          id: 4,
          name: 'თამარ ჩიქოვანი',
          email: 'tamar.ch@example.com',
          mobile: '568 11 22 33',
          note: '',
          noteSaved: false,
          tagIds: [],
          filter: {
            min_salary: 2000,
            location: 'თბილისი',
            industry: 'HR / პერსონალი',
            work_schedule: 'სრული განაკვეთი',
            job_type: 'ჰიბრიდული',
          },
        },
        {
          id: 5,
          name: 'ლუკა ხარაბაძე',
          email: 'luka.kh@example.com',
          mobile: '595 66 77 88',
          note: '',
          noteSaved: false,
          tagIds: [4],
          filter: {
            min_salary: 4000,
            location: 'ნებისმიერი',
            industry: 'IT / ტექნოლოგია',
            work_schedule: 'სრული განაკვეთი',
            job_type: 'დისტანციური',
          },
        },
        {
          id: 6,
          name: 'მარიამ ჯავახიშვილი',
          email: 'mariam.j@example.com',
          mobile: '551 33 44 55',
          note: '',
          noteSaved: false,
          tagIds: [1, 2],
          filter: {
            min_salary: 1200,
            location: 'თბილისი',
            industry: 'მარკეტინგი',
            work_schedule: 'ნახევარი განაკვეთი',
            job_type: 'დისტანციური',
          },
        },
      ],
    };
  },

  computed: {
    filteredDeals() {
      return this.deals.filter(deal => {
        const f = this.activeFilter;
        if (f.min_salary && deal.filter.min_salary < Number(f.min_salary)) return false;
        if (f.location && deal.filter.location !== f.location) return false;
        if (f.industry && deal.filter.industry !== f.industry) return false;
        if (f.work_schedule && deal.filter.work_schedule !== f.work_schedule) return false;
        if (f.job_type && deal.filter.job_type !== f.job_type) return false;
        if (f.tagIds.length && !f.tagIds.every(tid => deal.tagIds.includes(tid))) return false;
        return true;
      });
    },

    hasActiveFilters() {
      const f = this.activeFilter;
      return f.min_salary || f.location || f.industry || f.work_schedule || f.job_type || f.tagIds.length > 0;
    },

    activeFilterCount() {
      const f = this.activeFilter;
      return [f.min_salary, f.location, f.industry, f.work_schedule, f.job_type]
        .filter(Boolean).length + f.tagIds.length;
    },
  },

  methods: {
    getTag(id) {
      return this.allTags.find(t => t.id === id) || { name: '?', color: '#9ca3af' };
    },

    removeTag(deal, tagId) {
      deal.tagIds = deal.tagIds.filter(id => id !== tagId);
    },

    openTagPicker(deal) {
      this.tagPickerDeal = deal;
    },

    toggleTag(deal, tagId) {
      if (deal.tagIds.includes(tagId)) {
        deal.tagIds = deal.tagIds.filter(id => id !== tagId);
      } else {
        deal.tagIds.push(tagId);
      }
    },

    toggleFilterTag(tagId) {
      if (this.activeFilter.tagIds.includes(tagId)) {
        this.activeFilter.tagIds = this.activeFilter.tagIds.filter(id => id !== tagId);
      } else {
        this.activeFilter.tagIds.push(tagId);
      }
    },

    removeFilterTag(tagId) {
      this.activeFilter.tagIds = this.activeFilter.tagIds.filter(id => id !== tagId);
    },

    clearFilters() {
      this.activeFilter = { min_salary: '', location: '', industry: '', work_schedule: '', job_type: '', tagIds: [] };
    },

    saveNote(deal) {
      // TODO: API call
      deal.noteSaved = true;
      setTimeout(() => { deal.noteSaved = false; }, 3000);
    },

    addTag() {
      if (!this.newTag.name.trim()) return;
      const maxId = this.allTags.length ? Math.max(...this.allTags.map(t => t.id)) : 0;
      this.allTags.push({ id: maxId + 1, name: this.newTag.name.trim(), color: this.newTag.color });
      this.newTag.name = '';
    },

    deleteTag(tagId) {
      this.allTags = this.allTags.filter(t => t.id !== tagId);
      this.deals.forEach(d => { d.tagIds = d.tagIds.filter(id => id !== tagId); });
      this.activeFilter.tagIds = this.activeFilter.tagIds.filter(id => id !== tagId);
    },
  },
};
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

/* ── Buttons ── */
.btn-manage-tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.575rem 1rem;
  background: #f8faff;
  color: #2563eb;
  border: 1px solid #dbeafe;
  border-radius: 0.6rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
}
.btn-manage-tags:hover { background: #eff6ff; border-color: #bfdbfe; }

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
  position: relative;
}
.btn-filter:hover { background: #1d4ed8; }
.btn-filter--active { background: #1d4ed8; }
.filter-count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #fff;
  color: #2563eb;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 700;
}

/* ── Active filter chips ── */
.active-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.5rem 0.25rem 0.6rem;
  background: #f0f4ff;
  color: #2563eb;
  border: 1px solid #dbeafe;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.chip i { font-size: 0.65rem; }
.chip button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1;
  color: #2563eb;
  padding: 0;
  opacity: 0.7;
}
.chip button:hover { opacity: 1; }
.chip--tag { border: 1px solid; }
.chip-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.chip-clear {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.7rem;
  background: none;
  color: #9ca3af;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.chip-clear:hover { background: #f3f4f6; color: #374151; }

/* ── Grid ── */
.deals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 1.25rem;
}

/* ── Card ── */
.deal-card {
  background: #fff;
  border-radius: 1.25rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.07);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.deal-card-header {
  padding: 1rem 1.25rem 0.875rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.user-cell {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #2563eb;
  font-weight: 700;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-name { font-weight: 700; font-size: 0.9rem; color: #111827; }
.user-meta { display: flex; gap: 0.75rem; margin-top: 0.15rem; }
.user-meta span { font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 0.3rem; }
.user-meta i { font-size: 0.65rem; color: #9ca3af; }

/* ── Tags area on card ── */
.tags-area { display: flex; flex-wrap: wrap; gap: 0.375rem; align-items: center; }
.tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.5rem 0.2rem 0.4rem;
  border-radius: 999px;
  border: 1px solid;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}
.tag-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.tag-remove {
  background: none; border: none; cursor: pointer;
  font-size: 0.85rem; line-height: 1; padding: 0 0 0 0.1rem;
  color: inherit; opacity: 0.6;
}
.tag-remove:hover { opacity: 1; }
.tag-add-btn {
  width: 22px; height: 22px; border-radius: 50%;
  border: 1.5px dashed #d1d5db; background: none;
  color: #9ca3af; font-size: 0.65rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.15s, color 0.15s;
}
.tag-add-btn:hover { border-color: #2563eb; color: #2563eb; }

/* ── Sections ── */
.deal-section { padding: 0.875rem 1.25rem; border-bottom: 1px solid #f3f4f6; }
.deal-section:last-child { border-bottom: none; }
.section-label {
  font-size: 0.75rem; font-weight: 700; color: #6b7280;
  text-transform: uppercase; letter-spacing: 0.04em;
  margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;
}
.section-label i { color: #2563eb; }

/* ── Filter grid on card ── */
.filter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem 1rem; }
.filter-item { display: flex; align-items: flex-start; gap: 0.45rem; }
.fi-icon {
  width: 24px; height: 24px; border-radius: 6px;
  background: #f0f4ff; color: #2563eb;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; flex-shrink: 0; margin-top: 2px;
}
.fi-icon--required { background: #fef9ec; color: #d97706; }
.fi-label { font-size: 0.7rem; color: #9ca3af; font-weight: 500; }
.fi-value { font-size: 0.8rem; color: #111827; font-weight: 600; }

/* ── Note ── */
.note-area {
  width: 100%; border: 1px solid #e5e7eb; border-radius: 0.6rem;
  padding: 0.625rem 0.75rem; font-size: 0.8125rem; color: #374151;
  resize: vertical; font-family: inherit; transition: border-color 0.15s; background: #fafbff;
}
.note-area:focus { outline: none; border-color: #93c5fd; background: #fff; }
.note-footer {
  display: flex; align-items: center; justify-content: flex-end;
  gap: 0.625rem; margin-top: 0.5rem;
}
.btn-save-note {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 0.38rem 0.875rem; background: #2563eb; color: #fff;
  border: none; border-radius: 0.5rem; font-size: 0.775rem;
  font-weight: 600; cursor: pointer; transition: background 0.15s;
}
.btn-save-note:hover { background: #1d4ed8; }
.note-saved-badge { font-size: 0.75rem; color: #16a34a; display: flex; align-items: center; gap: 0.3rem; }

/* ── Empty state ── */
.empty-state {
  text-align: center; padding: 4rem 1rem; color: #9ca3af;
}
.empty-icon { font-size: 2.5rem; color: #d1d5db; display: block; margin-bottom: 0.75rem; }
.empty-state p { font-size: 0.875rem; margin: 0; }

/* ── Filter offcanvas ── */
.filter-canvas-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
}
.filter-canvas-title {
  display: flex; align-items: center; gap: 0.625rem;
  font-size: 0.9375rem; font-weight: 700; color: #111827;
}
.filter-canvas-title i { color: #2563eb; font-size: 0.9rem; }
.filter-close {
  width: 30px; height: 30px; border-radius: 50%; border: none;
  background: #f1f5f9; color: #6b7280; display: flex;
  align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.75rem; transition: background 0.15s;
}
.filter-close:hover { background: #e5e7eb; color: #374151; }
.filter-canvas-body {
  padding: 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  max-height: calc(100vh - 130px);
  padding-bottom: 5rem;
}

.filter-group-title {
  font-size: 0.75rem; font-weight: 700; color: #6b7280;
  text-transform: uppercase; letter-spacing: 0.04em;
  margin-bottom: 0.875rem; display: flex; align-items: center; gap: 0.4rem;
}
.filter-group-title.mt-2 { margin-top: 1.25rem; }

.filter-field { margin-bottom: 1rem; }
.filter-field label {
  display: block; font-size: 0.8rem; font-weight: 600;
  color: #374151; margin-bottom: 0.375rem;
}

/* ── Tag filter list in offcanvas ── */
.tag-filter-list { display: flex; flex-direction: column; gap: 0.25rem; }
.tag-filter-item {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 0.75rem; border-radius: 0.6rem;
  cursor: pointer; font-size: 0.8125rem; color: #374151;
  transition: background 0.1s; border: 1px solid transparent;
  user-select: none;
}
.tag-filter-item:hover { background: #f8faff; }
.tag-filter-item--active { background: #f0f4ff; font-weight: 600; border-color: #dbeafe; }
.tag-check { color: #2563eb; font-size: 0.7rem; }
.no-tags-msg { font-size: 0.8rem; color: #9ca3af; padding: 0.5rem 0; text-align: center; }

.filter-canvas-footer {
  padding: 1rem 1.5rem; border-top: 1px solid #f1f5f9;
  display: flex; gap: 0.5rem; background: #fff;
  position: absolute; bottom: 0; left: 0; right: 0;
}
.btn-apply {
  flex: 1; padding: 0.625rem; background: #2563eb; color: #fff;
  border: none; border-radius: 0.6rem; font-size: 0.8125rem;
  font-weight: 600; cursor: pointer; transition: background 0.18s;
  display: flex; align-items: center; justify-content: center; gap: 0.375rem;
}
.btn-apply:hover { background: #1d4ed8; }
.btn-clear {
  flex: 1; padding: 0.625rem; background: #f8faff; color: #6b7280;
  border: 1px solid #e5e7eb; border-radius: 0.6rem; font-size: 0.8125rem;
  font-weight: 500; cursor: pointer; transition: background 0.18s;
  display: flex; align-items: center; justify-content: center; gap: 0.375rem;
}
.btn-clear:hover { background: #f1f5f9; color: #374151; }

/* ── Tag Picker popup ── */
.tag-picker-overlay { position: fixed; inset: 0; z-index: 1050; }
.tag-picker {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  background: #fff; border-radius: 0.875rem;
  box-shadow: 0 8px 40px -8px rgba(0,0,0,0.18);
  border: 1px solid #f1f5f9; width: 220px; z-index: 1051; overflow: hidden;
}
.tag-picker-header {
  padding: 0.75rem 1rem 0.5rem; font-size: 0.8rem;
  font-weight: 700; color: #111827; border-bottom: 1px solid #f3f4f6;
}
.tag-picker-list { padding: 0.375rem 0; max-height: 240px; overflow-y: auto; }
.tag-picker-item {
  width: 100%; display: flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 1rem; background: none; border: none;
  cursor: pointer; font-size: 0.8125rem; color: #374151;
  text-align: left; transition: background 0.1s;
}
.tag-picker-item:hover { background: #f8faff; }
.tag-picker-item--active { background: #f0f4ff; font-weight: 600; }
.tag-picker-empty { padding: 0.75rem 1rem; font-size: 0.8rem; color: #9ca3af; text-align: center; }
.tag-picker-footer { border-top: 1px solid #f3f4f6; padding: 0.5rem; }
.tag-picker-manage {
  width: 100%; padding: 0.425rem; background: none; border: none;
  border-radius: 0.5rem; font-size: 0.775rem; color: #6b7280;
  cursor: pointer; display: flex; align-items: center;
  justify-content: center; gap: 0.4rem; transition: background 0.1s;
}
.tag-picker-manage:hover { background: #f3f4f6; color: #374151; }

/* ── Tag Manager Modal ── */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.35);
  z-index: 1100; display: flex; align-items: center;
  justify-content: center; padding: 1rem;
}
.modal-box {
  background: #fff; border-radius: 1.25rem; width: 100%; max-width: 460px;
  box-shadow: 0 16px 64px -12px rgba(0,0,0,0.22); overflow: hidden;
}
.modal-header-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
}
.modal-title {
  font-size: 0.9375rem; font-weight: 700; color: #111827;
  display: flex; align-items: center; gap: 0.5rem;
}
.modal-title i { color: #2563eb; }
.modal-close {
  width: 30px; height: 30px; border-radius: 50%; border: none;
  background: #f1f5f9; color: #6b7280; display: flex;
  align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.75rem; transition: background 0.15s;
}
.modal-close:hover { background: #e5e7eb; color: #374151; }
.modal-body { padding: 1.25rem 1.5rem; }

.existing-tags { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.5rem; }
.existing-tag-row {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.45rem 0.75rem; background: #f9fafb;
  border-radius: 0.6rem; border: 1px solid #f1f5f9;
}
.tag-color-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.existing-tag-name { flex: 1; font-size: 0.8125rem; color: #374151; font-weight: 500; }
.btn-delete-tag {
  background: none; border: none; color: #d1d5db; cursor: pointer;
  font-size: 0.75rem; padding: 0.2rem 0.3rem; border-radius: 0.375rem;
  transition: color 0.15s, background 0.15s;
}
.btn-delete-tag:hover { color: #ef4444; background: #fef2f2; }

.divider { height: 1px; background: #f1f5f9; margin: 1rem 0; }
.add-tag-form-title { font-size: 0.8rem; font-weight: 700; color: #374151; margin-bottom: 0.625rem; }
.add-tag-row { display: flex; flex-direction: column; gap: 0.625rem; }
.tag-name-input {
  width: 100%; padding: 0.525rem 0.75rem; border: 1px solid #e5e7eb;
  border-radius: 0.6rem; font-size: 0.8125rem; color: #374151;
  font-family: inherit; transition: border-color 0.15s;
}
.tag-name-input:focus { outline: none; border-color: #93c5fd; }
.color-swatches { display: flex; flex-wrap: wrap; gap: 0.375rem; }
.color-swatch {
  width: 24px; height: 24px; border-radius: 50%;
  border: 2.5px solid transparent; cursor: pointer;
  transition: transform 0.12s, border-color 0.12s; outline: none;
}
.color-swatch:hover { transform: scale(1.15); }
.color-swatch--active { border-color: #111827; transform: scale(1.15); }
.btn-add-tag {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 0.375rem; padding: 0.525rem 1rem; background: #2563eb; color: #fff;
  border: none; border-radius: 0.6rem; font-size: 0.8125rem;
  font-weight: 600; cursor: pointer; transition: background 0.15s; width: 100%;
}
.btn-add-tag:hover:not(:disabled) { background: #1d4ed8; }
.btn-add-tag:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
