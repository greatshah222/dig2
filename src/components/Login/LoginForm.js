import { useMyContextFunctions } from '../../contexts/ContextFunctions';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import { getImageByKey } from '../../scripts/getImageByKey';
import { useForm } from '../../Shared/Hooks/form-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from '../../Shared/Validation/Validator';
import { Input } from '../../Shared/Input/Input';
import * as classes from '../../Shared/Input/Input.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useMyContext } from '../../contexts/StateHolder';

// Renders contentRatings of chosen item
const LoginForm = (props) => {
  // Bring stateholders from context
  const { authProcess } = useMyContextFunctions();
  const { goBackToPrevious, setGoBackToPrevious, user } = useMyContext();

  // we need to import UseForm hook and pass the initial inputs and initialFormValidity to userform
  const [state, InputHandler] = useForm(
    {
      EMAIL: {
        value: '',
        isValid: false,
      },
      PASSWORD: {
        value: '',
        isValid: false,
      },
    },
    false
    // the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
  );

  const { t } = useTranslation();

  const history = useHistory();

  // Handle the click of "Next" button
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(state.inputs.EMAIL.value, state.inputs.PASSWORD.value);

    try {
      // Do the signUp/login process
      const authResponse = await authProcess(
        state.inputs.EMAIL.value,
        state.inputs.PASSWORD.value
      );

      if (authResponse.data.status === 'error') {
        return toast.error(authResponse.data.message, {
          autoClose: 10000,
          position: 'top-center',
          closeOnClick: true,
          draggable: true,

          theme: 'dark',
        });
      } else {
        setGoBackToPrevious(false);
        goBackToPrevious
          ? history.goBack()
          : history.push(`${props.routes.home}`);

        console.log(user);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(history);

  return (
    <div
      className='loginViewBackground'
      style={
        props.background
          ? { backgroundImage: `url(${getImageByKey('signUpBackground')}` }
          : { backgroundImage: `none` }
      }
    >
      <ToastContainer />
      <div className='loginViewContainer'>
        <div className={classes.formPrimary}>
          <div className={classes.formSecondary}>
            <form className={classes.formBlog} onSubmit={formSubmitHandler}>
              <h2
                className={`${classes.formHeader} font-600`}
                style={{ paddingBottom: goBackToPrevious && '0px' }}
              >
                {t('loginForm.title')}
              </h2>
              {goBackToPrevious && (
                <p
                  className='font-400'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {t('loginForm.loginForAccess')}
                </p>
              )}

              <Input
                id='EMAIL'
                label='EMAIL'
                placeholder={t('loginForm.askForEmail')}
                type='text'
                element='input'
                validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
                errorText={t('loginForm.errorIncorrectEmailAddress')}
                onInput={InputHandler}
                iconName='envelope'
              />
              <Input
                id='PASSWORD'
                label='PASSWORD'
                placeholder={t('loginForm.askForPassword')}
                type='Password'
                element='input'
                validators={[VALIDATOR_REQUIRE()]}
                errorText={t('loginForm.wrongPassword')}
                onInput={InputHandler}
                iconName='lock'
              />

              <button
                className={classes.loginFormButton}
                disabled={!state.isValid}
              >
                {t('loginForm.loginButton')}
              </button>
              <div className={`${classes.loginRow} font-100`}>
                {`${t('loginForm.newUserLink')}  `}{' '}
                <Link to={`${props.routes.signUp}`}>
                  {t('loginForm.signUpLink')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
