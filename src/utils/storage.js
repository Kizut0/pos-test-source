const SALES_KEY = "pos-sales";
const SALE_CATS_KEY = "pos-sale-categories";
const PRODUCT_KEY = "pos-products";

export function loadProducts(defaultProducts = []) {
    try {
        const saved = JSON.parse(localStorage.getItem(PRODUCT_KEY));
        return saved?.length ? saved : defaultProducts;
    } catch {
        return defaultProducts;
    }
}

export function saveProducts(products) {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
}

export function loadSales() {
    try {
        return JSON.parse(localStorage.getItem(SALES_KEY)) || [];
    } catch {
        return [];
    }
}

export function saveSales(sales) {
    localStorage.setItem(SALES_KEY, JSON.stringify(sales));
}

export function loadSaleCategories() {
    try {
        return JSON.parse(localStorage.getItem(SALE_CATS_KEY)) || [];
    } catch {
        return [];
    }
}

export function saveSaleCategories(categories) {
    localStorage.setItem(SALE_CATS_KEY, JSON.stringify(categories));
}

export function clearAllData() {
    localStorage.removeItem(SALES_KEY);
    localStorage.removeItem(SALE_CATS_KEY);
}