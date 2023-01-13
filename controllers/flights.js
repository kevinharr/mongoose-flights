import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

function newFlight(req, res) {
    res.render("flights/new", {
        title: "Add Flight",
    })
}

function create(req, res) {
  for (const key in req.body) {
  if(req.body[key] === "") delete req.body[key]
  }
  Flight.create(req.body)
    .then(flight => {
        res.redirect(`/flights/${flight._id}`)
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
    .populate('meals')
    .then(flight => {
      Meal.find({_id: {$nin: flight.meals}})
      .then(meals => {
        res.render('flights/show', {
          title: "Flights Detail",
          flight: flight,  
          meals,   
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/flights")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights")
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
        res.render("flights/edit", {
            title: "Edit Flight",
            flight,
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect("/")
    })
  }

  function update(req, res) {
    for (const key in req.body) {
       if(req.body[key] === "") delete req.body[key]
    }
    Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(flight => {
        res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
        console.log(err)
        res.redirect("/")
    })
  }

  function createTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
      flight.tickets.push(req.body)
      flight.save()
      .then(() => {
        res.redirect(`/flights/${flight._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  function addToMeals(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
      flight.meals.push(req.body.mealId)
      console.log("showing flight.meals", flight.meals)
      flight.save()
      .then(() => {
        res.redirect(`/flights/${flight._id}`)
      })
      .catch(err => {
        console.log(err);
        res.redirect("/fights")
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect("/flights")
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
    createTicket,
    addToMeals,
}