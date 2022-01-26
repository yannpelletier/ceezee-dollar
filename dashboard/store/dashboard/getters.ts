import { GetterTree } from 'vuex'
import { RootState } from '@/store/state'
import BigNumber from 'bignumber.js'
import { DashboardState } from '~/store/dashboard/state'

const TOKEN_DECIMALS = 9
const REBASE_RATIO = 6
const DEBASE_RATIO = 2

const formatTokenAmount = (amount: string) => {
  return new BigNumber(amount).shiftedBy(-TOKEN_DECIMALS).toFormat(2)
}

const formatTokenValue = (amount: string, price: string) => {
  return new BigNumber(amount).shiftedBy(-TOKEN_DECIMALS).multipliedBy(price).toFormat(2)
}

const getters: GetterTree<DashboardState, RootState> = {
  getBalance ({ balance }) {
    return balance
  },
  getFormattedBalance ({ balance }) {
    return formatTokenAmount(balance)
  },
  getBalanceValue ({ balance, marketPrice }) {
    return formatTokenValue(balance, marketPrice)
  },

  getStaked ({ staked }) {
    return staked
  },
  getFormattedStaked ({ staked }) {
    return formatTokenAmount(staked)
  },
  getStakedValue ({ staked, marketPrice }) {
    return formatTokenValue(staked, marketPrice)
  },

  getTotalSupply ({ totalSupply }) {
    return totalSupply
  },
  getFormattedTotalSupply ({ totalSupply }) {
    return formatTokenAmount(totalSupply)
  },
  getTotalSupplyValue ({ totalSupply, marketPrice }) {
    return formatTokenValue(totalSupply, marketPrice)
  },

  getTotalBurned ({ totalBurned }) {
    return totalBurned
  },
  getFormattedTotalBurned ({ totalBurned }) {
    return formatTokenAmount(totalBurned)
  },
  getTotalBurnedValue ({ totalBurned, marketPrice }) {
    return formatTokenValue(totalBurned, marketPrice)
  },

  getTotalStaked ({ totalStaked }) {
    return totalStaked
  },
  getFormattedTotalStaked ({ totalStaked }) {
    return formatTokenAmount(totalStaked)
  },
  getTotalStakedValue ({ totalStaked, marketPrice }) {
    return formatTokenValue(totalStaked, marketPrice)
  },

  getTotalHeld ({ balance, staked }) {
    return new BigNumber(balance).plus(staked).toString()
  },
  getFormattedTotalHeld (_, { getTotalHeld }) {
    return formatTokenAmount(getTotalHeld)
  },
  getTotalHeldValue ({ marketPrice }, { getTotalHeld }) {
    return formatTokenValue(getTotalHeld, marketPrice)
  },

  getMarketPrice ({ marketPrice }) {
    return marketPrice
  },
  getFormattedMarketPrice ({ marketPrice }) {
    return new BigNumber(marketPrice).toFormat(2)
  },

  getOraclePrice ({ oraclePrice }) {
    return oraclePrice
  },
  getFormattedOraclePrice ({ oraclePrice }) {
    return new BigNumber(oraclePrice).toFormat(2)
  },

  getTargetPrice ({ targetPrice }) {
    return targetPrice
  },
  getFormattedTargetPrice ({ targetPrice }) {
    return new BigNumber(targetPrice).toFormat(2)
  },

  getTargetRebasePrice ({ oraclePrice, targetPrice }) {
    const oraclePriceBN = new BigNumber(oraclePrice)
    const compare = oraclePriceBN.comparedTo(targetPrice)
    if (compare > 0) {
      const priceSubstract = oraclePriceBN.minus(targetPrice).dividedBy(REBASE_RATIO)
      return oraclePriceBN.minus(priceSubstract).toString()
    } else if (compare < 0) {
      const targetPriceBN = new BigNumber(targetPrice)
      const priceAdd = targetPriceBN.minus(oraclePrice).dividedBy(DEBASE_RATIO)
      return oraclePriceBN.plus(priceAdd).toString()
    } else {
      return targetPrice
    }
  },
  getFormattedTargetRebasePrice (_, { getTargetRebasePrice }) {
    return new BigNumber(getTargetRebasePrice).toFormat(2)
  },

  getTargetRebaseSupply ({ totalSupply, oraclePrice }, { getTargetRebasePrice }) {
    const totalSupplyBN = new BigNumber(totalSupply)
    return totalSupplyBN.multipliedBy(oraclePrice).dividedBy(getTargetRebasePrice).toString()
  },
  getFormattedTargetRebaseSupply (_, { getTargetRebaseSupply }) {
    return formatTokenAmount(getTargetRebaseSupply)
  },
  getTargetRebaseSupplyValue ({ marketPrice }, { getTargetRebaseSupply }) {
    return formatTokenValue(getTargetRebaseSupply, marketPrice)
  },

  getUnstakeTimestamp ({ unstakeTimestamp }) {
    return unstakeTimestamp
  },
  getNextRebaseTimestamp ({ nextRebaseTimestamp }) {
    return nextRebaseTimestamp
  },

  isLoading ({ loading }) {
    return loading
  }
}

export default getters
