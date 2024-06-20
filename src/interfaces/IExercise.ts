import { DifficultyLevels } from '@/enum/DifficultyLevels'
import { ExerciseTypes } from '@/enum/ExerciseTypes'

export interface IExercise {
  id: number
  name: string
  description: string
  type: ExerciseTypes
  difficulty: DifficultyLevels
  duration: number
  sets: number | null
  repetitions: number | null
}

export interface IExerciseInTable extends IExercise {
  /**
   * Плейсхолдер, отображающийся на месте, откуда перетаскивается элемент.
   */
  isPlaceholder: boolean
}
