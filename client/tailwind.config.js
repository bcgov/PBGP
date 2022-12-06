/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['BCSans'],
            bold: ['BCSans-Bold'],
        },
        extend: {
            colors: {
                bcYellowPrimary: '#FCBA19',
                bcBlack: '#313132',
                bcDeepBlack: '#272833',
                bcGray: '#606060',
                bcGrayDisabled: '#808080',
                bcGrayDisabled2: '#585858',
                bcGrayInput: '#F5F5F5',
                bcGrayLabel: '#574F5A',
                bcLightGray: '#F2F2F2',
                bcBluePrimary: '#003366',
                bcBlueBorder: '#00478F',
                bcBlueBar: 'rgba(139, 199, 255, 0.2)',
                bcBlueAccent: '#38598A',
                bcBlueLink: '#1A5A96',
                bcBlueIndicator: '#0053A4',
                bcBrown: '#6C4A00',
                bcRedError: '#D8292F',
                bcDarkRed: '#d02c2f',
                bcGreenSuccess: '#256c35',
                bcGreenHiredText: '#2E8540',
                bcGreenHiredContainer: 'rgba(46, 133, 64, 0.2)',
                bcYellowWarning: '#F5A623',
                bcYellowBanner: '#EED202',
                bcLightBackground: '#E5E5E5',
                bcLightBlueBackground: '#D9EAF7',
                bcOrange: '#F6A622',
                bcDisabled: '#CFCFCF',
                bcYellowCream: '#F9F1C6',
                bcYellowCreamStroke: '#FAEBCC',
                bcDarkBlue: '#001a33',
                bcBannerSuccessBg: '#DFF0D8',
                bcBannerSuccessText: '#2D4821',
                bcDarkPurple: '#511A96',
                bcLightPurple: '#DBD9F7',
                bcDarkTeal: '#095954',
                bcLightTeal: '#D9F4F3',
                bcDarkYellow: '#664B07',
                bcLightYellow: '#FFF3D6',
            },
            fontSize: {
                '3xl': '1.5rem',
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            ringOffsetWidth: {
                10: '10px',
            },
            boxShadow: {
                '2xl': '0 4px 16px 0 rgba(35,64,117,0.3)',
            },
            minWidth: {
                5: '1.25rem',
            },
            width: {
                layout: '1140px',
            },
            letterSpacing: {
                widest: '.3em',
                wider: '.1em',
            },
            borderWidth: {
                10: '10px',
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            backgroundColor: ['disabled'],
            textColor: ['disabled'],
        },
    },
    plugins: [],
};