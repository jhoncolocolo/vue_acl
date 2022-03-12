<template>
  <div style="width: 100%;height: 200px;border: 1px solid;background-color: black;border-radius: 20px;">
    <div style="width: 70%;height: 35%;background-color: black;margin: 10% 15%;display: flex;align-items: center;justify-content: center;">
      <Message :messageShow="message"></Message>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";
export default {
  name: "MainMessages",
  props: { message: String },
  components: {Message},
  setup() {
    return {
    }
  }
}
</script>