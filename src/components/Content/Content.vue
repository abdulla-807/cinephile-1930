<template>
  <Transition name="upcoming">
    <section class="content" v-if="content.length">
        <router-link :to="'/' + type" class="title">
            {{ type == 'movie' ? 'Фильмы' : 'Сериалы'}}
            <font-awesome-icon :icon="['fas', 'chevron-right']" class="title__icon" />
        </router-link>
        <swiper :breakpoints="breakpoints" :modules="modules" :slides-per-view="5.2" :space-between="24" navigation>
            <swiper-slide @click="getInfo(item, index)" class="content__item" v-for="item, index in content" :key="index" :class="{active: index === slideActive}">
                <img v-lazy="imgUrl + item.poster_path" alt="" class="content__img">
                <h4 class="content__title">{{ item.title }}</h4>
                <font-awesome-icon :icon="['fas', 'play']" class="content__arrow" />
                <router-link :to="`/${type}/${item.id}`" class="content__media-link"></router-link>
            </swiper-slide>
            <swiper-slide class="content__item">
                <router-link :to="'/'+type" class="content__link">
                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="content__icon" />
                    <span>{{ type == 'movie' ? 'Все фильмы' : 'Все сериалы'}}</span>
                </router-link>
            </swiper-slide>
        </swiper>
        <div ref="info">
          <InfoBlock :type="type" :current="current" :open="open" @close="closeInfo"/>
        </div>
    </section>
    <div class="loading" v-else>
        <div class="loading__spiner"></div>
    </div>
  </Transition>
</template>

<script setup>
import { usePopular } from "../../store/popular";
import { computed, ref } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { imgUrl } from "../../static";
import InfoBlock from '../InfoBlock/InfoBlock.vue'
import { useDetails } from "../../store/details";

const props = defineProps({
  type: String
})
let modules = ref([Navigation]);
let breakpoints = {
    200: {
      slidesPerView: 1.2,
    },
    600: {
      slidesPerView: 1.5,
    },
    800: {
      slidesPerView: 2.2,
    },
    992: {
      slidesPerView: 2.5,
    },
    1200: {
      slidesPerView: 3.2,
    },
    1400: {
      slidesPerView: 4.2,
    },
    1700: {
      slidesPerView: 5.2,
    },
}
const popularStore = usePopular();
popularStore.getPopular(props.type)
const content = computed(() => props.type == 'movie' ? popularStore.moviesList : popularStore.tvsList)
let current = ref(null);
const detailsStore = useDetails();
let info = ref();
let open = ref(false);
let slideActive = ref(null);

async function getInfo(item, index) {
  slideActive.value = index;
  current.value = null;
  open.value = true;
  await detailsStore.getDetails(item.id, props.type)
  current.value = detailsStore.info;
  let infoTop = info.value.offsetTop - headerId.offsetHeight;
  window.scrollTo({
    top: infoTop,
    behavior: "smooth",
  });
}

function closeInfo() {
  open.value = false;
  current.value = false;
  slideActive.value = null;
}

</script>

<style lang="scss"></style>