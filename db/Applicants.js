const mongoose = require('mongoose'),
      schema = mongoose.Schema;


    const Schema = new schema({
        name:{type:String, required:true},
        phone:{type:String, required:true},
        email:{type:String},
        lga:{type:String, required:true},
        course:{type:String, required:true}

    });

    module.exports = mongoose.model("applicants", Schema);
