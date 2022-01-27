import express from 'express';

const port = process.env.PORT || 3000;
const  app = express();
app.use(express.json());

app.post('/app-connector', (_, res )=>{
    res.json({ ok: true});
});

app.listen(port, () => console.log('Salute on ${port}'));
