import mongoose from "mongoose";

const hallSchema = await mongoose.Schema({

    hallName: {
        type: String,
        required: true
    },
    amenities: {
        type: Array,
        required: true
    },
    priceForHour: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Available"
    },
    capacity: {
        type: Number,
        required: true
    }
})

const customerSchema = await mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true
    },
    noOfTimeBooked: {
        type: Number,
        required: true,
        default: 1
    }
})

const bookedSchema = await mongoose.Schema({
    hallName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true
    },
    bookedDate: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString()
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
})

export const HallSchema = mongoose.model("halls", hallSchema);
export const CustomerSchema = mongoose.model("coustomers", customerSchema);
export const BookedSchema = mongoose.model("bookings", bookedSchema);
