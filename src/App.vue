<template>
    <router-view/>
</template>
<script>
import Header from '@/components/Header.vue'
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapActions, mapGetters } from "vuex";
export default {
  methods:{
    ...mapActions({ addPermission: "setCurrentPermission" }),
  },
  mounted(){
    this.addPermission();
  }
}
</script>
<style>

</style>
