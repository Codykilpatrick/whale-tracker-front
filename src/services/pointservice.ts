// services
import * as tokenService from './tokenService'

// types
import { Point } from '../types/models'
import { PointFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/points`


async function getAllPoints(): Promise<Point[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Point[]
  } catch (error) {
    throw error
  }
}

async function createPoint(
  formData: PointFormData
): Promise<void> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json' },
      body: JSON.stringify(formData)     
    })
    console.log(JSON.stringify(formData));
    await res.json()
  } catch (error) {
    throw error
  }
}

async function deletePoint(id: number) {
  try {
    await fetch(`${BASE_URL}/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      }
    })
  } catch (error) {
    throw error
  }
}

export { getAllPoints, createPoint, deletePoint }