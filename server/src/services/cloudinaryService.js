import { v2 as cloudinary } from 'cloudinary'
import { ApiError } from '../utils/ApiError.js'

let configured = false
function ensureConfigured() {
  const url = process.env.CLOUDINARY_URL
  const { CLOUDINARY_CLOUD_NAME: cloud_name, CLOUDINARY_API_KEY: api_key, CLOUDINARY_API_SECRET: api_secret } = process.env

  if (!url && (!cloud_name || !api_key || !api_secret)) {
    throw new ApiError(503, 'Image uploads are not configured in server/.env')
  }

  if (!configured) {
    if (url) {
      cloudinary.config(url)
    } else {
      cloudinary.config({ cloud_name, api_key, api_secret, secure: true })
    }
    configured = true
  }
}

export function uploadImage(buffer) {
  ensureConfigured()
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'ts-sales-mart/vehicles',
          resource_type: 'image',
          // Optimised on delivery: auto format/quality, capped width.
          transformation: [{ width: 1600, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
        },
        (err, result) => (err ? reject(new ApiError(400, `Image upload failed: ${err.message || 'Cloudinary authentication or upload error'}`)) : resolve({ url: result.secure_url, publicId: result.public_id })),
      )
      .end(buffer)
  })
}

export async function deleteImages(publicIds = []) {
  const ids = publicIds.filter(Boolean)
  if (!ids.length) return
  try {
    ensureConfigured()
    await cloudinary.api.delete_resources(ids)
  } catch (e) {
    console.error('Cloudinary delete failed:', e.message) // never block the main request
  }
}
