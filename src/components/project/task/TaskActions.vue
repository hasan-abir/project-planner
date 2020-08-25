<template>
  <div class="actions">
    <p>Move to</p>
    <button
      class="status-btn"
      v-if="this.status !== 'todo'"
      @click="clickStatus('todo')"
      :disabled="updatingTask || removingTask"
    >Todo</button>
    <button
      class="status-btn"
      v-if="this.status !== 'in-progress'"
      @click="clickStatus('in-progress')"
      :disabled="updatingTask || removingTask"
    >In Progress</button>
    <button
      class="status-btn"
      v-if="this.status !== 'done'"
      @click="clickStatus('done')"
      :disabled="updatingTask || removingTask"
    >Done</button>
    <div class="divider"></div>
    <button class="error" @click="clickDelete" :disabled="updatingTask || removingTask">Remove task</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TaskActions",
  props: ["status", "taskId", "toggleActions"],
  computed: {
    ...mapGetters({
      currentProject: "project/currentProject",
      updatingTask: "project/updatingTask",
      removingTask: "project/removingTask",
    }),
  },
  methods: {
    ...mapActions({
      updateTask: "project/updateTask",
      removeTask: "project/removeTask",
    }),
    clickStatus(status) {
      this.updateTask({
        projectId: this.currentProject.id,
        taskId: this.taskId,
        status,
        toggleActions: this.toggleActions,
      });
    },
    clickDelete() {
      this.removeTask({
        projectId: this.currentProject.id,
        taskId: this.taskId,
        toggleActions: this.toggleActions,
      });
    },
  },
};
</script>

<style scoped>
@import "../../../assets/style.css";

.actions {
  font-size: var(--sizeSm);
}

p {
  text-align: center;
  font-weight: bold;
  margin-bottom: var(--space1);
}

.divider {
  margin-top: var(--spacehalf);
  margin-bottom: var(--space1);
}

.status-btn {
  margin-bottom: var(--space1);
  background: none;
}

button {
  display: block;
  width: 100%;
  font-size: var(--sizeSm);
}
</style>
