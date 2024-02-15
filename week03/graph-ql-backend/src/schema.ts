interface Person {
  id: string,
  name: string,
  age: number,
  phoneNumber: string,
  imageUrl?: string,
  address?: Address,
}

interface Address {
  street: string,
  city: string,
  zip: string,
  persons: BasePerson[],
}

const addresses: Address[] = [
  {
    street: 'Kongevej 4',
    city: 'Kgs Lyngby',
    zip: '2800',
    persons: [
      {
        id: '1',
        name: 'John Doe',
        phoneNumber: '88888888',
        age: 25,
      },
    ],
  },
  {
    street: 'Nørgaardsvej 30',
    city: 'Kgs Lyngby',
    zip: '2800',
    persons: [
      {
        id: '2',
        name: 'Jane Doe',
        phoneNumber: '88888888',
        age: 30,
      },
    ],
  },
  {
    street: 'Dronningevej 4',
    city: 'Dronningens Lyngby',
    zip: '2800',
    persons: [
      {
        id: '3',
        name: 'John Smith',
        phoneNumber: '88888888',
        age: 35,
      },
    ],
  },
]

let persons: Person[] = [
  {
    id: '1',
    name: 'John Doe',
    phoneNumber: '88888888',
    age: 25,
    imageUrl: "https://st2.depositphotos.com/2931363/6569/i/450/depositphotos_65699901-stock-photo-black-man-keeping-arms-crossed.jpg",
    address: addresses[0],
  },
  {
    id: '2',
    name: 'Jane Doe',
    phoneNumber: '88888888',
    age: 30,
    imageUrl: "https://st2.depositphotos.com/2931363/6569/i/450/depositphotos_65699901-stock-photo-black-man-keeping-arms-crossed.jpg",
    address: addresses[1],
  },
  {
    id: '3',
    name: 'John Smith',
    phoneNumber: '88888888',
    age: 35,
    imageUrl: "https://st2.depositphotos.com/2931363/6569/i/450/depositphotos_65699901-stock-photo-black-man-keeping-arms-crossed.jpg",
    address: addresses[2],
  },
]

export const typeDefs = `#graphql
type Person {
  id: ID!
  name: String!
  age: Int
  phoneNumber: String!
  imageUrl: String
  address: Address
}
type Address {
  street: String!
  city: String!
  zip: String!
  persons: [Person]
}
type Query {
  persons: [Person]
  addresses: [Address]
  getPersonByPhoneNumber(phoneNumber: String!): [Person]
  getAddressesByZip(zip: String!): [Address]
}
type Mutation {
  addPerson(name: String!, age: Int, phoneNumber: String!, addressId: Int, imageUrl: String): Person
  addAddress(street: String!, city: String!, zip: String!, personIds: [ID]): Address
  addPersonToAddr(personId: ID!, addressIndex: Int!): [Person]
  removePersonFromAddr(personId: ID!, addressIndex: Int!): [Person]
  deletePerson(personId: ID!): Person
}
`;
type BasePerson = Omit<Person, "address">
type BaseAddress = Omit<Address, "persons"> 

type AddPersonArgs = BasePerson & {addressId: number}
type AddAddressArgs = BaseAddress & {personIds: string[]}

type AddPersonToAddrArgs = {
  personId: string,
  addressIndex: number,
};
type RemovePersonFromAddrArgs = AddPersonToAddrArgs
type DeletePersonArgs = {personId: string};

export const resolvers = {
  Query: {
    persons: () => persons,
    addresses: () => addresses,
    getPersonByPhoneNumber: (_parent: never, args: {phoneNumber: string}, _context: never, _info:never) => {
      return persons.filter(p => p.phoneNumber == args.phoneNumber);
    },
    getAddressesByZip: (_parent: never, args: {zip: string}, _context: never, _info:never) => {
      return addresses.filter(a => a.zip == args.zip);
    }
  },
  Mutation: {
    addPerson: (_parent: never, args: AddPersonArgs, _context: never, _info:never) => {
      const newPerson: Person = {
        id: String(persons.length+1),
        name: args.name,
        age: args.age,
        phoneNumber: args.phoneNumber,
        imageUrl: args.imageUrl,
        address: addresses[args.addressId],
      };
      addresses[args.addressId].persons.push(newPerson);
      persons.push(newPerson);
      return newPerson;
    },
    addAddress: (_parent: never, args: AddAddressArgs, _context: never, _info:never) => {
      const addrPersons = persons.filter(p => args.personIds.includes(p.id));
      const newAddr: Address = {
        street: args.street,
        city: args.city,
        zip: args.zip,
        persons: addrPersons
      };
      persons = persons.map(p => {
        if (args.personIds.includes(p.id)) {
          p.address = newAddr;
        }

        return p
      });
      addresses.push(newAddr);
      return newAddr;
    },
    addPersonToAddr: (_parent: never, args: AddPersonToAddrArgs, _context: never, _info:never) => {
      addresses[args.addressIndex].persons.push(persons.find(p => p.id == args.personId)!);
      persons = persons.map(p => {
        if (p.id == args.personId) {
          p.address == addresses[args.addressIndex]
        }
        return p
      })

      return addresses[args.addressIndex].persons
    },
    removePersonFromAddr: (_parent: never, args: RemovePersonFromAddrArgs, _context: never, _info:never) => {
      addresses[args.addressIndex].persons = addresses[args.addressIndex].persons.filter(p => p.id != args.personId)
      persons = persons.map(p => {
        if (p.id == args.personId) {
          p.address == undefined
        }
        return p
      })

      return addresses[args.addressIndex].persons
    },
    deletePerson: (_parent: never, args: DeletePersonArgs, _context: never, _info:never) => {
      const removed = persons.find(p => p.id == args.personId);
      const addressIndex = addresses.indexOf(removed?.address!)
      addresses[addressIndex].persons = addresses[addressIndex].persons.filter(p => p.id != args.personId)
      persons = persons.filter(p => p.id != args.personId);

      return removed;
    },
  }
}
