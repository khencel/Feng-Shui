"use client";

import { Stems, Branch, Element, Animals } from "@/lib/data";
import { HouseStemBranchData } from "./CreateChartClient";

interface HousesStemBranchProps {
    house_stem_branch: HouseStemBranchData;

    setHouseStemBranch: React.Dispatch<
        React.SetStateAction<HouseStemBranchData>
    >;
}

export default function HousesStemBranch({
    house_stem_branch,
    setHouseStemBranch
}: HousesStemBranchProps) {

    const updateHouseStemBranch = (
        field: keyof HouseStemBranchData,
        value: string
    ) => {
        setHouseStemBranch((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <>
            <h6 className="mb-1 fw-bold mt-2">
                House's Stem & Branch
            </h6>

            <div className="row">

                {/* STEM */}
                <div className="col p-1">
                    <select
                        className="form-control txtStandard"
                        value={house_stem_branch.stem}
                        onChange={(e) =>
                            updateHouseStemBranch(
                                "stem",
                                e.target.value
                            )
                        }
                    >
                        <option value="" hidden>
                            Select Stem
                        </option>

                        {Stems().map((item, index) => (
                            <option
                                key={index}
                                value={item.value}
                            >
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>

                {/* BRANCH */}
                <div className="col p-1">
                    <select
                        className="form-control txtStandard"
                        value={house_stem_branch.branch}
                        onChange={(e) =>
                            updateHouseStemBranch(
                                "branch",
                                e.target.value
                            )
                        }
                    >
                        <option value="" hidden>
                            Select Branch
                        </option>

                        {Branch().map((item, index) => (
                            <option
                                key={index}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <div className="row mt-2">

                {/* ELEMENT */}
                <div className="col p-1">
                    <select
                        className="form-control txtStandard"
                        value={house_stem_branch.element}
                        onChange={(e) =>
                            updateHouseStemBranch(
                                "element",
                                e.target.value
                            )
                        }
                    >
                        <option value="" hidden>
                            Select Element
                        </option>

                        {Element().map((item, index) => (
                            <option
                                key={index}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ANIMAL */}
                <div className="col p-1">
                    <select
                        className="form-control txtStandard"
                        value={house_stem_branch.animal}
                        onChange={(e) =>
                            updateHouseStemBranch(
                                "animal",
                                e.target.value
                            )
                        }
                    >
                        <option value="" hidden>
                            Select Animal
                        </option>

                        {Animals().map((item, index) => (
                            <option
                                key={index}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </>
    );
}