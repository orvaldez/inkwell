// server/src/index.js
//
// Only handles process startup (app.listen), not app construction.
import "dotenv/config";
import { app } from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Inkwell API listening on port ${PORT}`);
});