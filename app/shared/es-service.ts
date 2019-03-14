import config from "./config";
import { Observable } from 'data/observable';
import * as vp from './vm-parser'
import * as mock from './mock'

const p = function (data){
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data);
		}, 3000);
	});

	promise.then((res) => {
		// console.log(res); // I get called: true
	});
	promise.catch((err) => {
		handleErrors(err)
	});

	return promise;
}

export function getCurrentUsage(gridId: number = 1, propertyId: number = 3) {
	console.log(config.apiUrl + "/mini-grids/" + gridId + "/properties/status")
	// return fetch(config.apiUrl + "/mini-grids/" + gridId + "/properties/status", {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// })
	// 	.then(handleErrors)
	// 	.then(function (response) {
	// 		return response.json();
	// 	}).then(function (data) {
	// 		return vp.parsePropertiesJson(data);
	// 	});

	return p(vp.parseSingleUsageJson(mock.CurrentUsageJSON))
};

export function getProperties(gridId: number = 1) {
	console.log(config.apiUrl + "/mini-grids/" + gridId + "/properties/status")
	// return fetch(config.apiUrl + "/mini-grids/" + gridId + "/properties/status", {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// })
	// 	.then(handleErrors)
	// 	.then(function (response) {
	// 		return response.json();
	// 	}).then(function (data) {
	// 		return vp.parsePropertiesJson(data);
	// 	});

	return p(vp.parsePropertiesJson(mock.PropertiesJSON))
};


function handleErrors(response) {
	if (!response.ok) {
		console.log(JSON.stringify(response));
		throw Error(response.statusText);
	}
	return response;
}
