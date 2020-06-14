const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: String,
    description: String,
    homeWorks: [{
        date: Date,
        title: String,
        discription: String,

    }],
    scripts: [{
        title: String,
        link: String,
    }],
});

module.exports = mongoose.model('Course', courseSchema);
