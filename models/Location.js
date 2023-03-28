db = require("../database/dbConnect.js");

class Location {
  constructor(id, name, description, location_url) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location_url = location_url;
  }
}

class LocationService {
  static mapToModel(dbResponse) {
    return dbResponse.rows.map(
      (e) => new Location(e.id, e.name, e.description, e.location_url)
    );
  }

  static async showAll() {
    const locations = await db.query(`
        SELECT *
        FROM local_attractions
        `);
    return LocationService.mapToModel(locations);
  }
}

module.exports = LocationService;
