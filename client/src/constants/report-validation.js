import moment from 'moment';
import * as yup from 'yup';
import { ReportOptions } from './arrays';

const validateDateString = (s) => /^\d{4}\/\d{2}\/\d{2}$/.test(s);

export const ReportValidationSchema = yup.object().shape({
    report: yup.string().required("Report is required"),
    fromDate: yup.string().required("From date is required").test('is-date', "Not a valid date", validateDateString),
    toDate: yup.string().required("End date is required").test('is-date', "Not a valid date", validateDateString).when('fromDate', (fromDate, schema) => {
        return yup.date().min(fromDate, "To date cannot be lesser than From date");
    }),
});


export const ReportFilterValidationSchema = yup.object().shape({
    fromDate: yup.string().optional().nullable(),
    toDate: yup.string().optional().nullable(),
    agent: yup.string().optional().nullable(),
    submissionType: yup.string().optional().nullable(),
    query: yup.string().optional().nullable().min(3, 'Value entered must be 3 characters or more').max(64, 'Value entered must be 64 characters or less'),
});

export const PaymentReportValidationSchema = yup.object().shape({
    report: yup.string().required("Report type is required").oneOf(ReportOptions.map(r => r.value)),
    fromDate: yup.lazy(value => {
        if (!!value) return yup.string().test("is date", "Not a valid date", validateDateString);
        return yup.string().optional();
    }),
    toDate: yup.string().test('is date', "Not a valid date", (toDate) =>{
            if (!!toDate) return validateDateString(toDate);
            return true;
        }).test('is later than from', 'must be later than from date', function (toDate) {
            const { fromDate } = this?.parent;
            if(!!fromDate && !!toDate) return moment(new Date(fromDate)).isSameOrBefore(moment(new Date(toDate)));
            return true;
        })
})