const express  = require("express"); 
const {register , AdminAuth , Fetchdata} = require("../controller/users");
const auth = require("../middleware/auth") ;
const router = express.Router(); 
router.post("/register" , register) ; 
router.post("/Admin-auth" , AdminAuth) ; 
router.get("/fetch_data" , auth , Fetchdata) ; 
module.exports = router ;       