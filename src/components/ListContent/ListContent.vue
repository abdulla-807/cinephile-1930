<template>
    <div class="container list-content">
        <h2 class="list-content__title">
            {{ type == 'movie' ? 'Все фильмы' : 'Все сериалы' }}
        </h2>
        <Pagination :top="true" 
        :currentPage="currentPage" 
        @emitPage="changeRoute" 
        :totalPage="totalPage" 
        />
        <div class="list-content__wrapper">
            <ListItem v-for="item, index in allContent" :key="index" :type="type" :item="item" />
        </div>
        <div class="loading" v-if="loading">
            <div class="loading__spiner"></div>
        </div>
        <Pagination :currentPage="currentPage" @emitPage="changeRoute" :totalPage="totalPage"/>
    </div>
</template>

<script setup>
import ListItem from './ListItem.vue';
import Pagination from '../Pagination/Pagination.vue';
const props = defineProps({
    type: String
});
import { ref, computed } from "vue";
import { usePopular } from "../../store/popular";
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

let popularStore = usePopular();
let currentPage = ref(1);
// popularStore.getPopular(props.type, currentPage.value);
// let content = computed(() => props.type == 'movie' ? popularStore.moviesList : popularStore.tvsList)
let loading = ref(false)
let allContent = ref([]);
let totalPage = computed(()=> popularStore.maxPage)
async function getContent(page=1) {
    loading.value = true;
    currentPage.value = page;
    await popularStore.getPopular(props.type, currentPage.value);
    let state = props.type == 'movie' ? popularStore.moviesList : popularStore.tvsList;
    allContent.value = state;
    loading.value = false;
}

const routeId = computed(()=> route.query.page && !isNaN(route.query.page) ? +route.query.page : 1);
console.log(routeId);
function changeRoute(page=1) {
    router.push({ path: `/${props.type}`, query: { page: page } });
    getContent(page);
}
changeRoute(routeId.value)

// window.addEventListener('scroll', ()=>{
//     let download = document.body.clientHeight - footer.clientHeight <= window.scrollY + window.innerHeight;
//     if (download) {
//         getContent()
//     }
// })

</script>

<style lang="scss"></style>