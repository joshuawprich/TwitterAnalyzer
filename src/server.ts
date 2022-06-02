import app from "./config/app";

const PORT: number = Number(process.env.PORT || 4000);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}...`));
