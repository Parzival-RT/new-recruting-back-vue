<template>
  <div>

    <b-modal ref="my-modal" id="modal-1" hide-header-close="false" hide-footer title="აირჩიე ტიპი" no-close-on-backdrop="false">

      <div class=" d-grid gap-3">
        <!-- Company -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">კომპანია</h5>
            <p class="card-text">გააგრძელე როგორც კომპანიის წარმომადგენელმა</p>
            <router-link to="/Dashboard" class="btn btn-primary">გაგრძელება <i class="tio-chevron-right"></i></router-link>
          </div>
        </div>
        <!-- End Company -->

        <!-- Teacher -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">მასწავლებელი</h5>
            <p class="card-text">გააგრძელე როგორც მასწავლებელმა</p>
            <router-link to="/Teacher__Dashboard" class="btn btn-primary">გაგრძელება <i class="tio-chevron-right"></i></router-link>
          </div>
        </div>
        <!-- End Teacher -->
      </div>

    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      // lunchModal: false,
    }
  },
  methods: {
    showModal() {
      this.$refs['my-modal'].show()
    },
  },
  mounted() {
    this.showModal();
  }
}
</script>

<style scoped>
</style>