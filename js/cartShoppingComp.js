Vue.component('cart_shopping', {
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
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        delObject(item) {
            this.$parent.getJson(`${API}/deleteObjectFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                });
        },
        plusQuantity(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        item.quantity++;
                    }
                });
        },
        clearCart(item) {
            this.$parent.getJson(`${API}/clearCart.json`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(0, 9999);
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
        <product-header v-if="cartItems.length > 0"></product-header>
            <div class="shopping_cart">
                    <p v-if="!cartItems.length">Вы еще не добавили ни одного товара в корзину</p>
                    <cart-item class="shopping__content" 
                                v-for="item of cartItems" 
                                :key="item.id_product"
                                :cart-item="item" 
                                :img="item.product_img"
                                :color="item.product_color"
                                :size="item.product_size"
                                @remove="remove"
                                @plusQuantity="plusQuantity"
                                @delObject="delObject">
                                </cart-item>
                                <total-sum v-if="cartItems.length > 0"
                                @clearCart="clearCart">
                    </total-sum>
            </div>
        </div>`
});

Vue.component('product-header', {
    template: `
              <div class="content center">
                   <div class="left_basis_block border_for_test line_shopping_1 line__shopping">Product Details</div>
                   <div class="block_shopping_1 proba_standart_parameter_top line_shopping_1 border_for_test">unite Price</div>
                   <div class="block_shopping_2 proba_standart_parameter_top line_shopping_1 border_for_test">Quantity</div>
                   <div class="block_shopping_3 proba_standart_parameter_top line_shopping_1 border_for_test">shipping</div>
                   <div class="block_shopping_4 proba_standart_parameter_top line_shopping_1 border_for_test">Subtotal</div>
                   <div class="block_shopping_5 proba_standart_parameter_top line_shopping_1 border_for_test">ACTION</div>
              </div>
   `
});

Vue.component('total-sum', {
    template: `
                    <div class="shopping_button_down">
                        <button class="clear__cart" @click="$emit('clearCart', cartItems)">cLEAR SHOPPING CART</button>
                        <a href="Product.html" class="clear__cart"><p>continue shopping</p></a>
                    </div>
   `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="shopping__content">
                    <div class="width-container">
                        <a href="single_page.html" class="shopping_link">
                            <img :src="img" alt="Some image" class="shopping_desc_img">
                            <div class="shopping_titles">
                                <p class="shopping_title_1">{{cartItem.product_name}}</p>
                                <div class="shopping__plus_text1">    
                                        <p class="shopping_cart_color1">Color: <span class="shopping_cart_color2">{{cartItem.product_color}}</span></p>
                                        <p class="shopping_cart_color1">Size: <span class="shopping_cart_color3">{{cartItem.product_size}}</span></p>
                                </div>
                            </div>
                        </a>
                    </div>    
                    <div class="block_shopping_1 proba_standart_parameter line__shopping_other">
                    $\{{cartItem.price}}
                    </div>
                    <div class="block_shopping_2 proba_standart_parameter line__shopping_other">
                        <div class="shopping_cal">{{cartItem.quantity}}
                            <button class="plusQua" @click="$emit('plusQuantity', cartItem)">+</button>
                            <button class="minusQua" @click="$emit('remove', cartItem)">-</button>
                        </div>
                    </div>
                    <div class="block_shopping_3 proba_standart_parameter line__shopping_other">
                    FREE
                    </div>
                    <div class="block_shopping_4 proba_standart_parameter line__shopping_other">
                    $\{{cartItem.quantity*cartItem.price}}
                    </div>
                    <div class="block_shopping_5 proba_standart_parameter line__shopping_other">
                        <i class="fas fa-times-circle del_btn" @click="$emit('delObject', cartItem)"></i>
                    </div>  
                </div>
    `
});