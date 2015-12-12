ExternalApi = {};

ExternalApi.call = function externalApiCall(args, callback) {
  var errorCode;
  var errorMessage;
  var method = (args.method || 'GET').toLowerCase();
  var url = args.url;
  var errorProperties = args.errorProperties;
  var httpOptions = args.httpOptions || {};

  if (! url) {
    errorMessage = 'Cannot make HTTP request without a URL';
  }
  if (! HTTP.hasOwnProperty(method)) {
    errorMessage = 'Cannot make HTTP request without an HTTP method';
  }
  if (httpOptions && typeof httpOptions !== 'object') {
    errorMessage = 'Cannot make HTTP request if options are not an object';
  }
  if (errorMessage) {
    errorCode = 500;
    callback(new Meteor.Error(errorCode, errorMessage), null);
  }

  try {
    var response = HTTP.call(method, url, httpOptions).data;

    callback(null, response);
  }
  catch (e) {
    // If the API responded with an error message and a payload
    if (e.response) {
      if (errorProperties.code && errorProperties.message) {
        errorCode = e.response.data[errorProperties.code];
        errorMessage = e.response.data[errorProperties.message];
      }
      else {
        errorCode = 500;
        errorMessage = 'Cannot give an API specific error without errorProperties defining code and message';
      }
    }
    else {
      errorCode = 500;
      errorMessage = 'Cannot access the API';
    }

    callback(new Meteor.Error(errorCode, errorMessage), null);
  }
};

ExternalApi.callSync = Meteor.wrapAsync(ExternalApi.call);
