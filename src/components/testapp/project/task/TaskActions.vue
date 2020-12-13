<template>
  <div class="actions">
    <p>Move to</p>
    <button
      class="status-btn"
      v-if="this.status !== 'todo'"
      @click="clickStatus('todo')"
    >
      Todo
    </button>
    <button
      class="status-btn"
      v-if="this.status !== 'in-progress'"
      @click="clickStatus('in-progress')"
    >
      In Progress
    </button>
    <button
      class="status-btn"
      v-if="this.status !== 'done'"
      @click="clickStatus('done')"
    >
      Done
    </button>
    <div class="divider"></div>
    <button class="error" @click="clickDelete">Remove task</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TaskActions",
  props: ["status", "taskId", "toggleActions"],
  computed: {
    ...mapGetters({
      currentProject: "testapp/currentProject",
    }),
  },
  methods: {
    ...mapActions({
      updateTask: "testapp/updateTask",
      removeTask: "testapp/removeTask",
    }),
    clickStatus(status) {
      this.updateTask({
        taskId: this.taskId,
        status,
        toggleActions: this.toggleActions,
      });
    },
    clickDelete() {
      this.removeTask({
        taskId: this.taskId,
        toggleActions: this.toggleActions,
      });
    },
  },
};
</script>

<style scoped>
@import "../../../../assets/style.css";

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
