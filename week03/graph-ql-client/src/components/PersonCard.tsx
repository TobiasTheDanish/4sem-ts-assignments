import { CSSProperties } from 'react';
import './PersonCard.css'
import { Person } from "./PersonList";
import { gql, useMutation } from '@apollo/client';

interface PersonCardParams {
  person: Person,
  style: CSSProperties,
}

const REMOVE_PERSON = gql`
mutation Mutation($personId: ID!) {
  deletePerson(personId: $personId) {
    id
  }
}
`

export function PersonCard({ person, style }: PersonCardParams) {
  const [deletePerson] = useMutation(REMOVE_PERSON);

  const handleClick = () => {
    deletePerson({
      variables: {
        personId: person.id,
      },
    });
  }

  return (
    <div style={style} className='card'>
      <div className="card-header">
        <div className="card-text-container">
          <h1 className="card-title">{person.name}</h1>
          <p className="card-muted">{person.age} years old</p>
        </div>
        { person.imageUrl && <img className='card-header-img' src={person.imageUrl} alt="Image of this person"/> }
      </div>
      {person.address && (<p className='card-desc'>Lives at {person.address.street}, {person.address.zip} {person.address.city}</p>)}
      <button onClick={handleClick}>
        Delete
      </button>
    </div>
  )
}
