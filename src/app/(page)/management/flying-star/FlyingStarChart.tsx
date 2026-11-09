"use client";

import { useMemo } from "react";

import {
    getTotalDifYear,
    getValue,
    getValueDay,
    getMonthlyStar,
} from "./services";

import styles from "./page.module.css";

export type FilterType = "all" | "day" | "month" | "year";

type Palace =
    | "SE" | "S" | "SW"
    | "E" | "C" | "W"
    | "NE" | "N" | "NW";

interface FlyingStarChartProps {
    date: string;
    filterType?: FilterType;
}

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

export default function FlyingStarChart({
    date,
    filterType = "all",
}: FlyingStarChartProps) {

    const yearCount = useMemo(() => {
        if (!date) return 0;

        return getTotalDifYear(date);
    }, [date]);

    const renderBox = (
        item: typeof palaces[number]
    ) => {

        const monthValue = date
            ? getMonthlyStar(date, item.palace)
            : "-";

        const yearValue = date
            ? getValue(
                yearCount,
                item.yearBase,
                date
            )
            : "-";

        const dayValue = date
            ? getValueDay(
                item.dayBase,
                date
            )
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

                    {(filterType === "all" ||
                        filterType === "month") && (

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

                    {(filterType === "all" ||
                        filterType === "year") && (

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

                    {(filterType === "all" ||
                        filterType === "day") && (

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
        <div className={styles.chartWrapper}>

            <div className={styles.palaceGrid}>
                {palaces.map((item) => renderBox(item))}
            </div>

        </div>
    );
}