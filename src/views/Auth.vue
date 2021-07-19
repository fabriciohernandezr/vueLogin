<template>
  <div v-if="step == 0" class="login">
    <h1 class="title">Autenticar</h1>
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
      <label class="form-label" for="#password">Password:</label>
      <input
        class="form-input"
        type="password"
        id="password"
        v-model="password"
        placeholder="Password"
      />
      <label class="error">{{ datos.message }}</label>
      <input class="form-submit" type="submit" value="Validar" />
    </form>
  </div>
  <div v-if="step == 1" class="login">
    <h1 class="title">Autenticar</h1>
    <form action class="form" @submit.prevent="terminarRegistro">
      <label class="form-label" for="#alias">Alias:</label>
      <input
        class="form-input"
        type="alias"
        id="alias"
        v-model="alias"
        required
      />
      <label class="form-label" for="#password">Password:</label>
      <input
        class="form-input"
        type="password"
        id="password"
        v-model="newPassword"
      />
      <label class="form-label" for="#passwordRepeat">Confirmar contraseña:</label>
      <input
        class="form-input"
        type="password"
        id="passwordRepeat"
        v-model="newPasswordRepeat"
      />
      <div class="loader2">
        <img
          v-if="status"
          style="width: 15px; padding:20px; text-align: center;"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
      </div>
      <label class="error">{{ datos.message }}</label>

      <input
        :disabled="status"
        class="form-submit"
        type="submit"
        value="Terminar Registro"
      />
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
    uOriginal: "",
    uModificada: "",
    status: false,
    alias: "",
    datos: {
      code: "",
      message: "",
    },
    u: "",
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
      this.status = true;

      var urlActual = window.location.href;

      var urlSeparada = urlActual.split("auth?u=");

      console.log("Url Separada 1");
      console.log(urlSeparada[0]);
      console.log("Url Separada 2");
      console.log(urlSeparada[1]);

      this.uOriginal = urlSeparada[1];

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
      this.datos.message = "";

      console.log("this.jwt.alias");
      console.log(this.jwt.alias);

      console.log("this.password");
      console.log(this.password);

      if (this.jwt.alias == this.password) {
        //alert("Password correcto");
        this.step = 1;
        this.datos.message = "";
        this.status = false;
      } else {
        this.datos.message = "Password incorrecto";
        //alert("Password incorrecto");
        this.status = false;
      }
    },
    terminarRegistro() {
      this.status = true;

      this.datos.message = "";

      var md5 = require("md5");

      var md5Password = md5(this.newPassword);
      var md5PasswordRepeat = md5(this.newPasswordRepeat);

      if (md5Password == md5PasswordRepeat) {
        console.log("md5Contrasena");
        console.log(md5Password);

        let This = this;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            pwd: md5Password,
            alias: this.alias,
            key: this.uOriginal,
          }),
        };
        fetch(
          "https://back-dot-gnpac-317823.uc.r.appspot.com/api/v1/auth/registro",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => (this.datos = data))
          .then(function(data) {
            if (data.token) {
              This.datos.message = "Registro correcto";
              window.location.href = "/#/home";
            } else {
              This.status = false;
              This.datos.message = data.message;

              // alert(data.code + ": " + data.message);
              //      window.location.href = "/";
            }
          });
      } else {
        this.datos.message = "Las contraseñas deben coincidir";
        this.status = false;
      }
    },
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
.error {
  color: red;
  margin-top: 2rem;
  text-align: center;
}
</style>
