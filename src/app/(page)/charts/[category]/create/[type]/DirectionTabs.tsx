"use client";

import { useState } from "react";
import styles from "./CreateChart.module.css";
import { Stems, Stars, Deity, Doors, Numbers, Period, DirectionList, HouseFacing, Sector } from "@/lib/data"
import { SectionData, HouseStemBranchData  } from "./CreateChartClient";
import HousesStemBranch from "./HouseStemBranch";
import InsideSectorDetails from "./InsideSectorDetails";
import { showConfirmSwal } from "../../../../../../../components/CustomSwal";


interface DirectionTabsProps {
    sections: Record<string, SectionData>;

    updateSection: (
        direction: string,
        field: keyof SectionData,
        value: string | string[]
    ) => void;

    house_stem_branch: HouseStemBranchData;

    setHouseStemBranch: React.Dispatch<
        React.SetStateAction<HouseStemBranchData>
    >;
}

const directions = [
    {
        id: "se",
        label: "SE",
        title: "South East",
        description: "Settings and information for the South East area.",
    },
    {
        id: "s",
        label: "S",
        title: "South",
        description: "Settings and information for the South area.",
    },
    {
        id: "sw",
        label: "SW",
        title: "South West",
        description: "Settings and information for the South West area.",
    },
    {
        id: "e",
        label: "E",
        title: "East",
        description: "Settings and information for the East area.",
    },
    {
        id: "center",
        label: "Center",
        title: "Center",
        description: "Settings and information for the Center area.",
    },
    {
        id: "w",
        label: "W",
        title: "West",
        description: "Settings and information for the West area.",
    },
    {
        id: "ne",
        label: "NE",
        title: "North East",
        description: "Settings and information for the North East area.",
    },
    {
        id: "n",
        label: "N",
        title: "North",
        description: "Settings and information for the North area.",
    },
    {
        id: "nw",
        label: "NW",
        title: "North West",
        description: "Settings and information for the North West area.",
    },
];

export default function DirectionTabs({
    sections,
    updateSection,
    house_stem_branch,
    setHouseStemBranch
}: DirectionTabsProps) {

    const [activeTab, setActiveTab] = useState("se");

    const [selectedDoorDirections, setSelectedDoorDirections] = useState<
        { direction: string; value: string }[]
    >([]);

    const activeDirection = directions.find(
        (direction) => direction.id === activeTab
    );

    const currentSection = sections[activeTab];

    const [selectedPriod, setSelectedPeriod] = useState("");
    const [selectedNumber, setSelectedNumber] = useState("");

    const [selectedFacing, setSelectedFacing] = useState<{
        direcion: string;
        value: string;
    } | null>(null);

    const [selectecLeadStem, setSelectedLeadStem] = useState("")

    const selectedDoors = Object.entries(sections)
    .filter(([direction]) => direction !== activeTab)
    .map(([, section]) => section.door)
    .filter(Boolean);

    const handleInsideSectorChange = (
        field:
            | "subHeavenly"
            | "subEarthly"
            | "auspicious"
            | "inauspicious",
        value: string | string[]
    ) => {
        updateSection(
            activeTab,
            field,
            value
        );
    };

    const formatSection = (section: SectionData) => ({
        heavenly: section.heavenlyStem,
        earthly: section.earthlyStem,
        star: section.star,
        door: section.door,
        deity: section.deity,
        number: section.number,

        sub_heavenly: section.subHeavenly,
        sub_earthly: section.subEarthly,

        auspicious: section.auspicious,
        inauspicious: section.inauspicious,
    });

    const backingMapping: Record<string, string> = {
        SE: "NW",
        NW: "SE",

        S: "N",
        N: "S",

        SW: "NE",
        NE: "SW",

        E: "W",
        W: "E",

        Center: "Center",
    };

    const [selectedFacingFront, setSelectedFacingFront] = useState("");

    const handleSubmit = async () => {
        await showConfirmSwal({
            title: "Save Vehicle?",
            text: "Are you sure you want to save this vehicle?",
            confirmButtonText: "Yes, Save",
            cancelButtonText: "Cancel",

            onConfirm: async () => {
                console.log("Vehicle saved!");

            },
        });
        const payload = {
            period: selectedPriod,
            periodNumber: selectedNumber,

            door_location: selectedDoorDirections,
            house_facing: selectedFacing,

            se: formatSection(sections.se),
            s: formatSection(sections.s),
            sw: formatSection(sections.sw),
            e: formatSection(sections.e),
            center: formatSection(sections.center),
            w: formatSection(sections.w),
            ne: formatSection(sections.ne),
            n: formatSection(sections.n),
            nw: formatSection(sections.nw),

            lead_stem: selectecLeadStem,
            house_stem_branch: house_stem_branch,
            facing: selectedFacingFront,
            backing: backingMapping[selectedFacingFront] || "",
        };

        console.log("BE PAYLOAD:", payload);
    };

    const handleDoorDirectionChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedOptions = Array.from(e.target.selectedOptions);

        const selected = selectedOptions.map((option) =>
            JSON.parse(option.value)
        );

        setSelectedDoorDirections(selected);
    };

    return (
        <div>
            {/* TAB HEADER */}
            
            <div className={styles.chartTabWrapper}>
                <div className={styles.chartTabTitle}>
                    <h6 className="mb-1 fw-bold">
                        Chart Direction
                    </h6>

                    <small className="text-muted">
                        Select a direction
                    </small>
                </div>

                

                {/* TABS */}
                <div className={styles.chartTabs}>
                    {directions.map((direction) => (
                        <button
                            key={direction.id}
                            type="button"
                            onClick={() => setActiveTab(direction.id)}
                            className={`
                                ${styles.chartTab}
                                ${
                                    activeTab === direction.id
                                        ? styles.active
                                        : ""
                                }
                                ${
                                    direction.id === "center"
                                        ? styles.centerTab
                                        : ""
                                }
                            `}
                        >
                            {direction.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT */}
            {activeDirection && (
                <div className={styles.chartContent}>

                    <div className={styles.directionContent}>

                        <span
                            className={`
                                ${styles.directionBadge}
                                ${
                                    activeDirection.id === "center"
                                        ? styles.centerBadge
                                        : ""
                                }
                            `}
                        >
                            {activeDirection.id === "center"
                                ? "C"
                                : activeDirection.label}
                        </span>

                        <div>
                            <h6>
                                {activeDirection.title}
                            </h6>

                            <p>
                                {activeDirection.description}
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="mt-2">
                        <div className="row">
                            <div className="col-md-6 p-1">
                                <select
                                    className="form-control txtStandard"
                                    value={currentSection.heavenlyStem}
                                    onChange={(e) =>
                                        updateSection(
                                            activeTab,
                                            "heavenlyStem",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="" hidden>
                                        Heaven Stem
                                    </option>

                                    {Stems().map((stem) => (
                                        <option
                                            key={stem.value}
                                            value={stem.value}
                                        >
                                            {stem.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 p-1">
                                <select
                                    className="form-control txtStandard"
                                    value={currentSection.earthlyStem}
                                    onChange={(e) =>
                                        updateSection(
                                            activeTab,
                                            "earthlyStem",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="" hidden>
                                        Earthly Stem
                                    </option>

                                    {Stems().map((stem) => (
                                        <option
                                            key={stem.value}
                                            value={stem.value}
                                        >
                                            {stem.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 p-1">
                                <select
                                    className="form-control txtStandard"
                                    value={currentSection.star}
                                    onChange={(e) =>
                                        updateSection(
                                            activeTab,
                                            "star",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="" hidden>
                                        Star
                                    </option>

                                    {Stars().map((star) => (
                                        <option
                                            key={star.name}
                                            value={star.name}
                                        >
                                            {star.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 p-1">
                                <select
                                    className="form-control txtStandard"
                                    value={currentSection.deity}
                                    onChange={(e) =>
                                        updateSection(
                                            activeTab,
                                            "deity",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="" hidden>
                                        Deity
                                    </option>

                                    {Deity().map((deity) => (
                                        <option
                                            key={deity.name}
                                            value={deity.value}
                                        >
                                            {deity.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 p-1">
                                <select
                                    className="form-control txtStandard"
                                    value={currentSection.door}
                                    onChange={(e) =>
                                        updateSection(
                                            activeTab,
                                            "door",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="" hidden>
                                        Door
                                    </option>

                                    {Doors()
                                        .filter((door) => !selectedDoors.includes(door.name))
                                        .map((door) => (
                                            <option
                                                key={door.name}
                                                value={door.name}
                                            >
                                                {door.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-md-6 p-1">
                                <select
                                    className="form-control txtStandard"
                                    value={currentSection.number}
                                    onChange={(e) =>
                                        updateSection(
                                            activeTab,
                                            "number",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="" hidden>
                                        Number
                                    </option>

                                    {Numbers().map((num, index) => (
                                        <option
                                            key={index}
                                            value={num}
                                        >
                                            {num}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <hr />
                        <InsideSectorDetails
                            subHeavenly={currentSection.subHeavenly}
                            subEarthly={currentSection.subEarthly}
                            auspicious={currentSection.auspicious}
                            inauspicious={currentSection.inauspicious}
                            onChange={handleInsideSectorChange}
                        />
                        
                    </div>
                </div>
            )}

            <div className={styles.chartTabWrapper}>
                <div className={styles.chartTabTitle}>
                    <div className="row mb-2">
                        <div className="col p-1">
                            <select 
                                className="form-control txtStandard"
                                value={selectedPriod}
                                onChange={(e)=>setSelectedPeriod(e.target.value)}
                            >
                                <option value="" hidden>Select Period</option>
                                {Period().map((item)=>(
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col p-1">
                            <select 
                                className="form-control txtStandard"
                                value={selectedNumber}
                                onChange={(e)=>setSelectedNumber(e.target.value)}
                            >
                                <option value="" hidden>Select Number</option>
                                {Array.from({ length: 9 }, (_, i) => i + 1).map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                    </div>
                    <h6 className="mb-1 fw-bold">
                        House Facing
                    </h6>
                    <div className="mb-2">
                        <select
                            className="form-control txtStandard"
                            value={selectedFacing ? JSON.stringify(selectedFacing) : ""}
                            onChange={(e)=> {
                                if (!e.target.value){
                                    setSelectedFacing(null);
                                    return
                                }

                                setSelectedFacing(JSON.parse(e.target.value))
                            }}
                            
                        >
                            <option value="" hidden>Select House Facing</option>
                            {
                                HouseFacing().map((item, index) => (
                                    <option key={index} value={JSON.stringify(item)}>{item.direction}</option>
                                ))
                            }
                        </select>
                    </div>


                    <h6 className="mb-1 fw-bold">
                        Door Location
                    </h6>

                    <select
                        className="form-control txtStandard"
                        value=""
                        onChange={(e) => {
                            if (!e.target.value) return;

                            const selected = JSON.parse(e.target.value);

                            // Prevent duplicate
                            if (
                                !selectedDoorDirections.some(
                                    (item) => item.direction === selected.direction
                                )
                            ) {
                                setSelectedDoorDirections((prev) => [
                                    ...prev,
                                    selected,
                                ]);
                            }
                        }}
                    >
                        <option value="" hidden>Select Direction</option>

                        {DirectionList().map((item) => (
                            <option
                                key={item.direction}
                                value={JSON.stringify(item)}
                            >
                                {item.direction} - {item.value}
                            </option>
                        ))}
                    </select>

                    {/* SELECTED LIST */}
                    <div className="mt-2">
                        <small className="text-muted">
                            Selected Door Directions:
                        </small>

                        {selectedDoorDirections.length === 0 ? (
                            <div className="text-muted mt-1">
                                No direction selected
                            </div>
                        ) : (
                            <div className="mt-1">
                                {selectedDoorDirections.map((item) => (
                                    <div
                                        key={item.direction}
                                        className="d-flex justify-content-between align-items-center border rounded p-1 mb-1"
                                    >
                                        <div>
                                            <strong>{item.direction}</strong>
                                            <span className="text-muted ms-2">
                                                {item.value}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() =>
                                                setSelectedDoorDirections((prev) =>
                                                    prev.filter(
                                                        (x) =>
                                                            x.direction !== item.direction
                                                    )
                                                )
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <h6 className="mb-1 fw-bold mt-2">
                        Lead Stem
                    </h6>
                    <div>
                        <select 
                            className="form-control txtStandard"
                            value={selectecLeadStem}
                            onChange={(e)=>setSelectedLeadStem(e.target.value)}
                        >
                            <option value="" hidden>Select Stem</option>
                            {
                                Stems().map((item, index) => (
                                    <option key={index} value={item.value}>{item.value}</option>
                                ))
                            }
                        </select>
                        
                    </div>
                    <hr />
                    <HousesStemBranch 
                        house_stem_branch={house_stem_branch}
                        setHouseStemBranch={setHouseStemBranch}
                    />

                    <h6 className="mb-1 fw-bold mt-2">
                        Facing
                    </h6>

                    <div className="row">
                        <div className="col p-1">
                            <select
                                className="form-control txtStandard"
                                value={selectedFacingFront}
                                onChange={(e) => setSelectedFacingFront(e.target.value)}
                            >
                                <option value="" hidden>
                                    Select Facing
                                </option>

                                {Sector().map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button
                        type="button"
                        className="btnSuccess w-100"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}