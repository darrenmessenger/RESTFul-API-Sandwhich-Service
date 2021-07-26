const express = require('express');
const app = require('../../app');
const router = express.Router();

router.use(express.json());

const orders = [
    {id:1, time:'07:55:00', endTime:'08:00:00', description: 'Prepare'},
    {id:2, time:'08:00:00', endTime:'23:59:00', description: 'Take a break'},
]

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Returning the full schedule',
        orders: orders
    })
})

router.get('/:orderId', (req, res, next) => {
    const individualOrder = orders.find(s => s.id === parseInt(req.params.orderId));
    if (!individualOrder){
        res.status(404).json({
            message: 'The order was not found'
        })
        return;
    }
    res.status(200).json({
        message: 'Returning an individual order',
        order: individualOrder,
        id: id
    })
})


router.post('/', (req, res, next) => {
    if (!req.body.name){
        res.status(400).json({
            message: 'You need to enter a name for the order'
        })
        return;
    }

    var lastOrder = orders[orders.length-1];
    //if the last order is a break, then remove it as we have a new order
    if (lastOrder.description === 'Take a break')
    {
        const index = orders.indexOf(orders.length-1);
        orders.splice(index, 1);
    }
    // Re-read the last order
    lastOrder = orders[orders.length-1];
    
    const lastOrderEndTime = lastOrder.endTime;
    var startTime = new Date();
    // Check if the last order end time is in the future
    if (lastOrderEndTime > startTime){
        startTime = new Date(lastOrderEndTime.getTime());     
    }

    // Allow 2 1/2 minutes to make the sandwhich
    var endTime = new Date(startTime.getTime());
    endTime.setSeconds(endTime.getSeconds() + 150);

    var orderDesc = "Make sandwich for " + req.body.name;
    
    // add a new entry for the making of the sandwhich
    const order = {
        id: orders.length + 1,
        startTime: startTime,
        endTime: endTime,
        description: orderDesc
    }
    orders.push(order);

    // The start time it takes to serve is the end time of when the sandwhich was made.
    var startTimeServe = new Date(endTime.getTime());
    // Calculate the end time it takes to serve the sandwich by adding 1 minute.
    var endTimeServe = new Date(endTime.getTime());
    endTimeServe.setSeconds(endTimeServe.getSeconds() + 60);   
    
    orderDesc = "Serve sandwich for " + req.body.name;

    // add a new entry for the serving of the sandwhich
    const serve = {
        id: orders.length + 1,
        startTime: startTimeServe,
        endTime: endTimeServe,
        description: orderDesc
    }
    orders.push(serve);

    // set the end time of the break to the end of the day.
    // This will be overwritten when a new order arrives. 
    var endOfDay = new Date();
    endOfDay.setHours(23,59,59,999);

    const breakTime = {
        id: orders.length + 1,
        startTime: endTimeServe,
        endTime: endOfDay,
        description: "Take a break"
    }
    orders.push(breakTime);
    
    
    res.status(201).json({
        message: 'Entered a new order',
        order: order,
        serve: serve,
        breakTime: breakTime,
    })
})

router.patch('/:orderId', (req, res, next) => {
    const individualOrder = orders.find(s => s.id === parseInt(req.params.orderId));
    if (!individualOrder){
        res.status(404).json({
            message: 'The order was not found'
        })
        return;
    }

    if (!req.body.order){
        res.status(400).json({
            message: 'You need to enter name for the updated order'
        })
        return;
    }

    individualOrder.description = req.body.order;

    res.status(200).json({
        message: 'Updated an order',
        order: individualOrder
    })
})

router.delete('/:orderId', (req, res, next) => {
    const individualOrder = orders.find(s => s.id === parseInt(req.params.orderId));
    if (!individualOrder){
        res.status(404).json({
            message: 'The order was not found'
        })
        return;
    }

    const index = orders.indexOf(individualOrder);
    orders.splice(index, 1);

    res.status(200).json({
        message: 'Deleted an order',
        order: individualOrder
    })
})

module.exports = router;
