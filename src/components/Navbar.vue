<template>
  <div class="wrapper">
    <div class="container">
      <router-link to="/" class="brand">Project Planner</router-link>

      <ul v-if="!loadingUser">
        <template v-if="isLoggedIn">
          <li>
            <router-link to="/dashboard" class="link">Dashboard</router-link>
          </li>
          <li>
            <button @click="logOut" class="link logout">Logout</button>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/login" class="link">Login</router-link>
          </li>
          <li>
            <router-link to="/register" class="link">Register</router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
      loadingUser: "auth/loadingUser",
    }),
  },
  methods: {
    ...mapActions({
      logOut: "auth/logOut",
    }),
  },
};
</script>

<style scoped>
@import "../assets/style.css";

.wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background: var(--light);
  border-bottom: 1px solid var(--borderColor);
}

.brand {
  font-family: var(--heading);
  color: var(--font);
  font-weight: 700;
  text-decoration: none;
  padding: var(--space1) 0;
}

.link {
  text-decoration: none;
  color: var(--font);
  padding: var(--space1);
  display: inline-block;
  font-size: var(--sizeSm);
  text-transform: uppercase;
}

.logout {
  background: none;
}

.container {
  padding: var(--spacehalf) var(--space2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  list-style: none;
}

li {
  display: inline;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}
</style>
