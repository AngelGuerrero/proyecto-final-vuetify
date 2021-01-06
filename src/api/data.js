import Slider from '../models/Slider'
import Section from '../models/Section'
import Checkbox from '../models/Checkbox'
import Calendar from '../models/Calendar'
import SliderDate from '../models/SliderDate'

const MODELOS = {
  // Tipo de modelos
  modelos: new Section('modelos', 'Modelos de segmentación', [
    { name: 'segmentar', title: 'Segmentar Clientes' },
    { name: 'recomendar', title: 'Recomendar Productos' }
  ]),

  // Segmentar clientes
  segmentar: new Section(
    'segmentar',
    'Segmentar Clientes',
    [
      {
        // Area
        area: new Section(
          'area',
          'Área',
          [new Checkbox('area', 'Muebles'), new Checkbox('area', 'Ropa')],
          null,
          null,
          false,
          false,
          true
        ),

        // Productos
        productos: new Section(
          'productos',
          'Productos',
          ['Zapato infantil', 'Zapato dama', 'Zapato caballero', 'Transporte y movilidad'],
          null,
          null,
          false,
          false,
          true
        ),

        // Compra
        compra: new Section(
          'compra',
          'Compra',
          [new Checkbox('compra', 'Crédito'), new Checkbox('compra', 'Contado')],
          null,
          null,
          false,
          false,
          true
        ),

        // Recency
        recency: new Section(
          'recency',
          'Recency',
          [
            new Checkbox('recency', '4'),
            new Checkbox('recency', '3'),
            new Checkbox('recency', '2'),
            new Checkbox('recency', '1')
          ],
          null,
          null,
          false,
          false,
          true
        ),

        // Frecuency
        frecuency: new Section(
          'frecuency',
          'Frecuency',
          [
            new Checkbox('frecuency', '4'),
            new Checkbox('frecuency', '3'),
            new Checkbox('frecuency', '2'),
            new Checkbox('frecuency', '1')
          ],
          null,
          null,
          false,
          false,
          true
        ),

        // Money
        money: new Section('money', 'Money', [
          new Checkbox('money', '4'),
          new Checkbox('money', '3'),
          new Checkbox('money', '2'),
          new Checkbox('money', '1')
        ]),

        // Retención del cliente
        reteCliente: new Section('reteCliente', 'Retención del cliente', [
          new Checkbox('reteCliente', 'Alta probabilidad de compra'),
          new Checkbox('reteCliente', 'Baja probabilidad de compra')
        ]),

        // Recuperación del cliente
        recuCliente: new Section('recuCliente', 'Recuperación del cliente', [
          new Checkbox('recuCliente', 'Alta probabilidad de compra'),
          new Checkbox('recuCliente', 'Baja probabilidad de compra')
        ]),

        // Puntualidad
        puntualidad: new Section('puntualidad', 'Puntualidad', [
          new Checkbox('puntualidad', 'Cliente A'),
          new Checkbox('puntualidad', 'Cliente B'),
          new Checkbox('puntualidad', 'Cliente C'),
          new Checkbox('puntualidad', 'Cliente D'),
          new Checkbox('puntualidad', 'Cliente Z')
        ])
      }
    ],
    null,
    null,
    false,
    true
  ),

  // Recomendar productos
  recomendar: new Section('recomendar', 'Recomendar Productos', [], null, null, false, true)
}

const SOCIODEMOGRAFICOS = {
  // Género
  genero: new Section('genero', 'Género', [new Checkbox('genero', 'Hombre'), new Checkbox('genero', 'Mujer')]),
  // Sliders edad
  s_edad_1: new Slider('s_edad_1', 'double', 0, 100, 10, 20, '', ' años'),
  s_edad_2: new Slider('s_edad_2', 'double', 0, 110, 1, 10, '', ' años'),
  s_edad_3: new Slider('s_edad_3', 'double', 0, 120, 40, 70, '', ' años'),
  // Rangos de edad
  edad: new Section(
    'edad',
    'Rangos de edad',
    [
      new Checkbox('edad', ' 15 a 19 años '),
      new Checkbox('edad', ' 20 a 24 años '),
      new Checkbox('edad', ' 25 a 29 años '),
      new Checkbox('edad', ' 30 a 34 años '),
      new Checkbox('edad', ' 35 a 39 años '),
      new Checkbox('edad', ' 40 a 44 años '),
      new Checkbox('edad', ' 45 a 49 años '),
      new Checkbox('edad', ' 50 a 54 años '),
      new Checkbox('edad', ' 55 a 59 años '),
      new Checkbox('edad', ' 60 a 64 años '),
      new Checkbox('edad', ' 65 a 69 años '),
      new Checkbox('edad', ' 70 a 74 años '),
      new Checkbox('edad', ' 75 a 79 años '),
      new Checkbox('edad', ' 80 a 84 años '),
      new Checkbox('edad', ' 85 años o más ')
    ],
    null,
    null,
    false,
    false,
    true
  ),
  // Etapas de vida
  vida: new Section(
    'vida',
    'Etapas de vida',
    [
      new Checkbox('vida', 'Adolecentes'),
      new Checkbox('vida', 'Adultos jovenes'),
      new Checkbox('vida', 'Adultos'),
      new Checkbox('vida', 'Jubilados')
    ],
    null,
    null,
    false,
    false,
    true
  ),
  // Generación
  generacion: new Section(
    'generacion',
    'Generación',
    [
      new Checkbox('ancla', 'Generación Z'),
      new Checkbox('ancla', 'Millennials (Y)'),
      new Checkbox('ancla', 'Generación X'),
      new Checkbox('ancla', 'Baby Boom'),
      new Checkbox('ancla', 'Generación Silenciosa')
    ],
    null,
    null,
    false,
    false,
    true
  ),
  // Nivel escolaridad
  escolaridad: new Section(
    'escolaridad',
    'Nivel de escolaridad',
    [
      new Checkbox('escolaridad', 'Sin estudios'),
      new Checkbox('escolaridad', 'Primaria'),
      new Checkbox('escolaridad', 'Secundaria'),
      new Checkbox('escolaridad', 'Carrera Técnica'),
      new Checkbox('escolaridad', 'Preparatoria'),
      new Checkbox('escolaridad', 'Profesional'),
      new Checkbox('escolaridad', 'No identificado')
    ],
    null,
    null,
    false,
    false,
    true
  ),
  // Estado civil
  e_civil: new Section(
    'e_civil',
    'Estado civil',
    [
      new Checkbox('e_civil', 'Casado'),
      new Checkbox('e_civil', 'Soltero'),
      new Checkbox('e_civil', 'Union Libre'),
      new Checkbox('e_civil', 'Divorciado'),
      new Checkbox('e_civil', 'Viudo'),
      new Checkbox('e_civil', 'Profesional'),
      new Checkbox('e_civil', 'Sin identificar')
    ],
    null,
    null,
    false,
    false,
    true
  ),
  // Integrantes del hogar
  in_hogar: new Section(
    'in_hogar',
    'Ingregrantes del hogar',
    [
      new Checkbox('in_hogar', '1 persona'),
      new Checkbox('in_hogar', '2 personas'),
      new Checkbox('in_hogar', '3 personas'),
      new Checkbox('in_hogar', '4 personas'),
      new Checkbox('in_hogar', '5 personas'),
      new Checkbox('in_hogar', '6 o más personas'),
      new Checkbox('in_hogar', 'Sin dato')
    ],
    null,
    null,
    false,
    false,
    true
  ),
  // Integrantes del hogar que trabajan
  in_hogarTrabajan: new Section(
    'in_hogarTrabajan',
    'Integrantes del hogar que trabajan',
    [
      new Checkbox('in_hogarTrabajan', '1 persona'),
      new Checkbox('in_hogarTrabajan', '2 personas'),
      new Checkbox('in_hogarTrabajan', '3 personas'),
      new Checkbox('in_hogarTrabajan', '4 personas'),
      new Checkbox('in_hogarTrabajan', '5 o más personas'),
      new Checkbox('in_hogarTrabajan', 'Sin dato')
    ],
    null,
    null,
    false,
    false,
    true
  ),
  // Salarios mínimos
  sal_min: new Section(
    'sal_min',
    'Salarios mínimos',
    [
      new Checkbox('sal_min', 'Menor o igual a 1 SM'),
      new Checkbox('sal_min', 'Hasta 2 SM'),
      new Checkbox('sal_min', 'Hasta 3 SM'),
      new Checkbox('sal_min', 'Hasta 4 SM'),
      new Checkbox('sal_min', 'De 5 a 10 SM'),
      new Checkbox('sal_min', 'De 11 a 25 SM'),
      new Checkbox('sal_min', 'Mayor a 25 SM')
    ],
    null,
    null,
    false,
    false,
    true
  ),
  // Ingreso promedio mensual
  in_mensual: new Slider('in_mensual', 'double', 0, 100000, 120, 5000, '$', ' pesos', 5000),
  // Nivel socioeconómico
  socioe: new Section(
    'socioe',
    'Nivel socioeconómico',
    [
      new Checkbox('ancla', 'A/B'),
      new Checkbox('ancla', 'C+'),
      new Checkbox('ancla', 'C'),
      new Checkbox('ancla', 'C-'),
      new Checkbox('ancla', 'D+'),
      new Checkbox('ancla', 'D'),
      new Checkbox('ancla', 'E')
    ],
    null,
    null,
    false,
    false,
    true
  )
}

const COMPORTAMIENTO = {
  // Puntualidad
  // Prefix: com
  // There is another section with the same name
  com_puntualidad: new Section(
    'com_puntualidad',
    'Puntualidad',
    [
      new Checkbox('com_puntualidad', 'Cliente A'),
      new Checkbox('com_puntualidad', 'Cliente B'),
      new Checkbox('com_puntualidad', 'Cliente C'),
      new Checkbox('com_puntualidad', 'Cliente D'),
      new Checkbox('com_puntualidad', 'Cliente Nuevo'),
      new Checkbox('com_puntualidad', 'Cliente Moroso'),
      new Checkbox('com_puntualidad', 'Sin Dato/No incluir')
    ],
    null,
    null,
    false,
    false,
    false
  ),

  // Tipo cliente
  tipo_cliente: new Section(
    'tipo_cliente',
    'Tipo cliente',
    [
      new Checkbox('tipo_cliente', 'Contado'),
      new Checkbox('tipo_cliente', 'Crédito Títular'),
      new Checkbox('tipo_cliente', 'Crédito Adicional'),
      new Checkbox('tipo_cliente', 'Crédito Especial'),
      new Checkbox('tipo_cliente', 'Empleado Títular'),
      new Checkbox('tipo_cliente', 'Cliente Moroso'),
      new Checkbox('tipo_cliente', 'Sin Dato/No incluir')
    ],
    null,
    null,
    false,
    false,
    true
  ),

  // FIX: cambiar a un radio button
  // ¿Es cliente?
  es_cliente: new Section(
    'es_cliente',
    '¿Es cliente?',
    [new Checkbox('es_cliente', 'Sí'), new Checkbox('es_cliente', 'No')],
    null,
    null,
    false,
    false,
    true
  ),

  // Antiguedad
  antiguedad: new Slider('antiguedad', 'double', 0, 100, 10, 20, '', ' años'),

  // Última actividad
  ultima_actividad: new SliderDate('ultima_actividad'),

  // Fecha de última actividad de R
  actividad_r: new Section(
    'actividad_r',
    'Fecha de última actividad de R',
    new Calendar('actividad_r', []),
    null,
    null,
    false,
    false,
    true
  ),

  // Fecha de última actividad de M
  actividad_m: new Section(
    'actividad_m',
    'Fecha de última actividad de M',
    new Calendar('actividad_m', []),
    null,
    null,
    false,
    false,
    true
  ),

  // Fecha de última actividad de T
  actividad_t: new Section(
    'actividad_t',
    'Fecha de última actividad de T',
    new Calendar('actividad_t', []),
    null,
    null,
    false,
    false,
    true
  ),

  // Importe abonado
  importe_abonado: new Slider('importe_abonado', 'double', 0, 10000, 500, 2000, '$', '', 500),

  // Canal de abono
  abono: new Section(
    'abono',
    'Canal de abono',
    [
      new Checkbox('abono', ' C '),
      new Checkbox('abono', 'A C'),
      new Checkbox('abono', 'W'),
      new Checkbox('abono', 'Sin identificar')
    ],
    null,
    null,
    false,
    false,
    true
  ),

  // Línea C
  linea_c: new Slider('linea_c', 'double', 0, 10000, 100, 2000, '$'),

  // Fecha del último movimiento de A
  movimiento_a: new Section(
    'movimiento_a',
    'Fecha del último movimiento de A',
    new Calendar('movimiento_a', []),
    null,
    null,
    false,
    false,
    true
  )
}

const GEOGRAFICOS = {
  // Estados
  estado: new Section('estado', 'Estados', [
    'AGUASCALIENTES',
    'BAJA CALIFORNIA',
    'BAJA CALIFORNIA SUR',
    'CAMPECHE',
    'COAHUILA DE ZARAGOZA',
    'COLIMA',
    'CHIAPAS',
    'CHIHUAHUA',
    'CIUDAD DE MEXICO',
    'DURANGO',
    'GUANAJUATO',
    'GUERRERO',
    'HIDALG',
    'JALISCO',
    'MEXICO',
    'MICHOACAN DE OCAMPO',
    'MORELOS',
    'NAYARIT',
    'NUEVO LEON',
    'OAXACA',
    'PUEBLA',
    'QUERETARO',
    'QUINTANA ROO',
    'SAN LUIS POTOSI',
    'SINALOA',
    'SONORA',
    'TABASCO',
    'TAMAULIPAS',
    'TLAXCALA',
    'VERACRUZ DE IGNACIO DE LA LLAVE',
    'YUCATAN',
    'ZACATECAS'
  ]),
  // Municipio
  municipio: new Section('municipio', 'Municipio', [
    'ACAMBAY',
    'ACOLMAN',
    'ACULCO',
    'ALMOLOYA DE ALQUISIRAS',
    'ALMOLOYA DE JUAREZ',
    'ALMOLOYA DEL RIO',
    'AMANALCO',
    'AMATEPEC',
    'AMECAMECA',
    'APAXCO',
    'ATENCO',
    'ATIZAPAN',
    'ATIZAPAN DE ZARAGOZA',
    'ATLAUTLA',
    'AXAPUSCO',
    'AYAPANGO'
  ]),
  // Tipo de ciudad
  ciudad: new Section('ciudad', 'Tipo de ciudad', [
    new Checkbox('ciudad', 'Zonas Metropolitanas'),
    new Checkbox('ciudad', 'Conurbacion'),
    new Checkbox('ciudad', 'Centros Urbanos'),
    new Checkbox('ciudad', 'n/a')
  ]),
  // Clústers
  cluster: new Section('cluster', 'Clústers', ['opción 1', 'opción 2', 'opción 3', 'opción 4', 'opción 5']),
  // División C
  div_c: new Section('div_c', 'División C', [
    new Checkbox('div_c', 'División I'),
    new Checkbox('div_c', 'División II'),
    new Checkbox('div_c', 'División III'),
    new Checkbox('div_c', 'División IV'),
    new Checkbox('div_c', 'División V')
  ]),
  // Regiones Nielsen
  nielsen: new Section('nielsen', 'Regiones Nielsen', [
    new Checkbox('nielsen', 'División I'),
    new Checkbox('nielsen', 'División II'),
    new Checkbox('nielsen', 'División III'),
    new Checkbox('nielsen', 'División IV'),
    new Checkbox('nielsen', 'División V')
  ]),
  // Regiones AIM
  aim: new Section('aim', 'Regiones AIM', [
    new Checkbox('aim', 'Centro Norte'),
    new Checkbox('aim', 'Centro Sur'),
    new Checkbox('aim', 'Este'),
    new Checkbox('aim', 'No identificado'),
    new Checkbox('aim', 'Noreste'),
    new Checkbox('aim', 'Noroeste'),
    new Checkbox('aim', 'Oeste'),
    new Checkbox('aim', 'Sureste'),
    new Checkbox('aim', 'Suroeste')
  ])
}

const DATOS = {
  datos: new Section('datos', 'Datos a exportar', [
    new Checkbox('datos', 'id Client'),
    new Checkbox('datos', 'Género'),
    new Checkbox('datos', 'Nombre propio'),
    new Checkbox('datos', 'Apellido Paterno'),
    new Checkbox('datos', 'Apellido Materno'),
    new Checkbox('datos', 'Correo electrónico'),
    new Checkbox('datos', 'Teléfono')
  ])
}

export { MODELOS, SOCIODEMOGRAFICOS, COMPORTAMIENTO, GEOGRAFICOS, DATOS }
