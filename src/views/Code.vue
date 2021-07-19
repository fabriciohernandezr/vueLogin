<template>
  <div v-if="step == 0" class="login">
    <h1 class="title">Recuperación de contraseña</h1>
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="#email">Email:</label>
      <input
        class="form-input"
        type="email"
        id="email"
        required
        :placeholder="email"
        disabled="true"
      />
      <label class="form-label" for="#password">Código:</label>
      <input
        class="form-input"
        type="password"
        id="password"
        v-model="password"
        placeholder="Código"
      />
      <input class="form-submit" type="submit" value="Validar" />
    </form>
  </div>
  <div v-if="step == 1" class="login">
    <h1 class="title">Reestablecer contraseña</h1>
    <form action class="form" @submit.prevent="terminarRegistro">
    <!--   <label class="form-label" for="#alias">Alias:</label>
      <input class="form-input" type="alias" id="alias" v-model="alias" required /> -->
      <label class="form-label" for="#password">Contraseña:</label>
      <input
        class="form-input"
        type="password"
        id="password"
        v-model="newPassword"
      />
      <label class="form-label" for="#passwordRepeat">Confirmar nueva contraseña:</label>
      <input
        class="form-input"
        type="password"
        id="passwordRepeat"
        v-model="newPasswordRepeat"
      />
      <input class="form-submit" type="submit" value="Confirmar" />
    </form>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  data: () => ({
    step: 0,
    email: "",
    password: "",
    newPassword: "",
    newPasswordRepeat: "",
    uOriginal:"",
    uModificada:"",
    alias:"",
    u:"",
    //  url: "https://gnpac-317823.uc.r.appspot.com/auth?u=j1mdJF1RSpEZxMjYVdUTx40ZBN0Q1MUeM91NPFzVfpnRRNUSxNVUz9EO34SOKNkTs5EVOBTVy40MJJTTqZUbNBDeX5Eerh1YwgmVX5EbG5kT5smW1dXRltWMrRGdNZkWTZ1RaFTOFVWbo5WVsJ1VkJTVq5UQkpWTnFEMOd2Yq10MJR0T4lFVOJTQq5UMZRUTwEUROdXQE1kcwhEVDZFbRl2bqlUNWJTYpdXaJpXWy0kasRVTzkVbJZTS5NGasdkYop0QMlGMyIma1MkYwZ0Vi5mQwMGaK5WWoplMiBnTXFWeKdVWtpUaPlWSYpleW5WSztGRPFzaU5UeVpWTyUkaPlWQIVGbKNETpF1VZtGbtNWMkdlW6J0UatmQpJGb0JjYVpUaPlWSXRmeKlXZukjSp5UMJpXVJpUaPl2YHJGaKlXZ"
    url:
      "https://gnpac-317823.uc.r.appspot.com/auth?u=F9WdstGWlFUOm9VMsNkUzh2XJFXZ2d3d1kTY402X2pmVORmYJFVZUFjY14CMulkaaRkWoZkeNJTWXpFbadlTXFTRjZjVV5ETaR1UT5kMUZjSs1Ed5cUU1lleVdGMXVVNGdUS5FzQJFVOyUVQOx2Y0F0QVRzYE9kMONzY0oFSatmVXRGMWdFZrhmeORzdH90MnRkY3VFWahmRXlFcwVVWXVzVWl2bqlUNWJTYpdXaJlXVXlFNRpXT4VlaJZTS5NGasdkYop0QMlGMyIma1MkYwZ0Vi5mQwMGaK5WWoplMiBnTXFWeKdVWtpUaPlWSYpleW5WSztmeOhXRq1kMVpWTyUkaPlWQIVGbKNETpF1VZtGbtNWMkdlW6J0UatmQpJGb0JjYVpUaPlWSXRmeKlXZukjSp5UMJpXVJpUaPl2YHJGaKlXZ",
    jwt: null,
  }),

  beforeMount() {
    console.log("beforemount");
    this.llenarFormulario();
  },
  methods: {
    llenarFormulario() {

      var urlActual = window.location.href;

      var urlSeparada = urlActual.split("code?r=");

      console.log("Url Separada 1");
      console.log(urlSeparada[0]);
      console.log("Url Separada 2");
      console.log(urlSeparada[1]);

      this.uOriginal = urlSeparada[1]

  /*     var uSplit = this.uOriginal.split("#")

      this.uModificada = uSplit[0]

      console.log("uModificada")
      console.log(this.uModificada) */

      var splitString = this.uOriginal.split(""); // var splitString = "hello".split("");
      // ["h", "e", "l", "l", "o"]

      // Step 2. Use the reverse() method to reverse the new created array
      var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
      // ["o", "l", "l", "e", "h"]

      // Step 3. Use the join() method to join all elements of the array into a string
      var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
      // "olleh"

      //Step 4. Return the reversed string

      console.log(joinArray);

      var base64 = window.atob(joinArray);

      console.log("base64");
      console.log(base64);
      console.log(window.location.href);

      var jwt = VueJwtDecode.decode(base64);

      this.email = jwt.user;

      //var jwt = JSON.parse(jsonPayload);

      console.log(jwt);

      this.jwt = jwt;
    },
    login() {
      console.log("this.jwt.alias");
      console.log(this.jwt.alias);

      console.log("this.password");
      console.log(this.password);

      if (this.jwt.alias == this.password) {
        alert("Password correcto");
        this.step = 1;
      } else {
        alert("Password incorrecto");
      }

 /*      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.email,
          pwd: this.password
        }),
      };
      fetch(
        "https://back-dot-gnpac-317823.uc.r.appspot.com/api/v1/auth/login",
        requestOptions
      ).then((response) => response.json());
      //   .then(data => (this.postId = data.id)); */

      console.log(this.email);
    },
    terminarRegistro(){

var md5 = require('md5');
 
var md5Password = md5(this.newPassword);

console.log("md5Contrasena")
console.log(md5Password)

     
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.email,
          pwd: md5Password,
          alias: this.jwt.alias,
          key: this.uOriginal
        }),
      };
      fetch(
        "https://back-dot-gnpac-317823.uc.r.appspot.com/api/v1/auth/olvidoReset",
        requestOptions
      ).then((response) => response.json());
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(22, 69, 105, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-submit {
  background: #ff9318;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #e07800;
  }
}
</style>
