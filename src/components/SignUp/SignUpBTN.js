import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Renders contentRatings of chosen item
const SignUp = (props) => {

  const history = useHistory();

  const { t } = useTranslation();

  return (
    <div className="signUpContainer">
      <div className="signUpBTN"
        onClick={() => history.push(`/${props.routes.signUp}`) }
      >
        {t("signUpBar.signUpButton")}
      </div>
    </div>
  );
}

export default SignUp;

