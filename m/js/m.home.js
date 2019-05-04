var userData;
if (localStorage.getItem("ZeoFlowUserLogged")!==null) {
	userData = JSON.parse(localStorage.getItem(localStorage.getItem("ZeoFlowUserLogged")));
} else {
	action = "../m/login";
	window.open(action, "_top");
}

checkScreenSize();
function onResize() {

	checkScreenSize();

}

window.onload = function what(){
	document.getElementById('txtWelcome').innerText = "Welcome, " + userData.name + "!";
};

function checkScreenSize() {

	var desktop;
	if (window.screen.width <= 600) {
		desktop = false;
	} else {
		desktop = true;
	}

	if (desktop) {
		//window.open("../d/build", "_top");
	}

}
