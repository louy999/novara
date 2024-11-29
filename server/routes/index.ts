import {Router} from 'express'
import usersRoutes from './api/users.routes'
import DeveloperRoutes from './api/developer.routes'
import OfferRoutes from './api/offer.routes'
import RequestRoutes from './api/request.routes'
import ReplayRoutes from './api/replay.routes'

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/dev', DeveloperRoutes)
routes.use('/offer', OfferRoutes)
routes.use('/req', RequestRoutes)
routes.use('/replay', ReplayRoutes)

export default routes
