import { defineStore } from 'pinia'
import { options } from "../static";

export const useActors = defineStore('actors', {
    state: () => ({  
        movieActors: [],
        tvActors: [],
    }),
    actions: {
      async getActors(type='movie', id, count){
        try {
            const result = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=ru`, options)
            const data = await result.json()
            let array = count ? data.cast.slice(0, count): data.cast;
            if (type == 'movie') {
              this.movieActors = array;
            } else {
              this.tvActors = array;
            }
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
      }
    },
})