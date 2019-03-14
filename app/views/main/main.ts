// var createViewModel = require("./main-vm").createViewModel;
import navigation = require("../../shared/navigation");
var stringify = require('json-stringify-safe');
// var BasePage = require("../../shared/BasePage");
import * as _ from 'lodash';
import pages = require("ui/page");
import observable = require("data/observable");
import frame = require("ui/frame");
import * as es from "../../shared/es-service";
import { MainViewModel } from "./main-vm"
import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer'

var mainViewModel = new MainViewModel();
var page: pages.Page;

function toggleDrawer() {
    (<RadSideDrawer>page.getViewById("drawer")).toggleDrawerState();
}

function loadProperties() {
    if (mainViewModel.properties == null) {
        mainViewModel.showLoading()
        es.getProperties().then(val => {
            // console.log(JSON.stringify(val))
            mainViewModel.set('properties', val);
            mainViewModel.hideLoading()
            if (mainViewModel.propertyId == 0)
                toggleDrawer();
        })
    }
}

exports.pageLoaded = function (args: observable.EventData) {
    // console.log('pageLoaded')
    page = <pages.Page>args.object;
    page.bindingContext = mainViewModel;
    // initSVG()
    loadProperties();
}

exports.onNavigatingTo = function (args) {
    // console.log('onNavigatingTo')
    
}

exports.showManager = function (args) {
    navigation.goToManagerPage(args)
}

exports.showMonitor = function (args) {
    navigation.goToMonitorPage(args)
}

exports.signOut = function (args) {
    mainViewModel = new MainViewModel();
    navigation.signOut()
}

exports.tabChanged = function (args) {
    // console.log(stringify(args))
}

exports.contentLoaded = function (args) {
    // console.log('contentLoaded')
}

exports.tabSelected = function(args) {
    console.log(args.eventName + ' ' + args.oldIndex + ' ' + args.newIndex)
    mainViewModel.set('selectedTabId', args.newIndex);
    // console.log(mainViewModel.selectedTabId);
}

exports.toggleDrawer = function () {
    //   var page = frame.topmost().currentPage;
    toggleDrawer();
}
exports.navigate = function (args) {
    //   var page = frame.topmost().currentPage;
    // console.log(mainViewModel.get('propertyId'))
    var pid = args.view.value;
    //   console.log(pid)
    mainViewModel.set('propertyId', pid);
    mainViewModel.set('property', _.find(mainViewModel.properties, { 'id': mainViewModel.propertyId }));
    // topmost().navigate("views/" + pageName + "/" + pageName);
    toggleDrawer();

    // console.log(mainViewModel.propertyId)
}


function initSVG() {
    var initWV = function (webView) {
        webView.on("loadStarted", () => {
            // console.log('svgContainer loadStarted')
            webView.visibility = 'collapsed'
            if (webView.android) { // in IOS android will be undefined
                webView.android.getSettings().setBuiltInZoomControls(false);
            }
        })
        webView.on("loadFinished", () => {
            // console.log('svgContainer loadFinished')
            webView.visibility = 'visible'
            if (webView.android) { // in IOS android will be undefined
                webView.android.getSettings().setBuiltInZoomControls(false);
            }
        })
    }

    let svgElement = page.getViewById("svgContainer");
    let svgElement1 = page.getViewById("svgContainer1");
    let svgElement2 = page.getViewById("svgContainer2");
    let svgElement3 = page.getViewById("svgContainer3");
    let svgElement4 = page.getViewById("svgContainer4");

    initWV(svgElement)
    initWV(svgElement1)
    initWV(svgElement2)
    initWV(svgElement3)
    initWV(svgElement4)
}

// var MainPage = function () {
//     createViewModel(this.viewModel)
//     this.viewModel.showLoading();
//     es.getProperties().then(val => {
//         // console.log(JSON.stringify(val))
//         this.viewModel.set('properties', val);
//         this.viewModel.hideLoading();
//     })
// };
// MainPage.prototype = new BasePage();
// MainPage.prototype.constructor = MainPage;

// // Place any code you want to run when the home page loads here.
// MainPage.prototype.contentLoaded = function () { 

// }

// MainPage.prototype.onNavigatingTo = function (args) {

// };

// MainPage.prototype.signOut = function (args) {
//     navigation.signOut();
// };

// MainPage.prototype.showManager = function (args) {
//     navigation.goToManagerPage()
// }

// MainPage.prototype.showMonitor = function (args) {
//     navigation.goToMonitorPage()
// }

// MainPage.prototype.tabChanged = function (args) {
//     // console.log(stringify(args))
// }

// module.exports = new MainPage();