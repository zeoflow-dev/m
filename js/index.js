function onResize() {

	checkScreenSize();

}

var userData;
var action;
var desktop;

window.onload = function what(){

	if (window.screen.width <= 600) {
		desktop = false;
	} else {
		desktop = true;
	}

	if (localStorage.getItem("ZeoFlowUserLogged")!==null) {
		userData = JSON.parse(localStorage.getItem(localStorage.getItem("ZeoFlowUserLogged")));
	}
	checkScreenSize();
};

function checkScreenSize() {

	if (desktop) {
	  	action = "https://zeoflow.github.io/d";
	  	window.open(action, "_top");
	}

	if (window.sessionStorage.getItem("splashShown")!=null) {
	  	if (desktop) {
	  		action = "https://zeoflow.github.io/d";
	  		window.open(action, "_top");
	  	} else {
	  		if (localStorage.getItem("ZeoFlowUserLogged")!==null) {
	  			document.getElementById('splash').hidden = true;
	  			document.getElementById('home').hidden = false;
				document.getElementById('txtWelcome').innerText = "Welcome, " + userData.name + "!";
			} else {
	  			action = "login";
	  			window.open(action, "_top");
			}
	  	}
	} else {

		window.sessionStorage.setItem("splashShown", true);
		setTimeout(
			  () => {
			  	if (desktop) {
			  		action = "https://zeoflow.github.io/d";
			  		window.open(action, "_top");
			  	} else {
			  		if (localStorage.getItem("ZeoFlowUserLogged")!==null) {
			  			document.getElementById('splash').hidden = true;
			  			document.getElementById('home').hidden = false;
						document.getElementById('txtWelcome').innerText = "Welcome, " + userData.name + "!";
					} else {
			  			action = "login";
			  			window.open(action, "_top");
					}
			  	}
			  },
			  1 * 1000
			);

	}

}
