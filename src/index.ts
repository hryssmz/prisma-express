import app from "./app";
import { HOST as host, PORT as port } from "./utils/env";

app.listen({ host, port }, () => {
  console.log(`Server ready at http://${host}:${port}`);
});
