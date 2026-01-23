const KEYS = {
    SALES: "pos-sales",
    EXPENSES: "pos-expenses",
    CUSTOM_EXPENSE_CATEGORIES: "pos-expense-categories",
};

function safeParse(json, fallback) {
    try {
        const v = JSON.parse(json);
        return v ?? fallback;
    } catch {
        return fallback;
    }
}

export function loadSales() {
    return safeParse(localStorage.getItem(KEYS.SALES), []);
}
export function saveSales(sales) {
    localStorage.setItem(KEYS.SALES, JSON.stringify(sales));
}

export function loadExpenses() {
    return safeParse(localStorage.getItem(KEYS.EXPENSES), []);
}
export function saveExpenses(expenses) {
    localStorage.setItem(KEYS.EXPENSES, JSON.stringify(expenses));
}

export function loadExpenseCategories() {
    return safeParse(localStorage.getItem(KEYS.CUSTOM_EXPENSE_CATEGORIES), []);
}
export function saveExpenseCategories(categories) {
    localStorage.setItem(KEYS.CUSTOM_EXPENSE_CATEGORIES, JSON.stringify(categories));
}

export function clearAllData() {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}