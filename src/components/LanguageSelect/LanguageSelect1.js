import { useMyContext } from '../../contexts/StateHolder';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { BsChevronDown } from 'react-icons/bs';
import { BsChevronUp } from 'react-icons/bs';

// Renders contentRatings of chosen item
const LanguageSelect1 = (props) => {
  const { t, i18n } = useTranslation();
  console.log(i18n);

  // Bring stateholders from context
  const {
    closeHamMenu,
    isResponsiveclose,
    setLanguage,
    language,
    allLanguages,
  } = useMyContext();

  const [viewDropdown, setViewDropdown] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    closeHamMenu();
  };

  // Use ref to make sure react renders properly when clicking outside of box
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      // Set loginForm to false, if clicked on outside of element
      function handleClickOutside(event) {
        if (event.target.className === 'navBarBTN categories selected') {
          // Do nothing as button's onClick effect will deal with toggle (clicked button)
        } else if (ref.current && !ref.current.contains(event.target)) {
          // Hide dropdown
          setViewDropdown(false);
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  console.log(allLanguages, i18n.language);

  const renderDropdownButtons = () => {
    // Map through modified categories and make unique clickable button from every categoryName
    return allLanguages.map((el, i) => {
      return (
        <li
          key={el + i}
          onClick={() => {
            changeLanguage(el.value);
          }}
        >
          <div>{el.name}</div>{' '}
        </li>
      );
    });
  };

  const renderDropdown = () => {
    return (
      <div
        className='categoriesDropdown'
        style={
          viewDropdown
            ? {
                ...props.styles?.categoriesDropdown,
                display: 'flex',
              }
            : {
                ...props.styles?.categoriesDropdown,
                display: 'none',
              }
        }
        ref={wrapperRef}
      >
        {i18n.languages ? renderDropdownButtons() : null}
      </div>
    );
  };
  return (
    <div
      style={props.styles?.navBarBTN}
      onClick={() => {
        setViewDropdown(viewDropdown ? false : true);
      }}
    >
      <div className='categories_info'>
        {allLanguages?.find((el) => el.value === i18n.language)?.name}
        {!isResponsiveclose ? <FiChevronDown /> : <FiChevronRight />}
      </div>

      {renderDropdown()}
    </div>
  );
};

export default LanguageSelect1;
