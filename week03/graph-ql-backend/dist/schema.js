const persons = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@mail.com',
        age: 25,
    },
    {
        id: '2',
        name: 'Jane Doe',
        email: 'jane@mail.com',
        age: 30,
    },
    {
        id: '3',
        name: 'John Smith',
        email: 'jonny@mail.com',
        age: 35,
    },
];
export const typeDefs = `#graphql
type Person {
  id: ID!
  name: String!
  age: Int
  email: String!
}
type Query {
  persons: [Person]
}
`;
export const resolvers = {
    Query: {
        persons: () => persons,
        person: (id) => persons.find(p => p.id === id),
    }
};
