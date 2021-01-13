/* Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
piene (o mezze vuote :P)
Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della
nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
nazione ritornata dall’API (le flag non ci sono in FontAwesome).
Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca
dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di
risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
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
                    return element.flag = `<img src="https://www.countryflags.io/${element.original_language}/flat/64.png">`;
                })
                
            })
        })
            
            this.txt= '';
        },
       
    }
})

