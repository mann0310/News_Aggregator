const request = require('supertest');

const baseURL = "http://localhost:4000";

describe('GET /vote/:commentId/:direction', () => {
    test('should return status 200 for valid voting parameter', async () => {
        const res = await request(baseURL).get('/vote/644a1ae4e5054a77df0fb4d6/up')
        .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGFiMGE0NzUxNDdjMDI4NzYwNTQ3YyIsImlhdCI6MTY4MjYxNjQ4NH0.mWBdWGRTvdwu_wj9GVYZN0UtBLeb8aqpKepO7omksjk');
        expect(res.status).toEqual(200);
    });

    test('should return status 404 for invalid voting direction', async () => {
        
        const res = await request(baseURL).get('/vote/644a1ae4e5054a77df0fb4d6/d')
        .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDY3NDU4NTY3Y2M3YmQ1NzA0MTgzYiIsImlhdCI6MTY4MjYxNTMzMH0.MiDutkU8mCRX92Vk98kLMrEicSW9ie53CotRyEUqnaw');
        expect(res.status).toEqual(404);
    });

    // test('should return status 500 for invalid comment id', async () => {
        
    //     const res = await request(baseURL).get('/vote/644a1ae4e5054a77df0fb4d/down')
    //     .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDY3NDU4NTY3Y2M3YmQ1NzA0MTgzYiIsImlhdCI6MTY4MjYxNTMzMH0.MiDutkU8mCRX92Vk98kLMrEicSW9ie53CotRyEUqnaw');
    //     expect(res.status).toEqual(500);
    // });

    test('should return status 404 for no token user', async () => {
        const res = await request(baseURL).get('/vote/644a1ae4e5054a77df0fb4d6/down');
        expect(res.status).toEqual(400);
    });

    test('invalid token causes server error', async () => {
        
        const res = await request(baseURL).get('/vote/644a1ae4e5054a77df0fb4d6/down')
        .set('Cookie','token=yeJhbGciiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDY3NDU4NTY3Y2M3YmQ1NzA0MTgzYiIsImlhdCI6MTY4MjU4NzczOX0.o3C9m1rz5luzrivag2GgBA1NWHX2Sn76jiRFk8DVCVU')
        expect(res.status).toEqual(500);
   });
});

describe('POST /votes', () =>{
    test('should return status 200 for valid voting', async () => {
        const req = {
            body: {
                 commentId: '644a1ae4e5054a77df0fb4d6'
            }
       };
       const res = await request(baseURL).get('/votes')
        .set('Cookie','token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDY3NDU4NTY3Y2M3YmQ1NzA0MTgzYiIsImlhdCI6MTY4MjYxNTMzMH0.MiDutkU8mCRX92Vk98kLMrEicSW9ie53CotRyEUqnaw')
        .send(req.body);
        expect(res.status).toEqual(200);
    });
});