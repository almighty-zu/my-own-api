const express = require("express");
const router = express.Router();
const db = require("../db");
const seats = db.seats;

router.route("/seats").get((req, res) => {
  res.json(seats);
});
router.route("/seats/random").get((req, res) => {
  const id = Math.floor(Math.random() * seats.length + 0);
  const record = seats.find((el) => el.id == id);
  res.json(record);
});

router.route("/seats/:id").get((req, res) => {
  const record = seats.find((el) => el.id == req.params.id);
  res.json(record);
});
router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newRecord = {};
  newRecord.id = Math.random().toString(26).slice(2);
  newRecord.seat = seat;
  newRecord.client = client;
  newRecord.email = email;
  newRecord.day = day;
  if(db.seats.some(chosenSeat => (chosenSeat.day == req.body.day && chosenSeat.seat == req.body.seat))) {
    return res.status(404).json({message: 'This seat is taken'});
  } else {
    db.seats.push(seat);
    return res.json(db.seats);
  }
});

router.route("/seats/:id").put((req, res) => {
  const { day, seat, client, email } = req.body;
  const record = seats.find((el) => el.id == req.params.id);
  record.seat = seat;
  record.client = client;
  record.email = email;
  record.day = day;
  res.json({ message: "OK" });
});
router.route("/seats/:id").delete((req, res) => {
  const record = seats.find((el) => el.id == req.params.id);
  const recordIndex = seats.indexOf(record);
  seats.splice(recordIndex, 1);
  res.json({ message: "OK" });
});

module.exports = router;