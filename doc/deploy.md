# How to Deploy qtumcashinfo

qtuminfo is splitted into 3 repos:
* [https://github.com/qtumcashproject/qtumcashinfo](https://github.com/qtumcashproject/qtumcashinfo)
* [https://github.com/qtumcashproject/qtumcashinfo-api](https://github.com/qtumcashproject/qtumcashinfo-api)
* [https://github.com/qtumcashproject/qtumcashinfo-ui](https://github.com/qtumcashproject/qtumcashinfo-ui)

## Prerequisites

* node.js v12.0+
* mysql v8.0+
* redis v5.0+

## Deploy qtumcash core
1. `git clone --recursive https://github.com/qtumcashproject/qtumcash.git --branch=qtumcashinfo`
1. `git checkout a6de836fc59da179315a623728e1301e88fc46a8`
2. Follow the instructions of [https://github.com/qtumcashproject/qtumcash/blob/master/README.md#building-qtumcash-core](https://github.com/qtumcashproject/qtumcash/blob/master/README.md#building-qtumcash-core) to build qtumcash
3. Run `qtumcashd` with `-logevents=1` enabled

## Deploy qtumcashinfo
1. `git clone https://github.com/qtumcashproject/qtumcashinfo.git`
2. `cd qtumcashinfo && npm install`
3. Create a mysql database and import [docs/structure.sql](structure.sql)
4. Edit file `qtumcashinfo-node.json` and change the configurations if needed.
5. `npm run dev`

It is strongly recommended to run `qtumcashinfo` under a process manager (like `pm2`), to restart the process when `qtumcashinfo` crashes.

## Deploy qtumcashinfo-api
1. `git clone https://github.com/qtumcashproject/qtumcashinfo-api.git`
2. `cd qtumcashinfo-api && npm install`
3. Create file `config/config.prod.js`, write your configurations into `config/config.prod.js` such as:
    ```javascript
    exports.security = {
        domainWhiteList: ['http://example.com']  // CORS whitelist sites
    }
    // or
    exports.cors = {
        origin: '*'  // Access-Control-Allow-Origin: *
    }

    exports.sequelize = {
        logging: false  // disable sql logging
    }
    ```
    This will override corresponding field in `config/config.default.js` while running.
4. `npm start`

## Deploy qtumcashinfo-ui
This repo is optional, you may not deploy it if you don't need UI.
1. `git clone https://github.com/qtumcashproject/qtumcashinfo-ui.git`
2. `cd qtumcashinfo-ui && npm install`
3. Edit `package.json` for example:
   * Edit `script.build` to `"build": "QTUMCASHINFO_API_BASE_CLIENT=/api/ QTUMCASHINFO_API_BASE_SERVER=http://localhost:3001/ QTUMCASHINFO_API_BASE_WS=//example.com/ nuxt build"` in `package.json` to set the api URL base
   * Edit `script.start` to `"start": "PORT=3000 nuxt start"` to run `qtumcashinfo-ui` on port 3000
4. `npm run build`
5. `npm start`
