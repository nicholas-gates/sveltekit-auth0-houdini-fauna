export const ssr = false;

import { graphql } from '$houdini'
import { error } from '@sveltejs/kit'

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
    console.log('⭐️⭐️⭐️ event', Object.keys(event.params))

    // make sure we recognize the value
    if (!event.params?.startTs || !event.params?.endTs) {
        throw error(400, 'invalid filter')
    }

    return event.params
}