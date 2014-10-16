Installation
======

1. Clone this app skeleton and copy it to a working directory for your client bridge

    git clone git@github.com:goodscloud/goodscloud-third-party.git

2. Download and install dependencies:

    npm install

3. Set the credentials of your GoodsCloud-API user as environment variables:

    export GC_USERNAME=username
    export GC_PASSWORD=password

4. Run the app:

    npm start


Logging
=======

Node.js' stdout and stderr go to `out.log` and `err.log`, respectively. So, exceptions will show up in `err.log`, whereas calls to `console.log` to to `out.log`

The app template contains a code example on how to use [winston](https://github.com/flatiron/winston) for logging to remote systems.

In case you do not have centralized logging set up, we recommend [papertrail](https://papertrailapp.com/). To set this up, do the following:

1. Sign up for a free account [here](https://papertrailapp.com/)
2. Go to [Account -> Destinations](https://papertrailapp.com/account/destinations), click "Create log destination"
3. The standard settings are fine, so continue via "Create"
4. Note down the hostname and port of your logging destination
5. Open `config.js` and edit `config.papertrail.host` and `config.papertrail.port` accordingly
6. Run the app
7. Check that logging messages show up on https://papertrailapp.com/events
