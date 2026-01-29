import { useMemo, useState } from "react";

export default function SalesForm({
    products,
    categories,
    onAddCategory,
    onAddSale,
}) {
    const todayISO = new Date().toISOString().slice(0, 10);

    const [productName, setProductName] = useState(products[0]?.itemName || "");
    const [category, setCategory] = useState(categories[0] || "");
    const [newCategory, setNewCategory] = useState("");
    const [qty, setQty] = useState(1);
    const [date, setDate] = useState(todayISO);

    const product = useMemo(
        () => products.find((p) => p.itemName === productName),
        [products, productName]
    );


    useMemo(() => {
        if (product?.category && categories.includes(product.category)) {
            setCategory(product.category);
        }
    }, [product, categories]);

    const unitPrice = product?.unitPrice ?? 0;
    const total = Number(qty || 0) * Number(unitPrice || 0);

    function handleAddCategory() {
        const c = newCategory.trim();
        if (!c) return;

        const isDuplicate = categories.some(
            (x) => x.toLowerCase() === c.toLowerCase()
        );

        if (isDuplicate) {
            alert("This category already exists.");
            return;
        }

        onAddCategory(c);
        setCategory(c);
        setNewCategory("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        const q = Number(qty);
        if (!product || !category || !Number.isFinite(q) || q <= 0) return;

        onAddSale({
            id: crypto.randomUUID(),
            date,
            productName: product.itemName,
            category,
            unitPrice: product.unitPrice,
            qty: q,
            total,
        });

        setQty(1);
        setDate(todayISO);
    }

    return (
        <div className="card">
            <div className="cardTitle">Record New Sale</div>

            <form className="gridForm" onSubmit={handleSubmit}>
                <label className="field">
                    <span>Product</span>
                    <select value={productName} onChange={(e) => setProductName(e.target.value)}>
                        {products.map((p) => (
                            <option key={p.itemName} value={p.itemName}>
                                {p.itemName} • ฿{p.unitPrice}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="field">
                    <span>Category</span>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </label>

                <label className="field">
                    <span>Qty</span>
                    <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
                </label>

                <label className="field">
                    <span>Date</span>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>

                <div className="field">
                    <span>Total</span>
                    <div className="totalBox">฿{total.toLocaleString()}</div>
                </div>

                <button className="btn primary" type="submit">Add Sale</button>
            </form>

            <div className="hr" />

            <div className="addCatRow">
                <div className="muted" style={{ fontSize: 13 }}>
                    Add new sale category (saved)
                </div>

                <div className="addCatControls">
                    <input
                        placeholder="New category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button className="btn" type="button" onClick={handleAddCategory}>
                        Add Category
                    </button>
                </div>
            </div>
        </div>
    );
}