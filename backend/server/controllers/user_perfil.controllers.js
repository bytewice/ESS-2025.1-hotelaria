import fs from 'fs'
import generateTokenAndSetCookie from '../utils/generateToken'
import bcrypt from 'bcryptjs'

export const getAllUser = (req, res) => {
    try{

        {}

    } catch (error) {
        console.log("Error in getAllUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const getUser = (req, res) => {
    try{

    } catch (error) {
        console.log("Error in getUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const createUser = (req, res) => {
    try{

    } catch (error) {
        console.log("Error in createUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const updateUser = (req, res) => {
    try{

    } catch (error) {
        console.log("Error in updateUser:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}