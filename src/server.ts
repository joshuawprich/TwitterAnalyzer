import app from "./config/app";

const PORT: number = Number(process.env.PORT || 3000);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}...`));
