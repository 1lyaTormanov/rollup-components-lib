import { PickByValue } from 'utility-types'

export type Event = { target: { value: string } }

export function wrapEvt(event: Event, fun: (value: string) => void) {
  return fun(event.target.value)
}

export function filteredArr<T>(
  arr: Array<T>,
  key: keyof PickByValue<T, string>,
  str: string
) {
  return arr.filter((item) => (item[key] as unknown as string).includes(str))
}
