import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  addStudentForm: FormGroup;

  firstName: FormControl;
  middleName: FormControl;
  lastName: FormControl;
  aadharNo: FormControl;
  mobileNo: FormControl;
  date_of_birth: FormControl;
  bloodGroup: FormControl;
  gender: FormControl;
  preference: FormControl;
  religion: FormControl;
  caste: FormControl;
  nationality: FormControl;
  fatherFName: FormControl;
  fatherMName: FormControl;
  fatherLName: FormControl;
  motherFName: FormControl;
  motherMName: FormControl;
  motherLName: FormControl;
  guardianFName: FormControl;
  guardianMName: FormControl;
  guardianLName: FormControl;
  fatherMobileNo: FormControl;
  motherMobileNo: FormControl;
  guardianMobileNo: FormControl;
  fatherEmailID: FormControl;
  motherEmailID: FormControl;
  guardianEmailID: FormControl;
  mediumOfInstruction: FormControl;
  admissionNo: FormControl;
  admissionDate: FormControl;
  streamID: FormControl;
  classID: FormControl;
  sectionID: FormControl;
  feeQuota: FormControl;
  routeID: FormControl;
  studentProfPicEncoded: FormControl;  
  

  constructor(

    private authServ: AuthService, 
    private router: Router,
    private cookie: CookieService

  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createFormGroup();
  }



  createFormControls() { 
    this.firstName = new FormControl('', []);
    this.middleName = new FormControl('', []);
    this.lastName = new FormControl('', []);
    this.aadharNo = new FormControl('', []);
    this.mobileNo = new FormControl('', []);
    this.date_of_birth = new FormControl('', []);
    this.bloodGroup = new FormControl('', []);
    this.gender = new FormControl('', []);
    this.preference = new FormControl('', []);
    this.religion = new FormControl('', []);
    this.caste = new FormControl('', []);
    this.nationality = new FormControl('', []);
    this.fatherFName = new FormControl('', []);
    this.fatherMName = new FormControl('', []);
    this.fatherLName = new FormControl('', []);
    this.motherFName = new FormControl('', []);
    this.motherMName = new FormControl('', []);
    this.motherLName = new FormControl('', []);
    this.guardianFName = new FormControl('', []);
    this.guardianMName = new FormControl('', []);
    this.guardianLName = new FormControl('', []);
    this.fatherMobileNo = new FormControl('', []);
    this.motherMobileNo = new FormControl('', []);
    this.guardianMobileNo = new FormControl('', []);
    this.fatherEmailID = new FormControl('', []);
    this.motherEmailID = new FormControl('', []);
    this.guardianEmailID = new FormControl('', []);
    this.mediumOfInstruction = new FormControl('', []);
    this.admissionNo = new FormControl('', []);
    this.admissionDate = new FormControl('', []);
    this.streamID = new FormControl('', []);
    this.classID = new FormControl('', []);
    this.sectionID = new FormControl('', []);
    this.feeQuota = new FormControl('', []);
    this.routeID = new FormControl('', []);
    this.studentProfPicEncoded = new FormControl('', []);
  }


  createFormGroup() { 
    this.addStudentForm = new FormGroup({
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      aadharNo: this.aadharNo,
      mobileNo: this.mobileNo,
      date_of_birth: this.date_of_birth,
      bloodGroup: this.bloodGroup,
      gender: this.gender,
      preference: this.preference,
      religion: this.religion,
      caste: this.caste,
      nationality: this.nationality,
      fatherFName: this.fatherFName,
      fatherMName: this.fatherMName,
      fatherLName: this.fatherLName,
      motherFName: this.motherFName,
      motherMName: this.motherMName,
      motherLName: this.motherLName,
      guardianFName: this.guardianFName,
      guardianMName: this.guardianMName,
      guardianLName: this.guardianLName,
      fatherMobileNo: this.fatherMobileNo,
      motherMobileNo: this.motherMobileNo,
      guardianMobileNo: this.guardianMobileNo,
      fatherEmailID: this.fatherEmailID,
      motherEmailID: this.motherEmailID,
      guardianEmailID: this.guardianEmailID,
      mediumOfInstruction: this.mediumOfInstruction,
      admissionNo: this.admissionNo,
      admissionDate: this.admissionDate,
      streamID: this.streamID,
      classID: this.classID,
      sectionID: this.sectionID,
      feeQuota: this.feeQuota,
      routeID: this.routeID,
      studentProfPicEncoded: this.studentProfPicEncoded
    });
  }



  onAddStudentSubmit ()
  {
    var addStudentData = this.addStudentForm.value;
    let data = [];
    data.push(addStudentData);
    let stdData = {
      data: data
    };
    console.log(stdData);

    this.authServ.addStudent(stdData).subscribe((res:any) => {
      // if(res.success){
        console.log(res);
        // this.cookie.set( 'sessionId', res.data.sessionID );
        // this.router.navigate(['/dashboard']);
      // }else{
        // console.log("Unsuccessfull");
        // this.router.navigate(['/login']);
      // }
    });
    // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));
  }



}
