const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findById('5cb0acaf1e513c392675b1f1')
        .then(user=>{
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err=>console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://Marina:nefkod-9sefQa-kusrap@clusternode-ssn1c.mongodb.net/shop?retryWrites=true')
    .then(result=> {
    app.listen(3000);
})
    .catch(err=>{
        console.log(err);
    });

