/* Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno
parte del cast aggiungendo alla nostra scheda Film / Serie SOLO i primi 5 restituiti
dall’API con Nome e Cognome, e i generi associati al film con questo schema:
“Genere 1, Genere 2, …”.
 */

let app = new Vue({
    el: "#app",
    data:{
        txt:'',
        filmsDb:[],
    },

    mounted() {
        this.getCast();
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

                // per poter aggiungere ad ogni elemento, la proprietà cast, uso un forEach.
                this.filmsDb.forEach(movie=> this.sumCast(movie))
                
            })

        })
            this.txt= '';
        },

       // Creo una funzione che mi permette di reperire l'id del mio video. Visto che a volte gli id hanno meno di 5 cifre, devo utilizzare 2 cicli differenti per poter prendere ogni risultato.

        getCast: function(movie_id){
            let movieCast = [];
            axios
                .get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=63c44cc4459f95138303a72049a37548`)
                .then(resp=>{
                    let cast = resp.data.cast;
                    if(cast.length>=5){
                        for (let i=0; i<5; i++) {
                            console.log(cast[i].name);
                            movieCast.push(cast[i].name)
                        } 
                    }else if (cast.length < 5) {
                        for (let i = 0; i < cast.length; i++) {
                            movieCast.push(cast[i].name);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
                return movieCast;
        },

        // Con questa funzione, inserisco, tramite il metodo Vue.set, una nuova proprità all'interno della mia istanza vue, che successivamente, nella fuzione search in alto, aggiungerò all'interno del mio filmsDB.

        sumCast(movie) {
            if (movie.hasOwnProperty("original_title")) {
                return Vue.set(movie, "cast", this.getCast(movie.id));
            }
        },

        refresh(){
            this.$forceUpdate()
        }
    }
})

