const mongoose= require("mongoose");

function connectToDatabase(dbUrl){
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
}

module.exports = {
    connectToDatabase,
};