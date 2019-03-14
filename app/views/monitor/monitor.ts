import { Page } from 'ui/page';
import { WebView, LoadEventData } from 'ui/web-view';
var textField = require("ui/text-field");
import observable = require("data/observable");
var frameModule = require("ui/frame");
import * as es from "../../shared/es-service";

// var webViewInterfaceModule = require('nativescript-webview-interface');
// var oWebViewInterface;

var context;
var closeCallback;

var page: Page;
var usernameTextField;
var passwordTextField;

var vm = new observable.Observable();
vm.set('loading', true)

export function onShownModally(args) {
    console.log("login-page.onShownModally, context: " + args.context);
    context = args.context;
    closeCallback = args.closeCallback;
}

export function onLoaded(args) {
    console.log("login-page.onLoaded");
    page = <Page>args.object;
    page.bindingContext = vm;
    // usernameTextField = page.getViewById("username");
    // passwordTextField = page.getViewById("password");

    // setupWebViewInterface(page); 
    initSVG();
}

/**
 * Initializing webview only after page navigation.
 */
export function navigatedTo(args) {

}

/**
 * Clearing resource attached with webviewInterface on navigated from 
 * this page to avoid memory leak.
 */
export function navigatedFrom() {
    //  oWebViewInterface.destroy(); 
}

export function onUnloaded() {
    console.log("login-page.onUnloaded");
}

export function onLoginButtonTap() {
    console.log("login-page.onLoginButtonTap");
    // closeCallback(usernameTextField.text, passwordTextField.text);
}

export function onNavBtnTap() {
    // This code will be called only in Android.
    console.log("Navigation button tapped!");
    frameModule.topmost().goBack();
    // closeCallback('user', 'password');
}

// function setupWebViewInterface(page: Page) {
//     var webView = <WebView>page.getViewById('webView');
//     // oWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/www/monitor.html');
//     listenWebViewEvents();
// }

// function listenWebViewEvents() {
//     // handles language selectionChange event.
//     oWebViewInterface.on('languageSelection', (selectedLanguage) => {
//         // webViewInterfaceDemoVM.selectedLanguage = selectedLanguage;
//     });

//     // loading data, on load of webView content.
//     oWebViewInterface.on('onload', () => {
//         loadDataInWebView();
//     });
// }

// function loadDataInWebView() {
//     console.log('loadDataInWebView')
//     // oWebViewInterface.emit('loadLanguages', webViewInterfaceDemoVM.lstLanguages);
// }

function initSVG() {
    var initWV = function (webView: WebView) {
        console.log('initWV')
        webView.on("loadStarted", () => {
            console.log('svgContainer loadStarted')
            vm.set('loading', true)
            if (webView.android) { 
                webView.android.getSettings().setBuiltInZoomControls(false);
                webView.android.getSettings().setAllowFileAccessFromFileURLs(true);
                webView.android.getSettings().setAllowUniversalAccessFromFileURLs(true);
            }
        })
        webView.on("loadFinished", () => {
            console.log('svgContainer loadFinished')
            vm.set('loading', false)
            // if (webView.android) { 
            //     webView.android.getSettings().setBuiltInZoomControls(false);
            // }

            es.getCurrentUsage().then(val => {
                // console.log(JSON.stringify(val))
                let json = JSON.stringify(val)
                webView.android.loadUrl("javascript:refreshDs('" + json +"')");
            })


        })
    }

    let wv = <WebView>page.getViewById("webView");

    initWV(wv)
}