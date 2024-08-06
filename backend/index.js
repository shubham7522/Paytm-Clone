const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is started at the port ${PORT}`);
});
