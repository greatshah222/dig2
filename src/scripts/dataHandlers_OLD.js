import Axios from 'axios';
import {
  checkArguments,
  createAccountToken,
  createChangePasswordToken,
} from './utils';

// Get all category names and id:s
const getCategories = async (organizationId, key, lang, user, ls) => {
  if (checkArguments(organizationId, key, lang)) {
    try {
      const catResponse = await Axios.get(
        `https://suite.icareus.com/api/archive?action=getGroups&organizationId=${organizationId}&userId=${
          user?.userId || 0
        }&userToken=${
          user?.userToken || 0
        }&languageId=${lang}&token=${key}&groupTypeName=Folders&groupTypeId=${ls}`
      );
      console.log('getCategories: ', catResponse);
      return catResponse.data.groupItems;
    } catch (err) {
      console.log(err);
    }
  }
};

// Get subCategories with groupItemId string (single or separated by comma)
const getSubCategories = async (
  organizationId,
  token,
  groupItemId,
  lang,
  user
) => {
  if (checkArguments(organizationId, token, groupItemId, lang)) {
    try {
      const catResponse = await Axios.get(
        `https://suite.icareus.com/api/archive?action=getGroup&organizationId=${organizationId}&groupItemIds=${groupItemId}&userId=${
          user?.userId || 0
        }&userToken=${
          user?.userToken || 0
        }&languageId=${lang}&token=${token}&showHidden=true`
      );
      console.log('getSubCategories: ', catResponse);
      return catResponse.data.data;
    } catch (err) {
      console.log(err);
    }
  }
};

// Get all category names and id:s with root category id
const getRootSubCategories = async (
  organizationId,
  key,
  lang,
  groupItemId,
  user
) => {
  if (checkArguments(organizationId, groupItemId, key, lang, groupItemId)) {
    try {
      const catResponse = await Axios.get(
        `https://suite.icareus.com/api/archive?action=getGroups&organizationId=${organizationId}&userId=${
          user?.userId || 0
        }&userToken=${
          user?.userToken || 0
        }&languageId=${lang}&token=${key}&groupItemId=${groupItemId}`
      );
      console.log('getRootSubCategories: ', catResponse);
      return catResponse.data.groupItems;
    } catch (err) {
      console.log(err);
    }
  }
};

// Get assets that are listed in groupItemId -string
const getAssets = async (
  organizationId,
  groupItemId,
  token,
  lang,
  assetProperty,
  user
) => {
  if (checkArguments(organizationId, groupItemId, token, lang)) {
    try {
      const itemResponse =
        await Axios.get(`https://suite.icareus.com/api/publishing/getAssets?version=06&organizationId=${organizationId}&userId=${
          user?.userId || 0
        }
      
     
      &assetProperty=${
        assetProperty || ''
      }&languageId=${lang}&groupItemId=${groupItemId}&token=${token}`);
      console.log('getAssets: ', itemResponse);
      return itemResponse.data.assets;
    } catch (err) {
      console.log(err);
    }
  }
};

// Get items that are listed in groupItemId -string
const getSimiliar = async (
  organizationId,
  groupItemId,
  token,
  lang,
  assetProperty,
  user
) => {
  if (checkArguments(organizationId, groupItemId, token, lang, assetProperty)) {
    try {
      const itemResponse = await Axios.get(
        `https://suite.icareus.com/api/publishing/getAssets?version=06&organizationId=${organizationId}&userId=${
          user?.userId || 0
        }&userToken=${user?.userToken || 0}&assetProperty=${
          assetProperty || ''
        }&orderBy=publishStart&limit=10&languageId=${lang}&groupItemId=${groupItemId}&token=${token}`
      );
      console.log('getSimiliar: ', itemResponse);
      return itemResponse.data.assets;
    } catch (err) {
      console.log(err);
    }
  }
};

// Get items that are listed in groupItemId -string
const getAsset = async (organizationId, assetId, token, lang, user) => {
  if (checkArguments(organizationId, assetId, token, lang)) {
    try {
      const itemResponse = await Axios.get(
        `https://suite.icareus.com/api/publishing/getAsset?version=03&organizationId=${organizationId}&userId=${
          user?.userId || 0
        }&userToken=${
          user?.userToken || 0
        }&languageId=${lang}&assetId=${assetId}&token=${token}`
      );
      console.log('getAsset: ', itemResponse);
      return itemResponse.data;
    } catch (err) {
      console.log(err);
    }
  }
};

// Get serie episodes
const getEpisodes = async (
  organizationId,
  groupItemId,
  token,
  lang,
  assetProperty,
  user
) => {
  if (checkArguments(organizationId, groupItemId, token, lang, assetProperty)) {
    try {
      const episodeResponse = await Axios.get(
        `https://suite.icareus.com/api/publishing?action=getAssets&version=06&organizationId=${organizationId}&userId=${
          user?.userId || 0
        }&userToken=${user?.userToken || 0}&assetProperty=${
          assetProperty || ''
        }&languageId=${lang}&token=${token}&groupItemId=${groupItemId}&series=false`
      );
      console.log('getEpisodes: ', episodeResponse);
      return episodeResponse.data.assets;
    } catch (err) {
      console.log(err);
    }
  }
};

// Get promoted content
const getPromo = async (
  organizationId,
  groupItemId,
  token,
  lang,
  assetProperty,
  user
) => {
  if (checkArguments(organizationId, groupItemId, token, lang)) {
    try {
      const promoResponse = await Axios.get(
        `https://suite.icareus.com/api/publishing?action=getAssets&version=05&organizationId=${organizationId}&userId=${
          user?.userId || 0
        }&userToken=${user?.userToken || 0}&assetProperty=${
          assetProperty || ''
        }&languageId=${lang}&orderBy=publishStart&limit=3&token=${token}&groupItemId=${groupItemId}&series=false`
      );
      console.log('getPromo: ', promoResponse);
      return promoResponse.data.assets;
    } catch (err) {
      console.log(err);
    }
  }
};

// Get banner items
const getBanner = async (organizationId, groupItemId, token, lang, user) => {
  if (checkArguments(organizationId, groupItemId, token, lang)) {
    try {
      const bannerResponse = await Axios.get(
        `https://suite.icareus.com/api/publishing?action=getBanners&version=05&organizationId=${organizationId}&userId=${
          user?.userId || 0
        }&userToken=${
          user?.userToken || 0
        }&languageId=${lang}&token=${token}&groupItemId=${groupItemId}&series=false`
      );
      console.log('getBanner: ', bannerResponse);
      return bannerResponse.data.assets;
    } catch (err) {
      console.log(err);
    }
  }
};

// Authenticate user
const authenticateUser = async (organizationId, email, password) => {
  try {
    const authResponse = await Axios.get(
      `https://suite.icareus.com/api/login?action=authenticate&organizationId=${organizationId}&eMail=${email}&password=${password}`
    );
    console.log('Authentication: ', authResponse);
    return authResponse;
  } catch (err) {
    console.log(err);
  }
};

// Register user
const registerUser = async (
  organizationId,
  email,
  password,
  firstName,
  lastName,
  countryId,
  regionId,
  postalCode,
  cityName,
  phoneNumber
) => {
  /*
      api/register -> action = addSubscriber, muut parametrit: organizationId, firstName, lastName,
      screenName, languageId, password, countryId, regionId, address1, address2, postalCode, cityName, phoneNumber, emailAddress
      */
  try {
    const registerResponse = await Axios.get(
      `https://suite.icareus.com/api/register?action=addSubscriber&organizationId=${organizationId}&emailAddress=${email}&userPassword=${password}&firstName=${
        firstName ? firstName : 'x'
      }&lastName=${lastName ? lastName : 'x'}&countryId=${
        countryId ? countryId : 'x'
      }&regionId=${regionId ? regionId : 'x'}&postalCode=${
        postalCode ? postalCode : 'x'
      }&cityName=${cityName ? cityName : 'x'}&phoneNumber=${
        phoneNumber ? phoneNumber : 'x'
      }`
    );

    console.log('Register: ', registerResponse);
    return registerResponse;
  } catch (err) {
    console.log(err);
  }
};

const changePassword = async (
  organizationId,
  key,
  userId,
  newPassword,
  confirmPassword
) => {
  const token = createChangePasswordToken(
    organizationId,
    key,
    userId,
    newPassword,
    confirmPassword
  );

  try {
    // TODO: API CHANGES TO PASSWORD CHANGE REQUEST
    const changePasswordResponse = await Axios.get(
      `https://suite.icareus.com/delegate/account?action=changePassword&organizationId=${organizationId}&userId=${userId}&newPassword=${newPassword}&confirmPassword=${confirmPassword}&token=${token}`
    );

    console.log('ChangePassword: ', changePasswordResponse);
    return changePasswordResponse;
  } catch (err) {
    console.log(err);
  }
};

// Update user
const updateUser = async (
  userId,
  organizationId,
  key,
  firstName,
  lastName,
  phoneNumber,
  countryId,
  regionId,
  cityName,
  postalCode,
  eMail
) => {
  const token = createAccountToken(
    userId,
    organizationId,
    key,
    firstName,
    lastName,
    phoneNumber,
    countryId,
    regionId,
    cityName,
    postalCode,
    eMail
  );

  try {
    const updateResponse = await Axios.get(
      `https://suite.icareus.com/api/account?action=updateUser&organizationId=${organizationId}&firstName=${firstName}&lastName=${lastName}&emailAddress=${eMail}&countryId=${countryId}&regionId=${regionId}&postalCode=${postalCode}&cityName=${cityName}&phoneNumber=${phoneNumber}&token=${token}`
    );
    console.log('updateUser: ', updateResponse);
    return updateResponse;
  } catch (err) {
    console.log(err);
  }
};
// Get user data
const searchAssets = async (keyword, user, organizationId, language) => {
  try {
    const getSearchResponse = await Axios.get(
      `https://my.icareus.com/api/search/assets?action=searchAssets`,
      {
        params: {
          organizationId,
          keyword: keyword,
          ...(user?.userToken ? { userToken: user?.userToken } : {}),
          ...(language ? { language: language } : {}),
          ...(user?.userId ? { userId: user?.userId } : {}),
        },
      }
    );

    console.log('searchAsset: ', getSearchResponse);
    return getSearchResponse;
  } catch (err) {
    console.log(err);
  }
};

export {
  getCategories,
  getRootSubCategories,
  getSubCategories,
  getAssets,
  getSimiliar,
  getAsset,
  getEpisodes,
  getPromo,
  getBanner,
  authenticateUser,
  changePassword,
  registerUser,
  updateUser,
  searchAssets,
};
