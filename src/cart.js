
let label = document.getElementById("label")
let shoppingcart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data"))||[];
let calculation = () =>{
    let carticon = document.getElementById("cartamount");
    carticon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y , 0);
}

calculation();

let generatecartitems = ()=>{
if(basket.length !== 0) {
return (shoppingcart.innerHTML = basket.map((x) =>{
  
let {id , item} = x;

let search = shopitemdata.find((y)=> y.id === id) || [];
let {img,name,price} = search
    return `
    <div class = "cart-item"> 
            <img width="220" src=${img} alt="dress"/>
              <div class = "details"> 
                <div class = "title-price-x">
                <h4 class="title-price">
                 <p>${name}</p>
                 <p class="cart-item-price">$ ${price}</p>
                </h4>
                <i onclick="removeitem(${id})"class="bi bi-x-lg"></i>
                </div>

                  <div class="buttons">
                        <i onclick="increment(${id})" class="bi bi-plus-square"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="decrement(${id})" class="bi bi-dash-square"></i>

                    </div> 

                  <h3>$ ${item * search.price}</h3>
              </div>
    </div>
    `;
} ).join(""));
}

else {
shoppingcart.innerHTML =  ``;
label.innerHTML = `
<h2>Cart Is Empty</h2>
<a href = "index.html">
<button class = "homebtn">Back to home</button>
</a>
`

}
};
generatecartitems();

let increment = (id) => {
    let selecteditem = id;
    let search = basket.find((x)=> x.id === selecteditem.id);

    if(search === undefined) {
        basket.push({
            id: selecteditem.id,
            item:1,
        });
    }
    else {
        search.item += 1;
    }
    generatecartitems();
    //!local storage setup
    localStorage.setItem("data", JSON.stringify(basket));
  update(selecteditem.id);
};
let decrement = (id) => {
    let selecteditem = id;
    let search = basket.find((x)=> x.id === selecteditem.id);
    if(search === undefined) return
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selecteditem.id);
    basket = basket.filter((x)=>x.item !== 0);
    generatecartitems();

  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id == id);
   document.getElementById(id).innerHTML = search.item;
   calculation();
   totalamount();
};

let removeitem =(id) =>{
let selecteditem = id;
//console.log(selecteditem.id);
basket = basket.filter((x) => x.id !== selecteditem.id);

generatecartitems();
totalamount();
calculation();

localStorage.setItem("data", JSON.stringify(basket));
}

let clearcart = ()=>{
    basket=[]
    generatecartitems();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));


}

let totalamount = ()=>{
    if(basket.length !==0) {
let amount = basket.map((x)=>{
    let {item,id} = x;
    let search = shopitemdata.find((y)=> y.id === id) || [];
    return item * search.price
}).reduce((x,y)=>x+y,0)

label.innerHTML = `
<h2> Total Bill : $ ${amount}</h2>
<button class ="checkout">Checkout</button>
<button onclick="clearcart()" class ="removeall">Clear Cart</button>

`
    }
    else return;
}
totalamount();