//Checking is null of empty
let isNullOrEmtpy = (s) => {
  if (!s || s.length === 0) {
    return true;
  } else {
    return false;
  }
};

let isValidUserName = (s) => {
  const userNamePattern = new RegExp("[a-z1-9]{6,}");
  if (userNamePattern.test(s)) {
    return true;
  }
  return false;
};

let isValidPassword = (s) => {
  const userNamePattern = new RegExp("[a-zA-Z1-9]{6,}");
  if (userNamePattern.test(s)) {
    return true;
  }
  return false;
};

let isValidEmail = (s) => {
  const emailPattern = new RegExp(
    "[a-zA-Z0-9]+([._-][0-9a-zA-Z]+)*@[a-zA-Z0-9]+([.-][0-9a-zA-Z]+)*.[a-zA-Z]{2,}"
  );
  if (emailPattern.test(s)) {
    return true;
  }
  return false;
};

export default {
  isNullOrEmtpy,
  isValidUserName,
  isValidEmail,
  isValidPassword,
};
