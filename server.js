require("./DBconfig");
const express=require("express");
/* const UserRoute=require("./routes/userRoute");
const BlogRoute=require("./routes/blogRoute"); */
const app=express();
const UserAutho=require("./routes/autho");
const BlogRoute=require("./routes/blogRoute");
const port=process.env.PORT||7000;
const path=require("path");
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '/images')));
// Route Apis

app.use("/user",UserAutho);
app.use("/blog",BlogRoute);


app.listen(port,()=>{
    console.log(`listinig ${process.env.NODE_ENV} on port : ${port} ....`);
});