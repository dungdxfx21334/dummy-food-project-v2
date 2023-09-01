import { useRef, useState } from 'react'
import classes from './Checkout.module.css'

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = props => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  })
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()
  const confirmHandler = event => {
    event.preventDefault()
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const nameIsValid = !isEmpty(enteredName)
    const streetIsValid = !isEmpty(enteredStreet)
    const postalCodeIsValid = isFiveChars(enteredPostalCode)
    const cityIsValid = !isEmpty(enteredCity)

    // if (!nameIsValid || !streetIsValid || !postalCodeIsValid || !cityIsValid) {
    //   // if one of the inputs is not valid then return if the form is submitted
    //   return
    // }

    setFormIsValid({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid
    })
  }

  const nameInputClasses = `${classes.control} ${
    formIsValid.name ? '' : classes.invalid
  }`
  const streetInputClasses = `${classes.control} ${
    formIsValid.street ? '' : classes.invalid
  }`

  const postalCodeInputClasses = `${classes.control} ${
    formIsValid.postalCode ? '' : classes.invalid
  }`
  const cityInputClasses = `${classes.control} ${
    formIsValid.city ? '' : classes.invalid
  }`
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formIsValid.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formIsValid.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formIsValid.postalCode && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formIsValid.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
