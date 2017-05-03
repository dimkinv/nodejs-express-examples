# Typescript 
* configurations
    * tsconfig.json
    * d.ts
    * npm @types
* variable assign
    * let, const, var
    * destructuring
    * spread (arrays and obects)
* Base Types
    * base js types
    * enums
    * void
* classes
    * private/public at constructor
* interfaces
    * optional properties
    * readonly properties `readonly x: number;`
    * function types `(source: string, subString: string): boolean`
    * implement
    * extends
* functions
    * declaration
    * inferring types
    * optional / default params
    * rest params `function buildName(firstName: string, ...restOfName: string[])`
    * this / arrow function
    * function overloading
    ```
    function pickCard(x: {suit: string; card: number; }[]): number;
    function pickCard(x: number): {suit: string; card: number; };
    function pickCard(x): any {
        //implementation
    } 
    ```
* generics
    * basics
    * constrains `loggingIdentity<T extends Lengthwise>(arg: T): T`
* enums
    * basics
    * binary
* modules
    * export
    * import
* decortors
    * class
    * property
* multiline strings


# strng to zeroes
* C = 0 0 00 0000 0 00

* CC = 0 0 00 0000 0 000 00 0000 0 00

* % = 00 0 0 0 00 00 0 0 00 0 0 0


