const config = require("../config/config.json");
const mongoose = require('mongoose');
mongoose.connect(config.db , { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.catch(e => console.error);


