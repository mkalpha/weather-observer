import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

// Serve index.html at the root
app.get("/", serveStatic({ path: "./src/app/index.html" }));

// Serve all other static files (dist, etc.)
app.use("/dist/*", serveStatic({ root: "./" }));

const port = 3000;
console.log(`Server running on http://localhost:${port}`);
serve({ fetch: app.fetch, port });

export default app;
