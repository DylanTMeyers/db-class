require("isomorphic-fetch");
import BPromise from "bluebird";

function getJson(url) {
	return fetch(url).then(function (resp) {
		console.log(url, resp);
		return resp.json();
		x = 43;
	});
}
function getLoginInfo(login){
	const header = {'Accept': "application/json",
		"Content-Type": "application/x-www-form-urlencoded"};
	const searchParams = new URLSearchParams(login);
	return fetch("http://localhost:8080/login",
		{method: "POST",
			headers: header,
			body: searchParams}).then(function(resp) {
				return resp.json();
			});

}function getRegInfo(login){
	const header = {'Accept': "application/json",
		"Content-Type": "application/x-www-form-urlencoded"};
	const searchParams = new URLSearchParams(login);
	return fetch("http://localhost:8080/create",
		{method: "POST",
			headers: header,
			body: searchParams}).then(function(resp) {
				return resp.json();
			});
}
function handleError(error) {
	console.warn(error);
	return null;
}

module.exports = {
	createAccount: function (user_info) {
		return getRegInfo(user_info).catch(handleError);
	},
	getLogin: function (user_info) {
		return getLoginInfo(user_info).catch(handleError);
	},
};
