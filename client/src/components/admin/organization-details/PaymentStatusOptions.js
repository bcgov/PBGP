import React, {useState, useEffect } from "react"
import {Formik, Form, Field } from "formik"
import { Box } from "@material-ui/core"
import { RenderSelectField } from "../../fields"
import { PaymentStatusOptions } from "../../../constants/arrays"
import { useUpdatePaymentStatus } from "../../../hooks/admin"
import { useCheckPaymentAuth} from '../../../hooks/admin/payment/useCheckPaymentAuth'    


export const PaymentStatusSelect = ({ initialState, width, id, type, updatePermission, applicationStatus }) =>{
    const {isUpdatePaymentStatusLoading, submitPaymentStatus} = useUpdatePaymentStatus()
    const { auth } = useCheckPaymentAuth()

    const handleSubmit = (e, resetForm) =>{
      if (e.target.value){
        submitPaymentStatus(id, e.target.value, type, resetForm, initialState)
      }else{
          resetForm()
      }
    }

    return(
        <Formik enableReinitialize  initialValues={{status: initialState}} >
            {({resetForm}) => 
          <Box style={{width: width || 160,}}>
            <Field
              name="status"
              component={RenderSelectField}
              options={PaymentStatusOptions}
              onClick={(e)=>{handleSubmit(e, resetForm)}}
              size="small"
              disabled={!auth || !(updatePermission==true && applicationStatus=="approved")}
              style={{ outline: "red"}}
          />
          </Box >}
        </Formik>
    )
}