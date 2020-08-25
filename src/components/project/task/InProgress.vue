<template>
  <div class="column">
    <div class="header">
      <h4>In Progress</h4>
      <button @click="toggleAddForm(true)">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="divider"></div>
    <AddTask v-if="addOpen" :toggleAddForm="toggleAddForm" status="in-progress" />
    <Task v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>

<script>
import AddTask from "./AddTask";
import Task from "./Task";
import { mapActions } from "vuex";

export default {
  name: "InProgress",
  props: ["tasks"],
  components: {
    AddTask,
    Task,
  },
  data() {
    return {
      addOpen: false,
    };
  },
  methods: {
    ...mapActions({
      clearSuccess: "project/clearSuccess",
      clearErrors: "project/clearErrors",
    }),
    toggleAddForm(value) {
      this.addOpen = value;
      this.clearSuccess();
      this.clearErrors();
    },
  },
};
</script>

<style scoped>
@import "../../../assets/style.css";

.column {
  max-width: 300px;
  flex: 1;
  margin: var(--spacehalf);
  padding: var(--space1half);
  border: 1px solid var(--borderColor);
  border-radius: var(--round);
}

.header {
  display: flex;
  justify-content: space-between;
}

h4 {
  font-family: var(--heading);
}

button {
  background: none;
  color: var(--font);
}

.divider {
  margin-top: var(--space1);
}

@media (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>