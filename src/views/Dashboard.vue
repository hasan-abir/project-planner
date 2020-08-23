<template>
  <div class="wrapper container">
    <CreateProject />
    <UserProjects v-if="!loadingUser" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateProject from "@/components/project/CreateProject";
import UserProjects from "@/components/project/UserProjects";

export default {
  name: "Dashboard",
  components: {
    CreateProject,
    UserProjects,
  },
  computed: { ...mapGetters({ loadingUser: "auth/loadingUser" }) },
};
</script>

<style scoped>
@import "../assets/style.css";

.wrapper {
  min-height: 100vh;
  padding-top: var(--spaceTop);
  padding-bottom: var(--space2);
}
</style>
