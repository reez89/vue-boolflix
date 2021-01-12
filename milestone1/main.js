/* 
Creare un layout base con una searchbar (una input e un button) in cui possiamo
scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
film trovato:

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




