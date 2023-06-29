//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.post('/name', function(request, response){
    var fullName = request.session.data['full-name']
    request.session.data['name-error'] = null

    if ( fullName ) {
        if (request.session.data['check-your-answers']) {
            response.redirect('check-your-answers')
        } else {
            response.redirect('postal-address')
        }
    } else {
        request.session.data['name-error'] = 'Enter your full name'
        response.redirect('name')
    }
})

router.post('/postal-address', function(request, response) {
    var postal = request.session.data['postal-address']
    request.session.data['postal-error'] = null

    if ( postal ){
        if (postal === 'yes') {
            response.redirect('address')
        } else if (postal === 'no') {
            response.redirect('land-description')
        }
    } else {
        request.session.data['postal-error'] = 'Select if the land has a postal address'
        response.redirect('postal-address')
    }
})

router.post('/address', function(request, response){
    var addressLine1 = request.session.data['address-line-1']
    var city = request.session.data['address-town']
    var postcode = request.session.data['address-postcode']
    var errors = false
    request.session.data['address-line-1-error'] = null
    request.session.data['city-error'] = null
    request.session.data['postcode-error'] = null

    if ( addressLine1 === '' ) {
        request.session.data['address-line-1-error'] = 'Enter address line 1'
        errors = true
    }

    if ( city === '' ) {
        request.session.data['city-error'] = 'Enter town or city'
        errors = true
    }

    if ( postcode === '' ) {
        request.session.data['postcode-error'] = 'Enter postcode'
        errors = true
    }

    if ( errors ) {
        response.redirect('address')
    } else {
        if (request.session.data['check-your-answers']) {
            response.redirect('check-your-answers')
        } else {
            response.redirect('contact')
        }
    }
})

router.post('/land-description', function(request, response){
    var landDescription = request.session.data['land-description']
    request.session.data['land-description-error'] = null

    if (landDescription.length === 0) {
        request.session.data['land-description-error'] = 'Enter land description'
        response.redirect('land-description')
    } else if (landDescription.length > 1500) {
        request.session.cdata['land-description-error'] = 'Land descrtiption too long'
        response.redirect('land-description')
    } else {
        if (request.session.data['check-your-answers']) {
            response.redirect('check-your-answers')
        } else {
            response.redirect('contact')
        }
    }
})

router.post('/contact', function(request, response){
    var contactType = request.session.data['contact']
    var emailAddress = request.session.data['contact-by-email']
    var phoneNumber = request.session.data['contact-by-phone']
    request.session.data['contact-error'] = null
    request.session.data['email-error'] = null
    request.session.data['phone-error'] = null

    if (contactType === null) {
        request.session.data['contact-error'] = 'Choose contact option'
        response.redirect('contact')
    } else if (contactType === 'email' && emailAddress === '') {
        request.session.data['email-error'] = 'Enter an email'
        response.redirect('contact')
    } else if (contactType == 'phone' && phoneNumber === '') {
        request.session.data['phone-error'] = 'Enter a telephone number'
        response.redirect('contact')
    } else {
        request.session.data['check-your-answers'] = true
        response.redirect('check-your-answers')
    }
})

router.post('/check-your-answers', function(request, response){
    request.session.data['contact'] = null
    request.session.data['contact-by-email'] = null
    request.session.data['contact-by-phone'] = null
    request.session.data['check-your-answers'] = null
    request.session.data['land-description'] = null
    request.session.data['address-line-1'] = null
    request.session.data['address-town'] = null
    request.session.data['address-postcode'] = null
    request.session.data['postal-address'] = null
    request.session.data['full-name'] = null
    request.session.data['land-description-error'] = null
    request.session.data['address-line-1-error'] = null
    request.session.data['city-error'] = null
    request.session.data['postcode-error'] = null

    response.redirect('submitted')
})
