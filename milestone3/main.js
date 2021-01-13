/* In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
Dovremo prendere quindi l’URL base delle immagini di TMDB:
https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
(troviamo tutte le dimensioni possibili a questo link:
https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la
parte finale dell’URL passata dall’API.
Esempio di URL:
https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
 */

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
                    return element.flag = `https://www.countryflags.io/${element.original_language}/flat/32.png`;
                })

                this.filmsDb.forEach(element=>{
                    return element.img = `https://image.tmdb.org/t/p/w342${element.poster_path}`
                })
                
            })
        })
            
            this.txt= '';
        },
       
    }
})

