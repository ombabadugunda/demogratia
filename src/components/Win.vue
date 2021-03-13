<template>
  <q-page class="flex-center">
    <q-dialog
      v-model="openWin"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card>
        <div class="popup__wrapper">
                <div class="popup">
                  <h2 class="popup__title"> {{ json['S']['win_text'] }} </h2>
                <div class="game-body__text popup__text"> {{ winText }} </div>
                    <div class="popup__status-bar">
                        <div class="game-header__status-bar status-bar">
                            <div class="status-bar__card">
                            <img src="../img/money2.png" alt="Money" class="status-bar__image">
                            <div class="status-bar__title"> {{ json['S']['res_money'] }} </div>
                            <div class="status-bar__points"> {{ money }} </div>
                            </div>
                            <div class="status-bar__card">
                            <img src="../img/nerve2.png" alt="Nerve" class="status-bar__image">
                            <div class="status-bar__title"> {{ json['S']['res_nerves'] }} </div>
                            <div class="status-bar__points">  {{ nerves }}</div>
                            </div>
                            <div class="status-bar__card">
                            <img src="../img/legal2.png" alt="Legal" class="status-bar__image">
                            <div class="status-bar__title"> {{ json['S']['res_legal'] }} </div>
                            <div class="status-bar__points"> {{ legal }} </div>
                            </div>
                            <div class="status-bar__card">
                            <img src="../img/reputation2.png" alt="Reputation" class="status-bar__image">
                            <div class="status-bar__title"> {{ json['S']['res_reputation'] }} </div>
                            <div class="status-bar__points"> {{ reputation }} </div>
                            </div>
                        </div>
                        </div>
                    <div class="popup__button">
                        <button class="button" @click="finishChar">
                            <span> {{ json['S']['next'] }} </span>
                        </button>
                    </div>
                </div>
            </div>
        </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing)

export default {
  data () {
    return {
      openCharText: '',
      userIp: 'Unknown',
      secondLevel: ''
    }
  },
  props: ['openWin', 'winText', 'money', 'nerves', 'legal', 'reputation', 'username', 'char_selected', 'db', 'chars_available', 'json'],
  methods: {
    finishChar () {
      if (this.char_selected === 'A') {
        if (this.money >= 50) {
          this.$emit('add-class-b')
        }
        if (this.char_selected === 'A' && this.reputation >= 50) {
          this.$emit('add-class-c')
        }
        if (this.char_selected === 'A' && this.legal >= 50) {
          this.$emit('add-class-d')
        }
        var newWin = localStorage.chars_win
        newWin += this.char_selected
        localStorage.chars_win = newWin
        this.$emit('restart-from-tree')
      }
      if (this.char_selected === 'E') {
        var newWin2 = localStorage.chars_win
        newWin2 += this.char_selected
        localStorage.chars_win = newWin2
        this.$emit('add-class-b')
        this.$emit('add-class-c')
        this.$emit('add-class-d')
        this.$emit('start-feedback')
      }
      if (this.char_selected === 'B' || this.char_selected === 'C' || this.char_selected === 'D') {
        this.$emit('add-class-e')
        var newWin3 = localStorage.chars_win
        newWin3 += this.char_selected
        localStorage.chars_win = newWin3
        this.$emit('restart-from-tree')
      }
      const payload = {
        timestamp: new Date().toLocaleString(),
        userIp: this.userIp,
        username: this.username,
        char_selected: this.char_selected,
        result: 'Win'
      }
      this.db.collection('users').add(payload)
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  },
  mounted () {
    axios
      .get('https://api.ipify.org')
      .then(response => (this.userIp = response.data))
  }
}

</script>
