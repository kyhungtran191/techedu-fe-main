/* eslint-disable @typescript-eslint/ban-ts-comment */
import { APP_PERMISSIONS } from '@/constants/permissions'
import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any

export type ACLObj = {
  action: Actions
  subject: string
}

const defineRulesFor = (permissionUser: string[], permissions: string[]) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (
    !permissions.length ||
    permissionUser.includes(APP_PERMISSIONS?.ADMIN as string) ||
    permissions.every((permission) => permissionUser.includes(permission))
  ) {
    can('manage', 'all')
  }
  return rules
}

export const buildAbilityFor = (permissionUser: string[], permissions: string[]): AppAbility => {
  return new AppAbility(defineRulesFor(permissionUser, permissions), {
    // @ts-ignore
    detectSubjectType: (object) => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
