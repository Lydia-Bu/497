//CREATE TABLE `patientsdatabase`.`patient` ( `PatientNum` INT NOT NULL, `Fname` VARCHAR(255) NOT NULL , `Lname` VARCHAR(255) NOT NULL , `Gender` INT NOT NULL , `Birthday` DATE NOT NULL , `Age` INT NOT NULL , `Email` varchar(255) , `Ptype` varchar(255) NOT NULL , `assignedDoc` varchar(255) , `MedicalH` varchar(255) , `PaidAmount` INT , `Street` varchar(255), `city` varchar(255), `PostalCode` varchar(255), `province` varchar(255), `country` varchar(255), `EmergencyContactName` varchar(255), `EmergencyContactNum` varchar(255), `Relationship` varchar(255), PRIMARY KEY (`PatientNum`))
const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: 'localhost' ,
    user: 'root' ,
    password: '' ,
    database: 'createS' ,
    port: '3306'
})


connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    console.log("DB state: ", connection.state);
})

class DBService{
    static getDbServiceInstance(){
        return instance ? instance : new DBService()
    }

    async searchAdmin(user,psw){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT adminID from admin WHERE username = ? and password = ?';
                connection.query(query, [user,psw], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}
    }

    async createSession(id,instructor,link,type,year,month,day,startTime,endTime){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO Session(sessionID,year,month,day,startTime,endTime,instructor,link,sessionType)VALUE(?,?,?,?,?,?,?,?,?)';
                connection.query(query, [id,year,month,day,startTime,endTime,instructor,link,type], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}
    }

    async getPatient(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT patientID,firstName,patientType FROM Patient";
                connection.query(query, (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }
    

    async insertNewPatient(patientNum,salutation,firstName,LastName,Mname,Pphone,Cphone,email,birthday,age,Gender,verteran,assignedDoc,Disability,group,MedicalHis,Ptype,paidAmount,st,city,postalCode,Province,country,emergencyName,emergencyPhoneNum,tStatus,tcause,sDate,eDate,link,servingDuration){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO Patient(patientID,salutation,firstName,lastName,mailingName,homePhone,cellPhone,Email,birthday,age,gender,verteran,assignedDoctor,disability,patientGroup,medicalHistory,patientType,paid,street,city,postalCode,province,country,emergencyName,emergencyPhone,terminationStatus,terminationCause,startDate,endDate,link,duration)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                connection.query(query, [patientNum,salutation,firstName,LastName,Mname,Pphone,Cphone,email,birthday,age,Gender,verteran,assignedDoc,Disability,group,MedicalHis,Ptype,paidAmount,st,city,postalCode,Province,country,emergencyName,emergencyPhoneNum,tStatus,tcause,sDate,eDate,link,servingDuration] ,(error,results) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(results);
                })
            })
        return response;
        }
        catch(error){
            console.log(error);}
    }

    async searchPatient(ptype){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT patientID,firstName,patientType FROM Patient WHERE patientType = ?";
                connection.query(query, [ptype], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async searchPatientName(lName){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT patientID,firstName,patientType FROM Patient WHERE lastName = ?";
                connection.query(query, [lName], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async searchPatientId(Id){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT patientID,firstName,lastName,patientType FROM Patient WHERE patientID = ?";
                connection.query(query, [Id], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async getAllPatientInfo(Id){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Patient WHERE patientID = ?";
                connection.query(query, [Id], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async updatePatient(Fname,Lname,Gender,Age,Email,Ptype,assignedDoc,MedicalH,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,disbility,extraNote,PatientNum){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE patient SET Fname = ?, Lname = ?, Gender = ?, Age = ?, Email = ?, Ptype = ?, assignedDoc = ?, MedicalH = ?, Street = ?, city = ?, PostalCode = ?, province = ?, country = ?, EmergencyContactName = ?, EmergencyContactNum = ?, Salutation = ?, mailingName = ?, homePhone = ?, cellPhone = ?, tStatus = ?, tCause = ?, vstatus = ?, a_group = ?, start_date = ?, end_date = ?, extraNote = ? WHERE PatientNum = ?";
                connection.query(query, [Fname,Lname,Gender,Age,Email,Ptype,assignedDoc,MedicalH,Street,city,PostalCode,province,country,EmergencyContactName,EmergencyContactNum,Salutation,mailingName,homePhone,cellPhone,tStatus,tCause,vstatus,a_group,start_date,end_date,disbility,extraNote,PatientNum], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async insertNewDoc(file_name, file_type, file){
        try{
            var query = "INSERT INTO document (name, type, fileContent) VALUES (?,?,?)";
                connection.query(query, [file_name, file_type, file] ,(error,results) => {
                    console.log(results);
                })
        }catch(error){
            console.log(error);
        }
    }

    async getAllDoc(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM document";
                connection.query(query, (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async getCourse(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT DISTINCT courseName FROM course INNER JOIN waiting ON course.c_id = waiting.course";
                connection.query(query, (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async getCourseWaitList(course){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT DISTINCT * FROM waiting INNER JOIN course ON course.c_id = waiting.course WHERE course.courseName = ?";
                connection.query(query,[course],(error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }

    async deleteRow(patientName, courseName){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM waiting WHERE patient = ? AND course = ?";
                connection.query(query,[patientName, courseName], (error,result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    resolve(result);
                })
            })
            
            return response;
            
        }

        catch(error){
            console.log(error);
        }
    }
    
}

module.exports = DBService;