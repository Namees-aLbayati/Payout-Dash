const express=require('express');
const exphbs=require('express-handlebars');
const hbs = exphbs.create({  });
const tttyt="access-sandbox-78d90890-1c21-49ee-82b0-0162095f9174";
var parseString = require('xml2js').parseString;
const routesfile=require('./controllers/fileroutes')
const routespayment=require('./controllers/payment')
const reportRoutes=require('./controllers/reportsRoutes')

const app=express();
const path=require('path')
const PORT=process.env.port||3001;
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routesfile)
app.use(routespayment)
app.use(reportRoutes)

app.get('/reports',async(req,res)=>{
    res.render('reports')
})
    app.listen(PORT,()=>{
        console.log('listening')
    })


