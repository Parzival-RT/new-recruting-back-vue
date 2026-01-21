<template>
  <div>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card">
          <div class="card-body py-4">
            <h5 class="card-title">მარიამ ჩარგეიშვილი</h5>
            <p class="card-text mb-4">დაუკავშირდით მარიამს კითხვების შემთხვევაში.</p>
            <a href="tel:+995598335837" class="btn btn-success me-1 mb-2"><i class="tio-call"></i> +995 598-33-58-37</a>
            <a href="mailto:ma.chargeishvili@gmail.com" class="btn btn-outline-primary mb-2"><i class="tio-email"></i> ma.chargeishvili@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header.vue'

export default {
  name: "Contact",
  data () {
    return {
      showTopMenu: false
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>

</style>