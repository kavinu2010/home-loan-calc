const express = require("express");
const app = express();
const fs = require("fs");

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/interestrate", (req, res) => {
  fs.readFile("../db/interestrate.json", "utf8", function (err, data) {
    if (err) throw err;

    const obj = JSON.parse(data);
    var intArray = obj.central_bank_rates;
    var resultArray = intArray.filter(function(item) { return item.country === 'Sweden'; });
    res.send((resultArray[0].rate_pct)+'');
  });
});
