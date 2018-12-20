import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpRequest } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { CookieService } from "ngx-cookie-service";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class AuthService {
  userCredential: any;
  userData: any;

  constructor(private http: HttpClient, private cookie: CookieService) {}



  // ##################################################################################
  //     ---------------- login student method -----------------
  // ##################################################################################

  loginUser(userCredential) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    return this.http
      .post(`${environment.apiUrl}users/userLogin`, userCredential, {
        headers: header
      })
      .map(res => {
        return res;
      });
  }




  // ##################################################################################
  //     ---------------- add student method -----------------
  // ##################################################################################

  addStudent(newStudentData) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    return this.http
      .post(`${environment.apiUrl}admin/addStudent`, newStudentData, {
        headers: header
      })
      .map(res => {
        return res;
      });
  }




  // ##################################################################################
  //     ---------------- update student method -----------------
  // ##################################################################################

  updateStudent(updateStudentData) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    return this.http
      .post(
        `${environment.apiUrl}student_profile/updateStudentDetails`,
        updateStudentData,
        { headers: header }
      )
      .map(res => {
        return res;
      });
  }




  // ##################################################################################
  //     ---------------- add student details method -----------------
  // ##################################################################################

  addStudentDetails(otherStudentDetails) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    return this.http
      .post(
        `${environment.apiUrl}admin/addStudentProfileDetails`,
        otherStudentDetails,
        { headers: header }
      )
      .map(res => {
        return res;
      });
  }
  // updateStudentProfileDetails




  // ##################################################################################
  //     ---------------- update student details method -----------------
  // ##################################################################################

  updateStudentProfileDetails(studentProfileDetails) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    return this.http
      .post(
        `${environment.apiUrl}student_profile/updateStudentProfileDetails`,
        studentProfileDetails,
        { headers: header }
      )
      .map(res => {
        return res;
      });
  }





  // ##################################################################################
  //     ---------------- get student details filter method -----------------
  // ##################################################################################

  getStudentDetailsForFilters(filterData) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    return this.http
      .post(
        `${environment.apiUrl}student_profile/getStudentDetailsForFilters`,
        filterData,
        { headers: header }
      )
      .map(res => {
        return res;
      });
  }




  // ##################################################################################
  //     ---------------- delete student method -----------------
  // ##################################################################################

  deleteStudent(studentInfoForDelete) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    return this.http
      .post(
        `${environment.apiUrl}student_profile/updateStudentDetails`,
        studentInfoForDelete,
        { headers: header }
      )
      .map(res => {
        return res;
      });
  }





  // ##################################################################################
  //     ---------------- delete student profile details method -----------------
  // ##################################################################################

  deleteStudentProfileDetails(studentProfileInfoForDelete) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    return this.http
      .post(
        `${environment.apiUrl}student_profile/updateStudentProfileDetails`,
        studentProfileInfoForDelete,
        { headers: header }
      )
      .map(res => {
        return res;
      });
  }





  // ##################################################################################
  //     ---------------- check user authentication method -----------------
  // ##################################################################################

  async isAuthenticated() {

    let is_cookie_set = await this.cookie.check('sessionId');
    return is_cookie_set;
    // if(is_cookie_set){
    //   return is_cookie_set;
    // }
  }





  // ##################################################################################
  //     ---------------- get logged in user data method -----------------
  // ##################################################################################
  getLogedInUserData() {

    let data = {
      sessionId: this.cookie.get("sessionId"),
      fName: this.cookie.get("fName"),
      uID: this.cookie.get("uID"),
      uName: this.cookie.get("uName"),
      URole: this.cookie.get("uRole"),
      insID: this.cookie.get("insID")
    };
    // console.log(data);
  }




  // ##################################################################################
  //     ---------------- exporting data as excel format method -----------------
  // ##################################################################################
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }





  // ##################################################################################
  //     ---------------- saving the exported excel file method -----------------
  // ##################################################################################
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
}
