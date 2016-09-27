ExternalApi = {};

ExternalApi.call = ({httpOptions = {}, method = 'GET', url}, callback) => {
  const errorCode = 500;

  if (! url) {
    const errorMessage = 'Cannot make HTTP request without a URL';
    callback(new Meteor.Error(errorCode, errorMessage));
  }
  if (! HTTP.hasOwnProperty(method.toLowerCase())) {
    const errorMessage = `HTTP does not have the method ${method.toLowerCase()}`;
    callback(new Meteor.Error(errorCode, errorMessage));
  }

  try {
    const response = HTTP.call(method.toLowerCase(), url, httpOptions).data;
    callback(null, response);
  }
  catch (error) {
    // if the API responded with an error message and a payload, stringify the payload
    const errorMessage = error.response ? JSON.stringify(error.response.data) : 'Cannot access the API';
    callback(new Meteor.Error(errorCode, errorMessage), null);
  }
};

ExternalApi.callSync = Meteor.wrapAsync(ExternalApi.call);
