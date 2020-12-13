<template>
  <div class="task">
    <p>{{ task.note }}</p>
    <div class="dropdown">
      <button @click="toggleActions(true)">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <template v-if="actionsOpen">
        <div class="dropdown-content">
          <TaskActions
            :status="task.status"
            :taskId="task.id"
            :toggleActions="toggleActions"
          />
        </div>
        <div class="dropdown-closer" @click="toggleActions(false)"></div>
      </template>
    </div>
  </div>
</template>

<script>
import TaskActions from "./TaskActions";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Task",
  props: ["task"],
  components: {
    TaskActions,
  },
  data() {
    return {
      actionsOpen: false,
    };
  },
  methods: {
    toggleActions(value) {
      this.actionsOpen = value;
    },
  },
};
</script>

<style scoped>
@import "../../../../assets/style.css";

.task {
  text-align: left;
  border: 1px solid var(--borderColor);
  padding: var(--space1);
  border-radius: var(--round);
  margin: var(--spacehalf) 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
}

p {
  font-size: var(--sizeSm);
  margin-right: var(--spacehalf);
}

button {
  color: var(--font);
  background: none;
  padding-left: var(--spacehalf);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: block;
  position: absolute;
  right: 0;
  background: var(--light);
  min-width: 160px;
  border: 1px solid var(--borderColor);
  box-shadow: var(--shadow);
  padding: 12px 16px;
  z-index: 30;
  border-radius: var(--round);
}

.dropdown-closer {
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>