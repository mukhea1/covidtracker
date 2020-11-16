import React from 'react'
import MaterialTable from 'material-table'
import _ from 'lodash';

function Table({ countries }) {
    if (!countries) {
        return null;
    }
    // Use Lodash to sort array by 'name'
    countries = _.orderBy(countries, ['cases'], ['desc']);
    return (
        < MaterialTable
            title=""
            columns={
                [
                    { title: 'Country', field: 'country' },
                    { title: 'Cases', field: 'cases', type: 'numeric' }

                ]}
            data={countries}
            options={{
                searchable: false,
                sorting: true
            }}
        />
    )
}

export default Table
