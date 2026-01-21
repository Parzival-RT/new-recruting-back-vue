<template>
  <div>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card">
          <div class="card-header font-weigt-bold py-3">
            მომხმარებლის დამატება
          </div>
          <div class="card-body">
            <form class="row gap-3">
              <!-- Col -->
              <div class="col-12">
                <label class="font-weigt-bold" for="name">სახელი</label>
                <input class="form-control" name="id" id="name" type="text" placeholder="სახელი">
              </div>
              <!-- Col -->
              <div class="col-12">
                <label class="font-weigt-bold" for="surname">გვარი</label>
                <input class="form-control" name="id" id="surname" type="text" placeholder="გვარი">
              </div>
              <!-- Col -->
              <div class="col-12">
                <label class="font-weigt-bold" for="email">ელ.ფოსტა</label>
                <input class="form-control" name="id" id="email" type="email" placeholder="ელ.ფოსტა">
              </div>
              <!-- Col -->
              <div class="col-12">
                <label class="font-weigt-bold" for="mobile">მობილურის ნომერი</label>
                <input class="form-control" name="id" id="mobile" type="number" placeholder="მობილურის ნომერი">
              </div>
              <!-- Col -->
              <div class="col-12">
                <label class="font-weigt-bold" for="password">პაროლი</label>
                <input class="form-control" name="id" id="password" type="password" placeholder="პაროლი">
              </div>
              <div class="col-12">
                <button class="btn btn-primary me-1"><i class="tio-add"></i> დამატება</button>
                <router-link to="/UserList" class="btn btn-outline-blue"><i class="tio-back-ui"></i> უკან</router-link>
              </div>
              <!-- End Col -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header.vue'

export default {
  name: "Add_User",
  data () {
    return {
      showTopMenu: false
    }
  },
  components: {
    Header
  },
  mounted() {
    window.scroll(0,0);
  }
}
</script>

<style scoped>
.card-header {
  background: transparent!important;
}
.card-footer {
  background: transparent!important;
}
</style>