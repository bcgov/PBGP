import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Route } from 'constants/routes';
import { AxiosPublic, AxiosPrivate, serializeTopupFormValues } from 'utils';
import { useToast } from 'hooks';
import { useTranslation } from 'react-i18next';
import { Route as Routes } from 'constants/routes';
import { useFormikContext, Field } from 'formik';

export const useOperatorInfoForm = () => {
  const history = useHistory();
  const [isFetching, setFetching] = useState(false);
  const { openToast } = useToast();
  const { t } = useTranslation();
  const { id } = useParams();
  return {
    isFetching,
    submit: async (values, editMode) => {
      try {
        setFetching(true);
        await AxiosPrivate.patch(
          `/api/v1/topup/operator/${id}/${editMode ? 'update' : 'submit'}`,
          serializeTopupFormValues(values, 'operator')
        );
        openToast({
          status: 'warning',
          message: t(
            'Your submission is now in draft form, please review the application declaration to complete submission'
          ),
        });
        history.push(Route.Root);
      } catch (e) {
        openToast({ status: 'error', message: e.message || t('Failed to submit form') });
      } finally {
        setFetching(false);
      }
    },
  };
};

export const useAutoSave = () => {
  const { id } = useParams();
  const [isFetching, setFetching] = useState(false);
  const { openToast } = useToast();
  const { t } = useTranslation();
  const { values } = useFormikContext();
  return {
    isFetching,
    autoSave: async (values) => {
      try {
        setFetching(true);
        await AxiosPrivate.patch(
          `/api/v1/topup/operator/${id}`,
          serializeTopupFormValues(values, 'operator')
        );
        openToast({ status: 'success', message: t('Your form has been auto-saved') });
      } catch (e) {
        openToast({ status: 'warning', message: t('The form could not auto-save') });
      } finally {
        setFetching(false);
      }
    },
  };
};
