{ // 1. Basic types
	const num: number = 0;
	const str: string = "Hello";
	const bool: boolean = true;
	const arr: Array<never> = [];
	const anyType: any = "123";
}

{ // 2. Enums
	enum Days {
		MONDAY,
		TUESDAY,
		WEDNESDAY,
		THURSDAY,
		FRIDAY,
		SATURDAY,
		SUNDAY,
	}

	enum StringDays {
		MONDAY = "Monday",
		TUESDAY = "Tuesday",
		WEDNESDAY = "Wednesday",
		THURSDAY = "Thursday",
		FRIDAY = "Friday",
		SATURDAY = "Saturday",
		SUNDAY = "Sunday",
	}

	type UnionDays = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
}

{ // 3. Classes
	class Person {
		constructor(private name:string, private readonly email: string, private age: number) {
		}

		getName(): string {
			return this.name;
		}

		setName(name: string): void {
			this.name = name;
		}

		getEmail(): string {
			return this.email;
		}

		getAge(): number {
			return this.age;
		}

		setAge(age: number): void {
			this.age = age;
		}
	}

	const person: Person = new Person("Tobias", "test@example.com", 25);

	class Employee extends Person {
		salary: number;
		constructor(name: string, email: string, age:number, salary: number) {
			super(name, email, age);
			this.salary = salary;
		}
	}

	const employee: Employee = new Employee("Tobias", "test@example.com", 25, 1000000);
}

{ // 4. Type assertion
	const anyType: any = "123";
	const stringType: string = anyType as string
}

{ // 5. Function with types
	function sum(a: number, b: number): number {
		return a+b;
	}
}

{ // 6. Tuples
	type HttpTuple = [number, string];

	const OK: HttpTuple = [200, "OK"];
	const BadRequest: HttpTuple = [400, "Bad request"];
	const NotFound: HttpTuple = [404, "Not found"];
	const InternalServerError: HttpTuple = [500, "Internal server error"];

	type PersonTuple = [string, number, string];
}

{ // 7. Union types
	function printAge(age: number | string): void {
		console.log(`Hi, im ${age} years old`);
	}

	type PersonType = {
		name: string,
		age: number | string,
		email: string,
	}

	const pType: PersonType = {
		name: "Tobias",
		email: "test@example.com",
		age: 25
	}
}

{ // 8. Generics

	function getFirst<T>(arr: Array<T>): T {
		return arr[0];
	}

	function combine<T extends object>(dst: T, src: T): T {
		return { ...src, ...dst };
	}
}

{ // 9. Array types

	const numOfArray: Array<number> = new Array(1,2,3,4,5);
	const ticTacToe: Array<Array<string>> = new Array(
		["-", "-", "-"],
		["-", "-", "-"],
		["-", "-", "-"],
	);
}

{ // 10. Exclamation mark

	// Part 1
	// A variable that might be null or undefined
	let nullableValue: string | null | undefined = "Hello";

	// Use the exclamation mark to assert that the value is non-null
	let nonNullableValue: string = nullableValue!;

	console.log(nonNullableValue); // Output: Hello

	function possibleUndefinedStringFunction(): string | undefined {
		const condition = false;
		if (condition) return undefined;

		return "string";
	}
	// Part 2
	// A variable that might be null or undefined
	let myString: string | undefined = possibleUndefinedStringFunction();
	// Use the exclamation mark to assert that the value is non-null
	let lemgth: number = myString!.length;
}

{// 11. question mark

	// Part 1
	// A function that takes an optional parameter
	function printName(name?: string) {
		console.log(name);
	}

	// Call the function without a parameter
	printName(); // Output: undefined
	// Call the function with a parameter
	printName("John"); // Output: John

	// Part 2
	// A type alias with an optional age property
	type OptionalPerson = {
		name: string;
		age?: number;
	};

	// Create a person object with an age property
	const agedPerson: OptionalPerson = {
		name: "Tobias",
		age: 25,
	}
	// Create a person object without an age property
	const nonAgedPerson: OptionalPerson = {
		name: "Tobias",
	}
}

{ // 12. Unions narrowing types

	function strOrNum(param: string | number): string | number {
		if (typeof param == "string") {
			return param;
		} else {
			return param * 2;
		}
	}
}

{ // 13. type assertion
	const anyType: any = "123";
	const strFromAny: string = anyType as string;
	const strFromAny2: string = <string>anyType;

	const inputDiv: HTMLInputElement = document.getElementById("myDiv") as HTMLInputElement;
}

{ // 14. Literal types combined with Union types

	type Directions = "left" | "right" | "up" | "down";

	function move(dir: Directions) {
		switch (dir){
			case "left":
				return 1;

			case "right":
				return 2;

			case "up":
				return 3;

			case "down":
				return 4;
		}
	}
}

{ // 15. in operator
	type Human = {
		eat: () => void,
	}

	type Alien = {
		fly: () => void,
	}

	function getCreator(creator: Human | Alien): () => void {
		if ("eat" in creator) {
			return creator.eat;
		} else {
			return creator.fly;
		}
	}
}

{ // 16. instanceof operator
	class Person {
		constructor(readonly name: string, readonly age: number) { }
	}

	class Car {
		constructor(readonly model: string, readonly manufacturingYear: number) { }
	}

	const person = new Person("Christian", 23);
	const car = new Car("BMW", 2020);

	function get(param: Person | Car): string {
		if (param instanceof Person) {
			return param.name;
		} else {
			return param.model;
		}
	}

	console.log(get(person));
	console.log(get(car));
}

{ // 17. type predicates
	interface Bird {
		fly(): void;
		layEggs(): void;
	}

	interface Fish {
		swim(): void;
		layEggs(): void;
	}

	// write a type predicate to narrow the type of the fish parameter
	function isFish(pet: Fish | Bird): pet is Fish {
		return (<Fish>pet).swim !== undefined;
	}

	function howToMove(pet: Fish | Bird) {
		if (isFish(pet)) {
			pet.swim();
		} else {
			pet.fly();
		}
	}

	const fish: Fish = {
		swim: () => console.log("Swimming"),
		layEggs: () => console.log("layingEggs"),
	}

	const bird: Bird = {
		fly: () => console.log("Flying"),
		layEggs: () => console.log("layingEggs"),
	}

	howToMove(fish);
	howToMove(bird);
}

{ // 18. Index Signatures
	interface Person {
		name: string,
		[key: string]: unknown,
	}

	const person: Person = {
		name: "Tobias",
		age: 25,
	}

	console.log(JSON.stringify(person));
}

{ // 19. Intersection types
	interface Person {
		name: string,
	}

	interface Student {
		studentId: string,
	}

	function combinePersonAndStudent(p: Person, s: Student): Person & Student {
		return { ...p, ...s };
	}

	const person: Person = {
		name: "Tobias",
	}
	const student: Student = {
		studentId: "123",
	}

	const sp = combinePersonAndStudent(person, student);
	console.log(sp);
}

