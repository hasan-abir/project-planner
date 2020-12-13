<template>
  <div>
    <p>
      This is the frontend demo of the actual app. <br />To be able to use the
      actual app, you need to be logged in as it uses Authentication.
    </p>
    <div class="row">
      <Todo
        :tasks="currentProject.tasks.filter((task) => task.status == 'todo')"
      />
      <InProgress
        :tasks="
          currentProject.tasks.filter((task) => task.status == 'in-progress')
        "
      />
      <Done
        :tasks="currentProject.tasks.filter((task) => task.status == 'done')"
      />
    </div>
  </div>
</template> 

<script>
import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";
import { mapGetters } from "vuex";

export default {
  name: "Columns",
  components: {
    Todo,
    InProgress,
    Done,
  },
  computed: {
    ...mapGetters({
      currentProject: "testapp/currentProject",
    }),
  },
};
</script>

<style scoped>
@import "../../../../assets/style.css";
.row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
p {
  margin-top: var(--space2);
  margin-bottom: var(--space3);
}

@media (max-width: 600px) {
  .row {
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
  }
}
</style>