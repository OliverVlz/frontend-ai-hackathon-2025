const express = require('express');
const path = require('path');
const app = express();

// Ruta al build de Angular
app.use(express.static(path.join(__dirname, 'dist/project')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/project/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App corriendo en el puerto ${port}`);
});
