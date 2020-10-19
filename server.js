const express = ("express");

const app = express();

PORT = process.env.PORT || 46723;

app.listen(PORT,  () =>
console.log(`Server started at http://localhost:${PORT}`)
)