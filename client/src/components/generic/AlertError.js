import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';

export const AlertError = ({ message }) => {
    return (
        <Container maxWidth="sm" style={{marginBottom: '15px'}}>
            <Alert severity="error" style={{ color: "black", backgroundColor: "rgba(255, 0, 0, 0.2)", border: "1px solid red" }}>
                {message}
            </Alert>
        </Container>
    );
};
