const { MongoClient } = require("mongodb");
const config = require("../config");

class MongoDB {
  static client;

  static async connect(uri = config.db.uri) {
    if (this.client) return this.client;
    try {
      this.client = new MongoClient(uri);
      await this.client.connect();
      console.log("Connected to MongoDB:", uri);
      return this.client;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
}

module.exports = MongoDB;
