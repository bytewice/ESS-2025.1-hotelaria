export const loginUser = async(req, res) => {
    try{
        

    } catch(error){
        console.log("Error in :", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

