
import React, {useEffect} from 'react';
import { Typography, makeStyles, Box, Paper, IconButton, TablePagination, Icon, useTheme } from '@material-ui/core';
import MaterialTable from 'material-table';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TableRow from '@material-ui/core/TableRow';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import { Button } from 'components/generic';
import { CancelOutlined, Delete } from '@material-ui/icons';
import { Theme } from 'constants';
import { useState } from 'react';

const useStyles = makeStyles((Theme) => ({
  root: {
    border: '1px solid #CDCED2',
    borderRadius: '5px',
    boxShadow: 'none',
    padding: '0px 1px 0px 1px'
  },
  paginationRoot: {
    flexShrink: 0,
    marginLeft: Theme.spacing(2),
    display: 'flex',
    direction: 'row',
    justifyContent: "flex-end",
    alignItems: "center"
  },
  editButtonWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  editButton: {
    width: '90px',
    fontSize: '14px',
    minWidth: '90px',
    lineHeight: '18px',
  },
  deleteIcon: {
    color: '#ff534a'
  },
  tableHeader: {
    display: 'contents',
  },
  checkbox: {
    '& .MuiIconButton-colorSecondary':{
      '&:hover': {
        background: 'rgba(0, 83, 164, .03)',
      }
    },
    '& .MuiCheckbox-root': {
      color: 'rgba(0, 0, 0, 0.54)',

    },
    '& .Mui-checked': {
      color: '#0053A4'
    },
  }
}))

/**
 * Applies styling to a table's header component
 */
const headerStyle = {
  color: '#002C71',
  fontSize: '14px',
  fontWeight: 600,
  borderBottom: '2px solid rgb(11, 129, 162)',
  whiteSpace: 'nowrap',
}

/**
 * Applies styling to a table's row component based on row index
 *
 * @param rowData - MTable rowData prop
 */
const rowStyle = (rowData, isAssessmentPortal) => {
  let cssProperty = {
    backgroundColor: '#fff',
    borderBottom: '1px solid #E1E1E6',
    fontSize: '14px',
    color: '#777777',
    whiteSpace: 'nowrap',
  };
  if (rowData.error) {
    cssProperty.backgroundColor = 'rgba(255, 0, 0, 0.2)'
  } else {
    if (rowData.tableData.id % 2 === 0) {
      cssProperty.backgroundColor = '#fff'
    } else {
      cssProperty.backgroundColor = '#fafafa'
    }
    if(rowData.hasOwnProperty('isValidSIN') && !rowData.isValidSIN && isAssessmentPortal) {
      cssProperty.backgroundColor = '#ffc1cc'
    }
    if(rowData.hasOwnProperty('isAlreadyPaid') && rowData.isAlreadyPaid && isAssessmentPortal) {
      cssProperty.backgroundColor =  '#FFE79E'
    }
    if(rowData.paymentDetermination === 'some_paid') {
      cssProperty.backgroundColor =  '#ff9966'
    }

    //late paid should have higher priority
    if(!!rowData.latePaymentFlag  && rowData.employeePaymentStatus.props.initialState === 'Paid' && !rowData.paymentDetermination) {
      cssProperty.backgroundColor =  '#C6E2F8'
    }

    if(rowData.higlighted) {
      Object.assign(cssProperty, {
        borderLeft: '40px solid #0A81A2'
      });
    }

  }
  return cssProperty
}

/**
 * Override for MTable Toolbar component
 */
const CustomToolbar = () => (
  null
)

const CustomActions = (props) => {
  const classes = useStyles()

  return (
    props.action.icon === 'edit'
      ?
<Box mx={1}>
      <div className={classes.editButtonWrapper}>
        <Button className={classes.editButton} variant = "contained" style={{maxHeight: '35px', minHeight: '0px'}} text="Edit" onClick={(event) => props.action.onClick(event, props.data)} />
      </div>
</Box>
      :
<Box mx={1}>
<div className={classes.editButtonWrapper}>
        <Button className={classes.editButton} variant = "outlined" style={{maxHeight: '35px', minHeight: '0px'}} text="Delete" onClick={(event) => props.action.onClick(event, props.data)}  />
      </div>
</Box>
        // <IconButton className={classes.deleteIcon} onClick={(event) => props.action.onClick(event, props.data)} >
        //   <DeleteOutlinedIcon/>
        // </IconButton>
  )
}

/**
 * Override for MTable Container component
 */
const CustomContainer = (props) => {
  const classes = useStyles()
  return <Paper className={`${classes.root} ${classes.checkbox}`} {...props} />
}

/**
 * MTable Pagination Actions Component
 */
 const TablePaginationActions = (props)  => {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  
  return (
    <div className={classes.paginationRoot}>
    <Box mx={2}><Typography variant="caption">Total: {count}</Typography></Box>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
      {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

/**
 * Styled table reusable component
 * @param isEditable - `Optional boolean | default false` flag for rendering edit and delete actions
 * @param editHandler - `Optional Function | default undefined` handler for the edit action. passes an instance of rowData to the provided Function
 * @param deleteHandler - `Optional Function | default undefined` handler for the delete action. passes an instance of rowData to the provided Function
 * @param {MaterialTableProps} props - MUI defined dialog action props
 * @param focused - Optional Number | Index of element that should be focused. Set the initial page to the index of the element + highlight the row.
 * @returns object of type ReactElement
 *
 */
export function Table ({
  count,
  isEditable = false,
  editHandler,
  deleteHandler,
  options,
  localization,
  currentPage,
  totalCount,
  onChangePage,
  isAssessmentPortal = false,
  focused=null,
  data,
  ...props
}) {

  const customComponents = {
    Toolbar: CustomToolbar,
    Container: CustomContainer,
  }
  const actions = []

  if (isEditable)  {
    customComponents['Action'] = CustomActions
    actions.push(
      {
        icon: 'edit',
        onClick: (event, rowData, ) => editHandler && editHandler(rowData)
      },
      {
        icon: 'delete',
        onClick: (event, rowData) => deleteHandler && deleteHandler(rowData)
      }
    )
  }

  // Find initial page of focused element (if defined)
  const initialPage = focused && options?.pageSize? Math.floor(focused/options.pageSize): 0;

  return (
    <MaterialTable
      style={{overflow: 'auto'}}
      components={{
        ...customComponents,
        // Manual definition mandatory - props get lost when implicitly passed through 'customComponents' array
        Pagination: function(props){          
          return(
            <>
            {
              onChangePage
                ?
              <TablePagination
                {...props}
                count={totalCount}
                onChangePage={(event, page) => onChangePage(page)}
                page={currentPage}
                ActionsComponent={TablePaginationActions}
              />
                :
              <TablePagination
                {...props}
                ActionsComponent={TablePaginationActions}
                count={totalCount}
              />
            }
            </>

          )
        }
      }}
      options={{
        initialPage: initialPage,
        headerStyle: headerStyle,
        selectionProps: (rowData) => ({
          color: 'primary',
        }),
        rowStyle: rowData => rowStyle(rowData, isAssessmentPortal),
        sorting: false,
        pageSize: 20,
        paginationType: 'stepped',
        pageSizeOptions: [5, 6, 7, 8, 9, 10, 20],
        actionsColumnIndex: -1,
        ...options,
      }}
      actions={actions}
      data={data}
      localization={{
        header: {
          actions: ' '
        },
        body: {
          addTooltip: 'Action',
          ...localization?.body
        },
        ...localization
      }}
      {...props}
    />
  );
}
