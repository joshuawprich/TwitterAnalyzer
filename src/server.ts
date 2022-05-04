import app from "./config/app";

// router.get("/", async (ctx: Koa.Context) => {
//   const name = ctx.query.name || "stranger";
//   ctx.body = {
//     message: `Hello, ${name}!`
//   };
// });

const PORT: number = Number(process.env.PORT || 3000);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}...`));
