var mFirestore = firebase.firestore();

checkScreenSize();

var url_string = window.location.href;
var url = new URL(url_string);
var mode = url.searchParams.get("mode");
var verifyCode = url.searchParams.get("verifyCode");
var uid = url.searchParams.get("uid");

mFirestore.collection("emailManager").doc(uid)
			.get().then(function(doc) {
			    if (doc.exists) {
		  			var emailManager = doc.data();
		  			if (emailManager.verifyCode === verifyCode) {

						mFirestore.collection("usersData").doc(emailManager.userId).update( {
							accountVerifiedEmail: true
						});

						mFirestore.collection("emailManager").doc(emailManager.userId).delete();


						setTimeout(
						  () => {
						  	
								window.open("../m/login?emailVerified=" + emailManager.email, "_top");

						  },
						  3 * 1000
						);

				  	} else if (emailManager.verifyCode !== verifyCode) {
				  		window.open("../m/login?emailVerified=" + emailManager.email, "_top");
		  			}
			    } else {
				  	window.open("../m/login", "_top");
			    }
			}).catch(function(error) {
			    console.log("Error getting document:", error);
			});

function onResize() {

	checkScreenSize();

}

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
