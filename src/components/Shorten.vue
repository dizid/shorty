<template>
<div class="container">
<div class="tile is-ancestor">
  <div class="tile is-parent">
    <div class="tile is-child box">
      <p class="title">Short URLs with Preview security!</p>
   <form @submit.prevent=shortenUrl(long_url)>
  <label class="label">Paste your long URL here:</label>
    <div class="field">
  <div class="control">
  <input class="input is-primary" v-model.trim="long_url" type="url" placeholder="Type or paste your long URL here!" required>
    </div>
  </div>
  <button type="submit" class="button is-primary">Shorten</button><br>
 </form>

 <div class="tile is-child box">

<!-- <h1 class="title">Your short URL: <strong>{{ short_url }}</strong></h1> -->
  <div class="field">
  <div class="control">
<!--textfield 4 copy2Clipboard function-->
 <input class="input is-primary" type="text" :value=short_url id="myInput">
   </div>
  </div>
<button class="button is-primary" v-on:click="copy2Clipboard()">Copy short URL</button>
    </div>
  </div>
   </div>
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      <p class="title">tnxz.nl</p>
     <h2 class="subtitle has-text-primary">For use in tweets, FB messages, email etc</h2>
    </div>
    <div class="tile is-child box">
      <p class="title">Terms of Service</p>
      <p>Tnxz.nl was created as a free service to make posting long URLs easier, 
        and may only be used for actual URLs. Using it for spamming or
         illegal purposes is forbidden and any such use will result in the 
         service being disabled and you may be reported to all ISPs involved 
         and to the proper governmental agencies. 
        This service is provided without warranty of any kind.</p>
    </div>
  </div>
</div>
</div>
</div>
</template>
<script>
import { db } from '../main'
export default {
     name: 'Shorten',
  data () {
    return {
      long_url: '', random_string: '', short_url: ''
    }
},
methods: {
// Create short URL, add short & long to Firestore and return short_url
shortenUrl: function (long_url) { 
const random_string = Math.random().toString(32).substring(2, 4) + Math.random().toString(32).substring(2, 4);
// TODO: check for duplicate short_url!!
var urlRef = db.collection('urls')
  urlRef.where('random_string', '==', random_string).get()
     .then(snapshot => {
    if (snapshot.empty) {
this.short_url = 'https://tnxz.nl/' + random_string // PROD
  //this.short_url = 'localhost:8080/' + random_string // DEV
const createdAt = new Date()
let short_url= this.short_url
urlRef.add({ long_url, random_string, createdAt }) // All added to Firestore
console.log("URL Saved to Firestore")
 return this.short_url
      }
        })
      },

copy2Clipboard: function copy2Clipboard() {
    var copyText = document.getElementById("myInput")
   copyText.select()
    document.execCommand("copy")
        },
       }
}
</script>
<style scoped>
input.error {
  border-color: red;
}
</style>