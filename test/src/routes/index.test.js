const request = require("supertest")
const app = require('../../../server')


describe('Test My App server', () => {
    it('should get main route', async () => {
        const res = await request(app)
            .get('/api/chamados')
        
        expect(res.body).toHaveProperty('message')
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Hello World!')

    })
})
