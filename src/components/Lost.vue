<template>
  <q-page class="flex-center">
      <q-dialog v-model="openLost" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card>
            <div class="popup__wrapper">
                <div class="popup">
                    <div class="game-body__text popup__text"> {{ lostText }} </div>
                    <div class="popup__image">
                      <img :src="lost_image" alt="Greeting">
                    </div>
                    <div class="popup__button">
                        <button class="button" @click="finishChar">
                            <span> {{ json['S']['try_again'] }} </span>
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

export default {
  data () {
    return {
      userIp: 'Unknown'
    }
  },
  props: ['openLost', 'lostText', 'username', 'char_selected', 'db', 'lost_image', 'json'],
  methods: {
    finishChar () {
      this.$emit('restart-from-tree')
      const payload = {
        timestamp: new Date().toLocaleString(),
        userIp: this.userIp,
        username: this.username,
        char_selected: this.char_selected,
        result: 'Lost'
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
