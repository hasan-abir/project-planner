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
        <button
          class="error"
          :disabled="addingTask || updatingTask || removingTask"
          @click="toggleDelete(true)"
        >Remove Project</button>
        <DeleteProject
          v-if="confirmDelete"
          :toggleDelete="toggleDelete"
          :projectId="currentProject.id"
        />
      </div>
      <p v-else>No project found</p>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { formatDate } from "../../helpers";
import Columns from "./task/Columns";
import DeleteProject from "./DeleteProject";

export default {
  name: "ProjectDetails",
  components: {
    Columns,
    DeleteProject,
  },
  props: ["projectId"],
  data() {
    return {
      confirmDelete: false,
    };
  },
  computed: {
    ...mapGetters({
      fetchingCurrentProject: "project/fetchingCurrentProject",
      currentProject: "project/currentProject",
      addingTask: "project/addingTask",
      updatingTask: "project/updatingTask",
      removingTask: "project/removingTask",
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
    toggleDelete(value) {
      this.confirmDelete = value;
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

.error {
  margin-top: var(--space3);
}
</style>