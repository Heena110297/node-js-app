const express = require('express');
const router = express.Router();

//get courses
router.get("/", (req, res, next) => {
    res.json([{
            id: 1,
            name: 'English'
        },
        {
            id: 1,
            name: 'German'
        },
        {
            id: 1,
            name: 'Spanish'
        }
    ]);
});

module.exports= router;