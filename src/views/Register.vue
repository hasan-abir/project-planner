<template>
  <div class="wrapper">
    <div class="card">
      <h1>Sign up</h1>
      <p class="sub-header">To be able to make projects.</p>
      <form @submit.prevent="registerSubmit">
        <div class="error" v-if="errors && errors.non_field">{{ errors.non_field }}</div>
        <div class="error" v-if="errors && errors.displayName">{{ errors.displayName }}</div>
        <div>
          <label>Display name</label>
          <input type="text" v-model="displayName" placeholder="i.e. John Smith" required />
        </div>
        <div class="error" v-if="errors && errors.email">{{ errors.email }}</div>
        <div>
          <label>Email</label>
          <input type="email" v-model="email" placeholder="i.e. john@example.com" required />
        </div>
        <div class="error" v-if="errors && errors.password">{{ errors.password }}</div>
        <div>
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Must be at least 6 characters"
            required
          />
        </div>
        <input type="submit" value="Sign Up" :disabled="authenticating" />
        <div class="divider"></div>
        <p class="or">OR</p>
      </form>
      <button @click="registerClick" :disabled="authenticating">
        <span>
          <i class="fab fa-google"></i>
        </span> Sign Up with Google
      </button>
      <div class="divider"></div>
      <p class="bottom-text">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      displayName: "",
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
      basicRegister: "auth/basicRegister",
      googleSignIn: "auth/googleSignIn",
      clearErrors: "auth/clearErrors",
    }),
    registerSubmit() {
      this.basicRegister({
        displayName: this.displayName,
        email: this.email,
        password: this.password,
        clearForm: this.clearForm,
      });
    },
    registerClick() {
      this.googleSignIn(this.clearForm);
    },
    clearForm() {
      this.displayName = "";
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

input[type="submit"],
button {
  width: 100%;
  padding: var(--spacehalf);
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
  margin-bottom: var(--spacehalf);
  font-family: var(--heading);
}

.sub-header {
  font-weight: 300;
  margin-bottom: var(--space3);
}

.or {
  margin-bottom: var(--space1);
}

h1,
.sub-header,
.bottom-text,
.or {
  text-align: center;
}

@media (max-width: 600px) {
  .wrapper {
    padding-top: var(--spaceTopLg);
  }
  .card {
    border: none;
  }
}
</style>
