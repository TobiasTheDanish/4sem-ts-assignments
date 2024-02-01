import axios, { AxiosResponse } from "axios";
interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

interface Geo {
  lat: string
  lng: string
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}
async function main() {
	const userId1 = await axios
		.get("https://jsonplaceholder.typicode.com/users/1")
		.then((res:AxiosResponse<User>) => res.data);

	const users = await axios
		.get("https://jsonplaceholder.typicode.com/users")
		.then((res: AxiosResponse<Array<User>>) => res.data);

	function printUser(user: User): void {
		for (let [key, val] of Object.entries(user)) {
			console.log(`${key}: ${JSON.stringify(val)}`);
		}
	}

	printUser(userId1);
	users.forEach(printUser);
}

main();
