import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router";

export function CustomPagination({ total }: { total: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit")) || 5;
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push("...");

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Pagination className="my-3">
      <PaginationContent>
        <PaginationItem
          onClick={handlePrev}
          className={`cursor-pointer px-3 py-1 border rounded ${
            currentPage === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Previous
        </PaginationItem>

        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`} className="px-3 py-1">
              ...
            </PaginationItem>
          ) : (
            <PaginationItem
              key={page}
              className={`cursor-pointer px-3 py-1 border rounded ${
                page === currentPage ? "bg-black text-white" : ""
              }`}
              onClick={() => handlePageChange(Number(page))}
            >
              {page}
            </PaginationItem>
          )
        )}

        <PaginationItem
          onClick={handleNext}
          className={`cursor-pointer px-3 py-1 border rounded ${
            currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Next
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
