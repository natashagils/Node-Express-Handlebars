const express = require( 'express' );
const PORT = process.env.PORT || 8080;
const app  = express();
const orm = require( './orm' );
app.use( express.static('public') );
app.use( express.urlencoded({ extended: false }) );

app.post('/api/burger', async function (req, res){
    console.log( `[POST api/thumbnails] recieved: `, req.body );
    await orm.postBurger( req.body );
    res.send( { message: `Burger ${req.body.burger_name} added` } );
})

app.get('/api/burger', async function (req, res){
    const myBurgerList = await orm.listBurgers();
    res.send( myBurgerList );
})

app.put( '/api/burgerUpdate/:id', async function( req, res ){
    // console.log( `[update api/thumbnails] recieved: `, req.params.id );
    await orm.updateBurger( req.params.id);
    console.log(req.params.id);
    res.send( { message: `Thank you, saved ${req.params.id}` } );
} );

app.get('/api/devouredBurger', async function (req, res){
    const myDevouredBurgerList = await orm.listDevouredBurgers();
    res.send( myDevouredBurgerList );
})

app.listen( PORT, function(){
    console.log( `[burgerLogger] RUNNING, http://localhost:${PORT}` );
});
