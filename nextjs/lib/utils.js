require("isomorphic-fetch");

function getParkInfo(name) {
	  console.log("Fetching");
	  return fetch(`http://35.190.190.219/api/info?q=${name}`).then(function(resp) {
		  console.log(resp.json());
		      return resp.json();
		    });
}function handleError(error) {
	  console.warn(error);
	  return null;
}module.exports = {
	  getInfo: function(park) {
		      return getParkInfo(park).catch(handleError);
		    }
};
