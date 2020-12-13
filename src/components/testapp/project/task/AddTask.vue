<template>
  <div>
    <form @submit.prevent="submitTask">
      <div class="form-group">
        <div
          class="success"
          v-if="success && success.projectUpdated"
          @click="clearSuccess"
        >
          {{ success.projectUpdated }}
        </div>
        <div class="error" v-if="errors && errors.non_field">
          {{ errors.non_field }}
        </div>
        <div class="error" v-if="errors && errors.note">{{ errors.note }}</div>
        <label>Add Note</label>
        <textarea rows="2" v-model="note"></textarea>
      </div>
      <div class="btn-group">
        <input type="submit" value="Add" />
        <button @click="toggleAddForm(false)" type="button">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddTask",
  props: ["toggleAddForm", "status"],
  data() {
    return {
      note: "",
    };
  },
  computed: {
    ...mapGetters({
      currentProject: "testapp/currentProject",
      errors: "testapp/errors",
      success: "testapp/success",
    }),
  },
  methods: {
    ...mapActions({
      addTask: "testapp/addTask",
      clearSuccess: "testapp/clearSuccess",
    }),
    submitTask() {
      this.addTask({
        note: this.note,
        status: this.status,
        clearForm: this.clearForm,
      });
    },
    clearForm() {
      this.note = "";
    },
  },
};
</script>

<style scoped>
@import "../../../../assets/style.css";

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

.error,
.success {
  margin-bottom: var(--space1);
}
</style>