interface Special {
  name: string
  damage: string | number
  type: string
}

export interface Pokemon {
  id?: string
  image: string
  name: string
  number: string
  attacks: {
    special: Special[]
  }
  fetchedAt?: string
}

export type Square = 'X' | 'O' | null

export type Status = 'idle' | 'pending' | 'resolved' | 'rejected'

export type ActionType = 'pending' | 'resolved' | 'rejected'

export type Data = Pokemon | null

export interface ReducerState {
  status: Status
  error: Error | null
  data?: Data
  pokemon?: Pokemon | null
}

export interface Action {
  type: ActionType
  error?: Error | null
  data?: Data
  pokemon?: Pokemon | null
}

export interface Message {
  id: number
  author: string
  content: string
}

export type PokemonCacheActionType = 'ADD_POKEMON'

export interface PokemonCacheAction {
  type: PokemonCacheActionType
  pokemonData: Pokemon
  pokemonName: string
}

export interface PokemonCacheState {
  [key: string]: Pokemon
}
