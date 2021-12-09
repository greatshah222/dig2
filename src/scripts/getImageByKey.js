import fi_all_ages from '../images/fi_all_ages.png';
import fi_above_7 from '../images/fi_above_7.png';
import fi_above_12 from '../images/fi_above_12.png';
import fi_above_16 from '../images/fi_above_16.png';
import fi_above_18 from '../images/fi_above_18.png';
import fi_distress from '../images/fi_distress.png';
import fi_sex from '../images/fi_sex.png';
import fi_violence from '../images/fi_violence.png';
import fi_drugs from '../images/fi_drugs.png';
import siteLogo from '../images/siteLogo.jpeg';
import flag_fi from '../images/flag_fi.png';
import flag_en from '../images/flag_en.png';
import flag_sv from '../images/flag_sv.png';
import bannerdemo from '../images/banner_demo.jpeg';
import bannerdemo_image1 from '../images/Guitar-Backgrounds-Images-HD-750x490.jpeg';
import bannerdemo_image2 from '../images/loss-cutting-point-trade-750x490.jpeg';
import bannerdemo_image3 from '../images/should_you_buy_an_apple_watch-750x490.jpeg';
import bannerdemo_image4 from '../images/The-Best-80s-Music-Background-750x490.jpeg';
import playButtonPoster from '../images/playButtonPoster.png';
import viewedSectionImage1 from '../images/pexels-photo-6-750x490.jpeg';
import viewedSectionImage2 from '../images/pexels-photo-48566-750x490.jpeg';
import editorChoiceIcon from '../images/Editor’s-Choice.svg';
import icareus_event_default from '../images/events_page_default_image.jpeg';
import channelBannerDemo from '../images/channelBannerDemo.jpeg';
import no_data_available from '../images/no_data_available.svg';
import no_channels_available from '../images/no_channels_available.svg';
import subOrganization_default_image from '../images/bannerdemo_image1.jpeg';
import comingSoon from '../images/comingSoon.jpg';
import comingSoonThumbnail from '../images/comingSoonThumbnail.jpg';
import comingSoonThumbnailSerie from '../images/comingSoonThumbnailSerie.jpg';
import signUpBackground from '../images/signUpBackground.png';

import symbolX from '../images/symbolX.png';
import contactus from '../images/contactus.svg';

const images = {
  fi_all_ages,
  fi_above_7,
  fi_above_12,
  fi_above_16,
  fi_above_18,
  fi_distress,
  fi_sex,
  fi_violence,
  fi_drugs,
  siteLogo,
  flag_fi,
  flag_en,
  flag_sv,
  comingSoon,
  signUpBackground,
  symbolX,
  bannerdemo,
  bannerdemo_image1,
  bannerdemo_image2,
  bannerdemo_image3,
  bannerdemo_image4,
  viewedSectionImage1,
  viewedSectionImage2,
  channelBannerDemo,
  subOrganization_default_image,
  no_channels_available,
  no_data_available,
  icareus_event_default,
  editorChoiceIcon,
  playButtonPoster,
  contactus,
  comingSoonThumbnail,
  comingSoonThumbnailSerie
};

const getImageByKey = (key) => {
  return images[key];
};

export { getImageByKey };
