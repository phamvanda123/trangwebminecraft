// ==================
//   NAVBAR MOBILE
// ==================

const navbars = document.querySelector('.navbars-bars');
const navMobileMenu = document.querySelector('.nav-mobile-menu');

navbars.addEventListener('click', () => {
    navbars.classList.toggle('active');
    navMobileMenu.classList.toggle('active');
});

// =====================
//     MAIN NAV ITEM
// =====================

const navinicial = document.querySelector('.nav-logo');

navinicial.addEventListener('click', () => {
    window.location.href = "../HTML/Index.html";
});
load()
async function load(){
    const nickname = getCookie('nickname');
    const apiUrl1 = `http://127.0.0.1:5000/api/getpointfromplayer?name=${nickname}`;
    try {
        const responsePoints = await fetch(apiUrl1);
        const dataPoints = await responsePoints.json();
        if (dataPoints.points && dataPoints.points.length > 0) {
            const userPoints = dataPoints.points[0][0];
            const usernameSpan = document.getElementById('point').textContent ="Point: " +userPoints;
            
            
        }
    } catch (error) {
        
    }
    const usernameSpan = document.getElementById('Username');
    if (nickname) {
        usernameSpan.textContent = nickname;
    } else {
        usernameSpan.textContent = 'Login'; // Default text if the cookie is not present
    }
}
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; // Cookie not found
}
