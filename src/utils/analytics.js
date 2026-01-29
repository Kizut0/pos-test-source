export function sumSales(sales) {
    return sales.reduce((acc, s) => acc + (Number(s.total) || 0), 0);
}

export function filterSalesByPeriod(sales, period) {
    const now = new Date();
    const todayISO = now.toISOString().slice(0, 10);

    if (period === "daily") {
        return sales.filter((s) => s.date === todayISO);
    }

    if (period === "weekly") {
        const start = new Date(now);
        start.setDate(start.getDate() - 6);
        const startISO = start.toISOString().slice(0, 10);
        return sales.filter((s) => s.date >= startISO && s.date <= todayISO);
    }

    // monthly
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const startISO = `${yyyy}-${mm}-01`;
    return sales.filter((s) => s.date >= startISO && s.date <= todayISO);
}

function groupBy(arr, keyFn) {
    const map = new Map();
    for (const item of arr) {
        const k = keyFn(item);
        map.set(k, (map.get(k) || []).concat(item));
    }
    return map;
}

export function salesByCategory(sales) {
    const m = groupBy(sales, (s) => s.category);
    return Array.from(m.entries())
        .map(([name, items]) => ({
            name,
            value: items.reduce((a, s) => a + (Number(s.total) || 0), 0),
        }))
        .sort((a, b) => b.value - a.value);
}

export function topSellingItems(sales, n = 5) {
    const m = groupBy(sales, (s) => s.productName);
    return Array.from(m.entries())
        .map(([name, items]) => ({
            name,
            value: items.reduce((a, s) => a + (Number(s.total) || 0), 0),
            qty: items.reduce((a, s) => a + (Number(s.qty) || 0), 0),
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, n);
}

export function salesTrendByDay(sales) {
    const m = groupBy(sales, (s) => s.date);
    return Array.from(m.entries())
        .map(([date, items]) => ({
            date,
            sales: items.reduce((a, s) => a + (Number(s.total) || 0), 0),
        }))
        .sort((a, b) => (a.date > b.date ? 1 : -1));
}