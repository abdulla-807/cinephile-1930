<template>
    <div class="recommend container" v-if="getRecommend">
        <h2 class="recommend__title">{{ getRecommend.length ? 'Рекомендации' : 'Нет рекомендаций'}}</h2>
        <div class="recommend__content">
            <router-link :to="`/${type}/${item.id}`" v-for="item, index in getRecommend" :key="item.id">
                <img v-lazy="imgUrl + item.poster_path" alt="" class="recommend__img" :class="{recommend__img_no: !item.poster_path}">
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { imgUrl } from '../../static';

const props = defineProps(['getRecommend', 'type'])
</script>

<style lang="scss">

</style>