import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import "./widgets.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ProgressChart({ series }) {
  const data = useMemo(() => {
    const labels = (series || []).map((p) => p.label);
    const values = (series || []).map((p) => p.value);

    return {
      labels,
      datasets: [
        {
          label: "Weekly Score",
          data: values,
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59,130,246,0.12)",
          tension: 0.35,
          fill: true,
          pointRadius: 3
        }
      ]
    };
  }, [series]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: "rgba(229,231,235,0.8)" }, ticks: { color: "#6B7280" } },
        x: { grid: { display: false }, ticks: { color: "#6B7280" } }
      }
    }),
    []
  );

  return (
    <div className="card">
      <div className="cardHeader">
        <div style={{ fontWeight: 850 }}>Progress Trend</div>
        <span className="pill">Last 6 weeks</span>
      </div>
      <div className="cardBody" style={{ height: 220 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
