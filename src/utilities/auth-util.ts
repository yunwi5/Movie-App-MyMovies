export const API_KEY = "AIzaSyBH5RAej6rhsIZTnJuAPDbcI-AFb-4SyAE";

export const validateUserName = (inputName: string | null) => {
	if (!inputName) {
		return { valid: false, message: "You need to enter your username!" };
	}
	if (!/\w/.test(inputName)) {
		return {
			valid: false,
			message: "Your username should contain alphabets!"
		};
	}
	if (inputName.length < 3) {
		return {
			valid: false,
			message: "Your username should be at least 3 characters long!"
		};
	}

	return { valid: true, message: null };
};

export const validateEmail = (inputEmail: string | null) => {
	if (!inputEmail) {
		return { valid: false, message: "You need to enter your email!" };
	}
	if (!inputEmail.includes("@")) {
		return { valid: false, message: "Your email should include @" };
	}
	if (!/\w/.test(inputEmail)) {
		return {
			valid: false,
			message: "Your email should contain alphabets!"
		};
	}
	if (inputEmail.length < 5) {
		return {
			valid: false,
			message: "Your email should be longer!"
		};
	}
	if (
		!inputEmail.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
	) {
		return { valid: false, message: "Your email is invalid." };
	}

	return { valid: true, message: null };
};

export const validatePassword = (inputPass: string | null) => {
	if (!inputPass) {
		return { valid: false, message: "You need to enter your password!" };
	}
	if (inputPass.length < 5) {
		return { valid: false, message: "Your password (at least 5 characters) is too short!" };
	}

	return { valid: true, message: null };
};

// For retrieving usrename given the email entered by the user in the login page.
// Currently not being used.
const getUserName = async (email: string) => {
	await fetch(`https://react-http-7e82d-default-rtdb.firebaseio.com/users.json`)
		.then((res) => {
			if (res.ok) {
				console.log("Request SuccessfuL!");
			}
			return res.json();
		})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log("Error occued while fetching userName", err);
		});
	return "Jonas";
};
