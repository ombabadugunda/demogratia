<template>
  <q-page class="flex flex-center">
    <welcome v-if="user.game_stage == 'welcome'"
    welcome
    :json='json'
    :username='user.username'
    @change-language = 'changeLanguage'
    @ready-to-play = 'readyToPlay'>
    </welcome>
    <tree
    :json='json'
    :chars_available="user.chars_available"
    v-else-if="user.game_stage == 'tree'"
    @char-selected-A = 'charSelectedA'
    @char-selected-B = 'charSelectedB'
    @char-selected-C = 'charSelectedC'
    @char-selected-D = 'charSelectedD'
    @char-selected-E = 'charSelectedE'
    @return-to-main = 'returnToMain'
    ></tree>
    <game
    :json='json'
    :db="db"
    :username="user.username"
    :question_set="json[user.char_selected]"
    :char_selected="user.char_selected"
    :char_name="user.char_name"
    :chars_available="user.chars_available"
    @restart-from-tree="restartFromTree"
    @add-b="addClassB"
    @add-c="addClassC"
    @add-d="addClassD"
    @add-e="addClassE"
    v-else-if="user.game_stage == 'game'">
    </game>
    <greeting
    :json='json'
    :db="db"
    :description="json[user.char_selected].description"
    :open-description="openDescription"
    :charlogo="charLogo"
    @start-game="startGame"
    @close-popup="closePopup"
>
    </greeting>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import j from './json/data.json'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD5VozpBMxv2ddoqdsyyKuS2VRYl5Xje5c',
  authDomain: 'civic-quest-api.firebaseapp.com',
  databaseURL: 'https://civic-quest-api-default-rtdb.firebaseio.com',
  projectId: 'civic-quest-api',
  storageBucket: 'civic-quest-api.appspot.com',
  messagingSenderId: '1003644269005',
  appId: '1:1003644269005:web:5d61438857179ace855484',
  measurementId: 'G-CGWE0L8X6T'
}
firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()

export default {
  data () {
    return {
      json: j.UA,
      openDescription: false,
      charLogo: '',
      db,
      user: {
        username: '',
        chars_available: 'A',
        game_stage: 'welcome',
        char_selected: 'A',
        char_name: ''
      }
    }
  },
  mounted () {
    var setOfImages = ['A.png', 'A1.png', 'A2.png', 'A3.png', 'A4.png', 'A5.png',
      'B.png', 'B1.png', 'B2.png', 'B3.png', 'B4.png', 'B5.png', 'C.png', 'C1.png', 'C2.png', 'C3.png', 'C4.png', 'C5.png', 'D.png', 'D1.png', 'D2.png', 'D3.png', 'D4.png', 'D5.png',
      'E.png', 'E1.png', 'E2.png', 'E3.png', 'E4.png', 'E5.png']
    function preloadImage (url) {
      var img = new Image()
      img.src = url
    }
    setOfImages.forEach(element => preloadImage(element))
    if (localStorage.username) {
      this.user.username = localStorage.username
    }
    if (localStorage.chars_available) {
      this.user.chars_available = localStorage.chars_available
    }
    if (localStorage.game_stage) {
      this.user.game_stage = localStorage.game_stage
    }
    if (localStorage.char_selected) {
      this.user.char_selected = localStorage.char_selected
    }
  },
  methods: {
    changeLanguage (l) {
      this.json = j[l]
    },
    closePopup () {
      this.openDescription = false
    },
    returnToMain () {
      this.user.game_stage = 'welcome'
    },
    readyToPlay (e) {
      this.user.username = e
      this.user.game_stage = 'tree'
    },
    charSelectedA () {
      this.user.char_selected = 'A'
      this.user.char_name = 'СТУДЕНТ(-КА)'
      this.openDescription = true
      this.charLogo = 'A.png'
    },
    charSelectedB () {
      this.user.char_selected = 'B'
      this.openDescription = true
      this.user.char_name = 'ВЛАСНИК(-ЦЯ) ЛОКАЛЬНОГО БІЗНЕСУ'
      this.charLogo = 'B.png'
    },
    charSelectedC () {
      this.user.char_selected = 'C'
      this.openDescription = true
      this.user.char_name = 'ГОЛОВА ОСББ'
      this.charLogo = 'C.png'
    },
    charSelectedD () {
      this.user.char_selected = 'D'
      this.openDescription = true
      this.user.char_name = 'ДЕРЖСЛУЖБОВЕЦЬ(-ЦЯ)'
      this.charLogo = 'D.png'
    },
    charSelectedE () {
      this.user.char_selected = 'E'
      this.openDescription = true
      this.user.char_name = 'АКТИВНИЙ ГРОМАДЯНИН(-КА)'
      this.charLogo = 'E.png'
    },
    startGame (e) {
      this.openDescription = false
      this.user.game_stage = 'game'
      this.user.username = e
    },
    restartFromTree () {
      this.user.game_stage = 'tree'
    },
    // secondClassWin (char) {
    //   this.user.chars_available += char
    //   if (this.user.chars_available.includes('B2') && this.user.chars_available.includes('C2') && this.user.chars_available.includes('D2')) {
    //     this.user.chars_available += 'E'
    //     Notify.create({
    //       type: 'positive',
    //       color: 'positive',
    //       timeout: 3000,
    //       position: 'top-right',
    //       message: '<span style="font-size:20px">Вам відкрито позицію активного(-ї) громадянина(-ки)</span>',
    //       html: true
    //     })
    //   }
    // },
    addClassB () {
      if (!this.user.chars_available.includes('B')) {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 6000,
          position: 'top-right',
          message: '<span style="font-size:20px">' + this.json.S.notification_1 + '</span>',
          html: true
        })
      }
      this.user.chars_available += 'B'
      localStorage.chars_available = this.user.chars_available
    },
    addClassC () {
      if (!this.user.chars_available.includes('C')) {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 6000,
          position: 'top-right',
          message: '<span style="font-size:20px">' + this.json.S.notification_2 + '</span>',
          html: true
        })
      }
      this.user.chars_available += 'C'
      localStorage.chars_available = this.user.chars_available
    },
    addClassD () {
      if (!this.user.chars_available.includes('D')) {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 6000,
          position: 'top-right',
          message: '<span style="font-size:20px">' + this.json.S.notification_3 + '</span>',
          html: true
        })
      }
      this.user.chars_available += 'D'
      localStorage.chars_available = this.user.chars_available
    },
    addClassE () {
      if (!this.user.chars_available.includes('E')) {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 6000,
          position: 'top-right',
          message: '<span style="font-size:20px">' + this.json.S.notification_4 + '</span>',
          html: true
        })
      }
      this.user.chars_available += 'E'
      localStorage.chars_available = this.user.chars_available
    }
  },
  components: {
    game: require('components/Game.vue').default,
    welcome: require('components/Welcome.vue').default,
    tree: require('components/Tree.vue').default,
    greeting: require('components/Greeting.vue').default

  }
}
</script>
