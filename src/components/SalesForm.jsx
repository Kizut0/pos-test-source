import { useMemo, useState } from "react";

export default function SalesForm({ products, onAddSale }) {
    const todayISO = new Date().toISOString().slice(0, 10);

    const [productName, setProductName] = useState(products[0]?.itemName || "");
    const [qty, setQty] = useState(1);
    const [date, setDate] = useState(todayISO);

    const product = useMemo(
        () => products.find((p) => p.itemName === productName),
        [products, productName]
    );

    const category = product?.category || "";
    const unitPrice = product?.unitPrice ?? 0;
    const total = Number(qty || 0) * Number(unitPrice || 0);

    function handleSubmit(e) {
        e.preventDefault();
        const q = Number(qty);

        if (!product) return;
        if (!Number.isFinite(q) || q <= 0) return;

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
                    <span>Category (Auto)</span>
                    <input value={category} disabled />
                </label>

                <label className="field">
                    <span>Qty</span>
                    <input
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                    />
                </label>

                <label className="field">
                    <span>Date</span>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>

                <div className="field">
                    <span>Total</span>
                    <div className="totalBox">฿{total.toLocaleString()}</div>
                </div>

                <button className="btn primary" type="submit">
                    Add Sale
                </button>
            </form>
        </div>
    );
}