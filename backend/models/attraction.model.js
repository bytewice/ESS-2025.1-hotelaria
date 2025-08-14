import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userName: String,
  comentario: String,
  nota: Number,
  data: Date
});

const attractionSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  reviews: [reviewSchema]
}, { timestamps: true });

const Attraction = mongoose.model("Attraction", attractionSchema);
export default Attraction;
