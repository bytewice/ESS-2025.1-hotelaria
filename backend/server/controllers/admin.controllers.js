export const createAdmin = async(req, res) => {
    try{
        
        const {Name, Email, CPF, Password, ConfirmPassword, Telefone} = req.body
    } catch(error){
        console.log("Error in create admin:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}