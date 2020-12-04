# carolinacloset

This is an inventory management app developed by UNC-CH CS+Social Good for Carolina Closet.

## Development Setup
1. Install [nodejs and npm](https://nodejs.org).
1. Download PostgreSQL and setup a local PostgreSQL server OR use a remote PostgreSQL server for development.
    1. CloudApps currently uses PostgreSQL 9.6.
    1. [ElephantSQL](https://www.elephantsql.com/) was used by some members during the original development of this app.
    1. Note down the username, password, database url, and port number. You'll need them for step 6.
1. Clone this repo.
1. `cd` into the cloned directory and run `npm install`.
1. Make a copy of `.env-example` and name it `.env`.
    * Edit the environment variables for your dev setup.
    * See the section on [environment variables](#environment-variables) for more info.
1. Run the `npm run bootstrap`. 
    * You can also run the bootstrap.sh file (scripts/bootstrap.sh) to create the tables. If you're on Windows, try "sh ./scripts/bootstrap.sh" in PowerShell.
    * You can also copy the line in bootstrap.sh and paste it into PowerShell/terminal.
1. Run `npm run dev` to start the server in development mode.
1. Go to `localhost:8080` in your web browser.

## Environment Variables
`DATABASE_NAME`: The name of the postgresql server

`DATABASE_USER`: The login username for the postgresql server

`DATABASE_PASSWORD`: The password for the postgresql login

`DATABASE_HOST`: The host address of the postgresql server (optional, defaults to `localhost`)

`DATABASE_PORT`: The port number of the postgresql server (optional, defaults to `5432`)

`DEFAULT_ADMIN`: The onyen that will be created in the `USERS` table as the default admin whenever the database is reinitialized (optional)

`DEV_ONYEN`: The onyen user you want the app to see you as when running in dev mode (optional)

You may add more environment variables if you would like. You can access them through `process.env.ENV_VAR_NAME`

## Project Structure
This section will go over the project structure and what functionality is contained at each level.

### `.github`

This folder contains workflow descriptions for automated tests through GitHub actions.

### `config`

This folder contains `server.js` which sets up `dev` and `prod` as arguments for `npm run`. This sets the port number and logging level. Please do not change files in this folder unless you know what you're doing.

### `controllers`

This folder contains the routing and rendering for the app. For example, if you're developing and you go to `localhost:8080/admin`, there's a function in the `admin.js` file that will execute and return an HTML file. The `index.js` file binds each other file to their root route (eg. `admin.js` to `/admin`, `entry.js` to `/entry`, etc.). 

Each route uses a `response` object for local variables to render EJS files. These EJS files can be found in `views`. 

Calls to the PostgreSQL tables should never be made directly in controller files. That logic can be found in `services`.

### `db`

This folder contains files that configure Sequelize (the ORM we use to interface with PostgreSQL tables in node) with the schema defined in `models`. It also contains scripts for initializing and deleting PostgreSQL tables through Sequelize. 

### `exceptions`

This folder contains files for custom exceptions. These are not fully implemented at the moment, and can be revisited in the future.

### `models`

This folder contains files that describe the table schemas to Sequelize so that it can properly create tables and modify entries. 

### `pgdump`

This folder contains SQL code that can be run to recreate the tables through psql. You probably won't need these unless a schema mismatch is causing connection errors. These need to be updated using `pg_dump` if you update the schemas in `models`.

### `scripts`

This folder contains the `bootstrap.sh` script which runs the table deletion and initialization scripts in `db`.

### `services`

This folder contains service-level logic for the app. All calls to Sequelize (accessing/modifying tables) are done in these files.

### `static`

This folder contains static client-side content like CSS, client-side JavaScript, and images.

### `views`

This folder contains EJS templates that are pre-processed and rendered as HTML to the client. It may be easy to think of these as HTML files with some dynamically rendered parts. Look [here](https://ejs.co/) for more details on EJS.

The EJS files are split into root, user, and admin folders.

### `.env, .env-example`
The `.env` file used for environment variables. Please see [the above section](#environment-variables) for more information.

### `app.js`
This file initializes many of the packages that are used throughout the app. It also registers all the routes defined in `controllers` as well as the root/index route.

### `index.js`
This file is the main file that is run when `npm run` is called. It starts the server.

### `package.json`

This file configures the node app. It defines the main file, the dependencies, and npm run arguments.

### `openshift`

This is meant for configuration of the Openshift platform which is used by Carolina CloudApps. Please do not change files in this folder unless you know what you're doing.

### `helm, node_modules, package-lock.json`

These files/folders are used by nodejs and npm.

## Functionality Quirks and Issues

This section will go over functionality of the app that is not obvious, not explicitly stated, and/or needs to be fixed.

### Deleting Items/Transactions

The `Transactions` table has a foreign key from the `Items` table for `item_id` to record which item was transacted. In order to delete items from the `Items` table, all transactions with that `item_id` must be deleted from the `Transactions` table. 

In the Backup and Delete Data view, we allow an admin to clear both the `Items` and `Transactions` tables. Deletion for the `Items` table does not cascade deletions to the `Transactions` table. If there are any entries in the `Transactions` table, you cannot clear the `Items` table. We decided to do this because, unaware admins may not understand the cascading delete, and delete Transactions accidentally.

### Deleting Users

The `Users` table contains admins and volunteers. The `Transactions` table has a foreign key from the `Users` table for `volunteer_id` to record which volunteer checked out items. In order to delete users from the `Users` table, all transactions with that `volunteer_id` must be deleted from the `Transactions` table.

## Carolina CloudApps
This section will go over setup and maintenance of services in CloudApps. There are 3 CloudApps services used for this app:

1. Node.js 10
2. PostgreSQL 9.6
3. UNC Shibboleth Proxy

You can only access the CloudApps web portal if you are on UNC network or using the UNC VPN.

### Node.js 10

This service runs our main application code. It is set up to automatically build from our Github repo. You can get the webhook for automatic builds by going to `Builds > carolina-closet > Configuration`.

The deployment's environment variables can be accessed through `Deployments > carolina-closet > environments`. The deployment has the following environment variables:
- `DATABASE_NAME`: The name of the postgresql server
- `DATABASE_USER`: The login username for the postgresql server
- `DATABASE_PASSWORD`: The password for the postgresql login

The deployment will run the app in `prod` mode.

### PostgreSQL 9.6

This service holds our database tables. The database name, username, and password are all chosen at provisioning. Please contact an admin of the CloudApps project if you need production details.

To manage and modify tables, you can open a remote shell to the Postgres pod and run psql. See the section of [OpenShift CLI] for more info.

### UNC Shibboleth Proxy

This service gives our project access to UNC's Single Sign-On. It acts as a reverse proxy to our main application and passes the user's ONYEN as an HTTP header named `uid`.

The route for the Shibboleth Proxy is chosen during provisioning and can be found in the `Routes` sectino in CloudApps.

### OpenShift CLI

Carolina CloudApps runs on the OpenShift platform. At times, it may be preferable to use a CLI interface to manage services. You can install it [here](https://uncch.service-now.com/sp?id=kb_article_view&sysparm_article=KB0010400&sys_kb_id=94c9a178db5b37086cf4710439961909). You can get started with the CLI by reading the guide [here](https://docs.openshift.com/enterprise/3.0/cli_reference/get_started_cli.html).

## CloudApps Setup

### Provisioning Services

You need to provision the three services mentioned above (Node.js, PostgreSQL, and UNC Shibboleth Proxy). 

#### Node.js

Put a link to your Git repo under `Git Repository`. Remember the `Application name` of your Node.js service for the next step.

#### UNC Shibboleth Proxy

You must create the Node.js service before the Shibboleth Proxy. When provisioning the Shibboleth Proxy put the name of your Node.js service under `Service to protect`. The rest of the settings can be left at default or changed based on your needs.

The Shibboleth Proxy requires approval from the CloudApps ITS team so you should request provisioning ahead of time.

#### PostgreSQL

When provisioning the PostgreSQL service, create a `PostgreSQL Connection Username` and `PostgreSQL Connection Password`. You **don't** need to remember these.

### Setting up Environment variables

Enter your project and in the Overview click on your Node.js service. Go to the Environments tab. Create the following environment variables using `Add Value`:

- `DATABASE_NAME`: the name of your PostgreSQL service
- `DEFAULT_ADMIN`: an onyen of the first admin to be initialized

Create the following environment variables using `Add Value from Config Map or Secret`:

- `DATABASE_USER`: 
    - resource = your PostgreSQL service
    - key = `database-user`
- `DATABASE_PASSWORD`: 
    - resource = your PostgreSQL service
    - key = `database-password`

### Initializing the Database

Please install the Openshift CLI here: https://uncch.service-now.com/sp?id=kb_article_view&sysparm_article=KB0010400&sys_kb_id=94c9a178db5b37086cf4710439961909

Once it's installed and you've logged in with `oc login ...`, run `oc get pods`. Find the name of your current Node.js deployment pod. Run `oc rsh NAME_OF_NODE_DEPLOYMENT_POD`. Once you're connected, run `npm run bootstrap`. 

**WARNING**: This will delete all existing data in the database.

### Setting up automatic builds and deployments

See https://help.unc.edu/sp?id=kb_article&sys_id=90f7ed34db1b37086cf47104399619eb

and https://docs.github.com/en/developers/webhooks-and-events/creating-webhooks

## Known CloudApps Issues

### Cold Starts

After a certain period of inactivity in a service, OpenShift will shutdown the pods used to host that service. When the service is accessed again after a shutdown, it takes a few minutes to start the pods. Typically the PostgreSQL pod will take longer to start than the Node.js pod.

## Getting Help

If you need help with CloudApps, you can search [help.unc.edu](https://help.unc.edu) for CloudApps articles. If you need more specific help, or need more clarification, you can request service (againt at [help.unc.edu](https://help.unc.edu)) and write a ticket for CloudApps Services.
