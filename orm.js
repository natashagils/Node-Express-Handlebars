const mysql = require('mysql');

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
        }
        query( sql, args=[] ) {
            return new Promise( ( resolve, reject ) => {
                this.connection.query( sql, args, ( err, rows ) => {
                    if ( err )
                        return reject( err );
                    resolve( rows );
                } );
            } );
        }
        close() {
            return new Promise( ( resolve, reject ) => {
                this.connection.end( err => {
                    if ( err )
                        return reject( err );
                    resolve();
                } );
            } );
        }
    }


    // at top INIT DB connection
// const db = new Database({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "1234",
//     database: "burgerLog"
// });


// at top INIT DB connection
var db;
if(process.env.JAWSDB_URL){
    db = new Database(process.env.JAWSDB_URL);
    console.log('jaws db is connected');
}else{
    db = new Database({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "Panyala78666!", //change 
        database: "burgerLog"
    });
};

async function postBurger(myBurgerPost){

    const myPost = await db.query(`INSERT INTO burger(burger_name,devoured) VALUES(?,?);`, [myBurgerPost.burger_name,myBurgerPost.devoured]);
    console.log(myPost[0]);

}
async function listBurgers(){
    const getMyBurger = await db.query(`SELECT * FROM burger WHERE devoured = 0;;`);
    return getMyBurger;
}
async function updateBurger( myPost ){
    console.log('starting sqlquery', myPost)

    const myUpdatedBurger = await db.query( 
        "UPDATE burger SET devoured = 1 WHERE id = ? ",
        [ myPost ] );
    return myUpdatedBurger;
}
async function listDevouredBurgers(){
    const getMyDevouredBurger = await db.query(`SELECT * FROM burger WHERE devoured = 1;`);
    return getMyDevouredBurger;
}



module.exports = { 
    postBurger,
    listBurgers,
    updateBurger,
    listDevouredBurgers
}
