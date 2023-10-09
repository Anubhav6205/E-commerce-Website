let currListValue: string

const currentList = (list: string) => {
    localStorage.setItem('listFilter', list)
    currListValue = list
}

const fetchAllCategories = async () => {
    try {
        const response = await fetch(
            'https://fakestoreapi.com/products/categories',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const data = await response.json()
        sessionStorage.setItem('categories', JSON.stringify(data))
        const categoriesList = document.getElementById('categoriesContainer')
        data.forEach((category: string) => {
            const categoryElement = document.createElement('a')
            categoryElement.href = './ProductsList.html'
            categoryElement.addEventListener('click', () => {
                currentList(category)
                console.log(currListValue)
            })

            categoryElement.textContent = category
            console.log(category)
            categoriesList?.appendChild(categoryElement)
        })
    } catch (error) {
        console.log(`Unable to fetch categories: ${error}`)
    }
}

const createProductCard = (product: any) => {
    console.log(product)



    const truncateTitle = (text) => {
        const words = text.split(' ')
        if (words.length > 5) {
            return words.slice(0, 5).join(' ') + '...'
        }
        return text;
    }




    const card = document.createElement('a')
    card.classList.add('card-container')
    card.href = './Details.html'
    card.addEventListener('click', () => {
        localStorage.setItem('product', JSON.stringify(product))
    })
    card.innerHTML = `
    <div class="image-container">
    <img src=${product.image}></img></div>
    <div class="card-body"><div class="body-left">
    <h2 class="card-title">${truncateTitle(product.title)}</h2>
    <p class="product-category">${product.category}</p>
    <div class="ratings">
    <p>${product.rating.rate}</p>
    <p>(${product.rating.count})</p>
    </div>
    <div class="cart-button">
    <button class="add-to-cart">Add to Cart</button></div>
    </div>
    <div class="body-right"><p>₹
    ${product.price}</p></div>
    </div>
    
    
    
    `


    const cartButton = document.querySelector('.add-to-cart')
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            const existingCart =
                JSON.parse(localStorage.getItem('cart') as string) || []
            existingCart.push(product.id)
            localStorage.setItem('cart', JSON.stringify(existingCart))
        })
    }

    return card;
}

const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json()

        const productsList = document.querySelector('.products-list')
        console.log(data)
        const filterValue = localStorage.getItem('listFilter')
        console.log(`filter value IS ${filterValue}`)
        let categoryName = document.querySelector('.list-category')
        if (filterValue !== 'all') {
            data = data.filter((product: any) => product.category === filterValue)
            if (categoryName !== null) {
                categoryName.textContent = filterValue
            }
        } else {
            if (categoryName !== null) {
                categoryName.textContent = 'All Products'
            }
        }

        data.forEach((product: any) => {
            const productCard = createProductCard(product)
            productsList?.appendChild(productCard)
        })
    } catch (error) {
        console.log(`Unable to fetch products: ${error}`)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let product
    const fetchProductDetails = () => {
        const productString = localStorage.getItem('product')

        if (productString !== null) {
            product = JSON.parse(productString)
        }

        if (!product) {
            console.log('Product data not found in localStorage.')
            return
        }

        const detailsContainer = document.querySelector(
            '.product-details-container'
        )
        const detailsElement = document.createElement('div')
        detailsElement.classList.add('details-element')
        detailsElement.innerHTML = `
           <div class="details-left">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="details-right">
            <h2>${product.title}</h2>
            <p class="description">${product.description}</p>
            <div class="ratings">
                <p>${product.rating.rate}</p>
                <p>(${product.rating.count})</p>
            </div>
            <div class="price">
                $${product.price}
            </div>
            <div class="cart-button">
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
        `

        detailsContainer?.appendChild(detailsElement)
    }

    fetchProductDetails()

    const cartButton = document.querySelector('.add-to-cart')
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            const existingCart =
                JSON.parse(localStorage.getItem('cart') as string) || []
            existingCart.push(product.id)
            localStorage.setItem('cart', JSON.stringify(existingCart))
        })
    }
})

const updateTotalValue = async () => {
    const cartItemsId = JSON.parse(localStorage.getItem('cart') || '[]');
    let totalValue = 0;

    for (const id of cartItemsId) {
        try {
            const data = await getProductData(id);
            totalValue += data.price;
        } catch (error) {
            console.error(error);
        }
    }

    const amountSum = document.querySelector("#amount-total");
    if (amountSum !== null) {
        amountSum.innerHTML = totalValue.toString();
    }
};


const deleteCartItem = async (element) => {
    const itemId = parseInt(element.getAttribute('data-id'));
    const cartItemsId = JSON.parse(localStorage.getItem('cart') || '[]');



    const itemIndex = cartItemsId.indexOf(itemId);



    if (itemIndex !== -1) {

        cartItemsId.splice(itemIndex, 1);



        localStorage.setItem('cart', JSON.stringify(cartItemsId));


        element.parentElement.parentElement.remove();

        updateTotalValue();
    }
};



const fetchCartItems = async () => {
    const cartList = document.querySelector('.cart-list-left');
    const cartItemsId = await JSON.parse(localStorage.getItem('cart') as string) || [];
    const amountSum = document.querySelector("#amount-total");
    let totalValue = 0;

    console.log("fetching cart items");
    const itemParent = document.createElement('div');

    for (const id of cartItemsId) {
        try {
            console.log(`id is ${id}`)
            const data = await getProductData(id);
            console.log(data);
            totalValue += data.price;
            const item = document.createElement('div');
            item.classList.add('cart-item');
            item.innerHTML = `
            <div class="cart-item-left">
            <img src="${data.image}" alt="${data.title}"></img>
          </div>
          <div class="cart-item-right">
            <h3>${data.title}</h3>
            <p class="category">Category: ${data.category}</p>
        
            <p class="price">Price: ${data.price}</p>
            <button class="delete-item" data-id="${id}" onClick="deleteCartItem(this)">Delete</button>
          </div>
      `;

            console.log(totalValue);

            itemParent?.appendChild(item);
        } catch (error) {
            console.error(error);
        }

    }
    if (amountSum !== null) {
        amountSum.innerHTML = totalValue.toString();

    }
    cartList?.append(itemParent);
};

const getProductData = async (id: any) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};



document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname
    console.log(currentPage)
    if (currentPage === '/') {
    } else if (currentPage.startsWith('/pages/Home')) {
        fetchAllCategories()
    } else if (currentPage.startsWith('/pages/ProductsList')) {
        console.log('rrrr')
        fetchProducts()
        fetchAllCategories()
    } else if (currentPage.startsWith('/pages/Details')) {
        console.log('product details')
    } else if (currentPage.startsWith('/pages/Cart')) {
        console.log('cart')
        fetchCartItems()
    }
})
