// ===================
//    LOGIN SYSTEM
// ===================

function isUserLogged() {
	const cookie = document.cookie;
	return cookie.includes("logged=true");
}
 
if(isUserLogged()) {
	window.location.href = "../HTML/Cart.html";
}
 
const form = document.querySelector("#login-form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const nickInput = document.querySelector("#nick");
    const nick = nickInput.value.trim();
    if (nick.length === 0 || nick.length > 16) {
        form.reset();
        nickInput.classList.add("input-invalid");
        nickInput.setCustomValidity("Add a nickname between 1 to 16 characters");
        nickInput.reportValidity();
        setTimeout(() => {
            nickInput.classList.remove("input-invalid");
            nickInput.setCustomValidity("");
        }, 2000);
        return;
    }
    const apiUrl = `http://127.0.0.1:5000/api/checkplayer?name=${nick}`;
	const apiUrl1 = `http://127.0.0.1:5000/api/getpointfromplayer?name=${nick}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.exists === 1) {
			try {
				const responsePoints = await fetch(apiUrl1);
				const dataPoints = await responsePoints.json();
				if (dataPoints.points && dataPoints.points.length > 0) {
					const userPoints = dataPoints.points[0][0];

					// Do something with userPoints if needed
					console.log('User Points:', userPoints);
				}
			} catch (error) {
				
			}
            // Player exists, set cookies and redirect
            const date = new Date();
            date.setTime(date.getTime() + 12 * 60 * 60 * 1000);
            const expires = ";expires=" + date.toUTCString() + ";path=/";

            document.cookie = "nickname=" + nick + expires;
            document.cookie = "logged=true" + expires;

            nickInput.value = "";

            // Redirect to your desired page
            window.location.href = "../HTML/Cart.html";
			
        } else {
            // Player doesn't exist, show error message
            handleInvalidInput(nickInput, "Username does not exist");
        }
    } catch (error) {
        console.error('Error:', error);
        handleInvalidInput(nickInput, "Error checking username");
    }
});

function handleInvalidInput(inputElement, errorMessage) {
    form.reset();
    inputElement.classList.add("input-invalid");
    inputElement.setCustomValidity(errorMessage);
    inputElement.reportValidity();

    setTimeout(() => {
        inputElement.classList.remove("input-invalid");
        inputElement.setCustomValidity("");
    }, 2000);
}
