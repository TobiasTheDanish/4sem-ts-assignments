import * as client from '@apollo/client'
import { PersonCard } from './PersonCard';
import { Person } from './PersonList';
import { AddressCard } from './AddressCard';

export type BasePerson = Omit<Person, "address" | "imageUrl">

export interface Address {
  street: string,
  city: string,
  zip: string,
  persons: BasePerson[],
}

interface AddressQuery {
  addresses: Address[]
}

const GET_ADDRESSES = client.gql`
query Addresses {
  addresses {
    city
    persons {
      id
      name
      age
    }
    street
    zip
  }
}
`

export function AddressList() {
  const { loading, error, data } = client.useQuery<AddressQuery>(GET_ADDRESSES);
  
  if (loading) {
    return <p>Loading data...</p>
  } 

  if (error) {
    return <p>An error has occured. Error message: {error.message}</p>
  } 

  return data ? (
    data?.addresses.map((a, i) => {
      return (
        <AddressCard style={{
          marginBottom: "1em",
        }} key={i} index={i} addr={a}/>
      )
    }) 
  ) : (<h1>No data</h1>);

}
