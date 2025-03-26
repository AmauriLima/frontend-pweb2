import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationLink, PaginationNext, PaginationPrevious } from "@/application/shared/components/ui/pagination";
import { TableCaption } from "@/application/shared/components/ui/table";
import { IUsePagination } from "@/application/shared/hooks/use-pagination";
import { generateEllipsisPagination } from "@/application/shared/lib/utils";
import { useMemo } from "react";

interface Props {
  pagination: IUsePagination;
}

export function TableFooter(props: Props) {
  const { pagination } = props;

  const pages = useMemo(() => {
    return generateEllipsisPagination(
      pagination.currentPage,
      pagination.totalPages,
    );
  }, [
    pagination.currentPage,
    pagination.totalPages,
  ]);

  return (
    <TableCaption className="flex justify-between items-center gap-4">
      <span>
        Página {pagination.currentPage} de {pagination.totalPages}
      </span>
      <Pagination className="flex shrink justify-end mx-0 w-fit">
        <PaginationContent className="">
          <PaginationItem>
            <PaginationFirst
              onClick={pagination.firstPage}
              isActive={pagination.currentPage !== 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              onClick={pagination.previousPage}
              isActive={pagination.hasPreviousPage}
              aria-disabled={!pagination.hasPreviousPage}
            />
          </PaginationItem>

          {pages.map((page, index) => {
            const isEllipsisPosition = typeof page === 'string';

            if (isEllipsisPosition) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={pagination.currentPage === page}
                  onClick={() => pagination.setPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={pagination.nextPage}
              isActive={pagination.hasNextPage}
              aria-disabled={!pagination.hasNextPage}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              onClick={pagination.lastPage}
              isActive={pagination.currentPage !== pagination.totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </TableCaption>
  )
}
