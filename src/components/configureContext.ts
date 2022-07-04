const canUseDom = () => {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

const COLORS = {
  blue: {
    10: '#EDF5FD;',
    20: '#C0DCF7;',
    30: '#92C2F2;',
    40: '#64A9ED;',
    50: '#378FE7;',
    60: '#1976D2;',
    70: '#145CA4;',
    80: '#0E4377;',
    90: '#092949;',
    100: '#03101C;'
  },
  green: {
    10: '#E8F3EB;',
    20: '#D0E7D8;',
    30: '#A2CFB0;',
    40: '#73B789;',
    50: '#459F61;',
    60: '#16873A;',
    70: '#0F5F29;',
    80: '#0B441D;',
    90: '#072911;',
    100: '#020D06;'
  },
  orange: {
    10: '#FEF3DE;',
    20: '#FEE9C5',
    30: '#FDD793',
    40: '#FCCE7A',
    50: '#FBBB48',
    60: '#FAA916',
    70: '#D88D05',
    80: '#A66D04',
    90: '#744C03',
    100: '#432B01'
  },
  red: {
    10: '#FBE9E9;',
    20: '#F7D3D3',
    30: '#F2B6B6',
    40: '#E77D7D',
    50: '#DF5252',
    60: '#D62828',
    70: '#AB2020',
    80: '#801818',
    90: '#551010',
    100: '#2A0808'
  },
  neutral: {
    0: '#FFFFFF;',
    10: '#F6F8FC;',
    20: '#F1F4F9',
    30: '#E2E8F0',
    40: '#CBD4E1',
    50: '#94A3B8',
    60: '#64748B',
    70: '#475569',
    80: '#27364B',
    90: '#1E2A3B',
    100: '#0F1A2A'
  },
  cyan: {
    10: '#DBF6FF;',
    20: '#A8E9FF;',
    30: '#8BE2FF;',
    40: '#42D0FF;',
    50: '#00A4DB;',
    60: '#007EA8;',
    70: '#005875;',
    80: '#00455B;',
    90: '#003142;',
    100: '#001E28;'
  },
  indigo: {
    10: '#F2F2FC;',
    20: '#DCDCFC',
    30: '#CCCCFC',
    40: '#A7A7FA',
    50: '#8585F2',
    60: '#6767E6',
    70: '#4D4DD1',
    80: '#3737B3',
    90: '#28288A',
    100: '#1F1F65'
  },
  purple: {
    10: '#F5F0FA;',
    20: '#EAD9FA',
    30: '#E0C7F8',
    40: '#C79BF2',
    50: '#AE74E8',
    60: '#9656D6',
    70: '#7D3CBD',
    80: '#642B9E',
    90: '#3E1B62',
    100: '#25103A'
  },
  magenta: {
    10: '#FAF0F4;',
    20: '#FAD4E4',
    30: '#FBC0D8',
    40: '#F78BB8',
    50: '#ED5393',
    60: '#D6246E',
    70: '#B01355',
    80: '#8A1244',
    90: '#5D0C2E',
    100: '#300618'
  }
}
const findMainColor = (theme: string) => {
  return Object.entries(COLORS).find(([key]) => key === theme)
}

export const injectVariables = (theme: string) => {
  const current = findMainColor(theme)
  if (current) {
    const arr = current[1]
    const prepareKeys = Object.entries(arr).map((item) => {
      return `--theme-${item[0]} : ${item[1]}`
    })
    if (canUseDom()) {
      const target = document.querySelector('body')
      const styleElement = document.createElement('style')
      styleElement.innerHTML = ` body {
    ${prepareKeys?.join('\n')}
   }`

      target?.prepend(styleElement)
    } else {
      console.error('Cannot set the theme')
    }
  }
}
