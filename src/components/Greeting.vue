<template>
  <q-dialog class="popup__wrapper" v-model="openDescription" maximized transition-show="flip-down" transition-hide="flip-up">
    <div class="popup__wrapper">
      <div class="popup">
        <div class="close-icon" style="margin-left: auto">
          <q-btn icon="close" flat round dense @click="closePopup"/>
        </div>
        <div class="popup__image">
            <img :src="charlogo" alt="Char Logo">
        </div>
        <div class="popup__info">
          <p> {{ description }}</p>
        </div>
          <h2 class="popup__title"> {{ json['S']['greeting_your_name'] }} </h2>
          <input autofocus maxlength="32" v-model="username" type="text" class="popup__input" placeholder="Ім’я">
          <button @click="startGame" class="button">
            <span>{{ json['S']['greeting_to_game'] }}</span>
          </button>
      </div>
    </div>
  </q-dialog>
  <!-- <q-page class="flex-center">
      <q-dialog v-model="openDescription" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card>
            <div class="popup__wrapper">
                <div class="popup">
                    <div class="popup__title"> {{ description }} </div>
                    <div class="popup__image">
                      <img src="../img/user-icon.svg" alt="Greeting">
                    </div>
                    <div class="popup__button">
                        <button @click="startGame">
                            <span> Далі </span>
                        </button>
                    </div>
                </div>
            </div>
        </q-card>
    </q-dialog>
  </q-page> -->
</template>

<script>
import XLSX from 'xlsx'

export default {
  data () {
    return {
      username: '',
      charLogo: ''
    }
  },
  props: ['open-description', 'description', 'charlogo', 'db', 'json'],
  methods: {
    closePopup () {
      this.$emit('close-popup')
    },
    startGame () {
      this.$emit('start-game', this.username)
      if (this.username === 'Залізяко, дай мені файл') {
        var wb = XLSX.utils.book_new()
        wb.Props = {
          Title: 'Feedback Demogratia',
          Subject: 'Feedback',
          Author: 'Demogratia',
          CreatedDate: new Date().toLocaleString()
        }
        wb.SheetNames.push('Feedback')
        var feedbackData = []
        this.db.collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            feedbackData.push(doc.data())
          })
          var ws = XLSX.utils.json_to_sheet(feedbackData, { header: ['timestamp', 'userIp', 'username', 'result', 'char_selected', '1', '1.1', '2', '3', '4.1', '4.2', '4.3', '5', '6', '7', '7.1', '7.2', '7.3', '7.4', '8', '9', '10', '11', '12'] })
          wb.Sheets.Feedback = ws
          XLSX.writeFile(wb, 'Demogratia Data.xlsx', { type: 'file' })
        })
      }
    }
  }
}

</script>
