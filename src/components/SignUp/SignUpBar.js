import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
//import { checkStyle } from "../../scripts/utils";
import { getImageByKey } from "../../scripts/getImageByKey";
import { validateEmail } from "../../scripts/inputValidators";
import { useCookies } from 'react-cookie';

// Renders contentRatings of chosen item
const SignUpBar = (props) => {

  const [signUpBarInput, setSignUpBarInput] = useState("");

  const [showInfoMessage, setShowInfoMessage] = useState(false);

  const [cookies, setCookie] = useCookies("");

  //const [hovering, setHovering] = useState("");

  const history = useHistory();

  const { t } = useTranslation();

  const clickSignUp = () => {

    if (validateEmail(signUpBarInput)) {
      // Make sure info message is hidden
      setShowInfoMessage(false);

      // Set userToken in cookies
      setCookie("userData",
        {
          eMail: signUpBarInput,
        }, {
        path: '/',
        secure: true,
        sameSite: "none"
      });

      // Redirect user to signUp page
      history.push(`/${props.routes.signUp}`)
    } else {
      // Show info message about wrong password
      setShowInfoMessage(true);

      console.log(cookies);
    }
  };

  return (
    <div
      className="signUpBar"
      style={props.styles.signUpBar}
    >
      <div
        className="signUpBackground"
        style={{ backgroundImage: `url(${getImageByKey("signUpBackground")})` }}
      />

      <div className="signUpWelcomeText">
        {t("signUpBar.welcomeText")}
      </div>

      <div className="signUpRow">

        <input
          className="signUpBarInput"
          type="email"
          value={signUpBarInput}
          onChange={(e) => setSignUpBarInput(e.target.value)}
          placeholder={t("signUpBar.inputPlaceholderEmail")}
        />

        <button
          className="signUpBarBTN"
          type="submit"
          value="signUp"
          style={props.styles.signUpBarBTN}
          onClick={() => clickSignUp()}
        >
          {t("signUpBar.signupButton")}
        </button>

      </div>

      <div
        className="signUpBarInfoMessage"
        style={showInfoMessage ? { display: "flex" } : { display: "none" }}
      >
        {t("signUpBar.errorIncorrectEmailAddress")}
      </div>

    </div>
  );
}

export default SignUpBar;

