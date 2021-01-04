const Steps = [
  {
    pageTitle: 'Modelos de Segmentación',
    label: 'Modelos',
    pageDescription: 'Elige el modelo de segmentación de clientes que más se ajuste a tus necesidades.',
    number: 1,
    name: 'modelos',
    component: 'modelos',
    data: null,
    valid: false,
    initialValidation: false
  },

  {
    pageTitle: 'Sociodemográficos',
    label: 'Sociodemográficos',
    pageDescription:
      'En esta categoría puedes filtrar por características sociodemográficas del cliente.',
    number: 2,
    name: 'sociodemograficos',
    component: 'sociodemograficos',
    data: null,
    valid: false,
    initialValidation: false
  },

  {
    pageTitle: 'Comportamiento del cliente',
    label: 'Comportamiento del cliente',
    pageDescription:
      'En Comportamiento del cliente puedes filtrar las características del comportamiento de compra del cliente.',
    number: 3,
    name: 'comportamiento',
    component: 'comportamiento',
    data: null,
    valid: false,
    initialValidation: false
  },

  {
    pageTitle: 'Categoría: Geográficos',
    label: 'Geografícos',
    pageDescription:
      'La categorías geográficas te permiten filtrar varias opciones de ubicación del cliente.',
    number: 4,
    name: 'geograficos',
    component: 'geograficos',
    data: null,
    valid: false,
    initialValidation: false
  },

  {
    pageTitle: 'Datos',
    label: 'Datos',
    pageDescription:
      '¡Ya casi terminas! <br /> Aquí deberas elegir la información del cliente que te es útil para tu campaña o proyecto. El formato del archivo que se exportará es en .csv',
    number: 5,
    name: 'datos',
    component: 'datos',
    data: null,
    valid: false,
    initialValidation: false
  },

  {
    pageTitle: 'Formulario',
    label: 'Formulario',
    pageDescription: 'Tu archivo está listo.<br /> Apóyanos completando la siguiente información.',
    number: 6,
    name: 'formulario',
    component: 'formulario',
    data: null,
    valid: false,
    initialValidation: false
  }
]

export default Steps
