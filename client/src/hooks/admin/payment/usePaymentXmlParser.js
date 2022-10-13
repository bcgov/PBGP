import React,{ useState } from 'react'
import moment from 'moment';
import xlsx from 'xlsx';
import {PaymentXlsValidation, PaymentXmlHeaderKeys } from 'constants/assessment-portal/payment-schema'

export const usePaymentXmlParser = () => {
  const [fileData, setFileData] = useState();
  const [isFileUploaded, setFileUploaded] = useState(false);
  const [isFileValid, setFileValidity] = useState(undefined);
  const [errorData, setErrorData] = useState(undefined);
  const [errorString, setErrorString] = useState('');
  const [isParsing, setParsing] = useState(false);
  const [rawData, setRawData] = useState(null)
  
  const clear = () => {
    setFileData(undefined);
    setFileUploaded(false);
    setFileValidity(undefined);
    setErrorData(undefined);
    setErrorString("");
  };

  return {
    fileData,
    rawData,
    isFileUploaded,
    isFileValid,
    errorData,
    errorString,
    isParsing,
    triggerReportDownload: () => {
      const url = window.encodeURI(errorString);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `error-report-${moment().format("YYYY-MM-DD")}.csv`);
      document.body.appendChild(link);
      link.click()
      document.body.removeChild(link);
    },
    handleFileDrop: (file) => {
      clear();
      setParsing(true);
      const BreakException = {};
      let headers = [];
      let errors = [];
      let stringifiedErrors = "data:text/csv;charset=utf-8,Row Number,Error Messages\n";
      let constructedData = [];
      let numberOfConsecutiveEmptyRows = 0;

      if (file.length) {
        const reader = new FileReader();
        const base64Reader = new FileReader();
        try{
          base64Reader.onload = function(e){
          setRawData(e.target.result);
          reader.readAsArrayBuffer(file[0]);
          }
        } catch(e){
          console.log(e)
        }
        try {
          reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);  
            const workbook = xlsx.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const parsedData = xlsx.utils.sheet_to_json(worksheet, {
              header: 1,
              blankrows: false,
              raw: false,
            });

            try {
              parsedData.map((element, index) => {
                /**
                 * Throw an exception if there have been 5 consecutive empty rows,
                 * This prevents some XML files with hundreds of thousands of empty lines
                 * from being mapped to completion.
                 *
                 * this is a fall-back in the event that xlsx reads in to many blank rows.
                 * reading in 100k blank rows won't do anything by itself, but attempting to map them
                 * may crash the browser tab
                 **/
                if (numberOfConsecutiveEmptyRows === 5) throw BreakException;

                /**
                 * Default rowEmpty to true, set to false if :
                 * the element has a length (array has indecies),
                 *
                 * Default collumnsEmpty to true, set to false if :
                 * ANY index has a truthy value.
                 * required-ness of rows will be caught during field level validation
                 *
                 * Validation will only occur on any row that has a length, and has at least 1 column value.
                 *
                 * rowEmpty is used to determine whether or not row-level validation should occur,
                 * and if the row should be added to the DTO array. Excel files have a tendency to
                 * contain X blank rows at the end of a file, and the parsing library knows when to stop when
                 * it reaches more than 2 blank rows consecutively. These blank rows are still added to the parsed array however.
                 *
                 * collumnsEmpty used similarily, but checks if a non-null row (i.e any number of indecies) contains all null collumns
                 * (e.g a row of one single whitespace per collumn).
                 * Only stays true if there are no values in the entire row's worth of collumns.
                 *
                **/

                let rowIsEmpty = true;
                let collumnsAreEmpty = true;

                if (index === 0) {

                  // Convert all headers to a trimmed lowercase string delimited by underscores
                  // Compare collected headers against the expected headers, generate errors if any are missing.
                  element.map(e => headers.push(e.trim().replace(/[/ :.]+/g, '_').toLowerCase()));
                  Object.keys(PaymentXmlHeaderKeys).map(key => {
                    if (!headers.includes(key.replace(/['"]+/g, ''))) {
                      errors.push({
                        row: 'Header row',
                        errorName: 'Header error',
                        errorMessages: ``,
                        value: key
                      })
                      stringifiedErrors += `Header Row,Expected header: ${key} but none was found.\n`
                    }
                  })
                } else {

                  // Catch if row is completely empty (blank array)
                  // Usually occurs at the trailing end of .xlsx files, as the library doesn't know when the true end is
                  // and collects a few empty rows before stopping
                  if (element.length) {
                    rowIsEmpty = false;
                  }

                  // Create a DTO object out of the array of arrays, mapping each header to it's corresponding collumn (index)
                  let dtoShape = {};
                  headers.map((el, i) => {
                    // Catch if ANY single index is truthy, then row is eligible for validation and being added to the DTO array
                    if (!!element[i]?.toString().replace(" ", "").length) {
                      collumnsAreEmpty = false;
                    }
                    dtoShape[el.trim()] = element[i]
                  });

                  // If rowIsEmpty is false, validate each DTO object as it's being created, and push the DTO to the constructed array
                  if (!rowIsEmpty && !collumnsAreEmpty) {
                    // ValidateSync is necessary to resolve all validation before exiting, regular validation method causes an empty errors array
                    try {
                      const validatedDto = PaymentXlsValidation.validateSync(dtoShape, { abortEarly: false })
                      constructedData.push(validatedDto);
                    } catch (validationError) {
                      dtoShape.error = true;
                      dtoShape.errorMessage = `${validationError?.errors?.toString().replace(/,/g, '. ')}`
                      errors.push({
                        row: index + 1,
                        errorName: validationError.name,
                        errorMessages: validationError.errors,
                        value: validationError.value
                      });
                      stringifiedErrors += `${index + 1},"${validationError?.errors?.toString().replace(/,/g, '. ')}"\n`
                    }
                  } else {
                    // if either the row is completely empty, or filled entirely with false-y values, increment the number of empty rows
                    numberOfConsecutiveEmptyRows++;
                  }
                }
              });
            } catch (e) {
              // Stop if error is expected Break exception, else re-throw error
              if (e !== BreakException) throw e
            }
            setFileData(constructedData);
            if (errors.length) {
              setErrorString(stringifiedErrors);
              setFileUploaded(true);
              setFileValidity(false);
              setErrorData(errors);
            } else {
              setFileUploaded(true);
              setFileValidity(true);
            }
          }
        } catch (error) {
          // This error will only ever have to do with the file reader failing entirely
          setFileValidity(false);
        } finally {
          setParsing(false);
        }
        base64Reader.readAsDataURL(file[0]);
      }
    }
  }
}

