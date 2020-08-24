<template>
  <div class="project-details">
    <div v-if="fetchingCurrentProject" class="loader">
      <img src="../../assets/spinner.svg" alt />
    </div>
    <template v-else>
      <div v-if="currentProject.id" class="project-header">
        <h1 class="heading">{{currentProject.title}}</h1>
        <p>Published at {{dateString()}}</p>
        <Columns />
      </div>
      <p v-else>No project found</p>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { formatDate } from "../../helpers";
import Columns from "./task/Columns";

export default {
  name: "ProjectDetails",
  components: {
    Columns,
  },
  props: ["projectId"],
  computed: {
    ...mapGetters({
      fetchingCurrentProject: "project/fetchingCurrentProject",
      currentProject: "project/currentProject",
    }),
  },
  mounted() {
    this.fetchCurrentProject(this.projectId);
  },
  methods: {
    ...mapActions({
      fetchCurrentProject: "project/fetchCurrentProject",
    }),
    dateString() {
      return formatDate(this.currentProject.publishedAt);
    },
  },
};
</script>

<style scoped>
@import "../../assets/style.css";

.project-header {
  text-align: center;
}

h1 {
  margin-bottom: var(--spacehalf);
  font-family: var(--heading);
}

p {
  color: var(--borderColor);
  text-align: center;
}
</style>