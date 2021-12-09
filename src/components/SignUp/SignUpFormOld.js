import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from 'react-cookie';
import { validateEmail } from "../../scripts/inputValidators";
import { useMyContextFunctions } from "../../contexts/ContextFunctions";
import { Link, useHistory } from "react-router-dom";

// Renders contentRatings of chosen item
const SignUpForm = (props) => {

  const [cookies] = useCookies("");

  const [emailInput, setEmailInput] = useState("");

  const [passwordInput, setPasswordInput] = useState("");

  const [infoMessage, setInfoMessage] = useState("");

  // Bring functions from context
  const { authProcess, registerProcess } = useMyContextFunctions();

  const { t } = useTranslation();

  const history = useHistory();

  useEffect(() => {
    async function checkCookie() {
      try {
        if (cookies?.userData?.eMail) {
          setEmailInput(cookies?.userData?.eMail);
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkCookie();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {

    // Check if email is still valid // TODO: ADD PASSWORD VALIDATION
    if (validateEmail(emailInput)) {
      try {
        //**** REGISTERATION *****/ // TODO: Can registeration do authentication at the same time and return the token?

        // Do the signUp/login process
        const response = await registerProcess(emailInput, passwordInput);

        if (response.data.status === "error") {
          setInfoMessage(response.message)
        } else if (response.data.status === "ok") {
          //****AUTHENTICATION *****/

          // If everything was fine on registering, continue to authentication
          const authResponse = await authProcess(emailInput, passwordInput);

          if (authResponse.data.status === "ok") {
            // TODO: SMALL PAUSE AND "SUCCESS"(?) BEFORE PUSH

            // Change user to redirect route (if given to component configs) or to home route
            history.push(props.redirectRoute || props.routes.home)
          } else {
            setInfoMessage(authResponse.data.message);
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // TODO: IF validateEmail gives false, pop-up some kind of message to ask for correct email
      console.log("Incorrect email address")
    }
  };

  return (
    <div
      className="signUpFormContainer"
      style={props.styles.signUpFormContainer}
    >
      <div className="signUpForm">
        <div className="stepsContainer">
          {`${t("Step")} 1`}
        </div>
        <div className="signUpFormInfoMessage"> {infoMessage} </div>
        <div className="signUpStep1">
          <div className="signUpStepTitle">
            {t("step1Title")}
          </div>

          <div className="signUpStepText">
            {t("step1Text")}
          </div>

          <input className="signUpFormInput" type="text" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder={t("Email")} />

          <input className="signUpFormInput" type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder={t("Password")} />

          <div className="signUpConditionsRow"><Link to={`${props.routes.tos}`}>{t("By signing up you are agreeing to our terms & conditions")}</Link></div>

          <button className="signUpFormBTN"
            style={props?.styles?.signUpBarBTN}
            onClick={() => handleClick()}
          >
            {t("Next")}
          </button>

        </div>
      </div>

    </div>
  );
}

export default SignUpForm;

