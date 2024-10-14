const request = require("supertest");
const express = require("express");
const { loadCSVInMemory } = require("../../src/services/csv");
const moviesRoutes = require("../../src/routes/routes");
const db = require("../../src/database/sqlite");

const app = express();
app.use(express.json());
app.use("/api", moviesRoutes);

beforeAll((done) => {
  loadCSVInMemory(true);
  db.serialize(() => {
    db.run(`DELETE FROM movie`);
    db.run(`INSERT INTO movie (id, year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?, ?)`, [1, 2024, "Movie Test", "GuilhermeTec Entertainment", "Guilherme", "yes"], done);
  });
});

describe("GET /api/movies", () => {
  it("Deve retornar uma lista de registros", async () => {
    const res = await request(app).get("/api/movies");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/movies/getById", () => {
  it("Deve retornar um registro pelo ID", async () => {
    const res = await request(app).get("/api/movies/getById?id=1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("year", 2024);
    expect(res.body).toHaveProperty("title", "Movie Test");
    expect(res.body).toHaveProperty("studios", "GuilhermeTec Entertainment");
    expect(res.body).toHaveProperty("producers", "Guilherme");
    expect(res.body).toHaveProperty("winner", "yes");
  });

  it("Deve retornar 404 se o registro não for encontrado", async () => {
    const res = await request(app).get("/api/movies/999");
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /api/movies", () => {
  it("Deve criar um novo registro", async () => {
    const movie = {year: 2023, title: "Movie Test 2", studios: "GuilhermeTec Entertainment", producers: "Guilherme", winner: "yes"};
    const res = await request(app)
      .post("/api/movies")
      .send(movie);

    expect(res.statusCode).toBe(201);

    const checkRes = await request(app).get("/api/movies/getById?id=2");
    expect(checkRes.statusCode).toBe(200);
    expect(checkRes.body).toHaveProperty("title", "Movie Test 2");
  });
});

describe("GET /api/movies/worstproducer", () => {
  const expected = {"max": [{"followingWin": 2024, "interval": 1, "previousWin": 2023, "producers": "Guilherme"}], "min": [{"followingWin": 2024, "interval": 1, "previousWin": 2023, "producers": "Guilherme"}]};
  
  it("Deve retornar o registro de intervalos", async () => {
    const res = await request(app).get("/api/movies/worstproducer");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.objectContaining(expected));
  });

  it("Deve retornar 404 se o registro não for encontrado", async () => {
    const res = await request(app).get("/api/movies/999");
    expect(res.statusCode).toBe(404);
  });
});

describe("PUT /api/movies/updateById", () => {
  it("Deve atualizar um registro existente", async () => {
    const updatedMovie = {year: 2024, title: "Movie PUT Test", studios: "GuilhermeTec Entertainment", producers: "Guilherme", winner: null};
    const res = await request(app)
      .put("/api/movies/updateById?id=1")
      .send(updatedMovie);

    expect(res.statusCode).toBe(200);

    const checkRes = await request(app).get("/api/movies/getById?id=1");
    expect(checkRes.statusCode).toBe(200);
    expect(checkRes.body).toHaveProperty("title", "Movie PUT Test");
  });
});

describe("DELETE /api/movies/deleteById", () => {
  it("Deve deletar um registro", async () => {
    let res = await request(app).delete("/api/movies/deleteById?id=1");
    expect(res.statusCode).toBe(204);
    res = await request(app).delete("/api/movies/deleteById?id=2");
    expect(res.statusCode).toBe(204);

    let checkRes = await request(app).get("/api/movies/getById?id=1");
    expect(checkRes.statusCode).toBe(404);
    checkRes = await request(app).get("/api/movies/getById?id=2");
    expect(checkRes.statusCode).toBe(404);
  });
});
