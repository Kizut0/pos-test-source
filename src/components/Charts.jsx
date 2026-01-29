import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from "recharts";

function fmtMoney(n) {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
        Number(n || 0)
    );
}

export function TrendLine({ data }) {
    return (
        <div className="card">
            <div className="cardTitle">Sales Trend</div>
            <div className="chartBox">
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v) => fmtMoney(v)} />
                        <Line type="monotone" dataKey="sales" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function CategoryPie({ data }) {
    const colors = [
        "#60a5fa",
        "#34d399",
        "#fbbf24",
        "#f87171",
        "#a78bfa",
        "#fb7185",
        "#22c55e",
        "#f97316",
        "#06b6d4",
    ];

    return (
        <div className="card">
            <div className="cardTitle">Sales by Category</div>
            <div className="chartBox">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Tooltip formatter={(v) => fmtMoney(v)} />
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={55}
                            outerRadius={90}
                            paddingAngle={2}
                        >
                            {data.map((_, i) => (
                                <Cell key={i} fill={colors[i % colors.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="legend">
                {data.map((d, i) => (
                    <div className="legendItem" key={d.name}>
                        <span className="dot" style={{ background: colors[i % colors.length] }} />
                        <span className="legendName">{d.name}</span>
                        <span className="legendVal">{fmtMoney(d.value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}