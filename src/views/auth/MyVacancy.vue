<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"></loading>
    <Header />
    <section
      class="main vacancy"
      :class="
        this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'
      ">
      <div class="container-fluid p-4">
        <!-- Row -->
        <div class="row align-items-center">
          <div
            class="col-12 col-md-4 mb-4"
            v-if="permission == 'administrator'">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight">
              <i class="tio-search"></i> ფილტრი
            </button>
          </div>
          <!-- Col -->
          <div class="col-12 col-md-8 mb-4">
            <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
              <ol class="breadcrumb mb-0 float-md-end">
                <li class="breadcrumb-item text-primary">
                  <router-link to="/VacancyDashboard"
                    >ვაკანსიების სტატუსი</router-link
                  >
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <span v-if="vacancyStatus == 'published'"
                    >გამოქვეყნებული</span
                  >
                  <span v-if="vacancyStatus == 'approved'">დადასტურებული</span>
                  <span v-if="vacancyStatus == 'pendding'">განსახილველი</span>
                  <span v-if="vacancyStatus == 'unpublished'">გაუქმებული</span>
                </li>
              </ol>
            </nav>
          </div>
          <!-- End Col -->

          <!-- Col -->
          <div v-if="permission === 'administrator'" class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <span class="h6 font-semibold text-sm d-block mb-2"
                      >თვის ჭრილში გაგზავნილი სივები</span
                    >
                    <span class="h3 font-bold mb-0"
                      >{{ cv_count.cnt }}
                      <small style="font-size: 12px" class="text-muted"
                        >სივი</small
                      ></span
                    >
                  </div>
                  <div class="col-auto">
                    <div
                      class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                      <i class="bi bi-credit-card"></i>
                    </div>
                  </div>
                </div>
                <div class="mt-2 mb-0 text-sm">
                  <span class="badge badge-pill bg-soft-success text-success">
                    <i class="bi bi-arrow-up me-1"></i>{{ cv_count.cnt }} /
                    13000
                  </span>
                </div>
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Success example"
                  :aria-valuenow="cv_count.cnt"
                  aria-valuemin="0"
                  aria-valuemax="13000">
                  <div
                    class="progress-bar bg-success"
                    :style="
                      'width:' + Math.floor((cv_count.cnt / 13000) * 100) + '%'
                    ">
                    {{ Math.floor((cv_count.cnt / 13000) * 100) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Col -->

          <!-- Col -->
          <div
            v-if="permission === 'administrator'"
            class="col-md-4 align-self-stretch mb-4">
            <div class="card card-border-shadow-primary h-100">
              <div class="card-body">
                <div class="d-flex align-items-center mb-2">
                  <div class="avatar me-4">
                    <span class="avatar-initial rounded-3 bg-primary">
                      <img
                        class="w-75"
                        src="../../assets/image/vip.png"
                        alt="vip vacancies count" />
                    </span>
                  </div>
                  <h4 v-if="cv_count.vip_status_cnt" class="mb-0">
                    {{ cv_count.vip_status_cnt }}
                  </h4>
                </div>
                <h6 class="mb-0 fw-normal">Vip ვაკანსიები</h6>
                <p class="mb-0">
                  <small class="text-muted">მიმდინარე მონაცემი</small>
                </p>
              </div>
            </div>
          </div>
          <!-- End Col -->

          <!-- Col -->
          <div
            v-if="permission === 'administrator'"
            class="col-md-4 align-self-stretch mb-4">
            <div class="card card-border-shadow-primary h-100">
              <div class="card-body">
                <div class="d-flex align-items-center mb-2">
                  <div class="avatar me-4">
                    <span class="avatar-initial rounded-3 bg-warning">
                      <img
                        class="w-75"
                        src="../../assets/image/super_vip.png"
                        alt="vip vacancies count" />
                    </span>
                  </div>
                  <h4 v-if="cv_count.super_vip_status_cnt" class="mb-0">
                    {{ cv_count.super_vip_status_cnt }}
                  </h4>
                </div>
                <h6 class="mb-0 fw-normal">Super Vip ვაკანსიები</h6>
                <p class="mb-0">
                  <small class="text-muted">მიმდინარე მონაცემი</small>
                </p>
              </div>
            </div>
          </div>
          <!-- End Col -->

          <!-- Col -->
          <div
            class="col-12 col-md-12 mb-3"
            v-for="(item, index) in LoadVacancy.data.data"
            :key="index">
            <div class="card">
              <div class="card-header d-flex">
                <small class="" v-if="item.id">
                  {{ item.id }}
                </small>

                <div
                  v-if="item.super_vip_status.id === 'active'"
                  class="badge bg-dark ms-2">
                  SUPER VIP: {{ item.super_vip_status.label }}
                </div>
                <div
                  v-if="item.vip_status.id === 'active'"
                  class="badge bg-dark ms-2">
                  VIP Status: {{ item.vip_status.label }}
                </div>
                <small class="ms-auto" v-if="item.amount_type == '1'">
                  მინ: {{ item.avarage_min_bonus }} {{ item.currency }} - მაქს:
                  {{ item.avarage_max_bonus }} {{ item.currency }}
                </small>
                <small class="ms-auto" v-if="item.amount_type == '2'">
                  მინ: {{ item.min_amount }} {{ item.currency }} - მაქს:
                  {{ item.max_amount }} {{ item.currency }}
                </small>
                <small class="ms-auto" v-if="item.amount_type == '3'">
                  ფიქსირებული: {{ item.fixed_amount }} {{ item.currency }}
                </small>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <b v-b-tooltip.hover.top="'პოზიციის დასახელება'">{{
                    item.position
                  }}</b>

                  <div v-if="permission !== 'administrator'">
                    <span
                      class="badge rounded-pill bg-green"
                      style="line-height: 1.4"
                      v-if="vacancyStatus == 'published'">
                      გამოქვეყნებული
                    </span>
                    <span
                      class="badge rounded-pill bg-primary"
                      style="line-height: 1.4"
                      v-if="vacancyStatus == 'approved'">
                      დადასტურებული
                    </span>
                    <span
                      class="badge rounded-pill bg-warning"
                      style="line-height: 1.4"
                      v-if="vacancyStatus == 'pendding'">
                      განსახილველი
                    </span>
                    <span
                      class="badge rounded-pill bg-danger"
                      style="line-height: 1.4"
                      v-if="vacancyStatus == 'unpublished'">
                      გაუქმებული
                    </span>
                  </div>

                  <div class="dropdown" v-if="permission === 'administrator'">
                    <button
                      class="badge btn btn-secondary dropdown-toggle"
                      :class="statusButtonClass(vacancyStatus)"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <span v-if="vacancyStatus == 'published'"
                        >გამოქვეყნებული</span
                      >
                      <span v-if="vacancyStatus == 'approved'"
                        >დადასტურებული</span
                      >
                      <span v-if="vacancyStatus == 'pendding'"
                        >განსახილველი</span
                      >
                      <span v-if="vacancyStatus == 'unpublished'"
                        >გაუქმებული</span
                      >
                    </button>
                    <ul class="dropdown-menu h-auto">
                      <li>
                        <button
                          @click="changeVacancyStatus(item.id, 'published')"
                          class="dropdown-item"
                          :class="{
                            'bg-success text-white':
                              vacancyStatus == 'published',
                          }">
                          გამოქვეყნებული
                        </button>
                      </li>
                      <li>
                        <button
                          @click="changeVacancyStatus(item.id, 'approved')"
                          class="dropdown-item"
                          :class="{
                            'bg-success text-white':
                              vacancyStatus == 'approved',
                          }">
                          დადასტურებული
                        </button>
                      </li>
                      <li>
                        <button
                          @click="changeVacancyStatus(item.id, 'pendding')"
                          class="dropdown-item"
                          :class="{
                            'bg-warning text-white':
                              vacancyStatus == 'pendding',
                          }">
                          განსახილველი
                        </button>
                      </li>
                      <li>
                        <button
                          @click="changeVacancyStatus(item.id, 'unpublished')"
                          class="dropdown-item"
                          :class="{
                            'bg-danger text-white':
                              vacancyStatus == 'unpublished',
                          }">
                          გაუქმებული
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-if="permission === 'administrator'"
                  class="badge"
                  :class="
                    item.package == 130
                      ? 'bg-success'
                      : '' || item.package == 100
                      ? 'bg-warning'
                      : '' || item.package == 60
                      ? 'bg-danger'
                      : ''
                  ">
                  {{ item.package }} ლარიანი
                </div>
                <!--              <small class="text-muted" title="დამატების თარიღი"> {{ item.created_at }}</small>-->
                <small class="card-title text-muted d-block mb-0 mt-2">
                  <b>{{ item.detail_name }}</b>

                  <span v-if="permission == 'administrator'"
                    >({{ item.cnt_active_vacancy }})</span
                  >
                </small>

                <small class="card-title text-muted">
                  {{ item.location }}
                </small>
                <br />
                <small class="card-title text-muted">
                  გამოქვეყნების თარიღი:
                  {{ item.created_at }} </small
                ><br />
                <small
                  v-if="item.die_at != ''"
                  class="card-title text-muted d-block">
                  გაუქმების თარიღი:
                  {{ item.die_at }}
                </small>
                <!-- <div class="card-title d-flex align-items-center mt-3" v-if="permission === 'administrator'">
                  <small class="text-muted me-1">გადახდის სტატუსი:</small>
                  <span :class="'badge ' + item.payment_status_badge">{{ item.payment_status }}</span>
                </div> -->

                <small
                  v-if="permission === 'administrator'"
                  class="text-muted me-1"
                  >გადახდის სტატუსი:</small
                >
                <div
                  class="dropdown d-inline-block"
                  v-if="permission === 'administrator'">
                  <button
                    class="badge btn btn-secondary dropdown-toggle"
                    :class="PaymentstatusButtonClass(item.payment_status)"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span v-if="item.payment_status == 'უფასო'">უფასო</span>
                    <span v-if="item.payment_status == 'გადახდილია'"
                      >გადახდილია</span
                    >
                    <span v-if="item.payment_status == 'გადაუხდელია'"
                      >გადაუხდელია</span
                    >
                  </button>
                  <ul class="dropdown-menu h-auto">
                    <li>
                      <button
                        @click="changeVacancyPaymentStatus(item.id, 'free')"
                        class="dropdown-item"
                        :class="{
                          'bg-danger text-white':
                            item.payment_status == 'უფასო',
                        }">
                        უფასო
                      </button>
                    </li>
                    <li>
                      <button
                        @click="changeVacancyPaymentStatus(item.id, 'paid')"
                        class="dropdown-item"
                        :class="{
                          'bg-success text-white':
                            item.payment_status == 'გადახდილია',
                        }">
                        გადახდილია
                      </button>
                    </li>
                    <li>
                      <button
                        @click="changeVacancyPaymentStatus(item.id, 'unpaid')"
                        class="dropdown-item"
                        :class="{
                          'bg-danger text-white':
                            item.payment_status == 'გადაუხდელია',
                        }">
                        გადაუხდელია
                      </button>
                    </li>
                  </ul>
                </div>

                <br /><br />
                <small class="card-title text-muted d-none">
                  ვაკანსიის დასრულების ვადა:
                  {{ item.end_at }}
                </small>
              </div>
              <div class="card-footer text-muted bg-transparent">
                <div class="row align-items-center">
                  <div class="col-6 col-md-2">
                    <button
                      v-if="param == 'published'"
                      class="btn btn-danger btn-sm w-100"
                      data-bs-toggle="modal"
                      :data-bs-target="`#turnOff_` + item.id">
                      გათიშვა
                    </button>
                    <button
                      v-if="param == 'unpublished'"
                      class="btn btn-success btn-sm w-100"
                      @click="VacancyStatusChange(item.id, 'pendding')">
                      გააქტიურება
                    </button>
                  </div>
                  <div
                    class="col-6 col-md-2"
                    v-show="
                      param == 'published' && permission == 'administrator'
                    ">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm w-100"
                      data-bs-toggle="modal"
                      :data-bs-target="`#exampleModal_` + item.id">
                      კოპირება
                    </button>
                  </div>
                  <div class="col-6 col-md-2 mt-2 mt-md-0 ms-0 ms-md-auto">
                    <div v-if="vacancyStatus == 'published'">
                      <button
                        class="btn btn-sm btn-success w-100"
                        title="სულ CV-ები / აქტიური CV-ები"
                        @click="LoadCandidates(item.id)">
                        {{ item.count }} CV
                      </button>
                    </div>
                    <div v-if="vacancyStatus == 'unpublished'">
                      <button
                        class="btn btn-sm btn-success w-100"
                        title="სულ CV-ები / აქტიური CV-ები"
                        @click="LoadCandidates(item.id)">
                        {{ item.count }} CV
                      </button>
                    </div>
                  </div>

                  <div
                    class="col-6 col-md-2 mt-2 mt-md-0"
                    v-if="
                      vacancyStatus == 'published' && permission == 'custumer'
                    ">
                    <a :href="'/watch/' + item.id + '/edit'">
                      <button
                        class="btn btn-yellow btn-sm ms-auto w-100"
                        title="ვაკანსიის ნახვა">
                        <i class="tio-invisible"></i>
                        ნახვა
                      </button>
                    </a>
                  </div>

                  <div
                    class="col-6 col-md-2 mt-2 mt-md-0"
                    v-if="permission == 'administrator'">
                    <router-link :to="'/vacancy/' + item.id + '/edit'">
                      <button
                        @click="local_page()"
                        class="btn btn-yellow btn-sm ms-auto w-100"
                        title="ვაკანსიის რედაქტირება">
                        რედაქტირება
                      </button>
                    </router-link>
                  </div>

                  <div
                    class="col-6 col-md-2 mt-2 mt-md-0"
                    v-if="permission === 'custumer' && param !== 'published'">
                    <router-link :to="'/vacancy/' + item.id + '/edit'">
                      <button
                        @click="local_page()"
                        class="btn btn-yellow btn-sm ms-auto w-100"
                        title="ვაკანსიის რედაქტირება">
                        რედაქტირება
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Col -->

          <div class="col-md-12 mt-4 mb-5">
            <div class="pagination-container">
              <pagination
                :limit="3"
                show-disabled
                :data="LoadVacancy.data"
                @pagination-change-page="LoadVacancies">
                <template #prev-nav>
                  <span>წინ</span>
                </template>
                <template #next-nav>
                  <span>შემდეგ</span>
                </template>
              </pagination>
            </div>
          </div>
        </div>

        <!-- End Row -->
      </div>

      <!-- Vacancy Filter Right Canvas  -->
      <div
        class="offcanvas offcanvas-end"
        ref="canvasbar"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header border-bottom">
          <h5 id="offcanvasRightLabel">ფილტრი</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div class="offcanvas-body pb-4" style="height: calc(100% - 9rem)">
          <form ref="form" class="row" style="gap: 20px 0">
            <div class="col-12">
              <label class="font-weigt-bold">პოზიცია</label>
              <input
                class="form-control"
                name="position"
                v-model="form.position"
                type="text"
                placeholder="პოზიციის დასახელება" />
            </div>
            <div class="col-12">
              <label class="font-weigt-bold">ვაკანსიის ID</label>
              <input
                class="form-control"
                name="id"
                v-model="form.id"
                type="text"
                placeholder="ვაკანსიის ID" />
            </div>
            <!-- Col -->
            <div class="col-12">
              <label class="font-weigt-bold">კომპანიის დასახელება</label>
              <input
                class="form-control"
                name="name"
                v-model="form.name"
                type="text"
                placeholder="კომპანიის დასახელება" />
            </div>
            <!-- Col -->
            <div class="col-12">
              <label class="font-weigt-bold">გადახდის სტატუსი</label>
              <v-select
                v-model="form.payment_status"
                class="lss-form-select"
                name="payment_status"
                label="text"
                :reduce="(item) => item.id"
                placeholder="გადახდის სტატუსი"
                :options="[
                  { text: 'გადახდილი', id: 'paid' },
                  { text: 'გადაუხდელი', id: 'unpaid' },
                  { text: 'უფასო', id: 'free' },
                ]"></v-select>
            </div>
            <!-- Col -->
            <div class="col-12">
              <label class="font-weigt-bold">ტარიფი</label>
              <v-select
                v-model="form.package"
                class="lss-form-select"
                name="payment_status"
                label="text"
                :reduce="(item) => item.id"
                placeholder="ტარიფი"
                :options="[
                  { text: 'სტანდარტული', id: 100 },
                  { text: 'პრემიუმი', id: 130 },
                  { text: 'სუპერ VIP', id: 250 },
                ]"></v-select>
            </div>
            <!-- Col -->
            <!-- Col -->
            <div class="col-12">
              <label class="font-weigt-bold">სივები</label>
              <v-select
                v-model="form.cv"
                class="lss-form-select"
                name="payment_status"
                label="text"
                :reduce="(item) => item.id"
                placeholder="ტარიფი"
                :options="[
                  { text: 'სივის გარეშე', id: 'no_cv' },
                  { text: 'სივებით', id: 'with_cv' },
                ]"></v-select>
            </div>
            <!-- Col -->
            <div class="col-12">
              <label class="font-weigt-bold">გამოცდილება</label>
              <v-select
                v-model="form.work_experience"
                class="lss-form-select"
                name="payment_status"
                label="text"
                placeholder="გამოცდილება"
                :reduce="(item) => item.id"
                :options="WorkExperienceData"></v-select>
            </div>
            <!-- Col -->
            <div class="col-12">
              <label class="font-weigt-bold">განთავსების თარიღი</label>
              <div class="row">
                <div class="col-6">
                  <date-picker
                    class="form-control"
                    name="start_at"
                    v-model="form.start_at"
                    valueType="format"
                    placeholder="-დან"></date-picker>
                </div>
                <div class="col-6">
                  <date-picker
                    class="form-control"
                    name="end_at"
                    v-model="form.end_at"
                    valueType="format"
                    placeholder="-მდე"></date-picker>
                </div>
              </div>
            </div>
            <!-- Col -->
            <div class="col-12">
              <label class="font-weigt-bold">ს/კ</label>
              <input
                class="form-control"
                name="position"
                v-model="form.taxcode"
                type="text"
                placeholder="საინდეთიფიკაციო კოდი" />
            </div>
            <!-- Col -->
            <div class="col-12">
              <label class="font-weigt-bold">მობილურის ნომრით</label>
              <input
                class="form-control"
                name="mobile"
                v-model="form.mobile"
                type="text"
                placeholder="მობილურის ნომრით" />
            </div>
            <!-- Col -->
            <div class="col-12">
              <label class="font-weigt-bold">ადგილმდებარეობა</label>
              <v-select
                v-model="form.region"
                class="lss-form-select"
                name="payment_status"
                label="text"
                placeholder="ადგილმდებარეობა"
                :reduce="(item) => item.text"
                :options="LocationData"></v-select>
            </div>

            <div class="col-12">
              <label class="font-weigt-bold">ანაზღაურება</label>
              <div class="row">
                <div class="col-6">
                  <input
                    class="form-control"
                    name="min_budget"
                    type="number"
                    v-model="form.min_budget"
                    placeholder="-მინ" />
                </div>
                <div class="col-6">
                  <input
                    class="form-control"
                    name="max_budget"
                    type="number"
                    v-model="form.max_budget"
                    placeholder="-მაქს" />
                </div>
              </div>
            </div>
            <!-- End Col -->
          </form>
        </div>
        <div
          class="offcanvas-body d-flex gap-1 position-absolute bottom-0 w-100 bg-white border-top">
          <button class="btn btn-primary w-100" @click="LoadVacancies()">
            გაფილტრე
          </button>
          <button
            class="btn btn-light w-100"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            @click="ClearFilter()">
            გასუფთავება
          </button>
        </div>
      </div>
    </section>

    <!-- Vacancy Copy Modal -->
    <div
      class="modal fade"
      :id="`exampleModal_` + item.id"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-for="item in LoadVacancy.data.data">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              ვაკანსიის დაკოპირება
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="border rounded p-3" :id="`copyVacancy_` + item.id">
              <li>
                <p>
                  თუ მოიწონებ, დააკომენტარებ ან გააზიარებ ამ ვაკანსიას, ეს
                  ნიშნავს, რომ მეტი ადამიანი ნახავს ამ პოსტს. შესაბამისად, მეტ
                  ადამიანს დაეხმარები #დასაქმება-ში ❤️
                </p>
              </li>
              <li>
                <span class="font-weigt-bold">📢 #ვაკანსია: </span>
                {{ item.position }}
              </li>
              <li>
                <span class="font-weigt-bold"
                  >🚀 საქმიანობა, რომლის გაკეთებაც უნდა იცოდე კარგად:</span
                >
                {{ item.sphere }}
              </li>
              <br />
              <li v-show="item.brandname">
                <span class="font-weigt-bold">🟡️ კომპანია:</span>
                {{ item.brandname }}
              </li>
              <li>
                <span class="font-weigt-bold">🟡 სამუშაო გრაფიკი:</span>
                {{ item.work_schedule && item.work_schedule.text }}
              </li>
              <li>
                <span class="font-weigt-bold">🟡 გამოცდილება:</span>
                {{ item.work_experience }}
              </li>
              <li>
                <span class="font-weigt-bold">🟡 ადგილმდებარეობა:</span>
                {{ item.location }}
              </li>
              <br />
              <li>
                <span class="font-weigt-bold">🟣 ანაზღაურების ტიპი:</span>
                {{ item.amount_type_value }}
              </li>
              <li v-show="item.fixed_amount">
                <span class="font-weigt-bold">🟣️ ფიქსირებული:</span>
                {{ item.fixed_amount }} {{ item.currency }}
              </li>
              <li v-if="item.amount_type == '1'">
                <span class="font-weigt-bold"
                  >🟣 ჯამური საშუალო #შემოსავალი:</span
                >
                <span v-if="item.amount_type == '1'">{{
                  item.avarage_min_bonus
                }}</span>
                {{ item.currency }} -
                <span v-if="item.amount_type == '1'">{{
                  item.avarage_max_bonus
                }}</span
                >{{ item.currency }}
              </li>
              <li v-if="item.amount_type == '2'">
                <span class="font-weigt-bold"
                  >🟣️ ჯამური საშუალო #შემოსავალი:</span
                >
                <span v-if="item.amount_type == '2'">{{
                  item.min_amount
                }}</span>
                {{ item.currency }} -
                <span v-if="item.amount_type == '2'">{{
                  item.max_amount
                }}</span>
                {{ item.currency }}
              </li>
              <br />
              <li>
                <p>
                  დეტალების ნახვა და CV - ის გაგზავნა შესაძლებელია კომენტარში
                  მითითებულ მისამართზე.
                </p>
              </li>
              <li>
                <p>
                  დეტალური ინფორმაციის ნახვა და CV -ის გაგზავნა შესაძლებელია აქ:
                  <a
                    :href="'https://v.dk.ge/VacancyDetails/' + item.id"
                    target="_blank"
                    >https://v.dk.ge/VacancyDetails/{{ item.id }}</a
                  >
                </p>
              </li>
            </ul>
            <div v-if="copyButton" class="text-success text-center">
              ტექსტი დაკოპირებულია
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              დახურვა
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="copy(`copyVacancy_` + item.id)">
              კოპირება
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Vacancy Turn Off  -->
    <div
      class="modal fade"
      :id="'turnOff_' + item.id"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      v-for="item in LoadVacancy.data.data">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              ვაკანსიის გათიშვა ({{ item.id }})
            </h5>
          </div>
          <div class="modal-body">ნამდვილად გსურთ ვაკანსიის გათიშვა?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              გაუქმება
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="VacancyStatusChange(item.id, 'unpublished')">
              გათიშვა
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MyVacancy",
  data() {
    return {
      showTopMenu: true,
      LoadVacancy: {
        data: {},
      },
      form: {
        position: this.$route.query.position,
        name: this.$route.query.name,
        id: this.$route.query.id,
        region: this.$route.query.region,
        min_budget: this.$route.query.min_budget,
        max_budget: this.$route.query.max_budget,
        start_at: this.$route.query.start_at,
        end_at: this.$route.query.end_at,
        payment_status: this.$route.query.payment_status,
        package: this.$route.query.package,
        cv: this.$route.query.cv,
        work_experience: this.$route.query.work_experience,
        taxcode: this.$route.query.taxcode,
        mobile: this.$route.query.mobile,
      },
      vacancyStatus: "",
      isLoading: false,
      fullPage: true,
      isActive: true,
      param: this.$route.params.param,
      copyButton: false,
      searchWord: "",
      PositionData: [],
      LocationData: [],
      page: this.$route.query.page,
      cv_count: [],
      LocationData: [],
      WorkExperienceData: [],
    };
  },
  components: {
    Header,
    Loading,
  },
  methods: {
    /* ...mapActions({ addPermission: "setCurrentPermission" }),*/
    /*
        LoadVacancies(page=1){
          this.isLoading = true;
            const token = JSON.parse(localStorage.getItem('user')).access_token;
            axios.get(process.env.VUE_APP_BACKEND_URL+'/auth/vacancy/LoadVacancies/'+this.$route.params.param,{
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
                .then(response => {
                  this.LoadVacancy=response.data;
                  this.isLoading = false;
                });
          },
    */

    statusButtonClass(status) {
      if (status === "published") {
        return "btn-success";
      } else if (status === "approved") {
        return "btn-success";
      } else if (status === "pendding") {
        return "btn-warning";
      } else if (status === "unpublished") {
        return "btn-danger";
      } else {
        return "btn-dark";
      }
    },

    PaymentstatusButtonClass(status) {
      if (status === "უფასო") {
        return "btn-danger";
      } else if (status === "გადახდილია") {
        return "btn-success";
      } else if (status === "გადაუხდელია") {
        return "btn-danger";
      }
    },

    changeVacancyStatus(id, status) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      const form = {
        status: status,
      };

      axios
        .put(
          process.env.VUE_APP_BACKEND_URL +
            "/auth/vacancy/update_vacancy_status/" +
            id,
          { status: status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(async (res) => {
          await this.$router.push("/MyVacancy/" + status);
          setTimeout(() => this.LoadVacancies(), 1000);
          this.vacancyStatus = this.$route.params.param;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },

    changeVacancyPaymentStatus(id, status) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      const form = {
        status: status,
      };

      axios
        .put(
          process.env.VUE_APP_BACKEND_URL +
            "/auth/vacancy/update_payment_status/" +
            id,
          { payment_status: status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(async (res) => {
          // await this.$router.push('/MyVacancy/' + status);
          setTimeout(() => this.LoadVacancies(), 1000);
          // this.vacancyStatus = this.$route.params.param;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },

    LoadLocation() {
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/public/LoadLocations")
        .then((response) => {
          this.LocationData = response.data;
        });
    },
    loadPosition() {
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/public/LoadPosition")
        .then((response) => {
          this.PositionData = response.data;
        });
    },
    LoadVacancies(page = this.page) {
      this.$router.push({
        path: "/MyVacancy/" + this.$route.params.param,
        query: {
          position: this.form.position,
          page: page,
          name: this.form.name,
          id: this.form.id,
          region: this.form.region,
          min_budget: this.form.min_budget,
          max_budget: this.form.max_budget,
          start_at: this.form.start_at,
          end_at: this.form.end_at,
          payment_status: this.form.payment_status,
          package: this.form.package,
          cv: this.form.cv,
          work_experience: this.form.work_experience,
          taxcode: this.form.taxcode,
          mobile: this.form.mobile,
        },
      });

      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      axios
        .get(
          process.env.VUE_APP_BACKEND_URL +
            "/auth/vacancy/LoadVacancies/" +
            this.$route.params.param +
            "?page=" +
            page,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              position: this.$route.query.position,
              name: this.$route.query.name,
              id: this.$route.query.id,
              region: this.$route.query.region,
              min_budget: this.$route.query.min_budget,
              max_budget: this.$route.query.max_budget,
              start_at: this.$route.query.start_at,
              end_at: this.$route.query.end_at,
              payment_status: this.$route.query.payment_status,
              package: this.$route.query.package,
              cv: this.$route.query.cv,
              work_experience: this.$route.query.work_experience,
              taxcode: this.$route.query.taxcode,
              mobile: this.$route.query.mobile,
            },
          },
        )
        .then((response) => {
          // this.$router.replace({
          //   path: '/MyVacancy/' + this.$route.params.param,
          //   query: {
          //     page: page
          //   }
          // })
          window.scroll(0, 0);
          this.LoadVacancy = response.data;
          this.isLoading = false;
        });
    },
    // filter: function () {
    //   // this.$router.push({
    //   //   path: '/MyVacancy/' + this.$route.params.param,
    //   //   query: {
    //   //     page: page
    //   //   }
    //   // })

    //   this.$refs.form.submit();
    // },
    ClearFilter() {
      this.$router.push(this.param);
      this.form.name = "";
      this.form.id = "";
      this.form.position = "";
      this.form.region = "";
      this.form.min_budget = "";
      this.form.max_budget = "";
      this.form.start_at = "";
      this.form.end_at = "";
      this.form.payment_status = "";

      this.$route.query.name = "";
      this.$route.query.id = "";
      this.$route.query.position = "";
      this.$route.query.region = "";
      this.$route.query.min_budget = "";
      this.$route.query.max_budget = "";
      this.$route.query.start_at = "";
      this.$route.query.end_at = "";
      this.$route.query.payment_status = "";
      this.LoadVacancies();
    },

    LoadCandidates(id) {
      const route = this.$router.resolve({
        name: "CandidatsDashboard",
        params: { id: id },
      });
      window.open(route.href, "_blank");
    },
    VacancyStatusChange(id, status) {
      this.isLoading = true;
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      axios
        .post(
          process.env.VUE_APP_BACKEND_URL +
            "/auth/vacancy/vacancy_status_change/" +
            id,
          {
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          this.LoadVacancies();
          this.isLoading = false;
        });
    },
    uploadLogoSuccess: function (file, response) {
      this.form.logo = response.success;
    },
    copy(id) {
      var r = document.createRange();
      r.selectNode(document.getElementById(id));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      this.copyButton = true;
      setTimeout(() => (this.copyButton = false), 3000);
    },

    cv_count_in_the_month() {
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/auth/vacancy/CountCV", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.cv_count = response.data;
        });
    },

    local_page() {
      localStorage.setItem("status", JSON.stringify(this.$route.params.param));
      if (
        this.$route.query.page != undefined ||
        this.$route.query.page != null
      ) {
        localStorage.setItem("page", JSON.stringify(this.$route.query.page));
      }
    },

    LoadLocation() {
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/public/LoadLocations")
        .then((response) => {
          this.LocationData = response.data;
        });
    },

    Work_ExperienceData() {
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/auth/experience/LoadData")
        .then((response) => {
          this.WorkExperienceData = response.data;
        });
    },
  },
  mounted() {
    /*  this.addPermission();*/

    // experience options
    this.Work_ExperienceData();
    this.LoadLocation();

    this.vacancyStatus = this.$route.params.param;
    this.LoadVacancies();
    this.cv_count_in_the_month();
    this.LoadLocation();
    this.loadPosition();
  },
  computed: {
    ...mapGetters({ permission: "getCurrentPermission" }),
    // joke() {
    // return this.getCurrentJoke;
    // }
    // filter() {
    //   return this.LoadVacancy.data.data.filter(item => {
    //     return item.detail_name.includes(this.searchWord)
    //   })
    // }
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  height: 400px;
  overflow: auto;
  overflow-x: hidden;
}

ul li {
  margin-bottom: 10px;
}

.badge {
  height: 24px;
}

.card-footer:last-child {
  border-radius: 0 0 0.6875rem 0.6875rem !important;
}

.pagination-container {
  display: block;
  overflow: auto;
}

.pagination-container ul.pagination {
  overflow-x: auto !important;
}

.pagination {
  height: unset !important;
  padding-top: 3px;
  padding-bottom: 10px;
}

.avatar {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
}

.avatar .avatar-initial {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #383b55;
  font-size: 0.9375rem;
}
</style>
