import { Flight } from "../models/flight.js"

function newFlight(req, res) {
    res.render("flights/new", {
        title: "Add Flight",
    })
}

function create(req, res) {
    Flight.create(req.body)
    .then(flight => {
        res.redirect('/flights')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/flights')
    })

}

function index(req, res) {
    Flight.find({})
    .then(flights => {
      res.render('flights/index', {
        flights,
        title: "All Flights",
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }

  function show(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
      res.render('flights/show', {
        flight,
        title: "Flights Detail",
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }

  function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id)
    .then(flight => {
        res.redirect("/flights")
    })
    .catch(err => {
        console.log(err)
        res.redirect("/flights")
    })
  }

  function edit(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        res.render("/flights/edit", {
            flight,
            title: "Edit Flight"
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect("/flights")
    })
  }

  function update(req, res) {
    Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(flight => {
        res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
        console.log(err)
        res.redirect("/")
    })
  }

export {
    newFlight as new,
    create,
    index,
    show,
    deleteFlight as delete,
    edit,
    update,
}