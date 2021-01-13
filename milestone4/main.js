/* Milestone 4:
Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp,
creando un layout completo simil-Netflix:
● Un header che contiene logo e search bar
● Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma
di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio
la poster_path con w342)
● Andando con il mouse sopra una card (on hover), appaiono le informazioni
aggiuntive già prese nei punti precedenti più la overview */

let app = new Vue({
    el: "#app",
    data:{
        txt:'',
        filmsDb:[],
    },

    mounted() {

    },
    
    methods: {
        searchMovie: function (search){
            
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=63c44cc4459f95138303a72049a37548&language=it&query=${search}&include_adult=false`).then(resp=>{
               let film = resp.data.results
               
            axios.get(`https://api.themoviedb.org/3/search/tv?api_key=63c44cc4459f95138303a72049a37548&language=it&query=${search}&include_adult=false`).then(resp=>{
                let series = resp.data.results

                //Aggiungo entrambe le richieste al mio database generale.
                this.filmsDb = film.concat(series) 



                // tramite il forEach accedo alla proprietà che mi interessa per modificarla.
                this.filmsDb.forEach(element => {
                  return element.stars = Math.floor(element.vote_average / 2)
                });

                this.filmsDb.forEach(element=>{

                    if (element.original_language == "en"){
                        element.original_language = "gb";
                    } else if (element.original_language == "zh") {
                        element.original_language = "cn"
                    } else if (element.original_language == "ko") {
                        element.original_language = "kr"
                    } else if(element.original_language == "vi"){
                        element.original_language = "vn";
                    }else if(element.original_language == "et"){
                        element.original_language = "ee";
                    }else if(element.original_language == "ja"){
                        element.original_language = "jp";
                    }else if(element.original_language == "da"){
                        element.original_language = "dk";
                    } else if(element.original_language == "hu"){
                        element.original_language = "ua";
                    }

                    return element.flag = `https://www.countryflags.io/${element.original_language}/flat/32.png`;
                })

                this.filmsDb.forEach(element=>{
                    if(element.poster_path === null){
                        element.img = `img/no-image-800x80011.jpg`
                    } else {
                        return element.img = `https://image.tmdb.org/t/p/w342${element.poster_path}`
                    }
                })
                
            })
        })
            
            this.txt= '';
        },
       

        refresh(){
            this.$forceUpdate()
        }
    }
})

