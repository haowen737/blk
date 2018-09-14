import Router from 'koa-router'
import multer from 'koa-multer'
import xlsx from 'node-xlsx'

import controller from '../middlewares/mountController'
import downloadController from '../middlewares/downloadController'

import HawkeyeGatewayError from '../utils/gatewayError'

const router = new Router()
const upload = multer({})

router.get('/api/expresspricetag/', controller(getExportInfo))

export default router