const Trip = require('../models/Trip');
const User = require('../models/User')

async function getAllTrips() {
    return await Trip.find().lean();
}


async function getTripById(id) {
    return Trip.findById(id).populate('buddies').populate('author').lean();
}


async function createTrip(tripData) {

    const trip = new Trip(tripData);
    await trip.save();

    return trip
}


async function editTrip(id, tripData) {
    const trip = await Trip.findById(id);

    trip.startPoint = tripData.startPoint;
    trip.endPoint = tripData.endPoint;
    trip.date = tripData.date;
    trip.time = tripData.time;
    trip.carImage = tripData.carImage;
    trip.carBrand = tripData.carBrand;
    trip.seats = tripData.seats;
    trip.price = tripData.price;
    trip.description = tripData.description;

    return trip.save();
}

async function deleteTrip(id) {
    return Trip.findByIdAndDelete(id)
}

async function join(tripId, userId) {
    const trip = await Trip.findById(tripId);
    const user = await User.findById(userId);

    user.tripsHistory.push(trip);
    trip.buddies.push(user);
    trip.seats--;
    await user.save()
    return trip.save();
}

module.exports = {
    getAllTrips,
    getTripById,
    createTrip,
    editTrip,
    deleteTrip,
    join
}