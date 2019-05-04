var mFirestore = firebase.firestore();
var FieldValue = mFirestore.FieldValue;
var computerUUID = new DeviceUUID().get();
var du = new DeviceUUID().parse();
var ipData;
var action;

if (localStorage.getItem("ZeoFlowUserLogged")!==null) {
	action = "home";
	window.open(action, "_top");
}

ipLookUp();
var url_string = window.location.href;
var url = new URL(url_string);
var emailVerified = url.searchParams.get("emailVerified");
window.onload = function what(){
	if (emailVerified !== null) {
		document.getElementById('key_input_email').value = emailVerified;
	}
};


function ipLookUp () {
  $.getJSON("https://api.ipify.org/?format=json", function(data){
  	const ip = data.ip;
	  $.getJSON("https://ipapi.co/" + ip + "/json/", function(data){
	  	ipData = data;
	  });
  });
}

checkScreenSize();
function onResize() {

	checkScreenSize();

}

function makeid(length) {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
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

var log_key;
var pass_key;
var userData;

function tryToLogin() {

	document.getElementById('lbl_login').innerText = "Checking";
	document.getElementById('btn_login').style.boxShadow = "0 0 3px #000";

	log_key = document.getElementById('key_input_email').value;
	pass_key = document.getElementById('key_input_pass').value;

	if(validateEmail(log_key)) {
		tryEmailLogin()
	} else if (validatePhone(log_key)) {
		tryPhoneLogin()
	} else {
		tryUsernameLogin();
	}

}

function tryEmailLogin() {
	mFirestore.collection("usersData")
	        .where("email", '==', log_key.trim())
	        .get().then((querySnapshot) => {

	        	if (querySnapshot.size !== 0) {
	        		checkPass(querySnapshot);
	        	} else {
    				document.getElementById('key_label').style.color = "#f44336";
					document.getElementById('key_label').innerText = "Invalid log key";
					document.getElementById('lbl_login').innerText = "Log In";
	        	}

		});
}

function tryPhoneLogin() {
	mFirestore.collection("usersData")
	        .where("phone", '==', log_key.trim())
	        .get().then((querySnapshot) => {

	        	if (querySnapshot.size !== 0) {
	        		checkPass(querySnapshot);
	        	} else {
    				document.getElementById('key_label').style.color = "#f44336";
					document.getElementById('key_label').innerText = "Invalid log key";
					document.getElementById('lbl_login').innerText = "Log In";
	        	}

		});
}

function tryUsernameLogin() {
	mFirestore.collection("usersData")
	        .where("username", '==', log_key.trim())
	        .get().then((querySnapshot) => {

	        	if (querySnapshot.size !== 0) {
	        		checkPass(querySnapshot);
	        	} else {
    				document.getElementById('key_label').style.color = "#f44336";
					document.getElementById('key_label').innerText = "Invalid log key";
					document.getElementById('lbl_login').innerText = "Log In";
	        	}
			    
		});
}

function checkPass(querySnapshot) {
    markLogKeyAsGood();
    querySnapshot.forEach((doc) => {
    	userData = doc.data();
    	var user_pass = doc.data().password;
    	if (user_pass === pass_key) {
    		markPasswordAsGood();
    		succeedLogin();
    	} else {
    		document.getElementById('key_label_pass').style.color = "#f44336";
			document.getElementById('key_label_pass').innerText = "Invalid password";
    		document.getElementById('lbl_login').innerText = "Log In";
	    }
    });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
	var isnum = /^\d+$/.test(phone);
	return isnum;
}

function succeedLogin() {
    checkEmailVerified();
}

function checkEmailVerified() {
    if (userData.accountVerifiedEmail) {
        checkAccountStatus();
    } else {

		document.getElementById('lbl_login').innerText = "Please check your email";
		const verifyCode = makeid(30);
		var url = "https://zeoflow.github.io/auth/action?mode=verifyEmail&verifyCode=";
		url += verifyCode;
		url += "&uid=";
		url += userData.userId;

		mFirestore.collection("emailManager").doc(userData.userId).set( {
			verifyCode: verifyCode,
			userId: userData.userId,
			name: userData.name,
			url: url,
			email: userData.email,
			action: "verifyEmail"
		});

    }
}

function checkAccountStatus() {
    if (userData.accountClosed) {
		console.log("accountClosed");
    } else {
        if (userData.authType === 0) {
			succeedLoginFinal();
        } else {
			requestValidateLogin();
	
        }
    }
}

function succeedLoginFinal() {

	mFirestore.collection("usersData").doc(userData.userId).collection("userLog").doc(computerUUID).set( {
		IPv4Address: ipData.ip,
		city: ipData.city,
		countryCode: ipData.country,
		location: [ipData.latitude, ipData.longitude],
		deviceId: computerUUID,
		deviceType: 1,
		timestamp: new Date(),
		platform: du.platform
	});

	localStorage.setItem(userData.userId, JSON.stringify(userData));
	localStorage.setItem("ZeoFlowUserLogged", userData.userId);

	document.getElementById('lbl_login').innerText = "Succeed";
    markPasswordAsGood();
    markLogKeyAsGood();

	action = "https://zeoflow.github.io/m/";
	window.open(action, "_top");

}

function requestValidateLogin() {
    
    console.log("requestValidateLogin");
	document.getElementById('lbl_login').innerText = "requestValidateLogin";
    markLogKeyAsGood();
    markPasswordAsGood();

}

function markLogKeyAsGood() {
	document.getElementById('key_label').innerText = "Email, username or phone";
    document.getElementById('key_label').style.color = "#999999";
}

function markPasswordAsGood() {
	document.getElementById('key_label_pass').innerText = "Password";
    document.getElementById('key_label_pass').style.color = "#999999";
}
