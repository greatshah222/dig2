import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as classes from './SignUpBar.module.css';
// Renders contentRatings of chosen item
const SignUpBar2 = (props) => {
  //const [hovering, setHovering] = useState("");

  const history = useHistory();

  const { t } = useTranslation();

  const clickSignUp = () => {
    // Redirect user to signUp page
    history.push(`/${props.routes.signUp}`);
  };

  return (
    <div className='signUpBar2' style={props?.styles?.signUpBar}>
      <div className={`${classes.signUpBackground} `}>
        <div className={classes.signUpBar_description}>
          <div className={`${classes.signUpWelcomeText} font-700`}>
            {t('signUpBar.welcomeText1')}
          </div>
          <div className={`${classes.signUpWelcomeText2} font-500`}>
            {t('signUpBar.welcomeText2')}
          </div>
        </div>

        <div className={classes.signUpBar_button}>
          <button
            className={classes.signUpBarBTN}
            type='submit'
            style={props.styles?.signUpBarBTN}
            onClick={() => clickSignUp()}
          >
            {t('signUpBar.subscribe')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpBar2;
