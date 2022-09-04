const form = document.getElementById('odin-form');
const email = document.getElementById('email');
const country = document.getElementById('country');
const zip = document.getElementById('zip');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password-confirmation');

// Populate Country Select 
const countryArray = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
countryArray.forEach((countryElement) => {
  const countryOption = document.createElement('option');
  countryOption.value = countryElement;
  countryOption.text = countryElement;
  country.appendChild(countryOption);
});

// Field Validation Helper Functions
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validateEmail = (emailInput) => {
  const isValid = emailRegExp.test(emailInput.value);
  return !!isValid;
};

const validateCountry = (countryInput) => {
  const isValid = countryArray.includes(countryInput.value);
  return !!isValid;
};

const validateZip = (zipcodeInput) => {
  const isValid = zipcodeInput.value !== '';
  return !!isValid;
};

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const validatePassword = (passwordInput) => {
  const isValid = passwordRegExp.test(passwordInput.value);
  return !!isValid;
};

const validatePasswordConfirmation = (passwordInput, passwordConfirmationInput) => {
  const isValid = passwordInput.value === passwordConfirmationInput.value;
  return !!isValid;
};

// Error Display Helper Functions
const displayError = (input, message) => {
  const error = input.nextElementSibling;

  input.classList.add('is-danger');
  error.textContent = message;
};

const clearError = (input) => {
  const error = input.nextElementSibling;

  input.classList.remove('is-danger');
  error.textContent = '';
};

// Input event listeners to flag incorrect input following change to input
email.addEventListener('change', () => {
  if (validateEmail(email)) {
    clearError(email);
  } else {
    displayError(email, '* Invalid email. Please provide a real email address.');
  }
});

country.addEventListener('change', () => {
  const countryParent = country.parentElement;

  if (validateCountry(country)) {
    clearError(countryParent);
  } else {
    displayError(countryParent, '* Invalid country. Please select one of the available options.');
  }
});

zip.addEventListener('change', () => {
  if (validateZip(zip)) {
    clearError(zip);
  } else {
    displayError(zip, '* Zipcode is required. Please enter valid zipcode.')
  }
});

password.addEventListener('change', () => {
  if (validatePassword(password)) {
    clearError(password);
  } else {
    displayError(password, '* Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special symbol.');
  }

  if (validatePasswordConfirmation(password, passwordConfirmation)) {
    clearError(passwordConfirmation);
  } else {
    displayError(passwordConfirmation, '* Password and password confirmation do not match.');
  }
});

passwordConfirmation.addEventListener('change', () => {
  if (validatePasswordConfirmation(password, passwordConfirmation)) {
    clearError(passwordConfirmation);
  } else {
    displayError(passwordConfirmation, '* Password and password confirmation do not match.');
  }
});

// Form Submit Event Listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log(`Email is ${validateEmail(email)}`);
  console.log(`Country is ${validateCountry(country)}`);
  console.log(`Zipcode is ${validateZip(zip)}`);
  console.log(`Password is ${validatePassword(password)}`);
  console.log(`Password Confirmation is ${validatePasswordConfirmation(password, passwordConfirmation)}`);
});