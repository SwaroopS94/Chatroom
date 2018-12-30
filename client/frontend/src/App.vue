<template>
  <div id="app">
    <router-view :socket="socket" />
  </div>
</template>

<script>
  import io from 'socket.io-client';

  export default {
    name: 'app',
    data() {
      return {
        localhost: "",
        socket: ""
      }
    },
    mounted() {
      this.localhost = "192.168.0.102:3000";
    },
    methods: {
      onIpChange(ip) {
        this.localhost = `${ip}:3000`
      },
      getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
        //compatibility for firefox and chrome
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var pc = new myPeerConnection({
            iceServers: []
          }),
          noop = function () {
          },
          localIPs = {},
          ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
          key;

        function iterateIP(ip) {
          if (!localIPs[ip]) onNewIP(ip);
          localIPs[ip] = true;
        }

        //create a bogus data channel
        pc.createDataChannel("");

        // create offer and set local description
        pc.createOffer(function (sdp) {
          sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });

          pc.setLocalDescription(sdp, noop, noop);
        }, noop);

        //listen for candidate events
        pc.onicecandidate = function (ice) {
          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
          ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
      }
    },
    watch: {
      localhost(val) {
        if(val) {
          this.socket = io.connect(val);
          this.$store.commit('SET_SOCKET', this.socket);
        }
        console.log("Localhost Change caught : ",val);
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  button {
    background: dimgray;
    border-radius: 5px;
    font-size: large;
    padding: 10px;
  }
  button:hover {
    background: darkgray;
  }

  button:active {
    transform: translate3d(1px,1px,10px);
  }
</style>
