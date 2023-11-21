import { defineStore } from 'pinia'
import { options } from "../static";

export const usePopular = defineStore('popular', {
    state: () => ({  
        moviesList: [],
        tvsList: [],
        totalPage: 1
    }),
    actions: {
      async getPopular(type, page=1){
        try {
            const result = await fetch(`https://api.themoviedb.org/3/${type}/popular?language=ru&page=${page}`, options);
            const data = await result.json()
            let array = data.results.filter((elem)=> elem.poster_path != null);
            this.totalPage = data.total_pages;
            if (type == 'movie') {
              this.moviesList = array;
            } else {
              this.tvsList = array;
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
      }
    },
    getters: {
      maxPage(state){
        return state.totalPage > 500 ? 500 : state.totalPage;
      }
    }
})