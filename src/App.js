import './App.css';
import NavBar from './components/NavBars/NavBar';
import CategoryContentSimiliar from './components/ViewAssets/Sliders/CategoryContentSimiliar';
import DetailsVideo from './components/Details/DetailsVideo';
//import DetailsSerie from './components/Details/DetailsSerie';
import FAQ from './components/FAQ/FAQ';
import TOS from './components/TOS/TOS';
//import ChosenCategoryGrid from './components/ViewAssets/Grids/ChosenCategoryGrid';

import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useMyContext } from './contexts/StateHolder';
import BottomBar from './components/Footers/BottomBar';
import Profile from './components/Profile/Profile';
import settings from './configs/config_settings.json';
import Banner from './components/ViewAssets/Sliders/Banner';
import Promo from './components/ViewAssets/Sliders/Promo';
import Search from './components/Search/Search';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';

//import CategoriesWithTitles from './components/ViewAssets/Sliders/CategoriesWithTitles';
import { getCategories, getChannelStatus } from './scripts/dataHandlers';
//import RenderCategoryDropdown from './components/DropDowns/CategoryDropdown';
import LoginBTN from './components/Login/LoginBTN';
import NavBarButton from './components/NavBars/NavBarButton';
import AssetVideoPlayer from './components/VideoPlayer/AssetVideoPlayer';
import SignUpForm from './components/SignUp/SignUpForm';
import LoginForm from './components/Login/LoginForm';
import { useCookies } from 'react-cookie';
import './Shared/FontAwesomeIcon';
//import ListAllCategories from './components/Categories/ListAllCategories';
import SignUpBar2 from './components/SignUp/SignUpBar2';
import LiveVideoPlayer from './components/VideoPlayer/LiveVideoPlayer';
//import NavBarCategoryDropDown from './components/NavBars/NavBarCategoryDropdown';
import * as classes from './components/NavBars/NavBar.module.css';
import ListAllSeries from './components/ViewAssets/Sliders/Series/ListAllSeries';
import ContactUs from './components/ContactUs/ContactUs';

import EpisodesWithSerieTitles from './components/ViewAssets/Sliders/Series/EpisodesWithSerieTitles/EpisodesWithSerieTitles';
//import DetailsSerieContainer from './components/Details/DetailsSerieContainer';

//import DetailsItemDescription from './components/Details/DetailsItemDescription';
import DetailsSeasonsAndEpisodes from './components/Details/DetailsSeasonsAndEpisodes';
import Socials from './components/EmbedPlayer/EmbedPlayer';

// new slick

import 'react-multi-carousel/lib/styles.css';

// React spinner
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// toastify
import 'react-toastify/dist/ReactToastify.css';

// Google Analytics
import ReactGA from 'react-ga';
import LanguageSelect1 from './components/LanguageSelect/LanguageSelect1';

if (settings.googleAnalytics !== '') {
  // Initialize Google analytics with API-key from .env file
  ReactGA.initialize(settings.googleAnalytics);
}

function App() {
  // Bring stateholders from context
  const {
    setAllCategories,

    key,
    setKey,

    organizationId,
    setOrganizationId,

    language,
    setLanguage,

    user,
    setUser,
    //liveChannelPrivate,
    setLiveChannelPrivate,
    //allLanguages,
    setAllLanguages,
  } = useMyContext();

  const location = useLocation();

  const { t } = useTranslation();

  const [cookies] = useCookies('');
  const [loading, setLoading] = useState(true);

  // UseEffect that will re-trigger on every pagechange, sending current location to Google Analytics
  useEffect(() => {
    if (settings.googleAnalytics !== '') {
      // Report Google Analytics about user entering this page
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, [location]);

  /**** STEP 1, FIRST TIME INIT PROGRAM ****/
  useEffect(() => {
    async function initProgram() {
      try {
        // Set organizationId to context
        setOrganizationId(settings.organization.organizationId);

        // Set key to context
        setKey(settings.organization.key);

        // If there's existing userToken in cookies
        if (cookies?.userData?.userToken) {
          // Get user from context and copy it to modifiedUser
          let modifiedUser = { ...user };

          // Change status of user as logged in
          modifiedUser.loggedIn = true;

          // Set userToken from cookies
          modifiedUser.userId = cookies?.userData?.userId;

          // Set userToken from cookies
          modifiedUser.userToken = cookies?.userData?.userToken;

          // Update user in context, with modified data
          setUser(modifiedUser);
        }

        // Set language from config and set it to context
        setLanguage(settings.language);

        setAllLanguages(
          Object.keys(settings.languages).map((k) => settings.languages[k])
        );
      } catch (err) {
        console.log(err);
      }
    }

    initProgram();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // channel status (private or public)

  console.log(window.location.hostname);

  useEffect(() => {
    const fetchChannelStatus = async () => {
      const res = await getChannelStatus(
        settings.organization.organizationId,
        settings.organization.channelServiceId
      );
      console.log(res, 'channelStatus');
      if (res === 0) {
        // it meeans channeel is private and user neeeds to login
        setLiveChannelPrivate(true);
      } else {
        setLiveChannelPrivate(false);
      }
      setLoading(false);
    };

    if (organizationId) {
      fetchChannelStatus();
    }
  }, [organizationId, setLiveChannelPrivate]);

  /**** STEP 2, CHECK LANGUAGE AND GET CATEGORIES (STEP WILL BE REPEATED IF LANGUAGE CHANGES) ****/
  useEffect(() => {
    async function getAndSetCategories() {
      try {
        // Get categories from datahandler
        const categoryList = await getCategories(
          organizationId,
          key,
          language,
          user
        );

        // Set categories in context
        setAllCategories(categoryList);
      } catch (err) {
        console.log(err);
      }
    }

    // Get categories only if language is set
    if (language !== '') {
      getAndSetCategories();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return !loading ? (
    <div className='App'>
      <div className='container'>
        <Switch>
          <Route
            path={`/${settings.routes.shareAsset}/vod/:orgId/:asset`}
            exact
          >
            <Socials routes={settings.routes} />
          </Route>
          <Route>
            <NavBar
              links={
                <>
                  <div className={classes.navBarRow_primary}>
                    <NavBarButton
                      route={settings.routes.onlineTV}
                      name={t('navBar.onlineTV')}
                    />
                    {/*
                  <NavBarButton
                  route={settings.routes.movies}
                  name={'Movies'}
                />

                <NavBarButton
                  route={settings.routes.cartoons}
                  name={'Cartoons'}
                />
                <NavBarButton
                  route={settings.routes.sports}
                  name={'Sport'}
                />
                  */}

                    <NavBarButton
                      route={settings.routes.tvShows}
                      name={t('navBar.tvShows')}
                    />
                    <NavBarButton
                      route={settings.routes.contactus}
                      name={t('navBar.contactUs')}
                    />
                    {<LoginBTN routes={settings.routes} />}

                    <NavBarButton
                      route={settings.routes.search}
                      icon='FaSearch'
                      name={t('navBar.search')}
                    />
                    {/* <LanguageSelect1 /> */}

                    {/* <NavBarCategoryDropDown
                  styles={styles}
                  route={settings.routes.svodCategoriesRoute}
                /> */}
                  </div>
                  <div className={classes.navRight}>
                    {' '}
                    {/* {liveChannelPrivate && (
                      <NavBarButton
                        route={settings.routes.search}
                        name={t('navBar.search')}
                      />
                    )} */}
                    {/* <LanguageSelect1 /> */}
                    {/* {liveChannelPrivate && (
                      <LoginBTN routes={settings.routes} />
                    )} */}
                  </div>
                </>
              }
            />

            {/* ROUTE FOR FRONT PAGE */}
            <Route path='/' exact>
              <div className='homeContainer'>
                <Banner settings={settings.components.frontPageBanner_01} />

                <div className='hero-container'>
                  <Promo settings={settings.components.homepagePromo_01} />

                  {!user.loggedIn ? (
                    <SignUpBar2 routes={settings.routes} />
                  ) : null}

                  {/*<ListAllCategories
                settings={settings.components.ListAllCategories_01}
                styles={styles}
              />*/}

                  <ListAllSeries
                    settings={settings.components.homepageListAllSeries_01}
                    titleName={t('seriesSlider.title')}
                  />

                  <EpisodesWithSerieTitles
                    settings={settings.components.episodesWithSerieTitles_01}
                    showDuration={false}
                    showReleaseYear={false}
                  />

                  {/*<CategoriesWithTitles
                settings={settings.components.frontPageCategories_02}
                styles={styles}
              /> */}
                </div>
              </div>
            </Route>

            {/* ROUTE FOR SVOD VIDEO DETAILS VIEW*/}
            <Route path={`/${settings.routes.svodVideoRoute}/:asset`} exact>
              <DetailsVideo routes={settings.routes} />
              <CategoryContentSimiliar
                settings={settings.components.svodSimiliar_01}
              />
            </Route>

            {/* /* ROUTE FOR LIVE CHANNEL/ */}
            <Route path={`/${settings.routes.onlineTV}`} exact>
              <LiveVideoPlayer />
            </Route>

            {/* ROUTE FOR PLAY VIDEO*/}
            <Route path={`/${settings.routes.playVideo}/:orgId/:asset`}>
              <AssetVideoPlayer backRoute={'/'} playerAutoStart={true} />

              <DetailsVideo hideBanner={true} hideInfoData={true} />
            </Route>

            {/* ROUTE FOR PLAY SERIE*/}
            <Route
              path={`/${settings.routes.playSerie}/:orgId/:asset/:serieId?/:seasonId?`}
            >
              <AssetVideoPlayer
                backRoute={'hidden'}
                playerAutoStart={true}
                backButton={false}
                isSerie={true}
              />

              <DetailsVideo hideBanner={true} hideInfoData={true} />
              <DetailsSeasonsAndEpisodes
                playVideoRoute={settings.routes.playSerie}
              />
            </Route>

            {/* /* ROUTE FOR TV SHOWS/ */}
            <Route path={`/${settings.routes.tvShows}`} exact>
              <EpisodesWithSerieTitles
                settings={settings.components.episodesWithSerieTitles_02}
              />
            </Route>

            {/* ROUTE FOR SVOD SERIE CATEGORIES VIEW*/}
            <Route
              path={`/${settings.routes.svodSeriesCategoriesRoute}/:orgId/:asset/:serieId?/:seasonId?`}
              exact
            >
              {/* //hideCta hides play button */}
              <DetailsVideo
                hideCta={true}
                hideInfoData={true}
                isSerieCategory={true}
              />
              <DetailsSeasonsAndEpisodes
                playVideoRoute={settings.routes.playSerie}
              />
            </Route>

            {/* ROUTE FOR PROFILE VIEW*/}

            <Route path={`/${settings.routes.profile}`}>
              <Profile settings={settings.components.profile} />
            </Route>

            {/* ROUTE FOR FAQ VIEW*/}
            <Route path={`/${settings.routes.faq}`}>
              <FAQ />
            </Route>

            {/* ROUTE FOR TOS VIEW*/}
            <Route path={`/${settings.routes.tos}`}>
              <TOS />
            </Route>

            {/* ROUTE FOR SEARCH VIEW*/}
            <Route path={`/${settings.routes.search}`}>
              <Search settings={settings.components.search_01} />
            </Route>

            {/* ROUTE FOR LOGIN VIEW*/}

            <Route path={`/${settings.routes.login}`}>
              <LoginForm routes={settings.routes} />
            </Route>

            {/* ROUTE FOR SIGNUP VIEW*/}

            <Route path={`/${settings.routes.signUp}`}>
              <SignUpForm
                routes={settings.routes}
                settings={settings.components.signUp}
              />
            </Route>

            <Route path={`/${settings.routes.contactus}`}>
              <ContactUs />
            </Route>

            <BottomBar routes={settings.routes} />
          </Route>
        </Switch>
      </div>
    </div>
  ) : (
    <div
      className='display-flex-center'
      style={{ minHeight: '100vh', background: '#12161d' }}
    >
      <Loader type='TailSpin' color='#dfdfdf' height={50} width={50} />
    </div>
  );
}

export default App;
