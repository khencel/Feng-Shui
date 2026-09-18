"use client";

import { useState } from "react";
import DirectionTabs from "./DirectionTabs";
import SectionDetails from "./SectionDetails";
import styles from "./CreateChart.module.css";

export interface SectionData {
    heavenlyStem: string;
    earthlyStem: string;
    star: string;
    deity: string;
    door: string;
    number: string;

    subHeavenly: string;
    subEarthly: string;
    auspicious: string[];
    inauspicious: string[];
}

const emptySection: SectionData = {
    heavenlyStem: "",
    earthlyStem: "",
    star: "",
    deity: "",
    door: "",
    number: "",

    subHeavenly: "",
    subEarthly: "",
    auspicious: [],
    inauspicious: [],
};

const initialSections: Record<string, SectionData> = {
    se: { ...emptySection },
    s: { ...emptySection },
    sw: { ...emptySection },
    e: { ...emptySection },
    center: { ...emptySection },
    w: { ...emptySection },
    ne: { ...emptySection },
    n: { ...emptySection },
    nw: { ...emptySection },
};

export interface HouseStemBranchData {
    stem: string;
    branch: string;
    element: string;
    animal: string;
}

export default function CreateChartClient() {

    const [sections, setSections] =
        useState<Record<string, SectionData>>(initialSections);

    const doorMapping: Record<string, string> = {
        Fear: "Harm",
        Harm: "Fear",

        Open: "Delusion",
        Delusion: "Open",

        Rest: "Scenery",
        Scenery: "Rest",

        Death: "Life",
        Life: "Death",
    };

    const oppositeDirection: Record<string, string> = {
        se: "nw",
        nw: "se",

        s: "n",
        n: "s",

        sw: "ne",
        ne: "sw",

        e: "w",
        w: "e",
    };

    const updateSection = (
        direction: string,
        field: keyof SectionData,
        value: string | string[]
    ) => {
        setSections((prev) => {
            const updated = {
                ...prev,
                [direction]: {
                    ...prev[direction],
                    [field]: value,
                },
            };

            if (field === "door" && typeof value === "string") {
                const opposite = oppositeDirection[direction];

                if (opposite) {
                    const pairedDoor = doorMapping[value];

                    updated[opposite] = {
                        ...updated[opposite],
                        door: pairedDoor || "",
                    };
                }
            }

            return updated;
        });
    };

    const [house_stem_branch, setHouseStemBranch] =
    useState<HouseStemBranchData>({
        stem: "",
        branch: "",
        element: "",
        animal: "",
    });

    return (
        <section className="bg-white">
            <div className="row">

                {/* CHART */}
                <div className="col-md-9 border">

                    <div className="position-relative">

                        <img
                            src="/ChartTemplate.png"
                            style={{ width: "100%" }}
                            alt=""
                        />

                        {/* SE */}
                        <div className={styles.sectionDivSE}>
                            <div className="row h-100">

                                <div className="col-md-4 position-relative">
                                    <SectionDetails
                                        params={sections.se}
                                    />
                                </div>

                                <div className="col-md-4 position-relative">
                                    <SectionDetails
                                        params={sections.s}
                                    />
                                </div>

                                <div className="col-md-4 position-relative">
                                    <SectionDetails
                                        params={sections.sw}
                                    />
                                </div>

                            </div>
                        </div>

                        {/* E */}
                        <div className={styles.sectionDivE}>
                            <div className="row h-100 ">

                                <div className="col-md-4 position-relative">
                                    <SectionDetails
                                        params={sections.e}
                                    />
                                </div>

                                <div className="col-md-4 position-relative">
                                    <SectionDetails
                                        params={sections.center}
                                    />
                                </div>

                                <div className="col-md-4 position-relative">
                                    <SectionDetails
                                        params={sections.w}
                                    />
                                </div>

                            </div>
                        </div>

                        {/* NE */}
                        <div className={styles.sectionDivNE}>
                            <div className="row h-100">

                                <div className="col-md-4 position-relative">
                                    <SectionDetails
                                        params={sections.ne}
                                    />
                                </div>

                                <div className="col-md-4 position-relative">
                                    <SectionDetails
                                        params={sections.n}
                                    />
                                </div>

                                <div className="col-md-4 position-relative">
                                    <SectionDetails
                                        params={sections.nw}
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-md-3 border p-3">

                    <DirectionTabs
                        sections={sections}
                        updateSection={updateSection}
                        house_stem_branch={house_stem_branch}
                        setHouseStemBranch={setHouseStemBranch}
                    />

                </div>

            </div>
        </section>
    );
}