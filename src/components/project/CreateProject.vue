<template>
  <div class="create-project">
    <h1>Create a new project</h1>
    <p>Manage your lifelong dream projects with tasks just like that!</p>
    <div class="form-wrapper">
      <form @submit.prevent="projectSubmit">
        <div
          class="success"
          v-if="success && success.projectCreated"
          @click="clearSuccess"
        >{{ success.projectCreated }}</div>
        <div class="error" v-if="errors && errors.non_field">{{ errors.non_field }}</div>
        <div class="error" v-if="errors && errors.title">{{ errors.title }}</div>
        <div class="form-group">
          <label>Project Title</label>
          <input type="text" placeholder="Title" v-model="projectTitle" />
        </div>
        <input type="submit" value="Create" :disabled="creatingProject" />
      </form>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateProject",
  data() {
    return {
      projectTitle: "",
    };
  },
  computed: {
    ...mapGetters({
      creatingProject: "project/creatingProject",
      errors: "project/errors",
      success: "project/success",
    }),
  },
  methods: {
    ...mapActions({
      createProject: "project/createProject",
      clearSuccess: "project/clearSuccess",
    }),
    projectSubmit() {
      this.createProject({
        projectTitle: this.projectTitle,
        clearForm: this.clearForm,
      });
    },
    clearForm() {
      this.projectTitle = "";
    },
  },
};
</script>

<style scoped>
@import "../../assets/style.css";

.create-project {
  text-align: center;
}

h1 {
  font-family: var(--heading);
  margin-bottom: var(--spacehalf);
}

p {
  margin-bottom: var(--space3);
}

.form-wrapper {
  max-width: 400px;
  margin: 0 auto;
  padding-bottom: var(--space2);
}

input[type="submit"],
button {
  width: 100%;
  padding: var(--spacehalf);
}

.error,
.success {
  margin-bottom: var(--space1);
}
</style>