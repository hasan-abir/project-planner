<template>
  <div class="user-projects">
    <div class="loader" v-if="fetchingProjects">
      <img src="../../assets/spinner.svg" alt />
    </div>
    <div class="project-list" v-else>
      <template v-if="projects.length > 0">
        <Project v-for="project in projects" :key="project.id" :project="project" />
      </template>
      <p class="no-project" v-else>You haven't created any projects yet</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Project from "./Project";

export default {
  name: "UserProjects",
  components: {
    Project,
  },
  computed: {
    ...mapGetters({
      fetchingProjects: "project/fetchingProjects",
      projects: "project/projects",
    }),
  },
  mounted() {
    this.fetchUserProjects();
  },
  methods: {
    ...mapActions({
      fetchUserProjects: "project/fetchUserProjects",
    }),
  },
};
</script>

<style scoped>
@import "../../assets/style.css";

.user-projects {
  padding: var(--space2) 0;
}

.project-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.no-project {
  color: var(--borderColor);
}

.error {
  display: block;
  margin: 0 auto;
  margin-top: var(--space2);
}
</style>