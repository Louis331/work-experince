//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.post('/name', function(request, response){
    var fullname = request.session.data['full-name']
    request.session.data['name-error'] = null

    if ( fullname.length  > 0) {
        response.redirect('/')
    } else {
        request.session.data['name-error'] = true
        response.render('name')
    }
})
