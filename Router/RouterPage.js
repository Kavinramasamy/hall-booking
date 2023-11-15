import express from 'express';
import { } from 'dotenv/config.js';
import { BookedSchema, CustomerSchema, HallSchema } from '../Helper/MongooseValidator.js';

const router = express.Router();

//Welcome page
router.get("/", async (req, res) => {
    res.status(200).json({ message: "Hall Booking Task" })
})

//Adding new hall
router.post('/addHall', async (req, res) => {

    try {
        const hall = await HallSchema({
            hallName: req.body.hallName,
            amenities: req.body.amenities,
            priceForHour: req.body.priceForHour,
            capacity: req.body.capacity
        }).save();
        res.status(200).json({ message: "Hall added", hall });
    } catch (error) {
        res.status(500).json({ message: "Unable to add hall", error })
    }
})

//Getting hall list
router.get('/hallList', async (req, res) => {

    try {
        const hallList = await HallSchema.find();
        res.status(200).json({ message: "Hall List", hallList });
    } catch (error) {
        res.status(500).json({ message: "Unable to get hall data", error })
    }
})

//Getting coustomer list
router.get('/customers', async (req, res) => {

    try {
        const customerList = await CustomerSchema.find();
        if (customerList.length === 0) {
            return res.status(400).json({ message: "No customers" })
        }
        res.status(200).json({ message: "Customer List", customerList });
    } catch (error) {
        res.status(500).json({ message: "Unable to get customer data", error })
    }
})

//Getting booked halls list
router.get('/bookedhalls', async (req, res) => {

    try {
        const hallList = await HallSchema.find();
        if (hallList.length === 0) {
            return res.status(400).json({ message: "No hall is booked" })
        }
        res.status(200).json({ message: "Hall List", hallList });
    } catch (error) {
        res.status(500).json({ message: "Unable to get hall data", error })
    }
})

//Hall booking
router.post('/booking', async (req, res) => {
    try {
        const hall = await HallSchema.findOne({ hallName: req.body.hallName });
        if (!hall) {
            return res.status(400).json({ message: `No hall is present with then name ${req.body.hallName}` })
        }
        const booking = await BookedSchema({
            hallName: req.body.hallName,
            customerName: req.body.customerName,
            customerID: req.body.mobileNo,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        }).save();

        const customer = await CustomerSchema.find({ customerID: req.body.mobileNo });

        const updateStatus = await HallSchema.updateOne({ hallName: req.body.hallName }, { $set: { status: "Booked" } });

        //Adding and updating customer log and info
        if (customer.length !== 0) {
            const bookedCount = +customer[0].noOfTimeBooked + 1;
            console.log(bookedCount)
            const upateBookedCount = await CustomerSchema.updateOne({ customerID: req.body.mobileNo }, { $set: { noOfTimeBooked: bookedCount } });
        }
        else {
            const newCoustomer = await CustomerSchema({
                customerName: req.body.customerName,
                customerID: req.body.mobileNo,
                mobileNo: req.body.mobileNo,
            }).save();
        }
        res.status(200).json({ message: `${req.body.hallName} is booked` })
    } catch (error) {
        res.status(500).json({ message: `Unable to book try again later`, error })
    }
})


export const RouterPage = router;