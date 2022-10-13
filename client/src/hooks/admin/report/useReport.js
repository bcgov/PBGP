import { useToast } from "hooks/toast";
import moment from "moment";
import React, { useState } from "react";
import { AxiosPrivate } from "utils";

function useReport() {
  const { openToast, closeToast } = useToast();
  const [loading, setLoading] = useState();

  const constructQuery = ({ report, fromDate, toDate }) => {
    let qs = `?report=${report}`;
    if (!!fromDate) qs += `&fromDate=${moment(fromDate).toISOString()}`;
    if (!!toDate) qs += `&toDate=${moment(toDate).toISOString()}`;
    return qs;
  };

  const getReport = async (values) => {
    try {
      setLoading(true);
      let { data } = await AxiosPrivate.get(
        `/api/v2/assessment-portal/payment/report${constructQuery(values)}`
      );
      const link = document.createElement("a");
      link.setAttribute(
        "href",
        "data:text/csv;charset=utf-8," + encodeURIComponent(data.file)
      );
      link.setAttribute("download", data.fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      openToast({ status: "success", message: "Report download complete!" });
    } catch (e) {
      openToast({
        status: "error",
        message: e.message || "Could not download report",
      });
    }finally{
      setLoading(false);
    }
  };

  return {
    getReport,
    loading,
  };
}

export default useReport;
