import mongoose from 'mongoose'

const Schema = mongoose.Schema
	
const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"]
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"]
  },
  flightNumber: { type: Number, min: 10, max: 9999, default: 9999},
  departs: { type: Date },
}, {
    timestamps: true
})
	
// Compile the schema into a model and export it
const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}