let shop = document.getElementById("shop");


//! track the add to cart items list
let basket = JSON.parse(localStorage.getItem("data"))||[];

let generateshop = () =>{
    return (shop.innerHTML = shopitemdata.map((x)=>{
        let {id,name,price,desc,img} = x;
        let search = basket.find((x) => x.id === id) || []
        return `
      <div id=product-id-${id} class="item"> <!--.item*4 -->
            <img width="220" height ="330" src=${img} alt="dress">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="increment(${id})" class="bi bi-plus-square"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined? 0 : search.item}
                        </div>
                        <i onclick="decrement(${id})" class="bi bi-dash-square"></i>

                    </div>
                </div>
            </div>
        </div>
    `
    }).join(""));
};
generateshop();

//! increment , decrement , and update


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
 

  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
      let search = basket.find((x) => x.id == id);
     document.getElementById(id).innerHTML = search.item;
     calculation();
};


// !calculating total items to the cart


let calculation = () =>{
    let carticon = document.getElementById("cartamount");
    carticon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y , 0);
}

calculation();