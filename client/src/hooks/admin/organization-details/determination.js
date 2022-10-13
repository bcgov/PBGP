import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AxiosPrivate } from 'utils';
import { OrganizationContext } from "providers";
import { useAuth, useManualSinCheck, useModal, useToast } from 'hooks';

export const useDetermination = () => {
  const { openToast } = useToast();
  const { openModal, closeModal } = useModal();
  const { t } = useTranslation();
  const [isSubmittingAssignee, setIsSubmittingAssignee] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingActionItem, setSubmittingActionItem] = useState(false);
  const [isSubmittingFinalDetermination, setSubmittingFinalDetermination] = useState(false);
  const [isResettingStatusToPending, setResettingStatusToPending] = useState(false);
  const { showExportedWarningModal } = useManualSinCheck()
  const { state: { user } } = useAuth();
  const {
    organization: { refreshData, setFormValues, setOperatorDetails, setEmployeeDetails },
    agreementTasks: { setTasks },
    agreementFiles: { refreshFiles },
  } = React.useContext(OrganizationContext);

  const assign = async (organizationId) => {
    try {
      setIsSubmittingAssignee(true);
      const res = await AxiosPrivate.post(`/api/v2/assessment-portal/organization/${organizationId}/assign`);

      if (res.data === "Status: 204"){
        showExportedWarningModal()
      }

      setFormValues((prevState) => ({
        ...prevState,
        agent: user.idTokenPayload.name,
        assignedTo: user.idTokenPayload.id,
        assignedToMe: true,
      }));

      openToast({
        status: 'warning',
        message: `Record has been assigned to you.`,
        timeout: null,
        actionText: 'Undo Assignment',
        onActionClick: () => unassign(organizationId),
      });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to assign this organization' })
    } finally {
      setIsSubmittingAssignee(false);
    }
  };

  const unassign = async (organizationId) => {
    try {
      closeModal();
      setIsSubmittingAssignee(true);
      await AxiosPrivate.post(`/api/v2/assessment-portal/organization/${organizationId}/assign/undo`);

      setFormValues((prevState) => ({
        ...prevState,
        agent: null,
        assignedTo: null,
        assignedToMe: false,
      }));

      openToast({ status: 'success', message: 'Organization unassigned' });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to unassign this Organization' });
    } finally {
      setIsSubmittingAssignee(false);
    }
  };

  const submitComment = async (organizationId, values, resetForm) => {
    try {
      closeModal();
      setIsSubmittingComment(true);
      const { data: activity } = await AxiosPrivate.post(`/api/v2/assessment-portal/organization/${organizationId}/activity`, values);

      resetForm({ note: '', status: '' });
      setFormValues((prevState) => ({
        ...prevState,
        activities: [
          { ...activity, agentName: user.idTokenPayload.name },
          ...prevState.activities,
        ],
      }));

      openToast({ status: 'success', message: 'Comment added' });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to add comment' });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const submitAction = async (actionItemId) => {
    try {
      setSubmittingActionItem(true)
      const {data: {tasks}} = await AxiosPrivate.patch(`/api/v2/assessment-portal/tasks/action-item`, actionItemId)
      await refreshFiles();
      setTasks(tasks);
      openToast({ status: 'success', message: t('Action Item completed successfully') })
    } catch (e) {
      openToast({ status: 'error', message: `Action item completion failed` })
    } finally {
      setSubmittingActionItem(false)
    }
  };

  const submitFinalDetermination = async (operatorDetailsOrEmployeeDetailsId, formType) => {
    try {
      closeModal()
      setSubmittingFinalDetermination(true)
      const {data: {status: status}} = await AxiosPrivate.patch(`/api/v2/assessment-portal/form/${operatorDetailsOrEmployeeDetailsId}/finish`);
      switch (formType) {
        case "operator":
          setOperatorDetails((prevState) => ({ ...prevState, status }));
          break;
        case "employees":
          setEmployeeDetails((prevState) => ({ ...prevState, status }));
          break;
      }

      openToast({ status: 'success', message: 'Application finalized' });

      await refreshData(false);
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to finalize operator submission' });
    } finally {
      setSubmittingFinalDetermination(false)
    }
  };

  const resetFormStatusToPending = async (operatorDetailsOrEmployeeDetailsId, type) => {
    try {
      closeModal()
      setResettingStatusToPending(true)
      await AxiosPrivate.post(`/api/v2/assessment-portal/reset-form-status/${operatorDetailsOrEmployeeDetailsId}`);

      switch (type) {
        case "operator":
          setOperatorDetails((prevState) => ({ ...prevState, status: "pending" }));
          break;
        case "employees":
          setEmployeeDetails((prevState) => ({ ...prevState, status: "pending" }));
          break;
      }

      openToast({ status: 'success', message: `Form Status Reset successfully` });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to reset Form status' });
    } finally {
      setResettingStatusToPending(false)
    }
  }

  return {
    isSubmittingAssignee,
    isSubmittingComment,
    isSubmittingActionItem,
    isSubmittingFinalDetermination,
    isResettingStatusToPending,
    assign,
    unassign: (formId, confirmationNumber, agent) => {
      openModal({
        title: 'Are you Sure?',
        description: `This record is already assigned to ${agent}. Are you sure you want to unassign this record?`,
        negativeActionText: 'No',
        positiveActionText: 'Yes',
        negativeActionOnClick: () => closeModal(),
        positiveActionOnClick: () => unassign(formId, confirmationNumber),
      });
    },
    submitComment: (organizationId, values, resetForm) => {
      openModal({
        title: 'Ready to Submit?',
        description: `Are you ready to submit this comment?\n ${values.status === "Action Items" ? "This comment will be visible to the operator." : ''}`,
        negativeActionText: 'No',
        positiveActionText: 'Yes, submit now.',
        negativeActionOnClick: () => closeModal(),
        positiveActionOnClick: () => submitComment(organizationId, values, resetForm),
      });
    },
    submitAction,
    submitFinalDetermination: (operatorDetailsOrEmployeeDetailsId, formType, status) => openModal({
      title: 'Confirm Valid',
      description: `Please confirm the status of this information, this will finish processing of the application.`,
      negativeActionText: 'Back',
      positiveActionText: 'Confirm',
      //please do not add "id" here:
      // positiveActionOnClick: (id) => handleSubmit(id),
      //^^ is breaking this link
      positiveActionOnClick: () => submitFinalDetermination(operatorDetailsOrEmployeeDetailsId, formType, status),
      negativeActionOnClick: () => closeModal(),
    }),
    resetFormStatusToPending: (operatorDetailsOrEmployeeDetailsId, formType) => openModal({
      title: 'Confirm Reset Form Status',
      description: `Please confirm the status of this information, this will reset the form to pending status of the application.`,
      negativeActionText: 'Back',
      positiveActionText: 'Confirm',
      //please do not add "id" here:
      // positiveActionOnClick: (id) => handleSubmit(id),
      //^^ is breaking this link
      positiveActionOnClick: () => resetFormStatusToPending(operatorDetailsOrEmployeeDetailsId, formType),
      negativeActionOnClick: () => closeModal(),
    })
  }
}
