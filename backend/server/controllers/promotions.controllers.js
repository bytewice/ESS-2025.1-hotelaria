import Promotion from "../models/promotions.model.js"

export const get_all_promotions = async(req, res) => {
    try{

        const data = await Promotion.find({});

        if(!data){
            console.log("Empty Promotions")
            res.status(200).json({})
        }

        res.status(200).json(data);

    }  catch (error) {
    console.log("Error in get_all_promotion:", error.message)
    res.status(500).json({
        error: "Internal Server Error"
        })
    }
}

export const get_promotions = async(req, res) => {
    try{
    
        const nome = req.params.promotion_name

        const promotion_aux = await Promotion.findOne({ nome: nome })
        
        if(!promotion_aux){
            return res.status(404).json({error:"Promotion not found"})
        }
        res.status(200).json(promotion_aux)

    }  catch (error) {
        console.log("Error in get_promotion:", error.message)
        res.status(500).json({
        error: "Internal Server Error"
        })
    }
}

export const add_promotions = async(req, res) => {
    try{
    
        const {nome, data_inicio, data_fim, desconto } = req.body

        const promotion_aux = await Promotion.findOne({ nome })

        if(promotion_aux){
            console.log("Nome da promoção já existe")
            return res.status(400).json({
                error: "Nome da promoção já existe"
            })
        }

        const promotion = await Promotion.findOne({ data_inicio, data_fim, desconto})
        
        if(promotion){
            console.log("Promotion already exists")
            return res.status(400).json({
                error: "Promotion already exists"
            })
        }

        const new_promotion = new Promotion({
            nome,
            data_inicio,
            data_fim,
            desconto,
        })

        if (new_promotion) {

            await new_promotion.save()
            res.status(201).json({
                _id: new_promotion._id,
                nome: new_promotion.nome,
                data_inicio: new_promotion.data_inicio,
                data_fim: new_promotion.data_fim,
                validade: new_promotion.validade
            })
        }

        
    }  catch (error) {
    console.log("Error in add_promotion:", error.message)
    res.status(500).json({
        error: "Internal Server Error"
        })
    }
}

export const edit_promotions = async(req, res) => {
    try{
        const nome = req.params.promotion_name
        const update = req.body

        if(update.nome && update.nome != nome ){
            const aux = await Promotion.findOne({nome: update.nome })

            if(aux && aux.nome != nome){
                console.log("Promotion name already exists")
            return res.status(400).json({
                error: "Promotion name already exists"
                })
            }
        }

        const promotion = await Promotion.findOne({ data_inicio: update.data_inicio, data_fim: update.data_fim, desconto: update.desconto })
        
        if(promotion && promotion.nome != nome){
            console.log("Promotion already exists")
            return res.status(400).json({
                error: "Promotion already exists"
            })
        }
    

        const promotion_aux = await Promotion.findOneAndUpdate(
            {nome: nome},           

            {$set:{
                nome: update.nome,
                data_inicio: update.data_inicio,
                data_fim: update.data_fim,
                desconto: update.CVV},
            },

            {new: true}
        )

        if(!promotion_aux){
            return res.status(404).json({error:"Promotion not found"})
        }
        res.status(200).json(promotion_aux)

        
    }  catch (error) {
    console.log("Error in edit_promotions", error.message)
    res.status(500).json({
        error: "Internal Server Error"
        })
    }
}

export const delete_promotions = async(req, res) => {
    try{
        const nome = req.params.promotion_name
        const promotion_aux = await Promotion.findOneAndDelete({ nome: nome })
        
        if(!promotion_aux){
            return res.status(404).json({error:"Promotion not found"})
        }
        res.status(200).json(promotion_aux)

        
    }  catch (error) {
    console.log("Error in delete_promotion:", error.message)
    res.status(500).json({
        error: "Internal Server Error"
        })
    }
}