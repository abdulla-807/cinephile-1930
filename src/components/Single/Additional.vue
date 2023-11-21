<template>
    <div class="additional container" v-if="current">
        <div class="additional__card" v-if="current.budget">
            <h4>Бюджет</h4>
            <p>${{ current.budget.toLocaleString() }}</p>
        </div>
        <div class="additional__card" v-if="current.revenue">
            <h4>Сборы</h4>
            <p>${{ current.revenue.toLocaleString() }}</p>
        </div>
        <div class="additional__card" v-if="current.status">
            <h4>Статус</h4>
            <p>{{ current.status }}</p>
        </div>
        <div class="additional__card" v-if="current.original_title || current.original_name">
            <h4>Исходное название</h4>
            <p>{{ current.original_title || current.original_name }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    current: Object
})
</script>

<style lang="scss">

</style>