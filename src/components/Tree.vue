<template>
<div class="role">
      <div class="container">
        <div class="role__logo">
          <a href="#" class="logo">
            <img @click="returnToMain" src="../img/logo.svg" alt="Civil Activity Quest">
            <!-- <span @click="returnToMain"> Демо<span style="color: #5c9393">гра</span>тія </span> -->
          </a>
        </div>
        <div class="role__content">
          <div class="role__row role__row--active">
            <div class="role__arrow role__arrow--left-top"></div>
            <div class="role__arrow role__arrow--right-top"></div>
            <div class="role__card card card--active" :class="{'card--win': this.winChars.includes('A') }">
              <div class="card__about">
                <img src="../img/A.png" alt="Avatar">
                <h3> {{json['A']['name']}} </h3>
              </div>
              <div class="card__info">
                <p> {{ json['S']['tree_student_1'] }} </p>
              </div>
              <div class="card__button-wrapper">
                <button @click="charSelectedA" class="card__button"> {{ json['S']['tree_begin'] }} </button>
              </div>
            </div>
          </div>
          <div class="role__row">
            <div class="role__card card" :class="{ 'card--active': bIsAvailable, 'card--win': this.winChars.includes('B') }">
              <div class="card__about">
                <img src="../img/B.png" alt="Avatar">
                <h3> {{json['B']['name']}} </h3>
              </div>
              <div v-if="bIsAvailable" class="card__info">
                <p> {{ json['S']['tree_business_1'] }} </p>
                <br>
              </div>
              <div v-else class="card__info">
                <p> {{ json['S']['tree_business_2'] }} </p>
              </div>
              <div class="card__button-wrapper">
                <button @click="charSelectedB" class="card__button"> {{ json['S']['tree_begin'] }} </button>
              </div>
            </div>
            <div class="role__card card" :class="{ 'card--active': cIsAvailable, 'card--win': this.winChars.includes('C') }">
              <div class="card__about">
                <img src="../img/C.png" alt="Avatar">
                <h3> {{json['C']['name']}} </h3>
              </div>
              <div v-if="cIsAvailable" class="card__info">
                <p> {{ json['S']['tree_osbb_1'] }}</p>
              </div>
              <div v-else class="card__info">
                <p> {{ json['S']['tree_osbb_2'] }} </p>
              </div>
              <div class="card__button-wrapper">
                <button @click="charSelectedC" class="card__button"> {{ json['S']['tree_begin'] }} </button>
              </div>
            </div>
            <div class="role__card card" :class="{ 'card--active': dIsAvailable, 'card--win': this.winChars.includes('D') }">
              <div class="card__about">
                <img src="../img/D.png" alt="Avatar">
                <h3> {{json['D']['name']}} </h3>
              </div>
              <div v-if="dIsAvailable" class="card__info">
                <p> {{ json['S']['tree_bure_1'] }} </p>
              </div>
              <div v-else class="card__info">
                <p> {{ json['S']['tree_bure_2'] }} </p>
              </div>
              <div class="card__button-wrapper">
                <button @click="charSelectedD" class="card__button"> {{ json['S']['tree_begin'] }} </button>
              </div>
            </div>
          </div>
          <div class="role__row">
            <div class="role__arrow role__arrow--left-bottom"></div>
            <div class="role__arrow role__arrow--right-bottom"></div>
            <div class="role__card card" :class="{ 'card--active': eIsAvailable, 'card--win': this.winChars.includes('E') }">
              <div class="card__about">
                <img src="../img/E.png" alt="Avatar">
                <h3> {{json['E']['name']}} </h3>
              </div>
              <div v-if="eIsAvailable" class="card__info">
                <p> {{ json['S']['tree_active_1'] }} </p>
              </div>
              <div v-else class="card__info">
                <p> {{ json['S']['tree_active_2'] }} </p>
              </div>
              <div class="card__button-wrapper">
                <button @click="charSelectedE" class="card__button"> {{ json['S']['tree_begin'] }} </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  props: ['chars_available', 'json'],
  data () {
    return {
      bIsAvailable: this.chars_available.includes('B'),
      cIsAvailable: this.chars_available.includes('C'),
      dIsAvailable: this.chars_available.includes('D'),
      eIsAvailable: this.chars_available.includes('E'),
      winChars: ''
    }
  },
  mounted () {
    if (localStorage.chars_win) {
      this.winChars = localStorage.chars_win
    }
  },
  methods: {
    returnToMain () {
      this.$emit('return-to-main')
    },
    charSelectedA () {
      this.$emit('char-selected-A')
    },
    charSelectedB () {
      this.$emit('char-selected-B')
    },
    charSelectedC () {
      this.$emit('char-selected-C')
    },
    charSelectedD () {
      this.$emit('char-selected-D')
    },
    charSelectedE () {
      this.$emit('char-selected-E')
    }
  }
}
</script>

<style lang="stylus" scoped>
  available
    background-color $red-5
</style>
