<template>
    <div>
        <loading :active.sync="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="fullPage"></loading>
        <Header />
        <div v-show="!isLoading" class="main" :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">
            <div class="container-fluid p-4">

                <div class="row mb-3">
                    <!-- Col -->
                    <div class="col-6">
                        <h1 class="page-title">უპირატესობები</h1>
                    </div>
                    <!-- End Col -->

                    <!-- Col -->
                    <div class="col-12 col-md-6 text-md-end" v-if="permission == 'administrator'">
                        <button @click="goBack()" class="btn btn-light border me-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                            </svg>
                            უკან
                        </button>
                        <router-link :to="'/add_feature/'+this.$route.params.id">
                            <button class="btn btn-primary"> + უპირატესობის დამატება</button>
                        </router-link>
                    </div>
                    <!-- End Col -->
                </div>

                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center bg-light">
                        უპირატესობების ჩამონათვალი
                        <!-- <div class="input-group w-50">
                            <input type="text" class="form-control" v-model="keyword" :options="ResponseData"
                                placeholder="ძებნა" aria-label="ძებნა" aria-describedby="button-addon2">
                            <button class="btn btn-outline-primary d-none" type="button" id="button-addon2"><i
                                    class="tio-search"></i></button>
                        </div> -->
                    </div>
                    <div class="card-body">

                        <div class="row">
                            <div class="col-12 mt-2">

                                <table class="table">
                                    <tbody>
                                        <tr v-for="post in ResponseData" :key="post.id">
                                            <td>
                                                <div class="row align-items-center">
                                                    <div class="col-7">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle text-success" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                                        </svg>
                                                        {{ post.name }}
                                                    </div>
                                                    <!-- Action -->
                                                    <div class="col-5 d-flex justify-content-end">


                                                        <!-- Example single danger button -->
                                                

                                                        <a v-if="permission == 'administrator'" @click="EditDetail(post.id)"
                                                            class="btn btn-yellow me-1">
                                                            <span class="d-none d-md-block">რედაქტირება</span>
                                                            <i class="tio-edit d-block d-md-none"></i>
                                                        </a>
                                                        <div v-if="permission == 'administrator'" class="btn btn-danger"
                                                            data-bs-toggle="modal"
                                                            :data-bs-target="'#deletePosition_' + post.id">
                                                            <span class="d-none d-md-block">წაშლა</span>
                                                            <i class="tio-clear d-block d-md-none"></i>
                                                        </div>
                                                        <!-- Delete Modal -->
                                                        <div class="modal fade" :id="'deletePosition_' + post.id"
                                                            data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                                                            aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="staticBackdropLabel">
                                                                            ტრენინგის წაშლა</h5>
                                                                        <button type="button" class="btn-close"
                                                                            data-bs-dismiss="modal"
                                                                            aria-label="Close"></button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        ნამდვილად გსურთ ტრენინგის წაშლა?
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary"
                                                                            data-bs-dismiss="modal">გაუქმება</button>
                                                                        <button @click="deleteDataById(post.id)"
                                                                            class="btn btn-danger">წაშლა</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- End Delete Modal -->
                                                    </div>
                                                    <!-- End Action -->
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>



                            </div>
                        </div>





                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Header from '@/components/Header.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from "axios";

import { mapActions, mapGetters } from "vuex";

export default {
    name: "index",
    components: {
        Header,
        Loading
    },
    data() {
        return {
            isLoading: false,
            fullPage: true,
            ResponseData: {},
            keyword: ''
        }
    },
    mounted() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false
        }, 300);
        this.getResults()
    },
    methods: {
        onCancel() {
        },
        getResults() {
            this.isLoading = true;
            const token = JSON.parse(localStorage.getItem('user')).access_token;
            axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/packages/sub/GetList' + '?package_id='+this.$route.params.id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    this.isLoading = false;
                    this.ResponseData = response.data;
                });
        },
        deleteDataById(id) {
            const token = JSON.parse(localStorage.getItem('user')).access_token;
            axios.delete(process.env.VUE_APP_BACKEND_URL + '/auth/packages/sub/delete/' + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    location.reload()
                })
                .catch((error) => {


                });
        },
        EditDetail(id) {
            this.$router.push({ name: 'edit_feature', params: { id: id, feature_id: this.$route.params.id } })
        },
        goBack() {
            window.history.go(-1);
        }
    },
    computed: {
        // filter() {
        //     return this.ResponseData.filter(item => {
        //         return item.name.toLowerCase().includes(this.keyword.toLowerCase());
        //     })
        // },

    
        ...mapGetters({ permission: "getCurrentPermission" })
    },
    mounted() {
        this.getResults()
    }
}
</script>
  
<style scoped>
.card-header {
    border-top-left-radius: 0.75rem !important;
    border-top-right-radius: 0.75rem !important;
}
</style>
  