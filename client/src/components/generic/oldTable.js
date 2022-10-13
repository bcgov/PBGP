import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { getOptionalURLParams } from '../../utils';

import { Card } from './Card';

export const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.darkGrey,
  },
  body: {
    fontSize: 14,
    borderColor: theme.palette.divider,
    overflowWrap: 'anywhere',
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#FAFAFA',
    },
  },
}))(TableRow);

export const StyledTableSortLabel = withStyles((theme) => ({
  root: {
    color: `${theme.palette.common.white} !important`,
  },
  icon: {
    color: `${theme.palette.common.white} !important`,
    opacity: 0.15,
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      right: '-30px'
    }
  },
}))(TableSortLabel);

export const Table = ({
  columns,
  rowsPerPage = 0,
  rows,
  totalRows,
  currentPage,
  isLoading,
  onSort,
  onChangePage,
}) => {
  const history = useHistory();
  const { orderBy = columns[0].value, order = 'asc' } = getOptionalURLParams(history);

  const handleRequestSort = (value) => (event) => {
    onSort(value, (orderBy === value && order === 'asc') ? 'desc' : 'asc');
  };

  const handleRequestChangePage = (event, page) => {
    window.scrollTo(0, 0);
    onChangePage(page);
  };

  const renderLoader = () => [...Array(rows.length || rowsPerPage || 10)].map((_, index) => (
    <TableRow key={index}>
      <TableCell style={{ border: 'none', paddingTop: 10, paddingBottom: 10 }} colSpan={columns.length}>
        <Skeleton height={40} animation="wave" />
      </TableCell>
    </TableRow>
  ));

  const renderNoResults = () => (
    <TableRow style={{ height: 100 }}>
      <StyledTableCell colSpan={columns.length} align="center">
        No results
      </StyledTableCell>
    </TableRow>
  );

  const renderHead = () => {
    return (
      <TableRow>
        {columns.map(({ value, label }) => (
          <StyledTableCell key={value}>
            {(!onSort || !label) ? label : (
              <StyledTableSortLabel
                active={orderBy === value}
                direction={orderBy === value ? order : 'asc'}
                onClick={handleRequestSort(value)}
              >
                {label}
              </StyledTableSortLabel>
            )}
          </StyledTableCell>
        ))}
      </TableRow>
    );
  };

  const renderBody = () => {
    return rows.map((row, index) => (
      <StyledTableRow key={index}>
        {Object.keys(row).map((key) => <StyledTableCell key={key}>{row[key]}</StyledTableCell>)}
      </StyledTableRow>
    ));
  };

  return (
    <Card style={{ overflowX: 'auto' }} noPadding>
      <MuiTable style={{ tableLayout: 'fixed' }} size="small">
        <TableHead>
          {renderHead()}
        </TableHead>
        <TableBody>
          {isLoading ? renderLoader() : rows.length === 0 ? renderNoResults() : renderBody()}
        </TableBody>
      </MuiTable>
      {(!isLoading && rows.length > 0 && rowsPerPage > 0) && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          rowsPerPage={rowsPerPage}
          count={totalRows}
          page={currentPage}
          onChangePage={handleRequestChangePage}
        />
      )}
    </Card>
  );
};
