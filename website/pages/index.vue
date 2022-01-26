<template>
  <div class="page-container">
    <div class="overlay" />
    <particles-bg
      bg
      type="square"
      color="#f3ba2f"
      class="particles"
      :num="15"
      style="z-index: 1;"
    />
    <v-row class="text-overlay" align="center" justify="center">
      <v-col cols="auto" class="pr-10">
        <v-img :src="require('~/static/tokens/czd.png')" width="250" contain />
      </v-col>
      <v-col cols="auto" class="ma-0 pa-0">
        <v-card width="90%" class="pa-12" color="#00000099">
          <v-col cols="12">
            <v-row class="hero-title">
              CeeZee Dollar
            </v-row>
            <v-row class="hero-subtitle">
              Re-inventing elastic supply tokens on Binance Smart Chain
            </v-row>
            <v-row>
              <v-btn class="my-5" color="primary" to="/about">
                Learn More
              </v-btn>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ParticlesBg } from 'particles-bg-vue'

export default {
  components: { ParticlesBg }
}
</script>

<style scoped>
  .page-container {
    height:100%;
    max-height: 92vh;
  }

  .overlay {
    background-color: rgba(22, 22, 22, 0.25);
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    z-index: 2;
  }

  .text-overlay {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
  }

  .hero-title {
    font-size: 65px;
    font-weight: bolder;
    color: #f3ba2f;
  }

  .hero-subtitle {
    font-size: 20px;
    font-weight: lighter;
  }
</style>
