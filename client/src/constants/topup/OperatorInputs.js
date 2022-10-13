export const LSLInputs = [
    {
        name: 'facility_name',
        label: 'Facility Name',
        type: 'text',
        required: true
    },
    {
        name: 'astrl_number',
        label: 'Licence Number',
        type: 'text',
        required: true
    },
    {
        name: 'number_lsl_units_recent',
        label: 'Number of non-contracted supportive living beds (not including those contracted as designed supportive living)',
        info: 'Number of non-contracted supportive living beds (not including those contracted as designed supportive living)',
        type: 'number',
        required: true
    },
    {
        name: 'licensed',
        info: 'If the facility is new or changed ownership to your organization (after March 15, 2020) please indicate when it was licensed',
        label: 'If the facility is new or changed ownership to your organization (after March 15, 2020) please indicate when it was licensed',
        type: 'date',
        onChange: "true"
    },
    {
        name: 'closed',
        info: 'If the facility has closed or changed ownership from your organization (before March 31, 2021) please indicate when it was closed/changed',
        label: 'If the facility has closed or changed ownership from your organization (before March 31, 2021) please indicate when it was closed/changed',
        type: 'date',
        onChange: "true"
    }
]

export const HospiceInputs = [
    {
        name: 'facility_name',
        label: 'Facility Name',
        type: 'textarea',
        required: true
    },
    {
        name: 'non_AHS_beds',
        label: 'Number of residential hospice beds not contracted by AHS (staffed 24 hours a day)',
        type: 'number',
        required: true
    },
    {
        name: 'new_facilties_date',
        label: 'If this is a new facility (opened since Mar 15, 2020), enter the date it was opened',
        type: 'date',
        onChange: "true"
    },
    {
        name: 'closed_facilties_date',
        label: 'If this a closed facility, enter the date it was closed',
        type: 'date',
        onChange: "handleChange"
    },
    {
        name: 'street_address',
        label: 'Street Address',
        type: 'string',
        required: true,
    },
    {
        name: 'city_or_town',
        label: 'City or Town',
        type: 'string',
        required: true,
    },
    {
        name: 'postal_code',
        label: 'Postal Code',
        type: 'string',
        required: true,
    },
]

export const MentalHealthInputs = [
    {
        name: 'is_AHS',
        label: 'Is this an AHS Contracted Facility?',
        type: 'bool',
    },
    {
        name: 'facility_name',
        label: 'Facility Name',
        type: 'text',
        required: true
    },
    {
        name: 'total_beds',
        label: 'Maximum occupancy (including beds closed due to public health restrictions) from March 15, 2020 to March 31, 2021',
        type: 'number',
        required: true
    },
    {
        name: 'days_open',
        label: 'Number of days facility was open and operational from March 15, 2020 to March 31, 2021',
        type: 'number',
        required: true
    },
    {
        name: 'public_health_beds',
        label: 'Maximum occupancy based on public health restrictions',
        type: 'number',
        required: true,
    },
    {
        name: 'street_address',
        label: 'Street Address',
        type: 'string',
        required: true,
    },
    {
        name: 'city_or_town',
        label: 'City or Town',
        type: 'string',
        required: true,
    },
    {
        name: 'postal_code',
        label: 'Postal Code',
        type: 'string',
        required: true,
    },
]

export const AddictionsInputs = [
    {
        name: 'is_AHS',
        label: 'Is this an AHS Contracted Facility?',
        type: 'bool',
    },
    {
        name: 'facility_name',
        label: 'Facility Name',
        type: 'text',
        required: true
    },
    {
        name: 'total_beds',
        label: 'Maximum occupancy (including beds closed due to public health restrictions) from March 15, 2020 to March 31, 2021',
        type: 'number',
        required: true
    },
    {
        name: 'days_open',
        label: 'Number of days facility was open and operational from March 15, 2020 to March 31, 2021',
        type: 'number',
        required: true
    },
    {
        name: 'public_health_beds',
        label: 'Maximum occupancy based on public health restrictions',
        type: 'number',
        required: true,
    },
    {
        name: 'licence_number',
        label: 'Licence Number',
        type: 'number',
        required: false,
    },
    {
        name: 'street_address',
        label: 'Street Address',
        type: 'string',
        required: true,
    },
    {
        name: 'city_or_town',
        label: 'City or Town',
        type: 'string',
        required: true,
    },
    {
        name: 'postal_code',
        label: 'Postal Code',
        type: 'string',
        required: true,
    },
]