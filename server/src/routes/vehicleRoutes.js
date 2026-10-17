import { Router } from 'express'
import { listVehicles, getVehicle } from '../controllers/vehicleController.js'
import { createVehicle, updateVehicle, archiveVehicle, deleteVehicle } from '../controllers/adminController.js'
import { staffOnly } from '../middleware/auth.js'
import { asyncHandler } from '../utils/ApiError.js'

const router = Router()
router.get('/', asyncHandler(listVehicles))
router.get('/:id', asyncHandler(getVehicle))
router.post('/', staffOnly, asyncHandler(createVehicle))
router.patch('/:id', staffOnly, asyncHandler(updateVehicle))
router.delete('/:id/permanent', staffOnly, asyncHandler(deleteVehicle))
router.delete('/:id', staffOnly, asyncHandler(archiveVehicle))
export default router
