const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const https = require("https");
const moment = require("moment");
const up_file = require("express-fileupload")




const app = express();
const DBService = require("./DB");
var path = require("path");
const { log } = require("console");


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(up_file());


app.get("/",function(req,res){
    res.sendFile(path.join(__dirname + "/public/signIn.html"));
});

app.get("/index",function(req,res){
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/main",function(req,res){
    res.sendFile(path.join(__dirname + "/public/main.html"));
});


app.post("/login",function(req,res){
    var user = req.body.user;
    var psw = req.body.psw;
    // cannot log in without entering both username & psw
    if (user && psw){
        const db = DBService.getDbServiceInstance();
        const result = db.searchAdmin(user,psw);
        result.then( data =>{
            if(data.length > 0){
                console.log("login sucessed");
                res.redirect('/index');
            }
            else{
            console.log("login failed");
            // retry
            res.redirect('/');
            }
        }).catch(error => console.log(error));
    }
    else{
        res.redirect('/');
    }
})


app.post("/createSession",function(req,res){
    var id = req.body.sessionID;
    var instructor = req.body.instructor;
    var link = req.body.sessionLink;
    var type = req.body.sessionType;
    var year = req.body.year;
    var month = req.body.month;
    var day = req.body.day;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;

    if (id && instructor && link && type && year && month && day && startTime && endTime){
        const db = DBService.getDbServiceInstance();
        db.createSession(id,instructor,link,type,year,month,day,startTime,endTime);
        res.redirect('/main');
    }
})

app.post("/createProfile",function(req,res){
    var patientNum = req.body.patientNum;
    var salutation = req.body.salutation;
    var firstName = req.body.Fname;
    var LastName = req.body.Lname;
    var Mname = req.body.Mname;
    var Pphone = req.body.Pphone;
    var Cphone = req.body.Cphone;
    var email = req.body.Email;
    var tStatus = req.body.tStatus;
    var tcause = req.body.Tcause;
    var birthday = req.body.birthday; 
    var Gender = req.body.gender;
    var age = req.body.age;
    var verteran = req.body.verteran;
    var assignedDoc = req.body.assignedDoc;
    var Disability = req.body.Disability;
    var group = req.body.group;
    var MedicalHis = req.body.MedicalHis;
    var Ptype = req.body.Ptype;
    var PaidAmount = req.body.PaidAmount;
    var sDate = req.body.sDate;
    var eDate = req.body.eDate;
    var st = req.body.st;
    var city = req.body.city;
    var postalCode = req.body.postalCode;
    var country = req.body.Country;
    var Province = req.body.Province;
    var ContactName = req.body.CName;
    var PhoneNum = req.body.Pnumber;
    var start_date = moment(sDate, 'YYYY-MM-DD HH:mm:ss');
    var end_date = moment(eDate, 'YYYY-MM-DD HH:mm:ss');
    var duration = moment.duration(end_date.diff(start_date));
    var servingDuration = duration.asDays();  
    var link = req.body.link;
    const db = DBService.getDbServiceInstance();
    db.insertNewPatient(patientNum,salutation, firstName,LastName,Mname,Pphone,Cphone,email,birthday,age,Gender,verteran,assignedDoc,Disability,group,MedicalHis,Ptype,PaidAmount,st,city,postalCode,Province,country,ContactName,PhoneNum,tStatus,tcause,sDate,eDate,link,servingDuration);
    res.redirect('/main'); 

    

});

app.get("/getPatient",function(req,res){
    const db = DBService.getDbServiceInstance();
    const result = db.getPatient();
    result.then(data => res.json({data : data})).catch(error => console.log(error));
});


app.get("/searchPtype/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.searchPatient(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/searchPname/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.searchPatientName(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/searchPId/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.searchPatientId(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/getAllInfo/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.getAllPatientInfo(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

//updating
app.patch("/update", function(req,res){
    const { PatientNum,Fname,Lname,Gender,Birthday,Age,Email,Ptype,assignedDoc,MedicalH,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,extraNote } = req.body;
    const db = DBService.getDbServiceInstance();
    const result = db.updatePatient(Fname,Lname,Gender,Birthday,Age,Email,Ptype,assignedDoc,MedicalH,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,extraNote,PatientNum);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.post("/uploadDoc", function(req,res){
    if(req.files){
        
        var file = req.files.file;
        var file_type = req.body.docSelect;
        var file_name = file.name;
        var jaso_file = JSON.stringify(file)
        // var file_path = './upload/'+ file_name;
        // file.mv(file_path, function(error){
        //     if(error){
        //         res.send(error);
        //     }
        //     else{
        //         res.send("file uploaded");
        //     }
        // });
        console.log(typeof file);
        const db = DBService.getDbServiceInstance();
        db.insertNewDoc(file_name, file_type, jaso_file);
    }
})

app.get("/getAllDoc", function(req,res){
    const db = DBService.getDbServiceInstance();
    const result = db.getAllDoc();
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/getCourse", function(req,res){
    const db = DBService.getDbServiceInstance();
    const result = db.getCourse();
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.get("/courseWaitList/:name", function(req,res){
    const { name } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.getCourseWaitList(name);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})

app.delete("/deleteRow/:patientName/:courseID", function(req,res){
    const { patientName , courseID } = req.params;
    const db = DBService.getDbServiceInstance();
    const result = db.deleteRow(patientName,courseID);
    result.then(data => res.json({data : data})).catch(error => console.log(error));
})


app.listen(5000, function(){
    console.log("Server running on port 5000");
});
