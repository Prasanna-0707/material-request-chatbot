export const materialTypeOptions = [
  {
    value: 'ZLDI',
    label: 'ZLDI',
    description: 'Local material',
  },
  {
    value: 'ZLHW',
    label: 'ZLHW',
    description: 'Hardware material',
  },
  {
    value: 'ZLVP',
    label: 'ZLVP',
    description: 'Packaging material',
  },
  {
    value: 'ZLUE',
    label: 'ZLUE',
    description: 'US only',
  },
]

export const businessTypeOptions = [
  {
    value: 'In-Vivo',
    label: 'In-Vivo',
    description: 'In-vivo business',
  },
  {
    value: 'In-Vitro',
    label: 'In-Vitro',
    description: 'In-vitro business',
  },
  {
    value: 'Service',
    label: 'Service',
    description: 'Service business',
  },
  {
    value: 'Varian',
    label: 'Varian',
    description: 'Varian business',
  },
  {
    value: 'MES',
    label: 'MES',
    description: 'MES business',
  },
]

export const materialTypeDerivedData = {
  ZLDI: {
    keyFields: [
      {
        label: 'Base Unit',
        field: 'MARA_BUOM',
        value: 'PC',
      },
      {
        label: 'Industry Sector',
        field: 'MARA_MBRSH',
        value: 'M',
      },
      {
        label: 'Item Category Group',
        field: 'MARA_MTPOS',
        value: 'LEIS',
      },
      {
        label: 'Material Group',
        field: 'MARA_MATKL',
        value: 'MXA',
      },
      {
        label: 'Gross Weight',
        field: 'MARA_BRGEW',
        value: '0,000',
      },
      {
        label: 'Net Weight',
        field: 'MARA_NTGEW',
        value: '0,000',
      },
      {
        label: 'Weight Unit',
        field: 'MARA_GEWEI',
        value: 'KG',
      },
    ],

    sapFields: [
      {
        field: 'MARA_BUOM',
        value: 'PC',
      },
      {
        field: 'MARA_MBRSH',
        value: 'M',
      },
      {
        field: 'MARA_MTPOS',
        value: 'LEIS',
      },
      {
        field: 'MARA_MATKL',
        value: 'MXA',
      },
      {
        field: 'MARA_BRGEW',
        value: '0,000',
      },
      {
        field: 'MARA_NTGEW',
        value: '0,000',
      },
      {
        field: 'MARA_GEWEI',
        value: 'KG',
      },
      {
        field: 'MVKE_SKTOF',
        value: 'Active',
      },
      {
        field: 'MVKE_KTGRM',
        value: '02',
      },
      {
        field: 'MVKE_MTPOS',
        value: 'LEIS',
      },
      {
        field: 'MARC_MTVFP',
        value: 'KP',
      },
      {
        field: 'MARC_KAUTB',
        value: 'Active',
      },
      {
        field: 'MARC_LOSGR',
        value: '1,000',
      },
      {
        field: 'MBEW_HKMAT',
        value: 'Active',
      },
    ],
  },

  ZLHW: {
    keyFields: [
      {
        label: 'Base Unit',
        field: 'MARA_BUOM',
        value: 'PC',
      },
      {
        label: 'Industry Sector',
        field: 'MARA_MBRSH',
        value: 'M',
      },
      {
        label: 'Item Category Group',
        field: 'MARA_MTPOS',
        value: 'BANS',
      },
      {
        label: 'Material Group',
        field: 'MARA_MATKL',
        value: 'MXA',
      },
      {
        label: 'Gross Weight',
        field: 'MARA_BRGEW',
        value: '999,000',
      },
      {
        label: 'Net Weight',
        field: 'MARA_NTGEW',
        value: '999,000',
      },
      {
        label: 'Weight Unit',
        field: 'MARA_GEWEI',
        value: 'KG',
      },
    ],

    sapFields: [
      {
        field: 'MARA_BUOM',
        value: 'PC',
      },
      {
        field: 'MARA_MBRSH',
        value: 'M',
      },
      {
        field: 'MARA_MTPOS',
        value: 'BANS',
      },
      {
        field: 'MARA_MATKL',
        value: 'MXA',
      },
      {
        field: 'MARA_BRGEW',
        value: '999,000',
      },
      {
        field: 'MARA_NTGEW',
        value: '999,000',
      },
      {
        field: 'MARA_GEWEI',
        value: 'KG',
      },
      {
        field: 'MARA_TRAGR',
        value: '9999',
      },
      {
        field: 'MVKE_SKTOF',
        value: 'Active',
      },
      {
        field: 'MVKE_KTGRM',
        value: '01',
      },
      {
        field: 'MVKE_MTPOS',
        value: 'BANS',
      },
      {
        field: 'MARC_MTVFP',
        value: 'ZP',
      },
      {
        field: 'MARC_KAUTB',
        value: 'Active',
      },
      {
        field: 'MARC_LOSGR',
        value: '1,000',
      },
      {
        field: 'MBEW_HKMAT',
        value: 'Active',
      },
    ],
  },

  ZLVP: {
    keyFields: [
      {
        label: 'Base Unit',
        field: 'MARA_BUOM',
        value: 'PC',
      },
      {
        label: 'Industry Sector',
        field: 'MARA_MBRSH',
        value: 'M',
      },
      {
        label: 'Item Category Group',
        field: 'MARA_MTPOS',
        value: 'VERP',
      },
      {
        label: 'Packaging Material Group',
        field: 'MARA_MAGRV',
        value: 'PACK',
      },
      {
        label: 'Material Group',
        field: 'MARA_MATKL',
        value: 'MXA',
      },
      {
        label: 'Gross Weight',
        field: 'MARA_BRGEW',
        value: '999,000',
      },
      {
        label: 'Net Weight',
        field: 'MARA_NTGEW',
        value: '999,000',
      },
      {
        label: 'Weight Unit',
        field: 'MARA_GEWEI',
        value: 'KG',
      },
    ],

    sapFields: [
      {
        field: 'MARA_BUOM',
        value: 'PC',
      },
      {
        field: 'MARA_MBRSH',
        value: 'M',
      },
      {
        field: 'MARA_MTPOS',
        value: 'VERP',
      },
      {
        field: 'MARA_MAGRV',
        value: 'PACK',
      },
      {
        field: 'MARA_MATKL',
        value: 'MXA',
      },
      {
        field: 'MARA_BRGEW',
        value: '999,000',
      },
      {
        field: 'MARA_NTGEW',
        value: '999,000',
      },
      {
        field: 'MARA_GEWEI',
        value: 'KG',
      },
      {
        field: 'MARA_TRAGR',
        value: '9999',
      },
      {
        field: 'MVKE_SKTOF',
        value: 'Active',
      },
      {
        field: 'MVKE_KTGRM',
        value: '01',
      },
      {
        field: 'MVKE_MTPOS',
        value: 'VERP',
      },
      {
        field: 'MARC_MTVFP',
        value: 'ZP',
      },
      {
        field: 'MARC_KAUTB',
        value: 'Active',
      },
      {
        field: 'MARC_LOSGR',
        value: '1,000',
      },
      {
        field: 'MBEW_HKMAT',
        value: 'Active',
      },
    ],
  },

  ZLUE: {
    keyFields: [
      {
        label: 'Base Unit',
        field: 'MARA_BUOM',
        value: 'PC',
      },
      {
        label: 'Industry Sector',
        field: 'MARA_MBRSH',
        value: 'M',
      },
      {
        label: 'Item Category Group',
        field: 'MARA_MTPOS',
        value: 'ZTRN',
      },
      {
        label: 'Material Group',
        field: 'MARA_MATKL',
        value: 'MXA',
      },
      {
        label: 'External Material Group',
        field: 'MARA_EXTWG',
        value: 'TRIN01',
      },
      {
        label: 'Gross Weight',
        field: 'MARA_BRGEW',
        value: '999,000',
      },
      {
        label: 'Net Weight',
        field: 'MARA_NTGEW',
        value: '999,000',
      },
      {
        label: 'Weight Unit',
        field: 'MARA_GEWEI',
        value: 'KG',
      },
    ],

    sapFields: [
      {
        field: 'MARA_BUOM',
        value: 'PC',
      },
      {
        field: 'MARA_MBRSH',
        value: 'M',
      },
      {
        field: 'MARA_MTPOS',
        value: 'ZTRN',
      },
      {
        field: 'MARA_MATKL',
        value: 'MXA',
      },
      {
        field: 'MARA_BRGEW',
        value: '999,000',
      },
      {
        field: 'MARA_NTGEW',
        value: '999,000',
      },
      {
        field: 'MARA_GEWEI',
        value: 'KG',
      },
      {
        field: 'MARA_TRAGR',
        value: '9999',
      },
      {
        field: 'MARA_EXTWG',
        value: 'TRIN01',
      },
      {
        field: 'MVKE_SKTOF',
        value: 'Active',
      },
      {
        field: 'MVKE_KTGRM',
        value: '01',
      },
      {
        field: 'MVKE_MTPOS',
        value: 'ZTRN',
      },
      {
        field: 'MARC_MTVFP',
        value: 'ZP',
      },
      {
        field: 'MARC_KAUTB',
        value: 'Active',
      },
      {
        field: 'MARC_LOSGR',
        value: '1,000',
      },
      {
        field: 'MBEW_HKMAT',
        value: 'Active',
      },
      {
        field: 'MBEW_BKLAS',
        value: '2173',
      },
    ],
  },
}