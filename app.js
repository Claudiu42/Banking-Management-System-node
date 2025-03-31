const express = require("express");
const app = express();
const cors = require('cors')



const banciRouter = require("./routes/banci");
const clientiRouter = require("./routes/clienti");
const conturi_bancareRouter = require("./routes/conturi_bancare");

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/banci", banciRouter);
app.use("/clienti", clientiRouter);
app.use("/conturi-bancare", conturi_bancareRouter);

const port = 3000;


const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
