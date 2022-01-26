const state = () => {
  return {
    address: null as unknown as string,
    loading: true as boolean
  }
}

export type AccountsState = ReturnType<typeof state>

export default state
