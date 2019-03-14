import application = require("application");
import * as navigation from "./shared/navigation"
import {TNSFontIcon, fonticon} from "nativescript-fonticon"
import numeral = require('numeral');

// TNSFontIcon.debug = true; ng to console.
TNSFontIcon.paths = {
  'fa': 'font-awesome.css',
  'ion': 'ionicons.css'
};
TNSFontIcon.loadCss();

application.resources['fonticon'] = fonticon;

var energeUsage = function(value, label) {
    if (value && value.usages && value.usages[label])
      return numeral(value.usages[label].usageKW).format('0.00') + ' kW'
    return '0 kW'
};

application.resources["energeUsage"] = energeUsage;

application.start({ 
    moduleName: navigation.startingPage()
});
