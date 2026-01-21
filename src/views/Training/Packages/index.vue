<template>
    <div>
        <loading :active.sync="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="fullPage"></loading>
        <Header />
        <div v-show="!isLoading" class="main" :class="this.$store.state.showTopMenu == true ? 'collapsed ' : 'uncollapsed'">
            <div class="container-fluid p-4">

                <div class="row mb-3">
                    <!-- Col -->
                    <div class="col-6">
                        <h1 class="page-title">პაკეტები</h1>
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
                        <router-link :to="'/add_package/'+this.$route.params.id">
                            <button class="btn btn-primary"> + პაკეტის დამატება</button>
                        </router-link>
                    </div>
                    <!-- End Col -->
                </div>

                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center bg-light">
                        პაკეტების ჩამონათვალი
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check me-1" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                                        </svg>
                                                        {{ post.name }}
                                                        {{ post.price }}₾ 
                                                        {{ post.type == 'monthly' ? 'თვეში' : '' || post.type == 'annual' ? 'წლიური' : '' || post.type == 'free' ? 'უფასო' : ''}}
                                                    </div>
                                                    <!-- Action -->
                                                    <div class="col-5 d-flex justify-content-end">


                                                        <!-- Example single danger button -->
                                                        
                                                        <router-link :to="'/Features/'+post.id" v-if="permission == 'administrator'"
                                                            class="btn btn-success me-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                                                            </svg>
                                                        </router-link>

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
            axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/packages/GetList' + '?traning_id='+this.$route.params.id, {
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
            axios.delete(process.env.VUE_APP_BACKEND_URL + '/auth/packages/delete/' + id, {
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
            this.$router.push({ name: 'edit_package', params: { id: id, training_id: this.$route.params.id} })
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
  