<template>
  <div style="font-size: 4em; display:flex;" v-if="messageShow =='ACCESS DENIED'">&#128683;<div style="display: flex;width:80%;color: red;font-style: oblique;font-size: 0.7em;align-items: center;">ACCESS DENIED</div></div>  
  <div style="font-size: 4em; display:flex;" v-if="messageShow =='ALLOW'"> 
    <div style="width:20%;">&#128275;</div>
    <div style="display: flex;width:80%;color: red;font-style: oblique;font-size: 0.5em;align-items: center;">ACCESS ALLOWED</div>
  </div>
  <div style="font-size: 4em; display:flex;" v-if="messageShow =='NOT EXISTS'">
    <div style="display: flex;width:100%;color: red;font-style: oblique;font-size: 0.4em;align-items: center;">404 PAGE NOT EXISTS</div>
  </div>  
  <div style="font-size: 4em; display:flex;" v-if="messageShow =='DEFAULT'">
  <div style="width:20%;">&#128272;</div>
    <div style="display: flex;width:80%;color: red;font-style: oblique;font-size: 0.4em;align-items: center;">ROLES AND PERMISSIONS</div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: { messageShow: String },
  setup() {
    return {
      
    }
  }
}
</script>
