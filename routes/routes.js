import mysql from 'mysql';
import express from 'express';
import fs from 'fs';
import sql from 'mysql';
import formidable from "formidable"
//import v4 from "uuid";
//import uuidv4 from "uuid";
import s3Client from "@aws-sdk/client-s3";
import AWS from "aws-sdk";



//import data from '../';
//code legacy from tutorial https://www.asapdevelopers.com/build-a-react-native-login-app-with-node-js-backend/
//import { signup, login, isAuth } from '../controllers/auth.js';


//configure the mysql connection object (delete password before upload)
    var con = mysql.createConnection({
        host: '18.205.69.32',
        user: 'admin',
        password: '',
        database: "foodys",
        port: 3306
    });


    const router = express.Router();





    router.get('/imgaeBase64Test/', async function(req,res){
        const pic = res.parse.pic;
        const id = res.parse.restaurantID;
        await con.query( 
            "update restaurant set restaurantPicLink = '"+pic+"' where idRestaurant = "+restaurantID+";" , function (err, rows, fields)
        {
            if (err) console.log(err);
            else
            {
                console.log('query statement ran successfully');
                let data = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(data);
            }
        });
    })


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

    // router.post('/s3Test/:orderID?/', async function (req, res) {
    //     var bucketName = 'sefoodysapp'
    //     console.log(req.body.username);
    //     var input = req.body.username
    //     let paramsS3 = {
    //         Bucket: bucketName,
    //         Key: req.params.orderID,
    //         Body: req.body

    //     }
    //     S3.upload(paramsS3, function(err, data) {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log(`File uploaded successfully. ${data.Location}`);
    //         res.json('File uploaded successfully');
    //     });
    // })
    // //legacy from an alternative method that utilizies connecting to the database through aws 
    //     // var RDS_HOSTNAME = '18.205.69.32';
    //     // var RDS_USERNAME= 'admin';
    //     // var RDS_PASSWORD= 'M100101s';
    //     // var RDS_PORT= 3306;

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



//Connection test for application
router.get('/response/', async function (req, res) {
    // .connect creates a connection using the previously defined connection object 
    // and runs a function to catch errors an print err stack to console or output successful connection
    await con.connect(function(err){
        if (err){console.error('Database connection failed: ' + err.stack);
            res.json('database connection failed');
            throw err;
        }
        console.log('Connected to database.');
    });
    res.json('database connection success');
})


// Home page
router.get('/', function(req,res){
    res.json('home');
})




/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Testing routes do it work doe??
    populateOrders
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

// router.get('/populateAll/', async function (req, res) {
//     // .connect creates a connection using the previously defined connection object 
//     // and runs a function to catch errors an print err stack to console or output successful connection
//     const dataSql = fs.readFileSync(pop).toString();
//     await con.query( dataSql , function (err, rows, fields)
//     {
//         if (err) console.log(err);
//         else
//         {
//             console.log('query statement ran successfully');
//             let data = Object.values(JSON.parse(JSON.stringify(rows)));
//             res.json(data);
//         }
//     });
//     await con.connect(function(err){
//         if (err){console.error('Database connection failed: ' + err.stack);
//             res.send('database connection failed');
//             throw err;
//         }
//         console.log('Connected to database.');
//     });
//     res.send('database connection success');
// })
// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................




/* all application calls

general:
    /getOrder/:orderID?/
    /getOrderAsJson/:orderID?/
    /getDriver/:driverID?/
    /getRestaurant/:RestaurantID?/
    /getAllNearOrders/:X?/:Y?/:range?/
    /getAllActiveOrders/
    /getAllUsers/
    /getAllDrivers/

Driver:
    driverExistsByEmail/:email?/
    driverExistsByPhone/:phone?/
    loginDriverByEmail/:email?/:passwd?/
    loginDriverByPhone/:phone?/:passwd?/
    getDriverByEmail/:email?/
    getDriverByPhone/:phone?/
    createDriverByEmail/:email?/:passwd?/
    createDriverByPhone/:phone?/:passwd?/

    /assignOrder/:orderID?/:driverID?/
    /getDriverAssignedOrders/:DriverID?/
    /calculatePayroll/:DriverID?/
    /getDriverStatistics/
    /getDHistory/:id?/

    /updateDriverCordinates/:orderID?/:driverID?/

Restaurant:
    getRestaurantsByCoordinate
    getRHistory
    getRMenu

customer:

    userExistsByEmail/:email?/
    userExistsByPhone/:phone?/
    loginUserByEmail/:email?/:passwd?/
    loginUserByPhone/:phone?/:passwd?/
    getUserByEmail/:email?/
    getUserByPhone/:phone?/
    createUserByEmail/:email?/:passwd?/
    createUserByPhone/:phone?/:passwd?/
    createOrder/:order?/:userID?/:restaurantID?/
    updateUserName/:id?/:name?/
    updateUserPassword/:id?/:password?/:oldPassword?/
    updateUserEmail/:id?/:email?/:password?
    updateUserPhone/:id?/:phone?/


    */

/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    General routes We Got the GOODIES
    /getOrder/:orderID?/
    /getOrderAsJson/:orderID?/
    /getDriver/:driverID?/
    /getRestaurant/:RestaurantID?/
    /getAllNearOrders/:X?/:Y?/:range?/
    /getAllActiveOrders/
    /getAllUsers/
    /getAllDrivers/
    /getAllRestaurants/
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
//  getOrder
//  input order ID
//  returns order information in json format
router.get('/getOrder/:orderID?/', async function(req,res){
    const index = req.params.orderID;
    await con.query( "SELECT * FROM Orders where idOrders ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})

//  getOrderAsJson/:orderID?/
//  input order ID
//  returns order items information in json format
router.get('/getOrderAsJson/:orderID?/', async function(req,res){
    const index = req.params.orderID;
    await con.query( "SELECT Orders.order FROM Orders where idOrders ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {

            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            data = (JSON.parse(JSON.stringify(rows)));
            data = (data)[0];
            var itemsArray = (JSON.parse(data.order));
            var items = itemsArray[0].items;
            res.json(items);
        }
    });
})



//  getDriver
//  input driver ID
//  returns driver information in json format
router.get('/getDriver/:driverID?/', async function(req,res){
    const index = req.params.driverID;
    await con.query( "SELECT * FROM Restaurant where idDriver ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getRestaurant
//  input Restaurant ID
//  returns Restaurant information in json format
router.get('/getRestaurant/:RestaurantID?/', async function(req,res){
    const index = req.params.RestaurantID;
    await con.query( "SELECT * FROM restaurant where idRestaurant = "+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})


//  getAllNearOrders
//  
//  returns order information in json format
router.get('/getAllNearOrders/:X?/:Y?/:range?/', async function(req,res){
    const x = (req.params.X);
    const y = (req.params.Y);
    const rangeInMiles = req.params.range;
    const rangeInDecimalNotation = (rangeInMiles*10.0);
    await con.query( "SELECT * FROM Orders where Orders.status = 'active' and SQRT((((xCor - "+ x +")/10.0)^2) + (((yCor - "+ y +")/10.0)^2)) <= ("+rangeInDecimalNotation+");" , function (err, rows, fields)
    {
        if (err){ 
            res.json("error in sql query: "+ err +"");
            console.log(err);
        }
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//getAllActiveOrders
//
//
router.get('/getAllActiveOrders/', async function(req,res){
    const index = req.params.orderID;
    await con.query( "SELECT * FROM Orders where Orders.status = 'active';" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})

router.get('/getAllOrders/', async function(req,res){
    const index = req.params.orderID;
    await con.query( "SELECT * FROM Orders;" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getAllUsers
//  
//  returns user information in json format
router.get('/getAllUsers/', async function(req,res){
    const index = req.params.driverID;
    await con.query( "SELECT * FROM user;" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getAllDrivers
//  
//  returns order information in json format
router.get('/getAllDrivers/', async function(req,res){
    const index = req.params.driverID;
    await con.query( "SELECT * FROM Driver;" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getAllRestaurants
// 
//  returns Restaurant information in json format
router.get('/getAllRestaurants/', async function(req,res){
    const index = req.params.RestaurantID;
    await con.query( "SELECT * FROM restaurant;" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................





/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    driver routes vroom vroom
    
    to do get open orders command
    
    
    
    
    driverExistsByEmail/:email?/
    driverExistsByPhone/:phone?/
    loginDriverByEmail/:email?/:passwd?/
    loginDriverByPhone/:phone?/:passwd?/
    getDriverByEmail/:email?/
    getDriverByPhone/:phone?/
    createDriverByEmail/:email?/:passwd?/
    createDriverByPhone/:phone?/:passwd?/

    /assignOrder/:orderID?/:driverID?/
    /getDriverAssignedOrders/:DriverID?/
    /calculatePayroll/:DriverID?/
    /getDriverStatistics/
    /getDHistory/:id?/

    /updateDriverCordinates/:orderID?/:driverID?/
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//driverExistsByEmail
//input the email in question
//return matching username if exists return empty array if not
router.get('/driverExistsByEmail/:email?/', async function(req,res){
    var email = req.params.email;
    await con.query( 
        "SELECT user_name FROM Driver where email = '"+ email +"';" , function (err, rows, fields)
    {
        
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//driverExistsByPhone
//input the Phone number in question
//return matching username if exists return empty array if not
router.get('/driverExistsByPhone/:phone?/', async function(req,res){
    var phone = req.params.phone;
    var data = "";
    await con.query( 
        "SELECT user_name FROM Driver where phone = '"+ phone +"';" , function (err, rows, fields)
    {
        
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//loginDriverByEmail
//input the Driver email and password
//return matching Driver if exists or returns empty array if not
router.get('/loginDriverByEmail/:email?/:passwd?/', async function(req,res){
    var id = req.params.email;
    var ps = req.params.passwd;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "SELECT * FROM Driver where email = '"+id+"' and passwd = '"+ps+"';" , function (err, rows, fields)
    {

        if(err){
            console.log(err);
        }
        else{
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            console.log(data);
            if (data.length > 0)
                    res.json(data);
                else
                    res.json("Invalid User Name or Password")
        }
    });
})
//loginDriverByPhone
//input the Driver phone and password
//return matching Driver if exists or returns empty array if not
router.get('/loginUserByPhone/:phone?/:passwd?/', async function(req,res){
    var id = req.params.phone;
    var ps = req.params.passwd;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "SELECT * FROM Driver where phone = '"+id+"' and passwd = '"+ps+"';" , function (err, rows, fields)
    {
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        if (err){
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            if (data.length > 0)
                res.json(data);
            else
                res.json("Invalid User Name or Password")
        }
    });
})
//getDriverByEmail
//input the Driver email
//return matching Driver id
router.get('/getDriverByEmail/:email?/', async function(req,res){
    var index = req.params.email;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "SELECT idDriver FROM Driver where email = '"+index+"';" , function (err, rows, fields)
    {
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        if (data.length > 0)
                res.json(data);
            else
                res.json("Invalid User Name or Password")
    });
})
//getDriverByPhone
//input the Driver phone
//return matching Driver id
router.get('/getDriverByPhone/:phone?/', async function(req,res){
    var index = req.params.phone;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "SELECT id FROM Driver where phone = '"+index+"';" , function (err, rows, fields)
    {
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        if (data.length > 0)
                res.json(data);
            else
                res.json("Invalid User Name or Password")
    });
})
//createDriverByEmail
//input the Driver email and password
//return success
router.get('/createDriverByEmail/:email?/:passwd?/', async function(req,res){
    var e = req.params.email;
    var ps = req.params.passwd;
    var d = "default";

    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "insert into Driver (user_name, email, passwd) values( '"+d+"' , '"+e +"' , '"+ps +"');" , function (err, rows, fields)
    {
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})
//createDriverByPhone
//input the Driver phone number and password
//return success
router.get('/createDriverByPhone/:phone?/:passwd?/', async function(req,res){
    var p = req.params.phone;
    var ps = req.params.passwd;
    var d = "default";
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "insert into Driver (user_name, phone, password) values( '"+d+"' , '"+p +"' , '"+ps +"');" , function (err, rows, fields)
    {
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})

///assignOrder/:orderID?/:driverID?/
// input orderID and driverID
//returns success or failure
router.get('/assignOrder/:orderID?/:driverID?/', async function(req,res){
    var id = req.params.orderID;
    var driver = req.params.driverID;

    var data = "";
    await con.query( 
        "update Orders set status = 'assigned', driverID = "+driver+" where id = "+ id+";" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})

///assignOrder/:orderID?/:driverID?/
// input orderID and driverID
//returns success or failure
router.get('/assignOrder/:orderID?/:driverID?/', async function(req,res){
    var id = req.params.orderID;
    var driver = req.params.driverID;

    var data = "";
    await con.query( 
        "update Orders set status = 'assigned', driverID = "+driver+" where id = "+ id+";" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})


//calculate payroll
// input driver id
//calculates the payroll information
router.get('/calcDriverPay/:driverID?/', async function(req, res){
    var driver = req.params.driverID;
    var data = "";
    await con.query( 
        "select * from Orders where driver = "+driver+" and status = 'complete-not calculated';" , async function (err, rows, fields)
    {
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            data = (JSON.parse(JSON.stringify(rows)));
            
            console.log(data); // log data
            var amount = 0;
            var tax = 0;
            var start = 0;
            var end = 0;
            //iterate through each order the user has complete and calculate pay attributes
            for (let i = 0; i < data.length; i++) {
                console.log(data[i])
                amount += data[i].payment;
                var dateTime = data[i].date;
                let dateTimeParts= dateTime.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
                dateTimeParts[1]--; // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one

                var dateObject = new Date(...dateTimeParts); // our Date object
                console.log(dateTime);
                if(start==0){
                    start = dateTime;
                }
                if(end==0){
                    end = dateTime;
                }
                if(dateTime<start){
                    start = dateTime;
                }
                if(dateTime>end){
                    end = dateTime;
                }
                //var cost = (items[i].cost)
                //payment += cost;
            }  
            console.log(amount)
            tax = (amount * .15).toPrecision(7);

            // execute the payroll query 
            await con.query( 
                " INSERT INTO payroll (employee_driver, amount, taxes, week_start, week_end) VALUES("+driver+","+amount+","+tax+",'"+start+"','"+end+"');" , async function (err, rows, fields)
            {
                if (err) {
                    console.log(err);
                    res.json("error in sql query: "+ err );
                }
                else
                {
                    await con.query( 
                        " update Orders set status = 'complete-calculated' where Orders.driver = "+driver+" and status = 'complete-not calculated';" , function (err, rows, fields)
                    {
                        if (err) {
                            console.log(err);
                            res.json("error in sql query: "+ err );
                        }
                        else
                        {
                            res.json("success");
                        }
                    });
                }
            });
        }
    });

})




///updateDriverCordinates/:orderID?/:driverID?/
// input orderID, driverID, x coordinate, and y coordinate
//returns success or failure
router.get('/updateDriverCordinates/:orderID?/:driverID?/:cCor?/:yCor?/', async function(req,res){
    var id = req.params.orderID;
    var driver = req.params.driverID;
    var x = req.params.xCor;
    var y = req.params.yCor;
    var data = "";
    await con.query( 
        "update Orders set xCor = "+x+", yCor = "+y+" where id = "+ id+" and driver = "+driver+";" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})



//  getDHistory
//  input driver id 
//  returns all orders driver has completed
router.get('/getDHistory/:id?/', async function(req,res){
    const id = req.params.id;
    
    await con.query( 
        "SELECT * FROM Orders where driver = "+id+" and (Orders.status = 'complete-not calculated' or Orders.status = 'complete-not calculated');" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
    res.json(data);
})
//  getPic
//  input driver id 
//  returns all orders driver has completed
/*router.get('/getDHistory/:id?/', async function(req,res){
    const id = req.params.id;
    
    await con.query( 
        "SELECT * FROM pastOrders where driver_id = "+id+";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
    res.json(data);
})
*/

//in progress
router.get('/deliveredOrderImage/:orderID?/', async function(req,res){
    const id = req.params.id;
    

// put the image into the order information
    await con.query( 
        "UPDATE Orders set image = "+ res.body() +" where idOrders = "+id+";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            res('query statement ran successfully');
        }
    });

})






// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................











/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    restaurant routes YUmmmmm
    getRestaurantsByCoordinate/:X?/:Y?/:range?/
    updateRestaurantsPic/:pic?/:restaurantID?/
    getRHistory/:id?/
    getRMenu/:id?/
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
//  getRestaurantsByCoordinate
//  input x coordinate then y coordinate in decimal degree notation then range in miles
//  returns restaurant information in json format
router.get('/getRestaurantsByCoordinate/:X?/:Y?/:range?/', async function(req,res){
    const x = req.params.X;
    const y = req.params.Y;
    const rangeInMiles = req.params.range;
    //miles to decimal notation is 1/60 convsersion 
    const rangeInDecimalNotation = (rangeInMiles/64.0);
    await con.query( 
        "SELECT * FROM restaurant where SQRT((xCor - "+ x +")^2 + (yCor - "+ y +")^2) <= ("+rangeInDecimalNotation+");" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})

//  updateRestaurantsPic
//  takes in new http link to re
//  returns restaurant information in json format
router.get('/updateRestaurantsPic/:pic?/:restaurantID?/', async function(req,res){
    const pic = res.parse.pic;
    const id = res.parse.restaurantID;
    await con.query( 
        "update restaurant set restaurantPicLink = '"+pic+"' where idRestaurant = "+restaurantID+";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getRCurrentOrders
//  input restaurant id 
//  returns all orders restaurant currently has
//  primary keys for testing objects in database
//  4 5 6 restaurant id correlate to starbucks taco cabana and taco bell
//  1 2 3 menu id correlate to starbucks taco cabana and taco bell
router.get('/getRCurrentOrders/:id?/', async function(req,res){
    const id = req.params.id;
    
    await con.query( 
        "SELECT * FROM Orders where restaurant = "+id+";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getRHistory
//  input restaurant id 
//  returns all orders restaurant has completed
//  primary keys for testing objects in database
//  4 5 6 restaurant id correlate to starbucks taco cabana and taco bell
//  1 2 3 menu id correlate to starbucks taco cabana and taco bell
router.get('/getRHistory/:id?/', async function(req,res){
    const id = req.params.id;
    
    await con.query( 
        "SELECT * FROM pastOrders where restaurant = "+id+";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getRMenu
//  inputs the restraunt id value 
//  returns restaurant menu in JSON format
router.get('/getRMenu/:id?/', async function(req,res){
    const id = req.params.id;
    var data = "";
    await con.query( 
        "SELECT menu FROM menu where restaurant = "+id+";" , function (err, rows, fields)
    {
        
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully', JSON.stringify(rows[0].menu).replaceAll("\\\"", "\"").slice(2, -2));
            let data = Object.values(JSON.parse(JSON.stringify(rows[0].menu).replaceAll("\\\"", "\"").slice(2, -2)));
            res.json(data);
        }
    });
})
// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................






/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Customer route hangry

    *user block*

    userExistsByEmail/:email?/
    userExistsByPhone/:phone?/
    loginUserByEmail/:email?/:passwd?/
    loginUserByPhone/:phone?/:passwd?/
    getUserByEmail/:email?/
    getUserByPhone/:phone?/
    createUserByEmail/:email?/:passwd?/
    createUserByPhone/:phone?/:passwd?/
    createOrder/:order?/:userID?/:restaurantID?/
    updateUserName/:id?/:name?/
    updateUserPassword/:id?/:password?/:oldPassword?/
    updateUserEmail/:id?/:email?/:password?
    updateUserPhone/:id?/:phone?/

    *update block*
    updateUserName
    updateUserPassword
    updateUserEmail
    updateUserNumber

    //order commands//
    createOrder/:order?/:userID?/:restaurantID?/
    updateOrderStatus/:id?/:status?/
    getCAllOrders/:id?/
    getCAllActiveOrders/:id?/
    getCAllPastOrders/:id?/
    getCPastOrder/:id?/:orderID?/
    completeOrder


    //address commands//
    getAllAddresses/
    createUserAddress/:xCor?/:yCor?/:addressName?/:userID?/
    setPrimaryAddress/:userId?/:addressID?/
    getPrimaryAddress/

//////////////
    

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/



//user commands//
/*
/userExistsByEmail/:email?/
/userExistsByPhone/:phone?/
/loginUserByEmail/:email?/:passwd?/
/loginUserByPhone/:email?/:passwd?/
/getUserByEmail/:email?/
/getUserByPhone/:phone?/
/createUserByEmail/:email?/:passwd?/
/createUserByPhone/:phone?/:passwd?/
*/
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////




//userExistsByEmail
//input the email in question
//return matching username if exists return empty array if not
router.get('/userExistsByEmail/:email?/', async function(req,res){
    var email = req.params.email;
    await con.query( 
        "SELECT username FROM user where email = '"+ email +"';" , function (err, rows, fields)
    {
        
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//userExistsByPhone
//input the phone number in question
//return matching username if exists return empty array if not
router.get('/userExistsByPhone/:phone?/', async function(req,res){
    var phone = req.params.phone;
    var data = "";
    await con.query( 
        "SELECT username FROM user where phone_number = '"+ phone +"';" , function (err, rows, fields)
    {
        
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//loginUserByEmail
//input the user email and password
//return matching user if exists or returns empty array if not
router.get('/loginUserByEmail/:email?/:passwd?/', async function(req,res){
    var id = req.params.email;
    var ps = req.params.passwd;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "SELECT * FROM user where email = '"+id+"' and password = '"+ps+"';" , function (err, rows, fields)
    {
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        console.log(data);
        if (data.length > 0)
                res.json(data);
            else
                res.json("Invalid User Name or Password")
    });
})
//loginUserByPhone
//input the user phone and password
//return matching user if exists or returns empty array if not
router.get('/loginUserByPhone/:phone?/:passwd?/', async function(req,res){
    var id = req.params.phone;
    var ps = req.params.passwd;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "SELECT * FROM user where phone_number = '"+id+"' and password = '"+ps+"';" , function (err, rows, fields)
    {
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        if (err){
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            if (data.length > 0)
                res.json(data);
            else
                res.json("Invalid User Name or Password")
        }
    });
})
//getUserByID
//input the user id in question
//return matching user if exists return empty array if not
router.get('/getUserByID/:id?/', async function(req,res){
    var index = req.params.id;
    await con.query( 
        "SELECT * FROM user where id = '"+ index +"';" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json('query failed'+err)
        }
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//getUserByEmail
//input the user email
//return matching user id
router.get('/getUserByEmail/:email?/', async function(req,res){
    var index = req.params.email;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "SELECT id FROM user where email = '"+index+"';" , function (err, rows, fields)
    {
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        if (data.length > 0)
                res.json(data);
            else
                res.json("Invalid User Name or Password")
    });
})
//getUserByPhone
//input the user phone
//return matching user id
router.get('/getUserByPhone/:phone?/', async function(req,res){
    var index = req.params.phone;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "SELECT id FROM user where phone_number = '"+index+"';" , function (err, rows, fields)
    {
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        if (data.length > 0)
                res.json(data);
            else
                res.json("Invalid User Name or Password")
    });
})
//createUser
//input the user email and password
//return success
router.get('/createUserByEmail/:email?/:passwd?/', async function(req,res){
    var e = req.params.email;
    var ps = req.params.passwd;
    var d = "default";

    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "insert into user (username, email, password) values( '"+d+"' , '"+e +"' , '"+ps +"');" , function (err, rows, fields)
    {
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})
//createUserByPhone
//input the user email and password
//return success
router.get('/createUserByPhone/:phone?/:passwd?/', async function(req,res){
    var p = req.params.phone;
    var ps = req.params.passwd;
    var d = "default";
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "insert into user (username, phone_number, password) values( '"+d+"' , '"+p +"' , '"+ps +"');" , function (err, rows, fields)
    {
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})

//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//end user//



//order commands//
/*
createOrder/:order?/:userID?/:restaurantID?/
updateOrderStatus/:id?/:status?/
getCAllOrders/:id?/
getCAllActiveOrders/:id?/
getCAllPastOrders/:id?/
getCPastOrder/:id?/:orderID?/
completeOrder
*/
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////


//createOrder
//input the order string, user id, and restraunt id 
//returns success or nothing
router.get('/createOrder/:order?/:userID?/:restaurantID?/:address?/', async function(req,res){
    var o = req.params.order;
    var u = req.params.userID;
    var r = req.params.restaurantID;
    var a = req.params.address;
    //var id = id.replace("%20", " "); 
    var data = "";
    //create the order
    await con.query( 
        "insert into Orders ( restaurant, customer, Orders.order, deliveryAddress, status) values(  "+r +" , "+ u+", '"+o+"',"+a+", 'active');" , async function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {

            console.log('query statement ran successfully');
            res.json("success");
        }
    });
//set the order coordinate to the restaurant
    await con.query( 
        "update Orders set Orders.xCor= (select restaurant.xCor from foodys.restaurant where restaurant.idRestaurant = Orders.restaurant ), Orders.yCor = (select restaurant.xCor from foodys.restaurant where restaurant.idRestaurant = Orders.restaurant) where (Orders.idOrders and Orders.customer ="+u+" and status='active');" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in updating order coordinates sql query: "+ err +"");
        }
        else
        {
            console.log('query statement for updating initial order coordinate ran successfully');
            }
    });
})


// updateOrderStatus
//input user id new status
//return success on completion
router.get('/updateOrderStatus/:id?/:status?/', async function(req,res){
    var id = req.params.id;
    var stat = req.params.status;

    var data = "";
    await con.query( 
        "update Orders set status = '"+stat+"' where id = "+ id+";" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})



//  getCAllCurrentOrders
//  input user id 
//  returns active orders customer has
router.get('/getCAllCurrentOrders/:id?/', async function(req,res){
    const id = req.params.id;
    
    await con.query( 
        "SELECT * FROM Orders where customer = "+id+" and (status = 'active' or status = 'assigned');" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getCAllCompletedOrders
//  input user id 
//  returns complted orders customer has
router.get('/getCAllCompletedOrders/:id?/', async function(req,res){
    const id = req.params.id;
    
    await con.query( 
        "SELECT * FROM Orders where customer = "+id+" and (status != 'active' or status != 'assigned');" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getCAllPastOrders
//  input user id 
//  returns past orders customer has
router.get('/getCAllPastOrders/:id?/', async function(req,res){
    const id = req.params.id;
    
    await con.query( 
        "SELECT * FROM pastOrders where customer = "+id+";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getCPastOrder
//  input user id and past order id
//  returns the past order
router.get('/getCPastOrder/:id?/:orderID?/', async function(req,res){
    const id = req.params.id;
    const orderID = req.params.orderID;

    await con.query( 
        "SELECT * FROM pastOrders where customer = "+id+" and pastOrders = "+ orderID +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
// updateOrderDriver
//input order id and driver id 
//return success on completion
router.get('/updateOrderDriver/:id?/:driver?/', async function(req,res){
    var id = req.params.id;
    var setDriver = req.params.driver;

    var data = "";
    await con.query( 
        "update Orders set driver = '"+setDriver+"' where idOrders = "+ id+";" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})
// completeOrder
//input order id and payment amount
//return success on completion
router.get('/completeOrder/:id?/', async function(req,res){
    var index = req.params.id;
    var amount = req.params.payment;

    var data = "";
    
    await con.query( "SELECT * FROM Orders where idOrders ="+index +";" , async function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {   
            data = (JSON.parse(JSON.stringify(rows)));
            data = (data)[0];
            console.log(data); // log data
            var itemsArray = (JSON.parse(data.order));
            var items = itemsArray[0].items;
            var payment = 0;
            var itemCount = 0;
            for (let i = 0; i < items.length; i++) {
                var cost = (items[i].cost)
                payment += cost;
            } 
            console.log(payment)
            //update payment amount
            await con.query( 
                "update Orders set status = 'complete-not calculated', payment = "+payment+" where idOrders = "+ index +";" , function (err, rows, fields)
            {
                
                if (err) {
                    console.log(err);
                    res.json("error in getting order from data base: "+err);
                }
                else
                {
                    console.log('query statement ran successfully');

                }
            });
        }
    });
    
//calculate the payment amount from the order information

//recreate order in past order
//     await con.query( 
//         "insert into pastOrders (driver_id, customer_id, restaurant_id, payment) values("+data[0]+","+data[1]+","+data[2]+","+amount+");" , function (err, rows, fields)
//     {
        
//         if (err) {
//             console.log(err);
//             res.json("error in creating the pastOrder object");
//         }
//         else
//         {
//             console.log('query statement ran successfully');
//             res.json("success");
//         }
//     });
})
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//end orders//






//update commands//
/*
/updateUserName/:id?/:name?/
/updateUserPassword/:id?/:password?/:oldPassword?/
/updateUserEmail/:id?/:email?/:password?
/updateUserPhone/:id?/:phone?/
*/
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
// updateUserName
//input user id and new user name
//returns success on complete or error if failed
router.get('/updateUserName/:id?/:name?/', async function(req,res){
    var id = req.params.id;
    var newName = req.params.name;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "update user set username = '"+newName+"' where id = "+ id+" ;" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("query failed"+ err);
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})

// updateUserPassword
//input user id new password and old password 
//return success on completion
router.get('/updateUserPassword/:id?/:password?/:oldPassword?/', async function(req,res){
    var id = req.params.id;
    var newPassword = req.params.password;
    var oldPassword = req.params.oldPassword;

    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "update user set password = '"+newPassword+"' where id = "+ id+" and password = '"+ oldPassword+"';" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})

// updateUserEmail
//input user id new email and password 
//return success on completion
router.get('/updateUserEmail/:id?/:email?/:password?', async function(req,res){
    var id = req.params.id;
    var password = req.params.password;
    var email = req.params.email;

    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "update user set email = '"+email+"' where id = "+ id+" and password = '"+ password+"';" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})

// updateUserNumber
//input user id and new Phone number
//return success on completion
router.get('/updateUserPhone/:id?/:phone?/', async function(req,res){
    var id = req.params.id;
    var newPhone = req.params.phone;
    //var id = id.replace("%20", " "); 
    var data = "";
    await con.query( 
        "update user set phone_number = '"+newPhone+"' where id = "+ id+" ;" , function (err, rows, fields)
    {
        
        if (err) {
            console.log(err);
            res.json("error in sql query: "+ err +"");
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//end customer updates//

//card commands//
/*
getAllCards/:userID?/
createUserCard/:id?/:cardNum?/:expDate?/:secutityCode?/
setPrimaryCard/:UserID?/:CardID?/
getPrimaryCard/:UserID?/
*/
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////

// get All Cards for the user
//input user ID
//return all credit cards in a credit card file
router.get('/getAllCards/:id?/', async function(req,res){
    const index = req.params.id;
    await con.query( "SELECT * FROM creditCard where user ="+index+";" , function (err, rows, fields)
    {
        if (err){
            console.log(err);
            res.json("sql query failed with error: "+err);
        }
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})

// input user ID, cardNum, expDate, and secutityCode
// returns success or error
router.get('/createUserCard/:id?/:cardNum?/:expDate?/:secutityCode?/', async function(req,res){
    var id = req.params.id;
    var cardNum = req.params.cardNum;
    var expDate = req.params.expDate;
    var securityCode = req.params.securityCode;

    var data = "";
    await con.query(
        "insert into creditCard ( user, cardNum, expDate, securityCode, isPrimary) values( "+id +" , "+cardNum +" , '"+expDate +"' , '"+securityCode +"', 0);" , function (err, rows, fields)
    {

        if (err) {
            console.log(err);
            res.json("sql query failed with error: "+err);
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})

// get primary Card for the user
//input user ID
//returns credit card in a credit card file
router.get('/getPrimaryCard/:id?/', async function(req,res){
    const index = req.params.id;
    await con.query( "SELECT * FROM creditCard where user ="+index+" and isPrimary = 1;" , function (err, rows, fields)
    {
        if (err){
            console.log(err);
            res.json("sql query failed with error: "+err);
        }
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
// set primary Card for the user
//input user ID and card Id of the new card primary 
//returns credit card in a credit card file
router.get('/setPrimaryCard/:id?/:cardID?/', async function(req,res){
    //remove primary designation from current primary card
    const index = req.params.id;
    const card = req.params.cardID;
    await con.query( "UPDATE creditCard set isPrimary =0 where user ="+index+" and isPrimary = 1;" , async function (err, rows, fields)
    {
        if (err){
            console.log(err);
            res.json("sql query failed with error: "+err);
        }
        else
        {
            //designate new primary card using the card ID 
            await con.query( "UPDATE creditCard set isPrimary = 1 where id ="+card+" ;" , function (err, rows, fields)
            {
                if (err) {
                    console.log(err);
                    res.json("sql query failed with error: "+err);
                }
                else
                {
                    console.log('query statement ran successfully');
                    res.json("success");
                }
            });

        }
    });
})
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//end card//



//address commands//
/*
getAllAddresses/
createUserAddress/:xCor?/:yCor?/:addressName?/:userID?/
setPrimaryAddress/:userId?/:addressID?/
getPrimaryAddress/
*/
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
// get All Cards for the user
//input user ID
//return all credit cards in a credit card file
router.get('/getAllAddress/:id?/', async function(req,res){
    const index = req.params.id;
    await con.query( "SELECT * FROM Address where userID ="+index+";" , function (err, rows, fields)
    {
        if (err){
            console.log(err);
            res.json("sql query failed with error: "+err);
        }
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//createUserAddress
// input xCor, yCor, addressName, userID
// returns success or error
router.get('/createUserAddress/:xCor?/:yCor?/:addressName?/:userID?/', async function(req,res){
    var x = req.params.xCor;
    var y = req.params.yCor;
    var a = req.params.addressName;
    var id = req.params.userID;

    var data = "";
    await con.query(
        "insert into Address ( xCor, yCor, addressName, userID) values( "+x +" , "+y +" , '"+a +"' , "+id +");" , function (err, rows, fields)
    {

        if (err) {
            console.log(err);
            res.json("sql query failed with error: "+err);
        }
        else
        {
            console.log('query statement ran successfully');
            res.json("success");
        }
    });
})

// get primary Address for the user
//input user ID
//returns Address in a JSON file
router.get('/getPrimaryAddress/:id?/', async function(req,res){
    const index = req.params.id;
    await con.query( "SELECT * FROM Address where userID ="+index+" and isPrimary = 1;" , function (err, rows, fields)
    {
        if (err){
            console.log(err);
            res.json("sql query failed with error: "+err);
        }
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
// set primary Address for the user
//input user ID and address Id of the new address primary 
//returns success or error
router.get('/setPrimaryAddress/:id?/:addressID?/', async function(req,res){
    //remove primary designation from current primary card
    const index = req.params.id;
    const address = req.params.addressID;
    await con.query( "UPDATE Address set isPrimary =0 where userID ="+index+" and isPrimary = 1;" , async function (err, rows, fields)
    {
        if (err){
            console.log(err);
            res.json("sql query failed with error: "+err);
        }
        else
        {
            //designate new primary card using the card ID 
            await con.query( "UPDATE Address set isPrimary = 1 where address_id ="+address+" ;" , function (err, rows, fields)
            {
                if (err) {
                    console.log(err);
                    res.json("sql query failed with error: "+err);
                }
                else
                {
                    console.log('query statement ran successfully');
                    res.json("success");
                }
            });

        }
    });
})


//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//end addresses//



// code snippet to remove %20 from function call
// var str = "Passwords%20do%20not%20match";   
// var replaced = str.replace("%20", " "); 



// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................





// will match any other path not listed in routes
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;
