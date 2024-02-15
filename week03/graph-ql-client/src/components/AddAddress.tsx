import './AddPerson.css'
import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";

const ADD_ADDRESS = gql`
mutation AddAddress($street: String!, $city: String!, $zip: String!, $personIds: [ID]) {
  addAddress(street: $street, city: $city, zip: $zip, personIds: $personIds) {
    city
    street
    zip
  }
}
`

export function AddAddress() {
  const [addAddressMutation] = useMutation(ADD_ADDRESS)

  const streetRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const zipRef = useRef<HTMLInputElement>(null)

  const handleForm = () => {
    addAddressMutation({
      variables: {
        street: streetRef.current?.value, 
        city: cityRef.current?.value,
        zip: zipRef.current?.value,
        personIds: []
      }
    })
  }

  return (
    <>
      <form className='form' onSubmit={handleForm}>
        <label >
          street
        </label>
        <input name='street' ref={streetRef} required/>
        <label >
          City
        </label>
        <input name='city' ref={cityRef} required/>
        <label >
          Zip
        </label>
        <input name='zip' ref={zipRef} required/>
        <input type='submit' value={"Add Address"}/>
      </form>
    </>
  );
}
