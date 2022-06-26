
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "ui": {
        "port": 3001
    },
    "files": [
        "index.html",
        "src/js/*.js",
        "src/css/*.css",
        "src/img/**",
    ],
    "watchEvents": [
        "change"
    ],
    "watchOptions": {
        "ignoreInitial": true
    },
    "proxy": "localhost:8000",
    "port": 3000,
    "open": "local",
    "browser": "default",
    "cors": false,
    "notify": true,
    "minify": true,
    "tagNames": {
        "less": "link",
        "scss": "link",
        "css": "link",
        "jpg": "img",
        "jpeg": "img",
        "png": "img",
        "svg": "img",
        "gif": "img",
        "js": "script"
    }
};
