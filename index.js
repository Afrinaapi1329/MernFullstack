
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import route from "./routes/userRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// Middleware
app.use(express.json());

// Simple request logger for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Register routes
app.use("/api", route);
// debug: recursively show all registered paths (including nested routers)
function printRoutes(stack, prefix = '') {
    stack.forEach(layer => {
        if (layer.route) {
            const methods = Object.keys(layer.route.methods).join(',');
            console.log(`${methods} ${prefix}${layer.route.path}`);
        } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
            const path = layer.regexp && layer.regexp.source !== '^\\/?$'
                ? layer.regexp.source
                : '';
            const cleaned = path.replace('\\/?', '').replace('^', '').replace('$', '');
            printRoutes(layer.handle.stack, prefix + cleaned);
        }
    });
}

if (app._router && app._router.stack) {
    console.log('=== ROUTE LIST ===');
    printRoutes(app._router.stack);
    console.log('=== END ROUTES ===');
}

// Connect to MongoDB   
const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
        .then(() => {
            console.log("Connected to MongoDB");
            // list available routes (if router exists)
            if (app._router && app._router.stack) {
                app._router.stack.forEach(mw => {
                    if (mw.route) {
                        const methods = Object.keys(mw.route.methods).join(',');
                        console.log(`route ${methods} ${mw.route.path}`);
                    }
                });
            }
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });

        })
        .catch((error) => console.log(error));

