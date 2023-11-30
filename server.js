const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let guestbookEntries = loadEntriesFromFile();

function loadEntriesFromFile() {
  try {
    const data = fs.readFileSync("data.json", "utf8");
    return JSON.parse(data).entries || [];
  } catch (error) {
    console.error("Error reading data.json:", error.message);
    return [];
  }
}

function saveEntriesToFile() {
  const dataToSave = { entries: guestbookEntries };
  try {
    fs.writeFileSync("data.json", JSON.stringify(dataToSave, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data.json:", error.message);
  }
}

app.post("/saveEntry", (req, res) => {
  const { name, email, comment } = req.body;

  if (name && email && comment) {
    const entryObject = { name, email, comment };
    guestbookEntries.push(entryObject);
    saveEntriesToFile();
    res.status(200).send({ success: true });
  } else {
    res.status(400).send({ success: false, error: "Invalid data" });
  }
});

app.get("/getEntries", (req, res) => {
  res.json({ entries: guestbookEntries });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
