<template>
  <div>
    <p>Click the plus icon to create a task for that column</p>
    <div class="row">
      <Todo />
      <InProgress />
      <Done />
    </div>
  </div>
</template>

<script>
import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";

export default {
  name: "Columns",
  components: {
    Todo,
    InProgress,
    Done,
  },
};
</script>

<style scoped>
@import "../../../assets/style.css";
.row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
p {
  margin-top: var(--space2);
  margin-bottom: var(--space5);
}

@media (max-width: 600px) {
  .row {
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
  }
}
</style>