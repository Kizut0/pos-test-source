export default function KPICard({ label, value, hint }) {
    return (
        <div className="card kpi">
            <div className="kpiLabel">{label}</div>
            <div className="kpiValue">{value}</div>
            {hint ? <div className="kpiHint">{hint}</div> : null}
        </div>
    );
}