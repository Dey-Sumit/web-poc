export {};

/* type AppKeys = {
  readonly ios: {
    readonly staging: string;
    readonly production: string;
  };
  readonly android: {
    readonly staging: string;
    readonly production: string;
  };
};

const codepushKeys: AppKeys = {
  ios: {
    staging: 'ios-staging-key',
    production: 'ios-production-key',
  },
  android: {
    staging: 'android-staging-key',
    production: 'android-production-key',
  },
};



/* 
type AppKeys = {
  ios: {
    staging: string;
    production: string;
  };
  android: {
    staging: string;
    production: string;
  };
};

const keys: Readonly<AppKeys> = {
  ios: {
    staging: 'ios-staging-key',
    production: 'ios-production-key',
  },
  android: {
    staging: 'android-staging-key',
    production: 'android-production-key',
  },
};

keys.ios = 'a'; // This is not allowed

keys.ios.staging = 'a'; // This is allowed as Readonly only makes the top level keys readonly
*/

// To make the nested keys readonly, we need to use recursive Readonly type, we will see this later
/* 
=> recursive  Readonly type
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

type AppKeys = {
  ios: {
    staging: string;
    production: string;
  };
  android: {
    staging: string;
    production: string;
  };
};

const keys: DeepReadonly<AppKeys> = {
  ios: {
    staging: 'ios-staging-key',
    production: 'ios-production-key',
  },
  android: {
    staging: 'android-staging-key',
    production: 'android-production-key',
  },
};

 keys.android.production ="a" // now , this is not allowed
  */

// EASIEST WAY : use as const to make all the props readonly

/* const keys = {
  ios: {
    staging: 'ios-staging-key',
    production: 'ios-production-key',
  },
  android: {
    staging: 'android-staging-key',
    production: 'android-production-key',
  },
} as const;

 keys.android.production = 'a'; // now , this is not allowed 
*/

/* 
 create an object with codepush keys and values for ios and android as const
const codePushKeys = {
  ios: {
    staging: 'ios-staging-key',
    production: 'ios-production-key',
  },
  android: {
    staging: 'android-staging-key',
    production: 'android-production-key',
  },
} as const;

codePushKeys.android.production = '124'; // we should not be allowed to mutate the values

//  If you want to make the keys readonly, you can do this
type ReadonlyCodePushKeys = {
  readonly [K in keyof typeof codePushKeys]: typeof codePushKeys[K];
};

// if you want make the values readonly, you can do this
type ReadonlyCodePushKeysValues = {
  [K in keyof typeof codePushKeys]: Readonly<typeof codePushKeys[K]>;
};

// if you want to make a specific key readonly, you can do this
type ReadonlyCodePushKeysValues = {
  [K in keyof typeof codePushKeys]: K extends 'android'
    ? Readonly<typeof codePushKeys[K]>
    : typeof codePushKeys[K];
};

const codePushKeys2: Readonly = {
  ios: {
    staging: 'ios-staging-key',
    production: 'ios-production-key',
  },
  android: {
    staging: 'android-staging-key',
    production: 'android-production-key',
  },
};
*/
/* 

=> as const in an array

const AccordionKeys = ['name', 'age', 'gender', 'date-of-birth'];
AccordionKeys[0] = 'a'; // this is allowed without as this array is not readonly
AccordionKeys.push('a'); // this is allowed without as this array is not readonly

=> but let's say this array will never change, we can make it readonly by using as const


*/

const ACCORDION_KEYS = ['name', 'age', 'gender'] as const;
ACCORDION_KEYS[0] = 'a'; // this is not allowed
ACCORDION_KEYS.push('a'); // this is not allowed

let a = ACCORDION_KEYS[0];
a = 'abc'; // this is allowed as the type of a is string (without as const)

const ACCORDION_KEY_TO_STATE_MAP2: Record<'name' | 'age' | 'gender', string> = {};

// but what if we have a lot of keys (or it's always better to get the type from the Array) we can use typeof ACCORDION_KEYS[number] to get the union of all the keys

// Acc-keys to state mapping

// get the union of all the keys
type KEYS = typeof ACCORDION_KEYS[number];

const ACCORDION_KEY_TO_STATE_MAP: Record<KEYS, string> = {};

// We can use ReadOnlyArray to make the array readonly but it's not recommended as it does not return the individual elements as readonly
const ACCORDION_KEYS_2: ReadonlyArray<string> = ['name', 'age', 'gender'];
type KEYS_2 = typeof ACCORDION_KEYS_2[number];

// -------------

// SAME THING CAN BE DONE USING in operator

// in operator can be used to traverse a union type, for example:
// type Color = 'primary' | 'secondary' | 'tertiary';

// The syntax [P in keyof T]:K in TypeScript is used to define a mapped type that maps the keys of a type T to type K. This syntax is often used in conjunction with the keyof operator to create a new type that is based on the keys of an existing type.
type MyMappedType<T, P> = { [K in keyof T]: P };

/* you have one color array and tou want to create one theme object with all the colors

type Color = 'primary' | 'secondary' 

type ColorMap = {
  [key in Color]: string;

=> A BETTER TYPE
 type Color = 'primary' | 'secondary' 

type ColorMap = {
  readonly [key in Color]: `#${string}`|`rgb(${string})`;
};

const colors:ColorMap = {
  "primary":"#12",
  "secondary":"rgb(sad)"
}

};
 */

// { [key: string]: number } syntax. This syntax allows you to define an object type that has string keys and number values, without using the Record type.

// [key: string]: any;
type ObjectWithKeysInOrder = {
  [K in typeof ACCORDION_KEYS[number]]: any;
};

type a = typeof ACCORDION_KEYS[number];

const obj: ObjectWithKeysInOrder = {
  name: 'as',
  age: 12,
  gender: 'male',
};

// -------------

type CustomReadonly<T> = { readonly [P in keyof T]: T[P] };

type b = keyof typeof obj;
type c = CustomReadonly<typeof obj>; // type d = { [P in keyof c]: c[P] };
// https://stackoverflow.com/questions/51813272/declaring-string-type-with-min-max-length-in-typescript/54832231#54832231

// https://stackoverflow.com/questions/66212384/typescript-4-1-fixed-length-string-literal-type
