<template>
  <q-page class="row q-pt-xl">
    <div class="full-width q-px-xl">
      <div class="q-mb-xl">
        <q-input v-model="tempData.name" label="姓名" />
        <q-input v-model="tempData.age" label="年齡" />
        <q-btn color="primary" class="q-mt-md" @click="addData">新增</q-btn>
      </div>

      <q-table
        flat
        bordered
        ref="tableRef"
        :rows="blockData"
        :columns="(tableConfig as QTableProps['columns'])"
        row-key="id"
        hide-pagination
        separator="cell"
        :rows-per-page-options="[0]"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th></q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="min-width: 120px"
            >
              <div>{{ col.value }}</div>
              <template v-if="col.name === 'name'">
                <q-popup-edit v-model="props.row.name">
                  <q-input v-model="props.row.name" dense autofocus counter />
                </q-popup-edit>
              </template>
              <template v-if="col.name === 'age'">
                <q-popup-edit v-model="props.row.age">
                  <q-input v-model="props.row.age" dense autofocus counter />
                </q-popup-edit>
              </template>
            </q-td>
            <q-td class="text-right" auto-width v-if="tableButtons.length > 0">
              <q-btn
                @click="handleClickOption(btn, props.row)"
                v-for="(btn, index) in tableButtons"
                :key="index"
                size="sm"
                color="grey-6"
                round
                dense
                :icon="btn.icon"
                class="q-ml-md"
                padding="5px 5px"
              >
                <q-tooltip
                  transition-show="scale"
                  transition-hide="scale"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  {{ btn.label }}
                </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:no-data="{ icon }">
          <div
            class="full-width row flex-center items-center text-primary q-gutter-sm"
            style="font-size: 18px"
          >
            <q-icon size="2em" :name="icon" />
            <span> 無相關資料 </span>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';
import {
  apiGetList,
  apiAddData,
  apiEditData,
  apiDeleteData,
} from '../api/interView';
import { ref } from 'vue';
interface btnType {
  label: string;
  icon: string;
  status: string;
}
const blockData = ref([]);
const tableConfig = ref([
  {
    label: '姓名',
    name: 'name',
    field: 'name',
    align: 'left',
  },
  {
    label: '年齡',
    name: 'age',
    field: 'age',
    align: 'left',
  },
]);
const tableButtons = ref([
  {
    label: '編輯',
    icon: 'edit',
    status: 'edit',
  },
  {
    label: '刪除',
    icon: 'delete',
    status: 'delete',
  },
]);

const tempData = ref({
  name: '',
  age: '',
});
const handleClickOption = async (btn: btnType, data: any) => {
  console.log(data);
  if (btn.status === 'edit') {
    await apiEditData(data);
  } else {
    if (window.confirm('確定要刪除這個項目嗎？')) {
      const res = await apiDeleteData(data.id);
      if (res) {
        getData();
      }
    } else {
      return;
    }
  }
};

const addData = async () => {
  if (
    tempData.value.name === '' ||
    tempData.value.age === '' ||
    !/^\d+$/.test(tempData.value.age)
  ) {
    alert('資料未填寫完全或年齡不是正整數');
    return;
  } else {
    const data = {
      name: tempData.value.name,
      age: tempData.value.age,
    };
    const res = await apiAddData(data);
    if (res) {
      getData();
      tempData.value.name = '';
      tempData.value.age = '';
    } else {
      alert('error');
    }
  }
};
const getData = async () => {
  const res = await apiGetList();
  console.log(res);
  blockData.value = res.data;
};
getData();
</script>

<style lang="scss" scoped>
.q-table th {
  font-size: 20px;
  font-weight: bold;
}

.q-table tbody td {
  font-size: 18px;
}
</style>
