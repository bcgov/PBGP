import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAgreementFiles, useAgreementTasks } from "hooks/admin";
import { useToast } from "../hooks";
import { AxiosPrivate } from "../utils";

export const OrganizationContext = React.createContext({
  organization: {
    refreshData: () => null,
    setSkeletonLoading: () => null,
    setOrganizationDetails: () => null,
    setOperatorDetails: () => null,
    setEmployeeDetails: () => null,
    setFormValues: () => null,
    isSkeletonLoading: false,
    formValues: null,
    organizationDetails: null,
    operatorDetails: null,
    employeeDetails: null,
  },
  agreementTasks: {
    refreshTasks: () => null,
    setTasks: () => null,
    isFetchingTasks: false,
    taskData: null,
  },
  agreementFiles: {
    refreshFiles: () => null,
    setFilesList: () => null,
    isFetchingFiles: false,
    filesList: null,
  },
});

export const OrganizationProvider = ({ children }) => {
  const { id } = useParams();
  const { openToast } = useToast();
  const { t } = useTranslation();

  const { refreshTasks, setTasks, isFetchingTasks, taskData } = useAgreementTasks();
  const { refreshFiles, setFilesList, isFetchingFiles, filesList } = useAgreementFiles();

  const [isSkeletonLoading, setSkeletonLoading] = useState(undefined);
  const [organizationDetails, setOrganizationDetails] = useState(null);
  const [operatorDetails, setOperatorDetails] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [formValues, setFormValues] = useState(null);

  const refreshData = async (showSkeleton = true) => {
    if (showSkeleton) setSkeletonLoading(true);

    try {
      const { data } = await AxiosPrivate.get(
        `/api/v2/assessment-portal/organization/${id}`
      );
      for (const { id: subId } of data.submissions) {
        const { data: submission } = await AxiosPrivate.get(
          `/api/v2/assessment-portal/organization/${id}/submission/${subId}`
        );

        // This only gets called once on page mount to avoid re-fetching of the void cheque
        // whenever refreshing data in response to other actions.
        if (submission.submissionType === "organization" && !organizationDetails?.data?.void_cheque) {
          try{
            const { data: voidChequePhotoURI } = await AxiosPrivate.get(
              `/api/v2/assessment-portal/organization/${id}/submission/${subId}/cheque`
            );
            setOrganizationDetails({
              data: { void_cheque: voidChequePhotoURI },
            });
          } catch(err) {
            openToast({ status: "error", message: t("Void Cheque Download Failed") })
          }
        }

        switch (submission.submissionType) {
          case "organization":
            setOrganizationDetails((prevState) => ({
              ...submission,
              data: { ...submission.data, ...(prevState ? { ...prevState.data } : {}) },
            }));
            break;
          case "operator":
            if (submission?.data?.isCompleted || (submission?.status && submission?.status !== 'duplicated')) {
              setOperatorDetails(submission);
            }
            break;
          case "employee":
            setEmployeeDetails(submission);
            break;
          default:
            return;
        }
      }
      await refreshFiles();
      await refreshTasks();

      setFormValues(data);
    } catch (e) {
      openToast({ status: "error", message: e.message || t("Login failed") });
    } finally {
      if (showSkeleton) setSkeletonLoading(false);
    }
  };

  /**
   * Fetch everything on mount.
   */
  React.useEffect(() => {
    refreshData();
  }, []);

  return (
    <OrganizationContext.Provider
      value={{
        organization: {
          refreshData,
          setSkeletonLoading,
          setOrganizationDetails,
          setOperatorDetails,
          setEmployeeDetails,
          setFormValues,
          isSkeletonLoading,
          organizationDetails,
          operatorDetails,
          employeeDetails,
          formValues,
        },
        agreementTasks: {
          refreshTasks,
          setTasks,
          isFetchingTasks,
          taskData,
        },
        agreementFiles: {
          refreshFiles,
          setFilesList,
          isFetchingFiles,
          filesList,
        },
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
