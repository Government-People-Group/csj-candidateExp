//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)


// Add your routes here

router.use((req, res, next) => {
      const log = {
        method: req.method,
        url: req.originalUrl,
        data: req.session.data
      }
      console.log(JSON.stringify(log, null, 2))

    next()
  })

router.post("/check-eligible", function (req, res) {
  var right = req.session.data['righttoremain'];
  var member = req.session.data['memberships'];
  var lang = req.session.data['language'];
  var ess1 = req.session.data['essential1'];
  var ess2 = req.session.data['essential2'];

  if (right === "yes" && member === "yes" && lang === "yes" && ess1 === "yes" && ess2 === "yes") {
    res.redirect('task-list')
  } else {
    res.redirect('not-eligible')
  }
})
