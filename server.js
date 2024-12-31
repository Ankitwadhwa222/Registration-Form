import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dataFilePath = path.join(__dirname, 'data.json');
console.log("Data file path:", dataFilePath);

app.post('/api/save', (req, res) => {
  const data = req.body;


  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }

  fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
    let json = [];
    if (!err && fileData.trim()) {
      try {
        json = JSON.parse(fileData);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return res.status(500).json({ message: 'Corrupted data file. Resetting...' });
      }
    }

    json.push(data);

    fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to file:", writeErr);
        return res.status(500).json({ message: 'Error saving data' });
      } else {
        return res.status(200).json({ message: 'Data saved successfully' });
      }
    });
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

