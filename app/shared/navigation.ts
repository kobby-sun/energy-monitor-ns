import config from "./config";
import frameModule = require("ui/frame");
import pages = require("ui/page");
import observable = require("data/observable");
import button = require("ui/button");
import view = require("ui/core/view");

export function goToLoginPage() {
	frameModule.topmost().navigate("views/login/login");
}
export function goToMonitorPage(args: observable.EventData) {
	frameModule.topmost().navigate({
		moduleName: "views/monitor/monitor",
		animated: false
	});
	// var btn = <button.Button>args.object;
	// var page = <pages.Page>view.getAncestor(<view.View>args.object, "Page");
	// var fullscreen = true;//(<any>args.object).text.indexOf("(full-screen)") !== -1;
	// page.showModal("views/monitor/monitor", "context", function (username: string, password: string) {
	// 	console.log(username + "/" + password);
	// 	// label.text = username + "/" + password;
	// }, fullscreen);
}
export function goToManagerPage(args: observable.EventData) {
	frameModule.topmost().navigate({
		moduleName: "views/manager/manager",
		animated: false
	});
	// var page = <pages.Page>view.getAncestor(<view.View>args.object, "Page");
	// page.showModal("views/manager/manager", "context", function (username: string, password: string) {
	// 	console.log(username + "/" + password);
	// 	// label.text = username + "/" + password;
	// }, true);
}
export function goToPasswordPage() {
	frameModule.topmost().navigate("views/password/password");
}
export function goToMainPage() {
	frameModule.topmost().navigate({
		moduleName: "views/main/main",
		animated: false,
		clearHistory: true
	});
}
export function signOut() {
	// console.log('sign out...')
	config.invalidateToken();
	frameModule.topmost().navigate({
		moduleName: "views/login/login",
		animated: false,
		clearHistory: true
	});
}
export function startingPage() {
	// return "views/main/main";
	console.log(config.token)
	console.log(config.token == null)
	return config.token ? "views/main/main" : "views/login/login";
}

// module.exports = {
// 	goToLoginPage: function() {
// 		frameModule.topmost().navigate("views/login/login");
// 	},
// 	goToMonitorPage: function() {
// 		// frameModule.topmost().navigate({
// 		// 	moduleName: "views/monitor/monitor",
// 		// 	animated: false
// 		// });
// 	},
// 	goToManagerPage: function() {
// 		frameModule.topmost().navigate({
// 			moduleName: "views/manager/manager",
// 			animated: false
// 		});
// 	},
// 	goToPasswordPage: function() {
// 		frameModule.topmost().navigate("views/password/password");
// 	},
// 	goToMainPage: function() {
// 		frameModule.topmost().navigate({
// 			moduleName: "views/main/main",
// 			clearHistory: true
// 		});
// 	},
// 	signOut: function() {
// 		console.log('sign out...')
// 		config.invalidateToken();
// 		frameModule.topmost().navigate({
// 			moduleName: "views/login/login",
// 			animated: false,
// 			clearHistory: true
// 		});
// 	},
// 	startingPage: function() {
// 		return "views/main/main";
// 		// return config.token ? "views/main/main" : "views/login/login";
// 	}
// };
