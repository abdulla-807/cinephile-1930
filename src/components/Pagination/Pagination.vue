<template>
    <div class="pagin" :class="{pagin_top: top}">
        <ul class="pagin__menu">
            <li class="pagin__btn" v-if="prevPage" @click="changePage(prevPage)">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </li>
            <li class="pagin__num" 
            v-if="startLinks" 
            v-for="item in startLinks" :key="item"
            @click="changePage(item)"
            :class="{active: item == currentPage}" >
                {{ item }}
            </li>
            <li class="pagin__num" v-if="prevDots" @click="changePage(prevDots)">...</li>
            <li class="pagin__num" 
            v-if="centerLinks" 
            v-for="item in centerLinks" :key="item"
            @click="changePage(item)"
            :class="{active: item == currentPage}" >
                {{ item }}
            </li>
            <li class="pagin__num" v-if="nextDots" @click="changePage(nextDots)">...</li>
            <li class="pagin__num" 
            v-if="endLinks" 
            v-for="item in endLinks" :key="item"
            @click="changePage(item)"
            :class="{active: item == currentPage}" >
                {{ item }}
            </li>
            <li class="pagin__btn" v-if="nextPage" @click="changePage(nextPage)">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    top: Boolean,
    currentPage: Number, 
    totalPage: Number
})
const emit = defineEmits(['emitPage'])
import { ref, watch } from "vue";
const nextPage = ref(null);
const prevPage = ref(null);
const prevDots = ref(null);
const nextDots = ref(null);
const startLinks = ref(null);
const endLinks = ref(null);
const centerLinks = ref(null);

function createNums(page) {
    let lastPage = props.totalPage;
    nextPage.value = lastPage > page ? page + 1 : null;
    prevPage.value = page - 1;
    prevDots.value = page - 3 > 1 ? page - 3 : null;
    nextDots.value = page + 3 < lastPage ? page + 3 : null;
    startLinks.value = prevDots.value ? [1, 2] : page == 4 ? [1,2,3,4,5] : [1,2,3,4];
    endLinks.value = nextDots.value ? [lastPage--, lastPage].reverse() : 
                    page == lastPage - 3 ? [lastPage--,lastPage--,lastPage--,lastPage--,lastPage].reverse() : [lastPage--,lastPage--,lastPage--,lastPage].reverse();
    centerLinks.value = prevDots.value && nextDots.value ? [page-1, page, page+1] : null;
}
createNums(props.currentPage)

function changePage(page) {
    createNums(page)
    emit('emitPage', page)
}

watch(
    ()=> props.currentPage,
    ()=>{ createNums(props.currentPage) }
)
watch(
    ()=> props.totalPage,
    ()=>{ createNums(props.currentPage) }
)

</script>

<style lang="scss" scoped>

</style>