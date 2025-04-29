"use client";
import { PaginationNext, PaginationPrev } from "@/svg";
import { useState } from "react";

const ServerPagination = ({
  items = [],
  countOfPage = 12,
  currPage,
  setCurrPage,
  isMobile,
}) => {
  const totalPage = Math.ceil(items.length / countOfPage);
  const [visiblePages] = useState(isMobile ? 3 : 5);

  function setPage(idx) {
    if (idx <= 0 || idx > totalPage) return;
    setCurrPage(idx);
    window.scrollTo(0, 0);
  }

  const getVisiblePageNumbers = () => {
    let start = Math.max(1, currPage - Math.floor(visiblePages / 2));
    let end = Math.min(totalPage, start + visiblePages - 1);

    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - visiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <nav>
      {totalPage > 1 && (
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {/* First Page Button */}
          <li>
            <button
              onClick={() => setPage(1)}
              disabled={currPage === 1}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                border: "none",
                backgroundColor: currPage === 1 ? "#f3f4f6" : "transparent",
                color: currPage === 1 ? "#9ca3af" : "#374151",
                opacity: currPage === 1 ? 0.5 : 1,
                pointerEvents: currPage === 1 ? "none" : "auto",
              }}
            >
              <PaginationPrev />
            </button>
          </li>

          {/* Previous Button */}
          <li>
            <button
              onClick={() => setPage(currPage - 1)}
              disabled={currPage === 1}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                padding: "0 12px",
                borderRadius: "20px",
                cursor: "pointer",
                border: "none",
                backgroundColor: "transparent",
                color: "#374151",
                opacity: currPage === 1 ? 0.5 : 1,
                pointerEvents: currPage === 1 ? "none" : "auto",
              }}
            >
              Prev
            </button>
          </li>

          {/* Left Ellipsis */}
          {currPage > Math.ceil(visiblePages / 2) + 1 && (
            <li style={{ padding: "0 8px" }}>...</li>
          )}

          {/* Page Numbers */}
          {getVisiblePageNumbers().map((n) => (
            <li
              key={n}
              onClick={() => setPage(n)}
              style={{ cursor: "pointer" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  backgroundColor: currPage === n ? "#3b82f6" : "transparent",
                  color: currPage === n ? "#ffffff" : "#374151",
                  transition: "all 0.3s",
                  ":hover": {
                    backgroundColor: currPage === n ? "#3b82f6" : "#f3f4f6",
                  },
                }}
              >
                {n}
              </span>
            </li>
          ))}

          {/* Right Ellipsis */}
          {currPage < totalPage - Math.floor(visiblePages / 2) && (
            <li style={{ padding: "0 8px" }}>...</li>
          )}

          {/* Next Button */}
          <li>
            <button
              onClick={() => setPage(currPage + 1)}
              disabled={currPage === totalPage}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                padding: "0 12px",
                borderRadius: "20px",
                cursor: "pointer",
                border: "none",
                backgroundColor: "transparent",
                color: "#374151",
                opacity: currPage === totalPage ? 0.5 : 1,
                pointerEvents: currPage === totalPage ? "none" : "auto",
              }}
            >
              Next
            </button>
          </li>

          {/* Last Page Button */}
          <li>
            <button
              onClick={() => setPage(totalPage)}
              disabled={currPage === totalPage}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                border: "none",
                backgroundColor:
                  currPage === totalPage ? "#f3f4f6" : "transparent",
                color: currPage === totalPage ? "#9ca3af" : "#374151",
                opacity: currPage === totalPage ? 0.5 : 1,
                pointerEvents: currPage === totalPage ? "none" : "auto",
              }}
            >
              <PaginationNext />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default ServerPagination;
