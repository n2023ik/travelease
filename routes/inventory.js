import express from "express";
import { inventory } from "../data/inventory.js";

const router = express.Router();
const MODE_MAP = {
  flight: "flights",
  flights: "flights",
  train: "trains",
  trains: "trains",
  car: "cars",
  cars: "cars",
  hotel: "hotels",
  hotels: "hotels"
};

router.get("/", (req, res) => {
  const { mode = "flights", from = "", to = "", city = "" } = req.query;
  const datasetKey = MODE_MAP[mode.toLowerCase()] || "flights";
  let results = inventory[datasetKey] || [];

  const normalize = (value) => value.trim().toLowerCase();
  const fromValue = normalize(from);
  const toValue = normalize(to);
  const cityValue = normalize(city);

  if (datasetKey === "flights" || datasetKey === "trains") {
    results = results.filter((item) => {
      const matchesFrom = fromValue ? item.from.toLowerCase().includes(fromValue) : true;
      const matchesTo = toValue ? item.to.toLowerCase().includes(toValue) : true;
      return matchesFrom && matchesTo;
    });
  }

  if (datasetKey === "hotels" && cityValue) {
    results = results.filter((item) => item.city.toLowerCase().includes(cityValue));
  }

  res.json({ mode: datasetKey, results });
});

export default router;



