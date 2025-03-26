import { useCallback, useEffect, useState } from 'react';

export function usePagination(perPage: number, initialPage = 1) {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const page = searchParams.get('page');

    if (!page) {
      return initialPage;
    }

    return Number(page);
  });

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  useEffect(() => {
    const url = new URL(window.location.href);

    url.searchParams.set('page', String(currentPage));
    url.searchParams.set('perPage', String(perPage));

    const newUrl = url.origin + url.pathname + '?' + url.searchParams.toString();
    window.history.replaceState({}, '', newUrl);
  }, [currentPage, perPage]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage(prevState => prevState - 1);
    }
  }, [hasPreviousPage]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prevState => prevState + 1);
    }
  }, [hasNextPage]);

  const lastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    setTotalItems,
    setPage,
    previousPage,
    nextPage,
    firstPage,
    lastPage,
  };
}
