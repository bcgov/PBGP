import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Avatar, Box, Divider, Grid } from "@material-ui/core";
import { Card } from "../generic";

export const SidebarSkeleton = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        height={32}
        style={{ marginTop: 6, marginBottom: 8 }}
      />
      <Divider />
      <Skeleton animation="wave" height={28} style={{ marginTop: 16 }} />
      <Box display="flex" alignItems="center" mt={0.75}>
        <Skeleton
          variant="circle"
          height={28}
          width={28}
          style={{ marginRight: 8 }}
        >
          <Avatar />
        </Skeleton>
        <Skeleton animation="wave" height={20} width="100%" />
      </Box>
      <Skeleton
        animation="wave"
        height={25}
        width="25%"
        style={{ marginTop: 12 }}
      />
      <Skeleton
        animation="wave"
        height={25}
        width="40%"
        style={{ marginTop: 12 }}
      />
      <Skeleton animation="wave" height={48} style={{ marginTop: 12 }} />
      <Skeleton
        animation="wave"
        height={200}
        style={{ marginTop: 12, marginBottom: 12 }}
      />
      <Divider />
      <Skeleton animation="wave" height={25} style={{ marginTop: 12 }} />
      <Skeleton
        animation="wave"
        height={25}
        style={{ marginTop: 5, marginBottom: 12 }}
      />
      <Divider />
      <Skeleton animation="wave" height={25} style={{ marginTop: 12 }} />
      <Skeleton animation="wave" height={25} style={{ marginTop: 8 }} />
      <Skeleton animation="wave" height={25} style={{ marginTop: 8 }} />
    </>
  );
};

export const FormCardSkeleton = () => {
  return (
    <>
      <Card loading>
        <Skeleton
          animation="wave"
          height={22}
          width="25%"
          style={{ marginTop: 2 }}
        />
        <Skeleton
          animation="wave"
          height={22}
          width="20%"
          style={{ marginTop: 28 }}
        />
        <Skeleton
          animation="wave"
          height={25}
          width="20%"
          style={{ marginTop: 28, marginBottom: 18 }}
        />
        <Divider />
        <Box mt={4} mx={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>

            <Grid item xs={12}>
              <Box my={4}>
                <Skeleton animation="wave" height={65} width="100%" />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6} />

            <Grid item xs={12}>
              <Box my={4}>
                <Skeleton animation="wave" height={65} width="100%" />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6} />

            <Grid item xs={12}>
              <Box my={4}>
                <Skeleton animation="wave" height={65} width="100%" />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6} />

            <Grid item xs={12}>
              <Box my={4}>
                <Skeleton animation="wave" height={65} width="100%" />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" height={55} width="100%" />
            </Grid>

            <Grid item xs={12}>
              <Box my={2.75}>
                <Skeleton animation="wave" height={75} width={100} />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box mb={3}>
                <Skeleton
                  animation="wave"
                  height={55}
                  width="100%"
                  style={{ marginRight: 8 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export const PaymentDetailsSkeleton = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Skeleton animation="wave" height={210} width="100%" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton animation="wave" height={210} width="100%" />
        </Grid>
      </Grid>
    </>
  );
};
