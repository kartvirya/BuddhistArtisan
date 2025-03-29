import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Sleep function to introduce delays
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to kill processes using port 5000
async function killPort() {
  try {
    log("Attempting to forcefully kill any processes on port 5000...");
    
    // Use multiple methods to ensure the port is really free
    try {
      await execAsync("npx fkill :5000 --force --silent");
    } catch (e) {
      // Ignore errors from fkill
    }
    
    // Also try with the pkill command as a backup
    try {
      await execAsync("pkill -f '(listen|node).*:5000'");
    } catch (e) {
      // Ignore errors from pkill
    }
    
    log("Port kill attempts completed");
    
    // Wait to ensure port is released
    await sleep(2000);
  } catch (error) {
    log("Error in port kill process: " + (error as Error).message);
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Kill any processes using port 5000 before starting
  await killPort();
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Replit expects the server to be on port 5000
  // Use a method more compatible with Replit's environment
  const port = 5000;
  
  // Make a final attempt to kill any processes on port 5000
  await killPort();
  
  // Add a delay to ensure port is free
  await sleep(2000);
  
  // Start the server without retry logic
  server.listen({
    port,
    host: "0.0.0.0",
  })
  .on('listening', () => {
    log(`Server started successfully on port ${port}`);
    const replSlug = process.env.REPL_SLUG || '';
    const replOwner = process.env.REPL_OWNER || '';
    if (replSlug && replOwner) {
      log(`View the site at: https://${replSlug}.${replOwner}.repl.co`);
    }
  })
  .on('error', (err: any) => {
    log(`Error starting server: ${err.message}`);
    process.exit(1);
  });
})();
