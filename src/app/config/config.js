/**
 * Created by mendieta on 1/20/16.
 */

const stagingURL = "http://www.fooprojects.com/clients/foo/";
const productionURL = "http://www.fooprojects.com/clients/foo/";
const developmentURL = "http://localhost:3000/";

//CONFIG

let config = {
    "locale": "es-MX",
    "apis": {
        "facebook": true,
        "twitter": false,
        "instagram": false,
        "gplus": false
    },
    "vars": {
        "animate": true,
        "resize": true
    },
    "urls": {},
    "environments": {
        "production": {
            "vars": {
                "base": productionURL,
                "debug": false
            },
            "urls": {
                "api": productionURL + "endpoint/"
            },
            "properties": {
                "fb": "1495584274016685",
                "ga": "ua2423423"
            }
        },
        "staging": {
            "vars": {
                "base": stagingURL,
                "debug": true
            },
            "urls": {
                "api": stagingURL + "endpoint/"
            },
            "properties": {
                "fb": "1495584274016685",
                "ga": "ua2423423"
            }
        },
        "development": {
            "vars": {
                "base": developmentURL,
                "debug": true
            },
            "urls": {
                "api": developmentURL + "endpoint/"
            },
            "properties": {
                "fb": "1495584274016685",
                "ga": "ua2423423"
            }
        }
    }
};


let env = "development";
let host = document.location.host;

switch (host.split(":").shift()) {
    case "localhost":
    {
        env = "development";
        break;
    }

    case "fooprojects.com":
    {
        env = "staging";
        break;
    }

    case "staging.marca.com":
    {
        env = "staging";
        break;
    }
    case "marca.com":
    {
        env = "production";
        break;
    }
}

const environment = config["environments"][env];

module.exports = {config, environment};

