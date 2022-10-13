export function getOptionalURLParams(history) {

  // Get query string from url (optional) or window
  let queryString = history.location.search.slice(1);

  // Store the parameters here
  const obj = {};

  // If query string exists
  if (queryString) {

    // Stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // Split our query string into its component parts
    const arr = queryString.split('&');

    for (let i = 0; i < arr.length; i++) {
      // Separate the keys and the values
      const a = arr[i].split('=');

      // Set parameter name and value (use 'true' if empty)
      let paramName = a[0];
      let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // If the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // Create key if it doesn't exist
        const key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // If it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // Get the index value and add the entry at the appropriate position
          const index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // Otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // We're dealing with a string
        if (!obj[paramName]) {
          // If it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // If property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // Otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

export function setOptionalURLParams(history, params, overrideParams=null) {
  // Get existing optional params
  const existingParams = overrideParams || getOptionalURLParams(history);

  // Add/override any optional params to the existing ones
  Object.keys(params).forEach(key => existingParams[key] = encodeURIComponent(params[key]));

  // Build a query string based on the new params
  const queryString = Object.keys(existingParams).map(key =>`${key}=${existingParams[key]}`).join('&');

  // Silently replace the url with the optional params
  history.replace(`${history.location.pathname}?${queryString}`);
}

export function removeOptionalURLParam(history, param) {
  // Get existing optional params
  const existingParams = getOptionalURLParams(history);

  // Remove param from existing ones
  delete existingParams[param];

  // Update params
  setOptionalURLParams(history, {}, existingParams);
}
