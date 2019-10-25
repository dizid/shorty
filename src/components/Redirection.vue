<template>
<div class="container">
  <div class="tile is-parent is-vertical">
      <div class="tile is-child box">
<h1 v-if="error">There was an error:</h1>
<p> {{ error }}</p>
<h1 class="is-size-3">You are going to this URL:</h1>
<h2 class="is-size-5 has-text-danger"><a :href="newlocation">{{ newlocation }}</a> </h2>
<button class="button is-primary" v-on:click="reDirect(newlocation)">Go!</button>
</div>
<div class="tile is-child box">
  <h2 class="is-size-3">A preview of this website:</h2>
  <div class="box">
 <a :href="newlocation"><img :src="thescreenshot" alt="Preview screenshot of the site that you are going too"></a> 
</div>
</div>
</div></div>
</template>
<script>
import { db } from '../main'
var thum = require('thum.io')

export default {
name: 'Redirection',

data () {
  return {
    error: '',
    newlocation: '',
  thescreenshot: '',
  todos: []
  }
},
mounted() {
  this.getRoute()
  },

methods: {

getRoute: function () {
  var getURL = db.collection('urls').where('random_string', '==', this.$route.params.random_string).get()
     .then(snapshot => {
    if (snapshot.empty) {
    this.error = "Sorry, no matching URL in our Google Firestore database"
    return this.error
    }
  snapshot.forEach(doc => { // TODO: just 1 record expected, no need to forEach
     this.newlocation = doc.data().long_url
this.getScreenshot()
     })
  })
  .catch(err => {
  return this.error
   console.log('Error getting documents', err)
  })},

reDirect: function(newlocation) {
  window.location = newlocation
      },

getScreenshot: function(newlocation) {
this.thescreenshot = '//image.thum.io/get/' + this.newlocation
}}}
</script>
