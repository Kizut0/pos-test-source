import { useMemo, useState } from "react";
import { nanoid } from "nanoid";

const DEFAULT_CATEGORIES = ["Rent", "Transport", "Utilities", "Supplies", "Marketing", "Other"];

export default function ExpenseForm({
    customCategories,
    onAddCategory,
    onAddExpense,
}) {
    const todayISO = new Date().toISOString().slice(0, 10);
    const allCategories = useMemo(() => {
        const merged = [...DEFAULT_CATEGORIES, ...customCategories];
        return Array.from(new Set(merged));
    }, [customCategories]);

    const [date, setDate] = useState(todayISO);
    const [category, setCategory] = useState(allCategories[0] || "Other");
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState("");

    const [newCat, setNewCat] = useState("");

    function addNewCategory() {
        const v = newCat.trim();
        if (!v) return;
        onAddCategory(v);
        setCategory(v);
        setNewCat("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        const a = Number(amount);
        if (!Number.isFinite(a) || a <= 0) return;

        onAddExpense({
            id: nanoid(),
            date,
            category,
            amount: a,
            note: note.trim(),
        });

        setAmount(0);
        setNote("");
        setDate(todayISO);
    }

    return (
        <div className="card">
            <div className="cardTitle">Record Expense</div>

            <div className="rowGap">
                <div className="inlineAdd">
                    <input
                        placeholder="Add new spending category (saved)"
                        value={newCat}
                        onChange={(e) => setNewCat(e.target.value)}
                    />
                    <button className="btn" type="button" onClick={addNewCategory}>
                        Save Category
                    </button>
                </div>

                <form className="gridForm" onSubmit={handleSubmit}>
                    <label className="field">
                        <span>Date</span>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </label>

                    <label className="field">
                        <span>Category</span>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            {allCategories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </label>

                    <label className="field">
                        <span>Amount</span>
                        <input
                            type="number"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </label>

                    <label className="field">
                        <span>Note</span>
                        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="(optional)" />
                    </label>

                    <button className="btn primary" type="submit">
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
}