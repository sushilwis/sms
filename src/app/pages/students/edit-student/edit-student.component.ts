import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  url = ''; 
  stdId: any;
  stdRoll: any;
  stdDetailsData: any;
  base64textString: string = ''; 

  editStudentForm: FormGroup;

  firstName: FormControl;
  middleName: FormControl;
  lastName: FormControl;
  aadharNo: FormControl;
  mobileNo: FormControl;
  studentDOB: FormControl;
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
  // studentProfPicEncoded: FormControl;


  constructor(
    private authServ: AuthService, 
    private router: Router,
    private cookie: CookieService,
    private actRoute: ActivatedRoute,
  ) { }



  ngOnInit() {       
    this.actRoute.params.subscribe(data => {
      this.stdId = data.id;
    });

    this.getStdDetails();    

    this.createFormControls();
    this.createFormGroup(); 
    
    this.url = './assets/img/pro-pic-placeholder.jpg';    
  }



  createFormControls() { 
    this.firstName = new FormControl('', []);
    this.middleName = new FormControl('', []);
    this.lastName = new FormControl('', []);
    this.aadharNo = new FormControl('', []);
    this.mobileNo = new FormControl('', []);
    this.studentDOB = new FormControl('', []);
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
  }




  createFormGroup() { 
    this.editStudentForm = new FormGroup({
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      aadharNo: this.aadharNo,
      mobileNo: this.mobileNo,
      studentDOB: this.studentDOB,
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
      routeID: this.routeID
    });
  }




  onEditStudentSubmit ()
  {
    var editStudentData = this.editStudentForm.value;

    editStudentData.id = this.stdId;
    editStudentData.rollNo = this.stdRoll;
    editStudentData.delete = false;
    editStudentData.studentProfPicEncoded = this.url;

    // let data = [];

    // data.push(editStudentData);

    // let stdData = {
    //   data: data
    // };

    console.log(editStudentData);
    this.authServ.updateStudent(editStudentData).subscribe((res:any) => {
      if(res.success){
        console.log(res);
        this.router.navigate([`students/editDetails/${this.stdId}`]);
      }else{
        this.router.navigate(['students/edit']);
      }
    });
    // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));
    this.editStudentForm.reset();
  }





  onSelectFile(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }




  _handleReaderLoaded(e) {
    let reader = e.target;
    this.url = reader.result;
    // console.log(this.url);
  }




  setFormValue(std) {
    this.editStudentForm.setValue({
      firstName: std.firstName,
      middleName: std.middleName,
      lastName: std.lastName,
      aadharNo: std.aadharNo,
      mobileNo: std.mobileNo,
      studentDOB: std.studentDOB,
      bloodGroup: std.bloodGroup,
      gender: std.gender,
      preference: std.preference,
      religion: std.religion,
      caste: std.caste,
      nationality: std.nationality,
      fatherFName: std.fatherFName,
      fatherMName: std.fatherMName,
      fatherLName: std.fatherLName,
      motherFName: std.motherFName,
      motherMName: std.motherMName,
      motherLName: std.motherLName,
      guardianFName: std.guardianFName,
      guardianMName: std.guardianMName,
      guardianLName: std.guardianLName,
      fatherMobileNo: std.fatherMobileNo,
      motherMobileNo: std.motherMobileNo,
      guardianMobileNo: std.guardianMobileNo,
      fatherEmailID: std.fatherEmailID,
      motherEmailID: std.motherEmailID,
      guardianEmailID: std.guardianEmailID,
      mediumOfInstruction: std.mediumOfInstruction,
      admissionNo: std.admissionNo,
      admissionDate: std.admissionDate,
      streamID: std.streamID,
      classID: std.classID,
      sectionID: std.sectionID,
      feeQuota: std.feeQuota,
      routeID: std.routeDetails.routeID
    })
  }




  getStdDetails ()
  {
    let stdData = {
      "institutionID":1,
      "studentID": this.stdId
    }

    this.authServ.getStudentDetailsForFilters(stdData).subscribe((res:any) => {
      if(res.success){
        console.log(res.data[0]);
        this.stdDetailsData = res.data[0];
        this.url = res.data[0].studentProfPicPath;
        this.stdRoll = res.data[0].rollNo;

        this.setFormValue(this.stdDetailsData);
      }else{
        // this.router.navigate(['/students/add']);
      }
    });
  }









}
