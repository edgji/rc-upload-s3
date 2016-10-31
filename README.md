# rc-upload-s3
---

React Upload S3

## Usage

```js
var Upload = require('rc-upload-s3');
var React = require('react');
var AWS = require('aws-sdk');
// use a valid credentials object from aws-sdk
var credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: '<identityPoolId>',
  IdentityId: '<IdentityId>',
  Logins: { 'cognito-identity.amazonaws.com': '<Token>' }
});
var s3params = {Metadata: { uploader: 'react-upload-s3' }}; // tag upload files with uploader used
React.render(<Upload action="bucketName" credentials={credentials} params={s3params} />, container);
```

## API

### props

|        name         |         type          | default |               description                |
| :-----------------: | :-------------------: | :-----: | :--------------------------------------: |
|        name         |        string         |  file   |        file param post to server         |
|        style        |        object         |   {}    |       root component inline style        |
|      className      |        string         |    -    |         root component className         |
|      disabled       |        boolean        |  false  |             whether disabled             |
|      component      |         "div"         | "span"  |                  "span"                  |
| supportServerRender |        boolean        |  false  |     whether to support server render     |
|       onReady       |       function        |         | only call when supportServerRender is true, upload is rendered completely |
|       action        |        string         |         |             from action url              |
|        data         | object/function(file) |         | other data object to post or a function which returns a data object |
|       headers       |        object         |   {}    | http headers to post, available in modern browsers |
|       accept        |        string         |         |          input accept attribute          |
|      multiple       |        boolean        |  false  |            only support ie10+            |
|       onStart       |       function        |         |            start upload file             |
|       onError       |       function        |         |              error callback              |
|      onSuccess      |       function        |         |             success callback             |
|     onProgress      |       function        |         | progress callback, only for modern browsers |
|    beforeUpload     |       function        |  null   | before upload check, return false or a rejected Promise will stop upload, only for modern browsers |
|    customRequest    |       function        |  null   | provide an override for the default xhr behavior for additional customization |
|     credentials     |    object/function    |  null   | should resolve to AWS credential see [aws-sdk docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Credentials.html) |
|       params        |        object         |  null   | params passed to AWS.S3({params: params}) see [available param options](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property) |
|   withCredentials   |        boolean        |  false  |       ajax upload with cookie send       |