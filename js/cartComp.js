Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJson(`${API}/addToBasket.json`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
            <button class="cart_summary"
                    type="button"
                    @click="showCart = !showCart">
                <img class="header__cart" src="img/cart.svg" alt="cart">
            </button>
            <div class="drop__cart" v-show="showCart">
                    <p v-if="!cartItems.length"></br>Корзина пуста</p>
                    <cart-item class="cart__content" 
                    v-for="item of cartItems" 
                    :key="item.id_product"
                    :cart-item="item" 
                    :img="item.product_img"
                    @remove="remove">
                    </cart-item>
                    <total-sum v-if="cartItems.length > 0"></total-sum>
            </div>
        </div>`
});

Vue.component('total-sum', {
    template: `
                <div>
                    <div class="text__total">TOTAL</div>
                    <div class="cart_button_down">
                        <a href="checkout.html" class="cart__button_sub">Checkout</a>
                        <a href="shopping_cart.html" class="cart__button_sub last__button">Go to cart</a>
                    </div>
                </div>
   `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart__content">
                    <a href="single_page.html" class="link_in_desk">
                        <img :src="img" alt="Some image" class="cart__image__content">
                            <div class="desk">
                                <p class="cart__text_1">{{cartItem.product_name}}</p>
                                <img src="img/stars.png" alt="stars" class="stars">
                                <div class="item_bio">
                                    <p class="product-quantity">{{cartItem.quantity}} X</p>
                                    <p class="product-price">$ {{cartItem.quantity*cartItem.price}}</p>
                                </div>
                            </div>
                    </a>        
                        <div class="right_desc_block">
                            <button class="delete_cart_item" @click="$emit('remove', cartItem)">
                                <i class="fas fa-times-circle"></i>
                            </button>
                        </div>
                </div>
    `
});