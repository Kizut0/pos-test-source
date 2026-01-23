import { useEffect, useMemo, useState } from "react";
import { productItems } from "../data/productItems";
import SalesForm from "../components/SalesForm";
import SalesTable from "../components/SalesTable";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import {
    loadSales, saveSales,
    loadExpenses, saveExpenses,
    loadExpenseCategories, saveExpenseCategories,
    clearAllData
} from "../utils/storage";

export default function Journal() {
    const [sales, setSales] = useState(() => loadSales());
    const [expenses, setExpenses] = useState(() => loadExpenses());
    const [customCategories, setCustomCategories] = useState(() => loadExpenseCategories());

    useEffect(() => saveSales(sales), [sales]);
    useEffect(() => saveExpenses(expenses), [expenses]);
    useEffect(() => saveExpenseCategories(customCategories), [customCategories]);

    const sortedSales = useMemo(
        () => [...sales].sort((a, b) => (a.date < b.date ? 1 : -1)),
        [sales]
    );

    const sortedExpenses = useMemo(
        () => [...expenses].sort((a, b) => (a.date < b.date ? 1 : -1)),
        [expenses]
    );

    function addSale(s) {
        setSales((prev) => [s, ...prev]);
    }

    function deleteSale(id) {
        setSales((prev) => prev.filter((x) => x.id !== id));
    }

    function addCategory(cat) {
        setCustomCategories((prev) => {
            const normalized = cat.trim();
            if (!normalized) return prev;
            if (prev.some((c) => c.toLowerCase() === normalized.toLowerCase())) return prev;
            return [...prev, normalized];
        });
    }

    function addExpense(e) {
        setExpenses((prev) => [e, ...prev]);
    }

    function deleteExpense(id) {
        setExpenses((prev) => prev.filter((x) => x.id !== id));
    }

    function seedDemoData() {
        // quick demo to test charts
        const picks = productItems.slice(0, 12);
        const now = new Date();
        const demo = [];
        for (let i = 0; i < 25; i++) {
            const p = picks[Math.floor(Math.random() * picks.length)];
            const d = new Date(now);
            d.setDate(d.getDate() - Math.floor(Math.random() * 20));
            const iso = d.toISOString().slice(0, 10);
            const qty = 1 + Math.floor(Math.random() * 6);
            demo.push({
                id: crypto.randomUUID(),
                date: iso,
                productName: p.itemName,
                category: p.category,
                unitPrice: p.unitPrice,
                qty,
                total: qty * p.unitPrice,
            });
        }
        setSales((prev) => [...demo, ...prev]);

        const expCats = ["Rent", "Transport", "Utilities", "Marketing", ...customCategories];
        const demoExp = [];
        for (let i = 0; i < 12; i++) {
            const d = new Date(now);
            d.setDate(d.getDate() - Math.floor(Math.random() * 25));
            demoExp.push({
                id: crypto.randomUUID(),
                date: d.toISOString().slice(0, 10),
                category: expCats[Math.floor(Math.random() * expCats.length)],
                amount: 50 + Math.floor(Math.random() * 900),
                note: "demo",
            });
        }
        setExpenses((prev) => [...demoExp, ...prev]);
    }

    function resetAll() {
        clearAllData();
        setSales([]);
        setExpenses([]);
        setCustomCategories([]);
    }

    return (
        <div className="stack">
            <div className="pageHead">
                <div>
                    <h1>Sales Journal</h1>
                    <p className="muted">Record sales and expenses. Data is saved in localStorage.</p>
                </div>

                <div className="actions">
                    <button className="btn" type="button" onClick={seedDemoData}>
                        Seed Demo Data (Charts Test)
                    </button>
                    <button className="btn danger" type="button" onClick={resetAll}>
                        Clear All Data
                    </button>
                </div>
            </div>

            <SalesForm products={productItems} onAddSale={addSale} />
            <SalesTable sales={sortedSales} onDelete={deleteSale} />

            <ExpenseForm
                customCategories={customCategories}
                onAddCategory={addCategory}
                onAddExpense={addExpense}
            />
            <ExpenseTable expenses={sortedExpenses} onDelete={deleteExpense} />
        </div>
    );
}