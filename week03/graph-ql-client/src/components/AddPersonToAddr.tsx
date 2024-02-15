import { gql, useMutation, useQuery } from "@apollo/client"
import { useRef } from "react";

const ADD = gql`
mutation Mutation($personId: ID!, $addressIndex: Int!) {
  addPersonToAddr(personId: $personId, addressIndex: $addressIndex) {
    id
  }
}
`

const GET_PERSONS = gql`
query Persons {
  persons {
    name
    age
    id
  }
}
`

interface Person {
  name: string,
  age: number,
  id: string,
}

interface GetPersonsQuery {
  persons: Person[]
}

export function AddPersonToAddr({addrIndex}: {addrIndex: number}) {
  const {loading: personsLoading, error: personsError, data: persons} = useQuery<GetPersonsQuery>(GET_PERSONS);
  const [addMutation] = useMutation(ADD);
  const personRef = useRef<HTMLSelectElement>(null)

  const handleAdd = () => {
    addMutation({
      variables: {
        personId: personRef.current?.value,
        addressIndex: addrIndex,
      }
    })
  }

  return (
    <>
      <form>
        <select ref={personRef}>
          {
            persons?.persons.map((p) => {
              return <option key={p.id} value={p.id}>{p.name}, {p.age} years old</option>
            })
          }
        </select>
        <input type="submit" disabled={personsLoading || personsError != undefined} value={"Add"} onClick={handleAdd} />
      </form>
    </>
  )
}
