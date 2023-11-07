import { app } from "../app.js";
import supertest from "supertest";
import request from "supertest";

describe("POST /weather", () => {
  it("should return weather data for a valid city name", async () => {
    const cityName = "Amsterdam";

    const response = await request(app)
      .post('/weather')
      .send({ cityName });

    expect(response.status).toBe(200);
    expect(response.body.weatherText).toMatch(/The temperature in (.+) is (\d+(\.\d+)°C)/);
  });

  it("should return an error for an invalid city name", async () => {
    const cityName = "Invalid City Name!";

    const response = await request(app)
      .post('/weather')
      .send({ cityName });

    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe('City is not found!');
  });
});
