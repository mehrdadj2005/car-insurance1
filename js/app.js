let form = document.querySelector('#request-quote')

form.addEventListener('submit', submitForm)

document.addEventListener('DOMContentLoaded', afterLoad)

// After loading the site, the year of construction function should be executed
function afterLoad() {
    salSakht()
}

// Get the current year and convert it to type number
function getNewYears() {
    // dariaft sal shamsi kononi
    let newYears = new Date().toLocaleDateString('fa-IR')

    // Separate the year from the whole date
    newYears = newYears.slice(0, 4)

    // Convert the obtained year from string to number
    newYears = toNumber(newYears)

    // Return of the current year
    return newYears
}

// Convert string to number
function toNumber(info) {
    // To recognize the language of numbers, this array is created
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]

    // Convert Persian and Arabic numbers to English
    for (let i = 0; i < 10; i++) {
        info = info.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
    }

    // tabdil type string be number
    info = parseInt(info)
    // Returns a number by typing a number
    return info
}

// template year in option 
// get (1) value option element
// get (2) textContent option element
function templateYear(e, info) {
    // Select the position of the type of years
    let year = document.querySelector('#year')

    // Making an option element
    let option = document.createElement('option')
    option.value = e
    option.textContent = info

    // Print the element made in place of years (year)
    year.appendChild(option)
}


// Commanding the construction of elements for years
function salSakht() {
    // max and min year

    let newYears = getNewYears()

    // Get the current year
    let max = newYears
    // Get previous years
    let min = newYears - 20

    // Print the default element option
    templateYear('', '- انتخاب - ')

    // Print of previous years
    for (let i = max; i >= min; i--) {
        templateYear(i, `سال ${i}`)
    }
}

// Get user validation values
// Return user validation values
function getValueLInputs() {
    let valueInputs = {
        make: document.querySelector('#make').value,
        year: document.querySelector('#year').value,
        cheakBox: document.querySelector('input[name="level"]:checked').value
    }
    return valueInputs
}

// If the form is submitted
function submitForm(e) {
    // Do not refresh the page during submission
    e.preventDefault()

    // Calling and assigning value to the calculation function controller function
    proccessInsurance(getValueLInputs().make, getValueLInputs().year, getValueLInputs().cheakBox)

}

// Proccess Insurance
function proccessInsurance(make, year, level, errorMsg = 'Error!') {
    if (ceackInputValues(make, year, level)) {
        // 3 farayand
        // fara khani va meghdar dahi ba fanction noe mashin 
        mohasebehNoeMashin(make)
        // fara khani va meghdar dahi ba fanction sal sakht mashin 
        mohasebehSalSakht(year)
        // fara khani va meghdar dahi ba fanction noe mashin 
        mohasebehNoeBimeh(cheakBox)
    } else {
        // show error message ...
        displayMsg(errorMsg)
    }
}

// Checking the content of the inputs
// validation
function ceackInputValues(make, year, cheakBox) {
    let status = false

    if (make === '' || year === '' || cheakBox === '') {
        status = false
    } else {
        status = true
    }

    return status
}

// It returns a coefficient according to the type of machine
function mohasebehNoeMashin(info) {
    // moteghaer baraeh khoroji nahaei
    let CarCoefficient = 0
    // gheimat paye
    let base = 2000000
    switch (info) {
        case '1':
            CarCoefficient = base * 1.15
            break;
        case '2':
            CarCoefficient = base * 1.30
            break;
        case '3':
            CarCoefficient = base * 1.80
            break;
    }

    // khoroji nahaei ra barmigardanim
    return CarCoefficient
}

// It returns a coefficient according to the year of manufacture of the car
function mohasebehSalSakht(info) {
    return ((getNewYears() - info) * 0.005)
}

// According to the type of car insurance, it returns a coefficient
function mohasebehNoeBimeh(info) {
    let base = 2000000
    let CarCoefficient = 0
    switch (info) {
        case 'basic':
            CarCoefficient = base * 0.3
            break;
        case 'complete':
            CarCoefficient = base * 0.5
            break;
    }
    return CarCoefficient
}

// Build element error in form (submit form)
function displayMsg(msg) {
    // Build element error
    let massage = document.createElement('div')
    // add className
    massage.classList = 'error'
    // add text to The element is made
    massage.innerText = msg

    // show Error
    form.insertBefore(massage, document.querySelector('.form-group'))

    // remove error meesahge after 5 sec
    setTimeout(() => {
        // ermpve element
        document.querySelector('.error').remove()
    }, 5000);
}