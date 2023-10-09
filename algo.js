var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var currListValue;
var currentList = function (list) {
    localStorage.setItem('listFilter', list);
    currListValue = list;
};
var fetchAllCategories = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, categoriesList_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('https://fakestoreapi.com/products/categories', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                sessionStorage.setItem('categories', JSON.stringify(data));
                categoriesList_1 = document.getElementById('categoriesContainer');
                data.forEach(function (category) {
                    var categoryElement = document.createElement('a');
                    categoryElement.href = './ProductsList.html';
                    categoryElement.addEventListener('click', function () {
                        currentList(category);
                        console.log(currListValue);
                    });
                    categoryElement.textContent = category;
                    console.log(category);
                    categoriesList_1 === null || categoriesList_1 === void 0 ? void 0 : categoriesList_1.appendChild(categoryElement);
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log("Unable to fetch categories: ".concat(error_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var createProductCard = function (product) {
    console.log(product);
    var truncateTitle = function (text) {
        var words = text.split(' ');
        if (words.length > 5) {
            return words.slice(0, 5).join(' ') + '...';
        }
        return text;
    };
    var card = document.createElement('a');
    card.classList.add('card-container');
    card.href = './Details.html';
    card.addEventListener('click', function () {
        localStorage.setItem('product', JSON.stringify(product));
    });
    card.innerHTML = "\n    <div class=\"image-container\">\n    <img src=".concat(product.image, "></img></div>\n    <div class=\"card-body\"><div class=\"body-left\">\n    <h2 class=\"card-title\">").concat(truncateTitle(product.title), "</h2>\n    <p class=\"product-category\">").concat(product.category, "</p>\n    <div class=\"ratings\">\n    <p>").concat(product.rating.rate, "</p>\n    <p>(").concat(product.rating.count, ")</p>\n    </div>\n    <div class=\"cart-button\">\n    <button class=\"add-to-cart\">Add to Cart</button></div>\n    </div>\n    <div class=\"body-right\"><p>\u20B9\n    ").concat(product.price, "</p></div>\n    </div>\n    \n    \n    \n    ");
    var cartButton = document.querySelector('.add-to-cart');
    if (cartButton) {
        cartButton.addEventListener('click', function () {
            var existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            existingCart.push(product.id);
            localStorage.setItem('cart', JSON.stringify(existingCart));
        });
    }
    return card;
};
var fetchProducts = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, productsList_1, filterValue_1, categoryName, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('https://fakestoreapi.com/products', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                productsList_1 = document.querySelector('.products-list');
                console.log(data);
                filterValue_1 = localStorage.getItem('listFilter');
                console.log("filter value IS ".concat(filterValue_1));
                categoryName = document.querySelector('.list-category');
                if (filterValue_1 !== 'all') {
                    data = data.filter(function (product) { return product.category === filterValue_1; });
                    if (categoryName !== null) {
                        categoryName.textContent = filterValue_1;
                    }
                }
                else {
                    if (categoryName !== null) {
                        categoryName.textContent = 'All Products';
                    }
                }
                data.forEach(function (product) {
                    var productCard = createProductCard(product);
                    productsList_1 === null || productsList_1 === void 0 ? void 0 : productsList_1.appendChild(productCard);
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log("Unable to fetch products: ".concat(error_2));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
document.addEventListener('DOMContentLoaded', function () {
    var product;
    var fetchProductDetails = function () {
        var productString = localStorage.getItem('product');
        if (productString !== null) {
            product = JSON.parse(productString);
        }
        if (!product) {
            console.log('Product data not found in localStorage.');
            return;
        }
        var detailsContainer = document.querySelector('.product-details-container');
        var detailsElement = document.createElement('div');
        detailsElement.classList.add('details-element');
        detailsElement.innerHTML = "\n           <div class=\"details-left\">\n            <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\">\n        </div>\n        <div class=\"details-right\">\n            <h2>").concat(product.title, "</h2>\n            <p class=\"description\">").concat(product.description, "</p>\n            <div class=\"ratings\">\n                <p>").concat(product.rating.rate, "</p>\n                <p>(").concat(product.rating.count, ")</p>\n            </div>\n            <div class=\"price\">\n                $").concat(product.price, "\n            </div>\n            <div class=\"cart-button\">\n                <button class=\"add-to-cart\">Add to Cart</button>\n            </div>\n        </div>\n        ");
        detailsContainer === null || detailsContainer === void 0 ? void 0 : detailsContainer.appendChild(detailsElement);
    };
    fetchProductDetails();
    var cartButton = document.querySelector('.add-to-cart');
    if (cartButton) {
        cartButton.addEventListener('click', function () {
            var existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            existingCart.push(product.id);
            localStorage.setItem('cart', JSON.stringify(existingCart));
        });
    }
});
var updateTotalValue = function () { return __awaiter(_this, void 0, void 0, function () {
    var cartItemsId, totalValue, _i, cartItemsId_1, id, data, error_3, amountSum;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cartItemsId = JSON.parse(localStorage.getItem('cart') || '[]');
                totalValue = 0;
                _i = 0, cartItemsId_1 = cartItemsId;
                _a.label = 1;
            case 1:
                if (!(_i < cartItemsId_1.length)) return [3 /*break*/, 6];
                id = cartItemsId_1[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, getProductData(id)];
            case 3:
                data = _a.sent();
                totalValue += data.price;
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error(error_3);
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6:
                amountSum = document.querySelector("#amount-total");
                if (amountSum !== null) {
                    amountSum.innerHTML = totalValue.toString();
                }
                return [2 /*return*/];
        }
    });
}); };
var deleteCartItem = function (element) { return __awaiter(_this, void 0, void 0, function () {
    var itemId, cartItemsId, itemIndex;
    return __generator(this, function (_a) {
        itemId = parseInt(element.getAttribute('data-id'));
        cartItemsId = JSON.parse(localStorage.getItem('cart') || '[]');
        itemIndex = cartItemsId.indexOf(itemId);
        if (itemIndex !== -1) {
            cartItemsId.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cartItemsId));
            element.parentElement.parentElement.remove();
            updateTotalValue();
        }
        return [2 /*return*/];
    });
}); };
var fetchCartItems = function () { return __awaiter(_this, void 0, void 0, function () {
    var cartList, cartItemsId, amountSum, totalValue, itemParent, _i, cartItemsId_2, id, data, item, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cartList = document.querySelector('.cart-list-left');
                return [4 /*yield*/, JSON.parse(localStorage.getItem('cart'))];
            case 1:
                cartItemsId = (_a.sent()) || [];
                amountSum = document.querySelector("#amount-total");
                totalValue = 0;
                console.log("fetching cart items");
                itemParent = document.createElement('div');
                _i = 0, cartItemsId_2 = cartItemsId;
                _a.label = 2;
            case 2:
                if (!(_i < cartItemsId_2.length)) return [3 /*break*/, 7];
                id = cartItemsId_2[_i];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                console.log("id is ".concat(id));
                return [4 /*yield*/, getProductData(id)];
            case 4:
                data = _a.sent();
                console.log(data);
                totalValue += data.price;
                item = document.createElement('div');
                item.classList.add('cart-item');
                item.innerHTML = "\n            <div class=\"cart-item-left\">\n            <img src=\"".concat(data.image, "\" alt=\"").concat(data.title, "\"></img>\n          </div>\n          <div class=\"cart-item-right\">\n            <h3>").concat(data.title, "</h3>\n            <p class=\"category\">Category: ").concat(data.category, "</p>\n        \n            <p class=\"price\">Price: ").concat(data.price, "</p>\n            <button class=\"delete-item\" data-id=\"").concat(id, "\" onClick=\"deleteCartItem(this)\">Delete</button>\n          </div>\n      ");
                console.log(totalValue);
                itemParent === null || itemParent === void 0 ? void 0 : itemParent.appendChild(item);
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.error(error_4);
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7:
                if (amountSum !== null) {
                    amountSum.innerHTML = totalValue.toString();
                }
                cartList === null || cartList === void 0 ? void 0 : cartList.append(itemParent);
                return [2 /*return*/];
        }
    });
}); };
var getProductData = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var response, data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(id), {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
            case 3:
                error_5 = _a.sent();
                throw error_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
document.addEventListener('DOMContentLoaded', function () {
    var currentPage = window.location.pathname;
    console.log(currentPage);
    if (currentPage === '/') {
    }
    else if (currentPage.startsWith('/pages/Home')) {
        fetchAllCategories();
    }
    else if (currentPage.startsWith('/pages/ProductsList')) {
        console.log('rrrr');
        fetchProducts();
        fetchAllCategories();
    }
    else if (currentPage.startsWith('/pages/Details')) {
        console.log('product details');
    }
    else if (currentPage.startsWith('/pages/Cart')) {
        console.log('cart');
        fetchCartItems();
    }
});
