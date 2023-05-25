<template>
  <div id="content-main" class="content-main">
    <EmployeeList></EmployeeList>
  </div>
</template>

<script>
import EmployeeList from "../views/employee/EmployeeList.vue";
export default {
  name: "TheMain",
  components: {
    EmployeeList,
  },
};
</script>

<style></style>
