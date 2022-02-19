import app from "./app";
import { NODE_ENV, HOST as host, PORT as port } from "./utils/env";

app.listen({ host, port }, () => {
  const serverType = NODE_ENV === "development" ? "Development" : "Production";
  console.log(`${serverType} server ready at http://${host}:${port}`);
});
