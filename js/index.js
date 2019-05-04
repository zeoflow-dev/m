function onResize() {

	checkScreenSize();

}

var userData;

window.onload = function what(){
	if (localStorage.getItem("ZeoFlowUserLogged")!==null) {
		userData = JSON.parse(localStorage.getItem(localStorage.getItem("ZeoFlowUserLogged")));
	}
	checkScreenSize();
};

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
	  		window.open(action, "_top");
	  		console.log("desktop site");
	  	} else {
	  		if (localStorage.getItem("ZeoFlowUserLogged")!==null) {
	  			document.getElementById('splash').hidden = true;
	  			document.getElementById('home').hidden = false;
				document.getElementById('txtWelcome').innerText = "Welcome, " + userData.name + "!";
			} else {
	  			action = "login";
	  			window.open(action, "_top");
	  			console.log("mobile > login");
			}
	  	}
	  	checkLoggedIn();
	  },
	  1 * 1000
	);

}

function checkLoggedIn() {
	//window.open(action, "_top");
}
