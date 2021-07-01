const { Schema, model } = require('mongoose');

const schema = new Schema({
    startPoint: { type: String, minLength: [4, 'Start Point must be at least 4 characters long.'] },
    endPoint: { type: String, minLength: [4, 'End Point must be at least 4 characters long'] },
    date: { type: Date, required: [true, 'Date is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    carImage: { type: String, required: [true, 'Image is required'], match: [/^https?/, 'Image must be a valid URL'] },
    carBrand: { type: String, minLength: [4, 'Car brand must be at least 4 characters long.'] },
    seats: { type: Number, required: [true, 'Seats is required'], min: [0, "Minimum Seats 0"], max: [4, "Max Seats is 4"] },
    price: { type: Number, required: [true, 'Price is required'], min: [1, "Minimum Price 1"], max: [50, "Max Price is 50"] },
    description: { type: String, minLength: [10, 'Description must be at least 10 characters long.'] },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    buddies: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],

})

module.exports = model('Trip', schema)