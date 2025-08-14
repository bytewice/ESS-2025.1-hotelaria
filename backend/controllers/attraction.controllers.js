import generateTokenAndSetCookie from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import Attraction from '../models/attraction.model.js'; // seu schema de Atrações

// import User se quiser salvar autor do review

// 1. Listar todas as atrações
export const getAllAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.find();
    res.status(200).json(attraction);
  } catch (error) {
    console.log("Error in get attracions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2. Detalhar uma atração pelo nome
export const detailAttraction = async (req, res) => {
  try {
    const { name } = req.params;
    const attraction = await Attraction.findOne({ nome: name });

    if (!attraction) {
      return res.status(404).json({ error: "attraction não encontrada" });
    }

    res.status(200).json(attraction);
  } catch (error) {
    console.log("Error in detail attraction", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 3. Listar avaliações de uma attraction
export const getReview = async (req, res) => {
  try {
    const { name } = req.params;
    const attraction = await Attraction.findOne({ nome: name }).populate('reviews');

    if (!attraction) {
      return res.status(404).json({ error: "attraction não encontrada" });
    }

    res.status(200).json(attraction.reviews || []);
  } catch (error) {
    console.log("Error in getReview:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 4. Enviar uma nova avaliação
export const sendReview = async (req, res) => {
  try {
    const { name } = req.params;
    const { userName, comentario, nota } = req.body;

    // Verifica se a nota foi enviada
    if (nota === undefined) {
      return res.status(400).json({ error: "Campo 'nota' é obrigatório" });
    }

    const attraction = await Attraction.findOne({ nome: name });
    if (!attraction) {
      return res.status(404).json({ error: "attraction não encontrada" });
    }

    const review = { userName, comentario, nota, data: new Date() };
    attraction.reviews.push(review);

    await attraction.save();
    res.status(201).json({ mensagem: "Review adicionada com sucesso!" });
  } catch (error) {
    console.log("Error in sendReview:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// 5. Criar uma nova attraction
export const createAttraction = async (req, res) => {
  try {
    const novaattraction = new Attraction(req.body);
    await novaattraction.save();
    res.status(201).json(novaattraction);
  } catch (error) {
    console.log("Error in createAtration:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// 6. Deletar uma attraction
export const deleteAttraction = async (req, res) => {
  try {
    const { name } = req.params;

    const deleted = await Attraction.findOneAndDelete({ nome: name });

    if (!deleted) {
      return res.status(404).json({ error: "Atração não encontrada." });
    }

    res.status(200).json({ mensagem: "Atração deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar atração:", error.message);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};
// 7. Deletar todas as atrações
export const deleteAllAttractions = async (req, res) => {
  try {
    await Attraction.deleteMany({});
    res.status(200).json({ mensagem: "Todas as atrações foram deletadas com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar todas as atrações:", error.message);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};
