
const usersR=require("./users");
const storyR=require("./stories");
const cookieR=require("./cookies");
const uploadR=require("./upload");



exports.routsInit=(app)=>{
    app.use("/users", usersR);
    app.use("/stories", storyR);
    app.use("/cookies", cookieR);
    app.use("/upload", uploadR);

}


