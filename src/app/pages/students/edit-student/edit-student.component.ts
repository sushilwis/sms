import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../_services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";

@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
  styleUrls: ["./edit-student.component.css"]
})
export class EditStudentComponent implements OnInit {
  url = "";
  stdId: any;
  stdRoll: any;
  stdDetailsData: any;
  base64textString: string = "";
  stdProfileDetailsData: any;
  streamData: any;
  classData: any;
  routeData: any;
  sectionData: any;

  //for student edit
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
  studentProfPicEncoded: FormControl;

  //for student profile details edit
  editStudentDetailsForm: FormGroup;
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
  // studentID: FormControl;
  motherTongue: FormControl;
  bankIFSCCode: FormControl;
  bankName: FormControl;
  bplStatus: FormControl;
  fatherCaste: FormControl;
  bplNo: FormControl;
  bankAccNo: FormControl;
  motherCaste: FormControl;
  updatedBy: FormControl;
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
    private cookie: CookieService,
    private actRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.insSelectDetails();

    this.actRoute.params.subscribe(data => {
      this.stdId = data.id;
    });

    //for student details edit
    this.getStdDetails();
    this.createFormControls();
    this.createFormGroup();

    //for student profile details edit
    this.getStdDetails2();
    this.createFormControls2();
    this.createFormGroup2();

    this.url = "./assets/img/pro-pic-placeholder.jpg";
  }

  // For student details edit
  createFormControls() {
    this.firstName = new FormControl("", []);
    this.middleName = new FormControl("", []);
    this.lastName = new FormControl("", []);
    this.aadharNo = new FormControl("", []);
    this.mobileNo = new FormControl("", []);
    this.studentDOB = new FormControl("", []);
    this.bloodGroup = new FormControl("", []);
    this.gender = new FormControl("", []);
    this.preference = new FormControl("", []);
    this.religion = new FormControl("", []);
    this.caste = new FormControl("", []);
    this.nationality = new FormControl("", []);
    this.fatherFName = new FormControl("", []);
    this.fatherMName = new FormControl("", []);
    this.fatherLName = new FormControl("", []);
    this.motherFName = new FormControl("", []);
    this.motherMName = new FormControl("", []);
    this.motherLName = new FormControl("", []);
    this.guardianFName = new FormControl("", []);
    this.guardianMName = new FormControl("", []);
    this.guardianLName = new FormControl("", []);
    this.fatherMobileNo = new FormControl("", []);
    this.motherMobileNo = new FormControl("", []);
    this.guardianMobileNo = new FormControl("", []);
    this.fatherEmailID = new FormControl("", []);
    this.motherEmailID = new FormControl("", []);
    this.guardianEmailID = new FormControl("", []);
    this.mediumOfInstruction = new FormControl("", []);
    this.admissionNo = new FormControl("", []);
    this.admissionDate = new FormControl("", []);
    this.streamID = new FormControl("", []);
    this.classID = new FormControl("", []);
    this.sectionID = new FormControl("", []);
    this.feeQuota = new FormControl("", []);
    this.routeID = new FormControl("", []);
    this.studentProfPicEncoded = new FormControl("", []);
  }

  // For student details edit
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
      routeID: this.routeID,
      studentProfPicEncoded: this.studentProfPicEncoded
    });
  }

  // student details edit form submit
  onEditStudentSubmit() {
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

    // console.log(editStudentData);
    this.authServ.updateStudent(editStudentData).subscribe((res: any) => {
      // console.log(res);
      if (res.success) {
        this.router.navigate([`students/editDetails/${this.stdId}`]);
      } else {
        this.router.navigate([`students/edit/${this.stdId}`]);
      }
    });
    // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));
    // this.editStudentForm.reset();
  }

  // Student picture upload and preview
  onSelectFile(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert("invalid format");
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

  // Student details value set
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
      routeID: std.routeDetails.routeID,
      studentProfPicEncoded: ""
    });
  }

  // get Student details function
  getStdDetails() {
    let stdData = {
      institutionID: 1,
      studentID: this.stdId
    };

    this.authServ.getStudentDetailsForFilters(stdData).subscribe((res: any) => {
      // console.log(res.data[0]);
      if (res.success) {
        this.stdDetailsData = res.data[0];
        this.url = res.data[0].studentProfPicPath;
        this.stdRoll = res.data[0].rollNo;

        this.setFormValue(this.stdDetailsData);
      } else {
        // this.router.navigate(['/students/add']);
      }
    });
  }

  // for student profile details
  createFormControls2() {
    this.region = new FormControl("", []);
    this.previousInsState = new FormControl("", []);
    this.previousInsCity = new FormControl("", []);
    this.previousInsAddress = new FormControl("", []);
    this.tempAddressCountry = new FormControl("", []);
    this.tempAddressPhNo = new FormControl("", []);
    this.emergencyContactMobile = new FormControl("", []);
    this.emergencyContactAddress = new FormControl("", []);
    this.emergencyContactRelationship = new FormControl("", []);
    this.previousInsName = new FormControl("", []);
    this.emergencyContactName = new FormControl("", []);
    this.previousInsType = new FormControl("", []);
    this.previousInsAffiliation = new FormControl("", []);
    this.guardianOccupation = new FormControl("", []);
    this.motherOccupation = new FormControl("", []);
    this.permanentAddress1 = new FormControl("", []);
    this.permanentAddress2 = new FormControl("", []);
    this.fatherOccupation = new FormControl("", []);
    this.permanentAddressDistrict = new FormControl("", []);
    this.permanentAddressCity = new FormControl("", []);
    this.tempAddressDistrict = new FormControl("", []);
    this.permanentAddressCountry = new FormControl("", []);
    this.permanentAddressTaluk = new FormControl("", []);
    this.permanentAddressState = new FormControl("", []);
    this.tempAddressCity = new FormControl("", []);
    this.tempAddressPin = new FormControl("", []);
    this.permanentAddressPhNo = new FormControl("", []);
    this.tempAddressState = new FormControl("", []);
    this.tempAddressTaluk = new FormControl("", []);
    this.permanentAddressPin = new FormControl("", []);
    this.tempAddress1 = new FormControl("", []);
    this.tempAddress2 = new FormControl("", []);
    // this.studentID = new FormControl('', []);
    this.motherTongue = new FormControl("", []);
    this.bankIFSCCode = new FormControl("", []);
    this.bankName = new FormControl("", []);
    this.bplStatus = new FormControl("", []);
    this.fatherCaste = new FormControl("", []);
    this.bplNo = new FormControl("", []);
    this.bankAccNo = new FormControl("", []);
    this.motherCaste = new FormControl("", []);
    this.updatedBy = new FormControl("", []);
    this.previousTCNo = new FormControl("", []);
    this.fatherAadharNo = new FormControl("", []);
    this.previousTCDate = new FormControl("", []);
    this.sponsorshipReq = new FormControl("", []);
    this.previousInsPin = new FormControl("", []);
    this.previousInsDistrict = new FormControl("", []);
    this.identificationMark1 = new FormControl("", []);
    this.identificationMark2 = new FormControl("", []);
    this.previousInsTaluk = new FormControl("", []);
    this.motherAadharNo = new FormControl("", []);
    this.specialCategory = new FormControl("", []);
    this.disability = new FormControl("", []);
  }

  // for student profile details
  createFormGroup2() {
    this.editStudentDetailsForm = new FormGroup({
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
      // studentID: this.studentID,
      motherTongue: this.motherTongue,
      bankIFSCCode: this.bankIFSCCode,
      bankName: this.bankName,
      bplStatus: this.bplStatus,
      fatherCaste: this.fatherCaste,
      bplNo: this.bplNo,
      bankAccNo: this.bankAccNo,
      motherCaste: this.motherCaste,
      updatedBy: this.updatedBy,
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

  // Edit student profile details submit
  onEditStudentDetailsSubmit() {
    var editStudentDetailsData = this.editStudentDetailsForm.value;

    // let regStdDetails = JSON.parse(localStorage.getItem('regStd'));
    // console.log('student ID : ', regStdDetails.studentID);
    editStudentDetailsData.id = this.stdId;
    editStudentDetailsData.delete = false;
    editStudentDetailsData.specialCategory = null;
    // editStudentDetailsData.updatedBy = "1";
    // editStudentDetailsData.specialCategory = [];
    // editStudentDetailsData.disability = [];
    // addStudentData.subscriptionID = "1";
    // addStudentData.studentProfPicEncoded = this.url;

    // let data = [];

    // data.push(editStudentDetailsData);

    // let stdData = {
    //   data: data
    // };

    // console.log('send data : ', editStudentDetailsData);

    this.authServ
      .updateStudentProfileDetails(editStudentDetailsData)
      .subscribe((res: any) => {
        // console.log('response data : ', res);
        if (res) {
          // localStorage.setItem('regStd', JSON.stringify(res.studentList[0]));
          // this.router.navigate(['/students/list']);
        } else {
          this.router.navigate(["/students/addDetails"]);
        }
      });
    // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));
    this.editStudentDetailsForm.reset();
  }

  // get student profile details
  getStdDetails2() {
    let stdData = {
      institutionID: 1,
      studentID: this.stdId
    };

    this.authServ.getStudentDetailsForFilters(stdData).subscribe((res: any) => {
      if (res.success) {
        // console.log(res.data[0].profileDetails);
        this.stdProfileDetailsData = res.data[0].profileDetails;
      } else {
        // this.router.navigate(['/students/']);
      }
    });
  }

  insSelectDetails() {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");

    let senddata = {
      institutionID: this.cookie.get("insID")
    };

    this.http
      .post(
        "https://dyumath.in/campusquo_services/api/institution/getInsSpecificSelectDetails",
        senddata
      )
      .map(res => res)
      .subscribe((data: any) => {
        // console.log(data);
        this.streamData = data.streamList;
        this.classData = data.classList;
        this.routeData = data.routeList;
        // this.sectionData = data.classList.sectionDetails;
        // this.classData.forEach(ele => {
        //   this.sectionData.push(ele.sectionDetails);
        // });
      });
  }

  getSection(e) {
    // console.log(e);
    this.classData.forEach(ele => {
      if (ele.classID == e.value) {
        this.sectionData = ele.sectionDetails;
      }
    });

    // console.log(this.sectionData);
  }
}
