<template>
  <v-col>
    <v-row>
      <v-col cols="12" md="3" class="px-6">
        <v-row>
          <h2 class="ma-2">
            Stake CZD
          </h2>
        </v-row>
        <v-row>
          <v-skeleton-loader v-if="!isAccountConnected || isDashboardLoading" class="dashboard-container" type="image" width="100%" height="150" />
          <v-card v-else class="dashboard-container pa-5" width="100%" height="100%" min-height="150">
            <template v-if="balanceOverZero">
              <number-proportion-field
                v-model="stakeInput"
                label="Stakeable"
                :max="balance"
                :decimals="TOKEN_DECIMALS"
                unit="CZD"
                class="px-3"
              />
              <v-btn color="primary" :disabled="!stakeInputOverZero" @click="stake">
                Stake
              </v-btn>
            </template>
            <template v-else>
              <v-row>
                <v-col>
                  No tokens to stake
                </v-col>
              </v-row>
            </template>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="px-6">
        <v-row>
          <h2 class="ma-2">
            Unstake CZD
          </h2>
        </v-row>
        <v-row>
          <v-skeleton-loader v-if="!isAccountConnected || isDashboardLoading" class="dashboard-container" type="image" width="100%" height="150" />
          <v-card v-else class="dashboard-container pa-4" width="100%" height="100%" min-height="150">
            <template v-if="stakedOverZero">
              <v-col>
                <v-row class="mb-2">
                  Staked Balance: {{ formattedStaked }}
                </v-row>
                <v-row>
                  <v-btn color="primary" width="100%" :disabled="!unstakeAvailable" @click="unstake">
                    <template v-if="unstakeAvailable">
                      Unstake all
                    </template>
                    <template v-else>
                      <span class="unstake-timer-text">
                        Unstake available in
                        <h5>
                          <countdown-timer :end-timestamp="unstakeTimestamp" />
                        </h5>
                      </span>
                    </template>
                  </v-btn>
                </v-row>
              </v-col>
            </template>
            <template v-else>
              <v-row>
                <v-col>
                  No tokens to unstake
                </v-col>
              </v-row>
            </template>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="12" md="5" class="px-6">
        <v-row>
          <h2 class="ma-2">
            My Holdings
          </h2>
        </v-row>
        <v-row>
          <v-skeleton-loader v-if="!isAccountConnected || isDashboardLoading" class="dashboard-container" type="image" width="100%" height="150" />
          <v-card v-else class="dashboard-container" width="100%" height="100%">
            <v-row class="ma-0 pa-2">
              <v-col cols="6">
                <dashboard-item label="Balance" :image="require('~/static/symbols/wallet.png')" :amount="formattedBalance" :dollar-amount="balanceValue" />
              </v-col>
              <v-col cols="6">
                <dashboard-item label="Staked" :image="require('~/static/symbols/safe.png')" :amount="formattedStaked" :dollar-amount="stakedValue" />
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-9">
      <v-col cols="12" md="6" class="px-6">
        <v-row>
          <h2 class="ma-2">
            Token Data
          </h2>
        </v-row>
        <v-row>
          <v-skeleton-loader v-if="isDashboardLoading" class="dashboard-container" type="image" width="100%" height="200" />
          <v-card v-else class="dashboard-container" width="100%" height="100%">
            <v-row class="ma-0 pa-2">
              <v-col cols="6">
                <dashboard-item label="Market Price" :image="require('~/static/symbols/czd.png')" :amount="`$${formattedMarketPrice}`" />
              </v-col>
              <v-col cols="6">
                <dashboard-item label="Total Supply" :image="require('~/static/symbols/supply.png')" :amount="formattedTotalSupply" :dollar-amount="totalSupplyValue" />
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-divider />
            </v-row>
            <v-row class="ma-0 pa-2">
              <v-col cols="6">
                <dashboard-item label="Total Burned" :image="require('~/static/symbols/burn.png')" :amount="formattedTotalBurned" :dollar-amount="totalBurnedValue" />
              </v-col>
              <v-col cols="6">
                <dashboard-item label="Total Staked" :image="require('~/static/symbols/staked.png')" :amount="formattedTotalStaked" :dollar-amount="totalStakedValue" />
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" class="px-6">
        <v-row>
          <h2 class="ma-2">
            Monetary Policy
          </h2>
        </v-row>
        <v-row>
          <v-skeleton-loader v-if="isDashboardLoading" class="dashboard-container" type="image" width="100%" height="200" />
          <v-card v-else class="dashboard-container" width="100%" height="100%">
            <v-row class="ma-0 pa-2" align="center">
              <v-col cols="12" class="ma-4">
                <v-row class="dashboard-title">
                  <h3>
                    Next Rebase
                  </h3>
                </v-row>
                <v-row class="dashboard-subtitle">
                  <countdown-timer expired-label="Waiting for rebase" :end-timestamp="nextRebaseTimestamp" />
                </v-row>
                <v-row v-if="isAccountConnected" class="mt-4">
                  <v-btn color="primary" :disabled="!rebaseAvailable" @click="rebase">
                    Rebase
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-divider />
            </v-row>
            <v-row class="ma-0 pa-2">
              <v-col cols="6">
                <dashboard-item label="Oracle Price" :image="require('~/static/symbols/oracle.png')" :amount="`$${formattedOraclePrice}`" />
              </v-col>
              <v-col cols="6">
                <dashboard-item label="Target Price" :image="require('~/static/symbols/target.png')" :amount="`$${formattedTargetPrice}`" />
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-divider />
            </v-row>
            <v-row class="ma-0 pa-2">
              <v-col cols="6">
                <dashboard-item label="Rebase Price" :image="require('~/static/symbols/target.png')" :amount="`$${formattedTargetRebasePrice}`" />
              </v-col>
              <v-col cols="6">
                <dashboard-item label="Rebase Supply" :image="require('~/static/symbols/rebase.png')" :amount="formattedTargetRebaseSupply" :dollar-amount="targetRebaseSupplyValue" />
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import BigNumber from 'bignumber.js'
import NumberProportionField from '@/components/inputs/NumberProportionField'
import CountdownTimer from '@/components/helper/CountdownTimer'
import { mapGetters } from 'vuex'
import DashboardItem from '@/components/DashboardItem'

const TOKEN_DECIMALS = 9

export default {
  components: { DashboardItem, CountdownTimer, NumberProportionField },
  data () {
    return {
      TOKEN_DECIMALS,

      stakeInput: '0'
    }
  },
  computed: {
    ...mapGetters('dashboard', {
      balance: 'getBalance',
      formattedBalance: 'getFormattedBalance',
      balanceValue: 'getBalanceValue',

      staked: 'getStaked',
      formattedStaked: 'getFormattedStaked',
      stakedValue: 'getStakedValue',

      formattedTotalSupply: 'getFormattedTotalSupply',
      totalSupplyValue: 'getTotalSupplyValue',

      formattedTotalBurned: 'getFormattedTotalBurned',
      totalBurnedValue: 'getTotalBurnedValue',

      formattedTotalStaked: 'getFormattedTotalStaked',
      totalStakedValue: 'getTotalStakedValue',

      formattedTotalHeld: 'getFormattedTotalHeld',
      totalHeldValue: 'getTotalHeldValue',

      formattedMarketPrice: 'getFormattedMarketPrice',

      formattedOraclePrice: 'getFormattedOraclePrice',

      formattedTargetPrice: 'getFormattedTargetPrice',

      formattedTargetRebasePrice: 'getFormattedTargetRebasePrice',

      formattedTargetRebaseSupply: 'getFormattedTargetRebaseSupply',
      targetRebaseSupplyValue: 'getTargetRebaseSupplyValue',

      unstakeTimestamp: 'getUnstakeTimestamp',
      nextRebaseTimestamp: 'getNextRebaseTimestamp',

      isDashboardLoading: 'isLoading'
    }),
    ...mapGetters('accounts', ['isAccountConnected']),
    ...mapGetters({
      now: 'getNow'
    }),

    stakeInputOverZero () {
      return new BigNumber(this.stakeInput).comparedTo('0') > 0
    },
    balanceOverZero () {
      return new BigNumber(this.balance).comparedTo('0') > 0
    },
    stakedOverZero () {
      return new BigNumber(this.staked).comparedTo('0') > 0
    },

    unstakeAvailable () {
      return this.now > this.unstakeTimestamp
    },
    rebaseAvailable () {
      return this.now > this.nextRebaseTimestamp
    }
  },
  methods: {
    stake () {
      this.$store.dispatch('dashboard/stakeTokens', this.stakeInput)
    },
    unstake () {
      this.$store.dispatch('dashboard/unstakeTokens')
    },

    rebase () {
      this.$store.dispatch('dashboard/rebase')
    }
  }
}
</script>

<style scoped lang="scss">
  .unstake-timer-text {
    text-align: center;
    font-size: 12px;
    font-weight: lighter;
    padding: 10px 0 10px 0;
  }

  .dashboard-container {
    border: 1px #565656 solid;
  }
</style>
