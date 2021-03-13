<template>
  <q-page class="flex-center">
    <q-dialog
      v-model="openFeedback"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card style="max-width: none">
        <div class="feedback__wrapper scroll" >
                <div class="popup" >
                  <a href="#" class="logo">
              <img src="../img/logo.svg" alt="Civil Activity Quest">
                  </a>
                  <h1 class="feedback__title title title--main"> {{ json['S']['game_name'] }} </h1>
                  <div v-if="agreedFeedback == false">
                    <div class="popup__title"> {{ json['S']['test_1'] }} </div>
                    <div class="popup__button agreed">
                          <button class="button" @click="agreedFeedback = true">
                          <span> {{ json['S']['test_2'] }}  </span>
                      </button>
                    </div>
                    <div class="popup__button agreed">
                          <button class="button" @click="sendFeedback">
                          <span> {{ json['S']['test_3'] }}  </span>
                      </button>
                    </div>
                  </div>
                  <div v-if="agreedFeedback == true">
                  <div class="popup__title"> {{ json['S']['test_4'] }}  </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_5'] }}  </div>
                      <q-radio v-model="answer[0]" :val="json['S']['test_6']" :label="json['S']['test_6']" /><br>
                      <q-radio v-model="answer[0]" :val="json['S']['test_7']" :label="json['S']['test_7']" /><br>
                      <q-radio v-model="answer[0]" :val="json['S']['test_8']" :label="json['S']['test_8']" /><br>
                      <q-radio v-model="answer[0]" :val="json['S']['test_9']" :label="json['S']['test_9']" /><br>
                      <q-radio v-model="answer[0]" :val="json['S']['test_10']" :label="json['S']['test_10']" /><br>
                    </div>
                    <div v-if="answer[0] == json['S']['test_6'] || answer[0] == json['S']['test_7']"  style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_11'] }}  </div>
                        <textarea wrap="soft" v-model="answer[1]" type="text" class="feedback__input__text"></textarea>
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_12'] }}  </div>
                      <q-radio v-model="answer[2]" :val="json['S']['test_13']" :label="json['S']['test_13']" /><br>
                      <q-radio v-model="answer[2]" :val="json['S']['test_14']" :label="json['S']['test_14']" /><br>
                      <q-radio v-model="answer[2]" :val="json['S']['test_15']" :label="json['S']['test_15']" /><br>
                      <q-radio v-model="answer[2]" :val="json['S']['test_16']" :label="json['S']['test_16']" /><br>
                      <q-radio v-model="answer[2]" :val="json['S']['test_17']" :label="json['S']['test_17']" /><br>
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_18'] }} </div>
                        <q-radio v-model="answer[3]" :val="json['S']['test_19']" :label="json['S']['test_19']" /><br>
                        <q-radio v-model="answer[3]" :val="json['S']['test_20']" :label="json['S']['test_20']" /><br>
                        <q-radio v-model="answer[3]" :val="json['S']['test_21']" :label="json['S']['test_21']" /><br>
                        <q-radio v-model="answer[3]" :val="json['S']['test_22']" :label="json['S']['test_22']" /><br>
                        <q-radio v-model="answer[3]" :val="json['S']['test_23']" :label="json['S']['test_23']" /><br>
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_24'] }} </div>
                      <div class="game-body__text"> {{ json['S']['test_25'] }} </div>
                        <q-radio v-model="answer[4]" val="1" label="1" /><br>
                        <q-radio v-model="answer[4]" val="2" label="2" /><br>
                        <q-radio v-model="answer[4]" val="3" label="3" /><br>
                        <q-radio v-model="answer[4]" val="4" label="4" /><br>
                        <q-radio v-model="answer[4]" val="5" label="5" /><br>
                        <div class="game-body__text"> {{ json['S']['test_26'] }} </div>
                        <q-radio v-model="answer[5]" val="1" label="1" /><br>
                        <q-radio v-model="answer[5]" val="2" label="2" /><br>
                        <q-radio v-model="answer[5]" val="3" label="3" /><br>
                        <q-radio v-model="answer[5]" val="4" label="4" /><br>
                        <q-radio v-model="answer[5]" val="5" label="5" /><br>
                        <div class="game-body__text"> {{ json['S']['test_27'] }} </div>
                        <q-radio v-model="answer[6]" val="1" label="1" /><br>
                        <q-radio v-model="answer[6]" val="2" label="2" /><br>
                        <q-radio v-model="answer[6]" val="3" label="3" /><br>
                        <q-radio v-model="answer[6]" val="4" label="4" /><br>
                        <q-radio v-model="answer[6]" val="5" label="5" /><br>
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_28'] }}  </div>
                        <q-checkbox v-model="answer[7]" :val="json['S']['test_29']" :label="json['S']['test_29']"  /><br>
                        <q-checkbox v-model="answer[7]" :val="json['S']['test_30']" :label="json['S']['test_30']"  /><br>
                        <q-checkbox v-model="answer[7]" :val="json['S']['test_31']" :label="json['S']['test_31']"  /><br>
                        <q-checkbox v-model="answer[7]" :val="json['S']['test_32']" :label="json['S']['test_32']"  /><br>
                        <q-checkbox v-model="answer[7]" :val="json['S']['test_33']" :label="json['S']['test_33']"  /><br>
                        <q-checkbox v-model="answer[7]" :val="json['S']['test_34']" :label="json['S']['test_34']"  /><br>
                        <q-checkbox v-model="answer[7]" :val="json['S']['test_35']" :label="json['S']['test_35']"  /><br>
                        <q-checkbox v-model="answer[7]" :val="json['S']['test_36']" :label="json['S']['test_36']"  /><br>
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_38'] }}  </div>
                        <q-checkbox v-model="answer[8]" :val="json['S']['test_29']" :label="json['S']['test_29']"  /><br>
                        <q-checkbox v-model="answer[8]" :val="json['S']['test_30']" :label="json['S']['test_30']"  /><br>
                        <q-checkbox v-model="answer[8]" :val="json['S']['test_31']" :label="json['S']['test_31']"  /><br>
                        <q-checkbox v-model="answer[8]" :val="json['S']['test_32']" :label="json['S']['test_32']"  /><br>
                        <q-checkbox v-model="answer[8]" :val="json['S']['test_33']" :label="json['S']['test_33']"  /><br>
                        <q-checkbox v-model="answer[8]" :val="json['S']['test_34']" :label="json['S']['test_34']"  /><br>
                        <q-checkbox v-model="answer[8]" :val="json['S']['test_35']" :label="json['S']['test_35']"  /><br>
                        <q-checkbox v-model="answer[8]" :val="json['S']['test_37']" :label="json['S']['test_37']" /><br>
                        <q-checkbox v-model="answer[8]" :val="json['S']['test_36']" :label="json['S']['test_36']"  /><br>

                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_39'] }} </div>
                      <textarea wrap="soft" v-model="answer[9]" type="text" class="feedback__input__text" :placeholder="json['S']['test_40']"></textarea>
                      <input v-model="answer[10]" type="text" class="feedback__input" :placeholder="json['S']['test_41']"><br>
                      <input v-model="answer[11]" type="text" class="feedback__input" :placeholder="json['S']['test_42']"><br>
                      <input v-model="answer[12]" type="text" class="feedback__input" :placeholder="json['S']['test_43']"><br>
                      <input v-model="answer[13]" type="text" class="feedback__input" :placeholder="json['S']['test_44']"><br>
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_45'] }}  </div>
                        <textarea wrap="soft" v-model="answer[14]" type="text" class="feedback__input__text"></textarea>
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_46'] }}  </div>
                        <textarea wrap="soft" v-model="answer[15]" type="text" class="feedback__input__text"></textarea>
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_47'] }} </div>
                        <q-radio v-model="answer[16]" :val="json['S']['test_48']" :label="json['S']['test_48']" /><br>
                        <q-radio v-model="answer[16]" :val="json['S']['test_49']" :label="json['S']['test_49']" /><br>
                        <q-radio v-model="answer[16]" :val="json['S']['test_50']" :label="json['S']['test_50']" /><br>
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_51'] }} </div>
                        <q-radio v-model="answer[17]" :val="json['S']['test_52']" :label="json['S']['test_52']" /><br>
                        <q-radio v-model="answer[17]" val="16-24" label="16-24" /><br>
                        <q-radio v-model="answer[17]" val="24-35" label="24-35" /><br>
                        <q-radio v-model="answer[17]" val="35-50" label="35-50" /><br>
                        <q-radio v-model="answer[17]" val="50-65" label="50-65" /><br>
                        <q-radio v-model="answer[17]" val="65+" label="65+" />
                    </div>
                    <div style="width: 100%">
                      <div class="game-body__text text__bold"> {{ json['S']['test_53'] }}  </div>
                        <input style="height:45px" wrap="soft" v-model="answer[18]" type="text" class="feedback__input__text">
                    </div>
                    <div class="popup__button">
                          <button class="button" @click="sendFeedback">
                          <span> {{ json['S']['test_54'] }} </span>
                      </button>
                    </div>
                </div>
            </div>
          </div>
        </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import json from '../pages/json/data.json'
import axios from 'axios'
import Vue from 'vue'
import VueSocialSharing from 'vue-social-sharing'
import { Notify } from 'quasar'

Vue.use(VueSocialSharing)

export default {
  data () {
    return {
      agreedFeedback: false,
      answer: ['', '', '', '', '', '', '', [], [], '', '', '', '', '', '', '', '', '', '', '', ''],
      userIp: 'Unknown'
    }
  },
  props: ['openFeedback', 'db', 'username', 'json'],
  methods: {
    sendFeedback () {
      this.$emit('restart-from-tree')
      this.openFeedback = false
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 6000,
        position: 'center',
        message: '<span style="font-size:20px">' + json.S.thanks + '</span>',
        html: true
      })
      const payload = {
        timestamp: new Date().toLocaleString(),
        userIp: this.userIp,
        username: this.username,
        1: this.answer[0],
        1.1: this.answer[1],
        2: this.answer[2],
        3: this.answer[3],
        4.1: this.answer[4],
        4.2: this.answer[5],
        4.3: this.answer[6],
        5: this.answer[7].join(' * '),
        6: this.answer[8].join(' * '),
        7: this.answer[9],
        7.1: this.answer[10],
        7.2: this.answer[11],
        7.3: this.answer[12],
        7.4: this.answer[13],
        8: this.answer[14],
        9: this.answer[15],
        10: this.answer[16],
        11: this.answer[17],
        12: this.answer[18],
        result: 'Feedback'
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
