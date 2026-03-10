<template>
  <div>
    <Header />
    <section
      class="main vacancy"
      :class="
        this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'
      ">
      <div class="container-fluid p-4">
        <!-- Row -->
        <div class="row">
          <!-- Col -->
          <div class="col-12 mb-4">
            <h1 class="page-title">ვაკანსიის დამატება</h1>
          </div>
          <!-- End Col -->

          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              v-if="permissions.vacancy_permission == 'enabled'"
              @submit.prevent="handleSubmit(submitForm)"
              class="rowpt-70">
              <!-- Col -->
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <form class="row">
                      <!-- Col -->

                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider
                          name="Location"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold"
                            >ადგილმდებარეობა
                          </label>
                          <v-select
                            v-model="form.location"
                            class="lss-form-select"
                            placeholder="აირჩიეთ ქალაქი"
                            label="text"
                            :options="LocationData"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>

                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider
                          name="Work Schedule"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold">სამუშაო გრაფიკი</label>
                          <!--                      <v-select v-model="form.work_schedule" class="lss-form-select" placeholder="სამუშაო გამოცდილება"  :options="-->
                          <!--                     [{ label: 'დისტანციური', id: 'remote' },-->
                          <!--                      { label: 'ჰიბრიდული', id: 'hibrid' },-->
                          <!--                     { label: 'სრული განაკვეთი', id: 'full' },-->
                          <!--                     { label: 'ნახევარი განაკვეთი', id: 'half' }]"></v-select>-->

                          <v-select
                            v-model="form.work_schedule"
                            class="lss-form-select"
                            placeholder="აირჩიე გრაფიკი"
                            label="text"
                            :options="WorkScheduleData"></v-select>

                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider
                          name="Work Schedule"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold">სამუშაო ტიპი</label>
                          <v-select
                            v-model="form.WorkTypeDetail"
                            class="lss-form-select"
                            placeholder="აირჩიე ტიპი"
                            label="text"
                            :options="WorkTypeData"></v-select>

                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>
                      <!-- End Col -->

                      <div class="form-group col-12">
                        <div class="card-header ps-0">
                          <div class="font-weigt-bold">მახასიათებლები</div>
                        </div>
                      </div>

                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider
                          name="Position"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold"
                            >პოზიციის დასახელება</label
                          >
                          <v-select
                            v-model="form.position"
                            class="lss-form-select"
                            placeholder="აირჩიეთ პოზიცია"
                            label="text"
                            :options="PositionData"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider
                          name="Categories"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold">
                            საქმიანობა
                            <i
                              class="fa fa-info-circle text-primary"
                              style="cursor: pointer"
                              data-bs-toggle="modal"
                              data-bs-target="#sphere"></i>
                            <span
                              class="text-secondary"
                              style="font-size: 12px; font-weight: 500"
                              >( რომლის გაკეთებაც კარგად უნდა იცოდეს კანდიდატმა
                              )</span
                            >
                          </label>
                          <v-select
                            v-if="sphere == true"
                            v-model="form.sphere"
                            class="lss-form-select"
                            placeholder="აირჩიეთ კატეგორია"
                            label="text"
                            :options="SphereData"
                            data-bs-toggle="modal"
                            data-bs-target="#sphere"></v-select>
                          <v-select
                            v-if="sphere == false"
                            v-model="form.sphere"
                            class="lss-form-select"
                            placeholder="აირჩიეთ კატეგორია"
                            label="text"
                            :options="SphereData"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider
                          name="Industry"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold"
                            >სამუშაო კატეგორიები</label
                          >
                          <v-select
                            class="lss-form-select"
                            placeholder="სამუშაო კატეგორიები"
                            label="text"
                            v-model="form.work_category"
                            :options="WorkCategoriesData"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                  <div class="form-group col-12 col-md-6 d-none">-->
                      <!--                    <ValidationProvider name="Industry" rules="required" v-slot="{ errors }">-->
                      <!--                    <label class="font-weigt-bold">ინდუსტრია</label>-->
                      <!--                    <input type="text" class="form-control" v-model="form.industry" style="height: 53px;" placeholder="ჩაწერეთ ინდუსტრია">-->
                      <!--                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>-->

                      <!--                    </ValidationProvider>-->

                      <!--                  </div>-->
                      <!-- End Col -->

                      <!-- Col -->

                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider
                          name="Experience"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold"
                            >გამოცდილება
                            <i
                              class="fa fa-info-circle text-primary"
                              style="cursor: pointer"
                              data-bs-toggle="modal"
                              data-bs-target="#workExperience"></i
                          ></label>
                          <v-select
                            v-if="workExperience == true"
                            class="lss-form-select"
                            placeholder="იგივე პოზიციაზე მუშაობის გამოცდილება"
                            label="text"
                            v-model="form.work_experience"
                            :options="WorkExperienceData"
                            data-bs-toggle="modal"
                            data-bs-target="#workExperience"></v-select>
                          <v-select
                            v-if="workExperience == false"
                            class="lss-form-select"
                            placeholder="იგივე პოზიციაზე მუშაობის გამოცდილება"
                            label="text"
                            v-model="form.work_experience"
                            :options="WorkExperienceData"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>

                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider
                          name="Company"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold">კომპანია</label>
                          <v-select
                            v-model="form.detail_id"
                            class="lss-form-select"
                            placeholder="აირჩიეთ კომპანია"
                            label="text"
                            :options="DetailData"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>
                      <!-- End Col -->

                      <div class="form-group col-12 col-md-6">
                        <ValidationProvider
                          name="Remuneration"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold">ანაზღაურება</label>
                          <v-select
                            v-model="form.currency"
                            class="lss-form-select"
                            placeholder="აირჩიეთ ვალუტა"
                            label="text"
                            :options="CurrencyData"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>

                      <!-- Col -->
                      <div
                        class="form-group col-12 col-md-9"
                        v-if="salary != '1' && salary != '2' && salary != '3'">
                        <ValidationProvider
                          name="Vacancy Fixed Variable max amount"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold d-block"
                            >ანაზღაურების ტიპები
                            <i
                              class="fa fa-info-circle text-primary"
                              style="cursor: pointer"
                              data-bs-toggle="modal"
                              data-bs-target="#salary"></i
                          ></label>
                          <div
                            class="row"
                            role="group"
                            aria-label="Basic radio toggle button group">
                            <div class="col-12 col-md-4">
                              <input
                                type="radio"
                                class="btn-check show"
                                name="salary"
                                id="salary1"
                                autocomplete="off"
                                @click="salaryAmount('1')"
                                :class="{ show: salary == '1' }"
                                data-bs-toggle="modal"
                                data-bs-target="#salary" />
                              <label
                                class="btn btn-outline-primary w-100"
                                for="salary1"
                                >ფიქსირებული + ბონუსი</label
                              >
                            </div>

                            <div class="col-12 col-md-4">
                              <input
                                type="radio"
                                class="btn-check"
                                name="salary"
                                id="salary2"
                                autocomplete="off"
                                @click="salaryAmount('2')"
                                :class="{ show: salary == '2' }"
                                data-bs-toggle="modal"
                                data-bs-target="#salary" />
                              <label
                                class="btn btn-outline-primary w-100"
                                for="salary2"
                                >გამომუშავებით</label
                              >
                            </div>

                            <div class="col-12 col-md-4">
                              <input
                                type="radio"
                                class="btn-check"
                                name="salary"
                                id="salary3"
                                autocomplete="off"
                                @click="salaryAmount('3')"
                                :class="{ show: salary == '3' }"
                                data-bs-toggle="modal"
                                data-bs-target="#salary" />
                              <label
                                class="btn btn-outline-primary w-100"
                                for="salary3"
                                >მხოლოდ ფიქსირებული</label
                              >
                            </div>
                          </div>

                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი მოსანიშნი</span
                          >
                        </ValidationProvider>
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div
                        class="form-group col-12 col-md-9"
                        v-if="salary == '1' || salary == '2' || salary == '3'">
                        <label class="font-weigt-bold d-block"
                          >ანაზღაურების ტიპები
                          <i
                            class="fa fa-info-circle text-primary"
                            style="cursor: pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#salary"></i
                        ></label>
                        <div
                          class="row"
                          role="group"
                          aria-label="Basic radio toggle button group">
                          <div class="col-12 col-md-4">
                            <input
                              :checked="salary == '1'"
                              type="radio"
                              class="btn-check show"
                              name="salary"
                              id="salary1"
                              autocomplete="off"
                              @click="salaryAmount('1')"
                              :class="{ show: salary == '1' }" />
                            <label
                              class="btn btn-outline-primary w-100"
                              for="salary1"
                              >ფიქსირებული + ბონუსი</label
                            >
                          </div>

                          <div class="col-12 col-md-4">
                            <input
                              :checked="salary == '2'"
                              type="radio"
                              class="btn-check"
                              name="salary"
                              id="salary2"
                              autocomplete="off"
                              @click="salaryAmount('2')"
                              :class="{ show: salary == '2' }" />
                            <label
                              class="btn btn-outline-primary w-100"
                              for="salary2"
                              >გამომუშავებით</label
                            >
                          </div>

                          <div class="col-12 col-md-4">
                            <input
                              :checked="salary == '3'"
                              type="radio"
                              class="btn-check"
                              name="salary"
                              id="salary3"
                              autocomplete="off"
                              @click="salaryAmount('3')"
                              :class="{ show: salary == '3' }" />
                            <label
                              class="btn btn-outline-primary w-100"
                              for="salary3"
                              >მხოლოდ ფიქსირებული</label
                            >
                          </div>
                        </div>
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12" v-if="salary == '1'">
                        <!-- Card -->
                        <div class="card">
                          <div class="card-header bg-light">
                            <h5 class="card-title">ფიქსირებული + ბონუსი</h5>
                          </div>
                          <div class="card-body">
                            <!-- Row -->
                            <div class="row">
                              <!-- Col -->
                              <div class="form-group col-12">
                                <ValidationProvider
                                  name="Vacancy variable fixed amout"
                                  rules="required"
                                  v-slot="{ errors }">
                                  <label
                                    class="font-weigt-bold"
                                    for="vacancy-Variable-Fixed-amount"
                                    >ფიქსირებული ხელფასი
                                    <small class="text-muted"
                                      >(ხელზე ასაღები)</small
                                    ></label
                                  >
                                  <input
                                    id="vacancy-Variable-Fixed-amount"
                                    onkeydown="return event.keyCode !== 69"
                                    v-model="form.fixed_amount"
                                    class="form-control"
                                    type="number"
                                    placeholder="ფიქსირებული ხელფასი" />
                                  <span class="text-danger" v-if="errors[0]"
                                    >აუცილებელი ველი</span
                                  >
                                </ValidationProvider>
                              </div>
                              <!-- End Col -->

                              <!-- Col -->
                              <div class="form-group col-6">
                                <ValidationProvider
                                  name="Vacancy Fixed Variable min amount"
                                  rules="required"
                                  v-slot="{ errors }">
                                  <label
                                    class="font-weigt-bold"
                                    for="vacancy-Fixed-Variable-min-amount"
                                    >მინ. საშუალო ბონუსი (გამომუშავებული თანხა)
                                    <small class="text-muted"
                                      >(ხელზე ასაღები)</small
                                    ></label
                                  >
                                  <input
                                    id="vacancy-Fixed-Variable-min-amount"
                                    onkeydown="return event.keyCode !== 69"
                                    @keyup="change_min()"
                                    v-model="form.min_bonus"
                                    class="form-control"
                                    type="number"
                                    placeholder="-დან" />
                                  <span class="text-danger" v-if="errors[0]"
                                    >აუცილებელი ველი</span
                                  >
                                </ValidationProvider>
                              </div>
                              <!-- End Col -->

                              <!-- Col -->
                              <div class="form-group col-6">
                                <ValidationProvider
                                  name="Vacancy Fixed Variable max amount"
                                  rules="required"
                                  v-slot="{ errors }">
                                  <label
                                    class="font-weigt-bold"
                                    for="vacancy-Fixed-Variable-max-amount">
                                    მაქს. საშუალო ბონუსი (გამომუშავებული თანხა)
                                    <small class="text-muted"
                                      >(ხელზე ასაღები)</small
                                    ></label
                                  >
                                  <input
                                    id="vacancy-Fixed-Variable-max-amount"
                                    onkeydown="return event.keyCode !== 69"
                                    @keyup="change_max()"
                                    v-model="form.max_bonus"
                                    class="form-control"
                                    type="number"
                                    placeholder="-მდე" />
                                  <span class="text-danger" v-if="errors[0]"
                                    >აუცილებელი ველი</span
                                  >
                                </ValidationProvider>
                              </div>
                              <!-- End Col -->

                              <!-- Col -->

                              <div class="form-group col-12 col-md-6">
                                <label class="font-weigt-bold"
                                  >საშუალოდ მინ. შემოსავალი თვეში</label
                                >
                                <input
                                  type="text"
                                  :value="minimum_amount"
                                  disabled
                                  class="form-control" />
                              </div>

                              <div class="form-group col-12 col-md-6">
                                <label class="font-weigt-bold"
                                  >საშუალოდ მაქს. შემოსავალი თვეში</label
                                >
                                <input
                                  type="text"
                                  :value="maxsimum_amount"
                                  disabled
                                  class="form-control" />
                              </div>

                              <!-- End Col -->

                              <!-- Col -->

                              <!-- End Col -->
                            </div>
                            <!-- End Row -->
                          </div>
                        </div>
                        <!-- Card -->
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12" v-if="salary == '2'">
                        <!-- Card -->
                        <div class="card">
                          <div class="card-header bg-light">
                            <h5 class="card-title">გამომუშავებით</h5>
                          </div>
                          <div class="card-body">
                            <!-- Row -->
                            <div class="row">
                              <!-- Col -->
                              <div class="form-group col-6">
                                <ValidationProvider
                                  name="Vacancy Variable min amount"
                                  rules="required"
                                  v-slot="{ errors }">
                                  <label
                                    class="font-weigt-bold"
                                    for="vacancy-Variable-min-amount"
                                    >მინ. საშუალო თანხა
                                    <small class="text-muted"
                                      >(ხელზე ასაღები)</small
                                    ></label
                                  >
                                  <input
                                    id="vacancy-Variable-min-amount"
                                    v-model="form.min_amount"
                                    onkeydown="return event.keyCode !== 69"
                                    class="form-control"
                                    type="number"
                                    placeholder="-დან" />
                                  <span class="text-danger" v-if="errors[0]"
                                    >აუცილებელი ველი</span
                                  >
                                </ValidationProvider>
                              </div>
                              <!-- End Col -->

                              <!-- Col -->
                              <div class="form-group col-6">
                                <ValidationProvider
                                  name="Vacancy Variable max amount"
                                  rules="required"
                                  v-slot="{ errors }">
                                  <label
                                    class="font-weigt-bold"
                                    for="vacancy-Variable-max-amount"
                                    >მაქს. საშუალო თანხა
                                    <small class="text-muted"
                                      >(ხელზე ასაღები)</small
                                    ></label
                                  >
                                  <input
                                    id="vacancy-Variable-max-amount"
                                    v-model="form.max_amount"
                                    onkeydown="return event.keyCode !== 69"
                                    class="form-control"
                                    type="number"
                                    placeholder="-მდე" />

                                  <span class="text-danger" v-if="errors[0]"
                                    >აუცილებელი ველი</span
                                  >
                                </ValidationProvider>
                              </div>
                              <!-- End Col -->

                              <!-- End Col -->

                              <!-- Col -->

                              <!-- End Col -->
                            </div>
                            <!-- End Row -->
                          </div>
                        </div>
                        <!-- Card -->
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12" v-if="salary == '3'">
                        <!-- Card -->
                        <div class="card">
                          <div class="card-header bg-light">
                            <h5 class="card-title">მხოლოდ ფიქსირებული</h5>
                          </div>
                          <div class="card-body">
                            <!-- Row -->
                            <div class="row">
                              <!-- Col -->
                              <div class="form-group col-12">
                                <ValidationProvider
                                  name="Vacancy Fixed amount"
                                  rules="required"
                                  v-slot="{ errors }">
                                  <label
                                    class="font-weigt-bold"
                                    for="vacancy-Fixed-amount"
                                    >ფიქსირებული თანხა
                                    <small class="text-muted"
                                      >(ხელზე ასაღები)</small
                                    ></label
                                  >
                                  <input
                                    id="vacancy-Fixed-amount"
                                    onkeydown="return event.keyCode !== 69"
                                    v-model="form.fixed_amount"
                                    class="form-control"
                                    type="number"
                                    placeholder="ფიქსირებული თანხა" />

                                  <span class="text-danger" v-if="errors[0]"
                                    >აუცილებელი ველი</span
                                  >
                                </ValidationProvider>
                              </div>
                              <!-- End Col -->
                            </div>
                            <!-- End Row -->
                          </div>
                        </div>
                        <!-- Card -->
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12">
                        <ValidationProvider
                          name="why should you work for the company?"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold"
                            >რატომ უნდა იმუშაო ჩვენს კომპანიაში?</label
                          >
                          <div
                            v-for="item in workReason"
                            :key="item.id"
                            class="form-check form-switch d-flex">
                            <input
                              class="form-check-input me-2"
                              type="checkbox"
                              :id="'workReason_' + item.value"
                              :value="item.value"
                              v-model="form.selected" />
                            <label
                              class="form-check-label"
                              :for="`workReason_` + item.value">
                              {{ item.text }}
                            </label>
                          </div>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>

                      <!-- Col -->
                      <!--                  <div class="form-group col-12">
                    <ValidationProvider name="Why Should" rules="required" v-slot="{ errors }">
                    <label class="font-weigt-bold" >რატომ უნდა იმუშაო ჩვენს კომპანიაში?</label>
                    <v-select multiple v-model="form.why_should" placeholder="აირჩიე" :options="
                    [
                        'კომპანიაში მეგობრული გარემოა',
                        'ფიქსირებული შემოსავლის ზრდის პერსპექტივა',
                        'შედეგზე მიბმული საბონუსე სისტემა',
                        'შემოსავლის ზედა ზღვარი არ არსებობს',
                        'სამუშაოდ კომფორტული ოფისი',
                        'კარიერული განვითარების შესაძლებლობა',
                        'კომპანია ფოკუსირებულია შედეგებზე და არა სამსახურში დახარჯულ დროზე',
                        'მენეჯმენტი აფასებს თავის თანამშრომლებს და აღიარებს მათ მნიშვნელობას',
                        'კომპანია იმართება ლიდერული პრინციპების საშუალებით',
                        'კომპანიაში გადაწყვეტილებები მიიღება დემოკრატიული პრინციპით',
                        'მენეჯმენტი ამოტივირებს და აძლევს უკუკავშირს გუნდის წევრებს',
                        'მენეჯმენტი აფასებს თანამშრომლების ახალ იდეებს',
                        'მენეჯმენტი ორიენტირებულია თანამშრომლების კმაყოფილებაზე',
                        'მენეჯმენტი ენდობა თანამშრომლებს და აძლევს უფლებას იმუშაონ დამოუკიდებლად'
                    ]"
                    />
                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                    </ValidationProvider>
                  </div>-->

                      <!--                  <div class="form-group col-12">
                    <ValidationProvider name="Why Should" rules="required" v-slot="{ errors }">
                    <label class="font-weigt-bold" >რატომ უნდა იმუშაო ჩვენს კომპანიაში?</label>
                    <textarea rows="5" class="form-control" v-model="form.why_should" type="text" placeholder="მაგალითად:
1. კომპანიაში მეგობრული გარემოა
2. ფიქსირებული შემოსავლის ზრდის პერსპექტივა
3. შედეგზე მიბმული საბონუსე სისტემა
4. შემოსავლის ზედა ზღვარი არ არსებობს
5. სამუშაოდ კომფორტული ოფისი
6. მენეჯმენტი უზრუნველყოფს გუნდის სწავლებას
7. კარიერული განვითარების შესაძლებლობა
8. კომპანია ფოკუსირებულია შედეგებზე და არა სამსახურში დახარჯულ დროზე
9. მენეჯმენტი აფასებს თავის თანამშრომლებს და აღიარებს მათ მნიშვნელობას
10. კომპანია იმართება ლიდერული პრინციპების საშუალებით
11. კომპანიაში გადაწყვეტილებები მიიღება დემოკრატიული პრინციპით
12. მენეჯმენტი ამოტივირებს და აძლევს უკუკავშირს გუნდის წევრებს
13. მენეჯმენტი აფასებს თანამშრომლების ახალ იდეებს
14. მენეჯმენტი ორიენტირებულია თანამშრომლების კმაყოფილებაზე
15. მენეჯმენტი ენდობა თანამშრომლებს და აძლევს უფლებას იმუშაონ დამოუკიდებლად
"></textarea>
                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                    </ValidationProvider>
                  </div>-->
                      <!-- End Col -->

                      <!-- Col -->
                      <!-- <div class="form-group col-12" :class="checkRadio == '1'">
                        <ValidationProvider name="What we do" rules="required" v-slot="{ errors }">
                          <label class="font-weigt-bold">რა უნდა გააკეთო? <i class="fa fa-info-circle text-primary"
                              style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#what_to_do"></i></label>
                          <textarea v-if="whatToDo == true" rows="5" class="form-control" v-model="form.what_to_do"
                            type="text" placeholder="ჩაწერე ტექსტი" data-bs-toggle="modal"
                            data-bs-target="#what_to_do"></textarea>
                          <textarea v-else rows="5" class="form-control" v-model="form.what_to_do" type="text"
                            placeholder="ჩაწერე ტექსტი"></textarea>

                          <span class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                        </ValidationProvider>
                      </div> -->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                  <div class="form-group col-12">
                    <ValidationProvider name="What Will you teach" rules="required" v-slot="{ errors }">
                    <label class="font-weigt-bold" >რას გასწავლით?</label>
                    <textarea rows="5" class="form-control" v-model="form.what_will_you_teach" type="text" placeholder="ჩაწერე ტექსტი"></textarea>
                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                    </ValidationProvider>
                  </div>-->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                  <div class="form-group col-12 col-md-6 d-none" v-if="form.result_to_work != 'yes' && form.result_to_work != 'no'">-->
                      <!--                    <label class="font-weigt-bold d-block">იზომება თუ არა შენი მუშაობის შედეგები? <i class="fa fa-info-circle text-primary" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#result_to_work"></i></label>-->

                      <!--                    <ValidationProvider name="What result should you achive" rules="required" v-slot="{ errors }">-->

                      <!--                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">-->

                      <!--                      <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">-->
                      <!--                      <label class="btn btn-outline-primary" for="btnradio1" @click="checkedRadio('1')" data-bs-toggle="modal" data-bs-target="#result_to_work">კი</label>-->

                      <!--                      <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">-->
                      <!--                      <label class="btn btn-outline-primary" for="btnradio2" @click="checkedRadio('2')" data-bs-toggle="modal" data-bs-target="#result_to_work">არა</label>-->

                      <!--                    </div><br>-->
                      <!--                      <span  class="text-danger" v-if="errors[0]">აუცილებელი მოსანიშნი</span>-->

                      <!--                    </ValidationProvider>-->

                      <!--                  </div>-->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                  <div class="form-group col-12 col-md-6 d-none" v-if="form.result_to_work == 'yes' || form.result_to_work == 'no'">-->

                      <!--                    <label class="font-weigt-bold d-block">იზომება თუ არა შენი მუშაობის შედეგები? <i class="fa fa-info-circle text-primary" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#result_to_work"></i></label>-->
                      <!--                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">-->

                      <!--                      <input type="radio" class="btn-check" :checked="form.result_to_work == 'yes'" name="btnradio" id="btnradio1" autocomplete="off">-->
                      <!--                      <label class="btn btn-outline-primary" for="btnradio1" @click="checkedRadio('1')">კი</label>-->

                      <!--                      <input type="radio" class="btn-check" :checked="form.result_to_work == 'no'" name="btnradio" id="btnradio2" autocomplete="off">-->
                      <!--                      <label class="btn btn-outline-primary" for="btnradio2" @click="checkedRadio('2')">არა</label>-->

                      <!--                    </div>-->

                      <!--                  </div>-->
                      <!-- End Col -->

                      <!--                  <div class="form-group col-12 d-none" v-if="form.result_to_work == 'yes'">-->
                      <!--                    <ValidationProvider name="What result should you achive" rules="required" v-slot="{ errors }">-->
                      <!--                    <label class="font-weigt-bold" >როგორ იზომება?</label>-->
                      <!--                    <textarea rows="5" class="form-control" v-if="form.result_to_work=='yes'" v-model="form.how_is_it_measured" type="text" placeholder="ჩაწერე ტექსტი"></textarea>-->
                      <!--&lt;!&ndash;                    <textarea rows="5" class="form-control" v-if="form.result_to_work=='yes'" v-model="form.what_result_should_you_achieve" type="text" placeholder="ჩაწერე ტექსტი"></textarea>&ndash;&gt;-->
                      <!--                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>-->

                      <!--                    </ValidationProvider>-->
                      <!--                  </div>-->
                      <!--                  <div class="form-group col-12 d-none" v-if="form.result_to_work == 'no'">-->
                      <!--                    <label class="font-weigt-bold" >როგორ იზომება?</label>-->
                      <!--                      <textarea rows="5" class="form-control" v-if="form.result_to_work=='no'" disabled  type="text" placeholder="შედეგი არ იზომება."> შედეგი არ იზომება. </textarea>-->
                      <!--                  </div>-->

                      <!-- Col -->
                      <div class="form-group col-12">
                        <!--                    <ValidationProvider name="What result should you achive" rules="required" v-slot="{ errors }">-->
                        <label class="font-weigt-bold"
                          >რა შედეგებს უნდა მიაღწიო</label
                        >
                        <textarea
                          rows="5"
                          class="form-control"
                          v-model="form.what_result_should_you_achieve"
                          type="text"
                          placeholder="ვრცლად"></textarea>
                        <!--                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>-->

                        <!--                    </ValidationProvider>-->
                      </div>

                      <!-- Col -->
                      <!--                  <div class="form-group col-12" v-if="form.result_to_work == 'yes'">
                    <div class="card">
                      <div class="card-header bg-light">
                        <h5 class="card-title" >როგორ იზომება?</h5>
                      </div>
                      <div class="card-body">
                        &lt;!&ndash; Row &ndash;&gt;
                        <div class="row">

                          &lt;!&ndash; Col &ndash;&gt;
                          <div class="form-group col-12">
                            <ValidationProvider name="How is it Measured" rules="required" v-slot="{ errors }">
                            <textarea rows="5" class="form-control" type="text" v-model="form.how_is_it_measured" placeholder="ჩაწერე ტექსტი"></textarea>
                              <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                            </ValidationProvider>
                          </div>
                          &lt;!&ndash; End Col &ndash;&gt;
                        </div>
                        &lt;!&ndash; End Row &ndash;&gt;
                      </div>
                    </div>
                  </div>-->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                  <div class="form-group col-12">
                    <ValidationProvider name="perspective" rules="required" v-slot="{ errors }">
                    <label class="font-weigt-bold" >რა პერსპექტივა გაქვს ჩვენს კომპანიაში?</label>
                    <textarea rows="5" class="form-control" type="text" v-model="form.perspective" placeholder="ჩაწერე ტექსტი"></textarea>
                      <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                    </ValidationProvider>
                  </div>-->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                  <div class="form-group col-12">
                    <ValidationProvider name="requirement" rules="required" v-slot="{ errors }">
                    <label class="font-weigt-bold" >რა მინიმალურ მოთხოვნებს უნდა აკმაყოფილებდე ? <span class="text-secondary" style="font-size: 13px;font-weight: 500">( იმისათვის რომ მოხდეს შენი კანდიდატურის განხილვა )</span></label>
                    <textarea rows="5" class="form-control" type="text" v-model="form.requirement" placeholder="ჩაწერე ტექსტი"></textarea>
                    <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                    </ValidationProvider>

                  </div>-->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                  <div class="form-group col-12">
                    <label class="font-weigt-bold">ვაკანსიის დასრულების ვადა</label>
                    <div class="col-12">
                      <div class="row">

                        <div class="col-12">
                          <ValidationProvider name="How is it Measured" rules="required" v-slot="{ errors }">
                          <date-picker class="form-control" v-model="form.end_at" valueType="format" placeholder="-მდე"></date-picker>
                            <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                  </div>-->
                      <!-- End Col -->

                      <!--                  <ValidationProvider class="pb-4" name="Categories!" rules="required" v-slot="{ errors }">-->
                      <div class="form-group col-12 d-flex flex-column">
                        <div
                          v-for="(item, index) in CategoriesData"
                          :key="index"
                          v-show="
                            (permission === 'custumer' && item.id !== 286) ||
                            permission === 'administrator'
                          "
                          class="btn-group"
                          role="group"
                          aria-label="Basic radio toggle button group">
                          <div class="form-check form-switch d-flex">
                            <input
                              class="form-check-input me-2"
                              type="checkbox"
                              :value="item.id"
                              v-model="form.selected_category"
                              :id="item.id" />
                            <label class="form-check-label" :for="item.id">
                              {{ item.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                      <!--                    <span  class="text-danger pb-5" v-if="errors[0]">აუცილებელი ველი</span>-->
                      <!--                  </ValidationProvider>-->

                      <!-- Col -->
                      <div class="form-group col-12">
                        <label class="font-weigt-bold"
                          >დამატებითი ჩასაწერი</label
                        >
                        <!-- <textarea rows="5" class="form-control" v-model="form.additional_info" type="text" placeholder="ჩაწერე ტექსტი"></textarea> -->
                        <VueEditor
                          :editorToolbar="customToolbar"
                          v-model="form.additional_info"
                          placeholder="ჩაწერე ტექსტი" />
                      </div>
                      <!-- End Col -->

                      <!-- Col -->
                      <div class="form-group col-12">
                        <ValidationProvider
                          name="package"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold">პაკეტი</label>
                          <v-select
                            v-model="form.package"
                            class="lss-form-select"
                            placeholder="აირჩიე პაკეტი"
                            :options="[
                              { label: 'სტანდარტი', id: '100' },
                              { label: 'პრემიუმი', id: '130' },
                              { label: 'სუპერ VIP 🚀', id: '250' },
                            ]"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                        <div
                          v-if="form.package.id == 100"
                          class="alert alert-danger mt-2"
                          role="alert">
                          სტანდარტი - 100₾
                          <ul>
                            <li>
                              პლატფორმაზე განთავსდება 1 თვით, კომპანიის ლოგოთი;
                            </li>
                            <li>
                              გაზიარდება სხვადასხვა სოციალურ ქსელებში (
                              Facebook, Linked In, Telegram, Viber)
                            </li>
                          </ul>
                        </div>
                        <div
                          v-if="form.package.id == 130"
                          class="alert alert-warning mt-2"
                          role="alert">
                          პრემიუმი - 130₾
                          <ul>
                            <li>განთავსდება VIP კატეგორიის ველში 1 კვირით;</li>
                            <li>
                              პლატფორმაზე განთავსდება ჯამში 1 თვით, კომპანიის
                              ლოგოთი;
                            </li>
                            <li>
                              გაზიარდება სოციალურ ქსელებში ( Facebook, Linked
                              In, Telegram, Viber)
                            </li>
                          </ul>
                        </div>
                        <div
                          v-if="form.package.id == 250"
                          class="alert alert-success mt-2"
                          role="alert">
                          სუპერ VIP - 250₾
                          <ul>
                            <li>
                              განთავსდება მთავარ გვერდზე, SUPER VIP კატეგორიის
                              ლიმიტირებულ ველში 10 დღით;
                            </li>
                            <li>
                              პლატფორმაზე განთავსდება ჯამში 1 თვით, კომპანიის
                              ლოგოთი;
                            </li>
                            <li>
                              როგორც ინდივიდუალურად, ასევე შემაჯამებელ პოსტად
                              გაზიარდება სოციალურ ქსელებში ( Facebook, Linked
                              In, Telegram, Viber);
                            </li>
                            <li>
                              უზრუნველყოფს შემოსული რეზიუმეების გაორმაგებულ
                              რაოდენობას;
                            </li>
                          </ul>
                        </div>
                      </div>
                      <!-- End Col -->
                    </form>
                  </div>
                  <div class="card-footer py-4 bg-transparent">
                    <button
                      :class="disableBtn == true ? 'd-none' : ''"
                      type="submit"
                      class="btn btn-primary">
                      ვაკანსიის დამატება +
                    </button>
                    <button
                      :class="disableBtn == false ? 'd-none' : ''"
                      class="btn btn-primary"
                      type="button"
                      disabled>
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"></span>
                      იტვირთება...
                    </button>
                  </div>
                </div>
              </div>
              <!-- End Col -->
            </form>
          </ValidationObserver>
          <div
            class="alert alert-danger text-center"
            v-if="this.permissions.vacancy_permission == 'disabled'">
            იმისთვის რომ შეძლოთ ვაკანსის განთავსება ვებ გვერდზე საჭიროა შეავსოთ
            კომპანის რეკვზიტები <a href="/Details/create">შემდეგ მისამართზე</a>
          </div>
        </div>
        <!-- End Row -->
      </div>
    </section>

    <!-- Modals -->

    <!-- Sphere Modals -->
    <div
      class="modal fade"
      id="sphere"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h5 class="modal-title" id="exampleModalLabel">საქმიანობა</h5>
              <span class="h5 text-danger"
                >( რომლის გაკეთებაც კარგად უნდა იცოდეს კანდიდატმა )</span
              >
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            თქვენი გამოცხადებული ვაკანსიისთვის რა საქმიანობის გაკეთება უნდა
            შეეძლოს კანდიდატს კარგად.
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="sphereAction">
              გასაგებია
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Work Experience Modals -->
    <div
      class="modal fade"
      id="workExperience"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">გამოცდილება</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>
              გთხოვთ აარჩიოთ რამდენად კარგად გინდათ რომ იცოდეს თქვენს მიერ ზემოთ
              აღნიშნული საქმიანობის განხორცილება კანდიდატმა. ამასთან, გთხოვთ
              გაითვალისწინოთ, რომ თქვენ კომპანიაში სამუშაოდ პროფესიონალების
              მოსაზიდად მათ მაღალი ანაზღაურება უნდა შესთავაზოთ.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="workExperienceAction">
              გასაგებია
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- salary Modals -->
    <div
      class="modal fade"
      id="salary"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">შემოსავალი</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>
              ბაზარზე კონკურენცია საკმაოდ მაღალია (ამ პლატფორმაზეც მათ შორის).
              ყველა ცდილობს მოიძიოს მაღალი დონის პროფესიონალები თავისი
              გუნდისათვის.
            </p>
            <p>
              თუ გინდათ რომ კანდიდატებმა კარგი შედეგები მოუტანონ თქვენ
              კომპანიას, მაშინ უმჯობესია განაცხადის შევსებისას მათ მაქსიმალური
              შესაძლო პირობები შესთავაზოთ
            </p>
            <p>
              ამასთან საზოგადოებისთვის მიცემული პირობის თანახმად, ჩვენს
              პლატფორმაზე ვაკანსიის გამოცხადებისას ჯამური შემოსავალი
              (ფიქსირებულს + ბონუსი) თვეში მინიმუმ 1000 ლარის
              <span class="font-weigt-bold">(ხელზე ასაღები)</span> გამომუშავების
              შესაძლებლობას უნდა აძლევდეს ადამიანს.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal">
              გასაგებია
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- What to do Modals -->
    <div
      class="modal fade"
      id="what_to_do"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">რა უნდა გააკეთო</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>
              გთხოვთ ჩამოწეროთ ის საქმეები, რაც უნდა აკეთოს პოტენციურმა
              კანდიდატმა აღნიშნულ პოზიციაზე.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="what_to_doAction">
              გასაგებია
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Result Work Modals -->
    <!--    <div class="modal fade" id="result_to_work" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
    <!--      <div class="modal-dialog">-->
    <!--        <div class="modal-content">-->
    <!--          <div class="modal-header">-->
    <!--            <h5 class="modal-title" id="exampleModalLabel">იზომება თუ არა შენი მუშაობის შედეგი</h5>-->
    <!--            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
    <!--          </div>-->
    <!--          <div class="modal-body">-->
    <!--            <p>კანდიდატისთვის ყოველთვის ის ვაკანსია არის უმჯობესი სადაც მისი საქმიანობის გაზომვა ობიექტური საზომით არის შესაძლებელი. განსაზღვრეთ რაიმე პარამეტრი, რომლის მიხედვითაც შეფასდება თქვენი თანამშრომლის მუშაობა. ჩვენი რჩევაა, ამ პარამეტრზე დააფუძნოთ საბონუსე სისტემაც.</p>-->
    <!--          </div>-->
    <!--          <div class="modal-footer">-->
    <!--            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">გასაგებია</button>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!-- End Modals -->
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor/dist/vue2-editor.core.js";
import Header from "@/components/Header.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddVacancy",
  data() {
    return {
      showTopMenu: true,
      selected: "",
      datePick: false,
      checkRadio: "",
      salary: "",
      time1: null,
      time2: null,
      time3: null,
      weekDays: [
        "ორშაბათი",
        "სამშაბათი",
        "ოთხშაბათი",
        "ხუთშაბათი",
        "პარასკევი",
        "შაბათი",
        "კვირა",
      ],
      selected_1: [],
      allSelected: false,
      indeterminate: false,
      CurrencyData: [],
      form: {
        salary: "",
        location: "",
        work_schedule: "",
        WorkTypeDetail: "",
        work_experience: "",
        time_at: "",
        time_to: "",
        sphere: "",
        position: "",
        industry: "",
        currency: "",
        amount_type: "",
        fixed_amount: "",
        min_bonus: "",
        max_bonus: "",
        margin: "",
        why_should: "",
        what_to_do: "",
        what_will_you_teach: "",
        what_result_should_you_achieve: "",
        how_is_it_measured: "",
        perspective: "",
        requirement: "",
        start_at: "",
        end_at: "",
        additional_info: "",
        detail_id: "",
        min_amount: "",
        max_amount: "",
        selected: [],
        selected_category: [],
        Categories: "",
        work_category: "",
        package: "",
      },
      disableBtn: false,
      SphereData: [],
      LocationData: [],
      PositionData: [],
      IndustryData: [],
      DetailData: [],
      WorkScheduleData: [],
      WorkTypeData: [],
      CategoriesData: [],
      WorkCategoriesData: [],
      WorkExperienceData: [],
      minimum_amount: "",
      maxsimum_amount: "",
      workReason: "",
      /* Modals Variable */
      sphere: true,
      workExperience: true,
      whatToDo: true,

      // for vue text editor
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        ["link"],
        ["clean"],
      ],
    };
  },
  components: {
    Header,
  },
  methods: {
    /* Modals Variable */
    sphereAction() {
      this.sphere = false;
    },
    workExperienceAction() {
      this.workExperience = false;
    },
    what_to_doAction() {
      this.whatToDo = false;
    },
    /* End Modals Variable */

    toggleAll(checked) {
      this.selected_1 = checked ? this.weekDays.slice() : [];
    },
    salaryAmount(index) {
      this.salary = index;
      this.form.amount_type = index;
      if (this.salary != 1) {
        this.form.fixed_amount = "";
        this.form.min_bonus = "";
        this.form.max_bonus = "";
        this.minimum_amount = "";
        this.maxsimum_amount = "";
      }
      if (this.salary != 2) {
        this.form.min_amount = "";
        this.form.max_amount = "";
      }
      if (this.salary != 3) {
        this.form.fixed_amount = "";
      }
    },
    checkedRadio(index) {
      this.checkRadio = index;
      if (index == 1) {
        this.form.result_to_work = "yes";
      } else {
        this.form.result_to_work = "no";
      }
    },
    switchSelect(event) {
      this.selected = event.target.value;
      this.datePick = !!event.target.value;
    },
    loadCurrency() {
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/public/LoadCurrency")
        .then((response) => {
          this.CurrencyData = response.data;
        });
    },

    loadSphere() {
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/public/LoadSphere")
        .then((response) => {
          this.SphereData = response.data;
        });
    },
    WorkSchedule() {
      axios
        .get(
          process.env.VUE_APP_BACKEND_URL +
            "/auth/WorkSchedule/LoadWorkSchedule",
        )
        .then((response) => {
          this.WorkScheduleData = response.data;
        });
    },
    WorkType() {
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/auth/WorkType/GetList", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.WorkTypeData = response.data.map((element) => ({
            id: element.id,
            text: element.name,
          }));
        });
    },

    Categories_data() {
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/auth/Categories/LoadRecords")
        .then((response) => {
          this.CategoriesData = response.data.data;
        });
    },
    Work_ExperienceData() {
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/auth/experience/LoadData")
        .then((response) => {
          this.WorkExperienceData = response.data;
        });
    },
    Job_Categories() {
      axios
        .get(
          process.env.VUE_APP_BACKEND_URL +
            "/auth/WorkCategories/LoadWorkCategories",
        )
        .then((response) => {
          this.WorkCategoriesData = response.data;
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

    loadIndustry() {
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/public/LoadIndustry")
        .then((response) => {
          this.IndustryData = response.data;
        });
    },
    workReasons() {
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      axios
        .get(
          process.env.VUE_APP_BACKEND_URL + "/auth/work_reason/LoadPosition",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          this.workReason = response.data;
        });
    },
    loadDetails() {
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      axios
        .get(
          process.env.VUE_APP_BACKEND_URL +
            "/auth/details/get_all_details_option",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          this.DetailData = response.data;
        });
    },
    submitForm() {
      this.isLoading = true;
      this.disableBtn = true;
      const token = JSON.parse(localStorage.getItem("user")).access_token;

      axios
        .post(
          process.env.VUE_APP_BACKEND_URL + "/auth/vacancy/add_new_vacancy",
          { data: this.form },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          this.isLoading = false;
          this.$router.push("/VacancyDashboard");
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    change_min() {
      let calculatetotal =
        Number(this.form.fixed_amount) + Number(this.form.min_bonus);
      this.minimum_amount = calculatetotal;
    },
    change_max() {
      let calculatetotal =
        Number(this.form.fixed_amount) + Number(this.form.max_bonus);
      this.maxsimum_amount = calculatetotal;
    },

    ...mapActions({ addPermission: "setCurrentPermission" }),
  },
  mounted() {
    this.LoadLocation();
    this.loadDetails();
    this.loadCurrency();
    this.loadSphere();
    this.loadPosition();
    this.loadIndustry();
    this.workReasons();
    this.WorkSchedule();
    this.WorkType();
    this.Categories_data();
    this.Job_Categories();
    this.Work_ExperienceData();
    this.showTopMenu = localStorage.getItem("showTopMenu");
  },
  computed: {
    ...mapGetters({
      permission: "getCurrentPermission",
      permissions: "getCurrentPermissions",
    }),

    // joke() {
    // return this.getCurrentJoke;
    // }
  },

  watch: {
    selected_1(newValue, oldValue) {
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === this.weekDays.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    },
  },
};
</script>

<style scoped>
.card-footer:last-child {
  border-radius: 0 0 0.6875rem 0.6875rem !important;
}
</style>
