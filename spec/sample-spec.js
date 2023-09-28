const axios = require('axios');
const app = require('../server'); // Replace with the actual path to your Express server file

describe('Express Server', () => {
    it('should respond with status 200 for GET /', async () => {
        const response = await axios.get('http://localhost:3000/'); // Adjust the URL as needed
        expect(response.status).toBe(200);
    });

    it('should serve the index.html file for GET /', async () => {
        const response = await axios.get('http://localhost:3000/'); // Adjust the URL as needed
        expect(response.headers['content-type']).toContain('text/html; charset=UTF-8');
        expect(response.data).toContain('<!DOCTYPE html>');
    });

    it('should respond with status 404 for GET /nonexistent', async () => {
        try {
            await axios.get('http://localhost:3000/nonexistent'); // Adjust the URL as needed
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});