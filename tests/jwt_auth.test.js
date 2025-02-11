const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app/src/app');
const { generateJWT } = require('../app/src/routes');

beforeAll(() => {
    process.env.JWT_SECRET = 'your_secret_value';
});

describe('JWT Authentication', () => {
    it('should redirect to /login if no JWT token is provided', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/login');
    });

    it('should redirect to /login if an invalid JWT token is provided', async () => {
        const response = await request(app)
            .get('/')
            .set('Cookie', 'token=invalid_token');
        
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/login');
    });

    it('should generate a valid JWT token', () => {
        const user = { id: 'test_user', name: 'Test' };
        const token = generateJWT(user);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        expect(decoded.id).toBe(user.id);
        expect(decoded.name).toBe(user.name);
    });

    it('should clear token on logout', async () => {
        const response = await request(app).get('/logout');
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/');
        expect(response.header['set-cookie'][0]).toContain('token=;');
    });
});