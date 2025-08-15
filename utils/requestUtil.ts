import { FILTER_PARAMS_SEPARATOR } from "@/constants/FilterOperator";

type Val = string | number | boolean | null | undefined;

type Obj = Record<string, Val>

export const toSearchParam = (filterObj: Obj, filterOperator: Obj) => {
  const filterEntry = Object.keys(filterObj)
    .map((key) => {
      if (filterOperator[key] && filterObj[key] != null) {
        return key + filterOperator[key] + filterObj[key]
      }
      return null
    })
    .filter((entry) => !!entry)
  return filterEntry.join(FILTER_PARAMS_SEPARATOR)
}
