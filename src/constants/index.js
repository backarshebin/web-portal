export const PAGE_LIMIT = 50;

export const GRID_COLUMNS = [
  { dataField: "id", text: "ID", hidden: true },
  { dataField: "first_name", text: "First Name" },
  { dataField: "last_name", text: "Last Name" },
  {
    dataField: "email",
    text: "Email",
    classes: "",

    headerStyle: (colum, colIndex) => {
      return { width: "400px", textAlign: "center" };
    },
  },
  { dataField: "gender", text: "Gender" },
  {
    dataField: "status",
    text: "Status",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return <input type="checkbox" disabled checked={row.status}></input>;
    },
  },
];
