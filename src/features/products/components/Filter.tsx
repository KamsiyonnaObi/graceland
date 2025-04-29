// import { CheckboxFilters } from "./filters/checkbox/CheckboxFilters";
import PriceFilters from "./filters/price/PriceFilters";

/**
 *  !TODO -- uncomment checkbox filters after products
 *  !TODO -- have been categorized in the DB
 */
const Filter = () => {
  return (
    <aside className="flex w-full flex-col border-r">
      {/*<CheckboxFilters />*/}
      <PriceFilters />
    </aside>
  );
};

export default Filter;
