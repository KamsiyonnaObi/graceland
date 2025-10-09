// import { CheckboxFilters } from "./filters/checkbox/CheckboxFilters";
import PriceFilters from "./filters/price/PriceFilters";

/**
 *  !TODO -- uncomment checkbox filters after products
 *  !TODO -- have been categorized in the DB
 */
const Filter = () => {
  return (
    <>
      {/*<CheckboxFilters />*/}
      <PriceFilters />
    </>
  );
};

export default Filter;
