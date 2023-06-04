export interface SearchOption {
  isSearch: boolean
  form?: object
  options?: object[]
  moreOptions?: object[]
  action?: {
    submit: (form:object)=> void
    reset: (form:object) => void
  }
}
