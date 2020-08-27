<template>
  <div class="wrapper container">
    <ProjectDetails v-if="!loadingUser" :projectId="$route.params.projectid" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectDetails from "../components/project/ProjectDetails";

export default {
  name: "CurrentProject",
  components: {
    ProjectDetails,
  },
  computed: {
    ...mapGetters({
      loadingUser: "auth/loadingUser",
    }),
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

@media (max-width: 600px) {
  .wrapper {
    padding-top: var(--spaceTopLg);
  }
}
</style>