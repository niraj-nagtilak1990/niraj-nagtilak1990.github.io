$(document).ready(function() {
	//Cross domain request helper with herokuapp
	jQuery.ajaxPrefilter(function(options) {
		if (
			options.crossDomain &&
			jQuery.support.cors &&
			options.url.indexOf(covid19BaseUrl) >= 0
		) {
			options.url =
				'http://www.whateverorigin.org/get?url=' + options.url;
			//https://cors-anywhere.herokuapp.com/
			//https://nirajcorsanywhere.herokuapp.com/
		}
	});
});
