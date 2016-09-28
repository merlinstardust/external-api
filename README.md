# External API

This package makes calling external APIs easier by adapting the code from ["Integrating External APIs into your Meteor.js Application"](https://dzone.com/articles/integrating-external-apis-your).

### Table of Contents
  * Functions
    * `ExternalApi.call(args, callback)`
    * `ExternalApi.callSync(args, callback)`
  * Example

### Functions

* `ExternalApi.call(args, callback)`
  * `args` - an object that requires `url` and may optionally take `method` and `httpOptions`

  ```
  {
    // String - the URL of the API to get data from
    // required
    url: 'http://api.url',

    // String - one of 'GET', 'POST', 'PUT', 'DEL'
    // optional, defaults to 'GET' if not given
    method: 'GET',

    // Object - options as defined by HTTP.call in the Meteor docs
    // optional, defaults to {}
    httpOptions: {},
  }
  ```
  * callback - a callback which receives `error` and `result` arguments

* `ExternalApi.callSync(args, callback)` - Synchronous version of `ExternalApi.call`, literally `Meteor.wrapAsync(ExternalApi.call)`

### Example

This example is borrowed from my [edmodo-api](https://atmospherejs.com/merlin/edmodo-api) package

```
// in ES2015+
const edmodoCall = (endpoint, {method, data} = {}) => {
  const url = Edmodo.baseUrl + endpoint;

  const edmodoToken = Meteor.user().services.edmodo.accessToken;
  const httpOptions = {
    headers: {Authorization: `Bearer ${edmodoToken}`},
  };

  if (data) {
    httpOptions.data = data;
  }

  return ExternalApi.callSync({httpOptions, method, url});
};

// in vanilla JS
var edmodoCall = function edmodoCall(endpoint) {
  var baseUrl = 'https://api.edmodo.com/';
  var endpointUrl = baseUrl + endpoint;

  var edmodoToken = Meteor.user().services.edmodo.accessToken;
  var httpOptions = {
    headers: {Authorization: 'Bearer ' + edmodoToken},
  };

  var response = ExternalApi.callSync({
    url: endpointUrl,
    method: 'GET',
    httpOptions: httpOptions,
  });

  return response;
};
```
