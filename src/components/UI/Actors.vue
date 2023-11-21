<template>
    <div class="actor" v-for="item, index in getActors">
        <img v-if="item.profile_path" :src="imgUrl + item.profile_path" alt="" class="actor__img">
        <p class="actor__name">{{ item.name }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    type: String,
    id: Number,
    count: Number
})
import { useActors } from "../../store/actors";
import { computed } from "vue";
import { imgUrl } from "../../static";
let actorsStore = useActors();
actorsStore.getActors(props.type, props.id, props.count);
let getActors = computed(()=> props.type == 'movie' ? actorsStore.movieActors : actorsStore.tvActors)
</script>

<style lang="scss">

</style>