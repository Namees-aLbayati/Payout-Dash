const express=require('express');
const exphbs=require('express-handlebars');
const hbs = exphbs.create({  });

const sequelize=require('./config/connection')
const app=express();
const path=require('path')
const PORT=process.env.port||3001;
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{
    res.render('home')
})
sequelize.sync({force:true}).then(()=>{
    app.listen(PORT,()=>{
        console.log('listening')
    })

})
