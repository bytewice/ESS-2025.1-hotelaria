import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  comentario: String,
  nota: Number,
  data: Date
});

const attracionSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  reviews: [reviewSchema]
}, { timestamps: true });

const Atracao = mongoose.model("Attracion", attracionSchema);
export default Attracion;
