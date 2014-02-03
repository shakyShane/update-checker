# dev-ip [![Build Status](https://travis-ci.org/shakyShane/dev-ip.png?branch=master)](https://travis-ci.org/shakyShane/dev-ip)

Find a suitable IP host to view local websites on.

## Command line
Install it globally to use on the command line:

`sudo npm install -g dev-ip`

then run:

`dev-ip`

> "try this: http://192.168.1.46"

## In your project
`npm install dev-ip`

```javascript
var dev_ip = require('dev-ip');
dev_ip.getIp(); // "192.168.1.76" or false if nothing found (ie, offline user)
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Shane Osbourne
Licensed under the MIT license.
