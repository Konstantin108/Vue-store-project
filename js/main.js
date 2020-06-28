const API = 'https://raw.githubusercontent.com/Konstantin108/Vue-store-project/work-on-catalogSingleData.json/responses';


const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError();
                })
        },
    },
    mounted() {
        console.log(this);
    }
});