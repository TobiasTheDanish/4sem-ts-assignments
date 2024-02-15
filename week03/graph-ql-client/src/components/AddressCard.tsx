import { CSSProperties, useState } from 'react';
import './PersonCard.css'
import { Address } from './AddressList';
import { AddPersonToAddr } from './AddPersonToAddr';

interface AddressCardParams {
  addr: Address,
  style: CSSProperties,
  index: number,
}

export function AddressCard({ addr, style, index }: AddressCardParams) {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    setIsAdding(true);
  }

  return (
    <div style={style} className='card'>
      <div className="card-header">
        <div className="card-text-container">
          <h1 className="card-title">{addr.street}</h1>
          <p className="card-muted">{addr.zip}, {addr.city}</p>
        </div>
      </div>
      <div>
        <p className='card-desc'>
          Persons living here:
        </p>
        <ul>
          { addr.persons.map((p) => {
            return (
              <li>{p.name}, {p.age} years old</li>
            )
          })
          }
        </ul>
      </div>
      <div>
        { isAdding ? (
          <AddPersonToAddr addrIndex={index}/>
        ) : (
        <button onClick={handleClick}>
          Add person
        </button>
        )}
      </div>
    </div>
  )
}
