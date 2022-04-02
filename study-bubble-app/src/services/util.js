
const createRequestOptions = () => {
  return
}
const handleLoginButtonPressed = () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      user_password: password,
    }),
  };

  fetch("/api/login/user", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        window.sessionStorage.setItem("currentUser", email);
        clearFields();
        navigate("/homepage");
      } else {
        setErrorMsg(data.message);
        setErrorFlag(true);
      }
    });
};