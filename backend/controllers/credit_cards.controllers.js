    import credit_card from "../models/credit_cards.model.js"

    export const get_all_credit_card = async(req, res) => {
        try{

            const data = await credit_card.find({});

            if(!data){
                console.log("Empty credit_cads")
                res.status(200).json({})
            }

            res.status(200).json(data);

        }  catch (error) {
        console.log("Error in get_all_credit_Card:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
            })
        }
    }

    export const get_credit_card = async(req, res) => {
        try{
        
            const cartao_nome = req.params.card_name

            const credit_card_aux = await credit_card.findOne({ nome_cartao: cartao_nome })
            
            if(!credit_card_aux){
                return res.status(404).json({error:"Card not found"})
            }
            res.status(200).json(credit_card_aux)

        }  catch (error) {
            console.log("Error in get_credit_card:", error.message)
            res.status(500).json({
            error: "Internal Server Error"
            })
        }
    }

    export const add_credit_card = async(req, res) => {
        try{
        
            const {nome_cartao, nome, numero_cartao, validade, CVV} = req.body

            if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(validade)) {
                return res.status(400).json({
                error: 'Formato de validade inválido. Use MM/AA (ex: "12/25")'
                });
            }

            const cartao_nome_aux = await credit_card.findOne({ nome_cartao })

            if(cartao_nome_aux){
                console.log("Nome do cartão already exists")
                return res.status(400).json({
                    error: "Nome do cartão already exists"
                })
            }

            const cartao = await credit_card.findOne({ nome, numero_cartao, validade, CVV})
            
            if(cartao){
                console.log("Cartão already exists")
                return res.status(400).json({
                    error: "Cartão already exists"
                })
            }

            const new_credit_card = new credit_card({
                nome_cartao,
                nome,
                numero_cartao,
                validade,
                CVV
            })

            if (new_credit_card) {

                await new_credit_card.save()
                res.status(201).json({
                    _id: new_credit_card._id,
                    nome_cartao: new_credit_card.nome_cartao,
                    Name: new_credit_card.nome,
                    numero_cartao: new_credit_card.numero_cartao,
                    validade: new_credit_card.validade,
                    CVV: new_credit_card.CVV
                })
            }

            
        }  catch (error) {
        console.log("Error in add_credit_card:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
            })
        }
    }

    export const edit_credit_card = async(req, res) => {
        try{
            const cartao_nome = req.params.card_name
            const update = req.body

            if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(update.validade)) {
                return res.status(400).json({
                error: 'Formato de validade inválido. Use MM/AA (ex: "12/25")'
                });
            }

            if(update.nome_cartao && update.nome_cartao != cartao_nome ){
                const aux = await credit_card.findOne({nome_cartao: update.nome_cartao })

                if(aux && aux.nome_cartao != cartao_nome){
                    console.log("Nome do cartão already exists")
                return res.status(400).json({
                    error: "Nome do cartão already exists"
                    })
                }
            }

            const cartao = await credit_card.findOne({ nome: update.nome, numero_cartao: update.numero_cartao, validade: update.validade, CVV: update.CVV})
            
            if(cartao && cartao.nome_cartao != cartao_nome){
                console.log("Cartão already exists")
                return res.status(400).json({
                    error: "Cartão already exists"
                })
            }
        

            const credit_card_aux = await credit_card.findOneAndUpdate(
                {nome_cartao: cartao_nome},           

                {$set:{
                    nome_cartao: update.nome_cartao,
                    nome: update.nome,
                    numero_cartao: update.numero_cartao,
                    validade: update.validade,
                    CVV: update.CVV},
                },

                {new: true}
            )

            if(!credit_card_aux){
                return res.status(404).json({error:"Card not found"})
            }
            res.status(200).json(credit_card_aux)

            
        }  catch (error) {
        console.log("Error in edit_credit_card:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
            })
        }
    }

    export const delete_credit_card = async(req, res) => {
        try{
            const cartao_nome = req.params.card_name
            const credit_card_aux = await credit_card.findOneAndDelete({ nome_cartao: cartao_nome })
            
            if(!credit_card_aux){
                return res.status(404).json({error:"Card not found"})
            }
            res.status(200).json(credit_card_aux)

            
        }  catch (error) {
        console.log("Error in delete_credit_card:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
            })
        }
    }