<template>
  <div class="flex justify-center items-start min-h-screen pt-20">
    <form @submit.prevent="createCategory" class="bg-gray-200 shadow-lg rounded-xl p-10 w-full max-w-lg">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-700">Добавление категории</h2>

      <div class="mb-6">
        <label class="block text-gray-600 mb-2 font-medium">Наименование категории</label>
        <InputText type="text"
                   placeholder="Введите наименование"
                   v-model="categoryName"
                   class="w-full p-4 border border-gray-300 rounded-lg" />
      </div>

      <div class="mb-6">
        <label for="file"
               id="file-label"
               class="w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
          <span class="pi pi-upload mr-3 text-xl"></span>
          Выбрать изображение
        </label>
        <input type="file"
               hidden
               id="file"
               name="file"
               @change="changeCaption"
               required
               accept="image/*" />
      </div>

      <div class="flex justify-center">
        <Button type="submit"
                label="Создать"/>
      </div>
    </form>

    <Toast position="bottom-right" />
  </div>
</template>

<script>
  import InputText from "primevue/inputtext";
  import Button from "primevue/button";
  import Toast from "primevue/toast";
  import { useDataStore } from "@/stores/dataStore.js";

  export default {
    name: "CreateCategory",
    components: { InputText, Button, Toast },
    data() {
      return {
        dataStore: useDataStore(),
        categoryName: '',
        categoryImage: null,
      };
    },
    computed: {
      errorMessage() {
        return this.dataStore.errorMessage;
      },
      errorCode() {
        return this.dataStore.errorCode;
      }
    },
    methods: {
      changeCaption(event) {
        const file = event.target.files[0];
        if (file) {
          document.getElementById('file-label').innerHTML =
            '<span class="pi pi-file mr-3"></span>' + file.name;
          this.categoryImage = file;
        } else {
          document.getElementById('file-label').innerHTML =
            '<span class="pi pi-upload mr-3"></span>Выбрать изображение';
          this.categoryImage = null;
        }
      },

      async createCategory() {
        const formData = new FormData();
        formData.append('name', this.categoryName);
        formData.append('image', this.categoryImage);

        await this.dataStore.create_category(formData);

        if (this.errorCode > 0) {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка добавления данных',
            detail: this.errorMessage,
            life: 4000
          });
        } else {
          this.$toast.add({
            severity: 'success',
            summary: 'Данные успешно добавлены',
            detail: this.errorMessage,
            life: 4000
          });
        }
      }
    }
  }
</script>
  <style scoped>
</style>
