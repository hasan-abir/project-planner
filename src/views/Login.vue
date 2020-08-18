<template>
  <div class="wrapper">
    <div class="card">
      <h1>Sign in</h1>
      <form @submit.prevent="registerSubmit">
        <div class="error" v-if="errors && errors.non_field">{{ errors.non_field }}</div>
        <div class="error" v-if="errors && errors.email">{{ errors.email }}</div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="error" v-if="errors && errors.password">{{ errors.password }}</div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <input type="submit" value="Sign In" :disabled="authenticating" />
        <div class="divider"></div>
        <p class="or">OR</p>
      </form>
      <button @click="registerClick" :disabled="authenticating">
        <span>
          <i class="fab fa-google"></i>
        </span> Sign In with Google
      </button>
      <div class="divider"></div>
      <p class="bottom-text">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters({
      authenticating: "auth/authenticating",
      errors: "auth/errors",
    }),
  },
  mounted() {
    this.clearErrors();
  },
  methods: {
    ...mapActions({
      basicLogin: "auth/basicLogin",
      googleSignIn: "auth/googleSignIn",
      clearErrors: "auth/clearErrors",
    }),
    registerSubmit() {
      this.basicLogin({
        email: this.email,
        password: this.password,
        clearForm: this.clearForm,
      });
    },
    registerClick() {
      this.googleSignIn(this.clearForm);
    },
    clearForm() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
@import "../assets/style.css";

.wrapper {
  min-height: 100vh;
  padding-top: var(--spaceTop);
  padding-bottom: var(--space2);
}

.card {
  border: 1px solid var(--borderColor);
  padding: var(--space2);
  max-width: 400px;
  margin: 0 auto;
  border-radius: var(--round);
}

.error {
  margin-bottom: var(--spacehalf);
}

form {
  width: 100%;
}

input:not([type="submit"]) {
  margin-top: var(--spacehalf);
  margin-bottom: var(--space1);
  padding: var(--spacehalf);
  border-radius: var(--round);
  border: 1px solid var(--borderColor);
}

input:not([type="submit"]):focus {
  border: 1px solid var(--primary);
}

input:not([type="submit"])::placeholder {
  font-size: var(--sizeSm);
  color: var(--borderColor);
}

input[type="submit"],
button {
  width: 100%;
  padding: var(--spacehalf);
  border-radius: var(--round);
  text-transform: uppercase;
}

input[type="submit"] {
  background: var(--primary);
  color: var(--light);
}

input[type="submit"]:disabled {
  background: var(--primaryLight);
}

.divider {
  height: 1px;
  margin: var(--space2) 0;
  background: var(--borderColor);
}

button {
  padding: var(--space1);
  background: var(--google);
  color: var(--light);
}

button:disabled {
  background: var(--googleLight);
}

button span {
  margin-right: var(--space1);
}

h1 {
  margin-bottom: var(--space3);
  font-weight: 400;
}

.or {
  margin-bottom: var(--space1);
}

h1,
.bottom-text,
.or {
  text-align: center;
}
</style>
