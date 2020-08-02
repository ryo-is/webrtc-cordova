import { InjectionKey } from 'vue'
import { CounterStore } from '@/store/counter'

export const CounterKey: InjectionKey<CounterStore> = Symbol('CounterStore')
