import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import {
  AxiosPrivate,
  getOptionalURLParams,
  setOptionalURLParams,
  removeOptionalURLParam,
  dateToString,
  utcToLocalString,
  cdtToLocalString
} from 'utils';
import { Route } from 'constants/routes';
import { LookupAssessmentTableColumns } from 'constants/assessment-portal/tableColumns';
import { activeTaskTypes, HealthOptions, orderTypes, SubmissionStatusTypes, PaymentStatus,PaymentStatusTypes, PaymentDeterminationTypes } from '../../../constants';
import { Button } from 'components/generic';
import { StatusCell } from 'components/generic/StatusCell';
import { useToast } from 'hooks';
import { PaymentStatusSelect } from "../../../components/admin/organization-details/PaymentStatusOptions"

export const validDateOrEmpty = dstr => {
  if(!dstr) { return ''; }
  const asDate = moment(dstr);
  return asDate.isValid()? asDate.format('YYYY-MM-DD'): '';
};

/**
 * Format text that should be used for filter pills.
 *
 * display:
 *    Given the current filter values, should return a string that should be displayed
 *
 * isZeroState:
 *    Given the current filter values, should return true if the current values can
 *    be considered to be the values zero state
 */
export const formatFilterPills = {
  date: {
    display: ({fromDate, toDate}) => {
      if(fromDate && toDate) {
        return `${dateToString(fromDate)} - ${dateToString(toDate)}`;
      } else if (fromDate) {
        return `From ${dateToString(fromDate)}`;
      } else if (toDate) {
        return `To ${dateToString(toDate)}`;
      } else {
        return '';
      }
    },
    isZeroState: ({fromDate, toDate}) => !fromDate && !toDate
  },
  submissionDate: {
    display: ({submissionDate}) => {
      return `Submission date: ${dateToString(submissionDate)}`
    },
    isZeroState: ({submissionDate}) => !submissionDate
  },
  submissionStatus: {
    display: ({submissionStatus}) => {
      const matchingItem = SubmissionStatusTypes.find((o) => o.value === submissionStatus);
      const label = matchingItem?.label;
      if(label && label.length > 15) {
        return `Submission status: ${label.substring(0,15)}...`;
      }
      return `Submission status: ${label}`
    },
    isZeroState: ({submissionStatus}) => !submissionStatus
  },
  paymentStatus: {
    display: ({paymentStatus}) => {
      const matchingItem = PaymentStatusTypes.find((o) => o.value === paymentStatus);
      const label = matchingItem?.label;
      if(label && label.length > 15) {
        return `Payment status: ${label.substring(0,15)}...`;
      }
      return `Payment status: ${label}`
    },
    isZeroState: ({paymentStatus}) => !paymentStatus
  },
  paymentDeterminationStatus: {
    display: ({paymentDeterminationStatus}) => {
      const matchingItem = PaymentDeterminationTypes.find((o) => o.value === paymentDeterminationStatus);
      const label = matchingItem?.label;
      if(label && label.length > 15) {
        return `Payment Determination status: ${label.substring(0,15)}...`;
      }
      return `Payment Determination status: ${label}`
    },
    isZeroState: ({paymentDeterminationStatus}) => !paymentDeterminationStatus
  },
  agent: {
    display: ({agent}) => {
      return `Agent: ${decodeURIComponent(agent)}`
    },
    isZeroState: ({agent}) => !agent
  },
  healthType: {
    display: ({healthType}) => {
      const matchingItem = HealthOptions.find((o) => o.value === healthType);
      const label = matchingItem?.label;
      if(label && label.length > 15) {
        return `Health type: ${label.substring(0,15)}...`;
      }
      return `Health type: ${label}`
    },
    isZeroState: ({healthType}) => !healthType
  },
  orderBy: {
    display: ({orderBy}) => {
      const matchingItem = orderTypes.find((o) => o.value === orderBy);
      return `Order by: ${matchingItem?.label || "N/A"}`
    },
    isZeroState: ({orderBy}) => !orderBy
  },
  query: {
    display: ({query}) => {
      if(query && query.length > 10) {
        return `Query: ${query.substring(0,10)}...`;
      }
      return `Query: ${query}`
    },
    isZeroState: ({query}) => !query
  },
  activeTask:{
    display: ({activeTask}) => {
      const foundValue = activeTaskTypes.find((taskType)=>{
        return taskType.value === activeTask
      })
      if(foundValue && foundValue.label.length>10) {
        return `Active Task: ${foundValue.label.substring(0,10)}...`;
      }
      return `Active Task: ${foundValue && foundValue.label}`
    },
    isZeroState: ({activeTask}) => !activeTask
  }
};

/**
 * Parse url filters / sorting / query string from the current url
 * Formats dates + decodes url params if necessary
 */
export const parseUrlFilters = (history) => {
  let {
    page = 0,
    order = 'asc',
    fromDate = '',
    toDate = '',
    submissionDate = '',
    submissionStatus = '',
    paymentStatus = '',
    paymentDeterminationStatus = '',
    agent = '',
    healthType = '',
    orderBy = '',
    query = '',
    activeTask = ''
  } = getOptionalURLParams(history);

  if (fromDate) fromDate = moment(fromDate).startOf('day');
  if (toDate) toDate = moment(toDate).endOf('day');
  if (submissionDate) submissionDate = moment(submissionDate).startOf('day')

  if (query) {
    try {
      query = decodeURIComponent(query);
    } catch {}
  }

  return {
    page,
    order,
    fromDate,
    toDate,
    submissionDate,
    submissionStatus,
    paymentStatus,
    paymentDeterminationStatus,
    agent,
    healthType,
    orderBy,
    query,
    activeTask
  };
}

export const useAssessmentLookup = () => {
  const history = useHistory();
  const { openToast } = useToast();

  const [isFetching, setFetching] = useState(true);
  const [tableData, setTableData] = useState({
    columns: LookupAssessmentTableColumns,
    rows: [],
    totalRows: 0,
    currentPage: 0,
  });
  const [selectedSearchFilters, setSelectedSearchFilters] = useState([]);
  const [zeroStates] = useState({
    fromDate: '',
    toDate: '',
    submissionDate: '',
    submissionStatus: '',
    paymentStatus: '',
    agent: '',
    healthType: '',
    orderBy: '',
    query: '',
    activeTask: ''
  });

  const handleSetTableData = (results, numberOfResults, currentPage, updatePermission) => {
    setTableData(prevState => ({
      ...prevState,
      totalRows: numberOfResults,
      currentPage: parseInt(currentPage),
      rows: results.map(({id, confirmationNumber, name, lastUpdated, owner,submissionDate ,organizationStatus, employeeStatus, operatorStatus, employeePaymentStatus, operatorPaymentStatus, latePaymentFlag, paymentDetermination}) => ({
        paymentDetermination,
        latePaymentFlag,
        confirmationNumber,
        lastUpdated: lastUpdated && utcToLocalString(lastUpdated,'YYYY/MM/DD hh:mm A'),
        owner,
        name,
        submissionDate: submissionDate && cdtToLocalString(submissionDate,'YYYY/MM/DD hh:mm A'),
        organizationStatus: (
          <StatusCell submissionStatus={organizationStatus}/>
        ),
        employeeBenefitStatus: (
          <StatusCell submissionStatus={employeeStatus}/>
        ),
        operatorBenefitStatus: (
          <StatusCell submissionStatus={operatorStatus}/>
        ),
        viewOrg: (
          <Button
            text="View"
            variant="outlined"
            size="small"
            onClick={() => history.push(`${Route.AdminPortalOrganizationDetails}/${id}`)}
          />
        ),
        operatorPaymentStatus: operatorPaymentStatus&&<PaymentStatusSelect initialState={operatorPaymentStatus} width={200} id={id} type="operator" updatePermission={updatePermission} applicationStatus={operatorStatus} />,
        employeePaymentStatus: employeePaymentStatus&&<PaymentStatusSelect initialState={employeePaymentStatus} width={200} id={id} type="employee" updatePermission={updatePermission} applicationStatus={employeeStatus} />
      }))
    }))
  };

  useEffect(() => {
    (async () => {
      try {
        setFetching(true);

        const filterValues = parseUrlFilters(history);
        const {
          page,
          order,
          fromDate,
          toDate,
          submissionDate,
          submissionStatus,
          paymentStatus,
          paymentDeterminationStatus,
          agent,
          healthType,
          orderBy,
          query,
          activeTask,
        } = filterValues;

        // Find applicable filters that have been changed (not in their zero-state)
        const appliedFilters = [
          'date',
          'submissionDate',
          'submissionStatus',
          'paymentStatus',
          'paymentDeterminationStatus',
          'agent',
          'healthType',
          'orderBy',
          'query',
          'activeTask'
        ].filter(f => !formatFilterPills[f].isZeroState(filterValues));

        // Update state with the filters that have been applied
        // this populates the filter "pills" at the top of the work list
        setSelectedSearchFilters(appliedFilters.map(f => ({
          value: f,
          label: formatFilterPills[f].display(filterValues),
        })));

        // Construct query
        let qs = `page=${page || 0}&agent=${agent || 'all'}&order=${order || 'asc'}&orderBy=${orderBy || 'name'}`;
        if(fromDate) {
          qs += `&fromDate=${moment(fromDate).toISOString()}`;
        }

        if(toDate) {
          qs += `&toDate=${moment(toDate).toISOString()}`;
        }

        if(submissionDate) {
          qs += `&submissionDate=${moment(submissionDate).toISOString()}`;
        }

        if(submissionStatus){
          let [statusType, status] = submissionStatus.split("_");
          qs += `&statusType=${statusType}&status=${status}`;
        }
        let finalPaymentStatus;
        if(paymentStatus) {
          let [statusType, status] = paymentStatus.split("_");

          switch (status) {
              case 'paid':
                finalPaymentStatus ='Paid'
                break;
              case 'notPaid':
                finalPaymentStatus ='Not Paid'
                break;
              case 'pending':
                finalPaymentStatus ='Pending Payment'
                break;
              case 'failed':
                finalPaymentStatus ='Payment Failed'
                break;

          }
          qs += `&paymentStatusType=${statusType}&paymentStatus=${finalPaymentStatus}`;
        }
        let finalPaymentDeterminationStatus;
        if(paymentDeterminationStatus) {
          let [statusType, status] = paymentDeterminationStatus.split("_");

          switch (status) {
              case 'allPaid':
                finalPaymentDeterminationStatus ='all_paid'
                break;
              case 'somePaid':
                finalPaymentDeterminationStatus ='some_paid'
                break;
              case 'noConfirm':
                finalPaymentDeterminationStatus ='not_confirm'
                break;

          }
          qs += `&paymentDeterminationStatus=${finalPaymentDeterminationStatus}`;
        }

        if(healthType){
          qs += `&healthType=${healthType}`;
        }

        if(query){
          qs += `&query=${query}`;
        }

        if(activeTask){
          qs += `&activeTask=${activeTask}`
        }

        // Actually perform search
        const { results = [], numberOfResults = 0, updatePermission = false, } = (await AxiosPrivate.get(`/api/v2/assessment-portal/search?${qs}`)).data;
        handleSetTableData(results, numberOfResults, page, updatePermission);
      } catch (e) {
        openToast({ status: 'error', message: e.message || 'Failed to lookup' });
      } finally {
        setFetching(false);
      }
    })();
  }, [history.location.search]);

  return {
    onSubmit: ({ fromDate, toDate, submissionDate, submissionStatus, paymentStatus, paymentDeterminationStatus, agent, healthType, orderBy, query, activeTask }) => {
      if (fromDate) fromDate = validDateOrEmpty(fromDate);
      if (toDate) toDate = validDateOrEmpty(toDate);
      if (submissionDate) submissionDate = validDateOrEmpty(submissionDate);

      return setOptionalURLParams(history, {
        page: 0,
        ...(fromDate ? { fromDate } : {}),
        ...(toDate ? { toDate } : {}),
        ...(submissionDate ? { submissionDate } : {}),
        ...(submissionStatus ? { submissionStatus } : {}),
        ...(paymentStatus ? { paymentStatus } : {}),
        ...(paymentDeterminationStatus ? { paymentDeterminationStatus } : {}),
        ...(agent ? { agent } : {}),
        ...(healthType ? { healthType } : {}),
        ...(orderBy ? { orderBy } : {}),
        ...(query ? { query } : {}),
        ...(activeTask? {activeTask}: {})
      })
    },
    onSearch: (query) => setOptionalURLParams(history, { query, page: 0 }),
    onFilter: (filter) => setOptionalURLParams(history, { filter, page: 0 }),
    onAgent: (agent) => setOptionalURLParams(history, { agent, page: 0 }),
    onSort: (orderBy, order) => setOptionalURLParams(history, { orderBy, order, page: 0 }),
    onChangePage: (page) => setOptionalURLParams(history, { page }),
    clearFilter: (filter) => removeOptionalURLParam(history, filter),
    tableData,
    isFetching,
    selectedSearchFilters,
    zeroStates,
  };
};

export const useListActiveAgents = () => {
  const history = useHistory();
  const { openToast } = useToast();

  const [isFetching, setFetching] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [initialAgent, setInitialAgent] = useState(null);
  const [options, setOptions] = useState([{
    value: 'all', label: 'All'
  }]);

  useEffect(() => {
    (async () => {
      // Find and decode agent name if specified with `agent` url param
      const { agent=null } = getOptionalURLParams(history);
      let agentName = null;

      try {
        agentName = agent? decodeURIComponent(agent): null;
      } catch {}

      setFetching(true);

      // Retrieve all activate agents
      try {
        const {data: agents} = await AxiosPrivate.get(`/api/v2/assessment-portal/agents`)
        const options = [{value: 'all', label: 'All'}].concat(
          agents && agents.length? agents.map(a => ({
            value: a.name,
            label: a.name
          })): [])
        const initialAgent = agents?.length && agents.find(a => a.name === agentName);

        setOptions(options)
        if(initialAgent) {
          setInitialAgent(initialAgent);
        }
      } catch (e) {
        openToast({ status: 'error', message: `Failed to get agents` })
      } finally {
        setFetching(false);
        setHasExecuted(true);
      }
    })();
  }, []);

  return {
    isFetching,
    initialAgent,
    hasExecuted,
    options,
    setInitialAgent,
  }
}

