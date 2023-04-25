import { SortingState } from '@tanstack/react-table'

export function parseSorting(
  sortingParam: SortingState,
  defaultSorting: SortingState
): string {
  if (!sortingParam.length) {
    return `${defaultSorting[0].id},${defaultSorting[0].desc ? 'desc' : 'asc'}`
  }

  return `${sortingParam[0].id},${sortingParam[0].desc ? 'desc' : 'asc'}`
}
