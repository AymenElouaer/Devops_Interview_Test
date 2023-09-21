import express from "express";

const router = express.Router()

router.post('/template', (req, res) => {
    try {
        const { name, scenario, containerImage } = req.body;
        // handle the data 
        console.log('Received data:', { name, scenario, containerImage });
        //return a success response
        res.status(200).json({ message: 'Data Received Successfullly' })
        //handle errors
    } catch (error) {
        console.error('Error processing the data:', error);
        res.status(500).json({ error: 'Internal server error' })
    }

})

export default router;

