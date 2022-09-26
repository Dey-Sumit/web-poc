// export type Language = 'EN' | 'DE' | 'IT';

// export interface Document {
//   generic: string;
//   languages: {
//     [key in Language]: boolean;
//   };
// }

// const a: Document = {
//   generic: 'generic',
//   languages: {
//     EN: true,
//     DE: false,
//     IT: true,
//     OP: true,
//   },
// };

//-------------
// create one union type for all the possible values of the tab data, NOT_WORKING
// type TabValue = typeof TAB_DATA[number]['value'];

// type X = keyof typeof TAB_DATA[number];

// ----------
// [key in keyof typeof TAB_DATA[number]]: TAB_OPTIONS[key];

export {};
