Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="item.product_img" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
        };
    },

    template: `
         <div class="featured_link">
                <div class="block__featured">
                        <div class="block__self1">
                            <img :src="img" alt="photo" class="featured__photo">
                            <div class="cart__hover" @click="cartAPI.addProduct(product)">
                                  <img src="img/cart_hover.svg" alt="cart_hover_img" class="cart_hover_img">
                                  Add to Cart
                            </div>
                        </div>
                        <p class="featured_text">{{product.product_name}}</p>
                        <p class="featured_text2">$\{{product.price}}</p>
                </div>
         </div>
    `
});