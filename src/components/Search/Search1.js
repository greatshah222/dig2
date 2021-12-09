import { useMyContext } from '../../contexts/StateHolder';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderItem from '../ViewAssets/RenderItems/RenderItem';
import { searchAssets } from '../../scripts/dataHandlers';
import * as classes from './Search.module.css';

const Search1 = (props) => {
  // Destructure props.settings
  const { routes, itemImageComponent, itemTitleComponent } = props.settings;

  // Bring stateholders from context
  const { language, organizationId, user } = useMyContext();

  // Holders for controlled inputs
  const [searchFieldInput, setSearchFieldInput] = useState("");

  const [checkAll, setCheckAll] = useState(true);
  const [checkMovies, setCheckMovies] = useState(false);
  const [checkSeries, setCheckSeries] = useState(false);

  const [results, setResults] = useState({});

  const [searchDone, setSearchDone] = useState(false);

  const [chosenResultFilter, setChosenResultFilter] = useState('newFirst');

  // Setup translate function
  const { t } = useTranslation();

  const doSearch = (e) => {
    e.preventDefault();
    console.log(language, organizationId, user);

    async function getData() {
      try {
        // Call getAssets datahandler to get list of all items from category

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

          // Set searchDone to true
          setSearchDone(true);

          console.log('hep');
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  };

  const renderResults = () => {
    let renderArray = [];

    console.log(results);
    // Check checkbox statuses and filter requested results
    if (checkMovies) {
      renderArray = results.assets;
    } else if (checkSeries) {
      renderArray = results.series;
    } else {
      renderArray = [...results.assets, ...results.series];
    }

    // Check for result filter, if it's by date or alphabetically and sort renderArray
    if (chosenResultFilter === 'newFirst') {
      renderArray.sort((a, b) => b.releaseYear - a.releaseYear);
    } else {
      renderArray.sort((a, b) => {
        const aName = a.isSerie ? a.programName : a.name;
        const bName = b.isSerie ? b.programName : b.name;
        return aName.localeCompare(bName);
      });
    }

    return (
      <div>
        <div
          className={classes.row}
          style={
            searchDone
              ? { display: 'flex', flexDirection: 'row' }
              : { display: 'none' }
          }
        >
          <div className={`${classes.resultsAmount} font-300`}>
            {`${renderArray.length} ${t('videos')}`}
          </div>
          <div className={classes.form_button}>
            <button
              className={
                chosenResultFilter === 'newFirst'
                  ? classes.searchResultBTNactive
                  : classes.searchResultBTN
              }
              onClick={() => setChosenResultFilter('newFirst')}
            >
              {t('Newest first')}
            </button>
            <button
              className={
                chosenResultFilter === 'alphabet'
                  ? classes.searchResultBTNactive
                  : classes.searchResultBTN
              }
              onClick={() => setChosenResultFilter('alphabet')}
            >
              {t('A-Z')}
            </button>
          </div>
        </div>
        <div className={classes.resultsGrid}>
          {renderArray.map((item, i) => (
            <RenderItem
              key={i}
              styles={props.styles}
              item={item}
              routes={routes}
              itemImageComponent={itemImageComponent}
              itemTitleComponent={itemTitleComponent}
            />
          ))}
        </div>
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
                {t('search.searchButton')}
              </button>
            </div>
          </div>
        </form>
        <div className={classes.search_form_label}>
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
            {t('Show All')}
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
            {t('Only Movies')}
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
            {t('Only Series')}
          </label>
        </div>
      </div>
      {Object.keys(results).length > 0 ? renderResults() : null}
    </>
  );
};

export default Search1;
