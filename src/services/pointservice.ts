// services
import * as tokenService from './tokenService'

// types
import { Point } from '../types/models'

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

export { getAllPoints }