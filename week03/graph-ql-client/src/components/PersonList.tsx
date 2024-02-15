import * as client from '@apollo/client'
import { PersonCard } from './PersonCard';

export interface Person {
  id: string,
  name: string,
  age: number,
  phoneNumber: string,
  imageUrl?: string,
  address?: Address,
}
export type BasePerson = Omit<Person, "address">

export interface Address {
  street: string,
  city: string,
  zip: string,
  persons: BasePerson[],
}

interface PersonQuery {
  persons: Person[]
}

const GET_PERSONS = client.gql`
query Persons {
  persons {
    id
    name
    phoneNumber
    age
    imageUrl
    address {
      city
      street
      zip
    }
  }
}
`

export function PersonList() {
  const { loading, error, data } = client.useQuery<PersonQuery>(GET_PERSONS);
  
  if (loading) {
    return <p>Loading data...</p>
  } 

  if (error) {
    return <p>An error has occured. Error message: {error.message}</p>
  } 

  return data ? (
    data?.persons.map(p => {
      return (
        <PersonCard style={{
          marginBottom: "1em",
        }} key={p.id} person={p}/>
      )
    }) 
  ) : (<h1>No data</h1>);

}
