import React from "react";
import { Box } from "@material-ui/core";

export const PaymentState = ({ text }) => {
  let color = "#000";
  let bg = "#fff";

  switch (text) {
    case "Not Paid":
      color = "#555555";
      bg = "#cccccc";
      break;

    case "Paid":
      color = "#5bc27b";
      bg = "#eefef4";
      break;

    case "Payment Failed":
      color = "#ff534a";
      bg = "#fbcbc9";
      break;

    case "Pending Payment":
      color = "#feba35";
      bg = "#ffeece";
      break;
  }

  return (
    <Box
      style={{
        color,
        backgroundColor: bg,
        padding: "4px 20px",
        borderRadius: "999px",
        fontWeight: "bold",
      }}
    >
      {text}
    </Box>
  );
};
