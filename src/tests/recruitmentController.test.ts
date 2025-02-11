import request from 'supertest';
import { app } from '../server';

describe('Recruitment API', () => {
    it('should return a response for a valid prompt', async () => {
        const res = await request(app).post('/api/recruit').send({ prompt: 'What is recruitment?' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('response');
    });

    it('should return an error for missing prompt', async () => {
        const res = await request(app).post('/api/recruit').send({});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Prompt is required' });
    });
});
