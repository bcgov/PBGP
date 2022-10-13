import { Container, Typography } from "@material-ui/core";
import { Page, PageHeader } from "components/generic";
import React from "react";

function AppClosed() {
    const headerText = process.env.REACT_APP_CLOSED_HEADER_TEXT ?? window._env_.REACT_APP_CLOSED_HEADER_TEXT;
    const bodyText = process.env.REACT_APP_CLOSED_BODY_TEXT ?? window._env_.REACT_APP_CLOSED_BODY_TEXT;
  return (
    <Page>
      <PageHeader header={headerText} />
      <Container maxWidth="md" style = {{paddingTop: '50px'}}>
        <Typography paragraph variant='h6' align='justify'>
          {bodyText}
        </Typography>
      </Container>
    </Page>
  );
}

export default AppClosed;
