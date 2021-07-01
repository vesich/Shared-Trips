const Trip = require('../models/Trip');
const User = require('../models/User')

async function getAllTrips() {
    try {
        return await Trip.find().lean();
    } catch (error) {
        throw error
    }

}


async function getTripById(id) {
    try {
        return Trip.findById(id).populate('buddies').populate('author').lean();
    } catch (error) {
        throw error
    }

}


async function createTrip(tripData) {
    try {
        const trip = new Trip(tripData);
        await trip.save();

        return trip
    } catch (error) {
        throw error
    }


}


async function editTrip(id, tripData) {
    try {
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
    } catch (error) {
        throw error
    }

}

async function deleteTrip(id) {
    try {
        return Trip.findByIdAndDelete(id)
    } catch (error) {
        throw error
    }

}

async function join(tripId, userId) {
    try {
        const trip = await Trip.findById(tripId);
        const user = await User.findById(userId);

        user.tripsHistory.push(trip);
        trip.buddies.push(user);
        trip.seats--;
        await user.save()
        return trip.save();
    } catch (error) {
        throw error
    }

}

module.exports = {
    getAllTrips,
    getTripById,
    createTrip,
    editTrip,
    deleteTrip,
    join
}