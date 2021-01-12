/* 
* Titolo = title
* Titolo originale = original_title
* Lingua = original_lenguage
* Voto = vote_average
*/



let app = new Vue({
    el: "#app",
    data:{
        txt:'',
        filmsDb:null,
    },

    mounted() {

    },
    
    methods: {
        searchMovie: function (search){
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=63c44cc4459f95138303a72049a37548&language=it&query=${search}&include_adult=false`).then(resp=>{
                this.filmsDb = resp.data.results;
            })

            this.txt= '';
        }
    }
})




