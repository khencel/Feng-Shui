"use client";

import { Stems } from "@/lib/data";

interface InsideSectorDetailsProps {
    subHeavenly: string;
    subEarthly: string;
    auspicious: string[];
    inauspicious: string[];

    onChange: (
        field:
            | "subHeavenly"
            | "subEarthly"
            | "auspicious"
            | "inauspicious",
        value: string | string[]
    ) => void;
}

export default function InsideSectorDetails({
    subHeavenly,
    subEarthly,
    auspicious,
    inauspicious,
    onChange,
}: InsideSectorDetailsProps) {

   const addAuspicious = (value: string) => {
        if (!value) return;

        if (!auspicious.includes(value)) {
            onChange("auspicious", [
                ...auspicious,
                value,
            ]);
        }
    };

    const addInauspicious = (value: string) => {
        if (!value) return;

        if (!inauspicious.includes(value)) {
            onChange("inauspicious", [
                ...inauspicious,
                value,
            ]);
        }
    };

    const removeAuspicious = (value: string) => {
        onChange(
            "auspicious",
            auspicious.filter(
                (item) => item !== value
            )
        );
    };

    const removeInauspicious = (value: string) => {
        onChange(
            "inauspicious",
            inauspicious.filter(
                (item) => item !== value
            )
        );
    };

    return (
        <>
            <div className="row">
                <div className="col p-1">
                    <select
                        className="form-control txtStandard"
                        value={subHeavenly}
                        onChange={(e) =>
                            onChange(
                                "subHeavenly",
                                e.target.value
                            )
                        }
                    >
                        <option value="" hidden>
                            Sub Heavenly
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

                <div className="col p-1">
                    <select
                        className="form-control txtStandard"
                        value={subEarthly}
                        onChange={(e) =>
                            onChange(
                                "subEarthly",
                                e.target.value
                            )
                        }
                    >
                        <option value="" hidden>
                            Sub Eartly
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
            </div>

            <div className="row mt-2">

                {/* AUSPICIOUS */}
                <div className="col p-1">
                    <select
                        className="form-control txtStandard"
                        value=""
                        onChange={(e) =>
                            addAuspicious(e.target.value)
                        }
                    >
                        <option value="">
                            Auspicious
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

                    <div className="mt-2">
                        {auspicious.map((item) => (
                            <div
                                key={item}
                                className="d-flex justify-content-between align-items-center border rounded p-1 mb-1"
                            >
                                <span style={{ fontSize: "12px" }}>
                                    {item}
                                </span>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                        removeAuspicious(item)
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* INAUSPICIOUS */}
                <div className="col p-1">
                    <select
                        className="form-control txtStandard"
                        value=""
                        onChange={(e) =>
                            addInauspicious(e.target.value)
                        }
                    >
                        <option value="">
                            Inauspicious
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

                    <div className="mt-2">
                        {inauspicious.map((item) => (
                            <div
                                key={item}
                                className="d-flex justify-content-between align-items-center border rounded p-1 mb-1"
                            >
                                <span style={{ fontSize: "12px" }}>
                                    {item}
                                </span>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                        removeInauspicious(item)
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}