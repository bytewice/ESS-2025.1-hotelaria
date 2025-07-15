import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'
import * as UserService from '../services/user.service.js'

export const getAllUser = async (req, res) => {
  try {
    const users = await UserService.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    console.log("Error in getAllUser:", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
