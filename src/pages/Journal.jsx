import { useEffect, useMemo, useState } from "react";
import { productItems } from "../data/productItems";
import SalesForm from "../components/SalesForm";
import SalesTable from "../components/SalesTable";
import {
    loadSales,
    saveSales,
    loadSaleCategories,
    saveSaleCategories,
    clearAllData,
} from "../utils/storage";

export default function Journal() {
    const [sales, setSales] = useState(() => loadSales());

    const defaultCats = useMemo(
        () => Array.from(new Set(productItems.map((p) => p.category))),
        []
    );

    const [categories, setCategories] = useState(() => {
        const saved = loadSaleCategories();
        const merged = [...defaultCats];

        for (const c of saved) {
            const cc = String(c).trim();
            if (!cc) continue;
            if (!merged.some((x) => x.toLowerCase() === cc.toLowerCase())) merged.push(cc);
        }
        return merged;
    });

    useEffect(() => saveSales(sales), [sales]);
    useEffect(() => saveSaleCategories(categories), [categories]);

    function addSale(newSale) {
        setSales((prev) => [newSale, ...prev]);
    }

    function deleteSale(id) {
        setSales((prev) => prev.filter((s) => s.id !== id));
    }

    function addCategory(cat) {
        const c = String(cat).trim();
        if (!c) return;

        setCategories((prev) => {
            if (prev.some((x) => x.toLowerCase() === c.toLowerCase())) return prev;
            return [...prev, c];
        });
    }

    function seedDemoData() {
        const now = new Date();
        const demo = [];

        for (let i = 0; i < 25; i++) {
            const p = productItems[Math.floor(Math.random() * productItems.length)];
            const d = new Date(now);
            d.setDate(d.getDate() - Math.floor(Math.random() * 20));
            const qty = 1 + Math.floor(Math.random() * 5);

            demo.push({
                id: crypto.randomUUID(),
                date: d.toISOString().slice(0, 10),
                productName: p.itemName,
                category: p.category,
                unitPrice: p.unitPrice,
                qty,
                total: qty * p.unitPrice,
            });
        }

        setSales((prev) => [...demo, ...prev]);
    }

    function resetAll() {
        clearAllData();
        setSales([]);
        setCategories(defaultCats);
    }

    return (
        <div className="stack">
            <div className="pageHead">
                <div>
                    <h1>Sales Journal</h1>
                </div>

                <div className="actions">
                    <button className="btn" type="button" onClick={seedDemoData}>
                        Seed Demo Data
                    </button>
                    <button className="btn danger" type="button" onClick={resetAll}>
                        Clear All Data
                    </button>
                </div>
            </div>

            <SalesForm
                products={productItems}
                categories={categories}
                onAddCategory={addCategory}
                onAddSale={addSale}
            />

            <SalesTable sales={sales} onDelete={deleteSale} />
        </div>
    );
}