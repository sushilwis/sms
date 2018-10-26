import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-student-details',
  templateUrl: './add-student-details.component.html',
  styleUrls: ['./add-student-details.component.css']
})
export class AddStudentDetailsComponent implements OnInit {

  addStudentDetailsForm: FormGroup;

      region: FormControl;
      previousInsState: FormControl;
      previousInsCity: FormControl;
      previousInsAddress: FormControl;
      tempAddressCountry: FormControl;
      tempAddressPhNo: FormControl;
      emergencyContactMobile: FormControl;
      emergencyContactAddress: FormControl;
      emergencyContactRelationship: FormControl;
      previousInsName: FormControl;
      emergencyContactName: FormControl;
      previousInsType: FormControl;
      previousInsAffiliation: FormControl;
      guardianOccupation: FormControl;
      motherOccupation: FormControl;
      permanentAddress1: FormControl;
      permanentAddress2: FormControl;
      fatherOccupation: FormControl;
      permanentAddressDistrict: FormControl;
      permanentAddressCity: FormControl;
      tempAddressDistrict: FormControl;
      permanentAddressCountry: FormControl;
      permanentAddressTaluk: FormControl;
      permanentAddressState: FormControl;
      tempAddressCity: FormControl;
      tempAddressPin: FormControl;
      permanentAddressPhNo: FormControl;
      tempAddressState: FormControl;
      tempAddressTaluk: FormControl;
      permanentAddressPin: FormControl;
      tempAddress1: FormControl;
      tempAddress2: FormControl;
      studentID: FormControl;
      motherTongue: FormControl;
      bankIFSCCode: FormControl;
      bankName: FormControl;
      bplStatus: FormControl;
      fatherCaste: FormControl;
      bplNo: FormControl;
      bankAccNo: FormControl;
      motherCaste: FormControl;
      createdBy: FormControl;
      previousTCNo: FormControl;
      fatherAadharNo: FormControl;
      previousTCDate: FormControl;
      sponsorshipReq: FormControl;
      previousInsPin: FormControl;
      previousInsDistrict: FormControl;
      identificationMark1: FormControl;
      identificationMark2: FormControl;
      previousInsTaluk: FormControl;
      motherAadharNo: FormControl;
      specialCategory: FormControl;
      disability: FormControl;

  constructor(
    private authServ: AuthService, 
    private router: Router,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    // let regStdDetails = JSON.parse(localStorage.getItem('regStd'));
    // console.log('student ID : ', regStdDetails.studentID);

    this.createFormControls();
    this.createFormGroup();
  }



  createFormControls() { 
    this.region = new FormControl('', []);
    this.previousInsState = new FormControl('', []);
    this.previousInsCity = new FormControl('', []);
    this.previousInsAddress = new FormControl('', []);
    this.tempAddressCountry = new FormControl('', []);
    this.tempAddressPhNo = new FormControl('', []);
    this.emergencyContactMobile = new FormControl('', []);
    this.emergencyContactAddress = new FormControl('', []);
    this.emergencyContactRelationship = new FormControl('', []);
    this.previousInsName = new FormControl('', []);
    this.emergencyContactName = new FormControl('', []);
    this.previousInsType = new FormControl('', []);
    this.previousInsAffiliation = new FormControl('', []);
    this.guardianOccupation = new FormControl('', []);
    this.motherOccupation = new FormControl('', []);
    this.permanentAddress1 = new FormControl('', []);
    this.permanentAddress2 = new FormControl('', []);
    this.fatherOccupation = new FormControl('', []);
    this.permanentAddressDistrict = new FormControl('', []);
    this.permanentAddressCity = new FormControl('', []);
    this.tempAddressDistrict = new FormControl('', []);
    this.permanentAddressCountry = new FormControl('', []);
    this.permanentAddressTaluk = new FormControl('', []);
    this.permanentAddressState = new FormControl('', []);
    this.tempAddressCity = new FormControl('', []);
    this.tempAddressPin = new FormControl('', []);
    this.permanentAddressPhNo = new FormControl('', []);
    this.tempAddressState = new FormControl('', []);
    this.tempAddressTaluk = new FormControl('', []);
    this.permanentAddressPin = new FormControl('', []);
    this.tempAddress1 = new FormControl('', []);
    this.tempAddress2 = new FormControl('', []);
    this.studentID = new FormControl('', []);
    this.motherTongue = new FormControl('', []);
    this.bankIFSCCode = new FormControl('', []);
    this.bankName = new FormControl('', []);
    this.bplStatus = new FormControl('', []);
    this.fatherCaste = new FormControl('', []);
    this.bplNo = new FormControl('', []);
    this.bankAccNo = new FormControl('', []);
    this.motherCaste = new FormControl('', []);
    this.createdBy = new FormControl('', []);
    this.previousTCNo = new FormControl('', []);
    this.fatherAadharNo = new FormControl('', []);
    this.previousTCDate = new FormControl('', []);
    this.sponsorshipReq = new FormControl('', []);
    this.previousInsPin = new FormControl('', []);
    this.previousInsDistrict = new FormControl('', []);
    this.identificationMark1 = new FormControl('', []);
    this.identificationMark2 = new FormControl('', []);
    this.previousInsTaluk = new FormControl('', []);
    this.motherAadharNo = new FormControl('', []);
    this.specialCategory = new FormControl('', []);
    this.disability = new FormControl('', []);
  }



  createFormGroup() { 
    this.addStudentDetailsForm = new FormGroup({
      region: this.region,
      previousInsState: this.previousInsState,
      previousInsCity: this.previousInsCity,
      previousInsAddress: this.previousInsAddress,
      tempAddressCountry: this.tempAddressCountry,
      tempAddressPhNo: this.tempAddressPhNo,
      emergencyContactMobile: this.emergencyContactMobile,
      emergencyContactAddress: this.emergencyContactAddress, 
      emergencyContactRelationship: this.emergencyContactRelationship,
      previousInsName: this.previousInsName,
      emergencyContactName: this.emergencyContactName,
      previousInsType: this.previousInsType,
      previousInsAffiliation: this.previousInsAffiliation,
      guardianOccupation: this.guardianOccupation,
      motherOccupation: this.motherOccupation,
      permanentAddress1: this.permanentAddress1,
      permanentAddress2: this.permanentAddress2,
      fatherOccupation: this.fatherOccupation,
      permanentAddressDistrict: this.permanentAddressDistrict,
      permanentAddressCity: this.permanentAddressCity,
      tempAddressDistrict: this.tempAddressDistrict,
      permanentAddressCountry: this.permanentAddressCountry,
      permanentAddressTaluk: this.permanentAddressTaluk,
      permanentAddressState: this.permanentAddressState,
      tempAddressCity: this.tempAddressCity,
      tempAddressPin: this.tempAddressPin,
      permanentAddressPhNo: this.permanentAddressPhNo,
      tempAddressState: this.tempAddressState,
      tempAddressTaluk: this.tempAddressTaluk,
      permanentAddressPin: this.permanentAddressPin,
      tempAddress1: this.tempAddress1,
      tempAddress2: this.tempAddress2,
      studentID: this.studentID,
      motherTongue: this.motherTongue,
      bankIFSCCode: this.bankIFSCCode,
      bankName: this.bankName,
      bplStatus: this.bplStatus,
      fatherCaste: this.fatherCaste,
      bplNo: this.bplNo,
      bankAccNo: this.bankAccNo,
      motherCaste: this.motherCaste,
      createdBy: this.createdBy,
      previousTCNo: this.previousTCNo,
      fatherAadharNo: this.fatherAadharNo,
      previousTCDate: this.previousTCDate,
      sponsorshipReq: this.sponsorshipReq,
      previousInsPin: this.previousInsPin,
      previousInsDistrict: this.previousInsDistrict,
      identificationMark1: this.identificationMark1,
      identificationMark2: this.identificationMark2,
      previousInsTaluk: this.previousInsTaluk,
      motherAadharNo: this.motherAadharNo,
      specialCategory: this.specialCategory,
      disability: this.disability
    });
  }



  onAddStudentDetailsSubmit()
  {
    var addStudentDetailsData = this.addStudentDetailsForm.value;

    let regStdDetails = JSON.parse(localStorage.getItem('regStd'));
    // console.log('student ID : ', regStdDetails.studentID);
    addStudentDetailsData.studentID = regStdDetails.studentID; 
    addStudentDetailsData.createdBy = "1";
    addStudentDetailsData.specialCategory = [];
    addStudentDetailsData.disability = [];
    // addStudentData.subscriptionID = "1";
    // addStudentData.studentProfPicEncoded = this.url;

    let data = [];

    data.push(addStudentDetailsData);

    let stdData = {
      data: data
    };

    // console.log('request data : ',stdData);

    this.authServ.addStudentDetails(stdData).subscribe((res:any) => {
      if(res.success){
        // console.log('response data : ', res);
        // localStorage.setItem('regStd', JSON.stringify(res.studentList[0]));
        this.router.navigate(['/students/list']);
      }else{
        this.router.navigate(['/students/addDetails']);
      }
    });
    // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));
    this.addStudentDetailsForm.reset();
  }





  resetForm() {
    this.addStudentDetailsForm.reset();
  }




}
