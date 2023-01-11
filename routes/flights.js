import { Router } from 'express'

import * as flightsCtrl from '../controllers/flights.js'

const router = Router()


router.get('/new', flightsCtrl.new)

router.post('/', flightsCtrl.create)

router.get('/', flightsCtrl.index)

router.get('/:id', flightsCtrl.show)

router.delete('/:id', flightsCtrl.delete)

export {
  router
}
