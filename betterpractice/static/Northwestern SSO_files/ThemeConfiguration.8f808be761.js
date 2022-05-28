(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ 2087:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "css/theme.css";

/***/ }),

/***/ 2088:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "css/structure.css";

/***/ }),

/***/ 2089:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/9b192e7f9c50c12bf94d2dbac92eccb4.png";

/***/ }),

/***/ 2090:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/2a5ced16cb51e0f182860c6af0bc4003.png";

/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bootstrap = __webpack_require__(308);

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _loginLogo = __webpack_require__(2090);

var _loginLogo2 = _interopRequireDefault(_loginLogo);

var _logoHorizontal = __webpack_require__(2089);

var _logoHorizontal2 = _interopRequireDefault(_logoHorizontal);

var _structure = __webpack_require__(2088);

var _structure2 = _interopRequireDefault(_structure);

var _theme = __webpack_require__(2087);

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    themes: {
        // There must be a theme named "default".
        "default": {
            // An ordered list of URLs to stylesheets that will be applied to every page.
            stylesheets: [_bootstrap2.default, _structure2.default, _theme2.default],
            // A URL to a favicon icon
            icon: "favicon.ico",
            settings: {
                // This logo is displayed on user profile pages.
                logo: {
                    // The URL of the image.
                    src: _logoHorizontal2.default,
                    // The title attribute used on <img> tags.
                    title: "ForgeRock",
                    // The alt attribute used on <img> tags.
                    alt: "ForgeRock",
                    // The width of the logo as a CSS length.
                    width: "202px"
                },
                // This logo is displayed on login pages.
                loginLogo: {
                    // The URL of the image.
                    src: _loginLogo2.default,
                    // The title attribute used on <img> tags.
                    title: "ForgeRock",
                    // The alt attribute used on <img> tags.
                    alt: "ForgeRock",
                    // The height of the logo as a CSS length.
                    height: "104px",
                    // The width of the logo as a CSS length.
                    width: "210px"
                },
                // The footer is displayed on every page.
                footer: {
                    // A contact email address.
                    mailto: "",
                    // A contact phone number. If empty, it will not be displayed.
                    phone: ""
                }
            }
        },
        "fr-dark-theme": {
            // An ordered list of URLs to stylesheets that will be applied to every page.
            stylesheets: ["themes/dark/css/bootstrap.min.css", _structure2.default, "themes/dark/css/theme-dark.css"],
            // A path that is prepended to every relative URL when fetching resources (including images, stylesheets and
            // HTML template files). Must include a trailing forward slash.
            // path: "dark/",
            settings: {
                loginLogo: {
                    src: "themes/dark/images/login-logo-white.png",
                    title: "ForgeRock",
                    alt: "ForgeRock",
                    height: "228px",
                    width: "220px"
                }
            }
        },

        "northwestern-theme": {
         // An ordered list of URLs to stylesheets that will be applied to every page.
            stylesheets: ["themes/northwestern/css/northwestern-theme.css", "css/structure.css", "css/theme", _structure2.default, _bootstrap2.default],
            // A path that is prepended to every relative URL when fetching resources (including images, stylesheets and
            // HTML template files). Must include a trailing forward slash.
            path: "northwestern/",
            settings: {
                loginLogo: {
                    src: "themes/northwestern/images/Northwestern_white-01-brnt.svg",
                    title: "Northwestern",
                    alt: "Northwestern"
                },  
                footer: {
                    link: "", 
                    href: "", 
                    mailto: ""
                    // href: "www.example.com"
                    // items: {
                    //     type: Array,
                    //     value: [{
                    //         name: 'Help',
                    //         href: 'www.google.com'
                    //     }]
                    // }
                }   
            }   
        }   
    },
    // Each mapping will be tested in order. The theme from the first matching mapping will be used. If no mapping
    // matches then the theme "default" will be used.
    mappings: [{
        theme: "northwestern-theme",
        realms: ["/northwestern"]
    }
        // Use the theme with the key "my-theme" if the realm is either /my-realm or /my/sub-realm.
        //{ theme: "my-theme", realms: ["/my-realm", "/my/sub-realm"] }
        // Use the theme "my-second-theme" if the realm starts with /a. e.g. /ab or /a/c.
        //{ theme: "my-second-theme", realms: [/^\/a/] }
        // Use the theme "my-third-theme" if the realm is /a and the authentication chain is auth-chain-1.
        //{ theme: "my-third-theme", realms: ["/a"], authenticationChains: ["auth-chain-1"] }
        // Use the theme "my-fourth-theme" if the default authentication chain is in use.
        //{ theme: "my-fourth-theme", authenticationChains: [""] }
    ]
}; /*
    * Copyright 2015-2020 ForgeRock AS. All Rights Reserved
    *
    * Use of this code requires a commercial software license with ForgeRock AS.
    * or with one of its affiliates. All use shall be exclusively subject
    * to such license between the licensee and ForgeRock AS.
    */

/***/ })

}]);
//# sourceMappingURL=ThemeConfiguration.8f808be761.js.map
