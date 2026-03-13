<template>
  <div>
    <Header />
    <section
      class="main vacancy"
      :class="
        this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'
      ">
      <div
        class="container-fluid p-4"
        v-if="
          (form.status.id == 'published' && permission == 'administrator') ||
          (form.status.id != 'published' &&
            (permission == 'administrator' || permission == 'custumer'))
        ">
        <!-- Row -->
        <div class="row">
          <!-- Col -->
          <div class="col-12 mb-4">
            <h1 class="page-title">ვაკანსიის რედაქტირება</h1>
          </div>
          <!-- End Col -->

          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              v-if="
                permissions.vacancy_permission == 'enabled' ||
                permission == 'administrator'
              "
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
                          <label class="font-weigt-bold">ადგილმდებარეობა</label>
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
                          <!--                          <v-select v-model="form.work_schedule" class="lss-form-select" placeholder="სამუშაო გამოცდილება"  :options="-->
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
                      <!--                      <div class="form-group col-12 col-md-6 d-none">-->
                      <!--                        <ValidationProvider name="Industry" rules="required" v-slot="{ errors }">-->
                      <!--                          <label class="font-weigt-bold">ინდუსტრია</label>-->
                      <!--                          <input type="text" class="form-control" v-model="form.industry" style="height: 53px;" placeholder="ჩაწერეთ ინდუსტრია">-->
                      <!--                          <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>-->

                      <!--                        </ValidationProvider>-->

                      <!--                      </div>-->
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
                          <a
                            target="_blank"
                            :href="
                              'https://app.motivation.ge/all_company/' +
                              form.detail_id.id +
                              '/edit'
                            ">
                            <label
                              class="font-weigt-bold"
                              style="cursor: pointer"
                              >კომპანია</label
                            >
                          </a>
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
                      <div class="form-group col-12 col-md-9">
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
                              name="salary"
                              id="salary1"
                              autocomplete="off"
                              :checked="salary == '1' ? 'checked' : ''"
                              @click="salaryAmount('1')"
                              :class="
                                salary == '1' ? 'btn-check show' : 'btn-check'
                              " />
                            <label
                              class="btn btn-outline-primary w-100"
                              for="salary1"
                              >ფიქსირებული + ბონუსი</label
                            >
                          </div>

                          <div class="col-12 col-md-4">
                            <input
                              type="radio"
                              name="salary"
                              id="salary2"
                              autocomplete="off"
                              :checked="salary == '2' ? 'checked' : ''"
                              @click="salaryAmount('2')"
                              :class="
                                salary == '2' ? 'btn-check show' : 'btn-check'
                              " />
                            <label
                              class="btn btn-outline-primary w-100"
                              for="salary2"
                              >გამომუშავებით</label
                            >
                          </div>

                          <div class="col-12 col-md-4">
                            <input
                              type="radio"
                              :class="
                                salary == '3' ? 'btn-check show' : 'btn-check'
                              "
                              :checked="salary == '3' ? 'checked' : ''"
                              name="salary"
                              id="salary3"
                              autocomplete="off"
                              @click="salaryAmount('3')" />
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
                                    for="vacancy-Fixed-Variable-max-amount"
                                    >მაქს. საშუალო ბონუსი (გამომუშავებული თანხა)
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
                                    v-model="form.min_amount"
                                    id="vacancy-Variable-min-amount"
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
                                    v-model="form.max_amount"
                                    id="vacancy-Variable-max-amount"
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
                      <!-- <div class="form-group col-12" :class="checkRadio == '1'">
                        <label class="font-weigt-bold">რა უნდა გააკეთო? <i class="fa fa-info-circle  text-primary"
                            style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#what_to_do"></i></label>

                        <ValidationProvider name="What we do" rules="required" v-slot="{ errors }">
                          <textarea rows="5" class="form-control" v-model="form.what_to_do" type="text"
                            placeholder="ჩაწერე ტექსტი"></textarea>
                          <span class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                        </ValidationProvider>
                      </div> -->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                      <div class="form-group col-12">
                        <ValidationProvider name="What Will you teach" rules="required" v-slot="{ errors }">
                          <label class="font-weigt-bold" >რას გასწავლით?</label>
                          <textarea rows="5" class="form-control" v-model="form.what_will_you_teach" type="text" placeholder="ჩაწერე ტექსტი"></textarea>
                          <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                        </ValidationProvider>
                      </div>-->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                      <div class="form-group col-12 col-md-6 d-none">-->
                      <!--                        <label class="font-weigt-bold d-block">იზომება თუ არა შენი მუშაობის შედეგები? <i class="fa fa-info-circle text-primary" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#result_to_work"></i></label>-->
                      <!--                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">-->
                      <!--                          <input type="radio" class="btn-check" :checked="form.result_to_work=='yes' ? 'checked':''" name="btnradio" id="btnradio1" autocomplete="off">-->
                      <!--                          <label class="btn btn-outline-primary" for="btnradio1" @click="checkedRadio('1')">კი</label>-->

                      <!--                          <input type="radio" class="btn-check" :checked="form.result_to_work=='no' ? 'checked':''" name="btnradio" id="btnradio2" autocomplete="off">-->
                      <!--                          <label class="btn btn-outline-primary" for="btnradio2" @click="checkedRadio('2')">არა</label>-->
                      <!--                        </div>-->
                      <!--                      </div>-->
                      <!-- End Col -->

                      <!--                      <div class="form-group col-12 d-none" v-if="form.result_to_work == 'yes'">-->
                      <!--                        <ValidationProvider name="What result should you achive" rules="required" v-slot="{ errors }">-->
                      <!--                          <label class="font-weigt-bold" >როგორ იზომება?</label>-->
                      <!--                          <textarea rows="5" class="form-control" v-if="form.result_to_work=='yes'" v-model="form.how_is_it_measured" type="text" placeholder="ჩაწერე ტექსტი"></textarea>-->
                      <!--                          &lt;!&ndash;                          <textarea rows="5" class="form-control" v-if="form.result_to_work=='yes'" v-model="form.what_result_should_you_achieve" type="text" placeholder="ჩაწერე ტექსტი"></textarea>&ndash;&gt;-->
                      <!--                          <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>-->

                      <!--                        </ValidationProvider>-->
                      <!--                      </div>-->
                      <!--                      <div class="form-group col-12 d-none" v-if="form.result_to_work=='no'">-->
                      <!--                        <label class="font-weigt-bold" >როგორ იზომება?</label>-->
                      <!--                        <textarea class="form-control" v-if="form.result_to_work=='no'" disabled  type="text" placeholder="შედეგი არ იზომება."> შედეგი არ იზომება. </textarea>-->
                      <!--                      </div>-->

                      <!-- Col -->
                      <div class="form-group col-12">
                        <!--                        <ValidationProvider name="What result should you achive" rules="required" v-slot="{ errors }">-->
                        <label class="font-weigt-bold"
                          >რა შედეგებს უნდა მიაღწიო</label
                        >
                        <textarea
                          rows="5"
                          class="form-control"
                          v-model="form.what_result_should_you_achieve"
                          type="text"
                          placeholder="ვრცლად"></textarea>
                        <!--                          <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>-->

                        <!--                        </ValidationProvider>-->
                      </div>
                      <!-- Col -->
                      <!--                      <div class="form-group col-12" v-if="form.result_to_work == 'yes'">
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
                      <!--                      <div class="form-group col-12">
                        <ValidationProvider name="perspective" rules="required" v-slot="{ errors }">
                          <label class="font-weigt-bold" >რა პერსპექტივა გაქვს ჩვენს კომპანიაში?</label>
                          <textarea rows="5" class="form-control" type="text" v-model="form.perspective" placeholder="ჩაწერე ტექსტი"></textarea>
                          <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>

                        </ValidationProvider>
                      </div>-->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                      <div class="form-group col-12">
                        <ValidationProvider name="requirement" rules="required" v-slot="{ errors }">
                          <label class="font-weigt-bold" >რა მინიმალურ მოთხოვნებს უნდა აკმაყოფილებდე ? <span class="text-secondary" style="font-size: 13px;font-weight: 500">( იმისათვის რომ მოხდეს შენი კანდიდატურის განხილვა )</span></label>
                          <textarea rows="5" class="form-control" type="text" v-model="form.requirement" placeholder="ჩაწერე ტექსტი"></textarea>
                          <span  class="text-danger" v-if="errors[0]">აუცილებელი ველი</span>
                        </ValidationProvider>

                      </div>-->
                      <!-- End Col -->

                      <!-- Col -->
                      <!--                      <div class="form-group col-12">
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

                      <!--                      <ValidationProvider class="pb-4" name="Categories!" rules="required" v-slot="{ errors }">-->
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
                      <!--                        <span  class="text-danger pb-5" v-if="errors[0]">აუცილებელი ველი</span>-->
                      <!--                      </ValidationProvider>-->

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
                        <!-- <div v-if="form.package.id == 60" class="alert alert-danger mt-2" role="alert">
                          60 ლარი - პლატფორმაზე განთავსდება ლოგოთი - 1 თვით.
                        </div> -->

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

                      <!-- Col -->
                      <div
                        class="form-group col-12"
                        v-if="permission == 'administrator'">
                        <ValidationProvider
                          name="status"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold">სტატუსი</label>
                          <v-select
                            v-model="form.status"
                            class="lss-form-select"
                            placeholder="სტატუსი"
                            :options="[
                              { label: 'გამოქვეყნებული', id: 'published' },
                              { label: 'დადასტურებული', id: 'approved' },
                              { label: 'განსახილველი', id: 'pendding' },
                              { label: 'გაუქმებული', id: 'unpublished' },
                            ]"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>
                      <div
                        class="form-group col-12"
                        v-if="permission == 'administrator'">
                        <ValidationProvider
                          name="status"
                          rules="required"
                          v-slot="{ errors }">
                          <label class="font-weigt-bold"
                            >გადახდის სტატუსი</label
                          >
                          <v-select
                            v-model="form.payment_status"
                            class="lss-form-select"
                            label="text"
                            placeholder="გადახდის სტატუსი"
                            :options="[
                              { text: 'გადახდილი', id: 'paid' },
                              { text: 'გადაუხდელი', id: 'unpaid' },
                              { text: 'უფასო', id: 'free' },
                            ]"></v-select>
                          <span class="text-danger" v-if="errors[0]"
                            >აუცილებელი ველი</span
                          >
                        </ValidationProvider>
                      </div>

                      <!-- End Col -->
                      <div
                        class="form-group col-12"
                        v-if="permission == 'administrator'">
                        <label class="font-weigt-bold me-1 d-block"
                          >თარიღი</label
                        >
                        <input
                          type="date"
                          v-model="form.created_at"
                          class="form-control" />
                      </div>
                      <!-- End Col -->

                      <!-- End Col -->
                      <div
                        class="form-group col-12"
                        v-if="permission == 'administrator'">
                        <label class="font-weigt-bold me-1">კომენტარი</label>
                        <span
                          v-if="form.author != ''"
                          class="badge rounded-pill bg-primary"
                          v-b-tooltip.hover
                          title="კომენტარის ავტორი"
                          >{{ form.author }}</span
                        >
                        <textarea
                          rows="5"
                          class="form-control"
                          v-model="form.comment"
                          type="text"
                          placeholder="დატოვე კომენტარი"></textarea>
                      </div>
                      <!-- End Col -->

                      <!-- Super Vip Col -->
                      <div class="col-12" v-if="permission == 'administrator'">
                        <label class="font-weigt-bold d-block"
                          >მონიშნე ვაკანსიის Super Vip სტატუსი</label
                        >
                        <!-- <v-select v-model="form.super_vip_status" class="lss-form-select" placeholder="აირჩიე ვაკანსიის Super Vip სტატუსი"  :options="
                        [{ label: 'ჩართული', id: 'active' },
                        { label: 'გამორთული', id: 'deactive' }]"></v-select> -->

                        <input
                          type="radio"
                          class="btn-check"
                          name="super-vip"
                          id="success-outlined"
                          autocomplete="off"
                          v-model="form.super_vip_status.id"
                          value="active" />
                        <label
                          class="btn btn-outline-success me-1"
                          for="success-outlined"
                          >ჩართული</label
                        >

                        <input
                          type="radio"
                          class="btn-check"
                          name="super-vip"
                          id="danger-outlined"
                          autocomplete="off"
                          v-model="form.super_vip_status.id"
                          value="deactive" />
                        <label
                          class="btn btn-outline-danger"
                          for="danger-outlined"
                          >გამორთული</label
                        >
                      </div>
                      <!-- End Super Vip Col -->

                      <!-- Super Vip Col -->
                      <div
                        class="col-12 mt-3"
                        v-if="permission == 'administrator'">
                        <label class="font-weigt-bold d-block"
                          >მონიშნე ვაკანსიის Vip სტატუსი</label
                        >

                        <input
                          type="radio"
                          class="btn-check"
                          name="vip-status"
                          id="vip-success-outlined"
                          autocomplete="off"
                          v-model="form.vip_status.id"
                          value="active" />
                        <label
                          class="btn btn-outline-success me-1"
                          for="vip-success-outlined"
                          >ჩართული</label
                        >

                        <input
                          type="radio"
                          class="btn-check"
                          name="vip-status"
                          id="vip-danger-outlined"
                          autocomplete="off"
                          v-model="form.vip_status.id"
                          value="deactive" />
                        <label
                          class="btn btn-outline-danger"
                          for="vip-danger-outlined"
                          >გამორთული</label
                        >
                      </div>
                      <!-- End Super Vip Col -->
                    </form>
                  </div>
                  <div class="card-footer py-4 bg-transparent">
                    <button
                      :class="disableBtn == true ? 'd-none' : ''"
                      type="submit"
                      class="btn btn-primary">
                      ვაკანსიის რედაქტირება +
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
            v-if="
              this.permissions.vacancy_permission == 'disabled' &&
              permission != 'administrator'
            ">
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
              data-bs-dismiss="modal">
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
              data-bs-dismiss="modal">
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
              data-bs-dismiss="modal">
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
import Header from "@/components/Header.vue";
import Store from "@/store/index.js";
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
        comment: "",
        selected: "",
        WorkSchedule: "",
        Categories: "",
        work_category: "",
        payment_status: "",
        package: "",

        super_vip_status: "",
        vip_status: "",
      },
      disableBtn: false,
      SphereData: [],
      LocationData: [],
      PositionData: [],
      IndustryData: [],
      DetailData: [],
      WorkScheduleData: [],
      CategoriesData: [],
      WorkCategoriesData: [],
      WorkExperienceData: [],
      minimum_amount: "",
      maxsimum_amount: "",
      workReason: "",

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
        .put(
          process.env.VUE_APP_BACKEND_URL +
            "/auth/vacancy/update_vacancy/" +
            this.$route.params.id,
          { data: this.form },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          this.isLoading = false;
          const status = JSON.parse(localStorage.getItem("status"));
          const page = JSON.parse(localStorage.getItem("page"));

          if (page && status) {
            this.$router.push(`/MyVacancy/${status}?page=${page}`);
          } else {
            this.$router.push("/MyVacancy/" + status);
          }
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

    LoadVacancyByid() {
      const token = JSON.parse(localStorage.getItem("user")).access_token;
      axios
        .get(
          "https://recruting.dkcapital.ge/api/auth/vacancy/get_detail_by_id/" +
            this.$route.params.id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          this.form = response.data;
          this.salary = response.data.amount_type;
          this.minimum_amount = response.data.avarage_min_bonus;
          this.maxsimum_amount = response.data.avarage_max_bonus;
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("/");
        });
    },
    ...mapActions({ addPermission: "setCurrentPermission" }),
  },
  mounted() {
    this.LoadVacancyByid();
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

    window.scroll(0, 0);
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
/* Page shell */
.vacancy {
  position: relative;
  background: radial-gradient(1200px 600px at 0% 0%, #f2f6ff 0%, #f8fafc 48%, #ffffff 100%);
  font-family: "Manrope", "Segoe UI", sans-serif;
  color: #0f172a;
}

.vacancy::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 12% 8%, rgba(59, 130, 246, 0.10), transparent 35%),
    radial-gradient(circle at 90% 12%, rgba(16, 185, 129, 0.10), transparent 38%),
    radial-gradient(circle at 60% 80%, rgba(245, 158, 11, 0.08), transparent 40%);
  pointer-events: none;
}

.vacancy .container-fluid {
  position: relative;
  z-index: 1;
}

.vacancy .page-title {
  font-weight: 800;
  letter-spacing: 0.2px;
  color: #0f172a;
}

/* Cards */
.vacancy .card {
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
  overflow: hidden;
  animation: cardFade 220ms ease both;
}

.vacancy .card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1d4ed8 0%, #22c55e 50%, #f59e0b 100%);
  opacity: 0.7;
}

.vacancy .card:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.14);
  border-color: #d1d5db;
}

.vacancy .card-header {
  position: relative;
  background: #f8fafc;
  border-bottom: 1px solid #eef2f7;
  font-weight: 600;
  padding: 14px 18px;
  color: #0f172a;
  border-radius: 18px 18px 0 0;
}

.vacancy .card-body {
  padding: 22px 22px;
}

.vacancy .card-footer {
  border-top: 1px solid #eef2f7;
  padding: 14px 18px;
  background: #ffffff;
  border-radius: 0 0 18px 18px;
}

/* Typography */
.font-weigt-bold {
  font-weight: 600;
  color: #111827;
}

/* Inputs + selects */
.vacancy .form-control,
.vacancy :deep(.lss-form-select .vs__dropdown-toggle) {
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.vacancy .form-control:focus {
  border-color: #93c5fd;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}

.vacancy :deep(.lss-form-select .vs__dropdown-toggle) {
  min-height: 42px;
}

.vacancy :deep(.lss-form-select .vs__selected) {
  color: #0f172a;
  font-weight: 600;
}

.vacancy :deep(.lss-form-select .vs__dropdown-menu) {
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.10);
}

/* Vue editor */
.vacancy :deep(.ql-toolbar) {
  border-radius: 12px 12px 0 0;
  border-color: #e5e7eb;
  background: #f8fafc;
}

.vacancy :deep(.ql-container) {
  border-radius: 0 0 12px 12px;
  border-color: #e5e7eb;
  min-height: 160px;
}

/* Buttons */
.vacancy .btn {
  border-radius: 10px;
  font-weight: 600;
}

.vacancy .btn-primary {
  background-color: #2563eb;
  border-color: #2563eb;
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.18);
}

.vacancy .btn-primary:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

.vacancy .btn-outline-primary {
  border-color: #cbd5e1;
  color: #0f172a;
  background: #ffffff;
  border-radius: 12px;
}

.vacancy .btn-outline-primary:hover {
  border-color: #93c5fd;
  color: #1d4ed8;
}

.vacancy .btn-check:checked + .btn-outline-primary {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.22);
}

/* Alerts */
.vacancy .alert {
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.06);
}

.vacancy .alert ul {
  margin: 8px 0 0;
}

/* Form switches */
.vacancy .form-check-input {
  width: 2.2rem;
  height: 1.2rem;
  border-radius: 999px;
  border: 1px solid #cbd5e1;
  background-color: #e2e8f0;
}

.vacancy .form-check-input:checked {
  background-color: #22c55e;
  border-color: #22c55e;
}

/* Modals */
.modal-content {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
}

.modal-header {
  border-bottom: 1px solid #eef2f7;
  background: #f8fafc;
}

.modal-footer {
  border-top: 1px solid #eef2f7;
}

.card-footer:last-child {
  border-radius: 0 0 18px 18px !important;
}

@keyframes cardFade {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
