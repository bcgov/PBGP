#!/bin/sh

##
# Utility script for inserting environment variables required by the app into index.html
#
# Why?
# - Env variables need to be inserted into the app at runtime instead of at build time, which happens when using `process.env.*`
# - By executing this script at run-time, the required env variables will be inserted into the head of index.html and make them available for the app to use
###

# Make sure client id / discovery endpoint is specified
: "${REACT_APP_IBM_CLIENT_ID?No client id specified}"
: "${REACT_APP_IBM_DISCOVERY_ENDPOINT?No discovery endpoint specified}"

# Replace ${REACT_APP_IBM_CLIENT_ID} / ${REACT_APP_IBM_DISCOVERY_ENDPOINT} in index.html
# with their respective env variables

CLIENTID=`echo $REACT_APP_IBM_CLIENT_ID | sed 's| *$||g'`;
DISCOVERYENDPOINT=`echo $REACT_APP_IBM_DISCOVERY_ENDPOINT | sed 's| *$||g'`;
CLIENTID=`echo $REACT_APP_IBM_CLIENT_ID | sed 's| *$||g'`;
DISCOVERYENDPOINT=`echo $REACT_APP_IBM_DISCOVERY_ENDPOINT | sed 's| *$||g'`;

sed -i'.bk' -e "s|__REACT_APP_IBM_CLIENT_ID__|$CLIENTID|g" -e "s|__REACT_APP_IBM_DISCOVERY_ENDPOINT__|$DISCOVERYENDPOINT|g"  /client/build/index.html
sed -i'.bk' -e "s|__REACT_APP_IBM_CLIENT_ID__|$CLIENTID|g" -e "s|__REACT_APP_IBM_DISCOVERY_ENDPOINT__|$DISCOVERYENDPOINT|g"  /client/build/index.html
sed -i'.bk' -e "s|__REACT_APP_IBM_CLIENT_ID__|$CLIENTID|g" -e "s|__REACT_APP_IBM_DISCOVERY_ENDPOINT__|$DISCOVERYENDPOINT|g"  /client/build/index.html
