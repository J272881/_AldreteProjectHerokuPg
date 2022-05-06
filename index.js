// Add packages
require("dotenv").config();
// Add database package and connection string
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
// Required modules 
const express = require("express");
const app = express();
const dblib = require("./dblib.js");

const multer = require("multer");
const upload = multer();

// Add middleware to parse default urlencoded form
app.use(express.urlencoded({ extended: false }));

// Setup EJS
app.set("view engine", "ejs");

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Application folders
app.use(express.static("public"));

// Start listener
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started (http://localhost:3000/) !");
});


app.get("/", (req, res) => {
    //res.send("Root resource - Up and running!")
    res.render("");
});
app.post("/", upload.array(), async (req, res) => {
    dblib.findCustomers(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({trans: "Error", result: err.message}));

});

app.get("/managecustomers", async (req, res) => {
    // Omitted validation check
    res.render("", {
    });
});
app.post("/managecustomers", upload.array(), async (req, res) => {
    dblib.findCustomers(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({trans: "Error", result: err.message}));

});

app.get("/import", (req, res) => {
    
    res.render("import");
});

app.post("/import", upload.single('filename'), (req, res) => {
    
    if (!req.file || Object.keys(req.file).length === 0) {
        message = "Error: Import file not uploaded"
        return res.send(message);
    };
    //Read file line by line, inserting records
    const buffer = req.file.buffer;
    const lines = buffer.toString().split(/\r?\n/);

    lines.forEach(line => {
        //console.log(line);
        product = line.split(",");
        //console.log(product);
        const sql = "INSERT INTO CUSTOMER(cust_id, cust_fname, cust_lname, cust_state, cust_sales_ytd, cust_prev_sales) VALUES ($1, $2, $3, $4, $5, $6)";
        pool.query(sql, product, (err, result) => {
            if (err) {
                console.log(`Insert Error.  Error message: ${err.message}`);
            } else {
                console.log(`Inserted successfully`);
            }
        });
    });
    message = `Processing Complete - Processed ${lines.length} records`;
    res.send(message);
});

app.get("/export", (req, res) => {
    var message = "";
    res.render("export",{ message: message });
   });
   
   
   app.post("/export", (req, res) => {
       const sql = "SELECT * FROM CUSTOMER ORDER BY CUS_ID";
       pool.query(sql, [], (err, result) => {
           var message = "";
           if(err) {
               message = `Error - ${err.message}`;
               res.render("output", { message: message })
           } else {
               var output = "";
               result.rows.forEach(product => {
                   output += `${product.prod_id},${product.prod_name},${product.prod_desc},${product.prod_price}\r\n`;
               });
               res.header("Content-Type", "text/csv");
               res.attachment("export.csv");
               return res.send(output);
           };
       });
   });
