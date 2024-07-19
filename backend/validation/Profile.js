const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";


  if (validator.isEmpty(data.firstName)) {
    errors.tel = "Required firstName";
  }
 
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Required lastName";
  }
  if (validator.isEmpty(data.address)) {
    errors.address = "Required address";
  }
  
  if (validator.isEmpty(data.phone)) {
    errors.cityalcode = "Required phone";
  }

  if (validator.isEmpty(data.city)) {
    errors.cityalcode = "Required city";
  }

  if (validator.isEmpty(data.email)) {
    errors.postalcode = "Required email";
  }
  if (validator.isEmpty(data.password)) {
    errors.postalcode = "Required password";
  }


  return {
      errors,
      isValid: isEmpty(errors)
  }
};