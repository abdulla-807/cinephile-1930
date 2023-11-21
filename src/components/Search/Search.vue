<template>
    <div class="container search">
        <input v-model="searchValue" type="text" class="search__input" placeholder="Найти фильм, сериал...">
        <div class="search__wrapper">
            <SearchItem v-for="item, index in multiData" :key="index" :item="item"/>
        </div>
        <div class="loading" v-if="loading">
            <div class="loading__spiner"></div>
        </div>
    </div>
</template>

<script setup>
import { useSearch } from "../../store/search";
import { computed, onBeforeUnmount, ref } from "vue";
import SearchItem from './SearchItem.vue'
const searchStore = useSearch();
let timeId = null;
let currentPage = ref(1);
const loading = ref(false);
const totalPages = computed(()=> searchStore.totalPages);
async function getContent() {
    if (!loading.value && currentPage.value < totalPages.value) {
        loading.value = true;
        currentPage.value++;
        await searchStore.getSearch(currentPage.value);
        loading.value = false;
    }
}

window.addEventListener('scroll', ()=>{
    let condition = window.scrollY + window.innerHeight >= document.body.clientHeight - footer.clientHeight;
    console.log(condition);
    if (condition) {
        getContent();        
    }
})

function searchArray(cb, delay) {
    if (timeId) {
        clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
        cb();
    }, delay);
}
let searchValue = computed({
    get: ()=> searchStore.search,
    set: (val)=>{
        searchStore.search = val;
        searchArray(searchStore.getSearch, 500)
        // searchStore.getSearch()
    }
})
const multiData = computed(()=> searchStore.searchList )
onBeforeUnmount(()=>{
    searchStore.search = '';
    searchStore.searchList = [];
})
</script>

<style lang="scss">

</style>