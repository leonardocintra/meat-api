"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const request = require("supertest");
test('retornar status HTTP 200 (GET) ao buscar todos os reviews', () => {
    return request('http://localhost:3001')
        .get('/reviews')
        .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    })
        .catch(fail);
});
