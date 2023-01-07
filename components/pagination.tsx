import { PostsResponse } from "../types/post";
import { addClassName } from "../utils/utils";
import PaginationButton from "./ui/pagination-button";
import _ from "lodash";

type Props = {
  className?: string;
  meta: PostsResponse["meta"];
  onClickPagination(page: number, isSamePage: boolean): void;
};

const Pagination = ({ className, meta, onClickPagination }: Props) => {
  const maxNumberOfPages = 5;
  // ex) 현재 페이지가 43페이지라면 40, 38페이지라면 35
  const basePageNumber = Math.floor((meta.currentPage - 1) / maxNumberOfPages) * maxNumberOfPages;
  const shouldShowPreviousButton = meta.currentPage > maxNumberOfPages;
  const shouldShowNextButton = meta.totalPages > basePageNumber + maxNumberOfPages;
  const numberOfPages = shouldShowNextButton ? maxNumberOfPages : meta.totalPages - basePageNumber;

  const createPaginationButtons = () => {
    const paginationButtons: JSX.Element[] = [];

    if (shouldShowPreviousButton) {
      paginationButtons.push(
        <PaginationButton key="prev" onClick={() => onClickPagination(basePageNumber, false)}>
          «
        </PaginationButton>
      );
    }

    _.times(numberOfPages, (num) => {
      const pageNumber = basePageNumber + num + 1;
      const isActive = pageNumber === meta.currentPage;

      paginationButtons.push(
        <PaginationButton
          key={num}
          onClick={() => onClickPagination(pageNumber, isActive)}
          className={isActive ? "btn-active" : ""}
        >
          {pageNumber}
        </PaginationButton>
      );
    });

    if (shouldShowNextButton) {
      paginationButtons.push(
        <PaginationButton key="next" onClick={() => onClickPagination(basePageNumber + maxNumberOfPages + 1, false)}>
          »
        </PaginationButton>
      );
    }

    return paginationButtons;
  };

  return <div className={`btn-group flex justify-center${addClassName(className)}`}>{createPaginationButtons()}</div>;
};

export default Pagination;
