import express from "express"

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => console.log(`⚡️ App listening: http://localhost:${PORT}`));