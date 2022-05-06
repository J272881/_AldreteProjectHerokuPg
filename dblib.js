const getTotalRecords = () => {
    sql = "SELECT COUNT(*) FROM customer";
    return pool.query(sql)
        .then(result => {
            return {
                msg: "success",
                totRecords: result.rows[0].count
            }
        })
        .catch(err => {
            return {
                msg: `Error: ${err.message}`
            }
        });
};
const insertCustomer = (customer) => {
    // Will accept either a customer array or customer object
    if (customer instanceof Array) {
        params = customer;
    } else {
        params = Object.values(customer);
    };

    const sql = `INSERT INTO customer (cust_id, cust_fname, cust_lname, cust_state, cust_sales_ytd, cust_prev_sales)
                 VALUES ($1, $2, $3, $4, $5, %6)`;

    return pool.query(sql, params)
        .then(res => {
            return {
                trans: "success", 
                msg: `Customer id ${params[0]} successfully inserted`
            };
        })
        .catch(err => {
            return {
                trans: "fail", 
                msg: `Error on insert of customer id ${params[0]}.  ${err.message}`
            };
        });
};

const findCustomers = (customer) => {
    // Will build query based on data provided from the form
    //  Use parameters to avoid sql injection

    // Declare variables
    var i = 1;
    params = [];
    sql = "SELECT * FROM customer WHERE true";

    // Check data provided and build query as necessary
    if (customer.cust_id !== "") {
        params.push(parseInt(customer.cust_id));
        sql += ` AND cust_id = $${i}`;
        i++;
    };
    if (customer.cust_fname !== "") {
        params.push(`${customer.cust_fname}%`);
        sql += ` AND UPPER(cust_fname) LIKE UPPER($${i})`;
        i++;
    };
    if (customer.cust_lname !== "") {
        params.push(`${customer.cust_lname}%`);
        sql += ` AND UPPER(cust_lname) LIKE UPPER($${i})`;
        i++;
    };
    if (customer.cust_state !== "") {
        params.push(`${customer.cust_state}%`);
        sql += ` AND UPPER(cust_state) LIKE UPPER($${i})`;
        i++;
    };
    if (customer.cust_sales_ytd !== "") {
        params.push(parseFloat(customer.cust_sales_ytd));
        sql += ` AND cust_sales_ytd >= $${i}`;
        i++;
    };
    if (customer.cust_prev_sales !== "") {
        params.push(parseFloat(customer.cust_prev_sales));
        sql += ` AND cust_prev_sales >= $${i}`;
        i++;
    };

    sql += ` ORDER BY cust_id`;
    // for debugging
     console.log("sql: " + sql);
     console.log("params: " + params);

    return pool.query(sql, params)
        .then(result => {
            return { 
                trans: "success",
                result: result.rows
            }
        })
        .catch(err => {
            return {
                trans: "Error",
                result: `Error: ${err.message}`
            }
        });
};

// Add towards the bottom of the page
module.exports.findCustomers = findCustomers;

module.exports.getTotalRecords = getTotalRecords;
// Add this at the bottom
module.exports.insertCustomer = insertCustomer;