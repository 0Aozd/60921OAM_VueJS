<template>
  <DataTable :value="transactions"
             :lazy="true"
             :loading="dataStore.loading"
             :paginator="true"
             :rows="perpage"
             :rowsPerPageOptions="[2, 5, 10]"
             :totalRecords=transactions_total
             @page="onPageChange"
             responsive-layout="scroll"
             :laading="true"
             :first="offset">
    <Column field="transactions_id" header="№" />
    <Column field="description" header="Описание транзакции" />
    <Column field="type" header="Тип транзакции" />
    <Column field="amount" header="Количество транзакции" />
    <Column field="date" header="Дата транзакции" />
  </DataTable>
</template>


<script>
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import { useDataStore } from '@/stores/dataStore';

  export default {
    name: 'Transactions',
    components: { DataTable, Column },
    data() {
      return {
        dataStore: useDataStore(),
        perpage: 5,
        offset: 0,
      }
    },
    computed: {
      transactions() {
        return this.dataStore.transactions;
      },
      transactions_total() {
        return this.dataStore.transactions_total;
      }
    },
    mounted() {
      console.log('Transactions component MOUNTED!');
      this.dataStore.get_transactions();
      this.dataStore.get_transactions_total();
      console.log('Transactions=', this.transactions);
    },
    methods: {
      onPageChange(event) {
        this.offset = event.first;
        this.perpage = event.rows;
        this.dataStore.get_transactions(this.offset / this.perpage, this.perpage);
      }
    }
  }
</script>

<style scoped>
  .transactions {
    text-align: center;
    margin-top: 50px;
  }
</style>
