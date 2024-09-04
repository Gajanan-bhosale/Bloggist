const mongoose =require("mongoose");

module.exports =() => {
    const connectionParams ={
        userNewUrlParser :true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.DB);
        console.log("Connected To Dtabase Successfully")
    } catch {
        console.log(error)
        console.log("could not connect to databse")
    }
}