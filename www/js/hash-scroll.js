// Workaround to prevent anchored links from being hidden beneath the fixed
// top nav bar. See also: https://github.com/twbs/bootstrap/issues/1768

$(document).ready(function() {
	var shiftWindow = function() {
		window.scrollBy(0, -55);
	};

	// Scroll if the initial page load had the anchor in the URL.
	if (location.hash) {
		shiftWindow();
	}

	// Scroll when an anchor is clicked after the page loads.
	window.addEventListener("hashchange", shiftWindow);
});
