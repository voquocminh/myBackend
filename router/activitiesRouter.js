const express = require("express")
const  router = express.Router()
const {Activities} = require("../models/activities")
const {User} = require("../models/user")

const moment = require("moment")
const { json } = require("express")


//get all activities
router.get('/get', async function(req, res){
    var activities = await Activities.find();
    if (activities){
        res.send(activities);
    }else{
        res.status(500).send("bad server !");
    }
})


//get all activities by userID
// api example: https://my-app-de.herokuapp.com/api/activities/userID/60c5ce6f6b3a9f002255b930
// 60c5ce6f6b3a9f002255b930 là 1 userID
router.get('/userID/:userID', async function(req, res){
    var id = req.params.userID.toString();
    try{
        var activities = await Activities.find({userID: id});
        res.send(activities);
    }catch(err){
        res.send(err)
    }
    console.log(res)
});

//get activity by id
router.get('/id/:id', async function(req, res){
        var activities = await Activities.findById(req.params.id);
    if (activities){
        res.send(activities);
    }else{
        res.status(500).send("bad server !");
    }
    console.log(res)
});

//get all activities by 1 date //yyyy-mm-dd
    router.get('/date/:date', async function(req, res){
        var d = req.params.date;
        var x="T00:00:00.000Z";
        var y="T23:59:59.000Z";
        var d1= d.concat(x);
        var d2= d.concat(y);
        var activities = await Activities.find(
            {date:
                {
                $gte: d1,
                $lt: d2
                }}
        )
        if(activities){
            res.send(activities)
        }else{
            res.status(500).send("bad server")
        }
    })

//get activitities by 1 user 1 date 
// api example: https://my-app-de.herokuapp.com/api/activities/userID/60c5ce6f6b3a9f002255b930/date/2021-06-23
// 60c5ce6f6b3a9f002255b930 là 1 userID 
// 2021-06-02 là ngày muốn lọc ra ( định dạng yyyy-mm-dd)
    router.get('/userID/:userID/date/:date', async function(req, res){
        var userID= req.params.userID;
        var d = req.params.date;
        var x="T00:00:00.000Z";
        var y="T23:59:59.000Z";
        var d1= d.concat(x);
        var d2= d.concat(y);
        console.log(req.params)
        console.log(d1,d2)
        var activities = await Activities.find({
            userID:userID,
            date:{
                $gte:d1,
                $lt:d2
            }
        },function(err, activities)
        {
            if(activities){
                res.send(activities)
            }else{
                res.status(500).send(err)
            }
        })        
    })

    

//get activitis by 1 month //yyyy-mm
router.get('/month/:month', async function(req, res){
    var m = req.params.month;
    var x="-01T00:00:00.000Z";
    var y="-31T23:59:59.000Z";
    var m1= m.concat(x);
    var m2= m.concat(y);
    var activities = await Activities.find({date:{
        $gte: m1,
        $lt: m2
    }})
    if(activities){
        res.send(activities)
    }else{
        res.status(500).send("bad server")
    }
})
//get activitis by 1 userID  1 month
// api example: 
router.get('/userID/:userID/month/:month', async function(req, res){
    var m = req.params.month;
    var userID=req.params.userID;
    var x="-01T00:00:00.000Z";
    var y="-31T23:59:59.000Z";
    var m1= m.concat(x);
    var m2= m.concat(y);
    var activities = await Activities.find({
        userID:userID,
        date:{
            $gte:m1,
            $lt:m2
        }
    },function(err, activities)
    {
        if(activities){
            res.send(activities)
        }else{
            res.status(500).send(err)
        }
    })        
})


//get activities a this week 
router.get('/thisweek', async function(req,res){
    var thu= moment().format('dddd') //wednesday
    console.log(thu);

    var day=0;
    switch(thu){
        case "Monday":
            day= 6;
            break;
        case "Tuesday":
            day= 5;
            break;
        case "Wednesday":
            day= 4;
            break;
        case "Thursday":
            day= 3;
            break;
        case "Friday":
            day= 2;
            break;
        case "Saturday":
            day= 1;
            break;
        case "Sunday":
            day= 0;
            break;
        default: day=0;
    }
    console.log(day);

    var d1=moment().subtract((6-day), 'days').format(); 
    var d2=moment().add(day, 'days').format(); 
    console.log(d1)
    console.log(d2)

    var d11= d1.split('T')
    d1=d11[0]+"T00:00:00.000Z";
    var d22= d2.split('T')
    d2=d22[0]+"T23:59:59.000Z";

    console.log(d1)
    console.log(d2)

    var activities = await Activities.find({date:{
        $gte:d1, //yyyy-mm-dd
        $lt:d2 //yyy-mm-dd
    }})
    if(activities){
        res.send(activities)
    }else{
        res.status(500).send("bad server")
    }
})

//get activities this week by 1 userID 
router.get('/userID/:userID/thisweek', async function(req,res){
    var userID=req.params.userID;
    var thu= moment().format('dddd') //thứ (Monday, Tuesday,...)
    console.log(thu);

    var day=0;
    switch(thu){
        case "Monday":
            day= 6;
            break;
        case "Tuesday":
            day= 5;
            break;
        case "Wednesday":
            day= 4;
            break;
        case "Thursday":
            day= 3;
            break;
        case "Friday":
            day= 2;
            break;
        case "Saturday":
            day= 1;
            break;
        case "Sunday":
            day= 0;
            break;
        default: day=0;
    }
    console.log(day);

    var d1=moment().subtract((6-day), 'days').format(); 
    var d2=moment().add(day, 'days').format(); 
    // console.log(d1)
    // console.log(d2)
    var d11= d1.split('T')
    d1=d11[0]+"T00:00:00.000Z";
    var d22= d2.split('T')
    d2=d22[0]+"T23:59:59.000Z";
    // console.log(d1)
    // console.log(d2)
    var activities = await Activities.find({
        userID:userID,
        date:{
            $gte:d1,
            $lt:d2
        }
    },function(err, activities)
    {
        if(activities){
            res.send(activities)
        }else{
            res.status(500).send(err)
        }
    })        
})

//post 1 activity
// api: https://my-app-de.herokuapp.com/api/activities/post
// 
router.post('/post', async function(req, res){
    let activities = Activities(
        {
            userID: req.body.userID,
            distance: req.body.distance,
            time: req.body.time,
            avgPace: req.body.avgPace,
            calories: req.body.calories,
            date: req.body.date,
            routes: req.body.routes,
            marketOnRoute: req.body.marketOnRoute,
            level: req.body.level,
            centerCoordinate: req.body.centerCoordinate,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            latituDetal: req.body.latituDetal,
            longituDetal: req.body.longituDetal
        })
        activities
            .save()
            .then((activities)=>{
                res.send('đã thêm activities thành công!')
                console.log("đã thêm activities !")
            })
            .catch((err)=>{
                res.send(err)
            })
            console.log(req)
})


module.exports = router;