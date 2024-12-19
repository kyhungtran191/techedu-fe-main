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
  const [loading,setLoading] = useState(false)
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
    setLoading(true)
    instanceAxios
      .post(`${URL}payments/complete-checkout`, {
        orderId,
        transactionId
      })
      .then((response) => {
        const { clientSecret } = response?.data?.value
        console.log('Response' + clientSecret)
        setClientSecret(clientSecret)
       
      })
      .catch((error) => {
        console.error('Error completing checkout:', error)
      }).finally(()=>{
        setLoading(false)
      })
  }, [orderId, transactionId])

  console.log(stripePromise, clientSecret)

  return (
    <div className='container my-10'>
      <h1 className='text-lg font-semibold text-center'>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCheckout />
        </Elements>
      )}
    </div>
  )
}

export default Payment
