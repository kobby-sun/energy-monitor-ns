var topmost = require("ui/frame").topmost;
var Observable = require("data/observable").Observable;
var _ = require('lodash');

var appViewModel = new Observable();
appViewModel.set('propertyId', 0)
appViewModel.set('gridId', 1)
appViewModel.set('property', {})
// appViewModel.gridId = 1;
// appViewModel.propertyId = 0;

var page;

function basePage() { }
basePage.prototype.viewModel = appViewModel
basePage.prototype.pageLoaded = function (args) {
  page = args.object;
  page.bindingContext = appViewModel;
  // if (appViewModel.propertyId == 0)
  //   page.getViewById("drawer").toggleDrawerState();
}
basePage.prototype.toggleDrawer = function () {
  // var page = topmost().currentPage;
  // page.getViewById("drawer").toggleDrawerState();
}
basePage.prototype.navigate = function (args) {
  // var page = args.object;
  var pid = args.view.value;
  appViewModel.set("propertyId", pid);
  appViewModel.set("property",  _.find(appViewModel.properties, { 'id': appViewModel.propertyId }));
  // topmost().navigate("views/" + pageName + "/" + pageName);
  // page.getViewById("drawer").toggleDrawerState();
}

module.exports = basePage;