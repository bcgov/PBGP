import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import { Box, Grid } from '@material-ui/core';
import { CommentBox } from 'components/form/topup/CommentBox';
import { Header } from './Header';
import { Footer } from './Footer';

export const Page = ({
  hideHeader,
  hideFooter,
  centerContent,
  isLoading,
  children,
  showComments,
  commentData,
  maxWidth = 'md',
}) => {
  const content = isLoading ? <CircularProgress /> : children;
  return (
    <>
      {!hideHeader && <Header />}
      {!centerContent ? (
        showComments ? (
          <Box component={Grid} flex='true' flexDirection='row' container id='page-wrapper'>
            <Hidden xsDown>
              <Box component={Grid} item xs={12} sm={3} borderRight='1px solid #DCDCDC'>
                <CommentBox commentData={commentData} />
              </Box>
            </Hidden>

            <Hidden smUp>
              <Box component={Grid} item xs={12} sm={3}>
                <CommentBox commentData={commentData} />
              </Box>
            </Hidden>

            <Box component={Grid} item xs={12} sm={9}>
              {content}
            </Box>
          </Box>
        ) : (
          content
        )
      ) : (
        <Box
          minHeight='calc(100vh - 20vh)'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          {content}
        </Box>
      )}
      {!hideFooter && <Footer maxWidth={maxWidth} />}
    </>
  );
};
