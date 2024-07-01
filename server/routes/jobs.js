const express = require('express');
const router = express.Router();
const client = require('../database/database');

router.get("/", (req, res) => {
    try {
        console.log("Query GET executing");
        client.query("SELECT * FROM Jobs", function (error, result) {
            if (error) return console.error("Error executing SELECT ALL query from infrastructure. Error: ", error);
            res.send(result.rows[0]);
            console.log("Query GET executed successfully");
        })
    } catch (error) {
        console.error("GET query error. Error: ", error);
    }
});

router.post("/", (req, res) => {
    try {
        console.log("Query POST executing", req.body);
        const { title, description, payment, date, employer, local, hour, transport } = req.body;
        client.query(
            "INSERT INTO jobs ( title, description, payment, date, employer, local, hour, transport ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ",
            [title, description, payment, date, employer, local, hour, transport],
            function(error, result){
                if (error) return console.error("Error executing INSERT query. Error: " + error);
                const { id } = result.rows[0];
                res.setHeader ("id", "${id}");
                res.status(201).json(result.rows[0]);
                console.log("Query INSERT successfully.");
            }
        )
    } catch (error) {
        console.error("POST query error. Error: ", error);
    }
});

router.delete("/:id", (req,res) => {
    try {
        console.log("Query DELETE executing: ", req.params.id);
        const id = req.params.id;
        client.query(
            "DELETE FROM jobs WHERE id = $1",
            [id],
            function (error, result) {
                if (error) return console.log("Error executing DELETE ${id} query. Error: " + error);
                else {
                    result.rowCount == 0 ? 
                    res.status(400).json({ info: "User not found" }) 
                    : res.status(200).json({ info: "User successfully deleted"});
                }
                console.log("Query DELETE sucessfully");
            }
        )

    } catch (error) {
        console.error("DELETE query error. Error: ", error);
    }
});

router.put("/:id", (req,res) => {
    try {
        console.log("Query PUT executing");
        const id = req.params.id;
        const { title, description, payment, date, employer, local, hour, transport } = req.body;
        client.query(
            "UPDATE jobs SET title=$1, description=$2, payment=$3, date=$4, employer=$5, local=$6, hour=$7, transport=$8"
            [title, description, payment, date, employer, local, hour, transport],
            function (error, result) {
                if (error) return console.error("Error executing UPDATE query. Error: " + error);
                else {
                    res.setHeader("id", id);
                    res.status(202).json({identifier: id});
                    console.log("Query UPDATE successfully.");
                }
            }
        )
    } catch (error) {
        console.error("DELETE query error. Error: ", error);
    }
})

module.exports = router;