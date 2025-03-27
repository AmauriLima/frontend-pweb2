import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages = 2,
) {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= (currentPage - surroundingPages);
    const isWithinUpperBound = i <= (currentPage + surroundingPages);
    const isEllipsisPosition = (
      (i === currentPage - surroundingPages - 1) ||
      (i === currentPage + surroundingPages + 1)
    );

    if ((isFirstPage || isLastPage) || (isWithinLowerBound && isWithinUpperBound)) {
      pages.push(i);
    } else if (isEllipsisPosition) {
      pages.push('...');
    }
  }

  return pages;
}

export function formatDate(date?: string): string | null {
  if (!date) return null;

  const formattedDate = new Date(date);

  const day = String(formattedDate.getDate()).padStart(2, '0');
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const year = formattedDate.getFullYear();

  return `${day}/${month}/${year}`;
}
