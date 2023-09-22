const express = require('express');
const app = express();
const port = 8080;
const connectMongoDB = require('./db');

// Connect to MongoDB
connectMongoDB();

// Middleware
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next();
})

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Include your API routes
app.use('/api', require('./routes/CreateUsers'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
