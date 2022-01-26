const state = () => {
  return {
    marketPrice: '1.00' as string,
    oraclePrice: '1.00' as string,
    targetPrice: '1.00' as string,
    balance: '0' as string,
    staked: '0' as string,
    totalSupply: '0' as string,
    totalBurned: '0' as string,
    totalStaked: '0' as string,

    unstakeTimestamp: 0 as number,
    nextRebaseTimestamp: 0 as number,

    loading: true as boolean
  }
}

export type DashboardState = ReturnType<typeof state>

export default state
