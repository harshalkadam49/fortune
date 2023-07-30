export function isEmpty(value: any) {
   if (value == null || value == undefined || value == "") {
     return true;
   }
   return false;
 }
 
 export function isEmail(value: any) {
   if (!isEmpty(value)) {
     if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
       return true;
     }
   }
   return false;
 }
 
 export function isValidPan(value: any) {
   if (!isEmpty(value)) {
     if (
       value.length < 10 ||
       !/^[a-zA-Z]{3}([pP])([a-zA-Z])([0-9]){4}([a-zA-Z])$/i.test(value)
     ) {
       return false;
     } else {
       return true;
     }
   }
   return false;
 }
 
 export const isValidGSTNum = (value: any): Boolean => {
   if (!isEmpty(value)) {
       if (/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/i.test(value)) {
           return true;
       }
   }
   return false;
 }
 
 export function isZero(value: any) {
   if (!isEmpty(value)) {
     if (value == "0" || value == "0.0") {
       return true;
     }
   }
   return false;
 }
 
 export function checkFullName(value: any) {
   if (!isEmpty(value)) {
     if (value.trim().indexOf(" ") <= 0) {
       return false;
     } else return true;
   }
   return false;
 }
 
 var calculate_age = (dob1: any) => {
   var today = new Date();
   var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
   var age_now = today.getFullYear() - birthDate.getFullYear();
   var m = today.getMonth() - birthDate.getMonth();
   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
     age_now--;
   }
   return age_now;
 };
 
 export function validDateOfBirth(value: any) {
   if (calculate_age(value) < 18) {
     return false;
   } else {
     return true;
   }
 }
 
 export function isOnlyAlphabets(value: any) {
   if (!isEmpty(value)) {
     if (/^[A-Za-z]*$/i.test(value)) {
       return true;
     }
   }
   return false;
 }
 
 export function isAlphabetsWithSpace(value: any) {
   if (!isEmpty(value)) {
     if (/^[A-Za-z ]*$/i.test(value)) {
       return true;
     }
   }
   return false;
 }
 
 export function isOnlyDigits(value: any) {
   if (!isEmpty(value)) {
     if (/^[0-9]*$/i.test(value)) {
       return true;
     }
   }
   return false;
 }
 
 export function MaxLength(value: any, length: any) {
   if (!isEmpty(value)) {
     if (!(value.length > length)) {
       return true;
     }
   }
   return false;
 }
 
 export function MinLength(value: any, length: any) {
   if (!isEmpty(value)) {
     if (!(value.length < length)) {
       return true;
     }
   }
   return false;
 }
 
 export function isAmountLessThan(value: any, amount: any) {
   if (!isEmpty(value)) {
     if (!(value > amount)) {
       return true;
     }
   }
   return false;
 }
 
 export function isAmountGreaterThan(value: any, amount: any) {
   if (!isEmpty(value)) {
     if (!(value < amount)) {
       return true;
     }
   }
   return false;
 }
 
 export function checkSpecialCharacter(password: any) {
   const condition = new RegExp("[^A-Za-z0-9]", "g");
   return condition.test(password);
 }
 
 export function checkChar(password: any) {
   const condition = new RegExp(".*[a-zA-Z]+.*", "g");
   return condition.test(password);
 }
 
 export function checkDigit(password: any) {
   const condition = new RegExp("[0-9]", "g");
   return condition.test(password);
 }
 
 export const getFirstChar = (str: string) => {
   if (str) {
       return str.charAt(0).toUpperCase()
   }
 }
 export const capitalizeFirstLetter = (str: string) => {
   if (str) {
       return str[0].toUpperCase() + str.slice(1);
   }
 }