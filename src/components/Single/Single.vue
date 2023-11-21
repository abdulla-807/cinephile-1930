<template>
    <div class="single">
        <SingleContent :current="getInfoId" :type="type"/>
        <Additional :current="getInfoId"/>
        <Recommend :getRecommend="getRecommend" :type="type"/>
    </div>
</template>

<script setup>
const props = defineProps({
    type: String
})
import SingleContent from './SingleContent.vue';
import Additional from './Additional.vue';
import Recommend from './Recommend.vue';
import { computed, onBeforeUnmount, watch } from "vue";
import { useRouter, useRoute } from 'vue-router'
let route = useRoute();
import { useDetails } from "../../store/details";
import { useRecommend } from "../../store/recommend";
let detailsStore = useDetails();
let recommendStore = useRecommend();

let routeId = computed( ()=> route.params.id);
detailsStore.getDetails(routeId.value, props.type);
recommendStore.getRecommend(routeId.value, props.type);

let getInfoId = computed(()=> detailsStore.info);
let getRecommend = computed(()=>recommendStore.info);
onBeforeUnmount(()=>{
    detailsStore.info = null;
})

watch(routeId, ()=>{
    detailsStore.getDetails(routeId.value, props.type);
    recommendStore.getRecommend(routeId.value, props.type);
})

</script>

<style lang="scss">

</style>