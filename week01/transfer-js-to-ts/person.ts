export class Person {
    constructor(private readonly name: string, private readonly age: number, private readonly gender: string) {
    };

    getName(): string {
        return this.name;
    }

    getGender(): string {
        return this.gender;
    }

    getAge(): number {
        return this.age;
    }
}

export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
}
