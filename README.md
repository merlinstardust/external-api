# External API

This package makes calling external APIs easier by adapting the code from ["Integrating External APIs into your Meteor.js Application"](https://dzone.com/articles/integrating-external-apis-your).

### Table of Contents
  * Functions
  * Example
    * `ExternalApi.call(args, callback)`
    * `ExternalApi.callSync(args, callback)`

### Functions

* `ExternalApi.call(args, callback)`
  * `args` - an object that requires `url` and `errorProperties` and may optionally take `method` and `httpOptions`

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

    // Object - Used to get the API specific error code and message
    // required
    errorProperties: {code: '', message: ''},
  }
  ```
  * callback - a callback which receives `error` and `result` arguments

* `ExternalApi.callSync(args, callback)` - Synchronous version of `ExternalApi.call`, literally `Meteor.wrapAsync(ExternalApi.call)`

### Example

This example is borrowed from my [edmodo-api](https://atmospherejs.com/merlin/edmodo-api) package

```
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
    errorProperties: {code: 'status_code', message: 'error'},
  });

  return response;
};

Edmodo.getGroups = function getGroups(groupId) {
  groupId = groupId || '';
  var endpoint = 'groups/' + groupId;
  var groups = edmodoCall(endpoint);

  return groups;
};
```
