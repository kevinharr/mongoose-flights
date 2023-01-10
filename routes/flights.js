import { Router } from 'express'

const router = Router()


router.get('/new', flightsCtrl.new)


export {
  router
}
