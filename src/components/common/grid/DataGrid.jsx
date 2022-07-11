import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";
import NoDataIndication from "./nodata/NoDataIndication";

const DataGrid = (props) => {
  const {
    data,
    columns,
    onTableChange,
    page,
    sizePerPage,
    totalSize,
    onRowClick     
  } = props;
  const options = {
    custom: true,
    totalSize: totalSize,
  };
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      onRowClick(e, row, rowIndex);
    },
  };
  return (
    <div>
      <PaginationProvider pagination={paginationFactory(options)}>
        {({ paginationProps, paginationTableProps }) => (
          <div>
            <PaginationTotalStandalone {...paginationProps} />
            <PaginationListStandalone {...paginationProps} />

            <BootstrapTable
              remote
              keyField="id"
              data={data}
              columns={columns}
              pagination={paginationFactory({ page, sizePerPage, totalSize })}
              onTableChange={onTableChange}
              noDataIndication={() => <NoDataIndication />}
              rowEvents={rowEvents}
              {...paginationTableProps}
            />
            <PaginationTotalStandalone {...paginationProps} />
            <PaginationListStandalone {...paginationProps} />
          </div>
        )}
      </PaginationProvider>
    </div>
  );
};

export default DataGrid;
