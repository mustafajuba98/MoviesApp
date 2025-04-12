import { useState } from "react";

function Loginform() {
  const [userInfo, setUserInfo] = useState({
    name: null,
    password: null,
  });

  const [errors, setErrors] = useState({
    errname: null,
    errpass: null,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [showPassword, setShowPassword] = useState(false);

  const handleforminput = (e) => {
    if (e.target.name === "name") {
      setUserInfo({
        ...userInfo,
        name: e.target.value,
      });
      setErrors({
        ...errors,
        errname:
          e.target.value.length === 0
            ? "this field is required"
            : !emailRegex.test(e.target.value) && "must enter an email",
      });
    } else {
      setUserInfo({
        ...userInfo,
        password: e.target.value,
      });
      setErrors({
        ...errors,
        errpass:
          e.target.value.length === 0
            ? "this field is required"
            : e.target.value.length < 8 && "password must be 8 character",
      });
    }
  };

  const preventdefault = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <h1>Form</h1>
        <form onSubmit={(e) => preventdefault(e)}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="name"
              onChange={(e) => handleforminput(e)}
            />
            <p className="text-danger"> {errors.errname} </p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => handleforminput(e)}
              />

              <button
                type="button"
                name="password"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                style={{ border: "none", background: "transparent" }}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  style={{ cursor: "pointer" }}
                ></i>
              </button>
            </div>
            <p className="text-danger"> {errors.errpass} </p>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Loginform;
