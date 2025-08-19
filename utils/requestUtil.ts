import { FILTER_PARAMS_SEPARATOR } from "@/constants/FilterOperator";

type Val = string | number | boolean | null | undefined | { option: string | null; value: string | number | null };

type Obj = Record<string, Val>

export const toSearchParam = (filterObj: any, filterOperator: Obj) => {
  const filterEntry = Object.keys(filterObj)
    .map((key) => {
      if (filterObj[key] != null) {
        if (typeof filterObj[key] === 'object') {
          const { option, value } = filterObj[key]
          if (option != null && value && filterOperator[option] != null) {
            return option + filterOperator[option] + value
          }
          return null;
        }
        if (filterOperator[key]) {
          return key + filterOperator[key] + filterObj[key]
        }
      }
      return null
    })
    .filter((entry) => !!entry)
  return filterEntry.join(FILTER_PARAMS_SEPARATOR)
}
