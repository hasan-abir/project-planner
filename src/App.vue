<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    ...mapActions({
      loadUser: "auth/loadUser",
    }),
  },
};
</script>

<style></style>
