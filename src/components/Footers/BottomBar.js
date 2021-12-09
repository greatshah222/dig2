import { useHistory, Link } from 'react-router-dom';
import { getImageByKey } from '../../scripts/getImageByKey';
import { useTranslation } from 'react-i18next';
import * as classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BottomBar2 = (props) => {
  const history = useHistory();

  const { t } = useTranslation();

  return (
    <div className={`${classes.Footer} font-200`}>
      <div className={classes.Footer_Description}>
        <div className={classes.Footer_Description_Heading}>
          <img
            className='navBarSiteLogo'
            src={getImageByKey('siteLogo')}
            title={t('footer.hoverLogoBackToHome')}
            alt='SiteName'
            onClick={() => history.push('/')}
            style={props?.styles?.navBar}
          />
        </div>
        <div className={classes.Footer_Description_Heading_Info}>
          {/*Digital Tree is a OTT solution that provides сontent delivery platform
          and applications with cutting-edge features and business tools. If you
          want to create your own OTT Platform, visit
          https://staging1.digitaltree.icareus.com */}
        <br/>
        {t('footer.copyRight')}
        </div>
      </div>
      <div className={classes.Footer_Menu}>
        <div className={classes.Footer_Menu_Heading}>{t('footer.menu')}:</div>
        <div className={classes.Footer_Menu_info}>
          {/* <div className={classes.Footer_Menu_Links}>
            <Link>About us</Link>
          </div> */}
          <div className={classes.Footer_Menu_Links}>
            <Link to={`/${props.routes.tos}`}>{t('footer.tos')}</Link>
          </div>
          <div className={classes.Footer_Menu_Links}>
            <Link to={`${props.routes.contactus}`}>{t('footer.contactUs')}</Link>
          </div>
        </div>
      </div>
      <div className={classes.Footer_SocialMedia}>
        <div className={classes.Footer_SocialMedia_Heading}>{t('footer.socialMedia')}:</div>
        <div className={classes.Footer_SocialMedia_Heading_Info}>
          <div className={classes.Footer_SocialMedia_Links}>
            <FontAwesomeIcon
              icon={['fab', 'facebook']}
              className={classes.Footer_SocialMedia_Links_icons}
            />{' '}
            <a
              href='https://www.facebook.com/digitaltv.com.cy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Facebook{' '}
            </a>
          </div>
          <div className={classes.Footer_SocialMedia_Links}>
            <FontAwesomeIcon
              icon={['fab', 'instagram']}
              className={classes.Footer_SocialMedia_Links_icons}
            />
            <a
              href='https://www.instagram.com/digitaltv.com.cy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Instagram
            </a>
          </div>
          {/* <div className={classes.Footer_SocialMedia_Links}>
            <FontAwesomeIcon
              icon={['fab', 'twitter']}
              className={classes.Footer_SocialMedia_Links_icons}
            />
            <Link> Twitter</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BottomBar2;
