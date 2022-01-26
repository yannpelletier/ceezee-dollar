<template>
  <v-row align="center" :justify="justifyValue">
    <v-col cols="12" md="auto" align="center">
      <v-img max-width="50" contain :src="image" />
    </v-col>
    <v-col cols="12" md="auto">
      <v-row class="dashboard-title" align="center" :justify="justifyValue">
        {{ label }}
      </v-row>
      <v-row class="dashboard-subtitle mb-n4" align="center" :justify="justifyValue">
        {{ amount }}
      </v-row>
      <v-row v-if="dollarAmount" class="dashboard-subtitle2" align="center" :justify="justifyValue">
        (${{ dollarAmount }})
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DashboardItem',
  props: {
    image: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    dollarAmount: {
      type: [String],
      default: null
    }
  },
  computed: {
    justifyValue () {
      return this.$vuetify.breakpoint.smAndDown ? 'center' : undefined
    }
  }
}
</script>

<style scoped>
  .dashboard-title {
    font-size: 15px;
    font-weight: lighter;
  }

  .dashboard-subtitle {
    font-size: 18px;
    font-weight: bolder;
  }

  .dashboard-subtitle2 {
    font-size: 12px;
    font-weight: lighter;
  }
</style>
