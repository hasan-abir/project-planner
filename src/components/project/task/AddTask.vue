<template>
  <div>
    <form @submit.prevent="submitTask">
      <div class="form-group">
        <div class="error">A note is required</div>
        <label>Add Note</label>
        <textarea rows="2" v-model="task"></textarea>
      </div>
      <div class="btn-group">
        <input type="submit" value="Add" />
        <button @click="toggleAddForm(false)" type="button">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  props: ["toggleAddForm"],
  data() {
    return {
      task: "",
    };
  },
  methods: {
    submitTask() {
      console.log(this.task);
    },
  },
};
</script>

<style scoped>
@import "../../../assets/style.css";

.form-group {
  text-align: left;
}

.btn-group {
  display: flex;
  margin-bottom: var(--space2);
}

label {
  font-size: var(--sizeSm);
}

input[type="submit"] {
  margin-right: var(--spacehalf);
}

input[type="submit"],
button {
  flex: 1;
  padding: var(--spacehalf);
  font-size: var(--sizeSm);
}

button {
  border: 1px solid var(--primary);
  background: none;
  color: var(--primary);
}

.error {
  margin-bottom: var(--space1);
}
</style>