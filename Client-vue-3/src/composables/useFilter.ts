import {computed, type ComputedRef, isRef, type Ref, ref} from "vue";

type WithIndex<T> = T & { [key: string]: any }

export function useFilter<T extends WithIndex<Record<string, any>>>(initialFilters?: T) {
    const filters = ref<T>((initialFilters || {}) as T)


    const hasActiveFilters = computed(() => {
        return Object.values(filters.value).some(
            value => value !== '' && value !== null && value !== undefined
        )
    })

    const activeFilters = computed(() => {
        const result: Record<string, string> = {};

        Object.entries(filters.value).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                result[key] = value as string;
            }
        })

        return result as T
    })

    const clearFilter = (key: keyof T) => {
        filters.value[key] = ''
    }

    const resetFilters = () => {
        Object.keys(filters.value).forEach(key => {
            filters.value[key] = ''
        })
    }

    const useFiltered = <R extends Record<string, any>>(
        collection: ComputedRef<R[]> | R[] | Ref<R[]>
    ): ComputedRef<R[]> => {
        return computed(() => {
            const source = isRef(collection)
                ? collection.value
                : collection

            if (!hasActiveFilters.value) {
                return source
            }

            return source.filter(row => {
                return Object.entries(activeFilters.value).every(([key, filterValue]) => {
                    if (!filterValue || String(filterValue).trim() === '') {
                        return true
                    }

                    const rowValue = row[key]
                    if (rowValue === undefined || rowValue === null) {
                        return false
                    }

                    const cellValue = String(rowValue).toLowerCase()
                    const searchValue = String(filterValue).toLowerCase()

                    return cellValue.includes(searchValue)
                })
            })
        })
    }

    return {
        filters,
        clearFilter,
        resetFilters,
        useFiltered,
        activeFilters,
        hasActiveFilters,
    }
}

