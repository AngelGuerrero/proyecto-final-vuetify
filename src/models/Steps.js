const Steps = [
  {
    pageTitle: 'Modelos de Segmentación',
    label: 'Modelos',
    pageDescription: 'Elige el modelo de segmentación de clientes que mas se ajuste a tus necesidades.',
    number: 1,
    name: 'modelos',
    component: 'modelos',
    data: null,
    valid: true
  },
  {
    pageTitle: 'Categoría Sociodemográficos',
    label: 'Sociodemográficos',
    pageDescription:
      'En esta categoria puedes filtrar por caracteristicas sociodemograficas del cliente. Ahora bien, si no lo requieres, pues dar clic en continuar.',
    number: 2,
    name: 'sociodemograficos',
    component: 'sociodemograficos',
    data: null,
    valid: false
  },
  {
    pageTitle: 'Categoría Comportamiento del cliente',
    label: 'Comportamiento del cliente',
    pageDescription:
      'En Comportamiento del cliente puedes filtrar las caracteristacas del comportamiento de compra del cliente. Ahora bien, si no lo requieres, pues dar clic en continuar.',
    number: 3,
    name: 'comportamiento',
    component: 'comportamiento',
    data: null,
    valid: false
  },
  {
    pageTitle: 'Categoría Geográficos',
    label: 'Geografícos',
    pageDescription:
      'La categorias geograficas te permiten filtrar varias opciones de ubicacion del cliente. Ahora bien, si no lo requieres, pues dar clic en continuar.',
    number: 4,
    name: 'geograficos',
    component: 'geograficos',
    data: null,
    valid: false
  },
  {
    pageTitle: 'Datos',
    label: 'Datos',
    pageDescription:
      '¡Ya casí terminas! <br /> Aquí deberas elegir la información del cliente que te es util para tu campaña o proyecto. El formato del archivo que se exportará es en .csv',
    number: 5,
    name: 'datos',
    component: 'datos',
    data: null,
    valid: false
  },
  {
    pageTitle: 'Formulario',
    label: 'Formulario',
    pageDescription:
      'Tu archivo está listo.<br /> Pero antes, apóyanos completando la siguiente información.',
    number: 6,
    name: 'formulario',
    component: 'formulario',
    data: null,
    valid: false
  }
]

export default Steps
