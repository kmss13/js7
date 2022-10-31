
'use strict';

const API_URL = 'https://localhost:3000'


const app = new Vue({
    el: '#app',
    data: {
        /* userSearch: '',
        showCart: false, */
        goods: [],
        filteredGoods:[],
        /* products: [],
        cartItems: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200/200',
        imgCart: 'https://via.placeholder.com/50/100' */
    },
    methods: {
        /* getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product  === product.id_product);
                        if (find) {
                            find.quantity++;   
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        }, */
        makeGETRequest(url, callback) {

            let xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    (xhr.responseText);
                }
            }
            xhr.open('GET', url, true);
           
            xhr.send(data);
        },


        makePOSTRequest(url, data, callback) {
            let xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    (xhr.responseText);
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.send(data);
        },


        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            
        }   
    },
    mounted() {
        /* this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            }) */
        this.makeGETRequest(`${API_URL}/catalog.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
    }
    
})
console.log(app);





/* 
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
};
 

class List  { // для наследования, базовый клас от корзины и каталог товаров
    constructor(url, container) {
        this.container = container;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();

    }
    getJson(url) {
        return fetch(url ? url :`${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data) {
        this.goods = [...data];
        this.render();
    }
    sumOrder() { // метод подсчета общей суммы заказа
        let sum = 0;
        for (let product of this.goods) {
            sum += product.price;
        }
        console.log(sum);
    } 
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new list[this.constructor.name](product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    _init() {
        return false
    }

}
    
class Item {
    constructor(el, img = 'https://via.placeholder.com/200/200') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.img = img;
        this.button = el.button;
        this.id_product = el.id_product;
    }
    render() {
        `<div class="goods-item" data-id='${this.id_product}'>
                <img class="img" src=${this.img}>
                <h3 class="title">${this.product_name}</h3>
                <p class="price">${this.price} руб</p>
                <div class="button">Купить</div>
                </div>`;
    }
}

addProduct(element) {
    this.getJson(`${API}/addToBasket.json`)
        .then(data => {
            if (data.result === 1) {
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id + product === productId);
                if (find) {
                    find.quantity++;
                    this._updateCart(find);
                } else {
                    let product = {
                        id_product: productId,
                        price: +element.dataset['price'],
                        product_name: element.dataset['name'],
                        quantity: 1
                    };
                    this.goods = [product];
                    this.render();
                }
            } else {
                alert('Error');
            }
    })




}



class ProductList extends List {
    constructor(cart, container = '.container_goods-list', url = '/catalogData.json') {
        super(url, container);
        this.getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
               
            });
    }
     
    getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    sumOrder() { // метод подсчета общей суммы заказа
        let sum = 0;
        for (let product of this.goods) {
            sum += product.price;
        }
        console.log(sum);
    } 
    
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new GoodsItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }    
   
}

class GoodsItem {
    constructor(product, img = 'https://via.placeholder.com/200/200',) {
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
        this.button = product.button;
        this.id = product.id_product;

    }
    render() {

        return `<div class="goods-item" data-id='${this.id}'>
                <img class="img" src=${this.img}>
                <h3 class="title">${this.title}</h3>
                <p class="price">${this.price} руб</p>
                <div class="button">Купить</div>
                </div>`;
    }

}



let list = new ProductList();
const List = {
    ProductsList: GoodsItem
}
      


class Cart {

    constructor(container = '.cart-block') {
        this.container = container;
         this.goods = [];
         

        this.openCart();
        this.getCartItem()
             .then(data => {
                 this.goods = data.contents;
                 this.render();
             });
         
        this.addToCart();//  метод добавления в корзину

        this.removeFromCart(); // метод удаления с корзины
        this.plusProduct(); // метод увеличения количества товаров в корзине
        this.minusProduct();//метод уменьшения количества товаров в корзине
        this.render();
       
    }

    openCart() {
         
        const cartBtn = document.querySelector('.cart-button').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisiable');
        });
         
    }
    
    getCartItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
        })
    }
     
    render() {
        const cartBlock = document.querySelector('.cart-block');
        for (let product of this.goods) {
            const productObj = new ElementInCart();

            cartBlock.insertAdjacentHTML('beforeend', productObj.render(product));
        }
    }    


    addToCart(element) {

        
    }
    removeFromCart() {
         /*document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                
                let find = this.product.find(product => product.id_product === productId);
                if (find.quantity > 1) {
                    find.quantity--;
                } else {
                    
                 }
            }
        }) 
    }
    plusProduct() {

    }
    minusProduct() {

    }
}

class ElementInCart {

    render(product, img = 'https://via.placeholder.com/200/200') {
        return `<div class="cart-item" data-id="${product.id_product}">
        <div class="product-bio">
                <img class="img" src=${img}>
                <div class="product-desc">
                    <h3 class="title">${product.product_name}</h3>
                    <p class="price">${product.price} руб</p>
                    <p class="quantity">Количество штук: ${product.quantity}</p>
        </div>
                    <div class="right-block">
                 
                    <button class="del-btn" data-id="${product.id_product}">X</button>
                    </div>
                                 
                </div>
                </div>`;
    }
    
} 

new Cart();


 */