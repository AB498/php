// Get the full URL of the current page
var currentURL = window.location.href;

// Parse the URL to extract query parameters
var urlParams = new URLSearchParams(window.location.search);

// Get the values of the "source" and "clickid" parameters
var sourceParam = urlParams.get("source");
var clickIdParam = urlParams.get("clickid");

//question text
let icon = document.getElementById('icon');
let text = document.getElementById('text');
let secicon = document.getElementById('secicon');
let sectext = document.getElementById('sectext');
icon.addEventListener('click', () => {
    if (text.style.display == "none") {
        text.style.display = "block";
        sectext.style.display = "none";
    } else {
        text.style.display = "none";
    }
})

secicon.addEventListener('click', () => {
    if (sectext.style.display == "none") {
        sectext.style.display = "block";
        text.style.display = "none";
    } else {
        sectext.style.display = "none";
    }
})

document.querySelector(".submitbtn").addEventListener("click", async (e) => {
    e.preventDefault();
    firstname = document.querySelector("#first_name").value;
    lastname = document.querySelector("#last_name").value;
    postcode = document.querySelector("#postcode").value;
    email = document.querySelector("#email").value;
    phone = document.querySelector("#phone_number").value;
    propertyType = document.querySelector("input[name='propertyType']:checked").value;

    firstnameError = document.querySelector(".first_name-error");
    lastnameError = document.querySelector(".last_name-error");
    postcodeError = document.querySelector(".postcode-error");
    emailError = document.querySelector(".email-error");
    phoneError = document.querySelector(".phone-error");
    propertyTypeError = document.querySelector(".propertyType-error");

    //clear errors
    firstnameError.classList.add("hidden");
    lastnameError.classList.add("hidden");
    postcodeError.classList.add("hidden");
    phoneError.classList.add("hidden");
    propertyTypeError.classList.add("hidden");



    errored = false;
    if (!firstname) {
        firstnameError.querySelector(".error-text").textContent = "Invalid word found!";
        firstnameError.classList.remove("hidden");
        errored = true;
    }
    if (firstname.length < 3) {
        firstnameError.querySelector(".error-text").textContent = "Please enter your full first name.";
        firstnameError.classList.remove("hidden");
        errored = true;
    }
    if (!lastname) {
        lastnameError.querySelector(".error-text").textContent = "Invalid word found!";
        lastnameError.classList.remove("hidden");
        errored = true;
    }
    if (lastname.length < 3) {
        lastnameError.querySelector(".error-text").textContent = "Please enter your full last name.";
        lastnameError.classList.remove("hidden");
        errored = true;
    }
    if (!isValidUKostcode(postcode)) {
        postcodeError.querySelector(".error-text").textContent = "Please enter a genuine UK Postcode.";
        postcodeError.classList.remove("hidden");
        errored = true;
    }
    // if (!email) {
    //     emailError.querySelector(".error-text").textContent = "Error";
    //     emailError.classList.remove("hidden");
    //     errored = true;
    // }
    if ((await isValidPhone(phone)).status != "Valid") {
        phoneError.querySelector(".error-text").textContent = "Phone number should be 11 digit long including 0";
        phoneError.classList.remove("hidden");
        errored = true;
    }
    if (propertyType == "Tenant") {
        propertyTypeError.querySelector(".error-text").textContent = "You must be a homeowner to receive the quote";
        propertyTypeError.classList.remove("hidden");
        errored = true;
    }
    if (errored) return;

    let response = await postData();
    if (response.status == "Error") {
        propertyTypeError.querySelector(".error-text").textContent = response.errors.join(", ");
        propertyTypeError.classList.remove("hidden");
        return;
    }

    window.location.href = "https://honestquotes.co.uk/thank-you-solar-quote/";
})

function isValidUKostcode(pc) {
    var postcodeRegEx = /[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/;
    if (postcodeRegEx.test(pc))
        return true;
    else
        return false;
}


function isValidPhone(phoneNumber) {
    if (phoneNumber.slice(0, 3) == "+44") {
        phoneNumber = phoneNumber.replace("+44", "0");
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "get",
            url: "apiphone.php?phone=" + phoneNumber,
            async: false,
            success: function (result) {
                console.log(JSON.parse(result));
                resolve(JSON.parse(result));
            },
            error: function (error) {
                console.log(error);
                resolve(false);
            },
        });
    });
}
function postData() {
    return new Promise((resolve, reject) => {
        const requestData = {
            key: "42c4ea91c662a693e6479788c105bf6f",
            lead: {
                campid: "SOLAR",
                email,
                firstname,
                lastname,
                postcode,
                phone1: phone,
                property_ownership_status: propertyType,
                source: sourceParam || "",
                c1: clickIdParam,
                ssid: sourceParam || "",
            },
        };

        console.log("requestData", requestData);
        $.ajax({
            type: "post",
            url: "api.php",
            data: JSON.stringify(requestData),
            contentType: "application/json",
            success: function (response) {
                // Handle the response from the API
                console.log("response", response);
                resolve(JSON.parse(response));
            },
            error: function (xhr, status, error) {
                // Handle any errors that occur during the request
                console.log("xhr", xhr);
                console.log("status", status);
                console.log("error", error);
                reject(error);
            },
        });
        // Data to be sent in the POST request

        // jQuery AJAX POST request
    });
}
