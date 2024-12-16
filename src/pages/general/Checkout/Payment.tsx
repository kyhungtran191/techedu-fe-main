import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import StripeCheckout from './StripeCheckout'
import { URL } from '@/apis'
import instanceAxios from '@/configs/axiosInstance'
import { useParams } from 'react-router-dom'

function Payment() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
  const [clientSecret, setClientSecret] = useState<string>('')

  const { orderId, transactionId } = useParams()
  // Set up stripe configs
  useEffect(() => {
    fetch(`${URL}payments/configs`).then(async (res) => {
      const { publishableKey } = await res.json()
      console.log('publishableKey', publishableKey)
      setStripePromise(loadStripe(publishableKey as string))
    })
  }, [])

  // get client secret
  useEffect(() => {
    instanceAxios
      .post(`${URL}payments/complete-checkout`, {
        orderId,
        transactionId
      })
      .then((response) => {
        const { clientSecret } = response.data
        setClientSecret(clientSecret)
      })
      .catch((error) => {
        console.error('Error completing checkout:', error)
      })
  }, [orderId, transactionId])

  return (
    <>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCheckout />
        </Elements>
      )}
    </>
  )
}

export default Payment
