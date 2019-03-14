var pages = require("ui/page");
var textField = require("ui/text-field");
var observable = require("data/observable");
var frameModule = require("ui/frame");
import imageModule = require("ui/image");
import * as camera from "nativescript-camera";
import geolocation = require("nativescript-geolocation");

var context;
var closeCallback;

var page;
var usernameTextField;
var passwordTextField;

var isAvailable = camera.isAvailable();

var vm = new observable.Observable();

export function onShownModally(args) {
    console.log("login-page.onShownModally, context: " + args.context);
    context = args.context;
    closeCallback = args.closeCallback;
}

export function onLoaded(args) {
    console.log("login-page.onLoaded");
    page = args.object;
    page.bindingContext = vm;
    // usernameTextField = page.getViewById("username");
    // passwordTextField = page.getViewById("password");
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

export function test1() {
    console.log('test camera')
    camera.requestPermissions();
    camera.takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery: true })
        .then(function (imageAsset) {
            console.log("Result is an image asset instance");
            vm.set('imgSrc', imageAsset)
            // var image = new imageModule.Image();
            // image.src = imageAsset;
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
}

export function test2() {
    console.log('test geo location')
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest().then(() => {
            testLocation()
        }, () => {
            console.log('enableLocationRequest failed!')
        });
    } else {
        testLocation()
    }
}

function testLocation() {
    var location = geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
        then(function (loc) {
            if (loc) {
                vm.set('location', JSON.stringify(loc))
                console.log("Current location is: " + loc);
            }
        }, function (e) {
            console.log("Error: " + e.message);
        });
}