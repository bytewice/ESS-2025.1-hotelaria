import fs from 'fs'
import path from 'path'

export const getAllJson = (req, res) => {
    try{

        const data = JSON.parse(fs.readFileSync(path.resolve(), 'utf-8'))

        if(!data){
            console.log("Empty bookstore")
            return res.status(200).json({})
        }

        res.status(200).json({})

    } catch (error) {
        console.log("Erro in getAll", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
export const getBookByIdJson = (req, res) => {
    try{

    } catch (error) {
        console.log("Erro in getBookByIdJson", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
export const writeBookJson = (req, res) => {
    try{

        var data = JSON.parse(fs.readFileSync(path.resolve(), 'utf-8'))
        const id = data.lenght + 1


    } catch (error) {
        console.log("Erro in writeBookJson", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
export const updateBookJson = (req, res) => {
    try{

    } catch (error) {
        console.log("Erro in updateBookJson", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
export const deleteBookJson = (req, res) => {
    try{

    } catch (error) {
        console.log("Erro in deleteBookJson", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}