checkScreenSize();

function onResize() {

	checkScreenSize();

}

var action;
var desktop;
function checkScreenSize() {

	if (window.screen.width <= 600) {
		desktop = false;
	} else {
		desktop = true;
	}

	setTimeout(
	  () => {
	  	if (desktop) {
	  		action = "../h/d/build";
	  	} else {
	  		if (localStorage.getItem("ZeoFlowUserLogged")!==null) {
	  			action = "../h/m/home";
			} else {
	  			action = "../h/m/login";
			}
	  	}
	  	checkLoggedIn();
	  },
	  1 * 1000
	);

}

function checkLoggedIn() {
	window.open(action, "_top");
}
