<template>
  <div>
    <div style="margin: 10px;">
      <input type="text" class="input-text" placeholder="Join as" v-model="userIdentity"/>
    </div>
    <button v-if="socket" @click="onJoinRoom()">Join</button>

    <div v-if="onIdentityAvailable" v-for="room in availableRooms" @click="joinRoom(room)" class="room-list">
      {{room}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        availableRooms: [],
        onIdentityAvailable: false,
        userIdentity: "",
        socket: undefined
      }
    },
    methods: {
      onJoinRoom() {
        if (this.userIdentity && this.userIdentity.length > 0) {
          this.onIdentityAvailable = true;
          this.socket.emit('client-join', this.userIdentity);
        }
      },
      joinRoom(room) {
        this.$router.push({name: 'room',path: `/room`, params: {id: room}});
      }
    },
    mounted() {
      this.$store.watch(this.$store.getters.getSocket,(val) => {
        this.socket = val;
        //console.log("Socket attached : ",this.socket);
        this.socket.on('clientJoined', (availableRooms) => {
          //console.log("Available rooms : ", availableRooms);
          this.availableRooms = availableRooms;
        });
      });
    }
  }
</script>

<style scoped>
  .input-text {
    font-size: 15px;
    font-family: sans-serif;
    border-radius: 5px;
    padding: 5px;
    overflow: hidden;
    border: 1px solid;
  }
</style>