
"use client";

import { useEffect, useState } from "react";
import CustomToast from "../../../../../components/Toas";

import {
    getTotalDifYear,
    getValue,
    getTotalDifDay,
    getValueDay,
    getMonthlyStar
} from "./services";

import styles from "./page.module.css";

type FilterType = "all" | "day" | "month" | "year";

type Palace =
    | "SE" | "S" | "SW"
    | "E" | "C" | "W"
    | "NE" | "N" | "NW";

const palaces: {
    name: string;
    direction: string;
    palace: Palace;
    yearBase: number;
    dayBase: number;
}[] = [
    { name: "Southeast", direction: "SE", palace: "SE", yearBase: 9, dayBase: 3 },
    { name: "South", direction: "S", palace: "S", yearBase: 5, dayBase: 8 },
    { name: "Southwest", direction: "SW", palace: "SW", yearBase: 7, dayBase: 1 },

    { name: "East", direction: "E", palace: "E", yearBase: 8, dayBase: 2 },
    { name: "Center", direction: "CENTER", palace: "C", yearBase: 1, dayBase: 4 },
    { name: "West", direction: "W", palace: "W", yearBase: 3, dayBase: 6 },

    { name: "Northeast", direction: "NE", palace: "NE", yearBase: 4, dayBase: 7 },
    { name: "North", direction: "N", palace: "N", yearBase: 6, dayBase: 9 },
    { name: "Northwest", direction: "NW", palace: "NW", yearBase: 2, dayBase: 5 },
];

export default function UsersPage() {

    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");

    const [toasStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info");

    const [selectedDate, setSelectedDate] = useState("");
    const [filterType, setFilterType] = useState<FilterType>("all");

    const [count, setCount] = useState(0);
    const [dayCount, setDayCount] = useState(0);

    useEffect(() => {

        if (!selectedDate) {
            setCount(0);
            setDayCount(0);
            return;
        }

        setCount(getTotalDifYear(selectedDate));
        setDayCount(getTotalDifDay(selectedDate));

    }, [selectedDate]);

    const renderBox = (
        item: typeof palaces[number]
    ) => {

        const monthValue = selectedDate
            ? getMonthlyStar(selectedDate, item.palace)
            : "-";

        const yearValue = selectedDate
            ? getValue(count, item.yearBase, selectedDate)
            : "-";

        const dayValue = selectedDate
            ? getValueDay(dayCount, item.dayBase, selectedDate)
            : "-";

        return (
            <div
                key={item.palace}
                className={styles.palaceBox}
            >

                <div className={styles.palaceHeader}>
                    <span className={styles.palaceName}>
                        {item.name}
                    </span>

                    <span className={styles.palaceDirection}>
                        {item.direction}
                    </span>
                </div>

                <div className={styles.starContainer}>

                    {(filterType === "all" || filterType === "month") && (
                        <div className={styles.starItem}>
                            {filterType === "all" && (
                                <span className={styles.starLabel}>
                                    MONTH
                                </span>
                            )}

                            <span className={styles.monthStar}>
                                {monthValue}
                            </span>
                        </div>
                    )}

                    {(filterType === "all" || filterType === "year") && (
                        <div className={styles.starItem}>
                            {filterType === "all" && (
                                <span className={styles.starLabel}>
                                    YEAR
                                </span>
                            )}

                            <span className={styles.yearStar}>
                                {yearValue}
                            </span>
                        </div>
                    )}

                    {(filterType === "all" || filterType === "day") && (
                        <div className={styles.starItem}>
                            {filterType === "all" && (
                                <span className={styles.starLabel}>
                                    DAY
                                </span>
                            )}

                            <span className={styles.dayStar}>
                                {dayValue}
                            </span>
                        </div>
                    )}

                </div>

            </div>
        );
    };

    return (
        <>

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h1 className="h3 mb-1">
                        Flying Star
                    </h1>

                    <p className="text-muted mb-0">
                        Flying Star Feng Shui Chart
                    </p>
                </div>

            </div>

            {/* Main Card */}
            <div className={styles.mainCard}>

                {/* Filters */}
                <div className="row align-items-end">

                    <div className="col-md-4 mb-3">

                        <label className={styles.formLabel}>
                            Select Date
                        </label>

                        <input
                            type="date"
                            className="form-control txtStandard"
                            value={selectedDate}
                            onChange={(e) =>
                                setSelectedDate(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label className={styles.formLabel}>
                            Display Filter
                        </label>

                        <select
                            className="form-select txtStandard"
                            value={filterType}
                            onChange={(e) =>
                                setFilterType(e.target.value as FilterType)
                            }
                        >
                            <option value="all">All Stars</option>
                            <option value="month">Month Star</option>
                            <option value="year">Year Star</option>
                            <option value="day">Day Star</option>
                        </select>

                    </div>

                </div>

                {/* Legend */}
                <div className={styles.legendContainer}>

                    {(filterType === "all" || filterType === "month") && (
                        <div className={styles.legendItem}>
                            <span className={styles.legendMonth}></span>
                            Month Star
                        </div>
                    )}

                    {(filterType === "all" || filterType === "year") && (
                        <div className={styles.legendItem}>
                            <span className={styles.legendYear}></span>
                            Year Star
                        </div>
                    )}

                    {(filterType === "all" || filterType === "day") && (
                        <div className={styles.legendItem}>
                            <span className={styles.legendDay}></span>
                            Day Star
                        </div>
                    )}

                </div>

                {/* Palace Grid */}
                <div className={styles.chartWrapper}>

                    <div className={styles.palaceGrid}>

                        {palaces.map((item) => renderBox(item))}

                    </div>

                </div>

                {/* Footer */}
                <div className={styles.chartFooter}>
                    <span>
                        Showing: <strong>
                            {filterType === "all" && "All Stars"}
                            {filterType === "month" && "Month Star"}
                            {filterType === "year" && "Year Star"}
                            {filterType === "day" && "Day Star"}
                        </strong>
                    </span>

                    <span>
                        {selectedDate || "No date selected"}
                    </span>
                </div>

            </div>

            <CustomToast
                show={showToast}
                message={toastText}
                type={toasStatus}
                onClose={() => setShowToast(false)}
            />

        </>
    );
}
