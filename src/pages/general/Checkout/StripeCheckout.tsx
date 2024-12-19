import { PaymentElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { useParams } from 'react-router-dom'

const StripeCheckout: React.FC = () => {
  const {orderId,transactionId } = useParams()
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/complete-checkout/${orderId}/${transactionId}`
      }
    })

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred.')
      } else {
        setMessage('An unexpected error occurred.')
      }
    } else {
      setMessage(null)
    }

    setIsProcessing(false)
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit} className='max-w-[600px] mx-auto p-6 my-6 space-y-4 bg-white border rounded-lg shadow-lg'>
      <PaymentElement id='payment-element' />
      <button
        type='submit'
        id='submit'
        disabled={isProcessing || !stripe || !elements}
        className={`w-full px-6 py-3 font-semibold text-white rounded-md transition-all ${
          isProcessing || !stripe || !elements ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
        }`}
      >
        <span id='button-text'>{isProcessing ? 'Processing...' : 'Pay now'}</span>
      </button>
      {message && (
        <div id='payment-message' className='mt-2 text-sm font-medium text-red-600'>
          {message}
        </div>
      )}
    </form>
  )
}

export default StripeCheckout
