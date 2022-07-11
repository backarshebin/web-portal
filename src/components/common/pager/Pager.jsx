import React from "react";
import { Button } from "react-bootstrap";
const Pager = (props) => {
  const { currentPage, onPageClick, pageLimit, totalSize } = props;

  return (
    <>
      <div>
        <Button
          onClick={() => {
            onPageClick(currentPage - 1);
          }}
          disabled={currentPage == 1}
          variant="link"
        >
          Prev
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            onPageClick(currentPage + 1);
          }}
          disabled={totalSize < currentPage * pageLimit}
          variant="link"
        >
          Next
        </Button>
      </div>{" "}
    </>
  );
};
export default Pager;
