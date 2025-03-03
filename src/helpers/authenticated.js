function isAthenticated() {
  const userLogin = localStorage.getItem("userLogin");
  let isLogin = false;

  if (userLogin) {
    isLogin = true;
  }
  return isLogin;
}

function getRole() {
  let role = "Guest";
  const userLogin = localStorage.getItem("userLogin");
  if (userLogin) {
    role = userLogin.roleName;
  }
  return role;
}

function getLoginInfor() {
  const userLogin = localStorage.getItem("userLogin");
  let loginInfor = "";
  if (userLogin) {
    loginInfor.role = userLogin.roleName;
    loginInfor.userName = userLogin.userName;
    loginInfor.id = userLogin.id;
  }
  return loginInfor;
}

export default { isAthenticated, getRole, getLoginInfor };
