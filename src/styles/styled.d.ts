import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {

    background: string;
    primary: string;
    Headerline:string;
    roomCodeBg: string;

    input: string;

    text: string;

      question: {
        bg: string;
        
        answeredBg: string;
        highlightedBg: string;

      }
  }
}

}

