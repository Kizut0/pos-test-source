const SALES_KEY = "pos-sales";
const SALE_CATS_KEY = "pos-sale-categories";

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