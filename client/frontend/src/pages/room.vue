<template>
  <div class="outer-body">
    <div>
      Server Connectivity
    </div>
    <message-box v-for="message in messages" :message="message" />
    <div id="footer-container" class="footer outer-body">
      <input type="text" v-model="userMessage" placeholder="Enter Message" />
      <button v-if="socket" @click="sendMessage">SEND</button>
    </div>
  </div>
</template>

<script>
  import MessageBox from "../components/message-box";
  export default {
    components: {MessageBox},
    name: "home",
    data() {
      return {
        isServerConnected : false,
        response: "",
        serverError: "",
        connectivityStatus: "idle",
        userMessage: "",
        userName: "",
        messages:[],
        socket: undefined
      }
    },
    methods: {
      sendMessage() {
        this.socket.emit('message', {
          message: this.userMessage
        });
      }
    },
    mounted() {
      this.$store.watch(this.$store.getters.getSocket, (val) => {
        this.socket = val;
        this.socket.on('new_message',(message) => {
          this.messages.push(message);
        });
      });
    }
  }
</script>

<style scoped>
  .outer-body {
    overflow: hidden;
  }

  .footer {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
  }

  .footer input {
    font-size: 20px;
    font-family: sans-serif;
    border-radius: 5px;
    padding: 5px;
    overflow: hidden;
    border: 1px solid;
    width: 70%;
  }

  .footer button {
    margin-left: 5px;
    border-radius: 5px;
    width: 20%;
  }
</style>