import { useMyContext } from '../../contexts/StateHolder';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderItem from '../ViewAssets/RenderItems/RenderItem';
import { searchAssets } from '../../scripts/dataHandlers';
import * as classes from './Search.module.css';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { FaSearch } from 'react-icons/fa';

const Search = (props) => {
  // Destructure props.settings
  const {
    routes,
    itemImageComponent,
    itemTitleComponent,
    maintainImageAspectRatio,
    hideToggles,
  } = props.settings;

  // Bring stateholders from context
  const { language, organizationId, user } = useMyContext();

  // Holders for controlled inputs
  const [searchFieldInput, setSearchFieldInput] = useState('');

  const [checkAll, setCheckAll] = useState(true);
  const [checkMovies, setCheckMovies] = useState(false);
  const [checkSeries, setCheckSeries] = useState(false);

  const [renderArrayLength, setRenderArrayLength] = useState(0);

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState({
    assets: [],
    series: [],
  });

  const [searchDone, setSearchDone] = useState(false);

  const [chosenResultFilter, setChosenResultFilter] = useState('newFirst');

  // Setup translate function
  const { t } = useTranslation();

  const doSearch = (e) => {
    e.preventDefault();

    setSearchDone(false);
    setRenderArrayLength(0);
    setResults([]);
    setLoading(true);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function getData() {
      try {
        const response = await searchAssets(
          searchFieldInput,
          user,
          organizationId,
          language
        );

        if (response.data.status === 'ok') {
          // Set items in stateHolder
          setResults({
            assets: response.data.assets,
            series: response.data.series,
          });

          setRenderArrayLength(
            [...response.data.assets, ...response.data.series].length
          );

          // Set searchDone to true
          setSearchDone(true);

          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();

    return () => source.cancel();
  };

  const renderResults = () => {
    let renderArray = [];

    // Check checkbox statuses and filter requested results
    if (checkMovies) {
      renderArray = results.assets;
    } else if (checkSeries) {
      renderArray = results.series;
    } else {
      renderArray = [...results.series, ...results.assets];
    }

    // Check for result filter, if it's by date or alphabetically and sort renderArray
    if (chosenResultFilter === 'newFirst') {
      //renderArray.sort((a, b) => b.date - a.date); // API SHOULD GIVE NEW FIRST ORDER AUTOMATICALLY
    } else {
      renderArray.sort((a, b) => {
        const aName = a.isSerie ? a.title || a.name : a.name || a.title;
        const bName = b.isSerie ? b.title || b.name : b.name || b.title;
        return aName.localeCompare(bName);
      });
    }

    return (
      <div className={classes.resultsGrid}>
        {renderArray.map((item, i) => {
          let pushRoute = '';
          let imageType = '';
          if (item.isSerie && item.serie) {
            pushRoute = `/${routes.serieRoute}/${organizationId}/${item.id}`; //${item.serie.id}/${item.series[0].id === item.serie.id ? item.series[1].id : item.series[0].id}`;
            imageType = 'thumbnail';
          } else if (item.title) {
            pushRoute = `/${routes.svodSeriesCategoriesRoute}/${organizationId}/${item.id}/`; //${item.id}`; // /:orgId/:asset/:serieId?/:seasonId? -----> /${item.serieId}/${item.series[0].id}
            imageType = 'thumbnailSerie';
          } else {
            pushRoute = `/${routes.videoRoute}/${item.id}`;
          }
          return (
            <RenderItem
              key={i}
              item={item}
              pushRoute={pushRoute}
              itemImageComponent={itemImageComponent}
              itemTitleComponent={itemTitleComponent}
              imageType={imageType}
              showCategoryName={true}
              showPlayIcon={false}
              showDuration={props.showDuration}
              showReleaseYear={props.showReleaseYear}
              // whether to maintain aspect ratio 16/9
              maintainImageAspectRatio={maintainImageAspectRatio}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className={classes.searchContainer}>
        <form id={classes.searchForm} onSubmit={(e) => doSearch(e)}>
          {/* <h2>{t('Search and browse the content')}</h2> */}

          <div className={classes.searchRow}>
            <div className={`${classes.searchColumn} font-300`}>
              {/* <div className={classes.searchLabel}>{t('Search by name')}</div> */}
              <input
                className={`${classes.searchField} font-300`}
                type='text'
                value={searchFieldInput}
                onChange={(e) => setSearchFieldInput(e.target.value)}
                placeholder={t('search.searchByName')}
              />
            </div>

            <div>
              <button
                type='submit'
                className={classes.searchButton}
                disabled={!searchFieldInput}
              >
                <FaSearch className={classes.FaIcon} />
                {t('search.searchButton')}
              </button>
            </div>
          </div>
        </form>

        <div
          className={classes.searchRowNewOrAlphabetContainer}
          style={
            renderArrayLength > 0 && searchDone === true
              ? { display: 'flex' }
              : { display: 'none' }
          }
        >
          <div
            className={classes.search_form_label}
            style={
              hideToggles && hideToggles === true
                ? { display: 'none' }
                : { display: 'flex' }
            }
          >
            <label className={`${classes.searchCheckboxLabel} font-200`}>
              <input
                className={classes.searchCheckbox}
                type='checkbox'
                checked={checkAll}
                onChange={() => {
                  setCheckAll(true);
                  setCheckMovies(false);
                  setCheckSeries(false);
                }}
              />
              {t('search.showAll')}
            </label>

            <label className={`${classes.searchCheckboxLabel} font-200`}>
              <input
                className={classes.searchCheckbox}
                type='checkbox'
                checked={checkMovies}
                onChange={() => {
                  setCheckMovies(true);
                  setCheckAll(false);
                  setCheckSeries(false);
                }}
              />
              {t('search.showOnlyMovies')}
            </label>

            <label className={`${classes.searchCheckboxLabel} font-200`}>
              <input
                className={classes.searchCheckbox}
                type='checkbox'
                checked={checkSeries}
                onChange={() => {
                  setCheckSeries(true);
                  setCheckAll(false);
                  setCheckMovies(false);
                }}
              />
              {t('search.showOnlySeries')}
            </label>
          </div>
          <div
            className={classes.form_button}
            style={
              searchDone
                ? { display: 'flex', flexDirection: 'row' }
                : { display: 'none' }
            }
          >
            <button
              className={
                chosenResultFilter === 'newFirst'
                  ? classes.searchResultBTNactive
                  : classes.searchResultBTN
              }
              onClick={() => setChosenResultFilter('newFirst')}
            >
              {t('search.newFirst')}
            </button>
            <button
              className={
                chosenResultFilter === 'alphabet'
                  ? classes.searchResultBTNactive
                  : classes.searchResultBTN
              }
              onClick={() => setChosenResultFilter('alphabet')}
            >
              {t('search.alphabetically')}
            </button>
          </div>
        </div>

        <div
          className={`${classes.resultsAmount} font-300`}
          style={
            searchDone === true ? { display: 'flex' } : { display: 'none' }
          }
        >
          {renderArrayLength === 0 && searchDone === true
            ? `${t('search.searchNoMatch')}`
            : `${renderArrayLength} ${t('search.searchResults')}`}
        </div>
      </div>
      <div className={classes.bottomContainer}>
        {Object.keys(results).length > 0 ? (
          renderResults()
        ) : loading ? (
          <div className={classes.displayFlexCenter}>
            <Loader type='TailSpin' color='#dfdfdf' height={150} width={150} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Search;
