import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  input, button {
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
  }
`

export default GlobalStyle
