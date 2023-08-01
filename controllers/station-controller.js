import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "Station",
      station: station,
    };
    response.render("station-view", viewData);
  },
  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    console.log(`adding reading ${newReading.title}`);
    console.log(`adding duration of reading ${newReading.duration}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },
};
