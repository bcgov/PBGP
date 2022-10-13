import React from 'react'

export const numberFormat = (longNumber) => {
      if (typeof(longNumber) === "number"){
        return longNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else if (typeof(longNumber) === "string"){
        return parseFloat(longNumber).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }