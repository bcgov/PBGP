import React from 'react';
import Chip from '@material-ui/core/Chip';

export const StatusChips = ({ status }) => {

    let bgColor;
    let labelColor;
    const labelValue = status && status.toUpperCase();
    switch (status) {
        case "red":
            bgColor = "red";
            labelColor = "red";
            break;
        case "yellow":
            bgColor = "#fdab01";
            labelColor = "#a86900";
            break;
        case "green":
            bgColor = "green";
            labelColor = "green";
            break;
    }
    return (
        <Chip variant="outlined" style={{ borderColor: bgColor, color: labelColor}} label={labelValue}/>
    );


}