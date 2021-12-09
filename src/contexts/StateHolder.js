import React, { useState, useContext } from 'react';

// First create the context
const MyContext = React.createContext();

// Then create a StateHolder wrapper component
// to hold the state that the components need.
const StateHolder = (props) => {
  // Chosen tab, frontPage by default
  const [chosenTab, setChosenTab] = useState('Home');

  // Chosen category
  const [chosenCategory, setChosenCategory] = useState({});

  // Stores all categories fetched with Axios
  const [allCategories, setAllCategories] = useState([]);

  // Stores all movie/serie items, fetched with Axios by using allCategories as groupItemId
  const [allCategoryItems, setAllCategoryItems] = useState({});

  // Stores all movie/serie items, fetched with Axios by using allCategories as groupItemId
  const [bannerItems, setBannerItems] = useState({});

  // Stores all movie/serie items, fetched with Axios by using allCategories as groupItemId
  const [promoItems, setPromoItems] = useState({});

  // Currently viewed item, used in showing details
  const [chosenItem, setChosenItem] = useState('');

  // Holds user data
  const [user, setUser] = useState({
    userId: 0,
    companyId: 0,
    groupId: 0,
    userToken: '',
    username: '',
    firstName: '',
    eMail: '',
    loggedIn: false,
  });

  // Language
  const [language, setLanguage] = useState('');

  // Holds state to toggle loginForm
  const [viewLoginForm, setViewLoginForm] = useState(false);

  // Holds style configuration for elements
  const [style, setStyle] = useState({});

  // Organization Id
  const [organizationId, setOrganizationId] = useState('');

  // Secret key
  const [key, setKey] = useState('');

  // Holds string of prioritized categories
  const [prioritized, setPrioritized] = useState('');

  // Holds string of banner groupItemId
  const [bannerId, setBannerId] = useState('');

  // Holds string of promo groupItemId
  const [promoId, setPromoId] = useState('');

  // Holds string of prioritized items
  const [prioritizedItems, setPrioritizedItems] = useState('');

  // Holds string of chosen URL to play
  const [chosenURL, setChosenURL] = useState('');
  // Holds string of chosen URL to play
  const [goBackToPrevious, setGoBackToPrevious] = useState(false);
  // Currently viewed item, used in showing details
  const [baseRoutes, setBaseRoutes] = useState({});

  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const [isMenu, setisMenu] = useState(false);
  const [chosenMenuOptionProfile, setChosenMenuOptionProfile] =
    useState('userDetails');

  // all languages
  const [allLanguages, setAllLanguages] = useState(null);
  // is serie
  const [isSerie, setisSerie] = useState(false);
  const [loading, setLoading] = useState(false);

  // live channel status
  const [liveChannelPrivate, setLiveChannelPrivate] = useState(false);
  const closeHamMenu = () => {
    setisMenu(false);
    setResponsiveclose(false);
  };

  return (
    <MyContext.Provider
      value={{
        chosenTab,
        setChosenTab,

        chosenCategory,
        setChosenCategory,

        allCategories,
        setAllCategories,

        allCategoryItems,
        setAllCategoryItems,

        chosenItem,
        setChosenItem,

        chosenURL,
        setChosenURL,

        user,
        setUser,

        viewLoginForm,
        setViewLoginForm,

        style,
        setStyle,

        language,
        setLanguage,
        chosenMenuOptionProfile,
        setChosenMenuOptionProfile,

        key,
        setKey,

        organizationId,
        setOrganizationId,

        prioritized,
        setPrioritized,

        bannerId,
        setBannerId,

        promoId,
        setPromoId,

        bannerItems,
        setBannerItems,

        promoItems,
        setPromoItems,

        prioritizedItems,
        setPrioritizedItems,

        baseRoutes,
        setBaseRoutes,

        goBackToPrevious,
        setGoBackToPrevious,

        isResponsiveclose,
        setResponsiveclose,

        isMenu,
        setisMenu,

        closeHamMenu,

        liveChannelPrivate,
        setLiveChannelPrivate,

        allLanguages,
        setAllLanguages,

        isSerie,
        setisSerie,

        loading,
        setLoading,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);

export default StateHolder;
