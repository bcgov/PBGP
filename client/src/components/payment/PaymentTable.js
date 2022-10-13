import React, {useState,  useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PaymentTableColumns } from "../../constants";
import { useGetApplicationPayments } from "hooks/admin/payment/useGetApplicationPayments";
import { Table } from "components/generic";
import { PaymentTableToolbarSearch } from "./PaymentTableToolbarSearch.js";
import { PaymentTableToolbarActions } from "./PaymentTableToolbarActions.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();

  const {
    tableData,
    activePaymentBatch,
    selections,
    onSearch,
    onCancel,
    onSelectionChange,
    onChangePage,
    onCreateBatch,
    onUpdateBatch,
  } = useGetApplicationPayments();

  return (
    <div className={classes.root}>
      <PaymentTableToolbarSearch onSearch={onSearch} /> 
       {selections.length > 0 && (
        <PaymentTableToolbarActions
          selections={selections}
          activePaymentBatch={activePaymentBatch}
          onCreateBatch={onCreateBatch}
          onUpdateBatch={onUpdateBatch}
          onCancel={onCancel}
        />
      )}

       {tableData && 
       <Table 
        columns={PaymentTableColumns}
        onSelectionChange={onSelectionChange}
        data={tableData.rows}
        totalCount={tableData.totalRows}
        options={{
          pageSize: 10,
          pageSizeOptions: [10],
          sorting: true,
          selection: true,
        }}
      /> }

    </div>
  );
}