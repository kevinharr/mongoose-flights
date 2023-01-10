import mongoose from 'mongoose'

const Schema = mongoose.Schema
	
const flightSchema = new Schema({
  airline: String,
  airport: String,
  flightNo: Number,
  departs: {
    type: Date,
    default: function() {
        const today = new Date();
        console.log(today)
        const oneYearLater = today.getFullYear() + 1
        console.log(oneYearLater);
        today
    }
  }
}, {
    timestamps: true
})
	
// Compile the schema into a model and export it
const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}