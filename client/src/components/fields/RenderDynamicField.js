import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { FieldArray, FastField, Field } from 'formik';

import { RenderSelectField } from './RenderSelectField';

export const RenderDynamicField = ({
  field: { value, name },
  form: { setFieldValue },
  selectName,
  label,
  disabled,
  hideSelect,
  itemMin,
  itemMax,
  itemFields,
  itemsWrapper,
}) => {
  const handleDropdownFieldChange = (event, push, pop) => {
    const numberOfFields = event.target.value;
    setFieldValue(selectName, numberOfFields);

    if (numberOfFields > value.length) {
      const numberOfFieldsToAdd = numberOfFields - value.length;
      const newField = {};
      itemFields.map(item => item.name).forEach(key => newField[key] = '');
      for (let i = 0; i < numberOfFieldsToAdd; i++) push(newField);
    } else {
      const numberOfFieldsToRemove = value.length - numberOfFields;
      for (let i = numberOfFieldsToRemove; i > 0; i--) pop();
    }
  };

  return (
    <FieldArray name={name}>
      {({ push, pop }) => (
        <Grid container spacing={3}>

          {/** Select Field */}
          {!hideSelect && (
            <Grid item xs={12}>
              <FastField
                name={selectName}
                component={RenderSelectField}
                label={label}
                disabled={disabled}
                onChange={(e) => handleDropdownFieldChange(e, push, pop)}
                options={[...Array(itemMax - itemMin + 1)].map((_, index) =>
                  ({ value: index + itemMin, label: index + itemMin })
                )}
              />
            </Grid>
          )}

          {/** Dynamic Fields */}
          {value.length > 0 && (
            <Grid item xs={12}>
              {itemsWrapper(value.map((_, index, array) => {
                const isLastItem = index === array.length - 1;
                return (
                  <Grid key={index} container spacing={2}>
                    {itemFields.map(({ name: fieldName, label, showIf, component, dynamicOptions, md, options, ...props }) =>  {
                      let opts = dynamicOptions? dynamicOptions(index): options;
                      opts = opts? {options: opts}: {};
                      
                      return (!showIf || showIf(index)) && (
                        <Grid key={fieldName} item xs={12} md={md || 6}>
                          <Field
                            name={`${name}[${index}].${fieldName}`}
                            component={component}
                            label={label}
                            disabled={disabled}
                            {...opts}
                            {...props}
                          />
                        </Grid>
                      )})
                    }
                    {!isLastItem && (
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    )}
                  </Grid>
                );
              }))}
            </Grid>
          )}
        </Grid>
      )}
    </FieldArray>
  );
};
