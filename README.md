Installation
============

1. Clone this app template and copy it to a working directory for your client bridge:

        git clone git@github.com:goodscloud/goodscloud-third-party.git

2. Download and install dependencies:

        npm install

3. Set the credentials of your GoodsCloud-API user in ``config.js``

4. Run the app:

        npm start

   This will run the web app, a worker script that runs periodic jobs, and
   connect to the API notification service. Edit ``run.js`` to disable one
   or more of these processes.


Logging
=======

When you run the app locally using `npm start` all log messages for all processes will be printed to the terminal console.

The app template contains a code example on how to use [winston](https://github.com/flatiron/winston) for logging to remote systems.

In case you do not have centralized logging set up, we recommend [papertrail](https://papertrailapp.com/). To set this up, do the following:

1. Sign up for a free account [here](https://papertrailapp.com/)
2. Go to [Account -> Destinations](https://papertrailapp.com/account/destinations), click "Create log destination"
3. The standard settings are fine, so continue via "Create"
4. Note down the hostname and port of your logging destination
5. Open `config.js` and edit `config.papertrailHost` and `config.papertrailPort` accordingly
6. Run the app
7. Check that logging messages show up on https://papertrailapp.com/events


Scheduled & periodic jobs
=========================

The App template provides a sample file implementing a periodic task in `worker.js`.
The provided example code is using the nodejs [cron](https://github.com/ncb000gt/node-cron) library, but the choice of library is up to you.

During development run scheduled & periodic jobs using the `npm start` command.


Notification Events
===================

Use the ``goodscloudChannels`` config variable to specify a list of GoodsCloud Channels
for which you want to receive notifications.
The ``add_event`` function in ``logic.js`` contains an example that issues a log
statement whenever a Preview Email was sent through the GoodsCloud UI.
