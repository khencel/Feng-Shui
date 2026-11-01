"use client";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {

    if (totalPages <= 1) {
        return null;
    }

    const getPages = () => {
        const pages: (number | string)[] = [];

        const delta = 2;

        const left = Math.max(2, currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage + delta);

        pages.push(1);

        if (left > 2) {
            pages.push("...");
        }

        for (let i = left; i <= right; i++) {
            pages.push(i);
        }

        if (right < totalPages - 1) {
            pages.push("...");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <nav>
            <ul className="pagination mb-0">

                {/* Previous */}
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {getPages().map((page, index) => (
                    <li
                        key={index}
                        className={`page-item ${
                            currentPage === page ? "active" : ""
                        } ${page === "..." ? "disabled" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => {
                                if (typeof page === "number") {
                                    onPageChange(page);
                                }
                            }}
                            disabled={page === "..."}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next */}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>

            </ul>
        </nav>
    );
}