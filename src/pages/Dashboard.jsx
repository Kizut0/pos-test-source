import { useEffect, useMemo, useState } from "react";
import KPICard from "../components/KPICard";
import { TrendLine, CategoryPie } from "../components/Charts";
import { loadSales } from "../utils/storage";
import {
    filterSalesByPeriod,
    sumSales,
    salesByCategory,
    topSellingItems,
    salesTrendByDay,
} from "../utils/analytics";

function money(n) {
    return `฿${Number(n || 0).toLocaleString()}`;
}

export default function Dashboard() {
    const [period, setPeriod] = useState("weekly");
    const [sales, setSales] = useState(() => loadSales());

    useEffect(() => {
        const refresh = () => setSales(loadSales());
        refresh();

        window.addEventListener("storage", refresh);
        document.addEventListener("visibilitychange", refresh);

        return () => {
            window.removeEventListener("storage", refresh);
            document.removeEventListener("visibilitychange", refresh);
        };
    }, []);

    const totalAllTime = useMemo(() => sumSales(sales), [sales]);

    const periodSales = useMemo(
        () => filterSalesByPeriod(sales, period),
        [sales, period]
    );
    const periodTotal = useMemo(() => sumSales(periodSales), [periodSales]);

    const pieData = useMemo(() => salesByCategory(periodSales), [periodSales]);
    const top5 = useMemo(() => topSellingItems(periodSales, 5), [periodSales]);
    const trend = useMemo(() => salesTrendByDay(periodSales), [periodSales]);

    return (
        <div className="stack">
            <div className="pageHead">
                <div>
                    <h1>Dashboard</h1>
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
                <KPICard label="Transactions (All Time)" value={`${sales.length}`} hint="Number of sales records" />
                <KPICard label="Transactions (Period)" value={`${periodSales.length}`} hint="Records in selected period" />
            </div>

            <div className="grid2">
                <TrendLine data={trend} />
                <CategoryPie data={pieData} />
            </div>

            <div className="card">
                <div className="cardTitle">Top 5 Selling Items</div>
                <div className="list">
                    {top5.length === 0 ? (
                        <div className="muted" style={{ padding: 12 }}>
                            No data for this period.
                        </div>
                    ) : (
                        top5.map((x, i) => (
                            <div className="listRow" key={x.name}>
                                <div className="rank">{i + 1}</div>
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

            <div className="hintBox">
                <b>Demo Tip:</b> If the dashboard looks empty, go to <b>Sales Journal</b> and click
                <b> “Seed Demo Data”</b> to generate sample transactions for chart visualization.
            </div>
        </div>
    );
}