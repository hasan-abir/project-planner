<template>
  <div class="delete-project">
    <button class="closer" @click="toggleDelete(false)" :disabled="removingProject"></button>
    <div class="card">
      <p>Are you sure you want to remove this project?</p>
      <div class="btn-group">
        <button
          :disabled="removingProject"
          class="error"
          @click="deleteProject({projectId, toggleDelete})"
        >Remove</button>
        <button :disabled="removingProject" class="cancel" @click="toggleDelete(false)">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DeleteProject",
  props: ["toggleDelete", "projectId"],
  computed: {
    ...mapGetters({
      removingProject: "project/removingProject",
    }),
  },
  methods: {
    ...mapActions({
      deleteProject: "project/deleteProject",
    }),
  },
};
</script>

<style scoped>
@import "../../assets/style.css";

.delete-project {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.closer {
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
}

.card {
  padding: var(--space2);
  z-index: 40;
  background: var(--light);
  border-radius: var(--round);
  margin: var(--space1);
}

p {
  margin-bottom: var(--space1half);
}

.error {
  margin-right: var(--spacehalf);
}
.cancel {
  color: var(--font);
  background: var(--light);
  border: 1px solid var(--font);
  padding: var(--spacehalf);
  border-radius: var(--round);
  font-size: var(--sizeSm);
}
</style>