<template>
    <footer id="footer" class="footer">
        <ul class="footer__menu">
            <li v-for="item, index in links" :key="index">
                <a :href="item.url">
                    <font-awesome-icon :icon="item.icon" />
                </a>
            </li>
        </ul>
        <p class="footer__desc">© 2022 CINEPHILE. Может содержать информацию, не предназначенную для несовершеннолетних</p>
        <p class="footer__desc">Данные получены с сайта themoviedb.org</p>
        <img src="../../assets/img/proweb.svg" alt="" class="footer__img">
    </footer>
</template>

<script setup>
import { ref } from "vue";
let links = ref([
    {url: 'https://web.telegram.org/', icon: ['fab', 'telegram']},
    {url: 'https://vk.com/', icon: ['fab', 'vk']},
    {url: 'https://facebook.com/', icon: ['fab', 'facebook']},
    {url: 'https://instagram.com/', icon: ['fab', 'instagram']},
    {url: 'https://tiktok.com/', icon: ['fab', 'tiktok']},
    {url: 'https://youtube.com/', icon: ['fab', 'youtube']},
    {url: 'https://twitter.com/', icon: ['fab', 'twitter']},
    {url: 'https://linkedin.com/', icon: ['fab', 'linkedin']},
])
</script>

<style lang="scss">

</style>