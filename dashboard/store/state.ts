const state = () => {
  return {
    now: 0 as number
  }
}

export type RootState = ReturnType<typeof state>

export default state
