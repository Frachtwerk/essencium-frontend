import { Card, createTheme, Loader } from '@mantine/core'
import { Fira_Code, Fira_Sans } from 'next/font/google'

import classes from './Theme.module.css'

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export enum MantineColorSchemes {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

export const theme = createTheme({
  focusRing: 'auto',
  respectReducedMotion: true,
  defaultRadius: 'sm',
  cursorType: 'pointer',
  colors: {
    blue: [
      '#E5FBFF',
      '#B8F4FF',
      '#8AEDFF',
      '#5CE6FF',
      '#2EDFFF',
      '#00D8FF',
      '#00ADCC',
      '#008199',
      '#005666',
      '#002B33',
    ],
    orange: [
      '#FFF3E5',
      '#FFDDB8',
      '#FFC78A',
      '#FFB15C',
      '#FF9B2E',
      '#FF8500',
      '#CC6A00',
      '#995000',
      '#663500',
      '#331B00',
    ],
  },
  white: '#ffffff',
  black: '#131313',
  primaryColor: 'blue',
  primaryShade: { light: 6, dark: 7 },
  defaultGradient: {
    from: 'blue',
    to: 'orange',
    deg: 135,
  },
  fontFamily: firaSans.style.fontFamily,
  fontFamilyMonospace: firaCode.style.fontFamily,
  headings: {
    fontFamily: firaSans.style.fontFamily,
  },
  components: {
    Loader: Loader.extend({
      defaultProps: {
        type: 'dots',
      },
    }),
    Card: Card.extend({
      classNames: {
        root: classes['card-root'],
      },
    }),
  },
})
