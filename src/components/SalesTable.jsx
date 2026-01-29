import { useMemo, useState } from "react";

function formatDateDMY(isoDate) {
    if (!isoDate) return "";
    const [y, m, d] = String(isoDate).split("-");
    if (!y || !m || !d) return String(isoDate);
    return `${d}-${m}-${y}`;
}

export default function SalesTable({ sales, onDelete }) {
    const [sort, setSort] = useState({ key: "date", dir: "desc" });

    function toggleSort(key) {
        setSort((prev) => {
            if (prev.key === key) {
                return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
            }
            return { key, dir: "asc" };
        });
    }

    const sortedSales = useMemo(() => {
        const dirMul = sort.dir === "asc" ? 1 : -1;
        const numericKeys = new Set(["unitPrice", "qty", "total"]);

        const compare = (a, b) => {
            const av = a?.[sort.key];
            const bv = b?.[sort.key];

            if (numericKeys.has(sort.key)) {
                return (Number(av) - Number(bv)) * dirMul;
            }

            return String(av ?? "").localeCompare(String(bv ?? "")) * dirMul;
        };

        return [...sales].sort(compare);
    }, [sales, sort]);

    const arrow = (key) =>
        sort.key === key ? (sort.dir === "asc" ? " ▲" : " ▼") : "";

    const Th = ({ k, children, right }) => (
        <th
            onClick={() => toggleSort(k)}
            style={{
                cursor: "pointer",
                userSelect: "none",
                textAlign: right ? "right" : "left",
                whiteSpace: "nowrap",
            }}
            title="Click to sort"
        >
            {children}
            <span style={{ opacity: 0.85 }}>{arrow(k)}</span>
        </th>
    );

    return (
        <div className="card">
            <div className="cardTitle">Transactions</div>

            <div className="tableWrap">
                <table>
                    <thead>
                        <tr>
                            <Th k="date">Date</Th>
                            <Th k="productName">Product</Th>
                            <Th k="category">Category</Th>
                            <Th k="unitPrice" right>Unit</Th>
                            <Th k="qty" right>Qty</Th>
                            <Th k="total" right>Total</Th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {sortedSales.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ padding: 16, opacity: 0.7 }}>
                                    No transactions yet.
                                </td>
                            </tr>
                        ) : (
                            sortedSales.map((s) => (
                                <tr key={s.id}>
                                    <td>{formatDateDMY(s.date)}</td>
                                    <td>{s.productName}</td>
                                    <td>{s.category}</td>
                                    <td style={{ textAlign: "right" }}>฿{Number(s.unitPrice).toLocaleString()}</td>
                                    <td style={{ textAlign: "right" }}>{s.qty}</td>
                                    <td style={{ textAlign: "right" }}>฿{Number(s.total).toLocaleString()}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button className="btn danger" type="button" onClick={() => onDelete(s.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}