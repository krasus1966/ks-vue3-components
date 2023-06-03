export interface SearchOption {
  isSearch: boolean
  options?: object[]
  action?: {
    submit: ()=> void
    reset: () => void
  }
}
