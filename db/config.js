const mongoose = require('mongoose');
 mongoose.set("strictQuery", false);

// mongoose.connect('mongodb://localhost:27017/e-commerce'
// )
mongoose.connect('mongodb://127.0.0.1:27017/travel'
)


console.log("hii")

// mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("DB connected")
// })