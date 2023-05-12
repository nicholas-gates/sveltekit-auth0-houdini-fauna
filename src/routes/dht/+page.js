export const ssr = false;

import { graphql } from '$houdini'
import { error } from '@sveltejs/kit'

import { isAuthenticated, user } from "../../store";


export const _houdini_load = graphql(`
    query DhtReadingsByTimeRange($startTs: String!, $endTs: String!) {
        getDhtReadingsByTimeRange(
            startTs: $startTs
            endTs: $endTs
        ) {
            _id
            tempFahr
            tempCel
            humidity
            modifiedAt
            createdAt
        }
    }
`)

// This is the function for the AllItems query.
// Query variable functions must be named _<QueryName>Variables.
/* @type { import('./$houdini').AllItemsVariables } */
export const _DhtReadingsByTimeRangeVariables = (event) => {

    const startTs = event.url.searchParams.get('s') ?? '2021-03-19T00:01:24.697092Z'
    const endTs = event.url.searchParams.get('e') ?? '2023-06-19T00:01:24.697092Z'

    // console.log({
    //     ...getSearchParams(event)
    // })
    return {
        ...getSearchParams(event)
    }
}

/**
 * @param { import('./$houdini').AfterLoadEvent }
 */
export const _houdini_afterLoad = ({ event, data }) => {
    if (!data.DhtReadingsByTimeRange) {
        throw error(404, "Missing data.DhtReadingsByTimeRange")
    }

    // add the search params to the data
    return {
        user,
        isAuthenticated,
        urlSearchParams: {
            ...getSearchParams(event),
        },
    }
}

/**
 *
 * @param {*} event
 * @returns @type { startTs: string, endTs: string} object with startTs and endTs
 */
const getSearchParams = (event) => {
    return {
        startTs: event.url.searchParams.get('startTs') ?? '2021-03-19T00:01:24.697092Z',
        endTs: event.url.searchParams.get('endTs') ?? '2023-06-19T00:01:24.697092Z'
    }
}