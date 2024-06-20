<script lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

import { DifficultyLevels } from '@/enum/DifficultyLevels'
import { ExerciseTypes } from '@/enum/ExerciseTypes'

import { getProducts, updateProducts } from '@/api/ProductsAPI'

import type { IExercise, IExerciseInTable } from '@/interfaces/IExercise'

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup() {
    //#region Вымышленные данные.
    const sampleData: IExerciseInTable[] = [
      {
        id: 1,
        name: 'Приседания со штангой',
        description: 'Лучшее упражнение для сильной спины!',
        type: ExerciseTypes.strengthExercises,
        difficulty: DifficultyLevels.advanced,
        duration: 20,
        sets: 4,
        repetitions: 8,
        isPlaceholder: false
      },
      {
        id: 2,
        name: 'Волейбол',
        description: 'Прекрасная игра, которая тренирует выносливость!',
        type: ExerciseTypes.cardio,
        difficulty: DifficultyLevels.intermediate,
        duration: 60,
        sets: null,
        repetitions: null,
        isPlaceholder: false
      },
      {
        id: 3,
        name: 'Наклоны вперед стоя',
        description: 'Прекрасно для утренней зарядки!',
        type: ExerciseTypes.stretching,
        difficulty: DifficultyLevels.beginner,
        duration: 1,
        sets: null,
        repetitions: 10,
        isPlaceholder: false
      }
    ]
    //#endregion Вымышленные данные.

    //#region Данные.
    /**
     * Данные таблицы.
     */
    const tableData: Ref<IExerciseInTable[]> = ref<IExerciseInTable[]>(sampleData)
    //#endregion Данные.

    //#region Методы.
    /**
     * Загрузить таблицу.
     */
    const loadProducts = async () => {
      try {
        const data: IExercise[] = await getProducts()
        /* tableData.value = []
        tableData.value = data.map((item) => {
          return {
            ...item,
            isPlaceholder: false
          }
        }) */
      } catch (error) {
        console.log(error)
      } finally {
        addPseudoItem()
      }
    }

    /**
     * Сохранить таблицу.
     */
    const saveProducts = async () => {
      try {
        const data: IExercise[] = await updateProducts(tableData.value)
        /* tableData.value = []
        tableData.value = data.map((item) => {
          return {
            ...item,
            isPlaceholder: false
          }
        }) */
      } catch (error) {
        console.log(error)
      } finally {
        addPseudoItem()
      }
    }
    /**
     * Добавить невидимый элемент в начало списка продуктов
     * (нужно для правильной работы пунктирного плейсхолдера).
     */
    const addPseudoItem = () => {
      const pseudoItem: IExerciseInTable = {
        id: -2,
        name: '',
        description: '',
        type: ExerciseTypes.stretching,
        difficulty: DifficultyLevels.beginner,
        duration: 0,
        sets: null,
        repetitions: null,
        isPlaceholder: false
      }

      tableData.value.splice(0, 0, pseudoItem)
    }

    /**
     * Добавить новый продукт в таблицу.
     */
    const addRow = () => {
      const newRow: IExerciseInTable = {
        id: -1,
        name: '',
        description: '',
        type: ExerciseTypes.stretching,
        difficulty: DifficultyLevels.beginner,
        duration: 0,
        sets: null,
        repetitions: null,
        isPlaceholder: false
      }

      tableData.value = [...tableData.value, newRow]
    }

    /**
     * Сохранить таблицу.
     */
    const save = () => {
      console.log('Ajax запрос Сохранить данные')
    }
    //#endregion Методы.

    //#region Drag & Drop.
    let isPlaceholderCreated = false

    const onDragEnd = (e: any) => {
      for (const item of tableData.value) {
        if (item.isPlaceholder === true) {
          const index = tableData.value.indexOf(item)
          tableData.value.splice(index, 1)
        }
      }
      isPlaceholderCreated = false
    }

    const checkMove = (e: any) => {
      console.log(e)
      if (!isPlaceholderCreated) {
        if (e.draggedContext.index !== e.draggedContext.futureIndex) {
          isPlaceholderCreated = true

          const placeholderItem: IExerciseInTable = {
            id: -3,
            name: '',
            description: '',
            type: ExerciseTypes.stretching,
            difficulty: DifficultyLevels.beginner,
            duration: 0,
            sets: null,
            repetitions: null,
            isPlaceholder: true
          }
          if (e.draggedContext.index > e.draggedContext.futureIndex) {
            tableData.value.splice(e.draggedContext.index + 1, 0, placeholderItem)
          } else {
            tableData.value.splice(0, 1, tableData.value[0])
            tableData.value.splice(e.draggedContext.index + 1, 0, placeholderItem)
          }
        }
      }
    }

    onMounted(() => {
      loadProducts()
    })
    //#endregion Drag & Drop.

    return {
      sampleData,
      tableData,
      addRow,
      onDragEnd,
      checkMove,
      save
    }
  }
})
</script>

<template>
  <main class="component">
    <div class="content-area">
      <h1 class="component-title">Упражнения</h1>

      <section class="section">
        <button class="blue-button" @click="addRow">+ Добавить строку</button>
        <button class="blue-button" @click="save">Сохранить</button>
      </section>

      <section class="section">
        <table class="exercise-table">
          <thead>
            <tr>
              <th><div class="head-cell col-1">&nbsp;</div></th>
              <th><div class="head-cell col-2">Название</div></th>
              <th>
                <div class="head-cell col-3">Описание</div>
              </th>
              <th><div class="head-cell col-4">Тип</div></th>
              <th><div class="head-cell col-5">Сложность</div></th>
              <th>
                <div class="head-cell col-6">Длительность</div>
              </th>
              <th><div class="head-cell col-7">Сеты и повторения</div></th>
            </tr>
          </thead>
          <draggable
            v-model="tableData"
            tag="tbody"
            item-key="name"
            @end="onDragEnd"
            :move="checkMove"
            ghost-class="ghost-element"
          >
            <tr
              v-for="(item, index) in tableData"
              :class="{
                placeholder: item.isPlaceholder,
                zeroPositionPseudoItem: index === 0
              }"
            >
              <td class="cell">
                <button class="cell-content-btn">
                  <img src="@/assets/images/drag-and-drop.svg" alt="Drag!" width="24" height="24" />
                </button>
                <p class="cell-content-right-el">{{ index }}</p>
              </td>
              <td class="cell">
                <p>{{ item.name }}</p>
              </td>
              <td class="cell">
                <p>{{ item.description }}</p>
              </td>
              <td class="cell">
                <p>{{ item.type }}</p>
              </td>
              <td class="cell">
                <p>{{ item.difficulty }}</p>
              </td>
              <td class="cell">
                <p>{{ item.duration }}</p>
              </td>
              <td class="cell">
                <p>{{ item.sets }} / {{ item.repetitions }}</p>
              </td>
            </tr>
          </draggable>
        </table>
        <div class="white-fade"></div>
      </section>
    </div>
    <h3 class="no-mobile-yet">Мобильная версия сайта находится в разработке.</h3>
  </main>
</template>
<style scoped>
/* Общее */
* {
  color: black;
}

.white-fade {
  content: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 100%);
  position: absolute;
  top: 0;
  right: 0px;
  width: 20px;
  height: 100%;
  z-index: 10;
}

.no-mobile-yet {
  visibility: hidden;
  margin: 10px;
}

/*Драг энд Дроп*/
.placeholder {
  border: 2px dashed black;
}

.placeholder > * {
  visibility: hidden;
}

.ghost-element {
  background-color: lightgray;
}

.zeroPositionPseudoItem {
  visibility: hidden;
  max-height: 0px;
  position: absolute;
}

.customCursor:hover,
.customCursor:hover * {
  cursor: url(@/assets/customCursor.png), auto !important;
}

/* Кнопка Создать */
.blue-button {
  margin: 10px 30px;
  background-color: #2f8cff;
  border: none;
  border-radius: 3px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.blue-button:hover {
  background-color: black;
}

/* Таблица */
.exercise-table {
  border-collapse: collapse;
  border-spacing: 0px;
  margin: 10px 10px;
}

.exercise-table th {
  border: 1px solid lightgray;
  padding: 5px;
}

th {
  border: 2px solid black;
  padding: 0;
  margin: 0px;
  overflow: auto;
}

div.head-cell {
  resize: horizontal;
  display: block;
  overflow: hidden !important;
  padding: 0px 20px;
  white-space: nowrap;
  min-width: 10px;
}

/* Ячейки */
.cell {
  position: relative;
  height: 30px;
  overflow: hidden;
  margin: 5px;
  height: 35px;
}

.cell-content {
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100% - 10px);
  margin: 5px;
  padding: 5px;
}

.cell-content-btn {
  position: absolute;
  top: 0px;
  left: 0px;
  margin: 5px;
  padding: 5px;
}

.cell-content-right-el {
  position: absolute;
  top: 0px;
  left: 30px;
  width: calc(100% - 40px);
  margin: 5px;
  padding: 5px;
}

.col-1 {
  width: 50px;
}

/*Медиазапросы*/
/* https://disk.yandex.ru/d/H4uidsXn9F9fhA */
/* XS */

/* XS & S */
@media (max-width: 767px) {
  .content-area {
    visibility: hidden;
  }
  .no-mobile-yet {
    visibility: visible;
  }
}

/* M */
@media (min-width: 768px) and (max-width: 991px) {
  .col-2 {
    width: 50px;
  }
  .col-3 {
    width: 100px;
  }
  .col-4,
  .col-5,
  .col-6,
  .col-7 {
    width: 70px;
  }
}

/* L */
@media (min-width: 992px) and (max-width: 1199px) {
  .col-2 {
    width: 80px;
  }
  .col-3 {
    width: 150px;
  }
  .col-4,
  .col-5,
  .col-6,
  .col-7 {
    width: 100px;
  }
}
/* XL */
@media (min-width: 1200px) and (max-width: 1399px) {
  .col-2 {
    width: 90px;
  }
  .col-3 {
    width: 250px;
  }
  .col-4,
  .col-5,
  .col-6,
  .col-7 {
    width: 130px;
  }
}

/* XXL */
@media (min-width: 1400px) {
  .col-2 {
    width: 100px;
  }
  .col-3 {
    width: 300px;
  }
  .col-4,
  .col-5,
  .col-6,
  .col-7 {
    width: 150px;
  }
}
</style>
