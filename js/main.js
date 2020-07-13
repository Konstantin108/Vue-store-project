const API = 'https://raw.githubusercontent.com/Konstantin108/Vue-store-project/try_make_btn_clearall/responses';


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