let app = new Vue({
    el: "#app",
    data:{
        txt:'',
        average:'',
        filmsDb:null,
    },

    mounted() {

    },
    
    methods: {
        searchMovie: function (search,index){
            
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=63c44cc4459f95138303a72049a37548&language=it&query=${search}&include_adult=false`).then(resp=>{
                this.filmsDb = resp.data.results;
                this.filmsDb.forEach(element => {
                    return element.vote_average = Math.floor(element.vote_average / 2);
                });
            })
            

            this.txt= '';
            
        }
    }
})

