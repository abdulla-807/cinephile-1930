<template>
    <Transition name="upcoming">
    <section class="topRated" v-if="content.length">
        <h2 class="topRated__title">
            ТОП
            <span>10</span>
        </h2>
        <swiper :breakpoints="breakpoints" :modules="modules" :slides-per-view="5.2" :space-between="24" navigation>
            <swiper-slide class="topRated__item" v-for="item, index in content" :key="index">
                <router-link :to="'/movie/' + item.id">
                    <img v-lazy="imgUrl + item.poster_path" alt="" class="topRated__img">
                    <div class="topRated__content">
                        <span>{{ index + 1 }}</span>
                    </div>
                </router-link>
            </swiper-slide>
            
        </swiper>
    </section>
    <div class="loading" v-else>
        <div class="loading__spiner"></div>
    </div>
    </Transition>
</template>

<script setup>
import { computed, ref } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { imgUrl } from "../../static";
import { useTop } from "../../store/topRated";

let topStore = useTop();
topStore.getTop()
let content = computed(()=> topStore.moviesList)
let modules = ref([Navigation]);
let breakpoints = {
    200: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 1.2,
    },
    900: {
      slidesPerView: 1.5,
    },
    992: {
      slidesPerView: 1.8,
    },
    1200: {
      slidesPerView: 2.2,
    },
    1500: {
      slidesPerView: 2.8,
    },
    1700: {
      slidesPerView: 3.2,
    },
}



</script>

<style lang="scss">

</style>