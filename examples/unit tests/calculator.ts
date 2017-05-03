export class Calculator {
    plus(a: number, b: number): number {
        return a + b;
    }
}


export class User {
    constructor(public firstName: string, public lastName: string) {

    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}