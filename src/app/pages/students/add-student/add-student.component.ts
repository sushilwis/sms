import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { transition, trigger, style, animate } from "@angular/animations";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: [
    "./add-student.component.css",
    "../../../../../node_modules/sweetalert2/src/sweetalert2.scss",
    "../../../../../node_modules/ng2-toasty/style-bootstrap.css",
    "../../../../../node_modules/ng2-toasty/style-default.css",
    "../../../../../node_modules/ng2-toasty/style-material.css"
  ],

  encapsulation: ViewEncapsulation.None,

  animations: [
    trigger("fadeInOutTranslate", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("400ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ transform: "translate(0)" }),
        animate("400ms ease-in-out", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AddStudentComponent implements OnInit {
  // ./assets/img/pro-pic-placeholder.jpg
  position: any = "top-right";
  url: any = "";
  base64textString: string = "";
  isUploadPic: boolean = false;

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
    private cookie: CookieService,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    this.url = "./assets/img/pro-pic-placeholder.jpg";
    this.createFormControls();
    this.createFormGroup();
    // this.loadScript();
  }

  createFormControls() {
    this.firstName = new FormControl("", []);
    this.middleName = new FormControl("", []);
    this.lastName = new FormControl("", []);
    this.aadharNo = new FormControl("", []);
    this.mobileNo = new FormControl("", []);
    this.date_of_birth = new FormControl("", []);
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

  onAddStudentSubmit() {
    console.log("from add student.");
    var addStudentData = this.addStudentForm.value;

    addStudentData.institutionID = "1";
    addStudentData.subscriptionID = "1";
    addStudentData.studentProfPicEncoded = this.url;

    let data = [];

    data.push(addStudentData);

    let stdData = {
      data: data
    };

    console.log(stdData);

    this.authServ.addStudent(stdData).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.studentList[0]);
        localStorage.setItem("regStd", JSON.stringify(res.studentList[0]));

        this.addToast({
          title: "SUCCESS!",
          msg: "Student Added Successfully.",
          timeout: 6000,
          theme: "default",
          position: "top-right",
          type: "success"
        });

        this.router.navigate(["/students/addDetails"]);
      } else {
        // console.log(res);
        this.addToast({
          title: "FAIL!",
          msg: res.response,
          timeout: 6000,
          theme: "default",
          position: "top-right",
          type: "success"
        });

        this.router.navigate(["/students/add"]);
      }
    });
    // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));
    this.addStudentForm.reset();
  }

  // No subscriptions left for the institution

  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {

  //     // this.url = event.target.result;
  //     var reader = new FileReader();

  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     // reader.readAsBinaryString(event.target.files[0]);
  //     reader.readAsDataURL(event.target.files[0]);

  //     reader.onload = (event) => {
  //       this.url = event.target.result;
  //     }
  //   }
  // }

  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //   this.base64textString = btoa(binaryString);
  //   console.log(btoa(binaryString));
  // }

  // No subscriptions left for the institution

  onSelectFile(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    // console.log(e);
    console.log(file);
    console.log("Size in KB : ", file.size / 1024);
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      this.addToast({
        title: "FAIL!",
        msg: "Invalid Format.",
        timeout: 6000,
        theme: "default",
        position: "top-right",
        type: "error"
      });

      file = null;
    } else if (file.size / 1024 > 1024) {
      console.log("from size checking.");
      this.addToast({
        title: "FAIL!",
        msg: "Size Must be Within 1MB.",
        timeout: 6000,
        theme: "default",
        position: "top-right",
        type: "error"
      });

      file = null;
    } else {
      reader.onload = this.onLoadFile.bind(this);
      reader.readAsDataURL(file);
    }

    // reader.onload = this._handleReaderLoaded.bind(this);
    // reader.onload = this.onLoadFile.bind(this);
    // reader.readAsDataURL(file);
  }

  // _handleReaderLoaded(e) {
  //   let reader = e.target;
  //   this.url = reader.result;
  // }

  onLoadFile(event) {
    var img = new Image();
    img.src = event.target.result;
    var isUploadPic = null;

    img.onload = () => {
      console.log(img.width, "x", img.height);
      // var isUploaded = false;
      if (img.width != 600 && img.height != 600) {
        this.addToast({
          title: "FAIL!",
          msg: "Diamension Should Be 600x600.",
          timeout: 6000,
          theme: "default",
          position: "top-right",
          type: "error"
        });
      } else {
        this.addToast({
          title: "SUCCESS!",
          msg: "Image Uploaded Successfully.",
          timeout: 6000,
          theme: "default",
          position: "top-right",
          type: "success"
        });
        this.url = event.target.result;
      }
    };
  }

  addToast(options): any {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }

    this.position = options.position ? options.position : this.position;

    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    // this.toastyService.success(toastOptions);

    switch (options.type) {
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":
        this.toastyService.success(toastOptions);
        break;
      case "wait":
        this.toastyService.wait(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
      case "warning":
        this.toastyService.warning(toastOptions);
        break;
    }
  }
}
