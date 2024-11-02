import { ToggleBlockUser } from '@/services/user.services'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface ToggleBlockUserParams {
  userId: string
  isBlock: boolean
}

export const useToggleBlockUserMutation = (refetchData: () => void, options = {}) => {
  return useMutation(({ userId, isBlock }: ToggleBlockUserParams) => ToggleBlockUser(userId, isBlock), {
    onSuccess: (data, variables) => {
      const { userId, isBlock } = variables // access userId and isBlock from variables
      if (!isBlock) {
        toast.success(`Unbanned user ${userId} successfully!`)
        refetchData()
      } else {
        toast.success(`Banned user ${userId} successfully!`)
        refetchData()
      }
    },
    ...options
  })
}
