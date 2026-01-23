import { useMemo, useState } from "react";
import KPICard from "../components/KPICard";
import { TrendLine, CategoryPie, ProductBar } from "../components/Charts";
import { loadSales, loadExpenses } from "../utils/storage";
import {
    filterSalesByPeriod,
    sumSales,
    sumExpenses,
    salesByCategory,
    salesByProduct,
    topSellingItems,
    salesTrendByDay,
} from "../utils/analytics";

function money(n) {
    return `฿${Number(n || 0).toLocaleString()}`;
}

export default function Dashboard() {
    const [period, setPeriod] = useState("weekly"); // daily | weekly | monthly

    const sales = useMemo(() => loadSales(), []);
    const expenses = useMemo(() => loadExpenses(), []);

    const totalAllTime = useMemo(() => sumSales(sales), [sales]);

    const periodSales = useMemo(() => filterSalesByPeriod(sales, period), [sales, period]);
    const periodTotal = useMemo(() => sumSales(periodSales), [periodSales]);

    const totalExpense = useMemo(() => sumExpenses(expenses), [expenses]);
    const net = useMemo(() => totalAllTime - totalExpense, [totalAllTime, totalExpense]);

    const pieData = useMemo(() => salesByCategory(periodSales), [periodSales]);
    const productData = useMemo(() => salesByProduct(periodSales).slice(0, 10), [periodSales]);
    const top5 = useMemo(() => topSellingItems(periodSales, 5), [periodSales]);
    const trend = useMemo(() => salesTrendByDay(periodSales), [periodSales]);

    return (
        <div className="stack">
            <div className="pageHead">
                <div>
                    <h1>Dashboard</h1>
                    <p className="muted">Sales insights (Daily / Weekly / Monthly). Charts update from your Journal data.</p>
                </div>

                <div className="seg">
                    <button className={period === "daily" ? "segBtn active" : "segBtn"} onClick={() => setPeriod("daily")}>
                        Daily
                    </button>
                    <button className={period === "weekly" ? "segBtn active" : "segBtn"} onClick={() => setPeriod("weekly")}>
                        Weekly
                    </button>
                    <button className={period === "monthly" ? "segBtn active" : "segBtn"} onClick={() => setPeriod("monthly")}>
                        Monthly
                    </button>
                </div>
            </div>

            <div className="kpiGrid">
                <KPICard label="Total Sales (All Time)" value={money(totalAllTime)} hint="Sum of all sales records" />
                <KPICard label={`Sales (${period})`} value={money(periodTotal)} hint="Filtered by selected period" />
                <KPICard label="Total Expenses" value={money(totalExpense)} hint="Sum of expense records" />
                <KPICard label="Net (Sales - Expenses)" value={money(net)} hint="Simple profit estimate" />
            </div>

            <div className="grid2">
                <TrendLine data={trend} />
                <CategoryPie data={pieData} />
            </div>

            <div className="grid2">
                <ProductBar data={productData} />

                <div className="card">
                    <div className="cardTitle">Top 5 Selling Items</div>
                    <div className="list">
                        {top5.length === 0 ? (
                            <div className="muted" style={{ padding: 12 }}>No data for this period.</div>
                        ) : (
                            top5.map((x, idx) => (
                                <div className="listRow" key={x.name}>
                                    <div className="rank">{idx + 1}</div>
                                    <div className="listMain">
                                        <div className="listTitle">{x.name}</div>
                                        <div className="listSub muted">Qty: {x.qty}</div>
                                    </div>
                                    <div className="listRight">{money(x.value)}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="hintBox">
                Tip: If the dashboard looks empty, go to <b>Sales Journal</b> and add transactions or click <b>Seed Demo Data</b>.
            </div>
        </div>
    );
}