// کاربرد
// چی میگیره
// چی میده

let form = document.querySelector('#request-quote')

form.addEventListener('submit', submitForm)


document.addEventListener('DOMContentLoaded', afterLoad)

function afterLoad() {
    salSakht()
}

function getNewYears() {
    // baraye taskhis noae type adad in array ra misazim
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]

    // dariaft sal shamsi kononi
    let newYears = new Date().toLocaleDateString('fa-IR')
    // joda kardan sal az roz va mah
    newYears = newYears.slice(0, 4)

    // tabdil adad farsi va arabi be english
    for (let i = 0; i < 10; i++) {
        // replace = jaigozini
        newYears = newYears.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
    }

    // tabdil type string be number
    newYears = parseInt(newYears)
    return newYears
}

// template year in option 
function temolateYear(i, info) {
    let year = document.querySelector('#year')

    // sakht element option
    let option = document.createElement('option')
    option.value = i
    option.textContent = info

    year.appendChild(option)
}


// dariaft sal kononi , namayesh an dar safhe namaesh
function salSakht() {
    // max and min year
    let newYears = getNewYears()
    let max = newYears
    let min = newYears - 20

    // 
    temolateYear('', '- انتخاب - ')

    // chap (namaesh) sal kononi ta 20 sal gozashth
    for (let i = max; i >= min; i--) {
        temolateYear(i, `سال ${i}`)
    }
}

// If the form is submitted
function submitForm(e) {
    // Do not refresh the page during submission
    e.preventDefault()

    // Proccess...
    proccessInsurance(getValueLInputs().make, getValueLInputs().year, getValueLInputs().cheakBox)

}

// Getting inputs from the user
function getValueLInputs() {
    let valueInputs = {
        make: document.querySelector('#make').value,
        year: document.querySelector('#year').value,
        cheakBox: document.querySelector('input[name="level"]:checked').value
    }
    return valueInputs
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

// nesbat be noe mashin ek zarib dariaft miSavad
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

// zarinb sal sakht mashin
function mohasebehSalSakht(info) {
    return ((getNewYears() - info) * 0.005)
}

// Insurance type calculation function
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