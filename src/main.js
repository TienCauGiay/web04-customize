import { createApp } from 'vue'
import App from './App.vue'
import MISAInput from './components/input/MISAInput.vue'
import MISADialogEmployeeIdExits from './components/dialog/MISADialogEmployeeIdExits.vue'
import MISADialogEmployeeInputDataNotBlank from './components/dialog/MISADialogEmployeeInputDataNotBlank.vue'
import MISADialogEmployeeConfirmDelete from './components/dialog/MISADialogEmployeeConfirmDelete.vue'
import MISADialogEmployeeSaveAndClose from './components/dialog/MISADialogEmployeeSaveAndClose.vue'

const app = createApp(App);
app.component("misa-input", MISAInput);
app.component("misa-dialog-employee-id-exits", MISADialogEmployeeIdExits);
app.component("misa-dialog-employee-input-data-not-blank", MISADialogEmployeeInputDataNotBlank);
app.component("misa-dialog-employee-confirm-delete", MISADialogEmployeeConfirmDelete);
app.component("misa-dialog-employee-save-and-close", MISADialogEmployeeSaveAndClose);
app.mount('#app');
