import app from "./config/app";
import todoRoutes from "./routes/todoRoutes";
import statsRoutes from "./routes/statsRoutes";
import categoryRoutes from "./routes/categoryRoutes";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/todos", todoRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
