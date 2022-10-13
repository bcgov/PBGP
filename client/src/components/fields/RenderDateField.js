import React, { Fragment } from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { getIn } from 'formik';
import { useTranslation } from "react-i18next";

import { dateToString, stringToDate } from '../../utils';

import { InputFieldError, InputFieldLabel } from '../generic';

const useStyles = makeStyles((theme) => ({
  root: {
    '& svg': {
      fill: theme.palette.primary.main,
    },
  },
}));

export const RenderDateField = ({
  field: { value, name },
  form: { touched, errors, setFieldValue, setFieldTouched },
  label,
  placeholder,
  ...props
}) => {
  const classes = useStyles();
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const { t, i18n } = useTranslation();

  return (
    <Fragment>
      {label && <InputFieldLabel label={t(label)} />}
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={i18n.language}>
        <KeyboardDatePicker
          name={name}
          format="YYYY/MM/DD"
          InputAdornmentProps={{ id: `mui-component-calendar-${name}`, classes: { root: classes.root } }}
          value={!value ? null : stringToDate(value)}
          onChange={(value) => {
            if (value) {
              setFieldValue(name, dateToString(value))
          } else {
          setFieldValue(name, "")
          }
          }}
          onBlur={() => setFieldTouched(name, true)}
          invalidDateMessage={null}
          minDateMessage={null}
          maxDateMessage={null}
          error={touch && !!error}
          openTo="date"
          okLabel={t("OK")}
          cancelLabel={t("Cancel")}
          placeholder={t(placeholder)}
          variant="dialog"
          inputVariant="outlined"
          fullWidth
          disableFuture
          {...props}
        />
      </MuiPickersUtilsProvider>
      {touch && !!error && <InputFieldError error={t(error)} />}
    </Fragment>
  );
};
