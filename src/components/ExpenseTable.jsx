export default function ExpenseTable({ expenses, onDelete }) {
    return (
        <div className="card">
            <div className="cardTitle">Expense Transactions</div>

            <div className="tableWrap">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Note</th>
                            <th style={{ textAlign: "right" }}>Amount</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: 16, opacity: 0.7 }}>
                                    No expenses yet.
                                </td>
                            </tr>
                        ) : (
                            expenses.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.date}</td>
                                    <td>{e.category}</td>
                                    <td>{e.note || "-"}</td>
                                    <td style={{ textAlign: "right" }}>฿{Number(e.amount).toLocaleString()}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button className="btn danger" type="button" onClick={() => onDelete(e.id)}>
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