const request = require("supertest")
const app = require('../server')

var defaultRoute  = '/api/chamados';
describe('Test the chamados routes', () => {
    it('', async () => {
        const res = await request(app)
            .get(`${defaultRoute}/`)
        console.log(res)
        expect(res.body).toHaveProperty('message')
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Hello World!')

    })
})
