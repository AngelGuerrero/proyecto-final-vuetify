<template>
  <div>
    <v-card-title class="justify-center"
      ><h1 class="text-center text-h4 text-md-h4">
        Categoria Geograficos
      </h1></v-card-title
    >
    <v-card-text>
      <v-container
        ><p>
          La categorias geograficas te permiten filtrar varias opciones de
          ubicacion del cliente. Ahora bien, si no lo requieres, pues dar clic
          en continuar.
        </p></v-container
      >

      <v-row>
        <v-col cols="12" md="6">
          <v-select
            label="Estado"
            outlined
            :items="[
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
            ]"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select>
            <option>Municipio</option>
            <option>ACAMBAY</option>
            <option>ACOLMAN</option>
            <option>ACULCO</option>
            <option>ALMOLOYA DE ALQUISIRAS</option>
            <option>ALMOLOYA DE JUAREZ</option>
            <option>ALMOLOYA DEL RIO</option>
            <option>AMANALCO</option>
            <option>AMATEPEC</option>
            <option>AMECAMECA</option>
            <option>APAXCO</option>
            <option>ATENCO</option>
            <option>ATIZAPAN</option>
            <option>ATIZAPAN DE ZARAGOZA</option>
            <option>ATLAUTLA</option>
            <option>AXAPUSCO</option>
            <option>AYAPANGO</option>
          </v-select>
        </v-col>
      </v-row>

      <v-card class="mb-7">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title><h4>Tipo de ciudad</h4></v-card-title>
                <v-card-text>
                  <v-checkbox label="Zonas Metropolitanas"></v-checkbox>
                  <v-checkbox label="Conurbacion"></v-checkbox>
                  <v-checkbox label="Centros Urbanos"></v-checkbox>
                  <v-checkbox label="n/a"></v-checkbox>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title><h4>Clusters de Ciudades</h4></v-card-title>
                <v-card-text>
                  <p>
                    Se calculó 104 cluster territoriales que comparten
                    caracteristicas fisicas, demograficas, economicas, consumo y
                    vias de comunicación similares entre espacios urbanos y son
                    nombradas a razon de la ciudad principal.
                  </p>
                  <select class="form-control">
                    <option selected="selected">Clusters</option>
                    <option value="1">opción 1</option>
                    <option value="2">opción 2</option>
                    <option value="3">opción 3</option>
                    <option value="4">opción 4</option>
                    <option value="5">opción 5</option>
                  </select>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mb-7">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <v-card-title><h5>Division C</h5></v-card-title>
                <v-card-text>
                  <p>
                    Grandes extensiones territoriales en las que se divide e
                    territorio nacional
                  </p>
                  <v-checkbox label=" División I "></v-checkbox>
                  <v-checkbox label=" División II "></v-checkbox>
                  <v-checkbox label=" División III "></v-checkbox>
                  <v-checkbox label=" División IV "></v-checkbox>
                  <v-checkbox label=" División V "></v-checkbox>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card>
                <v-card-title><h5>Regiones Nielsen / AMVO</h5></v-card-title>
                <v-card-text>
                  <p>
                    Grandes extensiones territoriales en las que se divide e
                    territorio nacional
                  </p>
                  <v-checkbox label=" División I "></v-checkbox>
                  <v-checkbox label=" División II "></v-checkbox>
                  <v-checkbox label=" División III "></v-checkbox>
                  <v-checkbox label=" División IV "></v-checkbox>
                  <v-checkbox label=" División V "></v-checkbox>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card>
                <v-card-title><h5>Regiones AIM</h5></v-card-title>
                <v-card-text>
                  <p>
                    Grandes extensiones territoriales en las que se divide e
                    territorio nacional para analisis de mercado segun la
                    Asocion de Internet de Mexico.
                  </p>
                  <v-checkbox label="Centro Norte"></v-checkbox>
                  <v-checkbox label="Centro Sur"></v-checkbox>
                  <v-checkbox label="Este"></v-checkbox>
                  <v-checkbox label="No identificado"></v-checkbox>
                  <v-checkbox label="Noreste"></v-checkbox>
                  <v-checkbox label="Noroeste"></v-checkbox>
                  <v-checkbox label="Oeste"></v-checkbox>
                  <v-checkbox label="Sureste"></v-checkbox>
                  <v-checkbox label="Suroeste"></v-checkbox>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!--Google map-->
      <div class="min-vh-50">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe
            class="embed-responsive-item"
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d5287197.88756685!2d-101.89025342665099!3d23.78338017554413!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1603843493857!5m2!1ses!2smx"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <!--Google Maps-->
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'GeograficosComponent'
}
</script>

<style lang="scss" scoped></style>
