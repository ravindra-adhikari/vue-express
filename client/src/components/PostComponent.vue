<template>
  <div class="conatiner">
    <h1>Latest Post</h1>
  <div class="create-post">
    <label for="create-post">Say something...</label>
    <input type="text" id="create-post" v-model="text" placeholder=" Create a Post">
    <button v-on:click="createPost">Add Post</button>
  </div>
  <hr>
  <p class="error" v-if = "errror"> {{errror}} </p>

  <div class="post-conatiner">
    <div class="post"
    v-for="(post,index) in posts"
    v-bind:item  = "posts"
    v-bind:index = "index"
    V-bind:key = "post._id"
   
    >
  <p class="text">{{post.text}} </p>
      <div class="crated-date">
        {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
        <span @click = "deletePost(post._id)" class="delet">x</span>
      </div>
    </div>
  </div>
  </div><!-- conatiner -->
</template>

<script>
import PostService from '../PostService'
export default {
  name: 'PostComponent',
  data(){
    return{
      posts : [],
      errror : '',
      text : ''
    }
  },
  methods :{
       async createPost(){
         await PostService.insertPost(this.text)
         this.posts = await PostService.getPosts()
      },
      async deletePost(id){
         await PostService.deletePost(id)
         this.posts = await PostService.getPosts()
      }
  },
  async created (){
    try{
      this.posts = await PostService.getPosts()
    }
    catch (err){
      this.errror = err.message
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.conatiner{
  max-width: 800px;
  margin: 0 auto;
}
.post-conatiner{
  background: rgb(241, 250, 235);
  padding: 10px;
 
}
.post{
  padding: 5px;
  border-bottom: 1px solid rgb(176, 199, 183);
  text-align: left;
  position: relative;
}
.post span{
  display: block;
  position: absolute;
  top:20px;
  right: 3%;
  background: #ee3488;
  color: #fff;
  padding: 3px 5px;
  line-height: 20px;
  cursor: pointer;
}
 .crated-date{
  text-align: right;
}
.error{
  background: #f3a2a2;
  padding: 5px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
