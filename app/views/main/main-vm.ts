// var Observable = require("data/observable").Observable;
// var navigation = require("../../shared/navigation");
// import {LoadingIndicator} from "nativescript-loading-indicator";

// var loader = new LoadingIndicator();

// var options = {
//   message: 'Loading...',
//   progress: 0.65,
//   android: {
//     indeterminate: true,
//     cancelable: false,
//     max: 100,
//     progressNumberFormat: "%1d/%2d",
//     progressPercentFormat: 0.53,
//     progressStyle: 1,
//     secondaryProgress: 1
//   },
//   ios: {
//     details: "Additional detail note!",
//     square: false,
//     margin: 10,
//     dimBackground: true,
//     color: "#4B9ED6",
//     // mode: // see iOS specific options below
//   }
// };

import {Observable} from "data/observable";
var navigation = require("../../shared/navigation");
import {LoadingIndicator} from "nativescript-loading-indicator";

declare var MBProgressHUDModeDeterminate, MBProgressHUDModeAnnularDeterminate, MBProgressHUDModeDeterminateHorizontalBar, MBProgressHUDModeText, MBProgressHUDModeCustomView;

export class MainViewModel extends Observable {
  private indicator: LoadingIndicator;

  private _items: Array<any>;
  private _isLoading: boolean;
  private _propertyId: number = 0;
  private _gridId: number;
  private _selectedTabId: number = 0;
  private _property: any;
  private _properties: Array<any>;

  constructor() {
    super();
    this.indicator = new LoadingIndicator();

    this._items = new Array();
    this._items.push({device: 'Air Conditioner', usage: '0.51 / h'});
    this._items.push({device: 'Pool Pump', usage: '0.25 / h'});
    this._items.push({device: 'Hot Water', usage: '0.37 / h'});
    this._items.push({device: 'Fridge', usage: '0.35 / h'});
  }

  get properties(): Array<any> {
    return this._properties;
  }
  set properties(val: Array<any>) {
    this._properties = val;
  }

  get propertyId(): number {
    return this._propertyId;
  }
  set propertyId(val: number) {
    this._propertyId = val;
  }

  get gridId(): number {
    return this._gridId;
  }
  set gridId(val: number) {
    this._gridId = val;
  }

  get selectedTabId(): number {
    return this._selectedTabId;
  }
  set selectedTabId(val: number) {
    this._selectedTabId = val;
  }

  get property(): any {
    return this._property;
  }
  set property(val: any) {
    this._property = val;
  }

  get items(): Array<any> {
    return this._items;
  }

  public showLoading() {
      this.indicator.show();
  }

  public hideLoading() {
      this.indicator.hide();
  }
}

// function getMessage(counter) {
//     if (counter <= 0) {
//         return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
//     } else {
//         return counter + " taps left";
//     }
// }

// function createViewModel(viewModel) {
//     // var viewModel = new Observable();
//     viewModel.counter = 42;
//     viewModel.message = getMessage(viewModel.counter);

//     viewModel.items = new Array();
//     viewModel.items.push({device: 'Air Conditioner', usage: '0.51 / h'});
//     viewModel.items.push({device: 'Pool Pump', usage: '0.25 / h'});
//     viewModel.items.push({device: 'Hot Water', usage: '0.37 / h'});
//     viewModel.items.push({device: 'TV', usage: '0.05 / h'});

//     viewModel.onTap = function() {
//         this.counter--;
//         this.set("message", getMessage(this.counter));
//     }

//     viewModel.showLoading = function(){
//         console.log('viewModel.showLoading')
//         console.log(loader)
//         loader.show(options);
//     }

//     viewModel.hideLoading = function(){
//         console.log('viewModel.showLoading')
//         loader.hide()
//     }

//     // return viewModel;
// }

// exports.createViewModel = createViewModel;