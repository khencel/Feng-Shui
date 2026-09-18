"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import UpperIndexTable from "../../../../../components/charts/upper";
import MiddleIndexTable from "../../../../../components/charts/middle";
import LowerIndexTable from "../../../../../components/charts/lower";



export default function ChartPage() {
  const router = useRouter();
  const params = useParams();

  const category = params.category as string

  const [activePeriod, setActivePeriod] = useState(1);

  const handleCreateChart = () => {
    const chartType = {
      1: "upper",
      2: "middle",
      3: "lower",
    }[activePeriod];

    // router.push(`/charts/create/${chartType}?period=${activePeriod}`);
    router.push(`/charts/${category}/create/${activePeriod}`)
  };

  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h5 className="h5 mb-0">Chart Management</h5>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">

          {/* Period Bubble Tabs */}
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="period-tabs">
              {[1, 2, 3].map((period) => (
                <button
                  key={period}
                  type="button"
                  className={`period-tab ${
                    activePeriod === period ? "active" : ""
                  }`}
                  onClick={() => setActivePeriod(period)}
                >
                  <span className="period-number">
                    {period}
                  </span>

                  Period {period}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn primary-button"
              onClick={handleCreateChart}
            >
              <i className="bi bi-plus-lg me-2"></i>
              Create Chart
            </button>
          </div>

          {/* Period 1 */}
          {activePeriod === 1 && (
            <div>
              <UpperIndexTable />
            </div>
          )}

          {/* Period 2 */}
          {activePeriod === 2 && (
            <div>
              <MiddleIndexTable />
            </div>
          )}

          {/* Period 3 */}
          {activePeriod === 3 && (
            <div>
              <LowerIndexTable />
            </div>
          )}

        </div>
      </div>
    </>
  );
}