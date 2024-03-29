
// ?debt=£10%2C000&property=Owned&creditors=Less+than+2
// Get the full URL of the current page
var currentURL = window.location.href;

// Parse the URL to extract query parameters
var urlParams = new URLSearchParams(window.location.search);

// Get the values of the "source" and "clickid" parameters
var sourceParam = urlParams.get("source");
var clickIdParam = urlParams.get("clickid");
var debtValue = urlParams.get("debt");
var propertyValue = urlParams.get("property");
var creditorsValue = urlParams.get("creditors");
console.log(debtValue, propertyValue, creditorsValue);

// faq
$(document).ready(function () {
    //toggle the component with class accordion_body
    $(".accordion_head").click(function () {
        if ($(".accordion_head").css("background-color", "")) {
            $('.accordion_body').is(':visible');
            $(".accordion_body").slideUp(300);
            $(".plusminus").text('+');
        }
        if ($(this).next(".accordion_body").is(':visible')) {
            $(this).next(".accordion_body").slideUp(300);
            $(this).children(".plusminus").text('+');
        } else {
            $(".accordion_head").css("background-color", "")
            $(this).next(".accordion_body").slideDown(300);
            $(this).children(".plusminus").text('-');
        }
    });
});

// multistep form
let debtForm = document.querySelector('.first-step');
let peopleForm = document.querySelector('.second-step');
let propertyForm = document.querySelector('.third-step');
let locationForm = document.querySelector('.four-step');
let statusForm = document.querySelector('.five-step');
let nameForm = document.querySelector('.six-step');
let emailForm = document.querySelector('.seven-step');
let phoneForm = document.querySelector('.eight-step');
let progressSteps = document.querySelectorAll('.progressbar .step .check i');
let currentStep = 0;
let prev1 = document.getElementById('steptwo_prevbtn');
let prev2 = document.getElementById('step_threeprevbtn');
let prev3 = document.getElementById('stepfourprev');
let prev4 = document.getElementById('five_prev');
let prev5 = document.getElementById('six_prev');
let prev6 = document.getElementById('seven_prev');

updateProgressbar();

// next btn
let next = document.getElementById('next_question');
let next2 = document.getElementById('email_next_question');
// submit btn
let sumbitbtn = document.getElementById('submitbtn');



// progress bar
let progress = document.querySelector('.progressbar');
//debt question
let debtOpton = document.querySelectorAll('.first-step input[name="debt"]');

let deb = Number(debtValue?.replace(/[£,\+]/g, "") || -1);
if (10000 <= deb) {
    console.log(debtOpton[3].value);
    debtOpton[3].checked = true;
    debtForm.style.display = "none";
    peopleForm.style.display = "block";
    currentStep++;
    updateProgressbar();
} else if (6000 <= deb && deb <= 10000) {
    console.log(debtOpton[2].value);
    debtOpton[2].checked = true;
    debtForm.style.display = "none";
    peopleForm.style.display = "block";
    currentStep++;
    updateProgressbar();
}
else if (2000 <= deb && deb <= 6000) {
    console.log(debtOpton[1].value);
    debtOpton[1].checked = true;
    debtForm.style.display = "none";
    peopleForm.style.display = "block";
    currentStep++;
    updateProgressbar();
} else if (0 <= deb && deb <= 2000) {
    console.log(debtOpton[0].value);
    debtOpton[0].checked = true;
    debtForm.style.display = "none";
    peopleForm.style.display = "block";
    currentStep++;
    updateProgressbar();
} else {

}
//people question
let peopleOption = document.querySelectorAll('.second-step input[name="people');
peopleOption.forEach((option) => {
    if (option.value?.toLowerCase() == creditorsValue?.toLowerCase()) {
        console.log(option.value);
        option.checked = true;
        peopleForm.style.display = "none";
        propertyForm.style.display = "block";
        currentStep++;
        updateProgressbar();
    }
})
// property question
let propertyOption = document.querySelectorAll('.third-step input[name="property"]');
propertyOption.forEach((option) => {
    if (option.value?.toLowerCase() == propertyValue?.toLowerCase()) {
        console.log(option.value);
        option.checked = true;
        propertyForm.style.display = "none";
        locationForm.style.display = "block";
        currentStep++;
        updateProgressbar();
    }
})
// location question
let locationOption = document.querySelectorAll('.four-step input[name="location"]');
// employstatus question
let employOption = document.querySelectorAll('.five-step input[name="employment_status"]');
// full name
let nameField = document.getElementById('full_name');

//phone
let phone = document.querySelectorAll('.eight-step input[name="phone"]');



debtOpton.forEach((option) => {
    option.addEventListener('click', () => {
        if (isChecked(debtOpton)) {
            debtForm.style.display = "none";
            peopleForm.style.display = "block";
            currentStep++;
            updateProgressbar();
        }
    });
});
peopleOption.forEach((option) => {
    option.addEventListener('click', () => {
        if (isChecked(peopleOption)) {
            peopleForm.style.display = "none";
            propertyForm.style.display = "block";
            currentStep++;
            updateProgressbar();
        }
    });
});
propertyOption.forEach((option) => {
    option.addEventListener('click', () => {
        if (isChecked(propertyOption)) {
            propertyForm.style.display = "none";
            locationForm.style.display = "block";
            currentStep++;
            updateProgressbar();
        }
    });
});
locationOption.forEach((option) => {
    option.addEventListener('click', () => {
        if (isChecked(locationOption)) {
            locationForm.style.display = "none";
            statusForm.style.display = "block";
            currentStep++;
            updateProgressbar();
        }
    });
});
employOption.forEach((option) => {
    option.addEventListener('click', () => {
        if (isChecked(employOption)) {
            statusForm.style.display = "none";
            nameForm.style.display = "block";
            currentStep++;
            updateProgressbar();
        }
    });
});
next?.addEventListener('click', () => {
    // full name
    let nameField = document.getElementById('full_name').value;
    window.nameValue = nameField;
    if (nameField == "") {
        alert('Please Enter Your Name');
    } else {
        nameForm.style.display = "none";
        emailForm.style.display = "block";
        currentStep++;
        updateProgressbar();
    }

});
next2?.addEventListener('click', (event) => {
    event.preventDefault();
    // email 
    let email = document.getElementById('email').value;
    window.emailValue = email;
    // email error
    let emailError = document.querySelector('.emailError');
    if (validateEmail(email)) {
        emailError.innerText = "Email is valid";
        emailForm.style.display = "none";
        phoneForm.style.display = "block";
        currentStep++;
        updateProgressbar();
    } else if (!validateEmail(email)) {
        emailError.innerText = "Please enter a valid email address";
    }


});
sumbitbtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    let phone = document.getElementById('phone').value;
    window.phoneValue = phone;
    let phoneError = document.querySelector('.phoneError');

    //phone validate code
    if (await isValidPhone(phone)) {
        // phoneError.innerText = "Phone is valid";
        await postData();
        window.location.href = "thankyou.html";
        currentStep++;
        updateProgressbar();
    } else {
        phoneError.innerText = "Please enter a valid UK phone number";
    }

});



prev1?.addEventListener('click', () => {
    currentStep--;
    peopleForm.style.display = "none";
    debtForm.style.display = "block";
    updateProgressbar(1);
});
prev2?.addEventListener('click', () => {
    currentStep--;
    peopleForm.style.display = "block";
    propertyForm.style.display = "none";
    updateProgressbar();
});
prev3?.addEventListener('click', () => {
    currentStep--;
    propertyForm.style.display = "block";
    locationForm.style.display = "none";
    updateProgressbar();
});
prev4?.addEventListener('click', () => {
    currentStep--;
    locationForm.style.display = "block";
    statusForm.style.display = "none";
    updateProgressbar();
});
prev5?.addEventListener('click', () => {
    currentStep--;
    statusForm.style.display = "block";
    nameForm.style.display = "none";
    updateProgressbar();
});
prev6?.addEventListener('click', () => {
    currentStep--;
    nameForm.style.display = "block";
    emailForm.style.display = "none";
    updateProgressbar();
});


function updateProgressbar() {
    progressSteps.forEach(step => {
        step.classList.remove('active');
        step.classList.remove('current');
    });
    for (let i = 0; i < currentStep; i++) {
        progressSteps[i].classList.add('active');
    }
    progressSteps[currentStep].classList.add('current');
}

function isChecked(option) {
    for (var i = 0; i < option.length; i++) {
        if (option[i].checked) {
            return true;
        }
    }
    return false;
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


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
                resolve(JSON.parse(result).status == "Valid");
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
                campid: "CREDITFIX-DEBT",
                fullname: nameValue,
                email: emailValue,
                phone1: phoneValue,
                country: [...locationOption].reduce((a, b) => b.checked ? b.value : a, null),
                debt_amount: [...debtOpton].reduce((a, b) => b.checked ? b.value : a, null),
                number_creditors: [...peopleOption].reduce((a, b) => b.checked ? b.value : a, null),
                property_type: [...propertyOption].reduce((a, b) => b.checked ? b.value : a, null),
                employment_status: [...employOption].reduce((a, b) => b.checked ? b.value : a, null),
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
    });
}

function check(e) {
    e.preventDefault();
    let debt_amount = document.querySelector('input[name="debt"]').value;
    let number_creditors = document.querySelector('select[name="creditors"]').value;
    let property_type = document.querySelector('select[name="property"]').value;
    console.log(window.location.origin + `/calculator.html?debt=${debt_amount}&property=${property_type}&creditors=${number_creditors}`)
    window.location.href = window.location.origin + `/calculator.html?debt=${debt_amount}&property=${property_type}&creditors=${number_creditors}`
}
