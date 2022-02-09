const mongoose = require('mongoose')

try {
    mongoose.connect('mongodb://localhost:27017/medication',{
        useUniFiedTopology: true,
        useNewUrlParser: true,
    },()=>{
        console.log('connected to the database')
    })
} catch (error) {
    console.log('unable to connect')
}