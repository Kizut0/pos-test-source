export default function SalesTable({ sales, onDelete }) {
    return (
        <div className="card">
            <div className="cardTitle">Transactions</div>

            <div className="tableWrap">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th style={{ textAlign: "right" }}>Unit</th>
                            <th style={{ textAlign: "right" }}>Qty</th>
                            <th style={{ textAlign: "right" }}>Total</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ padding: 16, opacity: 0.7 }}>
                                    No transactions yet.
                                </td>
                            </tr>
                        ) : (
                            sales.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.date}</td>
                                    <td>{s.productName}</td>
                                    <td>{s.category}</td>
                                    <td style={{ textAlign: "right" }}>฿{Number(s.unitPrice).toLocaleString()}</td>
                                    <td style={{ textAlign: "right" }}>{s.qty}</td>
                                    <td style={{ textAlign: "right" }}>฿{Number(s.total).toLocaleString()}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button className="btn danger" onClick={() => onDelete(s.id)} type="button">
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