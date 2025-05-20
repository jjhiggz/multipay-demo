import {
  useQuery,
  type UseQueryOptions,
  type UseQueryReturnType,
  type QueryKey,
} from '@tanstack/vue-query'
import { computed, type MaybeRef, type Ref, toValue } from 'vue'

interface MapOptions<TData, TError, TMappedData, TMappedError> {
  mapData?: (data: TData) => TMappedData
  mapError?: (error: TError) => TMappedError
}

// Define a more specific return type that reflects the potential mapping
// TQueryFnData: The type of data returned by the query function
// TError: The type of error returned by the query function
// TData: The type of data after select function (if any), defaults to TQueryFnData
// TMappedData: The type of data after the mapData function
// TMappedError: The type of error after the mapError function

// TDataActual is the type of data.value from the original queryResult
// TErrorActual is the type of error.value from the original queryResult
export function useMappedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData, // This TData is the type *after* a potential select function in queryOptions
  TQueryKey extends readonly unknown[] = readonly unknown[], // Simplified TQueryKey default
  TMappedData = TData, // Mapped data defaults to TData
  TMappedError = TError, // Mapped error defaults to TError
>(
  queryOptions: MaybeRef<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>>,
  mapOptions: MaybeRef<MapOptions<TData, TError, TMappedData, TMappedError>> = {},
) {
  // Call useQuery, using 'as any' for the options to bypass overly complex generic checks at this specific call site.
  // The caller of useMappedQuery is responsible for providing valid queryOptions.
  const queryResult = useQuery(queryOptions as any) as UseQueryReturnType<TData, TError>
  // Immediately cast queryResult to its expected type for type safety hereafter.

  const resolvedMapOptions = computed(() => toValue(mapOptions))

  const mappedData = computed(() => {
    const currentData = queryResult.data.value
    const currentMapData = resolvedMapOptions.value.mapData
    if (currentMapData && currentData !== undefined && currentData !== null) {
      return currentMapData(currentData) // currentData is already TData due to queryResult cast
    }
    return currentData as unknown as TMappedData
  })

  const mappedError = computed(() => {
    const currentError = queryResult.error.value
    const currentMapError = resolvedMapOptions.value.mapError
    if (currentMapError && currentError) {
      return currentMapError(currentError) // currentError is already TError
    }
    return currentError as unknown as TMappedError
  })

  // Spread the original queryResult and override data and error with mapped versions.
  const result = {
    ...queryResult,
    data: mappedData as Ref<TMappedData | undefined>,
    error: mappedError as Ref<TMappedError | null>,
  }

  // The return type reflects that data and error are mapped,
  // but other properties (like refetch) pertain to the original TData/TError.
  return result as Omit<UseQueryReturnType<TData, TError>, 'data' | 'error'> & {
    data: Ref<TMappedData | undefined>
    error: Ref<TMappedError | null>
  }
}
